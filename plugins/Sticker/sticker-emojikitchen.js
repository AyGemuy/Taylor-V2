import fetch from "node-fetch";
import {
  Sticker,
  StickerTypes
} from "wa-sticker-formatter";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  let [modes, kodes] = text.split(/[^\w\s]/g);
  if (!modes || !kodes) return m.reply("*Example:*\n.emojikitchen 😅.😅");
  m.react(wait);
  try {
    let data = await EmojiKitchen(modes.codePointAt(0).toString(16), kodes.codePointAt(0).toString(16)),
      stiker = await createSticker(!1, data, packname, m.name, 30);
    m.reply(stiker);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["emojikitchen query"], handler.tags = ["internet"], handler.command = /^(emojikitchen)$/i;
export default handler;
async function EmojiKitchen(a, b) {
  try {
    return "https://www.gstatic.com/android/keyboard/emojikitchen/20201001/u" + a + "/u" + a + "_u" + b + ".png";
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}
async function createSticker(img, url, packName, authorName, quality) {
  return new Sticker(img || url, {
    type: "full",
    pack: packName,
    author: authorName,
    quality: quality
  }).toBuffer();
}