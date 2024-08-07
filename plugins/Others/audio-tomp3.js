import {
  toAudio,
  toAudio8k
} from "../../lib/converter.js";
const handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  try {
    let q = m.quoted ? m.quoted : m,
      mime = (m.quoted ? m.quoted : m.msg).mimetype || "";
    if (!/video|audio/.test(mime)) throw `reply video/audio you want to convert to voice note/vn with caption *${usedPrefix + command}*`;
    let media = await q?.download();
    if (!media) throw "Can't download media";
    let audio = await toAudio(media, "mp3") || await toAudio8k(media, "mp3");
    if (!audio.data) throw "Can't convert media to audio";
    await conn.sendFile(m.chat, audio.data, "audio.mp3", "", m, !1, {
      mimetype: "audio/mp4",
      ptt: !1
    });
  } catch (error) {
    throw console.error(error), `An error occurred: ${error}`;
  }
};
handler.help = ["toaudio"], handler.tags = ["audio"], handler.command = /^to(mp3|a(udio)?)$/i;
export default handler;