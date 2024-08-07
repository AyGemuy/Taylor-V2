import {
  HuggingFaceBuffer
} from "../../lib/tools/huggingface.js";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  const input_data = ["Daniil-plotnikov/realism-diffusion", "aipicasso/manga-diffusion-poc", "Envvi/Inkpunk-Diffusion", "tensor-diffusion/AsianRealistic_SDLife_ChiasedammeV9.0", "hakurei/waifu-diffusion", "nitrosocke/mo-di-diffusion", "nitrosocke/Ghibli-Diffusion"];
  let [urutan, tema] = text.split("|");
  if (!tema) return m.reply("Input query!\n*Example:*\n.diffuser [nomor]|[query]");
  m.react(wait);
  try {
    let data = input_data.map((item, index) => ({
      title: item.split("/")[1].toUpperCase(),
      id: item
    }));
    if (!urutan) return m.reply("Input query!\n*Example:*\n.diffuser [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n.diffuser [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    if (urutan > data.length) return m.reply("Input query!\n*Example:*\n.diffuser [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    let out = data[urutan - 1].id;
    const openAIResponse = await HuggingFaceBuffer(out, encodeURIComponent(tema));
    if (openAIResponse) {
      const tag = `@${m.sender.split("@")[0]}`;
      await conn.sendMessage(m.chat, {
        image: openAIResponse,
        caption: `Nih effect *${out}* nya\nRequest by: ${tag}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    } else console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
  } catch (e) {
    console.error(e), m.react(eror);
  }
};
handler.help = ["diffuser *[nomor]|[query]*"], handler.tags = ["search"], handler.command = /^(diffuser)$/i;
export default handler;