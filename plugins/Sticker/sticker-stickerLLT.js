import {
  sticker
} from "../../lib/sticker.js";
import {
  stickerLine
} from "@bochilteam/scraper";
const handler = async (m, {
  conn,
  args,
  text,
  usedPrefix,
  command
}) => {
  if (!args[0]) throw `*Perintah ini untuk mengambil stiker dari Line\n\nContoh penggunaan:\n${usedPrefix + command} spongebob`;
  const json = await stickerLine(args[0]);
  let row = Object.values(json).map((v, index) => ({
      title: index + v.title,
      description: "\n• Link: " + v.sticker,
      rowId: usedPrefix + "fetchsticker " + v.sticker + " lib"
    })),
    button = {
      buttonText: `☂️ ${command} Search Disini ☂️`,
      description: `⚡ Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
      footerText: wm
    };
  return await conn.sendListM(m.chat, button, row, m);
};
handler.help = ["stkline <url>"], handler.tags = ["sticker"], handler.command = /^(stkline)$/i,
  handler.limit = !0;
export default handler;