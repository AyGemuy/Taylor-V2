import fetch from "node-fetch";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  conn.tebaklogo = conn.tebaklogo ? conn.tebaklogo : {};
  let id = m.chat;
  if (id in conn.tebaklogo) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.tebaklogo[id][0]), !1;
  let res = await fetch("https://raw.githubusercontent.com/orderku/db/main/dbbot/game/tebakapp.json"),
    src = await res.json(),
    json = {
      hasil: src[Math.floor(Math.random() * src.length)]
    },
    caption = `*${command.toUpperCase()}*\nLogo apakah ini?\n\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hlog untuk hint\nBonus: ${poin} XP\n    `.trim();
  conn.tebaklogo[id] = [await conn.sendFile(m.chat, json.hasil.data.image, "", caption, m), json, poin, setTimeout(async () => {
    conn.tebaklogo[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.hasil.data.jawaban}*`, conn.tebaklogo[id][0]),
      delete conn.tebaklogo[id];
  }, timeout)];
};
handler.help = ["tebaklogo"], handler.tags = ["game"], handler.command = /^tebaklogo/i;
export default handler;
const buttons = [
  ["Hint", "/hlog"],
  ["Nyerah", "menyerah"]
];