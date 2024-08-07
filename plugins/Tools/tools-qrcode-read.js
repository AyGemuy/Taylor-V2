import {
  default as Jimp
} from "jimp";
import {
  default as qrcode
} from "qrcode-reader";
const handler = async (m, {
  conn,
  usedPrefix,
  args,
  command
}) => {
  const q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || "";
  if (!/image\/(jpe?g|png)/.test(mime)) return await conn.reply(m.chat, "Mohon kirim gambar dengan format JPEG atau PNG.", m);
  const mediaData = await q?.download(),
    image = await Jimp.read(mediaData);
  try {
    const result = await readQRCode(image);
    await conn.reply(m.chat, result, m);
  } catch (error) {
    await conn.reply(m.chat, "Terjadi kesalahan dalam membaca QR code", m);
  }
};
handler.help = ["readqrcode"], handler.tags = ["tools"], handler.command = ["readqr", "readqrcode"];
export default handler;
const readQRCode = image => new Promise((resolve, reject) => {
  const qr = new qrcode();
  qr.callback = (err, value) => {
    err ? reject(err) : resolve(value.result);
  }, qr.decode(image.bitmap);
});