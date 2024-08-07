import fetch from "node-fetch";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  text,
  command,
  usedPrefix
}) => {
  let imgr = flaaa.getRandom();
  conn.question = conn.question ? conn.question : {};
  let id = m.chat;
  if (!text) return m.reply(`Please use this command like this: ${usedPrefix}question easy/medium/hard`);
  if (id in conn.question) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.question[id][0]), !1;
  let json = await (await fetch("https://opentdb.com/api.php?amount=1&difficulty=" + text + "&type=multiple")).json(),
    caption = `            *『  Question Answers  』*\n\n🎀  *Category:* ${json.results[0]?.category}\n❄  *Difficulty:* ${json.results[0]?.difficulty}\n\n📒  *Question:* ${json.results[0]?.question}\n  \nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hasa untuk bantuan\nBonus: ${poin} XP\n    `.trim();
  conn.question[id] = [await conn.sendFile(m.chat, imgr + command, "", caption, m), json, poin, setTimeout(async () => {
    conn.question[id] && await conn.reply(m.chat, `Waktu habis!\\n\n🎋  *Answer:* ${json.results[0]?.correct_answer}\n\n`, conn.question[id][0]),
      delete conn.question[id];
  }, timeout)];
};
handler.help = ["question"], handler.tags = ["game"], handler.command = /^question$/i;
export default handler;
const buttons = [
  ["Hint", "/hasa"],
  ["Nyerah", "menyerah"]
];