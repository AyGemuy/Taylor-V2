import {
  Sticker,
  StickerTypes
} from "wa-sticker-formatter";
import {
  webp2mp4
} from "../../lib/webp2mp4.js";
import {
  ffmpeg
} from "../../lib/converter.js";
const handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  try {
    m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender);
    const q = m.quoted || m,
      mime = (q.msg || q).mimetype || "";
    if (!m.quoted) return m.reply(`Reply to a sticker/audio to convert to video with ${usedPrefix + command}`);
    const img = await q?.download(),
      stek = new Sticker(img, {
        pack: packname,
        author: author,
        type: StickerTypes.FULL
      }),
      out = /webp/g.test(mime) ? await webp2mp4(img) : /image/g.test(mime) ? await uploadImage(img) : /video/g.test(mime) ? await uploadFile(img) : /audio/g.test(mime) ? await ffmpeg(media, ["-filter_complex", "color", "-pix_fmt", "yuv420p", "-crf", "51", "-c:a", "copy", "-shortest"], "mp3", "mp4") : "string" != typeof out ? await uploadImage(img) : /gif/g.test(mime) ? stek : null;
    if (!out) throw new Error("Failed to convert sticker/audio to video.");
    out && await conn.sendFile(m.chat, out, "tovid.mp4", "✅ sticker a video", m);
  } catch (error) {
    m.reply("Failed to convert sticker/audio to video. Please try again later."), console.error(error);
  }
};
handler.help = ["tovideo"], handler.tags = ["tools"], handler.command = /^t(o(vid(eos?|s)?|mp4)|vid(eos?|s)?|mp4)$/i;
export default handler;