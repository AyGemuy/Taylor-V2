import fetch from "node-fetch";
import * as cheerio from "cheerio";
class SnapDouyin {
  async down(videoUrl) {
    try {
      const apiUrl = "https://snapdouyin.app/wp-json/mx-downloader/video-data/";
      const options = {
        method: "POST",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: videoUrl,
        }),
      };
      const response = await fetch(apiUrl, options);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in SnapDouyin down:", error);
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
    const snapDouyin = new SnapDouyin();
    const results = await snapDouyin.down(url);
    if (!results || !results.medias || results.medias.length === 0) {
      return m.reply("Tidak ada media ditemukan.");
    }
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
handler.help = ["snapdouyin"].map((v) => v + " <query>");
handler.tags = ["downloader"];
handler.command = /^(snapdouyin)$/i;
export default handler;
