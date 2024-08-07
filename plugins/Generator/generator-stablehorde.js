import {
  StableHorde,
  AiHorde
} from "../../lib/maker/stablehorde.js";
const apiKey = "0000000000",
  stableHorde = new StableHorde({
    apiKey: apiKey
  }),
  aiHorde = new AiHorde({
    apiKey: apiKey
  }),
  handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
  }) => {
    const input_data = ["text", "image"];
    let [urutan, tema, queer] = text.split("|");
    if (urutan = parseInt(urutan), tema = parseInt(tema), isNaN(urutan) || urutan < 1 || urutan > input_data.length) {
      const validInputList = input_data.map((item, index) => `${index + 1}. ${item}`).join("\n");
      return m.reply(`Nomor yang Anda masukkan tidak valid. Harap pilih nomor antara 1 dan ${input_data.length}:\n${validInputList}\n*Example:*\n*${usedPrefix + command}* 2|999|men ( image )\n*${usedPrefix + command}* 2|999|hallo ( text )`);
    }
    let out = input_data[urutan - 1];
    if (!queer) return m.reply(`Harap masukkan query untuk menghasilkan teks atau gambar.\n*Example:*\n*${usedPrefix + command}* 2|999|men ( image )\n*${usedPrefix + command}* 2|999|hallo ( text )`);
    switch (out) {
      case "text":
        let textModels = await (stableHorde.textModels() || aiHorde.textModels());
        if (isNaN(tema) || tema < 1 || tema > textModels.length) {
          const validTemaList = textModels.map((item, index) => `${index + 1}. ${item}`).join("\n");
          return m.reply(`Nomor yang Anda masukkan tidak valid. Harap pilih nomor antara 1 dan ${textModels.length}:\n${validTemaList}`);
        }
        let dataInputText = {
          prompt: queer,
          model: textModels[tema - 1],
          max_context_length: 2048,
          max_length: 512,
          singleline: !1,
          temperature: .7,
          top_p: .2,
          top_k: 85,
          top_a: 0,
          typical: 1,
          tfs: 1,
          rep_pen: 1.1,
          rep_pen_range: 1024,
          rep_pen_slope: .7,
          sampler_order: [6, 0, 1, 3, 4, 2, 5]
        };
        try {
          const generatedText = await (stableHorde.generateText(dataInputText) || aiHorde.generateText(dataInputText));
          m.reply(generatedText.generations[0]?.text);
        } catch (e) {
          return m.reply("Terjadi kesalahan saat menghasilkan teks.");
        }
        break;
      case "image":
        let sortedNames = (await (stableHorde.imageModels() || aiHorde.imageModels())).sort((a, b) => b.performance - a.performance).map(item => item.name);
        if (isNaN(tema) || tema < 1 || tema > sortedNames.length) {
          const validTemaList = sortedNames.map((item, index) => `${index + 1}. ${item}`).join("\n");
          return m.reply(`Nomor yang Anda masukkan tidak valid. Harap pilih nomor antara 1 dan ${sortedNames.length}:\n${validTemaList}`);
        }
        let dataInputImage = {
          prompt: queer,
          negativePrompt: "",
          seed: "random",
          height: 1024,
          width: 1024,
          karras: !0,
          tiling: !1,
          hiResFix: !1,
          clipSkip: "0",
          sampler_name: "k_dpmpp_sde",
          steps: 8,
          nsfw: !1,
          trustedWorkers: !0,
          model: sortedNames[tema - 1]
        };
        try {
          const generatedImageURL = await (stableHorde.generateImage(dataInputImage) || aiHorde.generateImage(dataInputImage));
          await conn.sendFile(m.chat, generatedImageURL.generations[0]?.img, "", "", m);
        } catch (e) {
          return m.reply("Terjadi kesalahan saat menghasilkan gambar.");
        }
        break;
      default:
        return m.reply("Jenis input yang diberikan tidak valid.");
    }
  };
handler.help = ["horde *[nomor]|[query]*"], handler.tags = ["generator"], handler.command = /^(horde)$/i;
export default handler;