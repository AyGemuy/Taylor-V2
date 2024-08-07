import fetch from "node-fetch";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  args,
  command,
  usedPrefix
}) => {
  let imgr = flaaa.getRandom();
  conn.trivias = conn.trivias ? conn.trivias : {};
  let id = m.chat;
  if (id in conn.trivias) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.trivias[id][0]), !1;
  let res = ["easy", "medium", "hard"],
    listSections = [];
  if (Object.keys(res).map((v, index) => {
      listSections.push(["[ " + res[v].toUpperCase() + " ]", [
        ["                 Select...", usedPrefix + command + " " + res[v], ""]
      ]]);
    }), !args[0]) return conn.sendList(m.chat, htki + " 📺 L E V E L 🔎 " + htka, "⚡ Silakan pilih difficulty di tombol di bawah...", author, "☂️ P I L I H ☂️", listSections, m);
  if (!args[0]?.match(/(medium|easy|hard)/i)) return m.reply("Tersedia:\n" + res.map(v => v).join("\n"));
  let json = (await (await fetch("https://cooler-api.ay-gemuy.repl.co/game/trivia?amount=1&difficulty=" + args[0] + "&type=multiple")).json()).questions[0],
    jawaban = await Tr(json.correctAnswer),
    soal = await Tr(json.value),
    caption = `*${command.toUpperCase()}*\n${soal}\n\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}htri untuk bantuan\nBonus: ${poin} XP\n    `.trim();
  conn.trivias[id] = [await conn.sendFile(m.chat, imgr + command, "", caption, m), json, poin, setTimeout(async () => {
    conn.trivias[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${jawaban}*`, conn.trivias[id][0]),
      delete conn.trivias[id];
  }, timeout)];
};
handler.help = ["trivia"], handler.tags = ["game"], handler.command = /^trivia/i;
export default handler;
const buttons = [
  ["Hint", "/htri"],
  ["Nyerah", "menyerah"]
];
async function Tr(teks) {
  let reis = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=id&dt=t&q=" + teks);
  return (await reis.json())[0][0][0];
}