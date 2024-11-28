import fetch from "node-fetch";
import * as cheerio from "cheerio";
class TikTokIO {
  async down(videoUrl) {
    try {
      const response = await fetch("https://tiktokio.com/api/v1/tk-htmx", {
        method: "POST",
        headers: {
          "HX-Request": "true",
          "HX-Trigger": "search-btn",
          "HX-Target": "tiktok-parse-result",
          "HX-Current-URL": "https://tiktokio.com/id/",
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
          Referer: "https://tiktokio.com/id/",
        },
        body: new URLSearchParams({
          prefix: "dtGslxrcdcG9raW8uY29t",
          vid: videoUrl,
        }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const html = await response.text();
      const $ = cheerio.load(html);
      const results = $(".tk-down-link a")
        .map((_, el) => {
          const $el = $(el);
          return {
            text: $el.text(),
            url: $el.attr("href"),
            quality: $el.text().includes("(HD)") ? "HD" : "Normal",
          };
        })
        .get()
        .filter((v) => v.url.startsWith("https"));
      return {
        medias: results,
      };
    } catch (error) {
      console.error("Error in TikTokIO down:", error);
      throw error;
    }
  }
}
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
    if (!url) return m.reply("URL TikTok tidak ditemukan dalam teks.");
    m.react(wait);
    const tikTokIO = new TikTokIO();
    const results = await tikTokIO.down(url);
    const videoUrl = results.medias[0].url;
    if (isAll) {
      for (const [index, media] of results.medias.entries()) {
        await conn.sendMessage(
          m.chat,
          {
            video: {
              url: media.url,
            },
            mimetype: "video/mp4",
            caption: `🎥 Video *${index + 1}*\nKualitas: *${media.quality}*`,
          },
          {
            quoted: m,
          },
        );
      }
    } else {
      await conn.sendMessage(
        m.chat,
        {
          video: {
            url: videoUrl,
          },
          mimetype: "video/mp4",
          caption: `🎥 Video\nKualitas: *${results.medias[0].quality}*`,
        },
        {
          quoted: m,
        },
      );
    }
    m.react(sukses);
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["tiktokio"].map((v) => v + " <query>");
handler.tags = ["downloader"];
handler.command = /^(tiktokio)$/i;
export default handler;
