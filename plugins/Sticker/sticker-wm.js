import {
  addExif,
  sticker
} from "../../lib/sticker.js";
import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
import {
  webp2png
} from "../../lib/webp2mp4.js";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  let stiker = !1;
  try {
    let [pakSatu, ...pakDua] = text.split("|");
    pakDua = (pakDua || []).join("|");
    let q = m.quoted ? m.quoted : m,
      mime = m.quoted?.mimetype || "";
    if (/webp/.test(mime)) {
      let img = await m.quoted?.download();
      if (!img) throw "Reply a sticker!";
      stiker = await addExif(img, pakSatu || "", pakDua || "");
    } else if (/image/.test(mime)) {
      let imge = await m.quoted?.download(),
        outi = await uploadImage(imge);
      stiker = await sticker(outi, pakSatu || "", pakDua || "");
    } else if (/video/.test(mime)) {
      if ((q.msg || q).seconds > 11) return m.reply("maks 10 detik!");
      let imgo = await m.quoted?.download(),
        outu = await uploadImage(imgo);
      stiker = await sticker(outu, pakSatu || "", pakDua || "");
    }
  } finally {
    if (!stiker) throw `Balas stiker dengan perintah *${usedPrefix + command} <teks>|<teks>*`;
    await conn.sendFile(m.chat, stiker, "stiker.webp", "", m, !1, {
      asSticker: !0
    });
  }
};
handler.help = ["wm <packname>|<author>"], handler.tags = ["sticker"], handler.command = /^(s(ti(ck(erwn|wm)|k(er)?wm)|wm)|colong|wm)$/i;
export default handler;