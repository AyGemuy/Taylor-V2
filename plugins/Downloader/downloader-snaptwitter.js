import * as cheerio from "cheerio";
import fetch from "node-fetch";
async function SnapTwitter(tweetUrl) {
  try {
    const response = await fetch(
      `https://snapdownloader.com/tools/twitter-video-downloader/download?url=${encodeURIComponent(tweetUrl)}`,
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const body = await response.text();
    const $ = cheerio.load(body);
    return {
      title: $(".metadata .title").text().trim(),
      duration: $(".metadata .duration")
        .text()
        .replace("Duration: ", "")
        .trim(),
      thumbnail: $(".metadata .thumbnail").attr("src"),
      downloads: $(".downloadsTable tbody tr")
        .map((_, el) => {
          const quality = $(el).find("td").eq(0).text().trim();
          const format = $(el).find("td").eq(1).text().trim();
          const downloadLink = $(el).find("a.downloadBtn").attr("href");
          return downloadLink && downloadLink.includes(quality)
            ? {
                quality: quality,
                format: format,
                downloadLink: downloadLink,
              }
            : null;
        })
        .get()
        .filter(Boolean),
    };
  } catch (error) {
    console.error("Error fetching tweet data:", error);
    throw error;
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
    if (!url) return m.reply("URL Twitter tidak ditemukan dalam teks.");
    m.react(wait);
    const results = await SnapTwitter(url);
    if (isAll) {
      for (const [index, result] of results.downloads.entries()) {
        const { downloadLink, quality } = result;
        await conn.sendMessage(
          m.chat,
          {
            video: {
              url: downloadLink,
            },
            mimetype: "video/mp4",
            caption: `🎥 Video *${index + 1}*\nKualitas: *${quality}*`,
          },
          {
            quoted: m,
          },
        );
      }
    } else {
      const { downloadLink, quality } = results.downloads[0];
      await conn.sendMessage(
        m.chat,
        {
          video: {
            url: downloadLink,
          },
          mimetype: "video/mp4",
          caption: `🎥 Video\nKualitas: *${quality}*`,
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
handler.help = ["snaptwitter"].map((v) => v + " <query>");
handler.tags = ["downloader"];
handler.command = /^(snaptwitter)$/i;
export default handler;
