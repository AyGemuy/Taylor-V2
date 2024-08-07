import fetch from "node-fetch";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  let imgr = flaaa.getRandom();
  conn.lengkapikalimat = conn.lengkapikalimat ? conn.lengkapikalimat : {};
  let id = m.chat;
  if (id in conn.lengkapikalimat) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.lengkapikalimat[id][0]), !1;
  let src = await (await fetch("https://raw.githubusercontent.com/qisyana/scrape/main/lengkapikalimat.json")).json(),
    json = src[Math.floor(Math.random() * src.length)],
    caption = `*${command.toUpperCase()}*\n  ${json.pertanyaan}\n\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hlen untuk bantuan\nBonus: ${poin} XP\n    `.trim();
  conn.lengkapikalimat[id] = [await conn.sendFile(m.chat, imgr + command, "", caption, m), json, poin, setTimeout(async () => {
    conn.lengkapikalimat[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.lengkapikalimat[id][0]),
      delete conn.lengkapikalimat[id];
  }, timeout)];
};
handler.help = ["lengkapikalimat"], handler.tags = ["game"], handler.command = /^lengkapikalimat/i;
export default handler;
const buttons = [
  ["Hint", "/hlen"],
  ["Nyerah", "menyerah"]
];