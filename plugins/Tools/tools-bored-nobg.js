import fetch from "node-fetch";
import {
  FormData,
  Blob
} from "formdata-node";
import {
  fileTypeFromBuffer
} from "file-type";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  try {
    let q = m.quoted ? m.quoted : m;
    if (!((q.msg || q).mimetype || "")) throw "Tidak ada media yang ditemukan";
    let media = await q?.download();
    const result = await RemoveBg(media);
    if (!result) throw "Terjadi kesalahan saat mengonversi gambar ke zombie.";
    const tag = `@${m.sender.split("@")[0]}`;
    return await conn.sendMessage(m.chat, {
      image: {
        url: result.output
      },
      caption: `Nih effect *no-background* nya\nRequest by: ${tag}`,
      mentions: [m.sender]
    }, {
      quoted: m
    });
  } catch (error) {
    throw console.error("Error:", error), error;
  }
};
handler.help = ["borednobg"].map(v => v + " (Balas foto)"), handler.tags = ["tools"],
  handler.command = /^(borednobg)$/i, handler.limit = !0;
export default handler;
async function RemoveBg(imageBuffer) {
  try {
    const {
      ext,
      mime
    } = await fileTypeFromBuffer(imageBuffer) || {};
    if (!ext || !mime) return null;
    let form = new FormData();
    const blob = new Blob([imageBuffer.toArrayBuffer()], {
      type: mime
    });
    form.append("file", blob, "image." + ext);
    const response = await fetch("https://boredhumans.com/api_background_removal.php", {
      method: "POST",
      body: form
    });
    if (!response.ok) throw new Error("Request failed with status code " + response.status);
    const base64Data = await response.text();
    return JSON.parse(base64Data);
  } catch (error) {
    return null;
  }
}