import fs from "fs";
import Jimp from "jimp";
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  try {
    let q = m.quoted ? m.quoted : m,
      mime = (q.msg || q).mimetype || q.mediaType || "";
    if (m.reply("Tunggu sebentar..."), /image/.test(mime) && !/webp/.test(mime)) {
      let media = await q?.download(),
        botNumber = conn.user.jid,
        {
          img
        } = await generateProfilePicture(media);
      await conn.query({
        tag: "iq",
        attrs: {
          to: botNumber,
          type: "set",
          xmlns: "w:profile:picture"
        },
        content: [{
          tag: "picture",
          attrs: {
            type: "image"
          },
          content: img
        }]
      }), m.reply("Sukses mengganti PP Bot");
    } else m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`);
  } catch (error) {
    console.error(error), m.reply("Terjadi kesalahan, coba lagi nanti.");
  }
};
handler.menu = ["setppfull"], handler.tags = ["owner"], handler.command = /^setpp(panjang|full|f|2)$/i,
  handler.owner = !0;
export default handler;
async function generateProfilePicture(media) {
  const jimp = await Jimp.read(media),
    min = jimp.getWidth(),
    max = jimp.getHeight(),
    cropped = jimp.crop(0, 0, min, max);
  return {
    img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
    preview: await cropped.normalize().getBufferAsync(Jimp.MIME_JPEG)
  };
}