import * as cheerio from "cheerio";
import fetch from "node-fetch";
async function TwitSave(tweetUrl) {
  try {
    const response = await fetch(
      `https://twitsave.com/info?url=${encodeURIComponent(tweetUrl)}`,
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const $ = cheerio.load(await response.text());
    const downloads = $(".origin-top-right ul li")
      .map((_, el) => {
        const resolutionText = $(el)
          .find(".truncate")
          .text()
          .trim()
          .replace(/\s+Video\s+|Resolution/g, "");
        const downloadLink = $(el).find("a").attr("href");
        const resolution = resolutionText.match(/(\d+x\d+)/)?.[0] || null;
        return downloadLink
          ? {
              resolution: resolution,
              downloadLink: atob(
                decodeURIComponent(downloadLink.split("file=")[1]),
              ),
            }
          : null;
      })
      .get()
      .filter(Boolean);
    return {
      author: {
        name: $(".font-semibold.text-slate-800").text(),
        twitterLink: $(".font-semibold.text-slate-800").attr("href"),
        timestamp: $(".text-xs.text-slate-500").text(),
      },
      video: {
        src: $("video").attr("src"),
        poster: $("video").attr("poster"),
      },
      downloads: downloads,
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
    await m.react(wait);
    const results = await TwitSave(url);
    if (!results.downloads || results.downloads.length === 0)
      return m.reply("Tidak ada hasil ditemukan.");
    if (isAll) {
      for (const [index, result] of results.downloads.entries()) {
        const { downloadLink } = result;
        await conn.sendMessage(
          m.chat,
          {
            video: {
              url: downloadLink,
            },
            mimetype: "video/mp4",
            caption: `🎥 Video *${index + 1}*\nKualitas: *${result.resolution}*`,
          },
          {
            quoted: m,
          },
        );
      }
      await m.react(sukses);
    } else {
      const { downloadLink } = results.downloads[0];
      await conn.sendMessage(
        m.chat,
        {
          video: {
            url: downloadLink,
          },
          mimetype: "video/mp4",
          caption: `🎥 Video\nKualitas: *${results.downloads[0].resolution}*`,
        },
        {
          quoted: m,
        },
      );
      await m.react(sukses);
    }
  } catch (e) {
    console.error(e);
    await m.react(eror);
  }
};
handler.help = ["twitsave"].map((v) => v + " <query>");
handler.tags = ["downloader"];
handler.command = /^(twitsave)$/i;
export default handler;
