import fetch from "node-fetch";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {};
  let json, id = m.chat;
  if (id in conn.tebakbendera) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.tebakbendera[id][0]), !1;
  try {
    let data = await (await fetch("https://flagcdn.com/en/codes.json")).json();
    const randomKey = Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)];
    json = {
      name: data[randomKey],
      img: `https://flagpedia.net/data/flags/ultra/${randomKey}.png`
    };
  } catch (e) {
    try {
      let src = await (await fetch("https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera2.json")).json();
      json = src[Math.floor(Math.random() * src.length)];
    } catch (e) {
      throw !1;
    }
  }
  let caption = `*${command.toUpperCase()}*\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hben untuk bantuan\nBonus: ${poin} XP\n    `.trim();
  conn.logger.info(json.name), conn.tebakbendera[id] = [await conn.sendFile(m.chat, json.img, "", caption, m), json, poin, setTimeout(async () => {
    conn.tebakbendera[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.name}*`, conn.tebakbendera[id][0]),
      delete conn.tebakbendera[id];
  }, timeout)];
};
handler.help = ["tebakbendera"], handler.tags = ["game"], handler.command = /^tebakbendera/i;
export default handler;
const buttons = [
  ["Hint", "/hben"],
  ["Nyerah", "menyerah"]
];