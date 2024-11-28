import fetch from "node-fetch";
const isYouTubeUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
const formats = [
  {
    label: "MP3",
    value: "mp3",
    isAudio: true,
  },
  {
    label: "M4A",
    value: "m4a",
    isAudio: true,
  },
  {
    label: "WEBM",
    value: "webm",
    isAudio: true,
  },
  {
    label: "AAC",
    value: "aac",
    isAudio: true,
  },
  {
    label: "FLAC",
    value: "flac",
    isAudio: true,
  },
  {
    label: "OPUS",
    value: "opus",
    isAudio: true,
  },
  {
    label: "OGG",
    value: "ogg",
    isAudio: true,
  },
  {
    label: "WAV",
    value: "wav",
    isAudio: true,
  },
  {
    label: "MP4 (360p)",
    value: "360",
    isAudio: false,
  },
  {
    label: "MP4 (480p)",
    value: "480",
    isAudio: false,
  },
  {
    label: "MP4 (720p)",
    value: "720",
    isAudio: false,
  },
  {
    label: "MP4 (1080p)",
    value: "1080",
    isAudio: false,
  },
  {
    label: "MP4 (1440p)",
    value: "1440",
    isAudio: false,
  },
  {
    label: "WEBM (4K)",
    value: "4k",
    isAudio: false,
  },
];
class Loader {
  async load(ytUrl, format) {
    try {
      const downloadUrl = new URL("https://ab.cococococ.com/ajax/download.php");
      downloadUrl.searchParams.set("format", format);
      downloadUrl.searchParams.set("url", ytUrl);
      const response = await fetch(downloadUrl, {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0",
          Referer: "https://en.loader.to/4/",
        },
        compress: true,
      });
      const json = await response.json();
      if (!json.id) throw new Error("Invalid response from the server");
      const progressUrl = new URL("https://p.oceansaver.in/ajax/progress.php");
      progressUrl.searchParams.set("id", json.id);
      const timeout = 6e4;
      const interval = 2e3;
      const startTime = Date.now();
      while (true) {
        const progressResponse = await fetch(progressUrl, {
          method: "GET",
          headers: {
            "User-Agent": "Mozilla/5.0",
            Referer: "https://en.loader.to/4/",
          },
          compress: true,
        });
        const progressData = await progressResponse.json();
        if (progressData.progress >= 1e3) {
          return progressData;
        }
        if (Date.now() - startTime > timeout) {
          throw new Error("Timeout reached");
        }
        await new Promise((resolve) => setTimeout(resolve, interval));
      }
    } catch (error) {
      console.error("Download failed:", error.message);
      return null;
    }
  }
}
const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    const text = args.length ? args.join(" ") : m.quoted?.text || null;
    if (!text)
      return m.reply(
        `Masukkan URL YouTube.\nContoh:\n*${usedPrefix}${command}* <URL>`,
      );
    m.react(wait);
    const [ytUrl, qualityLabel] = text.split(" ");
    if (!isYouTubeUrl.test(ytUrl))
      return m.reply(
        `URL YouTube tidak valid.\nContoh:\n*${usedPrefix}${command}* <URL>`,
      );
    const foundFormat = qualityLabel
      ? formats.find((f) => f.value === qualityLabel)
      : {
          value: "360",
          isAudio: false,
        };
    if (!foundFormat)
      return m.reply(
        `Label kualitas tidak valid. Tersedia: ${formats.map((f) => f.label).join(", ")}`,
      );
    const loader = new Loader();
    const results = await loader.load(ytUrl, foundFormat.value);
    if (!results) return m.reply("Gagal mengambil info video.");
    const selectedQualityUrl = results.download_url;
    const isAudio = foundFormat.isAudio;
    await conn.sendMessage(
      m.chat,
      {
        [isAudio ? "audio" : "video"]: {
          url: selectedQualityUrl,
        },
        mimetype: isAudio ? "audio/mpeg" : "video/mp4",
        caption: results.text || "",
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
handler.help = ["loaderto"].map((v) => `${v} <url>`);
handler.tags = ["downloader"];
handler.command = /^(loaderto)$/i;
handler.exp = 0;
handler.register = false;
handler.limit = true;
export default handler;
