import {
  webp2mp4,
  webp2img,
  img2webp,
  vid2webp
} from "../../lib/tools/ezgif-convert.js";
import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let link = args[0];
  if (!link) {
    let q = m.quoted ? m.quoted : m,
      mime = (q.msg || q).mimetype || "";
    if (!mime) throw "Tidak ada media ditemukan";
    let media = await q?.download(),
      isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    link = await (isTele ? uploadImage : uploadFile)(media);
  }
  if ("webp2mp4" === command) {
    const convertedUrl = await webp2mp4(link);
    await conn.sendFile(m.chat, convertedUrl, "output.mp4", "Ini adalah hasil konversi WebP ke MP4", m);
  } else if ("webp2img" === command) {
    const convertedUrl = await webp2img(link);
    await conn.sendFile(m.chat, convertedUrl, "output.png", "Ini adalah hasil konversi WebP ke PNG", m);
  } else if ("img2webp" === command) {
    const convertedUrl = await img2webp(link);
    await conn.sendFile(m.chat, convertedUrl, "output.webp", "Ini adalah hasil konversi JPG ke WebP", m);
  } else if ("vid2webp" === command) {
    const convertedUrl = await vid2webp(link);
    await conn.sendFile(m.chat, convertedUrl, "output.gif", "Ini adalah hasil konversi Video ke GIF (WebP)", m);
  } else m.reply(`Perintah tidak dikenali. Gunakan perintah berikut untuk konversi:\n\n${usedPrefix}webp2mp4 <url webp>\n${usedPrefix}webp2img <url webp>\n${usedPrefix}img2webp <url jpg>\n${usedPrefix}vid2webp <url video>`);
};
handler.help = ["webp2mp4", "webp2img", "img2webp", "vid2webp"], handler.tags = ["tools"],
  handler.command = /^(webp2mp4|webp2img|img2webp|vid2webp)$/i;
export default handler;