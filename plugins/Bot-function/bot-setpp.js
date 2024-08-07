import Jimp from "jimp";
const handler = async (m, {
  conn,
  args
}) => {
  try {
    let q = m.quoted ? m.quoted : m,
      mime = (q.msg || q).mimetype || "";
    if (!/image/.test(mime)) throw new Error("Pesan tidak berisi gambar");
    {
      let img = await q?.download();
      if (!img) throw new Error("Foto tidak ditemukan");
      await conn.updateProfilePicture(conn.user.jid, img), await conn.reply(m.chat, "Sukses Mengganti Foto Profile Bot!", m);
    }
  } catch (e) {
    console.error(e), await conn.reply(m.chat, "Terjadi kesalahan saat menjalankan perintah", m);
  }
};
handler.help = ["botsetpp"], handler.command = /^(botsetpp)$/i, handler.owner = !0;
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