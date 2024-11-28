import { SaraStudyAI } from "../../lib/ai/sara-study.js";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const inputText =
    args.join(" ") ||
    m.quoted?.text ||
    m.quoted?.caption ||
    m.quoted?.description;
  if (!inputText)
    return m.reply(
      `Masukkan teks atau reply dengan teks.\nContoh:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  const q = m.quoted || m;
  const mime = (q.msg || q).mimetype || "";
  let media;
  if (mime) media = await q.download();
  let result;
  if (media) result = await SaraStudyAI.image(media);
  else result = await SaraStudyAI.chat(inputText);
  m.react(wait);
  try {
    m.react(sukses);
    return m.reply(result?.response?.answer || "Tidak ada jawaban dari AI.");
  } catch (error) {
    console.error("Handler error:", error);
    m.react(eror);
  }
};
handler.help = ["sarastudy"];
handler.tags = ["ai"];
handler.command = /^(sarastudy)$/i;
export default handler;
