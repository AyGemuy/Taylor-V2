import uploadImage from "../../lib/uploadImage.js";
import {
  sticker
} from "../../lib/sticker.js";
import fetch from "node-fetch";
const effects = ["greyscale", "invert", "brightness", "threshold", "sepia", "red", "green", "blue", "blurple", "pixelate", "blur"],
  handler = async (m, {
    conn,
    usedPrefix,
    text,
    command
  }) => {
    let effect = text.trim().toLowerCase();
    if (!effects.includes(effect)) throw `\n┌─「 *Daftar Efek * 」\n${effects.map(effect => `├ ${effect}`).join("\n")}\n└────\n\nPenggunaan:\n${usedPrefix + command} <efek>\n\nContoh:\n${usedPrefix + command} greyscale\n`.trim();
    let q = m.quoted ? m.quoted : m,
      mime = (q.msg || q).mimetype || "";
    if (!mime) throw `Balas gambar dengan perintah *${usedPrefix + command}*`;
    if (!/image\/(jpe?g|png)/.test(mime)) throw "Media tidak didukung!";
    let img = await q?.download(),
      url = await uploadImage(img),
      apiUrl = API("https://some-random-api.com/canvas/", encodeURIComponent(effect), {
        avatar: url
      });
    try {
      let stiker = await sticker(null, apiUrl, packname, author);
      await conn.sendFile(m.chat, stiker, "", "", m, 0, {
        asSticker: !0
      });
    } catch (e) {
      await conn.sendFile(m.chat, apiUrl, "image.png", null, m, 0, {
        thumbnail: await (await fetch(apiUrl)).arrayBuffer()
      });
    }
  };
handler.help = ["stikerfilter <reply|efek>"], handler.tags = ["sticker"], handler.command = /^(s(tic?ker)?filter)$/i;
export default handler;