import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { FormData } from "formdata-node";
const meki = [
  "Hyper-Surreal Escape",
  "Neon Fauvism",
  "Post-Analog Glitchscape",
  "AI Dystopia",
  "Vivid Pop Explosion",
];
const FluxImage = async (
  prompt,
  styleIndex = Math.floor(Math.random() * meki.length),
) => {
  try {
    const formData = new FormData();
    formData.append("field-0", prompt);
    formData.append("field-1", meki[styleIndex - 1]);
    const response = await fetch("https://devrel.app.n8n.cloud/form/flux", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "*/*",
        "User-Agent": "Postify/1.0.0",
      },
    });
    const data = await response.text();
    const $ = cheerio.load(data);
    return {
      image: $(".image-container img").attr("src"),
      style: $(".style-text").text().replace("Style: ", ""),
    };
  } catch (error) {
    throw error;
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let text = args.length
      ? args.join(" ")
      : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text)
      return m.reply(
        `Please provide text or reply to a message containing text to process.\nUsage example:\n*${usedPrefix}${command} Men*`,
      );
    const styleMatch = text.match(/--style=(\d+)/);
    let styleIndex = Math.floor(Math.random() * meki.length);
    if (styleMatch) {
      styleIndex = parseInt(styleMatch[1]);
      text = text.replace(/--style=\d+/, "").trim();
      if (styleIndex > meki.length || styleIndex < 1) {
        return m.reply(
          meki.map((style, index) => `${index + 1}. ${style}`).join("\n"),
        );
      }
    }
    m.react(wait);
    const imageUrl = await FluxImage(text, styleIndex);
    await conn.sendMessage(
      m.chat,
      {
        image: {
          url: imageUrl.image,
        },
        caption: `✨ *\`AI Image Generated\`* ✨\n\n📝 *Style:* ${imageUrl.style}`,
      },
      {
        quoted: m,
      },
    );
    m.react(sukses);
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["devrelflux"];
handler.tags = ["ai"];
handler.command = /^(devrelflux)$/i;
export default handler;
