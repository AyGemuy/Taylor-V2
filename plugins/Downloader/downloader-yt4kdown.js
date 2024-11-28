import fetch from "node-fetch";
const isYouTubeUrl =
  /^(?:(?:https?:)?\/\/)?(?:(?:(?:www|m(?:usic)?)\.)?youtu(?:\.be|be\.com)\/(?:shorts\/|live\/|v\/e(?:mbed)?\/|watch(?:\/|\?(?:\S+=\S+&)*v=)|oembed\?url=https?%3A\/\/(?:www|m(?:usic)?)\.youtube\.com\/watch\?(?:\S+=\S+&)*v%3D|attribution_link\?(?:\S+=\S+&)*u=(?:\/|%2F)watch(?:\?|%3F)v(?:=|%3D))?|www\.youtube-nocookie\.com\/embed\/)(([\w-]{11}))[\?&#]?\S*$/;
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
class Yt4kdown {
  async load(ytUrl, format) {
    try {
      const apiUrl = "https://s6.youtube4kdownloader.com/ajax/getLinks.php";
      const params = new URLSearchParams({
        video: ytUrl,
        rand: "lUn61xIdsBJg2Xe",
      });
      const response = await fetch(`${apiUrl}?${params}`, {
        method: "GET",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
          Referer: "https://youtube4kdownloader.com/",
        },
        compress: true,
      });
      const json = await response.json();
      const data = json.data;
      const video = data.v.find((v) => v.quality === format);
      if (!video) {
        throw new Error(`Format ${format} tidak tersedia`);
      }
      return {
        url: video.url,
        title: data.title,
        thumbnail: data.thumbnail,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    const text = args.length
      ? args.join(" ")
      : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text)
      return m.reply(
        `Masukkan URL video YouTube.\nContoh penggunaan:\n*${usedPrefix}${command}* https://youtube.com/watch?v=YQHsXMglC9A`,
      );
    m.react(wait);
    const [ytUrl, qualityLabel] = text?.split(" ");
    if (!isYouTubeUrl.test(ytUrl))
      return m.reply(
        `URL YouTube tidak valid.\nContoh penggunaan:\n*${usedPrefix}${command}* https://youtube.com/watch?v=YQHsXMglC9A`,
      );
    let format;
    if (qualityLabel) {
      const foundFormat = formats.find((f) => f.value === qualityLabel);
      if (foundFormat) {
        format = foundFormat.value;
      } else {
        return m.reply(
          `Quality label tidak valid. Available quality labels: ${formats.map((f) => f.label).join(", ")}`,
        );
      }
    } else {
      format = "360";
    }
    const loader = new Yt4kdown();
    const results = await loader.load(ytUrl, format);
    if (!results) return m.reply("Gagal mendapatkan informasi video.");
    const isAudio = formats.find((f) => f.value === format)?.isAudio;
    await conn.sendMessage(
      m.chat,
      {
        [isAudio ? "audio" : "video"]: {
          url: results.url,
        },
        mimetype: isAudio ? "audio/mpeg" : "video/mp4",
        caption: results.title ? results.title : "",
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
handler.help = ["yt4kdown"].map((v) => `${v} <url>`);
handler.tags = ["downloader"];
handler.command = /^(yt4kdown)$/i;
handler.exp = 0;
handler.register = false;
handler.limit = true;
export default handler;
