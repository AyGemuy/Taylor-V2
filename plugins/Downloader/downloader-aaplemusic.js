import fetch from "node-fetch";
class AapleMusic {
  constructor() {
    this.baseURL = "https://aaplmusicdownloader.com/api";
  }
  async ytsearch(name, artist, album, link) {
    const url = `${this.baseURL}/composer/ytsearch/mytsearch.php?name=${encodeURIComponent(name)}&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}&link=${encodeURIComponent(link)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
        Referer: "https://aaplmusicdownloader.com/song.php#",
      },
    });
    if (!response.ok) throw new Error("Gagal mengambil data dari ytsearch.");
    return await response.json();
  }
  async ytdl(videoId) {
    const url = `${this.baseURL}/ytdl.php?q=${videoId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
        Referer: "https://aaplmusicdownloader.com/song.php#",
      },
    });
    if (!response.ok) throw new Error("Gagal mengunduh video.");
    return await response.json();
  }
  async applesearch(trackUrl) {
    const response = await fetch(
      `https://aaplmusicdownloader.com/api/applesearch.php?url=${encodeURIComponent(trackUrl)}`,
    );
    if (!response.ok) throw new Error("Gagal mengambil informasi lagu.");
    return await response.json();
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
  m.react(sukses);
  try {
    const appleMusic = new AapleMusic();
    const appleSearchData = await appleMusic.applesearch(url);
    const searchResults = await appleMusic.ytsearch(
      appleSearchData.name,
      appleSearchData.artist,
      appleSearchData.albumname,
      appleSearchData.url,
    );
    const videoData = await appleMusic.ytdl(searchResults.videoid);
    if (!videoData || !videoData.dlink)
      return m.reply("Tidak ada media ditemukan.");
    const downloadUrl = videoData.dlink;
    const caption = `🎶 Lagu: *${appleSearchData.name}*\nArtis: *${appleSearchData.artist}*\nAlbum: *${appleSearchData.albumname}*`;
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
        fileName: appleSearchData.name,
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
handler.help = ["aaplemusic"].map((v) => v + " <query>");
handler.tags = ["downloader"];
handler.command = /^(aaplemusic)$/i;
export default handler;
