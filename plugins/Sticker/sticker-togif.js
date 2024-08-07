import {
  webp2mp4
} from "../../lib/webp2mp4.js";
const handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  if (!m.quoted) throw `balas stiker dengan caption *${usedPrefix + command}*`;
  let q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || "";
  if (!/webp/g.test(mime)) throw `balas stiker dengan caption *${usedPrefix + command}*`;
  let media = await q?.download(),
    out = Buffer.alloc(0);
  /webp/g.test(mime) && (out = await webp2mp4(media)), await conn.sendMessage(m.chat, {
    video: {
      url: out
    },
    caption: "✅ sticker a gif",
    gifPlayback: !0,
    gifAttribution: Math.floor(2 * Math.random()) + 1
  }, {
    quoted: m
  });
};
handler.help = ["togif (reply media)"], handler.tags = ["sticker"], handler.command = /^togifs?$/i;
export default handler;