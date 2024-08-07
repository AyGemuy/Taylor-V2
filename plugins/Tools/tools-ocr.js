import {
  FormData,
  Blob
} from "formdata-node";
import {
  fileTypeFromBuffer
} from "file-type";
import fetch from "node-fetch";
import {
  webp2png
} from "../../lib/webp2mp4.js";
const handler = async (m, {
  conn,
  args,
  text,
  usedPrefix,
  command
}) => {
  try {
    let q = m.quoted || m;
    let mime = (q.msg || q).mimetype || q.mediaType || "";
    mime = text && !m.quoted ? "text/plain" : mime;
    if (text && !/text/g.test(mime) || !text && !/webp|image|video|gif|viewOnce/g.test(mime)) {
      return m.reply(`Reply to media with command\n\n${usedPrefix + command}`);
    }
    m.react(wait);
    let img = text ? text.trim() : await q.download();
    let res = await ocrSpace(img);
    m.reply(res.ParsedResults[0]?.ParsedText || "Cannot recognize text.");
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["ocr"];
handler.tags = ["tools"];
handler.command = /^ocr$/i;
export default handler;
const detectInput = input => typeof input === "string" && input.startsWith("http") ? "url" : Buffer.isBuffer(input) ? "file" : typeof input === "string" && input.startsWith("data:") ? "base64Image" : "file";
const ocrSpace = async (input, options = {}) => {
  try {
    const {
      apiKey = "helloworld",
        ocrUrl = "https://api.ocr.space/parse/image",
        language = "eng"
    } = options;
    const formData = new FormData();
    const detectedInput = detectInput(input);
    const {
      ext,
      mime
    } = await fileTypeFromBuffer(input) || {
      ext: "jpg",
      mime: "image/jpg"
    };
    if (mime === "image/webp") input = await webp2png(input);
    const fileBlob = detectedInput === "file" ? new Blob([input], {
      type: mime
    }) : null;
    formData.append(detectedInput === "file" ? "file" : "url", fileBlob, `ocr.${ext || "jpg"}`);
    formData.append("language", language);
    formData.append("filetype", mime);
    const response = await fetch(ocrUrl, {
      method: "POST",
      headers: {
        apikey: apiKey
      },
      body: formData
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};