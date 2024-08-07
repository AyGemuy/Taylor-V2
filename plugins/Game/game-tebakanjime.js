import fetch from "node-fetch";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  conn.tebakanjime = conn.tebakanjime ? conn.tebakanjime : {};
  let id = m.chat;
  if (id in conn.tebakanjime) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.tebakanjime[id][0]), !1;
  let res = await fetch("https://api.jikan.moe/v4/random/characters"),
    json = (await res.json()).data,
    caption = `*${command.toUpperCase()}*\nSiapakah nama dari gambar ini\n\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hani untuk hint\nBonus: ${poin} XP\n    `.trim();
  conn.tebakanjime[id] = [await conn.sendFile(m.chat, json.images.jpg.image_url, "", caption, m), json, poin, setTimeout(async () => {
    conn.tebakanjime[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.name}*\n*Desk:* ${json.name_kanji}\n${json.about}`, conn.tebakanjime[id][0]),
      delete conn.tebakanjime[id];
  }, timeout)];
};
handler.help = ["tebakanime"], handler.tags = ["game"], handler.command = /^tebakanime/i;
export default handler;
const buttons = [
  ["Hint", "/hani"],
  ["Nyerah", "menyerah"]
];