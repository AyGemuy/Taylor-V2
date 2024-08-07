import {
  HuggingFace
} from "../../lib/tools/huggingface.js";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  m.react(wait);
  try {
    const MODEL = "EleutherAI/gpt-neox-20b",
      openAIResponse = await HuggingFace(MODEL, text);
    openAIResponse ? (console.log("Respons dari OpenAI:"), m.reply(decodeURIComponent(openAIResponse[0]?.generated_text))) : console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
  } catch (error) {
    console.error("Terjadi kesalahan:", error), m.react(eror);
  }
};
handler.help = ["gptneox"], handler.tags = ["fun", "ai", "gpt"], handler.command = /^gptneox$/i;
export default handler;