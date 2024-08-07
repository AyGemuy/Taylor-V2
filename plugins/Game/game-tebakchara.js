import fetch from "node-fetch";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  conn.tebakchara = conn.tebakchara ? conn.tebakchara : {};
  let id = m.chat;
  if (id in conn.tebakchara) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.tebakchara[id][0]), !1;
  let res = await fetch("https://api.jikan.moe/v4/characters"),
    json = (await res.json()).data.getRandom(),
    caption = `*${command.toUpperCase()}*\nSiapakah nama dari gambar ini\n\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hcha untuk hint\nBonus: ${poin} XP\n    `.trim();
  conn.tebakchara[id] = [await conn.sendFile(m.chat, json.images.jpg.image_url, "", caption, m), json, poin, setTimeout(async () => {
    conn.tebakchara[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.name}*\nKanji : ${json.name_kanji}\n*Url :* ${json.url}\n*Desk :* ${json.about}`, conn.tebakchara[id][0]),
      delete conn.tebakchara[id];
  }, timeout)];
};
handler.help = ["tebakchara"], handler.tags = ["game"], handler.command = /^tebakchara/i;
export default handler;
const buttons = [
  ["Hint", "/hcha"],
  ["Nyerah", "menyerah"]
];