import fetch from "node-fetch";
const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    const text = args.length
      ? args.join(" ")
      : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text)
      return m.reply(
        `Masukkan URL video YouTube.\nContoh penggunaan:\n*${usedPrefix}${command}* https://youtube.com/watch?v=YQHsXMglC9A`,
      );
    const ytRegex = /^(http(s)?:\/\/)?((w){3}\.)?youtu(be|\.be)?(\.com)?\/.+/;
    if (!ytRegex.test(text))
      return m.reply(
        `URL YouTube tidak valid.\nContoh penggunaan:\n*${usedPrefix}${command}* https://youtube.com/watch?v=YQHsXMglC9A`,
      );
    const isMP3 = /^ddownrmp3$/i.test(command);
    const format = isMP3 ? "mp3" : "360";
    m.react(wait);
    const data = await Ddownr(text, format);
    if (!data) throw new Error("Video tidak ditemukan. Silakan coba URL lain.");
    const { download_url } = data;
    if (!download_url) throw new Error("Link unduhan tidak ditemukan.");
    const res = await conn.getFile(download_url);
    if (!res.ok) throw new Error("Gagal mengunduh media.");
    const buffer = res.data;
    const isAudio = isMP3;
    const isVideo = !isMP3;
    if (isAudio || isVideo) {
      await conn.sendMessage(
        m.chat,
        {
          [isMP3 ? "audio" : "video"]: Buffer.from(buffer),
          mimetype: isAudio ? "audio/mpeg" : "video/mp4",
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
          text: "Media tidak ditemukan dalam format yang diinginkan.",
          contextInfo: infoReply.contextInfo,
        },
        {
          quoted: m,
        },
      );
    }
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["ddownrmp3", "ddownrmp4"].map((v) => `${v} <url>`);
handler.tags = ["downloader"];
handler.command = /^(ddownrmp3|ddownrmp4)$/i;
handler.exp = 0;
handler.register = false;
handler.limit = true;
export default handler;
async function Ddownr(videoUrl, format = "360") {
  try {
    const apiUrl = "https://ab.cococococ.com/ajax/download.php";
    const progressUrl = "https://p.oceansaver.in/ajax/progress.php";
    const apiKey = "dfcb6d76f2f6a9894gjkege8a4ab232222";
    const timeout = 6e4,
      interval = 2e3;
    const res = await fetch(
      `${apiUrl}?copyright=0&format=${format}&url=${encodeURIComponent(videoUrl)}&api=${apiKey}`,
    );
    const { id, success } = await res.json();
    if (!success || !id) throw new Error("Failed to initiate download");
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const progress = await fetch(`${progressUrl}?id=${id}`).then((res) =>
        res.json(),
      );
      if (progress.success && progress.download_url) return progress;
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
    throw new Error("Download timeout exceeded");
  } catch (err) {
    console.error(err.message);
  }
}
