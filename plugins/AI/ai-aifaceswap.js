import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";
import fetch from "node-fetch";
const uploadFaceSwap = async (mediaBuffer) => {
  try {
    console.log("Starting uploadFaceSwap...");
    const fileType = await fileTypeFromBuffer(mediaBuffer);
    const mimeType = fileType ? fileType.mime : "image/jpeg";
    const fileName = `img.${fileType ? fileType.ext : "jpeg"}`;
    const formData = new FormData();
    formData.append(
      "file",
      new Blob([mediaBuffer], {
        type: mimeType,
      }),
      fileName,
    );
    const response = await fetch("https://aifaceswap.io/api/upload_img", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
        Referer: "https://aifaceswap.io/",
      },
      body: formData,
    });
    const data = await response.json();
    if (data.code !== 200) throw new Error("Failed to upload image.");
    console.log(
      "Image uploaded successfully:",
      "aifaceswap/upload_res/" + data.data,
    );
    return data.data;
  } catch (error) {
    console.error("Error in uploadFaceSwap:", error);
    throw error;
  }
};
const generateFace = async (source_image, face_image) => {
  try {
    console.log("Starting generateFace...");
    const response = await fetch("https://aifaceswap.io/api/generate_face", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
        Referer: "https://aifaceswap.io/",
      },
      body: JSON.stringify({
        source_image: source_image,
        face_image: face_image,
      }),
    });
    const data = await response.json();
    if (data.code !== 200)
      throw new Error("Failed to initiate face swap task.");
    const taskId = data.data.task_id;
    console.log("Face swap task initiated with ID:", taskId);
    let resultImage;
    let attempts = 0;
    const maxAttempts = 15;
    do {
      try {
        console.log("Checking task status... Attempt:", attempts + 1);
        const statusResponse = await fetch(
          "https://aifaceswap.io/api/check_status",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/javascript, */*; q=0.01",
              "X-Requested-With": "XMLHttpRequest",
              "User-Agent":
                "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
              Referer: "https://aifaceswap.io/",
            },
            body: JSON.stringify({
              task_id: taskId,
            }),
          },
        );
        const statusData = await statusResponse.json();
        if (statusData.code !== 200)
          throw new Error("Failed to check task status.");
        resultImage = statusData.data.result_image;
        if (!resultImage) {
          if (++attempts >= maxAttempts) {
            throw new Error(
              "Maximum attempts reached. Result image not available.",
            );
          }
          console.log("Result image not available yet. Waiting...");
          await new Promise((resolve) => setTimeout(resolve, 5e3));
        }
      } catch (statusError) {
        console.error("Error in status check:", statusError);
        throw statusError;
      }
    } while (!resultImage);
    console.log(
      "Result image obtained:",
      "https://art-global.yimeta.ai/" + resultImage,
    );
    return "https://art-global.yimeta.ai/" + resultImage;
  } catch (error) {
    console.error("Error in generateFace:", error);
    throw error;
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    console.log("Handler started...");
    const q = m.quoted || m;
    const mime = (q.msg || q).mimetype || "";
    let source_image;
    m.react(wait);
    if (mime) {
      try {
        console.log("Downloading media...");
        const media = await q.download();
        source_image = await uploadFaceSwap(media);
      } catch (uploadError) {
        console.error("Error in media upload:", uploadError);
        return m.reply("Failed to upload source image.");
      }
    } else {
      return m.reply("Tidak ada media yang ditemukan.");
    }
    const inputUrl = args.length
      ? args.join(" ")
      : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!inputUrl)
      return m.reply(
        `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} [url gambar] Hai, apa kabar?*`,
      );
    let faceUrl;
    try {
      console.log("Downloading face image...");
      const faceUrlBuffer = await (await fetch(inputUrl)).arrayBuffer();
      faceUrl = await uploadFaceSwap(Buffer.from(faceUrlBuffer));
    } catch (faceUploadError) {
      console.error("Error in face image upload:", faceUploadError);
      return m.reply("Failed to upload face image.");
    }
    let resultImageUrl;
    try {
      console.log("Generating face swap...");
      resultImageUrl = await generateFace(source_image, faceUrl);
    } catch (generateError) {
      console.error("Error in generateFace:", generateError);
      return m.reply("Failed to generate face swap.");
    }
    console.log("Sending result image...");
    await conn.sendMessage(
      m.chat,
      {
        image: {
          url: resultImageUrl || source_image,
        },
        caption: `✨ *${command?.toUpperCase()}*\n- *Request oleh:* @${m.sender.split("@")[0]}`,
        mentions: [m.sender],
      },
      {
        quoted: m,
      },
    );
    m.react(sukses);
  } catch (error) {
    console.error("Error in handler:", error);
    m.react(eror);
  }
};
handler.help = ["aifaceswap"];
handler.tags = ["ai"];
handler.command = /^(aifaceswap)$/i;
export default handler;
