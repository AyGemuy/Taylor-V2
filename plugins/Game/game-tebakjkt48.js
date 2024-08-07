import fetch from "node-fetch";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  conn.tebakjkt48 = conn.tebakjkt48 ? conn.tebakjkt48 : {};
  let id = m.chat;
  if (id in conn.tebakjkt48) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.tebakjkt48[id][0]), !1;
  let src = await (await fetch("https://api.crstlnz.my.id/api/member?group=jkt48")).json(),
    randoms = src[Math.floor(Math.random() * src.length)],
    json = {
      url: randoms.img,
      name: randoms.name
    },
    caption = `*${command.toUpperCase()}*\nsiapakah nama member ini?\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hjkt untuk bantuan\nBonus: ${poin} XP\n    `.trim();
  conn.tebakjkt48[id] = [await conn.sendFile(m.chat, json.url, "", caption, m), json, poin, setTimeout(async () => {
    conn.tebakjkt48[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.name}*`, conn.tebakjkt48[id][0]),
      delete conn.tebakjkt48[id];
  }, timeout)];
};
handler.help = ["tebakjkt48"], handler.tags = ["game"], handler.command = /^tebakjkt48/i;
export default handler;
const buttons = [
  ["Hint", "/hjkt"],
  ["Nyerah", "menyerah"]
];