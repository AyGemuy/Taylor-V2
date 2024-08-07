import {
  Prodia
} from "prodia.js";
import _ from "lodash";
import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
const prodiaClient = Prodia(_.sample([...Object.entries(APIKeys).find(([key]) => key.includes("prodia"))?.[1]]));
const handler = async (m, {
  conn
}) => {
  try {
    const q = m.quoted || m;
    const mime = (q.msg || q).mimetype || "";
    if (!mime) return m.reply("Tidak ada media yang ditemukan");
    const media = await q.download();
    const link = await (/image\/(png|jpe?g|gif)|video\/mp4/.test(mime) ? uploadImage : uploadFile)(media);
    const generateImageParams = {
      imageUrl: link,
      imageData: media.toString("base64")
    };
    if (!generateImageParams.imageUrl || !generateImageParams.imageData) {
      return m.react(eror);
    }
    m.react(wait);
    const result = await generateImage(generateImageParams);
    if (result) {
      await conn.sendMessage(m.chat, {
        image: {
          url: result?.imageUrl || thumb
        },
        caption: `✨ *${command?.toUpperCase()}*\n- *Request oleh:* @${m.sender.split("@")[0]}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
      m.react(sukses);
    } else {
      m.react(eror);
    }
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["facerestore *[query]* --option"];
handler.tags = ["ai"];
handler.command = /^(facerestore)$/i;
export default handler;
async function generateImage(params) {
  try {
    const generate = await prodiaClient.faceRestore(params);
    return await prodiaClient.wait(generate) || null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}