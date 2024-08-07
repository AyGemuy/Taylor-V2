import fetch from "node-fetch";
import {
  Sticker
} from "wa-sticker-formatter";
import wibusoft from "wibusoft";
import emojiRegex from "emoji-regex";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  try {
    const who = m.name,
      name = who || "Unknown",
      emojiRegexExp = emojiRegex();
    const [a, b, c] = text.match(emojiRegexExp)?.slice(0, 3) || [];
    let emojiA = a,
      emojiB = b || emojiA,
      chosenFormat = ["wsf", "wbs"].includes(c) ? c : "wsf";
    if (!emojiA || !emojiB) {
      return m.reply(`*⛌ Masukkan emoji yang ingin kamu gabungkan.*\n\n- *Example:*\n- *${usedPrefix}${command}* 🐱+👻\n\n[ minimal 2 emoji ]`);
    }
    m.react(wait);
    let anu = await makerMix(emojiA, emojiB);
    if (!anu || !anu.results || anu.results.length === 0) {
      return m.reply("❌ *Tidak dapat menemukan stiker dengan emoji yang diberikan.*");
    }
    for (let res of anu.results) {
      let stiker;
      switch (chosenFormat) {
        case "wsf":
          stiker = await createSticker(null, res.url, name, "wa-sticker-formatter", 60);
          await conn.sendFile(m.chat, stiker, "sticker.webp", "", m);
          break;
        case "wbs":
          stiker = await wibusoft.tools.makeSticker(res.url, {
            author: name,
            pack: "wibusoft"
          });
          await conn.sendFile(m.chat, stiker, "sticker.webp", "", m);
          break;
        default:
          stiker = await createSticker(null, res.url, name, "wa-sticker-formatter", 60);
          await conn.sendFile(m.chat, stiker, "sticker.webp", "", m);
          break;
      }
    }
  } catch (error) {
    console.error("Error handling emojimix command:", error);
    m.react(eror);
  }
};
handler.help = ["emojimix"].map(v => v + " [emoji] [emoji] [wsf|wbs]");
handler.tags = ["misc"];
handler.command = /^em(ojim)?ix$/i;
export default handler;
async function createSticker(img, url, packName, authorName, quality) {
  try {
    return await new Sticker(img || url, {
      type: "full",
      pack: packName,
      author: authorName,
      quality: quality
    }).toBuffer();
  } catch (error) {
    console.error("Error creating sticker:", error);
  }
}
async function makerMix(a, b) {
  try {
    let response = await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(a)}_${encodeURIComponent(b)}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching from Tenor API:", error);
  }
}