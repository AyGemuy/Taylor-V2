import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
import fetch from "node-fetch";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  let q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || "";
  if (!mime) throw "No media found";
  let media = await q?.download(),
    isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime),
    link = await (isTele ? uploadImage : uploadFile)(media);
  m.react(wait);
  try {
    const imgx = await convertImageUrlToBuffer(link);
    if (imgx) {
      const tag = `@${m.sender.split("@")[0]}`;
      await conn.sendMessage(m.chat, {
        image: imgx,
        caption: `Nih effect *image-anime* nya\nRequest by: ${tag}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    } else console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["resvimg"].map(v => v + " (Balas foto)"), handler.tags = ["tools"],
  handler.command = /^(resvimg)$/i, handler.limit = !0;
export default handler;
async function convertImageUrlToBuffer(imageUrl) {
  try {
    const response = await fetch("https://tools.revesery.com/image-anime/convert.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `image-url=${encodeURIComponent(imageUrl)}`
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const base64String = (await response.json()).image;
    return Buffer.from(base64String.split(",")[1], "base64");
  } catch (error) {
    throw console.error(`An error occurred: ${error.message}`), error;
  }
}