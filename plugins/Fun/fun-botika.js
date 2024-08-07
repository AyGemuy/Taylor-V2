import {
  sendWebhookRequest
} from "../../lib/ai/botika.js";
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
    const openAIResponse = await sendWebhookRequest(text);
    openAIResponse ? (console.log("Respons dari OpenAI:"), m.reply(openAIResponse)) : console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
  } catch (error) {
    console.error("Terjadi kesalahan:", error), m.react(eror);
  }
};
handler.help = ["botika"], handler.tags = ["fun"], handler.command = /^botika$/i;
export default handler;