import fetch from "node-fetch";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  let imgr = flaaa.getRandom();
  conn.tebaksiapa = conn.tebaksiapa ? conn.tebaksiapa : {};
  let id = m.chat;
  if (id in conn.tebaksiapa) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.tebaksiapa[id][0]), !1;
  let src = await (await fetch("https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json")).json(),
    json = src[Math.floor(Math.random() * src.length)],
    caption = `*${command.toUpperCase()}*\n${json.soal}\n\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hsia untuk bantuan\nBonus: ${poin} XP\n    `.trim();
  conn.tebaksiapa[id] = [await conn.sendFile(m.chat, imgr + command, "", caption, m), json, poin, setTimeout(async () => {
    conn.tebaksiapa[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebaksiapa[id][0]),
      delete conn.tebaksiapa[id];
  }, timeout)];
};
handler.help = ["tebaksiapa"], handler.tags = ["game"], handler.command = /^tebaksiapa/i;
export default handler;
const buttons = [
  ["Hint", "/hsia"],
  ["Nyerah", "menyerah"]
];