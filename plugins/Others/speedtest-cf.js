import https from "https";
import {
  performance
} from "perf_hooks";
const handler = async (m, {
  conn
}) => {
  try {
    await conn.reply(m.chat, "Please wait, conducting speed test...", m);
    const [ping, serverLocationData, {
      ip,
      loc,
      colo
    }] = await Promise.all([measureLatency(), fetchServerLocationData(), fetchCfCdnCgiTrace()]), city = serverLocationData[colo];
    let output = "```\n";
    output += logInfo("Server location", `${city} (${colo})`), output += logInfo("Your IP", `${ip} (${loc})`),
      output += logLatency(ping), output += logSpeedTestResult("100kB", await measureDownload(101e3, 10)),
      output += logSpeedTestResult("1MB", await measureDownload(1001e3, 8)), output += logSpeedTestResult("10MB", await measureDownload(10001e3, 6)),
      output += logSpeedTestResult("25MB", await measureDownload(25001e3, 4)), output += logSpeedTestResult("100MB", await measureDownload(100001e3, 1));
    output += logDownloadSpeed([...await measureDownload(101e3, 10), ...await measureDownload(1001e3, 8), ...await measureDownload(10001e3, 6), ...await measureDownload(25001e3, 4), ...await measureDownload(100001e3, 1)]);
    output += logUploadSpeed([...await measureUpload(11e3, 10), ...await measureUpload(101e3, 10), ...await measureUpload(1001e3, 8)]),
      output += "```\n", console.log(output), m.reply(output);
  } catch (error) {
    console.error(error), await conn.reply(m.chat, "Error during speedtest", m);
  }
};
handler.help = ["cfspeedtest"], handler.tags = ["tools"], handler.command = /^(cfspeedtest)$/i;
export default handler;

function average(values) {
  let total = 0;
  for (let i = 0; i < values.length; i += 1) total += values[i];
  return total / values.length;
}

function median(values) {
  const half = Math.floor(values.length / 2);
  return values.sort((a, b) => a - b), values.length % 2 ? values[half] : (values[half - 1] + values[half]) / 2;
}

function quartile(values, percentile) {
  values.sort((a, b) => a - b);
  const pos = (values.length - 1) * percentile,
    base = Math.floor(pos),
    rest = pos - base;
  return void 0 !== values[base + 1] ? values[base] + rest * (values[base + 1] - values[base]) : values[base];
}

function jitter(values) {
  let jitters = [];
  for (let i = 0; i < values.length - 1; i += 1) jitters.push(Math.abs(values[i] - values[i + 1]));
  return average(jitters);
}
async function get(hostname, path) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: hostname,
      path: path,
      method: "GET"
    }, res => {
      const body = [];
      res.on("data", chunk => {
        body.push(chunk);
      }), res.on("end", () => {
        try {
          resolve(Buffer.concat(body).toString());
        } catch (e) {
          reject(e);
        }
      }), req.on("error", err => {
        reject(err);
      });
    });
    req.end();
  });
}
async function fetchServerLocationData() {
  return JSON.parse(await get("speed.cloudflare.com", "/locations")).reduce((data, {
    iata,
    city
  }) => {
    const data1 = data;
    return data1[iata] = city, data1;
  }, {});
}

function fetchCfCdnCgiTrace() {
  return get("speed.cloudflare.com", "/cdn-cgi/trace").then(text => text.split("\n").map(i => {
    const j = i.split("=");
    return [j[0], j[1]];
  }).reduce((data, [k, v]) => {
    if (void 0 === v) return data;
    const data1 = data;
    return data1[k] = v, data1;
  }, {}));
}

function request(options, data = "") {
  let started, dnsLookup, tcpHandshake, sslHandshake, ttfb, ended;
  return new Promise((resolve, reject) => {
    started = performance.now();
    const req = https.request(options, res => {
      res.once("readable", () => {
        ttfb = performance.now();
      }), res.on("data", () => {}), res.on("end", () => {
        ended = performance.now(), resolve([started, dnsLookup, tcpHandshake, sslHandshake, ttfb, ended, parseFloat(res.headers["server-timing"].slice(22))]);
      });
    });
    req.on("socket", socket => {
      socket.on("lookup", () => {
        dnsLookup = performance.now();
      }), socket.on("connect", () => {
        tcpHandshake = performance.now();
      }), socket.on("secureConnect", () => {
        sslHandshake = performance.now();
      });
    }), req.on("error", error => {
      reject(error);
    }), req.write(data), req.end();
  });
}

function download(bytes) {
  return request({
    hostname: "speed.cloudflare.com",
    path: `/__down?bytes=${bytes}`,
    method: "GET"
  });
}

function upload(bytes) {
  const data = "0".repeat(bytes);
  return request({
    hostname: "speed.cloudflare.com",
    path: "/__up",
    method: "POST",
    headers: {
      "Content-Length": Buffer.byteLength(data)
    }
  }, data);
}

function measureSpeed(bytes, duration) {
  return 8 * bytes / (duration / 1e3) / 1e6;
}
async function measureLatency() {
  const measurements = [];
  for (let i = 0; i < 20; i += 1) await download(1e3).then(response => {
    measurements.push(response[4] - response[0] - response[6]);
  }, error => {
    console.log(`Error: ${error}`);
  });
  return [Math.min(...measurements), Math.max(...measurements), average(measurements), median(measurements), jitter(measurements)];
}
async function measureDownload(bytes, iterations) {
  const measurements = [];
  for (let i = 0; i < iterations; i += 1) await download(bytes).then(response => {
    const transferTime = response[5] - response[4];
    measurements.push(measureSpeed(bytes, transferTime));
  }, error => {
    console.log(`Error: ${error}`);
  });
  return measurements;
}
async function measureUpload(bytes, iterations) {
  const measurements = [];
  for (let i = 0; i < iterations; i += 1) await upload(bytes).then(response => {
    const transferTime = response[6];
    measurements.push(measureSpeed(bytes, transferTime));
  }, error => {
    console.log(`Error: ${error}`);
  });
  return measurements;
}

function logInfo(text, data) {
  return `📍 ${text}: ${data}\n`;
}

function logLatency(data) {
  return `⏱️ Latency: ${data[3].toFixed(2)} ms\n📈 Jitter: ${data[4].toFixed(2)} ms\n`;
}

function logSpeedTestResult(size, test) {
  return `🚀 ${size} speed: ${median(test).toFixed(2)} Mbps\n`;
}

function logDownloadSpeed(tests) {
  return `📥 Download speed (90th percentile): ${quartile(tests, .9).toFixed(2)} Mbps\n`;
}

function logUploadSpeed(tests) {
  return `📤 Upload speed (90th percentile): ${quartile(tests, .9).toFixed(2)} Mbps\n`;
}