import uploadImage from "../../lib/uploadImage.js";
import {
  sticker
} from "../../lib/sticker.js";
const effects = ["jail", "gay", "glass", "wasted", "triggered", "lolice", "simpcard", "horny"],
  handler = async (m, {
    conn,
    usedPrefix,
    text,
    command
  }) => {
    let effect = text.trim().toLowerCase();
    if (!effects.includes(effect)) throw `\n\n┌─⊷ *EFFECTS*\n${effects.map(effect => `▢ ${effect}`).join("\n")}\n└───────────\n\n📌 *Example:* \n${usedPrefix + command} wasted \n`.trim();
    let q = m.quoted ? m.quoted : m,
      mime = (q.msg || q).mimetype || "";
    if (!mime) throw "✳️ Respond to an image";
    if (!/image\/(jpe?g|png)/.test(mime)) throw "✳️ Format not supported";
    let img = await q?.download(),
      url = await uploadImage(img),
      apiUrl = API("https://some-random-api.com/canvas/", encodeURIComponent(effect), {
        avatar: url
      });
    try {
      let stiker = await sticker(null, apiUrl, packname, m.name);
      await conn.sendFile(m.chat, stiker, null, {
        asSticker: !0
      }, m);
    } catch (e) {
      m.reply("Conversion to sticker error, send as image instead"), await conn.sendFile(m.chat, apiUrl, "smaker.png", null, m);
    }
  };
handler.help = ["smaker"], handler.tags = ["sticker"], handler.command = ["smaker"];
export default handler;