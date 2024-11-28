import WebSocket from "ws";
import { fileTypeFromBuffer } from "file-type";
const handler = async (m, { command, usedPrefix, conn, args }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q)?.mimetype || "";
  if (!mime) return m.reply("*Tidak ada media yang ditemukan*");
  try {
    m.react(wait);
    const media = await q.download();
    const prompt = await imageToPrompt(media);
    m.react(sukses);
    m.reply(prompt || "*Tidak ada data dari API*");
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
  }
};
async function imageToPrompt(imageBuffer) {
  try {
    const fileType = await fileTypeFromBuffer(imageBuffer);
    const ext = fileType?.ext || "jpg";
    const mimeType = fileType?.mime || "image/jpeg";
    const base64Image = imageBuffer.toString("base64");
    const imageData = `data:${mimeType};base64,${base64Image}`;
    const ws = new WebSocket(
      "wss://pharmapsychotic-clip-interrogator.hf.space/queue/join",
    );
    const result = await new Promise((resolve, reject) => {
      const send_hash = {
        fn_index: 1,
        session_hash: "tzet6g7gqhq",
      };
      const send_data = {
        data: [imageData, "ViT-L (best for Stable Diffusion 1.*)", "best"],
        event_data: null,
        fn_index: 3,
        session_hash: "tga18lg3bbc",
      };
      ws.onopen = () => {
        console.log("Connected to websocket");
      };
      ws.onmessage = async (event) => {
        const message = JSON.parse(event.data);
        switch (message.msg) {
          case "send_hash":
            ws.send(JSON.stringify(send_hash));
            break;
          case "estimation":
            console.log("Menunggu antrean: " + message.rank);
            break;
          case "send_data":
            console.log("Proses data Anda...");
            ws.send(JSON.stringify(send_data));
            break;
          case "process_completed":
            console.log(JSON.stringify(message, null, 4));
            resolve({
              prompt: message.output.data[0],
            });
            break;
        }
      };
      ws.onclose = (event) => {
        if (event.code !== 1e3) {
          console.error("Error: Kesalahan Koneksi WebSocket\n");
        }
      };
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        reject(error);
      };
    });
    return result.prompt;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}
handler.help = ["img2prompt"];
handler.tags = ["ai"];
handler.command = /^(img2prompt)$/i;
export default handler;
