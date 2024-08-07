import {
  VyroAI
} from "../../lib/ai/vyro-ai.js";
import {
  ImageProcessor
} from "../../lib/tools/art-enhance.js";
import axios from "axios";
import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
const genAi = new VyroAI({
    link: !1,
    buffer: !0
  }),
  generate = new ImageProcessor({
    token: "",
    replicate: "3a4886dd3230e523600d3b555f651dc82aba3a4e"
  }),
  handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
  }) => {
    let q = m.quoted ? m.quoted : m,
      mime = (q.msg || q).mimetype || q.mediaType || "";
    if (/image/g.test(mime) && !/webp/g.test(mime)) try {
      let media = await q?.download(),
        isTele = /^image\/(png|jpe?g|gif)/.test(mime),
        link = await (isTele ? uploadImage : uploadFile)(media),
        sauce = await Upscale(link);
      await conn.sendFile(m.chat, sauce, "", "", m);
    } catch (e) {
      try {
        let media = await q?.download(),
          sauce = await genAi.upscaleImage(media);
        await conn.sendFile(m.chat, sauce.buffer, "", "", m);
      } catch (e) {
        try {
          let media = await q?.download(),
            sauce = await generate.upscaleImage(media);
          await conn.sendFile(m.chat, sauce, "", "", m);
        } catch (e) {
          try {
            let media = await q?.download(),
              sauce = await generate.artEnhance(media);
            await conn.sendFile(m.chat, sauce, "", "", m);
          } catch (e) {
            m.reply("Error saat meningkatkan kualitas gambar");
          }
        }
      }
    } else m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`);
  };
handler.help = ["hd", "enhance"], handler.tags = ["tools"], handler.command = /^(hd|enhance)$/i;
export default handler;
async function Upscale(so) {
  try {
    return (await axios.get(`https://www.api.vyturex.com/upscale?imageUrl=${so}`)).data.resultUrl;
  } catch (error) {
    throw new Error("Error fetching or filtering JSON:", error);
  }
}