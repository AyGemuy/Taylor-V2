import axios from "axios";

const headers = {
  authority: "music.yt2api.com",
  accept: "application/json",
  "content-type": "application/json",
  origin: "https://freemp3music.org",
  referer: "https://freemp3music.org/",
  "user-agent": "Postify/1.0.0",
};

const MAX_RETRIES = 3;

const yt2api = {
  async request(url, data, retries = MAX_RETRIES) {
    try {
      return await axios.post(url, data, { headers });
    } catch (error) {
      if (retries > 0 && error.code === "ECONNRESET") {
        console.log(
          `Koneksi bermasalah, mencoba ulang... (${MAX_RETRIES - retries + 1})`,
        );
        return await this.request(url, data, retries - 1);
      } else {
        throw error;
      }
    }
  },

  async search(query) {
    try {
      const response = await this.request(
        "https://backlol.yt2api.com/api/search",
        { term: query },
      );
      const { nextPageToken, results } = response.data;

      const toResult = results.map(
        ({
          videoId,
          title,
          thumbnail,
          publishedAt,
          duration,
          viewCount,
          shortViewCount,
          channelName,
          channelId,
        }) => ({
          videoId,
          title,
          thumbnail,
          publishedAt,
          duration,
          viewCount,
          shortViewCount,
          channelName,
          channelId,
        }),
      );

      return { nextPageToken, results: toResult };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async extractor(format, videoUrl, quality) {
    try {
      const response = await this.request("https://music.yt2api.com/api/json", {
        ftype: format,
        url: videoUrl,
      });
      const { extractor, videoId, title, lengthSeconds, tasks } = response.data;
      const validTask = tasks.find(
        (task) => task[quality.name] === quality.value,
      );

      if (!validTask) {
        console.error(
          `❌ Error: ${quality.name} ${quality.value} tidak tersedia.`,
        );
        return;
      }

      return { extractor, videoId, title, lengthSeconds, hash: validTask.hash };
    } catch (error) {
      console.error(`Backend error 😂. Coba lagi nanti wkwk.`);
      throw error;
    }
  },

  async get_task(hash) {
    return await this.request("https://music.yt2api.com/api/json", {
      hash,
    }).then((response) => response.data);
  },

  async progress_task(taskId) {
    return await this.request("https://music.yt2api.com/api/json/task", {
      taskId,
    }).then((response) => response.data);
  },

  async checkProgress(hash) {
    try {
      let taskData = await this.get_task(hash);
      let taskId = taskData.taskId;

      return new Promise((resolve) => {
        const checkInterval = setInterval(async () => {
          const progressData = await this.progress_task(taskId);
          console.clear();
          console.log(`> Judul: ${progressData.title}.${progressData.ext}`);
          console.log(`> Kualitas: ${progressData.quality}`);
          console.log(
            `> Task ID: ${progressData.taskId} ~ ${progressData.status}`,
          );
          console.log(
            `> Download Progress: ${this.createProgressBar(progressData.download_progress)} ${progressData.download_progress}%`,
          );
          console.log(
            `> Convert Progress: ${this.createProgressBar(progressData.convert_progress)} ${progressData.convert_progress}%`,
          );

          if (progressData.status === "finished") {
            clearInterval(checkInterval);
            console.log("Final Data:", progressData);
            resolve(progressData);
          } else if (progressData.status === "failed") {
            console.log(
              "Status Tasking *Gagal*, memulai ulang task progress...",
            );
            const newTaskData = await this.get_task(hash);
            taskId = newTaskData.taskId;
          }
        }, 2000);
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  createProgressBar(percentage) {
    const totalBlocks = 10;
    const filledBlocks = Math.round((percentage / 100) * totalBlocks);
    return (
      "●".repeat(filledBlocks) + "○".repeat(totalBlocks - filledBlocks) + "⦿"
    );
  },
};

async function ytdl(videoUrl, format, qualityOrBitrate) {
  try {
    const quality =
      format === "mp3"
        ? { name: "bitrate", value: qualityOrBitrate }
        : { name: "qualityLabel", value: qualityOrBitrate };
    const extract = await yt2api.extractor(format, videoUrl, quality);

    if (extract) {
      return await yt2api.checkProgress(extract.hash);
    }
  } catch (error) {
    console.error(error);
  }
}

const handler = async (m, { conn, command, args, usedPrefix }) => {
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
    yt2apimp3: "mp3",
    yt2apimp4: "mp4",
  };
  const format = formatMap[command] || "mp3";
  const validQualities =
    format === "mp3"
      ? ["64", "128", "192", "256", "320"]
      : ["360", "480", "720", "1080"];
  const qualityToUse = validQualities.includes(quality)
    ? quality
    : validQualities[0];
  m.react(wait);
  try {
    const taskData = await yt2apidl(url, format, qualityToUse);
    const title = taskData.title || "Unduhan YouTube";
    const caption = `🎥 *Video* 🎶
📌 *Judul*: ${taskData.title}
🔊 *Kualitas*: ${taskData.quality} kbps
📦 *Ukuran File*: ${taskData.filesize}
📁 *Format*: ${taskData.ext}
📊 *ID Video*: ${taskData.videoId}
📈 *Link Download*: ${taskData.download}`;
    const infoReply = {
      contextInfo: {
        mediaType: format === "mp4" ? 2 : 1,
        mediaUrl: url,
        previewType: 0,
        renderLargerThumbnail: true,
        sourceUrl: url,
        title: `YT2API - ${format.toUpperCase()}`,
      },
    };
    await conn.reply(m.chat, caption, m, infoReply);
    infoReply.contextInfo.externalAdReply.body = `Berhasil memutar ${format.toUpperCase()}`;
    const mimetype = format === "mp3" ? "audio/mpeg" : "video/mp4";
    await conn.sendMessage(
      m.chat,
      {
        [format === "mp3" ? "audio" : "video"]: {
          url: taskData.download,
        },
        caption: caption,
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

handler.help = ["yt2apimp3", "yt2apimp4"].map((v) => `${v} <url > [quality]`);
handler.tags = ["downloader"];
handler.command = /^(yt2apimp3|yt2apimp4)$/i;
handler.exp = 0;
handler.register = false;
handler.limit = true;
export default handler;
