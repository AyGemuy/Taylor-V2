import axios from "axios";
import yts from "yt-search";
const DEFAULT_QUALITY_MP3 = "128kbps";
const DEFAULT_QUALITY_MP4 = "360p";
const SUPPORTED_FORMATS = ["mp3", "mp4"];
const SUPPORTED_QUALITIES = [
  "144p",
  "240p",
  "360p",
  "480p",
  "720p",
  "1080p",
  "128kbps",
];
const generateThumbnail = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const extractVid = (data) => {
  const match = /(?:youtu\.be\/|youtube\.com(?:.*[?&]v=|.*\/))([^?&]+)/.exec(
    data,
  );
  return match ? match[1] : null;
};
const getInfo = async (id) => {
  try {
    const { title, description, url, videoId, views, ago, thumbnail, author } =
      await yts({
        videoId: id,
      });
    return {
      title: title,
      description: description,
      url: url,
      videoId: videoId,
      views: views,
      ago: ago,
      thumbnail: thumbnail,
      author: author,
    };
  } catch (error) {
    throw new Error("Gagal mengambil informasi video: " + error.message);
  }
};
const getDownloadLink = async (id) => {
  const headers = {
    Accept: "*/*",
    Origin: "https://id-y2mate.com",
    Referer: `https://id-y2mate.com/${id}`,
    "User-Agent": "Postify/1.0.0",
    "X-Requested-With": "XMLHttpRequest",
  };
  try {
    const response = await axios.post(
      "https://id-y2mate.com/mates/analyzeV2/ajax",
      new URLSearchParams({
        k_query: `https://youtube.com/watch?v=${id}`,
        k_page: "home",
        q_auto: 0,
      }),
      {
        headers: headers,
      },
    );
    if (!response.data || !response.data.links)
      throw new Error("Tidak ada respons dari API.");
    return Object.entries(response.data.links).reduce(
      (acc, [format, links]) => {
        acc[format] = Object.fromEntries(
          Object.values(links).map((option) => [
            option.q || option.f,
            async () => {
              const res = await axios.post(
                "https://id-y2mate.com/mates/convertV2/index",
                new URLSearchParams({
                  vid: id,
                  k: option.k,
                }),
                {
                  headers: headers,
                },
              );
              if (res.data.status !== "ok")
                throw new Error("Error saat konversi.");
              return {
                size: option.size,
                format: option.f,
                url: res.data.dlink,
              };
            },
          ]),
        );
        return acc;
      },
      {
        mp3: {},
        mp4: {},
      },
    );
  } catch (error) {
    throw new Error("Gagal mengambil tautan unduhan: " + error.message);
  }
};
const search = async (query) => {
  try {
    const videos = await yts(query);
    return videos.videos.map(
      ({ videoId, title, description, views, ago, thumbnail }) => ({
        title: title,
        id: videoId,
        url: `https://youtube.com/watch?v=${videoId}`,
        description: description,
        views: views,
        ago: ago,
        thumbnail: thumbnail,
      }),
    );
  } catch (error) {
    throw new Error("Gagal mencari video: " + error.message);
  }
};
const cleanInput = (input, command) => {
  const urlMatch = input.match(
    /(https?:\/\/(?:www\.)?youtu\.be\/[^\s]+|https?:\/\/(?:www\.)?youtube\.com\/[^\s]+)/i,
  );
  const qualityMatch = input.match(/--q=([a-zA-Z0-9]+p|kbps)$/i);
  const url = urlMatch ? urlMatch[0] : null;
  const quality = qualityMatch
    ? qualityMatch[1]
    : command === "y2matemp3"
      ? DEFAULT_QUALITY_MP3
      : DEFAULT_QUALITY_MP4;
  return {
    url: url,
    quality: quality,
  };
};
const getYoutubeVideoData = async (input, command) => {
  const { url, quality } = cleanInput(input, command);
  let videoData;
  try {
    if (url) {
      const id = extractVid(url);
      if (!id) throw new Error("ID video tidak ditemukan.");
      const videoInfo = await getInfo(id);
      const downloadLinks = await getDownloadLink(id);
      videoData = {
        type: "download",
        download: {
          ...videoInfo,
          dl: downloadLinks,
        },
      };
    } else {
      const videos = await search(input);
      const topVideo = videos[0];
      if (!topVideo) throw new Error("Video tidak ditemukan.");
      const videoInfo = await getInfo(topVideo.id);
      const downloadLinks = await getDownloadLink(topVideo.id);
      videoData = {
        type: "download",
        download: {
          ...videoInfo,
          dl: downloadLinks,
        },
      };
    }
  } catch (error) {
    throw new Error("Gagal mengambil data video: " + error.message);
  }
  return {
    videoData: videoData,
    quality: quality,
  };
};
const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    const input = args.length ? args.join(" ") : m.quoted?.text || null;
    if (!input) {
      return m.reply(
        `Masukkan URL video YouTube atau query pencarian.\nContoh:\n*${usedPrefix}${command}* https://youtube.com/watch?v=YQHsXMglC9A --q=720p`,
      );
    }
    await m.react(wait);
    const { videoData, quality } = await getYoutubeVideoData(input, command);
    const isMP3 = /^(y2matemp3)$/i.test(command);
    const videoId = videoData.download.videoId;
    const thumbnailUrl = generateThumbnail(videoId);
    const additionalInfo = videoData.download;
    const captvid = `
🎵 *Judul:* ${additionalInfo.title}
🔗 *Tautan:* ${additionalInfo.url}
👀 *Tampilan:* ${additionalInfo.views}
🗂️ *Quality:* ${quality}
📹 *ID Video:* ${additionalInfo.videoId}
`;
    const infoReply = {
      contextInfo: {
        mediaType: 1,
        mediaUrl: videoData.download.url,
        previewType: 0,
        renderLargerThumbnail: true,
        thumbnailUrl: thumbnailUrl,
        sourceUrl: videoData.download.url,
        title: `Y2Mate - ${command.toUpperCase()}`,
      },
    };
    await conn.reply(m.chat, captvid, m, infoReply);
    const mimetype = isMP3 ? "audio/mpeg" : "video/mp4";
    const { url: mediaUrl } =
      await videoData.download.dl[isMP3 ? "mp3" : "mp4"][quality]();
    await conn.sendMessage(
      m.chat,
      {
        [isMP3 ? "audio" : "video"]: {
          url: mediaUrl,
        },
        caption: captvid,
        mimetype: mimetype,
        contextInfo: infoReply.contextInfo,
      },
      {
        quoted: m,
      },
    );
    await m.react(sukses);
  } catch (e) {
    console.error(e);
    await m.react(eror);
  }
};
handler.help = ["y2matemp3", "y2matemp4"].map(
  (v) => `${v} <url> [--q=quality]`,
);
handler.tags = ["downloader"];
handler.command = /^(y2matemp3|y2matemp4)$/i;
handler.exp = 0;
handler.register = false;
handler.limit = true;
export default handler;
