import fetch from "node-fetch";
import * as cheerio from "cheerio";
const ssstwitter = async (inputUrl) => {
  try {
    const url = inputUrl.includes("x.com")
      ? inputUrl.replace("x.com", "twitter.com")
      : inputUrl;
    const headers = {
      Host: "ssstwitter.com",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0",
      Accept: "*/*",
      "HX-Request": "true",
      Origin: "https://ssstwitter.com",
      Referer: "https://ssstwitter.com/id",
      "Cache-Control": "no-cache",
    };
    const data = new URLSearchParams({
      id: url,
      locale: "id",
      tt: "bc9841580b5d72e855e7d01bf3255278l",
      ts: "1691416179",
      source: "form",
    });
    const response = await fetch("https://ssstwitter.com/id", {
      method: "POST",
      headers: headers,
      body: data,
      redirect: "follow",
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();
    const $ = cheerio.load(html);
    const result = {
      scriptLinks: $(
        ".content-wrapper .splash-container#splash .splash #result .content-wrapper .result#mainpicture .result_overlay script",
      )
        .map((_, el) => {
          const data = $(el)
            .html()
            ?.split("hdInfoLink = ")[1]
            ?.replace(/["';]/g, "")
            .trim();
          const base64String = data ? data.split("/").pop().toString() : null;
          return base64String ? base64String : null;
        })
        .get()
        .filter(Boolean),
      hiddenInputs: $(
        '.content-wrapper .splash-container#splash .splash #result .content-wrapper .result#mainpicture .result_overlay input[type="hidden"]',
      )
        .map((_, el) => {
          const value = $(el).val();
          const base64String = value
            ? value.trim().split("/").pop().toString()
            : null;
          return base64String ? JSON.parse(atob(base64String)) : null;
        })
        .get()
        .filter(Boolean),
      anchorLinks: $(
        ".content-wrapper .splash-container#splash .splash #result .content-wrapper .result#mainpicture .result_overlay a",
      )
        .map((_, el) => {
          const href = $(el).attr("href");
          const base64String = href
            ? href.split("/").pop().trim().toString()
            : null;
          return base64String ? base64String : null;
        })
        .get()
        .filter((v) => v !== "#")
        .filter(Boolean),
    };
    const hd =
      result.scriptLinks.length > 0 ? atob(result.scriptLinks[0]) : null;
    const video =
      result.anchorLinks.length > 0 ? atob(result.anchorLinks[0]) : null;
    const output = Object.entries({
      hd: hd,
      video: video,
      url: result.hiddenInputs.length > 0 ? result.hiddenInputs[0]?.url : null,
    }).map(([quality, url]) => {
      const match = url.match(/(\d+x\d+)/);
      return {
        url: url,
        quality: match ? match[0] : quality,
      };
    });
    const uniqueUrls = Array.from(new Set(output.map((item) => item.url))).map(
      (url) => output.find((item) => item.url === url),
    );
    return uniqueUrls;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    const text = args.length ? args.join(" ") : m.quoted?.text || null;
    if (!text)
      return m.reply(
        `Masukkan teks atau balas pesan.\nContoh: *${usedPrefix}${command}* Hai!`,
      );
    const isAll = text.endsWith("--all");
    const urlPattern = /https?:\/\/[^\s]+/;
    const match = text.match(urlPattern);
    const url = match ? match[0] : null;
    if (!url) return m.reply("URL Twitter tidak ditemukan dalam teks.");
    m.react(wait);
    const results = await ssstwitter(url);
    if (isAll) {
      for (const [index, result] of results.entries()) {
        const { url } = result;
        await conn.sendMessage(
          m.chat,
          {
            video: {
              url: url,
            },
            mimetype: "video/mp4",
            caption: `🎥 Video *${index + 1}*\nKualitas: *${result.quality}*`,
          },
          {
            quoted: m,
          },
        );
      }
    } else {
      const { url } = results[0];
      await conn.sendMessage(
        m.chat,
        {
          video: {
            url: url,
          },
          mimetype: "video/mp4",
          caption: `🎥 Video\nKualitas: *${results[0].quality}*`,
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
  }
};
handler.help = ["twitter"].map((v) => v + " <query>");
handler.tags = ["downloader"];
handler.command = /^twit(t(er(dl)?)?)?$/i;
export default handler;
