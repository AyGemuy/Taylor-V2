import uploadImage from "../../lib/uploadImage.js";
import {
  Sticker
} from "wa-sticker-formatter";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    name = conn.getName(who),
    q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || q.mediaType || "";
  if (/image/g.test(mime) && !/webp/g.test(mime)) {
    let img = await q?.download(),
      out = await uploadImage(img);
    m.reply("Tunggu sebentar...");
    try {
      const some = API("https://some-random-api.com", "/canvas/triggered", {
        avatar: out
      });
      if (some) {
        const stikersome = await createSticker(!1, some, name, 60);
        conn.sendMessage(m.chat, stikersome, "stickerMessage", {
          quoted: m
        });
      } else {
        const dham = "https://api.dhamzxploit.my.id/api/canvas/trigger?url=" + out,
          stikerdham = await createSticker(!1, dham, name, 60);
        conn.sendMessage(m.chat, stikerdham, "stickerMessage", {
          quoted: m
        });
      }
    } catch (error) {
      throw new Error("Gagal membuat stiker triggered");
    }
  } else m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`);
};
handler.menu = ["trigger"], handler.tags = ["search"], handler.command = /^(trigger(ed)?)$/i,
  handler.limit = !0;
export default handler;
async function createSticker(img, url, authorName, quality) {
  return new Sticker(img || url, {
    type: "full",
    author: authorName,
    quality: quality
  }).toBuffer();
}