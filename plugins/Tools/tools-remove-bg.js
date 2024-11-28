import fetch from "node-fetch";
import {
  RemoveBackground,
  RemoveBackgroundV2,
} from "../../lib/tools/remove-background.js";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";
const handler = async (m, { conn, args }) => {
  let q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || "";
  if (!/image/.test(mime))
    throw "Reply dengan gambar yang ingin dihapus latar belakangnya.";
  m.reply("Mohon tunggu sebentar...");
  try {
    let buffer,
      media = await q?.download(),
      sauce =
        (await RemoveBackground(media)) ||
        (await RemoveBackgroundV2(media)) ||
        (await rembg(media)) ||
        (await removebg(media));
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
(handler.help = ["rmvbg"]),
  (handler.tags = ["tools"]),
  (handler.command = ["rmvbg"]);
export default handler;
async function rembg(files) {
  try {
    const { ext, mime } = (await fileTypeFromBuffer(files)) || {};
    if (!ext || !mime) throw new Error("Tipe file tidak dapat diidentifikasi");
    const formData = new FormData(),
      blob = new Blob([files], {
        type: mime,
      });
    formData.append("file", blob, "rembg." + ext || "jpg");
    formData.append("prompt", "Remove the background");
    const response = await fetch("https://easyedit.xyz:3000/rembg?uid=null", {
      method: "POST",
      body: formData,
    });
    return await response.arrayBuffer();
  } catch (error) {
    console.error(error);
  }
}
async function removebg(buffer) {
  if (!buffer) {
    return {
      status: false,
      message: "undefined reading buffer",
    };
  }
  try {
    const image = buffer.toString("base64");
    const response = await fetch(
      "https://us-central1-ai-apps-prod.cloudfunctions.net/restorePhoto",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: `data:image/png;base64,${image}`,
          model:
            "fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
        }),
      },
    );
    if (!response.ok) {
      throw new Error("Failed to remove background");
    }
    const data = await response.text();
    const cleanedData = data.replace(/"/g, "");
    console.log(response.status, cleanedData);
    if (!cleanedData) {
      return {
        status: false,
        message: "Failed to remove background from image",
      };
    }
    return cleanedData;
  } catch (e) {
    return {
      status: false,
      message: e.message,
    };
  }
}
