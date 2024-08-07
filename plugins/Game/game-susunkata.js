import fetch from "node-fetch";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  let imgr = flaaa.getRandom();
  conn.susunkata = conn.susunkata ? conn.susunkata : {};
  let id = m.chat;
  if (id in conn.susunkata) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.susunkata[id][0]), !1;
  let src = await (await fetch("https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json")).json(),
    json = src[Math.floor(Math.random() * src.length)],
    caption = `*${command.toUpperCase()}*\n  ${json.soal}\n  ${json.tipe}\n\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hsus untuk bantuan\nBonus: ${poin} XP\n    `.trim();
  conn.susunkata[id] = [await conn.sendFile(m.chat, imgr + command, "", caption, m), json, poin, setTimeout(async () => {
    conn.susunkata[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.susunkata[id][0]),
      delete conn.susunkata[id];
  }, timeout)];
};
handler.help = ["susunkata"], handler.tags = ["game"], handler.command = /^susunkata/i;
export default handler;
const buttons = [
  ["Hint", "/hsus"],
  ["Nyerah", "menyerah"]
];