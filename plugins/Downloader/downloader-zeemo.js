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
    const ytRegex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
    if (!ytRegex.test(text))
      return m.reply(
        `URL YouTube tidak valid.\nContoh penggunaan:\n*${usedPrefix}${command} https://youtube.com/watch?v=YQHsXMglC9A*`,
      );
    const isMP3 = /^zeemomp3$/i.test(command);
    m.react(wait);
    const data = await new ZeemoDl().download(text);
    if (!data?.data)
      throw new Error("Video tidak ditemukan. Silakan coba URL lain.");
    const {
      videoName: title = "Tidak Diketahui",
      thumbnailUrl: thumbnail,
      duration: timestamp = "Tidak Diketahui",
      sourceVideoUrl: url,
      downloadUrl,
      audioDownloadUrl,
    } = data.data;
    const captvid = `📺 *Judul:* ${title}\n⌛ *Durasi:* ${Math.floor(timestamp / 60)}:${timestamp % 60} Menit\n🔗 *Link:* ${url}`;
    const ytthumb = (await conn.getFile(thumbnail))?.data;
    const infoReply = {
      contextInfo: {
        mediaType: isMP3 ? 1 : 2,
        mediaUrl: url,
        previewType: 0,
        renderLargerThumbnail: true,
        sourceUrl: url,
        thumbnail: ytthumb,
        title: `Z E E M O - ${isMP3 ? "A U D I O" : "V I D E O"}`,
      },
    };
    await conn.reply(m.chat, captvid, m, infoReply);
    infoReply.contextInfo.externalAdReply.body = `Berhasil memutar ${isMP3 ? "audio" : "video"}`;
    const downloadLink = isMP3 ? audioDownloadUrl : downloadUrl;
    if (!downloadLink) throw new Error("Link unduhan tidak ditemukan.");
    const res = await conn.getFile(downloadLink);
    if (!res.ok) throw new Error("Gagal mengunduh media.");
    const buffer = res.data;
    const isAudio = isMP3;
    const isVideo = !isMP3;
    if (isAudio || isVideo) {
      await conn.sendMessage(
        m.chat,
        {
          [isAudio ? "audio" : "video"]: Buffer.from(buffer),
          caption: captvid,
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
handler.help = ["zeemomp3", "zeemomp4"].map((v) => `${v} <url>`);
handler.tags = ["downloader"];
handler.command = /^(zeemomp3|zeemomp4)$/i;
handler.exp = 0;
handler.register = false;
handler.limit = true;
export default handler;
class ZeemoDl {
  constructor() {
    this.url =
      "https://api.zeemo.ai/hy-caption-front/api/v1/video-download/yt-dlp-video-info";
    this.urlv2 =
      "https://api.zeemo.ai/hy-caption-front/api/v1/video-download/youtube-video-info";
    this.headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
      "User-Agent": "Postify/1.0.0",
    };
  }
  async download(videoUrl) {
    try {
      const response = await fetch(this.url, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          url: videoUrl,
          videoSource: 3,
        }),
      });
      const data = await response.json();
      if (data.success) return data;
    } catch (error) {
      try {
        const response = await fetch(this.urlv2, {
          method: "POST",
          headers: this.headers,
          body: JSON.stringify({
            youtubeUrl: videoUrl,
          }),
        });
        const data = await response.json();
        if (data.success) return data;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
