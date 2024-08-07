import axios from "axios";
import {
  tools
} from "../../lib/scraper/all/tools.js";
import _ from "lodash";
const services = [{
  name: "YasirWeb",
  key: "v1",
  apiKey: ""
}, {
  name: "ApiFlash",
  key: "v2",
  apiKey: "7eea5c14db5041ecb528f68062a7ab5d"
}, {
  name: "Thum.io",
  key: "v3",
  apiKey: ""
}, {
  name: "MiniScreenshot",
  key: "v4",
  apiKey: ""
}, {
  name: "ScreenshotMachine",
  key: "v5",
  apiKey: ""
}, {
  name: "Pikwy",
  key: "v6",
  apiKey: ""
}, {
  name: "Tools.SSWeb",
  key: "v7",
  apiKey: ""
}, {
  name: "2s9e3bif",
  key: "v8",
  apiKey: ""
}, {
  name: "2wg20nrbv4",
  key: "v9",
  apiKey: ""
}, {
  name: "GoogleApis",
  key: "v10",
  apiKey: ""
}, {
  name: "ElzinkoWebshot",
  key: "v11",
  apiKey: ""
}, {
  name: "ScreenshotLayer",
  key: "v12",
  apiKey: "de547abee3abb9d3df2fc763637cac8a"
}, {
  name: "Microlink",
  key: "v13",
  apiKey: ""
}, {
  name: "Urlbox",
  key: "v14",
  apiKey: "ln9ptArKXobLRpDQ"
}, {
  name: "Terasp.net",
  key: "v15",
  apiKey: ""
}, {
  name: "ShotSnap",
  key: "v16",
  apiKey: ""
}, {
  name: "Pptr.io",
  key: "v17",
  apiKey: ""
}];
const handler = async (m, {
  text,
  usedPrefix,
  command,
  conn
}) => {
  let [input, version] = text.split(" ");
  const linkRegex = /^(https?:\/\/[^\s]+)/;
  if (!input) return m.reply(`📎 *Masukkan tautan!* \n\n*Contoh Penggunaan:*\n${usedPrefix + command} https://google.com v2`);
  try {
    new URL(input).hostname;
  } catch {
    input = `https://${input}`;
  }
  if (!linkRegex.test(input)) return m.reply(`📎 *Tautan tidak valid!* \n\n*Contoh Penggunaan:*\n${usedPrefix + command} https://google.com v2`);
  if (!version) {
    const buttons = conn.ctaButton.setBody(`📋 *Tautan Screenshot:*\n- ${input}\n*Pilih layanan screenshot:*`).addSelection("🔍 Pilih layanan").makeSections("🔢 Daftar Layanan", "Pilih layanan");
    services.forEach(service => {
      buttons.makeRow("", service.name, "Pilih: " + service.name, `${usedPrefix}${command} ${input} ${service.key}`);
    });
    return buttons.run(m.chat, conn, m);
  }
  const service = _.find(services, s => s.key.toLowerCase() === version.toLowerCase());
  if (!service) return m.reply(`❌ *Versi tidak valid!* \n\n*Contoh:* \n${usedPrefix + command} https://example.com v2\n\n*Pilih versi yang ada:* \n(${services.map(s => s.key).join(" hingga ")})`);
  try {
    m.react(wait);
    let res = await getScreenshot(input, version, service.apiKey);
    if (!Buffer.isBuffer(res) && typeof res === "string" && /^https?:\/\//.test(res)) res = await getBuffer(res);
    const caption = `✨ *Screenshot berhasil!*\n- ${input}\n\n*Provider:* ${service.name}\n*Request:* \n- @${m.sender.split("@")[0]}`;
    await conn.sendMessage(m.chat, {
      image: res,
      caption: caption,
      mentions: [m.sender]
    }, {
      quoted: m
    });
    m.react(sukses);
  } catch (e) {
    console.log(e);
    m.react(eror);
  }
};
handler.help = ["ss", "ssf", "ssweb"];
handler.tags = ["tools"];
handler.command = /^ss(web|f)?$/i;
export default handler;
const getScreenshot = async (url, version, apiKey) => {
  try {
    const servicesMap = {
      v1: `https://webss.yasirweb.eu.org/api/screenshot?resX=1280&resY=900&outFormat=jpg&waitTime=1000&isFullPage=true&dismissModals=false&url=${url}`,
      v2: `https://api.apiflash.com/v1/urltoimage?access_key=${apiKey}&wait_until=page_loaded&url=${url}`,
      v3: `https://image.thum.io/get/fullpage/${url}`,
      v4: `https://mini.s-shot.ru/2560x1600/PNG/2560/Z100/?${url}`,
      v5: await ScreenshotMachine(url, "full", "desktop"),
      v6: await pikwy(url),
      v7: (await tools.ssweb(url))?.data,
      v8: await v8Screenshot(url),
      v9: await v9Screenshot(url),
      v10: await googleApis(url),
      v11: `https://webshot-elzinko.vercel.app/api/webshot?url=${url}`,
      v12: `https://api.screenshotlayer.com/api/capture?access_key=${apiKey}&url=${url}`,
      v13: await v13Screenshot(url),
      v14: `https://api.urlbox.io/v1/${apiKey}/png?url=${url}`,
      v15: `https://backup15.terasp.net/api/screenshot?resX=1280&resY=900&outFormat=jpg&waitTime=100&isFullPage=false&dismissModals=false&url=${url}`,
      v16: `https://shotsnap.vercel.app/api/screenshot?page=${url}`,
      v17: `https://pptr.io/api/screenshot?width=400&height=300&deviceScaleFactor=1&dark=1&url=${url}`
    };
    return servicesMap[version.toLowerCase()] || new Error("Versi tidak valid");
  } catch (e) {
    console.log(e);
  }
};
const getBuffer = async url => {
  try {
    const {
      data
    } = await axios.get(url, {
      responseType: "arraybuffer"
    });
    return Buffer.from(data);
  } catch (e) {
    console.log(e);
  }
};
const ScreenshotMachine = async (url = "", full = false, type = "desktop") => {
  try {
    const form = new URLSearchParams({
      url: url,
      device: type.toLowerCase(),
      cacheLimit: 0
    });
    if (full) form.append("full", "on");
    const {
      headers: {
        "set-cookie": cookies
      },
      data
    } = await axios.post("https://www.screenshotmachine.com/capture.php", form);
    const {
      link
    } = data;
    const {
      data: bufferData
    } = await axios.get(`https://www.screenshotmachine.com/${link}`, {
      responseType: "arraybuffer",
      headers: {
        cookie: cookies
      }
    });
    return Buffer.from(bufferData);
  } catch (e) {
    console.log(e);
  }
};
const pikwy = async url => {
  try {
    const {
      data
    } = await axios.get(`https://api.pikwy.com/?tkn=125&d=3000&u=${url}&fs=0&w=1920&h=1080&f=png&rt=jweb`);
    return data.iurl;
  } catch (e) {
    console.log(e);
  }
};
const googleApis = async url => {
  try {
    const {
      data
    } = await axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?screenshot=true&url=${url}`);
    const dataURL = data.lighthouseResult?.fullPageScreenshot?.screenshot?.data;
    const base64Data = dataURL?.replace(/^data:image\/webp;base64,/, "");
    return base64Data ? Buffer.from(base64Data, "base64") : null;
  } catch (e) {
    console.log(e);
  }
};
const v8Screenshot = async url => {
  try {
    const {
      data
    } = await axios.get(`https://2s9e3bif52.execute-api.eu-central-1.amazonaws.com/production/screenshot?url=${encodeURIComponent(url)}`);
    const base64Image = data.imageBase64;
    return Buffer.from(base64Image, "base64");
  } catch (e) {
    console.log(e);
  }
};
const v9Screenshot = async url => {
  try {
    const {
      data
    } = await axios.get(`https://2wg20nrbv4.execute-api.eu-west-1.amazonaws.com/default/screenshot?url=${encodeURIComponent(url)}`);
    const base64Image = data.imageBase64;
    return Buffer.from(base64Image, "base64");
  } catch (e) {
    console.log(e);
  }
};
const v13Screenshot = async url => {
  try {
    const {
      data
    } = await axios.get(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
    const urlImage = data.data?.screenshot?.url ?? data.data?.image?.url;
    return urlImage;
  } catch (e) {
    console.log(e);
  }
};