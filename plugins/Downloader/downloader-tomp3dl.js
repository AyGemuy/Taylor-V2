import { ToMP3 } from "../../lib/download/tomp3dl.js";
const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    const [url, quality = "128"] = args.join(" ").split(" ");
    if (!url) {
      return m.reply(
        `Masukkan URL video YouTube.\nContoh penggunaan:\n*${usedPrefix}${command}* https://youtube.com/watch?v=YQHsXMglC9A [quality]`,
      );
    }
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:watch\?v=|embed\/|v\/|playlist\?list=|.+\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/i;
    if (!youtubeRegex.test(url)) {
      return m.reply(
        `URL tidak valid. Harap gunakan URL YouTube.\nContoh penggunaan:\n*${usedPrefix}${command} https://youtube.com/watch?v=YQHsXMglC9A [quality]*`,
      );
    }
    const formatMap = {
      tomp3dlmp3: "mp3",
      tomp3dlmp4: "mp4",
    };
    const format = formatMap[command] || "mp3";
    const validQualities =
      format === "mp3"
        ? ["64", "128", "192", "256", "320"]
        : ["360", "480", "720", "1080"];
    const qualityToUse = validQualities.includes(quality)
      ? quality
      : validQualities[0];
    m.react("⏳");
    const downloader = new ToMP3();
    const media = await downloader[format === "mp3" ? "audio" : "video"](
      url,
      qualityToUse,
    );
    if (!media) throw new Error("Media tidak ditemukan atau gagal diunduh.");
    const title = "Unduhan YouTube";
    const captvid = `🎵 *Judul:* ${title}\n🔗 *File:* ${format.toUpperCase()}\n🎵 *Kualitas:* ${qualityToUse}`;
    const infoReply = {
      contextInfo: {
        mediaType: format === "mp4" ? 2 : 1,
        mediaUrl: url,
        previewType: 0,
        renderLargerThumbnail: true,
        sourceUrl: url,
        title: `ToMP3 - ${format.toUpperCase()}`,
      },
    };
    await conn.reply(m.chat, captvid, m, infoReply);
    infoReply.contextInfo.externalAdReply.body = `Berhasil memutar ${format.toUpperCase()}`;
    const mimetype = format === "mp3" ? "audio/mpeg" : "video/mp4";
    await conn.sendMessage(
      m.chat,
      {
        [format === "mp3" ? "audio" : "video"]: Buffer.from(media),
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
    m.react("❌");
    m.reply(`Terjadi kesalahan: ${e.message}`);
  }
};
handler.help = ["tomp3dlmp3", "tomp3dlmp4"].map((v) => `${v} <url> [quality]`);
handler.tags = ["downloader"];
handler.command = /^(tomp3dlmp3|tomp3dlmp4)$/i;
handler.exp = 0;
handler.register = false;
handler.limit = true;
export default handler;
