import uploadImage from "../../lib/uploadImage.js";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || q.mediaType || "";
  if (/image/g.test(mime) && !/webp/g.test(mime)) try {
    let img = await q?.download(),
      out = await uploadImage(img),
      sim = API("https://some-random-api.com", "/canvas/simpcard", {
        avatar: out
      });
    await conn.sendFile(m.chat, sim, "simpcard.png", "simp", m);
  } catch (e) {
    console.log(e);
  } else m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`);
};
handler.help = ["simpcard"], handler.tags = ["anime"], handler.command = /^(simpcard)$/i;
export default handler;