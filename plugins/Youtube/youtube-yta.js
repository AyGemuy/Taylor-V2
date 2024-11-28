import yts from "yt-search";
import {
  invidious,
  quick,
  notube,
  cobalt,
} from "../../lib/download/youtube.js";
import { toAudio8k } from "../../lib/converter.js";
const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    const text = args.length ? args.join(" ") : m.quoted?.text || null;
    if (!text)
      return m.reply(
        `Masukkan teks atau balas pesan.\nContoh: *${usedPrefix}${command}* Hai!`,
      );
    const isMP3 =
      /^y((outube|tb)audio|(outube|tb?)mp3|utubaudio|taudio|ta)$/i.test(
        command,
      );
    const isDOC = text.includes("--doc");
    const is8k = text.includes("--8k");
    m.react(wait);
    const vid = extractYouTubeUrl(text)
      ? {
          url: text,
          title: null,
          views: null,
          thumbnail: generateThumbnail(getId(extractYouTubeUrl(text))),
        }
      : (await yts(text))?.videos?.[0];
    if (!vid?.url) return m.reply("Video tidak ditemukan.");
    const infoReply = {
      contextInfo: {
        mentionedJid: [m.sender],
        body: `Mengunduh ${isMP3 ? "audio" : "video"}, harap tunggu...`,
        mediaType: 1,
        previewType: 0,
        renderLargerThumbnail: true,
        thumbnailUrl: vid.thumbnail,
        sourceUrl: vid.url,
        mediaUrl: vid.url,
      },
    };
    await conn.reply(
      m.chat,
      `*\`W A I T\`*\n🔗 *Link:* ${vid.url}`,
      m,
      infoReply,
    );
    let data = null;
    const sources = [invidious, notube, cobalt, quick];
    for (const source of sources) {
      try {
        data =
          source === invidious
            ? await source.detail(getId(vid.url), isMP3 ? "mp3" : "mp4")
            : await source(vid.url, isMP3 ? "mp3" : "mp4");
        if (data.buffer) break;
      } catch (error) {
        console.error(`Error fetching from ${source.name || source}:`, error);
        continue;
      }
    }
    if (!data.buffer) return m.reply("Gagal mengunduh media.");
    infoReply.contextInfo.externalAdReply.body = `Berhasil mengunduh ${isMP3 ? "audio" : "video"}`;
    infoReply.contextInfo.externalAdReply.thumbnailUrl =
      data.thumbnail || vid.thumbnail;
    const captvid =
      `${data.title || vid.title ? `📺 *Judul:* ${data.title || vid.title}\n` : ""}
${data.views ? `👁️ *Views:* ${data.views}\n` : ""}
${data.duration ? `⏱️ *Durasi:* ${data.duration}\n` : ""}
${data.detail?.url || vid.url ? `🔗 *Link:* ${data.detail?.url || vid.url}\n` : ""}
${data.description || data.detail?.description ? `📜 *Deskripsi:* ${data.description || data.detail.description}` : ""}`.trim();
    await conn.sendMessage(
      m.chat,
      {
        ...(isDOC
          ? {
              document: is8k
                ? await (await toAudio8k(data.buffer, "mp3"))?.toBuffer()
                : data.buffer,
              mimetype: isMP3 ? "audio/mp4" : "video/mp4",
              caption: captvid,
              fileName: data.title || vid.title || getId(vid.url),
            }
          : isMP3
            ? {
                audio: is8k
                  ? await (await toAudio8k(data.buffer, "mp3"))?.toBuffer()
                  : data.buffer,
                mimetype: "audio/mp4",
              }
            : {
                video: is8k
                  ? await (await toAudio8k(data.buffer, "mp3"))?.toBuffer()
                  : data.buffer,
                mimetype: "video/mp4",
                caption: captvid,
              }),
        contextInfo: infoReply.contextInfo,
      },
      {
        quoted: m,
      },
    );
    m.react(sukses);
  } catch (e) {
    console.error("Handler error:", e);
    m.react(eror);
  }
};
const generateThumbnail = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const isYouTubeUrl =
  /^(?:(?:https?:)?\/\/)?(?:(?:(?:www|m(?:usic)?)\.)?youtu(?:\.be|be\.com)\/(?:shorts\/|live\/|v\/|e(?:mbed)?\/|watch(?:\/|\?(?:\S+=\S+&)*v=)|oembed\?url=https?%3A\/\/(?:www|m(?:usic)?)\.youtube\.com\/watch\?(?:\S+=\S+&)*v%3D|attribution_link\?(?:\S+=\S+&)*u=(?:\/|%2F)watch(?:\?|%3F)v(?:=|%3D))?|www\.youtube-nocookie\.com\/embed\/)(([\w-]{11}))[\?&#]?\S*$/;
const getId = (url) => {
  const match = url.match(isYouTubeUrl);
  return match ? match[2] : null;
};
const extractYouTubeUrl = (text) => {
  const matches = text.match(isYouTubeUrl);
  return matches ? matches[0] : null;
};
handler.help = ["ytmp3", "yta"].map((v) => `${v} <url>`);
handler.tags = ["downloader"];
handler.command = /^y((outube|tb)audio|(outube|tb?)mp3|utubaudio|taudio|ta)$/i;
handler.exp = 15;
handler.register = true;
handler.limit = 3;
export default handler;
