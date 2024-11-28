import fetch from "node-fetch";
import * as cheerio from "cheerio";
class RetaTube {
  constructor() {
    this.searchEndpoint = "https://retatube.com/api/v1/aio/search";
    this.prefixEndpoint =
      "https://retatube.com/api/v1/aio/index?s=retatube.com";
  }
  getHeader(custom = {}) {
    return {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "*/*",
      "Accept-Language": "id-MM,id;q=0.9",
      Origin: "https://retatube.com",
      Referer: "https://retatube.com/",
      "User-Agent": "Postify/1.0.0",
      ...custom,
    };
  }
  async getPrefix() {
    try {
      const response = await fetch(this.prefixEndpoint);
      const html = await response.text();
      const $ = cheerio.load(html);
      return $('#aio-search-box input[name="prefix"]').val() || "";
    } catch (error) {
      console.error("Error fetching prefix:", error.message);
      return "";
    }
  }
  async getData(videoId) {
    try {
      const prefix = await this.getPrefix();
      const response = await fetch(this.searchEndpoint, {
        method: "POST",
        headers: this.getHeader(),
        body: new URLSearchParams({
          prefix: prefix,
          vid: videoId,
        }),
      });
      const html = await response.text();
      return this.parseHtml(html);
    } catch (error) {
      console.error("Error fetching video data:", error.message);
      return {
        title: "",
        downloadLinks: [],
      };
    }
  }
  parseHtml(html) {
    const $ = cheerio.load(html);
    const title = $(".col #text-786685718 strong")
      .first()
      .text()
      .replace("Title：", "")
      .trim();
    const downloadLinks = $(".col a.button.primary")
      .map((_, link) => {
        const href = $(link).attr("href");
        return href && href !== "javascript:void(0);"
          ? {
              quality: $(link).find("span").text(),
              url: href,
            }
          : null;
      })
      .get()
      .filter(Boolean);
    return {
      title: title,
      downloadLinks: downloadLinks,
    };
  }
  async scrape(videoId) {
    try {
      return await this.getData(videoId);
    } catch (error) {
      console.error(`Scrape Error: ${error.message}`);
      return {
        title: "",
        downloadLinks: [],
      };
    }
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
    m.react(wait);
    const { downloadLinks, title } = await new RetaTube().scrape(text);
    if (!downloadLinks.length)
      return m.reply("Video tidak ditemukan. Silakan coba URL lain.");
    const downloadLink =
      command === "retatubemp3"
        ? downloadLinks.find((link) => link.url.endsWith(".mp3"))?.url
        : downloadLinks[0]?.url;
    if (!downloadLink) return m.reply("Link unduhan tidak ditemukan.");
    const res = await fetch(downloadLink);
    const buffer = await res.arrayBuffer();
    const isAudio = command === "retatubemp3";
    await conn.sendMessage(
      m.chat,
      {
        [isAudio ? "audio" : "video"]: Buffer.from(buffer),
        caption: title,
        mimetype: isAudio ? "audio/mpeg" : "video/mp4",
        contextInfo: {
          mentionedJid: [],
        },
      },
      {
        quoted: m,
      },
    );
    m.react(sukses);
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["retatubemp3", "retatubemp4"].map((v) => `${v} <url>`);
handler.tags = ["downloader"];
handler.command = /^(retatubemp3|retatubemp4)$/i;
handler.exp = 0;
handler.register = false;
handler.limit = true;
export default handler;
