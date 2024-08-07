import {
  tebakgambar
} from "@bochilteam/scraper";
import {
  webp2png
} from "../../lib/webp2mp4.js";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  conn.tebakingambar = conn.tebakingambar ? conn.tebakingambar : {};
  let id = m.chat;
  if (id in conn.tebakingambar) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.tebakingambar[id][0]), !1;
  let json = await tebakgambar(),
    caption = `*${command.toUpperCase()}*\nRangkailah Gambar Ini\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hgam untuk bantuan\nBonus: ${poin} XP\n    `.trim(),
    imgurl = await imageUrl(json.img);
  conn.tebakingambar[id] = [await conn.sendFile(m.chat, imgurl, "", caption, m), json, poin, setTimeout(async () => {
    conn.tebakingambar[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakingambar[id][0]),
      delete conn.tebakingambar[id];
  }, timeout)];
};
handler.help = ["tebakgambar"], handler.tags = ["game"], handler.command = /^tebakgambar/i;
export default handler;
async function imageUrl(url) {
  try {
    let Blobs = await (await fetch(url)).blob(),
      arrayBuffer = await Blobs.arrayBuffer(),
      buffer = Buffer.from(arrayBuffer);
    return await webp2png(buffer);
  } catch (error) {
    console.error("Error:", error);
  }
}
const buttons = [
  ["Hint", "/hgam"],
  ["Nyerah", "menyerah"]
];