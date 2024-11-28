import { sticker } from "../../lib/sticker.js";
import fetch from "node-fetch";
const handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!args[0])
    throw `*Perintah ini untuk mengambil stiker dari Line\n\nContoh penggunaan:\n${usedPrefix + command} spongebob`;
  const json = await stickerLine(args[0]);
  let row = Object.values(json).map((v, index) => ({
      title: index + v.title,
      description: "\n• Link: " + v.sticker,
      rowId: usedPrefix + "fetchsticker " + v.sticker + " lib",
    })),
    button = {
      buttonText: `☂️ ${command} Search Disini ☂️`,
      description: `⚡ Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
      footerText: wm,
    };
  return await conn.sendListM(m.chat, button, row, m);
};
(handler.help = ["linestick"].map((v) => v + " <url>")),
  (handler.tags = ["downloader"]),
  (handler.command =
    /^(s((ti(cker|k)lines|linedl)|ti(cker|k)line)|linesti(ck(dl|er)|k))$/i),
  (handler.exp = 0),
  (handler.register = !1),
  (handler.limit = !0);
export default handler;
async function stickerLine(query) {
  const response = await fetch(
    `https://store.line.me/api/search/sticker?query=${query}&offset=0&limit=36&type=ALL&includeFacets=true`,
  );
  const data = await response.json();
  return data.items.map(
    ({
      title,
      productUrl,
      id,
      description,
      payloadForProduct: { staticUrl, animationUrl, soundUrl },
      authorId,
      authorName,
    }) => {
      return index_js_1.StickerLineSchema.parse({
        id: id,
        title: title,
        description: description,
        url: encodeURI("https://store.line.me" + productUrl),
        sticker: staticUrl,
        stickerAnimated: animationUrl,
        stickerSound: soundUrl,
        authorId: authorId,
        authorName: authorName,
      });
    },
  );
}
