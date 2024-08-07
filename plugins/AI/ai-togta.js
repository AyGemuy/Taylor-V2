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
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || "";
  if (!mime) return m.reply("Tidak ada media yang ditemukan");
  const media = await q?.download();
  const isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
  const link = await (isTele ? uploadImage : uploadFile)(media);
  m.react(wait);
  try {
    const openAIResponse = await fetchGta(link);
    if (openAIResponse) {
      const result = openAIResponse,
        tag = `@${m.sender.split("@")[0]}`;
      await conn.sendMessage(m.chat, {
        image: {
          url: result || logo
        },
        caption: `Nih effect *photo-to-gta* nya\nRequest by: ${tag}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    } else console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["jadigta"].map(v => v + " (Balas foto)"), handler.tags = ["tools"],
  handler.command = /^(jadigta|togta)$/i, handler.limit = !0;
export default handler;
async function fetchGta(link) {
  try {
    const response = await fetch("https://widipe.com/jadigta?url=" + encodeURIComponent(link));
    return (await response.json())?.result;
  } catch (e) {
    console.log(e);
  }
}