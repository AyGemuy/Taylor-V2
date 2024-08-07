import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
import {
  webp2png
} from "../../lib/webp2mp4.js";
const handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  try {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
      q = (conn.getName(who), m.quoted || m),
      mime = (q.msg || q).mimetype || q.mediaType || "";
    if (/video/g.test(mime) && (q.msg || q).seconds > 11) return m.reply("Maksimal 10 detik!");
    if (!/webp|image|video|gif|viewOnce/g.test(mime)) return m.reply(`Reply Media dengan perintah\n*${usedPrefix + command}*`);
    let out, img = await q?.download(),
      meme = "https://api.caliph.biz.id/api/animeai?img=",
      memee = "&apikey=caliphkey";
    if (/webp/g.test(mime) ? out = meme + await webp2png(img) + memee : /image|video|gif|viewOnce/g.test(mime) && (out = meme + await uploadFile(img) + memee), m.react(wait), !out) throw "Error: Tidak dapat memproses gambar";
    await conn.sendFile(m.chat, out, "result", "Result *AnimeAi*", m);
  } catch (err) {
    m.react(eror);
  }
};
handler.help = ["animeai"], handler.tags = ["maker"], handler.command = ["animeai"];
export default handler;