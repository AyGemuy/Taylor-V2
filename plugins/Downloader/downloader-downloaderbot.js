import fetch from "node-fetch";
class DownloaderBot {
  async down(videoUrl) {
    try {
      const response = await fetch("https://downloader.bot/api/tiktok/info", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
          Referer: "https://downloader.bot/id/download-mp3-tiktok",
        },
        body: JSON.stringify({
          url: videoUrl,
        }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      if (!result.status) throw new Error(result.error);
      const videoData = result.data;
      return {
        medias: [
          {
            text: "MP4",
            url: videoData.mp4,
            quality: "Normal",
          },
          {
            text: "MP3",
            url: videoData.mp3,
            quality: "Audio",
          },
        ],
        info: {
          nick: videoData.nick,
          video_info: videoData.video_info,
          video_img: videoData.video_img,
          video_date: videoData.video_date,
        },
      };
    } catch (error) {
      console.error("Error in DownloaderBot down:", error);
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
    const downloaderBot = new DownloaderBot();
    const results = await downloaderBot.down(url);
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
      const videoUrl = results.medias[0].url;
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
handler.help = ["downloaderbot"].map((v) => v + " <query>");
handler.tags = ["downloader"];
handler.command = /^(downloaderbot)$/i;
export default handler;
