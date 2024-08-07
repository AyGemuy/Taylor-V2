import fetch from "node-fetch";
import uploadImage from "../../lib/uploadImage.js";
const handler = async (m, {
  command,
  usedPrefix
}) => {
  try {
    let q = m.quoted ? m.quoted : m;
    if (!((q.msg || q).mimetype || "")) return m.reply("Tidak ada media yang ditemukan");
    let media = await q?.download();
    let result, tag = `@${m.sender.split("@")[0]}`;
    switch (command) {
      case "upscale":
        result = await Upscale(media);
        result = result ? Buffer.from(result, "base64") : null;
        break;
      case "upscalev2":
        const mediaURL = await uploadImage(media);
        result = (await UpscaleV2(mediaURL))?.result_url;
        break;
      default:
        throw "Perintah tidak dikenal.";
    }
    if (!result) throw "Terjadi kesalahan saat mengonversi gambar ke hd.";
    return await conn.sendMessage(m.chat, {
      image: {
        url: result
      } || result,
      caption: `Nih effect *${command === "upscale" ? "upscale" : "upscale v2"}* nya\nRequest by: ${tag}`,
      mentions: [m.sender]
    }, {
      quoted: m
    });
  } catch (error) {
    console.error("Error:", error);
    return m.reply("Terjadi kesalahan.");
  }
};
handler.help = ["upscale"].map(v => v + " (Balas foto)");
handler.tags = ["tools"];
handler.command = /^(upscale|upscalev2)$/i;
handler.limit = !0;
export default handler;
async function Upscale(imageBuffer) {
  try {
    const response = await fetch("https://lexica.qewertyy.dev/upscale", {
      body: JSON.stringify({
        image_data: Buffer.from(imageBuffer, "base64"),
        format: "binary"
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    return await response.arrayBuffer();
  } catch {
    return null;
  }
}
async function UpscaleV2(mediaURL) {
  try {
    const response = await fetch(`https://vex-kshitiz.vercel.app/upscale?url=${encodeURIComponent(mediaURL)}`);
    return await response.json();
  } catch {
    return null;
  }
}