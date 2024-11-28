import fetch from "node-fetch";
import * as cheerio from "cheerio";
class TikVid {
  async down(videoUrl) {
    try {
      const response = await fetch("https://tikvid.io/api/ajaxSearch", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Accept: "*/*",
          "X-Requested-With": "XMLHttpRequest",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
          Referer: "https://tikvid.io/id",
        },
        body: new URLSearchParams({
          q: videoUrl,
          lang: "id",
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const $ = cheerio.load(result.data);
      return $(".video-data")
        .map((i, el) => {
          const thumbnail =
            $(el).find(".image-tik img").attr("src") || "No thumbnail";
          const title = $(el).find(".content h3").text().trim() || "No title";
          const downloadLinks = $(el)
            .find(".dl-action a")
            .map((i, em) => {
              const link = $(em).attr("href") || "";
              return link
                ? {
                    text: $(em).text().trim() || "No text",
                    link: link || "No URL",
                  }
                : null;
            })
            .get()
            .filter(Boolean);
          return downloadLinks.length
            ? {
                thumbnail: thumbnail,
                title: title,
                downloadLinks: downloadLinks,
              }
            : null;
        })
        .get()
        .filter(Boolean);
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
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
    const tikVid = new TikVid();
    const results = await tikVid.down(url);
    if (!results || results[0]?.downloadLinks.length === 0) {
      return m.reply("Tidak ada media ditemukan.");
    }
    if (isAll) {
      for (const [index, media] of results[0]?.downloadLinks.entries()) {
        await conn.sendMessage(
          m.chat,
          {
            video: {
              url: media.link,
            },
            mimetype: "video/mp4",
            caption: `🎥 Video *${index + 1}*\nKualitas: *${media.text}*`,
          },
          {
            quoted: m,
          },
        );
      }
    } else {
      const videoUrl = results[0]?.downloadLinks[0]?.link;
      await conn.sendMessage(
        m.chat,
        {
          video: {
            url: videoUrl,
          },
          mimetype: "video/mp4",
          caption: `🎥 Video\nKualitas: *${results[0]?.downloadLinks[0]?.text}*`,
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
handler.help = ["tikvid"].map((v) => v + " <query>");
handler.tags = ["downloader"];
handler.command = /^(tikvid)$/i;
export default handler;
