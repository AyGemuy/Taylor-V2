import {
  Prodia
} from "prodia.js";
import fetch from "node-fetch";
import _ from "lodash";
import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
const prodiaClient = Prodia(_.sample([...Object.entries(APIKeys).find(([key]) => key.includes("prodia"))?.[1]]));
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  const dbChat = db.data.database.sdxlinpainting[m.chat] || (db.data.database.sdxlinpainting[m.chat] = {});
  const infoMsg = `❓ *Query input tidak ditemukan!*\n\nContoh penggunaan:\n1. *Mengatur Model:* \`${usedPrefix + command} --model <index>\`\n2. *Mengatur Style:* \`${usedPrefix + command} --style <index>\`\n3. *Mengatur Sampler:* \`${usedPrefix + command} --sampler <index>\`\n4. *Menampilkan Gambar:* \`${usedPrefix + command} [query] --model <index> --style <index> --sampler <index>\`\n\nPastikan untuk mengganti \`<index>\` dengan nilai yang sesuai.`;
  if (!text) return m.reply(infoMsg);
  const prompt = /^\s*--/.test(text.trim()) ? null : text.trim()?.split(/\s--\w+\s\d+/)[0]?.trim() || null;
  const [modelIndex, styleIndex, samplerIndex] = ["model", "style", "sampler"].map(type => parseInt(text.match(new RegExp(`--${type}\\s+(\\d+)`))?.[1] || -1, 10) - 1);
  const {
    model = [],
      style = [],
      sampler = []
  } = dbChat.inputData && Object.keys(dbChat.inputData).length ? dbChat.inputData : await getModels();
  dbChat.inputData = dbChat.inputData || {
    model: model,
    style: style,
    sampler: sampler
  };
  const updateCaption = (index, arr, type) => isNaN(index) || index < 0 || index >= arr.length ? `❌ *${type} tidak valid!*\n${arr.map((item, i) => `*${i + 1}.* ${item}`).join("\n")}\n` : `✅ *${type} berhasil diatur*\n- ${type}: ${arr[index]}\n`;
  let caption = "";
  if (modelIndex >= 0) caption += updateCaption(modelIndex, model, "Model"), dbChat.model = model[modelIndex];
  if (styleIndex >= 0) caption += updateCaption(styleIndex, style, "Style"), dbChat.style = style[styleIndex];
  if (samplerIndex >= 0) caption += updateCaption(samplerIndex, sampler, "Sampler"),
    dbChat.sampler = sampler[samplerIndex];
  if (caption) m.reply(caption);
  if (!prompt && !text.match(/--(model|style|sampler)\s+\d+/)) return m.reply(infoMsg);
  m.react(wait);
  const generateImageParams = {
    model: dbChat.model || _.sample(model),
    prompt: encodeURIComponent(prompt),
    style_preset: dbChat.style || _.sample(style),
    upscale: false,
    sampler: dbChat.sampler || _.sample(sampler),
    width: 720,
    height: 1024
  };
  const q = m.quoted || m;
  const mime = (q.msg || q).mimetype || "";
  if (!mime) return m.reply("Tidak ada media yang ditemukan");
  const media = await q.download();
  const link = await (/image\/(png|jpe?g|gif)|video\/mp4/.test(mime) ? uploadImage : uploadFile)(media);
  generateImageParams.imageUrl = link;
  generateImageParams.imageData = media.toString("base64");
  if (!link) return m.reply("Tidak ada media yang diupload");
  if (!prompt || !generateImageParams.model || !generateImageParams.style_preset || !generateImageParams.sampler) {
    return;
  }
  const result = await generateImage(generateImageParams);
  if (result) {
    await conn.sendMessage(m.chat, {
      image: {
        url: result?.imageUrl || thumb
      },
      caption: `✨ *\`${command?.toUpperCase()}\`*\n- *Model:* ${generateImageParams.model}\n- *Style:* ${generateImageParams.style_preset}\n- *Sampler:* ${generateImageParams.sampler}\n- *Request oleh:* @${m.sender.split("@")[0]}\n- *Prompt:* ${prompt}`,
      mentions: [m.sender]
    }, {
      quoted: m
    });
    delete dbChat.model;
    delete dbChat.style;
    delete dbChat.sampler;
    m.react(sukses);
  } else {
    m.react(eror);
  }
};
handler.help = ["sdxlinpainting *[query]* --option"];
handler.tags = ["ai"];
handler.command = /^(sdxlinpainting)$/i;
export default handler;
async function generateImage(params) {
  try {
    const generate = await prodiaClient.inpaintingSDXL(params);
    return await prodiaClient.wait(generate) || null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}
async function getModels() {
  try {
    const response = await fetch("https://docs.prodia.com/reference/sdxl-inpainting");
    const html = await response.text();
    const jsonRegex = /{&quot;[^{}]*}/g;
    const allJSON = _.map(_.filter(html.match(jsonRegex), match => match.includes("&quot;")), match => JSON.parse(match.replace(/&quot;/g, '"'))) || [];
    const data = _.filter(allJSON, obj => _.has(obj, "enum"));
    return {
      model: [...new Set([...data[0]?.["enum"], ...await prodiaClient.getSDXLModels() || []])],
      style: data[10]?.["enum"],
      sampler: [...new Set([...data[8]?.["enum"], ...await prodiaClient.getSDXLSamplers() || []])]
    };
  } catch (error) {
    console.error("Error fetching models:", error);
    return null;
  }
}