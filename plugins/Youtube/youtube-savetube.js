import fetch from "node-fetch";
import yts from "yt-search";
import _ from "lodash";
const handler = async (m, {
  conn,
  command,
  args,
  usedPrefix
}) => {
  try {
    const text = _.get(args, "length") ? args.join(" ") : _.get(m, "quoted.text") || _.get(m, "quoted.caption") || _.get(m, "quoted.description") || null;
    if (!text) return m.reply(`Masukkan teks atau balas pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
    const isMp3 = /^(savetubemp3)$/i.test(command);
    const isMp4 = /^(savetube|savetubemp4)$/i.test(command);
    m.react(wait);
    const videoData = /^(https?:\/\/)?(www\.)?((youtube\.com\/(?:embed\/|v\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11}))$/.test(text) ? await fetchVideoInfo(text) : await fetchVideoInfo((await ytsearch(text))?.url);
    if (!videoData) throw new Error("Video tidak ditemukan. Silakan coba kata kunci lain.");
    const {
      title = "Tidak Diketahui",
        thumbnail,
        durationLabel,
        views,
        url,
        audio_formats,
        video_formats
    } = videoData;
    const formattedViews = views ? `${views.toLocaleString()} views` : "Views tidak tersedia";
    const captvid = `📺 *Judul:* ${title}\n⌛ *Durasi:* ${durationLabel}\n👀 *Views:* ${formattedViews}\n🔗 *Link:* ${url}`;
    const ytthumb = (await conn.getFile(thumbnail))?.data;
    const infoReply = {
      contextInfo: {
        externalAdReply: {
          body: `Mengunduh ${isMp3 ? "audio" : "video"}, harap tunggu...`,
          mediaType: 1,
          mediaUrl: url,
          previewType: 0,
          renderLargerThumbnail: true,
          sourceUrl: url,
          thumbnail: ytthumb,
          title: `Y O U T U B E - ${isMp3 ? "A U D I O" : "V I D E O"}`
        }
      }
    };
    await conn.reply(m.chat, captvid, m, infoReply);
    infoReply.contextInfo.externalAdReply.body = `Berhasil memutar ${isMp3 ? "audio" : "video"}`;
    const mediaFormats = isMp3 ? audio_formats : video_formats;
    const media = await fetchMedia(mediaFormats);
    const {
      buffer,
      contentType
    } = media;
    const isAudio = contentType?.startsWith("audio");
    const isVideo = contentType?.startsWith("video");
    if (isAudio || isVideo) {
      await conn.sendMessage(m.chat, {
        [isAudio ? "audio" : "video"]: buffer,
        caption: captvid,
        mimetype: isAudio ? "audio/mpeg" : "video/mp4",
        contextInfo: infoReply.contextInfo
      }, {
        quoted: m
      });
    } else {
      await conn.sendMessage(m.chat, {
        text: `Media tidak ditemukan dalam format yang diinginkan.`,
        contextInfo: infoReply.contextInfo
      }, {
        quoted: m
      });
    }
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["savetubemp3 <link>", "savetube <link>", "savetubemp4 <link>"];
handler.tags = ["downloader"];
handler.command = /^(savetubemp3|savetube|savetubemp4)$/i;
handler.limit = true;
export default handler;
async function fetchVideoInfo(url) {
  try {
    const res = await fetch(`https://cdn35.savetube.me/info?url=${encodeURIComponent(url)}`);
    return (await res.json())?.data ?? null;
  } catch {
    return null;
  }
}
async function fetchMedia(mediaList) {
  const media = await Promise.all(mediaList.map(async item => {
    try {
      if (!item.url) return null;
      const mediaResponse = await fetch(item.url);
      const contentType = mediaResponse.headers.get("content-type");
      if (mediaResponse.ok && (contentType?.startsWith("video") || contentType?.startsWith("audio"))) {
        return {
          url: item.url,
          buffer: Buffer.from(await mediaResponse.arrayBuffer()),
          contentType: contentType
        };
      }
    } catch {}
    return null;
  }));
  return media.find(v => v) ?? (() => {
    throw new Error("No valid media found.");
  })();
}
async function ytsearch(query, maxResults = 5, similarityThreshold = .5) {
  try {
    const res = await yts(query);
    const videos = _.filter(res.videos.slice(0, maxResults), video => {
      const titleWords = _.words(_.toLower(video.title));
      const queryWords = _.words(_.toLower(query));
      const matchedWords = _.intersection(titleWords, queryWords);
      const similarity = _.size(matchedWords) / _.size(titleWords);
      return similarity >= similarityThreshold || _.size(matchedWords) >= _.size(queryWords) - 1;
    });
    return _.first(videos) ?? {};
  } catch {
    return {};
  }
}