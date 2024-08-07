import {
  sticker
} from "../../lib/sticker.js";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let stiker = !1,
    ffm = !1;
  try {
    let q = m.quoted ? m.quoted : m,
      mime = (q.msg || q).mimetype || "";
    if (/webp/.test(mime)) {
      let img = await q?.download();
      if (!img) throw `balas stiker dengan perintah ${usedPrefix + command}`;
      ffm = await sticker(img, null, packname, m.name);
    } else if (/image/.test(mime)) {
      let img = await q?.download();
      if (!img) throw `balas gambar dengan perintah ${usedPrefix + command}`;
      ffm = await sticker(img, null, packname, m.name);
    } else if (/video/.test(mime)) {
      if ((q.msg || q).seconds > 11) throw "Maksimal 10 detik!";
      let img = await q?.download();
      if (!img) throw `balas video dengan perintah ${usedPrefix + command}`;
      ffm = await sticker(img, null, packname, m.name);
    } else if (args[0]) {
      if (!isUrl(args[0])) throw "URL tidak valid!";
      stiker = await sticker(!1, args[0], packname, author);
    }
  } catch (e) {
    throw e;
  } finally {
    if (ffm) {
      const sticBuffer = ffm;
      sticBuffer && await conn.sendMessage(m.chat, {
        sticker: sticBuffer
      }, {
        quoted: m,
        mimetype: "image/webp",
        ephemeralExpiration: 86400
      });
    }
    stiker && await conn.sendMessage(m.chat, {
      sticker: stiker
    }, {
      quoted: m,
      mimetype: "image/webp",
      ephemeralExpiration: 86400
    });
  }
};
handler.help = ["sffm", "sffm <url>"], handler.tags = ["sticker"], handler.command = /^(sffm)$/i;
export default handler;
const isUrl = text => text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, "gi"));