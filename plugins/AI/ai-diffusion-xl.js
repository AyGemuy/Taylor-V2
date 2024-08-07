import {
  HuggingFaceBuffer
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
    const MODEL = "stabilityai/stable-diffusion-xl-base-1.0",
      openAIResponse = await HuggingFaceBuffer(MODEL, encodeURIComponent(text));
    if (openAIResponse) {
      const tag = `@${m.sender.split("@")[0]}`;
      await conn.sendMessage(m.chat, {
        image: openAIResponse,
        caption: `Nih effect *${MODEL}* nya\nRequest by: ${tag}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    } else console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
  } catch (error) {
    console.error("Terjadi kesalahan:", error), m.react(eror);
  }
};
handler.help = ["diffusionxl"], handler.tags = ["fun"], handler.command = /^diffusionxl$/i;
export default handler;