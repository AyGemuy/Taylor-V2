import { download } from "../../lib/download/flydl.js";
const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    const [url, quality = "128"] = args.join(" ").split(" ");
    if (!url) {
      return m.reply(
        `Masukkan URL video YouTube atau SoundCloud.\nContoh penggunaan:\n*${usedPrefix}${command}* https://youtube.com/watch?v=YQHsXMglC9A [quality]`,
      );
    }
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:watch\?v=|embed\/|v\/|playlist\?list=|.+\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/i;
    const soundcloudRegex =
      /^(https?:\/\/)?(www\.)?(soundcloud\.com\/[a-zA-Z0-9_\/\-]+)$/i;
    const isYouTube = youtubeRegex.test(url);
    const isSoundCloud = soundcloudRegex.test(url);
    if (!isYouTube && !isSoundCloud) {
      return m.reply(
        `URL tidak valid. Harap gunakan URL YouTube atau SoundCloud.\nContoh penggunaan:\n*${usedPrefix}${command} https://youtube.com/watch?v=YQHsXMglC9A [quality]* atau *${usedPrefix}${command} https://soundcloud.com/artist/song [quality]*`,
      );
    }
    const formatMap = {
      flydlmp3: "mp3",
      flydlm4a: "m4a",
      flydlflac: "flac",
    };
    const format = formatMap[command] || "mp3";
    const validQualities = ["32", "64", "128", "192", "256", "320"];
    const qualityToUse = validQualities.includes(quality) ? quality : "128";
    m.react("⏳");
    const { media, info } = await download(url, format, qualityToUse);
    if (!media) throw new Error("Media tidak ditemukan atau gagal diunduh.");
    const {
      author = "Tidak Diketahui",
      filename = "unknown.mp3",
      thumbnail = "",
      title = "Tidak Diketahui",
    } = info || {};
    const durationMinutes = 0;
    const durationSeconds = 0;
    const captvid = `🎵 *Judul:* ${title}\n👤 *Artist:* ${author}\n⌛ *Durasi:* ${durationMinutes}:${durationSeconds} Menit\n🔗 *File:* ${filename}\n🎵 *Kualitas:* ${qualityToUse}kbps`;
    const thumb = thumbnail ? (await conn.getFile(thumbnail)).data : null;
    const infoReply = {
      contextInfo: {
        mediaType: format === "flac" ? 2 : 1,
        mediaUrl: filename,
        previewType: 0,
        renderLargerThumbnail: true,
        sourceUrl: filename,
        thumbnail: thumb,
        title: `FlyDL - ${format.toUpperCase()}`,
      },
    };
    await conn.reply(m.chat, captvid, m, infoReply);
    infoReply.contextInfo.externalAdReply.body = `Berhasil memutar ${format.toUpperCase()}`;
    const mimetype =
      format === "mp3"
        ? "audio/mpeg"
        : format === "m4a"
          ? "audio/m4a"
          : "audio/flac";
    if (format === "flac") {
      await conn.sendMessage(
        m.chat,
        {
          document: Buffer.from(media),
          caption: captvid,
          mimetype: mimetype,
          contextInfo: infoReply.contextInfo,
        },
        {
          quoted: m,
        },
      );
    } else {
      await conn.sendMessage(
        m.chat,
        {
          audio: Buffer.from(media),
          caption: captvid,
          mimetype: mimetype,
          contextInfo: infoReply.contextInfo,
        },
        {
          quoted: m,
        },
      );
    }
  } catch (e) {
    console.error(e);
    m.react("❌");
    m.reply(`Terjadi kesalahan: ${e.message}`);
  }
};
handler.help = ["flydlmp3", "flydlm4a", "flydlflac"].map(
  (v) => `${v} <url> [quality]`,
);
handler.tags = ["downloader"];
handler.command = /^(flydlmp3|flydlm4a|flydlflac)$/i;
handler.exp = 0;
handler.register = false;
handler.limit = true;
export default handler;
