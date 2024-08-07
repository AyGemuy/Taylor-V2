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
  const dbChat = db.data.database.tohdx[m.chat] || (db.data.database.tohdx[m.chat] = {});
  const infoMsg = `❓ *Query input tidak ditemukan!*\n\nContoh penggunaan:\n1. *Mengatur Model:* \`${usedPrefix + command} --model <index>\`\n2. *Mengatur Quality:* \`${usedPrefix + command} --quality <index>\`\n3. *Menampilkan Gambar:* \`${usedPrefix + command} [query] --model <index>\`\n\nPastikan untuk mengganti \`<index>\` dengan nilai yang sesuai.`;
  if (!text) return m.reply(infoMsg);
  const trimmedText = text.trim();
  const modelIndex = parseInt(trimmedText.match(/--model\s+(\d+)/)?.[1] ?? 0, 10) - 1;
  const qualityIndex = parseInt(trimmedText.match(/--quality\s+(\d+)/)?.[1] ?? 0, 10) - 1;
  const {
    model = [],
      quality = []
  } = dbChat.inputData && Object.keys(dbChat.inputData).length ? dbChat.inputData : await getModels();
  dbChat.inputData = dbChat.inputData || {
    model: model,
    quality: quality
  };
  const updateCaption = (index, arr, type) => {
    if (isNaN(index) || index < 0 || index >= arr.length) {
      return `❌ *${type} tidak valid!*\nBerikut daftar ${type} yang tersedia:\n${arr.map((item, i) => `*${i + 1}.* ${item.replace(/[_-]/g, " ").replace(/\..*/, "")}`).join("\n")}\n`;
    }
    return `✅ *${type} berhasil diatur*\n- ${type}: ${arr[index].replace(/[_-]/g, " ").replace(/\..*/, "")}\n`;
  };
  const caption = [(dbChat.model = model[modelIndex] !== undefined ? model[modelIndex] : null) ? updateCaption(modelIndex, model, "Model") : "", (dbChat.quality = quality[qualityIndex] !== undefined ? quality[qualityIndex] : null) ? updateCaption(qualityIndex, quality, "Quality") : ""].join("");
  if (caption) m.reply(caption);
  m.react(wait);
  const generateImageParams = {
    resize: dbChat.quality || _.sample(quality),
    model: dbChat.model || _.sample(model)
  };
  if (!generateImageParams.model || !generateImageParams.resize) {
    return;
  }
  const mime = (m.quoted || m).mimetype || "";
  if (!mime) return m.reply("Tidak ada media yang ditemukan");
  const media = await (m.quoted || m).download();
  const link = await (/image\/(png|jpe?g|gif)|video\/mp4/.test(mime) ? uploadImage : uploadFile)(media);
  generateImageParams.imageUrl = link;
  generateImageParams.imageData = media.toString("base64");
  if (!link) return m.reply("Tidak ada media yang diupload");
  if (!generateImageParams.resize || !generateImageParams.model) {
    return m.react(eror);
  }
  const result = await generateImage(generateImageParams);
  if (result) {
    await conn.sendMessage(m.chat, {
      image: {
        url: result?.imageUrl || thumb
      },
      caption: `✨ *\`${command?.toUpperCase()}\`*\n- *Model:* ${generateImageParams.model.replace(/[_-]/g, " ").replace(/\..*/, "")}\n- *Quality:* ${generateImageParams.resize}\n- *Request oleh:* @${m.sender.split("@")[0]}`,
      mentions: [m.sender]
    }, {
      quoted: m
    });
    delete dbChat.model;
    delete dbChat.quality;
    m.react(sukses);
  } else {
    m.react(eror);
  }
};
handler.help = ["tohdx *[query]* --option"];
handler.tags = ["ai"];
handler.command = /^(tohdx)$/i;
export default handler;
async function generateImage(params) {
  try {
    const generate = await prodiaClient.upscale(params);
    return await prodiaClient.wait(generate) || null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}
async function getModels() {
  try {
    const response = await fetch("https://docs.prodia.com/reference/upscale");
    const html = await response.text();
    const jsonRegex = /{&quot;[^{}]*}/g;
    const allJSON = _.map(_.filter(html.match(jsonRegex), match => match.includes("&quot;")), match => JSON.parse(match.replace(/&quot;/g, '"'))) || [];
    const data = _.filter(allJSON, obj => _.has(obj, "enum"));
    return {
      model: data[9]?.["enum"],
      quality: data[15]?.["enum"]
    };
  } catch (error) {
    console.error("Error fetching models:", error);
    return null;
  }
}