import fetch from "node-fetch";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  let imgr = flaaa.getRandom();
  conn.tekateki = conn.tekateki ? conn.tekateki : {};
  let id = m.chat;
  if (id in conn.tekateki) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.tekateki[id][0]), !1;
  let src = await (await fetch("https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json")).json(),
    json = src[Math.floor(Math.random() * src.length)],
    caption = `*${command.toUpperCase()}*\n${json.soal}\n\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}htek untuk bantuan\nBonus: ${poin} XP\n    `.trim();
  conn.tekateki[id] = [await conn.sendFile(m.chat, imgr + command, "", caption, m), json, poin, setTimeout(async () => {
    conn.tekateki[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tekateki[id][0]),
      delete conn.tekateki[id];
  }, timeout)];
};
handler.help = ["tekateki"], handler.tags = ["game"], handler.command = /^tekateki/i;
export default handler;
const buttons = [
  ["Hint", "/htek"],
  ["Nyerah", "menyerahtek"]
];