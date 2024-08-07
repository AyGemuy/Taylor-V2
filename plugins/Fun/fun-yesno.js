import fetch from "node-fetch";
import {
  Sticker,
  StickerTypes
} from "wa-sticker-formatter";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  args
}) => {
  m.react(wait);
  let res = await YesNo(),
    stiker = await createSticker(!1, res.image, "Bot say ", res.answer.toUpperCase(), 30);
  try {
    m.reply(stiker);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["yesno"], handler.tags = ["fun"], handler.command = /^(yesno)$/i;
export default handler;
async function YesNo() {
  const response = await fetch("https://yesno.wtf/api");
  return await response.json();
}
async function createSticker(img, url, packName, authorName, quality) {
  return new Sticker(img || url, {
    type: "full",
    pack: packName,
    author: authorName,
    quality: quality
  }).toBuffer();
}