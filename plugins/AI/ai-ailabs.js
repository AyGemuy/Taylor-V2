import {
  FormData,
  Blob
} from "formdata-node";
import {
  fileTypeFromBuffer
} from "file-type";
import fetch from "node-fetch";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  const input_data = ["pixar", "pixar_plus", "3d_cartoon", "angel", "angel_plus", "demon", "ukiyoe_cartoon", "bopu_cartoon", "amcartoon", "western", "avatar", "famous", "jpcartoon", "jpcartoon_head", "hkcartoon", "classic_cartoon", "tccartoon", "anime", "handdrawn", "sketch", "artstyle", "head", "full", "3d_game"];
  let q = m.quoted ? m.quoted : m;
  if (!((q.msg || q).mimetype || "")) throw "No media found";
  let media = await q?.download(),
    [urutan] = text.split(" ");
  m.react(wait);
  try {
    let data = input_data.map(item => ({
      title: item.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
      id: item
    }));
    if (!urutan) return m.reply("Input query!\n*Example:*\n.ailabs [nomor]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n.ailabs [nomor]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    if (urutan > data.length) return m.reply("Input query!\n*Example:*\n.ailabs [nomor]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    let out = data[urutan - 1].id;
    const openAIResponse = await cartoonifyImage(media, out);
    if (openAIResponse) {
      const result = openAIResponse,
        tag = `@${m.sender.split("@")[0]}`;
      await conn.sendMessage(m.chat, {
        image: {
          url: result.data.image_url
        },
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
handler.help = ["ailabs [nomor]"], handler.tags = ["ai"], handler.command = /^(ailabs)$/i,
  handler.limit = !0;
export default handler;
async function cartoonifyImage(buffer, type) {
  const data = new FormData(),
    fileType = await fileTypeFromBuffer(buffer) || {},
    mime = fileType ? fileType.mime : "image/jpg",
    ext = fileType ? `.${fileType.ext}` : ".jpg";
  data.append("image", new Blob([await buffer.toArrayBuffer()], {
    type: mime
  }), `img${ext}`), data.append("type", type);
  const options = {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": "230d665706msh8c981a10569b6aep1c5006jsn77776aeae50e",
        "X-RapidAPI-Host": "cartoon-yourself.p.rapidapi.com"
      },
      body: data
    },
    response = await fetch("https://cartoon-yourself.p.rapidapi.com/facebody/api/portrait-animation/portrait-animation", options),
    json = await response.text();
  return JSON.parse(json);
}