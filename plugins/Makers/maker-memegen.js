import fetch from "node-fetch";
import uploadImage from "../../lib/uploadImage.js";
import {
  sticker
} from "../../lib/sticker.js";
import wibusoft from "wibusoft";
const getFonts = async () => {
  try {
    let res = await fetch("https://api.memegen.link/fonts", {
      headers: {
        accept: "application/json"
      }
    });
    let fonts = await res.json();
    return Object.values(fonts).map(v => v.id).getRandom();
  } catch (error) {
    console.error("Error fetching fonts:", error);
    throw error;
  }
};
const createTemplate = async (bg, atas, bawah, font) => {
  try {
    let res = await fetch("https://api.memegen.link/templates/custom", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        background: bg,
        text: [encodeURIComponent(atas || ""), encodeURIComponent(bawah || "")],
        font: font,
        extension: "png"
      })
    });
    return await res.json();
  } catch (error) {
    console.error("Error creating template:", error);
    throw error;
  }
};
const createImage = async (bg, atas, bawah, font) => {
  try {
    let res = await fetch("https://api.memegen.link/images/custom", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        background: bg,
        text: [encodeURIComponent(atas || ""), encodeURIComponent(bawah || "")],
        font: font,
        extension: "png"
      })
    });
    return await res.json();
  } catch (error) {
    console.error("Error creating image:", error);
    throw error;
  }
};
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  command
}) => {
  let [atas, bawah] = text.split(/[^\w\s]/g);
  let q = m.quoted ? m.quoted : m;
  let image = await q?.download();
  let mime = (q.msg || q).mimetype || q.mediaType || "";
  if (!/image|viewOnce/g.test(mime)) {
    return m.reply(`Reply Media dengan perintah\n\n${usedPrefix + command} <${atas || "teks atas"}>|<${bawah || "teks bawah"}>`);
  }
  m.react(wait);
  try {
    let bg = await uploadImage(image);
    let font = await getFonts();
    let json = await createTemplate(bg, atas, bawah, font);
    try {
      let out = await wibusoft.tools.makeSticker(json.url, {
        author: packname,
        pack: m.name,
        keepScale: true
      });
      m.reply(out);
    } catch (e) {
      console.error("Error making sticker (first attempt):", e);
      let stick = await sticker(false, json.url, m.name, packname);
      await conn.sendFile(m.chat, stick, "memegen.webp", "", m);
    }
  } catch (e) {
    console.error("Error in main try-catch:", e);
    try {
      let bg = await uploadImage(image);
      let font = await getFonts();
      let json = await createImage(bg, atas, bawah, font);
      let out = await wibusoft.tools.makeSticker(json.url, {
        author: packname,
        pack: m.name,
        keepScale: true
      });
      m.reply(out);
    } catch (error) {
      console.error("Error making sticker (second attempt):", error);
      let stick = await sticker(false, json.url, m.name, packname);
      await conn.sendFile(m.chat, stick, "memegen.webp", "", m);
    }
  }
};
handler.help = ["memegen"];
handler.tags = ["maker"];
handler.command = /^(memegen)$/i;
export default handler;