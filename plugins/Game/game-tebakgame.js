import fetch from "node-fetch";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  flaaa.getRandom();
  conn.tebakgame = conn.tebakgame ? conn.tebakgame : {};
  let id = m.chat;
  if (id in conn.tebakgame) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.tebakgame[id][0]), !1;
  let src = await (await fetch("https://raw.githubusercontent.com/qisyana/scrape/main/tebakgame.json")).json(),
    json = src[Math.floor(Math.random() * src.length)],
    caption = `*${command.toUpperCase()}*\nLogo apakah ini?\n\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hgame untuk bantuan\nBonus: ${poin} XP\n    `.trim();
  conn.tebakgame[id] = [await conn.sendFile(m.chat, json.img, "", caption, m), json, poin, setTimeout(async () => {
    conn.tebakgame[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakgame[id][0]),
      delete conn.tebakgame[id];
  }, timeout)];
};
handler.help = ["tebakgame"], handler.tags = ["game"], handler.command = /^tebakgame/i;
export default handler;
const buttons = [
  ["Hint", "/hgame"],
  ["Nyerah", "menyerah"]
];