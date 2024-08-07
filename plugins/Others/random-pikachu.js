import uploadImage from "../../lib/uploadImage.js";
import {
  createSticker
} from "wa-sticker-formatter";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  try {
    let marah = API("https://some-random-api.com", "/img/pikachu", {}),
      fet = await (await fetch(marah)).json(),
      stiker = await createSticker(fet.link, {
        pack: packname,
        author: author
      });
    await conn.sendFile(m.chat, stiker, "atet.webp", "", m);
  } catch (e) {
    console.log(e);
  }
};
handler.menu = ["pikachu"], handler.tags = ["search"], handler.command = /^(pikachu)$/i,
  handler.premium = !1, handler.limit = !0;
export default handler;