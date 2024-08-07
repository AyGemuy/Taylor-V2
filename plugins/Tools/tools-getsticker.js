import fetch from "node-fetch";
import {
  sticker
} from "../../lib/sticker.js";
import {
  Sticker,
  StickerTypes
} from "wa-sticker-formatter";
import wibusoft from "wibusoft";
const handler = async (m, {
  conn,
  args,
  text
}) => {
  if (m.react(wait), "wsf" === args[1]) {
    let stiker = await createSticker(!1, args[0], packname, author, 60);
    m.reply(stiker);
  }
  if ("lib" === args[1]) {
    let stiker = await sticker(null, encodeURI(args[0]), packname, author);
    if (stiker) return await conn.sendFile(m.chat, stiker, "sticker.webp", "", fakes, adReply, {
      asSticker: !0
    });
    throw stiker.toString();
  }
  if ("wib" === args[1]) {
    let stiker = await wibusoft.tools.makeSticker(args[0], {
      author: packname,
      pack: author
    });
    m.reply(stiker);
  }
};
handler.command = /^fetchsticker$/i, handler.limit = !0;
export default handler;
async function createSticker(img, url, packName, authorName, quality) {
  return new Sticker(img || url, {
    type: "full",
    pack: packName,
    author: authorName,
    quality: quality
  }).toBuffer();
}