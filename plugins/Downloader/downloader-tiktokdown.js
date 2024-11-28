import * as cheerio from "cheerio";
import fetch from "node-fetch";
async function TiktokDownload(url) {
  try {
    const response = await fetch(`https://tiktokdownload.online/abc?url=dl`, {
      method: "POST",
      headers: {
        "HX-Request": "true",
        "HX-Trigger": "_gcaptcha_pt",
        "HX-Target": "target",
        "HX-Current-URL": "https://tiktokdownload.online/id",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
        Referer: "https://tiktokdownload.online/id",
      },
      body: new URLSearchParams({
        id: url,
        locale: "id",
        tt: "UjhxVG1j",
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    return $(".result")
      .map((_, el) => {
        const $el = $(el);
        return {
          author: $el.find(".result_author").attr("src") || "No author image",
          name: $el.find("h2").text() || "No name",
          description: $el.find(".maintext").text() || "No description",
          downloadLink:
            $el.find("a.download_link").attr("href") || "No download link",
        };
      })
      .get();
  } catch (error) {
    console.error("Error in tiktokdownload:", error);
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
    if (!url) return m.reply("URL TikTok tidak ditemukan dalam teks.");
    m.react(wait);
    const results = await TiktokDownload(url);
    if (isAll) {
      for (const [index, media] of results.entries()) {
        const mediaUrl = media.downloadLink;
        await conn.sendMessage(
          m.chat,
          {
            video: {
              url: mediaUrl,
            },
            mimetype: "video/mp4",
            caption: `🎥 Video *${index + 1}*\nKualitas: *${media.quality}*`,
          },
          {
            quoted: m,
          },
        );
      }
      m.react(sukses);
    } else {
      const videoUrl = results[0].downloadLink;
      await conn.sendMessage(
        m.chat,
        {
          video: {
            url: videoUrl,
          },
          mimetype: "video/mp4",
          caption: `🎥 Video\nKualitas: *${results[0].quality}*`,
        },
        {
          quoted: m,
        },
      );
      m.react(sukses);
    }
  } catch (error) {
    console.error("Error in handler:", error);
    m.react(eror);
  }
};
handler.help = ["tiktokdownload"].map((v) => v + " <query>");
handler.tags = ["downloader"];
handler.command = /^(tiktokdownload)$/i;
export default handler;
