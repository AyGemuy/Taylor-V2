import fetch from "node-fetch";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  let imgr = flaaa.getRandom();
  conn.tebakkimia = conn.tebakkimia ? conn.tebakkimia : {};
  let id = m.chat;
  if (id in conn.tebakkimia) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.tebakkimia[id][0]), !1;
  let src = await (await fetch("https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkimia.json")).json(),
    json = src[Math.floor(Math.random() * src.length)],
    caption = `*${command.toUpperCase()}*\nUsur kimia : *[ ${json.lambang} ]*\n\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hkim untuk bantuan\nBonus: ${poin} XP\n    `.trim();
  conn.tebakkimia[id] = [await conn.sendFile(m.chat, imgr + command, "", caption, m), json, poin, setTimeout(async () => {
    conn.tebakkimia[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.unsur}* *[ ${json.lambang} ]*`, conn.tebakkimia[id][0]),
      delete conn.tebakkimia[id];
  }, timeout)];
};
handler.help = ["tebakkimia"], handler.tags = ["game"], handler.command = /^tebakkimia/i;
export default handler;
const buttons = [
  ["Hint", "/hkim"],
  ["Nyerah", "menyerah"]
];