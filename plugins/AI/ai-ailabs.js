import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";
import fetch from "node-fetch";
const handler = async (m, { command, usedPrefix, conn, text, args }) => {
  const input_data = [
    "pixar",
    "pixar_plus",
    "3d_cartoon",
    "angel",
    "angel_plus",
    "demon",
    "ukiyoe_cartoon",
    "bopu_cartoon",
    "amcartoon",
    "western",
    "avatar",
    "famous",
    "jpcartoon",
    "jpcartoon_head",
    "hkcartoon",
    "classic_cartoon",
    "tccartoon",
    "anime",
    "handdrawn",
    "sketch",
    "artstyle",
    "head",
    "full",
    "3d_game",
  ];
  let q = m.quoted || m;
  if (!(q.msg || q).mimetype) {
    return m.reply("No media found");
  }
  let media = await q.download();
  let [urutan] = text.split(" ");
  m.react(wait);
  try {
    let data = input_data.map((item) => ({
      title: item
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      id: item,
    }));
    if (!urutan || isNaN(urutan) || urutan > data.length) {
      return m.reply(
        `Input query!\n*Example:*\n${usedPrefix}ailabs [nomor]\n\n*Pilih angka yg ada*\n` +
          data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"),
      );
    }
    let out = data[urutan - 1].id;
    const openAIResponse = await cartoonifyImage(media, out);
    if (openAIResponse) {
      const result = openAIResponse;
      const tag = `@${m.sender.split("@")[0]}`;
      await conn.sendMessage(
        m.chat,
        {
          image: {
            url: result.data.image_url,
          },
          caption: `Nih effect *${out}* nya\nRequest by: ${tag}`,
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
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["ailabs [nomor]"];
handler.tags = ["ai"];
handler.command = /^(ailabs)$/i;
handler.limit = true;
export default handler;
async function cartoonifyImage(buffer, type) {
  const data = new FormData();
  const fileType = (await fileTypeFromBuffer(buffer)) || {};
  const mime = fileType.mime || "image/jpg";
  const ext = fileType.ext ? `.${fileType.ext}` : ".jpg";
  data.append(
    "image",
    new Blob([await buffer.toArrayBuffer()], {
      type: mime,
    }),
    `img${ext}`,
  );
  data.append("type", type);
  const options = {
    method: "POST",
    headers: {
      "X-RapidAPI-Key": "230d665706msh8c981a10569b6aep1c5006jsn77776aeae50e",
      "X-RapidAPI-Host": "cartoon-yourself.p.rapidapi.com",
    },
    body: data,
  };
  try {
    const response = await fetch(
      "https://cartoon-yourself.p.rapidapi.com/facebody/api/portrait-animation/portrait-animation",
      options,
    );
    const json = await response.text();
    return JSON.parse(json);
  } catch (e) {
    console.error("Failed to fetch cartoonify image:", e);
    throw e;
  }
}
