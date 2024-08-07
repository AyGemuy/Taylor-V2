import uploadImage from "../../lib/uploadImage.js";
import {
  sticker
} from "../../lib/sticker.js";
const handler = async (m, {
  conn,
  text
}) => {
  try {
    let q = m.quoted ? m.quoted : m,
      mime = (q.msg || q).mimetype || "";
    if (!mime) throw "Tidak ada foto";
    if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`;
    let img = await q?.download(),
      wasted = `https://some-random-api.com/canvas/wasted?avatar=${await uploadImage(img)}`,
      stiker = await sticker(null, wasted, packname, author);
    await conn.sendFile(m.chat, stiker, "wasted.webp", "", m);
  } catch (e) {
    m.reply("Conversion Failed");
  }
};
handler.help = ["wasted"], handler.tags = ["sticker"], handler.command = /^wasted$/i,
  handler.owner = !1, handler.mods = !1, handler.premium = !1, handler.group = !1,
  handler.private = !1, handler.admin = !1, handler.botAdmin = !1, handler.fail = null;
export default handler;