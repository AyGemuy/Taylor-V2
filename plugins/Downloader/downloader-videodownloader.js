import fetch from "node-fetch";
import * as cheerio from "cheerio";
class VideoDownloader {
  async down(videoUrl) {
    try {
      const response = await fetch(
        `https://videodownloader.so/download?v=${encodeURIComponent(videoUrl)}&lang=en`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
            Referer: `https://videodownloader.so/download?v=${encodeURIComponent(videoUrl)}&lang=en`,
          },
        },
      );
      const html = await response.text();
      const $ = cheerio.load(html);
      return {
        title: $(".info .title").text().trim(),
        duration: $(".info .duration").text().replace("Duration: ", "").trim(),
        thumbnail: $(".info img").attr("src"),
        videoData: $(".downloadsTable tbody tr")
          .map((_, el) => {
            const quality = $(el).find("td").eq(0).text().trim();
            const downloadLink = $(el).find("a.downloadBtn").attr("href");
            return downloadLink && !/^\d+$|^0$/.test(quality)
              ? {
                  quality: quality,
                  format: $(el).find("td").eq(1).text().trim(),
                  size: $(el).find("td.size").text().trim(),
                  downloadLink: downloadLink,
                }
              : null;
          })
          .get()
          .filter(Boolean)
          .slice(1, -1),
      };
    } catch (error) {
      console.error("Error in VideoDownloader down:", error);
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
    if (!url) return m.reply("URL tidak ditemukan dalam teks.");
    m.react(wait);
    const videoDownloader = new VideoDownloader();
    const results = await videoDownloader.down(url);
    const videoUrl = results.videoData[0].downloadLink;
    if (isAll) {
      for (const [index, media] of results.videoData.entries()) {
        await conn.sendMessage(
          m.chat,
          {
            video: {
              url: media.downloadLink,
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
          caption: `🎥 Video\nKualitas: *${results.videoData[0].quality}*`,
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
handler.help = ["videodownloader"].map((v) => v + " <query>");
handler.tags = ["downloader"];
handler.command = /^(videodownloader)$/i;
export default handler;
