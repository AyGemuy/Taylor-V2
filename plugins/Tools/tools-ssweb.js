import fetch from "node-fetch";
import { tools } from "../../lib/scraper/all/tools.js";
const services = [
  {
    name: "YasirWeb",
    key: "v1",
    apiKey: "",
  },
  {
    name: "ApiFlash",
    key: "v2",
    apiKey: "7eea5c14db5041ecb528f68062a7ab5d",
  },
  {
    name: "Thum.io",
    key: "v3",
    apiKey: "",
  },
  {
    name: "MiniScreenshot",
    key: "v4",
    apiKey: "",
  },
  {
    name: "ScreenshotMachine",
    key: "v5",
    apiKey: "",
  },
  {
    name: "Pikwy",
    key: "v6",
    apiKey: "",
  },
  {
    name: "Tools.SSWeb",
    key: "v7",
    apiKey: "",
  },
  {
    name: "2s9e3bif",
    key: "v8",
    apiKey: "",
  },
  {
    name: "Hexometer",
    key: "v9",
    apiKey: "",
  },
  {
    name: "GoogleApis",
    key: "v10",
    apiKey: "",
  },
  {
    name: "ElzinkoWebshot",
    key: "v11",
    apiKey: "",
  },
  {
    name: "ScreenshotLayer",
    key: "v12",
    apiKey: "de547abee3abb9d3df2fc763637cac8a",
  },
  {
    name: "Microlink",
    key: "v13",
    apiKey: "",
  },
  {
    name: "Urlbox",
    key: "v14",
    apiKey: "ln9ptArKXobLRpDQ",
  },
  {
    name: "Terasp.net",
    key: "v15",
    apiKey: "",
  },
  {
    name: "ShotSnap",
    key: "v16",
    apiKey: "",
  },
  {
    name: "Pptr.io",
    key: "v17",
    apiKey: "",
  },
];
const handler = async (m, { text, usedPrefix, command, conn }) => {
  let [input, version] = text.split(" ");
  const linkRegex = /^(https?:\/\/[^\s]+)/;
  if (!input)
    return m.reply(
      `📎 *Masukkan tautan!* \n\n*Contoh Penggunaan:*\n${usedPrefix + command} https://google.com v2`,
    );
  input = /^(https?:\/\/)/.test(input) ? input : `https://${input}`;
  if (!linkRegex.test(input))
    return m.reply(
      `📎 *Tautan tidak valid!* \n\n*Contoh Penggunaan:*\n${usedPrefix + command} https://google.com v2`,
    );
  if (!version) {
    const buttons = conn.ctaButton
      .setBody(
        `📋 *Tautan Screenshot:*\n- ${input}\n*Pilih layanan screenshot:*`,
      )
      .addSelection("🔍 Pilih layanan")
      .makeSections("🔢 Daftar Layanan", "Pilih layanan");
    services.forEach((service) => {
      buttons.makeRow(
        "",
        service.name,
        "Pilih: " + service.name,
        `${usedPrefix}${command} ${input} ${service.key}`,
      );
    });
    return buttons.run(m.chat, conn, m);
  }
  const service = services.find(
    (s) => s.key.toLowerCase() === version.toLowerCase(),
  );
  if (!service)
    return m.reply(
      `❌ *Versi tidak valid!* \n\n*Contoh:* \n${usedPrefix + command} https://example.com v2\n\n*Pilih versi yang ada:* \n(${services.map((s) => s.key).join(" hingga ")})`,
    );
  try {
    m.react(wait);
    let imgResult;
    switch (version.toLowerCase()) {
      case "v1":
        imgResult = `https://webss.yasirweb.eu.org/api/screenshot?resX=1280&resY=900&outFormat=jpg&waitTime=1000&isFullPage=true&dismissModals=false&url=${input}`;
        break;
      case "v2":
        imgResult = `https://api.apiflash.com/v1/urltoimage?access_key=${service.apiKey}&wait_until=page_loaded&url=${input}`;
        break;
      case "v3":
        imgResult = `https://image.thum.io/get/fullpage/${input}`;
        break;
      case "v4":
        imgResult = `https://mini.s-shot.ru/2560x1600/PNG/2560/Z100/?${input}`;
        break;
      case "v5":
        imgResult = await ScreenshotMachine(input, "full", "desktop");
        break;
      case "v6":
        imgResult = await pikwy(input);
        break;
      case "v7":
        imgResult = (await tools.ssweb(input))?.data;
        break;
      case "v8":
        imgResult = await v8Screenshot(input);
        break;
      case "v9":
        imgResult = await hexometerScreenshot(input);
        break;
      case "v10":
        imgResult = await googleApis(input);
        break;
      case "v11":
        imgResult = `https://webshot-elzinko.vercel.app/api/webshot?url=${input}`;
        break;
      case "v12":
        imgResult = `https://api.screenshotlayer.com/api/capture?access_key=${service.apiKey}&url=${input}`;
        break;
      case "v13":
        imgResult = await v13Screenshot(input);
        break;
      case "v14":
        imgResult = `https://api.urlbox.io/v1/${service.apiKey}/png?url=${input}`;
        break;
      case "v15":
        imgResult = `https://backup15.terasp.net/api/screenshot?resX=1280&resY=900&outFormat=jpg&waitTime=100&isFullPage=false&dismissModals=false&url=${input}`;
        break;
      case "v16":
        imgResult = `https://shotsnap.vercel.app/api/screenshot?page=${input}`;
        break;
      case "v17":
        imgResult = `https://pptr.io/api/screenshot?width=400&height=300&deviceScaleFactor=1&dark=1&url=${input}`;
        break;
      default:
        throw new Error("Versi tidak valid");
    }
    const caption = `✨ *Screenshot berhasil!*\n- ${input}\n\n*Provider:* ${service.name}\n*Request:* \n- @${m.sender.split("@")[0]}`;
    const isBuffer = Buffer.isBuffer(imgResult);
    const isUrl = typeof imgResult === "string" && imgResult.startsWith("http");
    const isBase64 =
      typeof imgResult === "string" && imgResult.startsWith("data:image");
    if (isBuffer) {
      await conn.sendMessage(
        m.chat,
        {
          image: imgResult,
          caption: caption,
          contextInfo: {
            mentionedJid: [m.sender],
          },
        },
        {
          quoted: m,
        },
      );
    } else if (isUrl) {
      const response = await fetch(imgResult, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        },
      });
      const arrayBuffer = await response.arrayBuffer();
      await conn.sendMessage(
        m.chat,
        {
          image: Buffer.from(arrayBuffer),
          caption: caption,
          contextInfo: {
            mentionedJid: [m.sender],
          },
        },
        {
          quoted: m,
        },
      );
    } else if (isBase64) {
      const base64Data = imgResult.replace(/^data:image\/\w+;base64,/, "");
      await conn.sendMessage(
        m.chat,
        {
          image: Buffer.from(base64Data, "base64"),
          caption: caption,
          contextInfo: {
            mentionedJid: [m.sender],
          },
        },
        {
          quoted: m,
        },
      );
    } else {
      await conn.sendMessage(
        m.chat,
        {
          image: {
            url: imgResult,
          },
          caption: caption,
          contextInfo: {
            mentionedJid: [m.sender],
          },
        },
        {
          quoted: m,
        },
      );
    }
    m.react(sukses);
  } catch (e) {
    console.log(e);
    m.react(eror);
    for (const altService of services) {
      if (altService.key.toLowerCase() !== version.toLowerCase()) {
        try {
          let imgResult;
          switch (altService.key.toLowerCase()) {
            case "v1":
              imgResult = `https://webss.yasirweb.eu.org/api/screenshot?resX=1280&resY=900&outFormat=jpg&waitTime=1000&isFullPage=true&dismissModals=false&url=${input}`;
              break;
            case "v2":
              imgResult = `https://api.apiflash.com/v1/urltoimage?access_key=${altService.apiKey}&wait_until=page_loaded&url=${input}`;
              break;
            case "v3":
              imgResult = `https://image.thum.io/get/fullpage/${input}`;
              break;
            case "v4":
              imgResult = `https://mini.s-shot.ru/2560x1600/PNG/2560/Z100/?${input}`;
              break;
            case "v5":
              imgResult = await ScreenshotMachine(input, "full", "desktop");
              break;
            case "v6":
              imgResult = await pikwy(input);
              break;
            case "v7":
              imgResult = (await tools.ssweb(input))?.data;
              break;
            case "v8":
              imgResult = await v8Screenshot(input);
              break;
            case "v9":
              imgResult = await hexometerScreenshot(input);
              break;
            case "v10":
              imgResult = await googleApis(input);
              break;
            case "v11":
              imgResult = `https://webshot-elzinko.vercel.app/api/webshot?url=${input}`;
              break;
            case "v12":
              imgResult = `https://api.screenshotlayer.com/api/capture?access_key=${altService.apiKey}&url=${input}`;
              break;
            case "v13":
              imgResult = await v13Screenshot(input);
              break;
            case "v14":
              imgResult = `https://api.urlbox.io/v1/${altService.apiKey}/png?url=${input}`;
              break;
            case "v15":
              imgResult = `https://backup15.terasp.net/api/screenshot?resX=1280&resY=900&outFormat=jpg&waitTime=100&isFullPage=false&dismissModals=false&url=${input}`;
              break;
            case "v16":
              imgResult = `https://shotsnap.vercel.app/api/screenshot?page=${input}`;
              break;
            case "v17":
              imgResult = `https://pptr.io/api/screenshot?width=400&height=300&deviceScaleFactor=1&dark=1&url=${input}`;
              break;
            default:
              throw new Error("Versi tidak valid");
          }
          const caption = `✨ *Screenshot berhasil!*\n- ${input}\n\n*Provider:* ${altService.name}\n*Request:* \n- @${m.sender.split("@")[0]}`;
          const isBuffer = Buffer.isBuffer(imgResult);
          const isUrl =
            typeof imgResult === "string" && imgResult.startsWith("http");
          const isBase64 =
            typeof imgResult === "string" && imgResult.startsWith("data:image");
          if (isBuffer) {
            await conn.sendMessage(
              m.chat,
              {
                image: imgResult,
                caption: caption,
                contextInfo: {
                  mentionedJid: [m.sender],
                },
              },
              {
                quoted: m,
              },
            );
          } else if (isUrl) {
            const response = await fetch(imgResult, {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
              },
            });
            const arrayBuffer = await response.arrayBuffer();
            await conn.sendMessage(
              m.chat,
              {
                image: Buffer.from(arrayBuffer),
                caption: caption,
                contextInfo: {
                  mentionedJid: [m.sender],
                },
              },
              {
                quoted: m,
              },
            );
          } else if (isBase64) {
            const base64Data = imgResult.replace(
              /^data:image\/\w+;base64,/,
              "",
            );
            await conn.sendMessage(
              m.chat,
              {
                image: Buffer.from(base64Data, "base64"),
                caption: caption,
                contextInfo: {
                  mentionedJid: [m.sender],
                },
              },
              {
                quoted: m,
              },
            );
          } else {
            await conn.sendMessage(
              m.chat,
              {
                image: {
                  url: imgResult,
                },
                caption: caption,
                contextInfo: {
                  mentionedJid: [m.sender],
                },
              },
              {
                quoted: m,
              },
            );
          }
          return m.react(sukses);
        } catch (error) {
          console.error(error);
        }
      }
    }
    m.reply(
      `⚠️ *Semua layanan gagal!* \n\nPastikan tautan valid atau coba beberapa saat lagi.`,
    );
  }
};
handler.help = ["ssweb"];
handler.tags = ["tools"];
handler.command = /^(ss(web)?(shot)?)$/i;
export default handler;
const ScreenshotMachine = async (url = "", full = false, type = "desktop") => {
  try {
    const form = new URLSearchParams({
      url: url,
      device: type.toLowerCase(),
      cacheLimit: 0,
    });
    if (full) form.append("full", "on");
    const response = await fetch(
      "https://www.screenshotmachine.com/capture.php",
      {
        method: "POST",
        body: form,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        },
      },
    );
    const jsonResponse = await response.json();
    const imageResponse = await fetch(
      `https://www.screenshotmachine.com/${jsonResponse.link}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        },
      },
    );
    return Buffer.from(await imageResponse.arrayBuffer());
  } catch (e) {
    console.log(e);
  }
};
const pikwy = async (url) => {
  try {
    const response = await fetch(
      `https://api.pikwy.com/v1/screenshot?url=${url}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        },
      },
    );
    const jsonResponse = await response.json();
    return `https://api.pikwy.com/v1/screenshot/${jsonResponse.id}`;
  } catch (e) {
    console.log(e);
  }
};
const googleApis = async (url) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?screenshot=true&url=${url}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        },
      },
    );
    const jsonResponse = await response.json();
    const dataURL =
      jsonResponse.lighthouseResult?.fullPageScreenshot?.screenshot?.data;
    return dataURL
      ? Buffer.from(dataURL.replace(/^data:image\/\w+;base64,/, ""), "base64")
      : null;
  } catch (e) {
    console.log(e);
  }
};
const v8Screenshot = async (url) => {
  try {
    const response = await fetch(
      `https://2s9e3bif52.execute-api.eu-central-1.amazonaws.com/production/screenshot?url=${url}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        },
      },
    );
    return Buffer.from(await response.arrayBuffer());
  } catch (e) {
    console.log(e);
  }
};
const hexometerScreenshot = async (url) => {
  try {
    const response = await fetch("https://api.hexometer.com/v2/ql", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        query: `{Property{liveScreenshot(address: "${url}"){width height hash}}}`,
      }),
    });
    const { data } = await response.json();
    return `https://fullpagescreencapture.com/screen/${data.Property.liveScreenshot.hash}.jpg`;
  } catch (e) {
    console.log(e);
  }
};
const v13Screenshot = async (url) => {
  try {
    const response = await fetch("https://api.microlink.io/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        url: url,
        screenshot: true,
        meta: false,
        pdf: false,
      }),
    });
    const jsonResponse = await response.json();
    const imageResponse = await fetch(jsonResponse.data.screenshot.url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      },
    });
    return Buffer.from(await imageResponse.arrayBuffer());
  } catch (e) {
    console.log(e);
  }
};
