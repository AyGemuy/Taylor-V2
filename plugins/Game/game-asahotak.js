import fetch from "node-fetch";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  let imgr = flaaa.getRandom();
  conn.asahotak = conn.asahotak ? conn.asahotak : {};
  let id = m.chat;
  if (id in conn.asahotak) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.asahotak[id][0]), !1;
  let src = await (await fetch("https://raw.githubusercontent.com/BochilTeam/database/master/games/asahotak.json")).json(),
    json = src[Math.floor(Math.random() * src.length)],
    caption = `*${command.toUpperCase()}*\n  ${json.soal}\n\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hasa untuk bantuan\nBonus: ${poin} XP\n    `.trim();
  conn.asahotak[id] = [await conn.sendFile(m.chat, imgr + command, "", caption, m), json, poin, setTimeout(async () => {
    conn.asahotak[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.asahotak[id][0]),
      delete conn.asahotak[id];
  }, timeout)];
};
handler.help = ["asahotak"], handler.tags = ["game"], handler.command = /^asahotak/i;
export default handler;
const buttons = [
  ["Hint", "/hasa"],
  ["Nyerah", "menyerah"]
];