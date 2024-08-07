import fetch from "node-fetch";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  let imgr = flaaa.getRandom();
  conn.tebakkalimat = conn.tebakkalimat ? conn.tebakkalimat : {};
  let id = m.chat;
  if (id in conn.tebakkalimat) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.tebakkalimat[id][0]), !1;
  let src = await (await fetch("https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkalimat.json")).json(),
    json = src[Math.floor(Math.random() * src.length)],
    caption = `*${command.toUpperCase()}*\n${json.soal}\n\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hkal untuk bantuan\nBonus: ${poin} XP\n    `.trim();
  conn.tebakkalimat[id] = [await conn.sendFile(m.chat, imgr + command, "", caption, m), json, poin, setTimeout(async () => {
    conn.tebakkalimat[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakkalimat[id][0]),
      delete conn.tebakkalimat[id];
  }, timeout)];
};
handler.help = ["tebakkalimat"], handler.tags = ["game"], handler.command = /^tebakkalimat/i;
export default handler;
const buttons = [
  ["Hint", "/hkal"],
  ["Nyerah", "menyerah"]
];