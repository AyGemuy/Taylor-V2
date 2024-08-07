import fetch from "node-fetch";
import uploadImage from "../../lib/uploadImage.js";
import {
  FormData,
  Blob
} from "formdata-node";
import {
  translate
} from "@vitalets/google-translate-api";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  try {
    let text;
    if (args.length >= 1) text = args.slice(0).join(" ");
    else {
      if (!m.quoted || !m.quoted?.text) return m.reply("Input Teks");
      text = m.quoted?.text;
    }
    let q = m.quoted ? m.quoted : m,
      mime = (q.msg || q).mimetype || "";
    if (m.react(wait), !mime) return m.reply("Input Foto");
    let media = await q?.download(),
      link = (/image\/(png|jpe?g)/.test(mime), await uploadImage(media));
    const prompt = text.trim();
    let res = await translate(prompt, {
        to: "en",
        autoCorrect: !0
      }).catch(_ => null),
      result = await WhatImage(link, res.text);
    if (!result) throw "Terjadi kesalahan saat mengonversi gambar ke zombie.";
    m.reply(result.output);
  } catch (error) {
    throw console.error("Error:", error), error;
  }
};
handler.help = ["boredchatimg"].map(v => v + " (Balas foto)"), handler.tags = ["tools"],
  handler.command = /^(boredchatimg)$/i, handler.limit = !0;
export default handler;
async function WhatImage(image, prompt) {
  try {
    let form = new FormData();
    form.append("prompt", encodeURIComponent(prompt)), form.append("image", encodeURIComponent(image));
    const response = await fetch("https://boredhumans.com/api_image_chat.php", {
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