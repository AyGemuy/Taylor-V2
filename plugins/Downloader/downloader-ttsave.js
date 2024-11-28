import fetch from "node-fetch";
import * as cheerio from "cheerio";
class TTSave {
  async down(videoUrl) {
    try {
      const response = await fetch("https://ttsave.app/download", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
          Referer: "https://ttsave.app/id",
        },
        body: JSON.stringify({
          query: videoUrl,
          language_id: "2",
        }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const html = await response.text();
      const $ = cheerio.load(html);
      return {
        id: $("#unique-id").val(),
        name: $("h2.font-extrabold.text-xl").text(),
        avatar: $("a img").attr("src"),
        username: $("a.font-extrabold.text-blue-400").text(),
        bio: $("p.text-gray-600").text(),
        stats: {
          views: $("svg.text-gray-500 + span").first().text(),
          likes: $("svg.text-red-500 + span").text(),
          comments: $("svg.text-green-500 + span").text(),
          shares: $("svg.text-yellow-500 + span").text(),
          saves: $("svg.text-blue-500 + span").text(),
        },
        sound: $("svg.text-gray-600 + span").text(),
        downloadLinks: {
          ...Object.fromEntries(
            $("a")
              .get()
              .map((a) => [a.attribs.type, $(a).attr("href")])
              .filter(([type, href]) => type && href && href.trim() !== ""),
          ),
        },
      };
    } catch (error) {
      console.error("Error in TTSave down:", error);
      throw error;
    }
  }
}
const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    const text = args.length ? args.join(" ") : m.quoted?.text || null;
    if (!text)
      return m.reply(
        `Masukkan teks atau balas pesan.\nContoh: *${usedPrefix}${command} <url>*`,
      );
    const isAll = text.endsWith("--all");
    const urlPattern = /https?:\/\/[^\s]+/;
    const match = text.match(urlPattern);
    const url = match ? match[0] : null;
    if (!url) return m.reply("URL TikTok tidak ditemukan dalam teks.");
    m.react(wait);
    const ttsave = new TTSave();
    const results = await ttsave.down(url);
    const caption = `
👤 *${results.name}* (@${results.username})
📄 *Bio*: ${results.bio}
👁️ *Views*: ${results.stats.views}
❤️ *Likes*: ${results.stats.likes}
💬 *Comments*: ${results.stats.comments}
🔁 *Shares*: ${results.stats.shares}
💾 *Saves*: ${results.stats.saves}
🎵 *Sound*: ${results.sound}
    `;
    if (isAll) {
      let mediaType,
        mimetype,
        index = 1;
      for (const [type, link] of Object.entries(results.downloadLinks)) {
        if (link.includes("mp4")) {
          mediaType = "video";
          mimetype = "video/mp4";
        } else if (link.includes("photo")) {
          mediaType = "image";
          mimetype = "image/jpeg";
        } else if (link.includes("music")) {
          mediaType = "audio";
          mimetype = "audio/mp4";
        } else {
          mediaType = "video";
          mimetype = "video/mp4";
        }
        const captionAll = `${caption}\n\n🎥 ${type.charAt(0).toUpperCase() + type.slice(1)} *${index}*\nKualitas: *${type}*`;
        await conn.sendMessage(
          m.chat,
          {
            [mediaType]: {
              url: link,
            },
            mimetype: mimetype,
            caption: captionAll,
          },
          {
            quoted: m,
          },
        );
        index++;
      }
    } else {
      let videoUrl, mediaType, mimetype;
      for (const [type, link] of Object.entries(results.downloadLinks)) {
        videoUrl = link;
        break;
      }
      if (videoUrl.includes("mp4")) {
        mediaType = "video";
        mimetype = "video/mp4";
      } else if (videoUrl.includes("photo")) {
        mediaType = "image";
        mimetype = "image/jpeg";
      } else if (videoUrl.includes("music")) {
        mediaType = "audio";
        mimetype = "audio/mp4";
      } else {
        mediaType = "video";
        mimetype = "video/mp4";
      }
      const captionOne = `${caption}\n\n🎥 Video\nKualitas: *${Object.keys(results.downloadLinks)[0]}*`;
      await conn.sendMessage(
        m.chat,
        {
          [mediaType]: {
            url: videoUrl,
          },
          mimetype: mimetype,
          caption: captionOne,
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
handler.help = ["ttsave"].map((v) => v + " <url>");
handler.tags = ["downloader"];
handler.command = /^(ttsave)$/i;
export default handler;
