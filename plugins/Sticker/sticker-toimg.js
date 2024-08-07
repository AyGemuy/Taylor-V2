import {
  webp2png
} from "../../lib/webp2mp4.js";
const handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  const notStickerMessage = `✳️ Reply to a sticker with :\n\n *${usedPrefix + command}*`;
  try {
    const q = m.quoted || m,
      mime = q.mediaType || "";
    if (!m.quoted || !/sticker/.test(mime)) return m.reply(notStickerMessage);
    const media = await q?.download();
    media && await conn.sendMessage(m.chat, {
      image: media,
      caption: "*✅ Here you have*"
    }, {
      quoted: m
    });
  } catch (error) {
    try {
      const out = await webp2png(media) || Buffer.alloc(0);
      out && await conn.sendFile(m.chat, out, "out.png", "*✅ Here you have*", m);
    } catch (e) {
      console.error(e);
    }
  }
};
handler.help = ["toimg (reply)"], handler.tags = ["sticker"], handler.command = /^t(oim(age|g)|im(age|g))$/i;
export default handler;