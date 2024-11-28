import fetch from "node-fetch";
class AppleMusic {
  async down(trackUrl) {
    try {
      const headers = {
        Accept: "application/json, text/plain, */*",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
        Referer: "https://apple-music-downloader.com/",
      };
      const response1 = await fetch(
        `https://api.fabdl.com/apple-music/get?url=${encodeURIComponent(trackUrl)}`,
        {
          headers: headers,
        },
      );
      if (!response1.ok)
        throw new Error(`HTTP error! status: ${response1.status}`);
      const {
        result: { id, gid, name, image, artists, duration_ms: duration, type },
      } = await response1.json();
      const response2 = await fetch(
        `https://api.fabdl.com/apple-music/mp3-convert-task/${gid}/${id}`,
        {
          headers: headers,
        },
      );
      if (!response2.ok)
        throw new Error(`HTTP error! status: ${response2.status}`);
      const {
        result: { tid },
      } = await response2.json();
      let downloadUrl = null;
      let trackQuality = null;
      let isDownloading = true;
      const startTime = Date.now();
      while (isDownloading) {
        const response3 = await fetch(
          `https://api.fabdl.com/apple-music/mp3-convert-progress/${tid}`,
          {
            headers: headers,
          },
        );
        if (!response3.ok)
          throw new Error(`HTTP error! status: ${response3.status}`);
        const {
          result: { download_url, track_id, quality },
        } = await response3.json();
        if (download_url) {
          downloadUrl = `https://api.fabdl.com${download_url}`;
          trackQuality = quality;
          isDownloading = false;
        } else {
          if (Date.now() - startTime > 6e4) {
            throw new Error("Polling timed out after 1 minute.");
          }
          await new Promise((resolve) => setTimeout(resolve, 2e3));
        }
      }
      return [
        {
          name: name,
          image: image,
          artists: artists,
          duration: duration,
          type: type,
          downloadLinks: [
            {
              text: trackQuality,
              link: downloadUrl,
            },
          ],
        },
      ];
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
}
const handler = async (m, { conn, command, args, usedPrefix }) => {
  const text = args.length ? args.join(" ") : m.quoted?.text || null;
  if (!text)
    return m.reply(
      `Masukkan teks atau balas pesan.\nContoh: *${usedPrefix}${command}* <URL>`,
    );
  const urlPattern = /https?:\/\/[^\s]+/;
  const match = text.match(urlPattern);
  const url = match ? match[0] : null;
  if (!url) return m.reply("URL Apple Music tidak ditemukan dalam teks.");
  m.react(wait);
  try {
    const appleMusic = new AppleMusic();
    const results = await appleMusic.down(url);
    if (!results || results[0]?.downloadLinks.length === 0) {
      return m.reply("Tidak ada media ditemukan.");
    }
    const downloadUrl = results[0]?.downloadLinks[0]?.link;
    const caption = `🎶 Lagu: *${results[0]?.name}*\nArtis: *${results[0]?.artists}*\nKualitas: *${results[0]?.downloadLinks[0]?.text}*`;
    const infoReply = {
      contextInfo: {
        mentionedJid: [m.sender],
      },
    };
    await conn.reply(m.chat, `*\`W A I T\`*\n${caption}`, m, infoReply);
    await conn.sendMessage(
      m.chat,
      {
        audio: {
          url: downloadUrl,
        },
        mimetype: "audio/mpeg",
        fileName: results[0]?.name,
      },
      {
        quoted: m,
      },
    );
    m.react(sukses);
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["applemusic"].map((v) => v + " <query>");
handler.tags = ["downloader"];
handler.command = /^(applemusic)$/i;
export default handler;
