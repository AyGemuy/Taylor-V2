import uploadFile from "../../lib/uploadFile.js";
import { Lens } from "../../lib/tools/lens.js";
const handler = async (m, { command, usedPrefix, conn, text }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime || !mime.startsWith("image/"))
    return m.reply("Hanya gambar yang didukung");
  let media = await q?.download();
  let link = await uploadFile(media);
  m.react(wait);
  try {
    let out = await Lens(link);
    let caption = `🔍 *[ HASIL PENCARIAN ]*
📌 *Judul:* ${out[0]?.title || "Tidak ada"}
🌐 *Domain:* ${out[0]?.domain || "Tidak ada"}
🔗 *Link:* ${out[0]?.link || "Tidak ada"}
🖼️ *Thumbnail:* ${out[0]?.thumbnail || "Tidak ada"}
📷 *View Gambar:* ${out[0]?.imgres || "Tidak ada"}
📖 *Sumber:* ${out[0]?.source || "Tidak ada"}
✅ *Tingkat Kecocokan:* ${out[0]?.pcnt || "Tidak ada"}
🖇️ Klik link untuk detail lebih lanjut.`;
    m.reply(caption);
    m.react(sukses);
  } catch (e) {
    console.log(e);
    m.react(eror);
  }
};
handler.help = ["lens *[nomor]*"];
handler.tags = ["search"];
handler.command = /^(lens)$/i;
export default handler;
