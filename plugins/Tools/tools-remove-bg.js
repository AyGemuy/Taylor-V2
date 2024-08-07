import fetch from "node-fetch";
import {
  RemoveBackground,
  RemoveBackgroundV2
} from "../../lib/tools/remove-background.js";
import {
  FormData,
  Blob
} from "formdata-node";
import {
  fileTypeFromBuffer
} from "file-type";
const handler = async (m, {
  conn,
  args
}) => {
  let q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || "";
  if (!/image/.test(mime)) throw "Reply dengan gambar yang ingin dihapus latar belakangnya.";
  m.reply("Mohon tunggu sebentar...");
  try {
    let buffer, media = await q?.download(),
      sauce = await RemoveBackground(media) || await RemoveBackgroundV2(media) || await rembg(media);
    if (Buffer.isBuffer(sauce)) buffer = sauce;
    else {
      const response = await fetch(sauce);
      buffer = await response.arrayBuffer();
    }
    await conn.sendFile(m.chat, buffer, "", "", m);
  } catch (error) {
    console.error(error), m.reply("Terjadi kesalahan saat memproses gambar.");
  }
};
handler.help = ["remobg"], handler.tags = ["tools"], handler.command = ["remobg"];
export default handler;
async function rembg(files) {
  try {
    const {
      ext,
      mime
    } = await fileTypeFromBuffer(files) || {};
    if (!ext || !mime) throw new Error("Tipe file tidak dapat diidentifikasi");
    const formData = new FormData(),
      blob = new Blob([files], {
        type: mime
      });
    formData.append("file", blob, "rembg." + ext || "jpg");
    formData.append("prompt", "Remove the background");
    const response = await fetch("https://easyedit.xyz:3000/rembg?uid=null", {
      method: "POST",
      body: formData
    });
    return await response.arrayBuffer();
  } catch (error) {
    console.error(error);
  }
}