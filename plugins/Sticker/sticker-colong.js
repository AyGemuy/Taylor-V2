import {
  sticker
} from "../../lib/sticker.js";
const handler = async (m, {
  conn,
  args,
  text,
  usedPrefix,
  command
}) => {
  let stiker = !1;
  try {
    let q = m.quoted ? m.quoted : m,
      mime = (q.msg || q).mimetype || "";
    if (/image|video/.test(mime)) {
      let urut = text.split("|"),
        one = urut[0],
        two = urut[1],
        img = await q?.download();
      if (!img) throw `Reply stiker nya!\n ${usedPrefix + command} pack|auth`;
      stiker = await sticker(img, !1, one, two);
    } else args[0] && (stiker = await sticker(!1, args[0], "Nihh", "Bang"));
  } finally {
    if (!stiker) throw "Conversion failed";
    await conn.sendFile(m.chat, stiker, "sticker.webp", "", m);
  }
};
handler.help = ["colong"], handler.tags = ["sticker"], handler.command = /^colong$/i,
  handler.owner = !0;
export default handler;