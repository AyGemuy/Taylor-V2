import fetch from "node-fetch";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  let imgr = flaaa.getRandom();
  conn.tebaktebakan = conn.tebaktebakan ? conn.tebaktebakan : {};
  let id = m.chat;
  if (id in conn.tebaktebakan) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.tebaktebakan[id][0]), !1;
  let src = await (await fetch("https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaktebakan.json")).json(),
    json = src[Math.floor(Math.random() * src.length)],
    caption = `*${command.toUpperCase()}*\n  ${json.soal}\n\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hteb untuk bantuan\nBonus: ${poin} XP\n    `.trim();
  conn.tebaktebakan[id] = [await conn.sendFile(m.chat, imgr + command, "", caption, m), json, poin, setTimeout(async () => {
    conn.tebaktebakan[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebaktebakan[id][0]),
      delete conn.tebaktebakan[id];
  }, timeout)];
};
handler.help = ["tebaktebakan"], handler.tags = ["game"], handler.command = /^tebaktebakan/i;
export default handler;
const buttons = [
  ["Hint", "/hteb"],
  ["Nyerah", "menyerah"]
];
