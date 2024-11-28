import fetch from "node-fetch";
import * as cheerio from "cheerio";
async function dirpy(ytUrl) {
  try {
    const response = await fetch(
      `https://dirpy.com/studio?url=${encodeURIComponent(ytUrl)}&affid=yt2mp3&utm_source=yt2mp3tech&utm_medium=download`,
      {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
          "X-CSRFToken": (
            await (await fetch("https://dirpy.com/studio")).text()
          ).match(/value="([^"]+)"/)[1],
          Referer: ytUrl,
        },
      },
    );
    const html = await response.text();
    const $ = cheerio.load(html);
    const data = $("div.col-md-6")
      .map((index, el) => {
        const title = $(el).find("h2.panel-title").text().trim();
        const mediaLink = $(el).find("video source").attr("src");
        return {
          title: title,
          mediaLink: mediaLink,
        };
      })
      .get();
    const results = data.filter((v) => v.mediaLink);
    if (!results.length)
      throw new Error("Video tidak ditemukan. Silakan coba URL lain.");
    return results;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    const text = args.length
      ? args.join(" ")
      : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text)
      return m.reply(
        `Masukkan URL video YouTube.\nContoh penggunaan:\n*${usedPrefix}${command}* https://youtube.com/watch?v=YQHsXMglC9A`,
      );
    const ytRegex = /^(http(s)?:\/\/)?((w){3}\.)?youtu(be|\.be)?(\.com)?\/.+/;
    if (!ytRegex.test(text))
      return m.reply(
        `URL YouTube tidak valid.\nContoh penggunaan:\n*${usedPrefix}${command}* https://youtube.com/watch?v=YQHsXMglC9A`,
      );
    const isMP3 = /^dirpymp3$/i.test(command);
    m.react(wait);
    const results = await dirpy(text);
    if (!results)
      throw new Error("Video tidak ditemukan. Silakan coba URL lain.");
    for (const result of results) {
      const download_url = result.mediaLink;
      if (download_url) {
        await conn.sendMessage(
          m.chat,
          {
            [isMP3 ? "audio" : "video"]: {
              url: download_url,
            },
            mimetype: isMP3 ? "audio/mpeg" : "video/mp4",
            caption: result.title ? result.title : "",
          },
          {
            quoted: m,
          },
        );
      } else {
        m.react(eror);
      }
    }
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["dirpymp3", "dirpymp4"].map((v) => `${v} <url>`);
handler.tags = ["downloader"];
handler.command = /^(dirpymp3|dirpymp4)$/i;
handler.exp = 0;
handler.register = false;
handler.limit = true;
export default handler;
