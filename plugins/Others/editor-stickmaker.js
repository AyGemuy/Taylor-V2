import uploadImage from "../../lib/uploadImage.js";
import {
  createSticker
} from "wa-sticker-formatter";
import fs from "fs";
const effects = ["jail", "gay", "glass", "wasted", "triggered"],
  handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
  }) => {
    let q = m.quoted ? m.quoted : m,
      mime = (q.msg || q).mimetype || q.mediaType || "",
      effect = text.trim().toLowerCase();
    if (!effects.includes(effect)) throw `\n*Usage:* ${usedPrefix}stickmaker <effectname>\n*Example:* ${usedPrefix}stickmaker jail\n\n*List Effect:*\n${effects.map(effect => `_> ${effect}_`).join("\n")}\n`.trim();
    if (/image/g.test(mime) && !/webp/g.test(mime)) try {
      let img = await q?.download(),
        out = await uploadImage(img),
        apiUrl = API("https://some-random-api.com/canvas/", encodeURIComponent(effect), {
          avatar: out
        }),
        stiker = await createSticker(apiUrl, {
          pack: packname,
          author: author
        });
      await conn.sendFile(m.chat, stiker, "atet.webp", "", m);
    } catch (e) {
      console.log(e);
    } else m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`);
  };
handler.help = ["stickmaker (caption|reply media)"], handler.tags = ["sticker"],
  handler.command = /^(stickmaker|stikmaker)$/i;
export default handler;