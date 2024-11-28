import { HuggingFaceBuffer } from "../../lib/tools/huggingface.js";
const handler = async (m, { command, usedPrefix, conn, args }) => {
  const modelName = [
    "Daniil-plotnikov/realism-diffusion",
    "aipicasso/manga-diffusion-poc",
    "Envvi/Inkpunk-Diffusion",
    "tensor-diffusion/AsianRealistic_SDLife_ChiasedammeV9.0",
    "hakurei/waifu-diffusion",
    "nitrosocke/mo-di-diffusion",
    "nitrosocke/Ghibli-Diffusion",
  ];
  const query =
    args.length >= 1
      ? args.slice(0).join(" ")
      : (m.quoted && m.quoted?.text) ||
        m.quoted?.caption ||
        m.quoted?.description ||
        null;
  if (!query)
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} 1|Hai, apa kabar?*`,
    );
  m.react(wait);
  try {
    const models = modelName[Math.floor(Math.random() * modelName.length)];
    const openAIResponse = await HuggingFaceBuffer(
      models,
      encodeURIComponent(query),
    );
    if (openAIResponse) {
      const tag = `@${m.sender.split("@")[0]}`;
      await conn.sendMessage(
        m.chat,
        {
          image: openAIResponse,
          caption: `Nih effect *${models}* nya\nRequest by: ${tag}`,
          mentions: [m.sender],
        },
        {
          quoted: m,
        },
      );
    } else {
      console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
    }
  } catch (e) {
    console.error(e), m.react(eror);
  }
};
handler.help = ["diffuser *[query]*"];
handler.tags = ["search"];
handler.command = /^(diffuser)$/i;
export default handler;
