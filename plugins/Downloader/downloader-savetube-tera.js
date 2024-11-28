import fetch from "node-fetch";
class SavetubeTera {
  async down(videoUrl) {
    try {
      const response = await fetch(
        "https://ytshorts.savetube.me/api/v1/terabox-downloader",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
            Referer: "https://ytshorts.savetube.me/terabox-downloader",
          },
          body: JSON.stringify({
            url: videoUrl,
          }),
        },
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const json = await response.json();
      const medias = json.response.map((item) => {
        return {
          text: item.title,
          url: item.resolutions["HD Video"],
          quality: "HD",
        };
      });
      return {
        medias: medias,
      };
    } catch (error) {
      console.error("Error in SaveTube down:", error);
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
    if (!url) return m.reply("URL Terabox tidak ditemukan dalam teks.");
    m.react(wait);
    const savetube = new SavetubeTera();
    const results = await savetube.down(url);
    const videoUrl = results.medias[0].url;
    if (isAll) {
      for (const [index, media] of results.medias.entries()) {
        await conn.sendMessage(
          m.chat,
          {
            video: {
              url: `https://cors-flame.vercel.app/api/cors?url=` + media.url,
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
            url: `https://cors-flame.vercel.app/api/cors?url=` + videoUrl,
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
handler.help = ["savetubetera"].map((v) => v + " <query>");
handler.tags = ["downloader"];
handler.command = /^(savetubetera)$/i;
export default handler;
