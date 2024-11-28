import { AioDown } from "../../lib/download/aiodown.js";
const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    const [url, inputQuality] = args.join(" ").split(" ");
    if (!url) {
      return m.reply(
        `Masukkan URL video.\nContoh penggunaan:\n*${usedPrefix}${command}* <URL> [quality]`,
      );
    }
    const formatMap = {
      aiodownmp3: "mp3",
      aiodownmp4: "mp4",
    };
    const format = formatMap[command] || "mp3";
    m.react(wait);
    const downloader = new AioDown({
      cookies: "PHPSESSID=58bfb450eebf00a1e612669f0d8c4bcf",
    });
    const { mediaUrls } = await downloader.getDownloadLinks(url);
    if (!mediaUrls || mediaUrls.length === 0)
      throw new Error("Media tidak ditemukan atau gagal diunduh.");
    const cleanQualities = mediaUrls.map((media) => ({
      quality: media.quality.replace(/\D/g, ""),
      url: media.url,
    }));
    const availableQualities = cleanQualities.map((media) => media.quality);
    const qualityToUse = availableQualities.includes(inputQuality)
      ? inputQuality
      : availableQualities[0];
    const selectedDownloadLink = cleanQualities.find(
      (media) => media.quality === qualityToUse,
    )?.url;
    if (!selectedDownloadLink)
      throw new Error("Gagal menemukan media dengan kualitas yang dipilih.");
    const title = "Unduhan Video";
    const captvid = `🎵 *Judul:* ${title}\n🔗 *File:* ${format.toUpperCase()}\n🎵 *Kualitas:* ${qualityToUse}p`;
    const infoReply = {
      contextInfo: {
        mediaType: format === "mp4" ? 2 : 1,
        mediaUrl: url,
        previewType: 0,
        renderLargerThumbnail: true,
        sourceUrl: url,
        title: `AioDown - ${format.toUpperCase()}`,
      },
    };
    await conn.reply(m.chat, captvid, m, infoReply);
    infoReply.contextInfo.externalAdReply.body = `Berhasil memutar ${format.toUpperCase()}`;
    const mimetype = format === "mp3" ? "audio/mpeg" : "video/mp4";
    await conn.sendMessage(
      m.chat,
      {
        [format === "mp3" ? "audio" : "video"]: {
          url: selectedDownloadLink,
        },
        caption: captvid,
        mimetype: mimetype,
        contextInfo: infoReply.contextInfo,
      },
      {
        quoted: m,
      },
    );
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["aiodownmp3", "aiodownmp4"].map((v) => `${v} <url> [quality]`);
handler.tags = ["downloader"];
handler.command = /^(aiodownmp3|aiodownmp4)$/i;
handler.exp = 0;
handler.register = false;
handler.limit = true;
export default handler;
