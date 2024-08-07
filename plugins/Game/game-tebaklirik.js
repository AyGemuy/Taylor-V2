import fetch from "node-fetch";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  let imgr = flaaa.getRandom();
  conn.tebaklirik = conn.tebaklirik ? conn.tebaklirik : {};
  let id = m.chat;
  if (id in conn.tebaklirik) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.tebaklirik[id][0]), !1;
  let res = await fetch("https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaklirik.json");
  if (!res.ok) return await `${res.status} ${res.statusText}`;
  let data = await res.json(),
    json = data[Math.floor(Math.random() * data.length)],
    caption = `*${command.toUpperCase()}*\n${json.soal}\n\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hlir untuk bantuan\nBonus: ${poin} XP\n    `.trim();
  conn.tebaklirik[id] = [await conn.sendFile(m.chat, imgr + command, "", caption, m), json, poin, setTimeout(async () => {
    conn.tebaklirik[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebaklirik[id][0]),
      delete conn.tebaklirik[id];
  }, timeout)];
};
handler.help = ["tebaklirik"], handler.tags = ["game"], handler.command = /^tebaklirik/i;
export default handler;
const buttons = [
  ["Hint", "/hlir"],
  ["Nyerah", "menyerah"]
];