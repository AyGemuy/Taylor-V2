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
  conn.quizz = conn.quizz ? conn.quizz : {};
  let id = m.chat;
  if (!text) return m.reply(`Please use this command like this: ${usedPrefix}quizz easy/medium/hard`);
  if (id in conn.quizz) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.quizz[id][0]), !1;
  let json = await quizApi(text),
    caption = `            *『  quizz Answers  』*\n\n📒  *quizz:* ${json[0]?.soal}\n  \nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}quizzh untuk bantuan\nBonus: ${poin} XP\n    `.trim();
  conn.quizz[id] = [await conn.sendFile(m.chat, imgr + command, "", caption, m), json, poin, setTimeout(async () => {
    conn.quizz[id] && await conn.reply(m.chat, `Waktu habis!\\n\n🎋  *Answer:* ${json[0]?.jawaban}\n\n`, conn.quizz[id][0]),
      delete conn.quizz[id];
  }, timeout)];
};
handler.help = ["quizz"], handler.tags = ["game"], handler.command = /^quizz/i;
export default handler;
const buttons = [
  ["Hint", "/quizzh"],
  ["Nyerah", "menyerah"]
];
async function quizApi(difficulty) {
  const response = await fetch("https://quizapi.io/api/v1/questions?apiKey=MrSORkLFSsJabARtQhyloo7574YX2dquEAchMn8x&difficulty=" + difficulty + "&limit=1");
  return (await response.json()).map(({
    question,
    answers,
    correct_answers
  }) => ({
    soal: question,
    hint: Object.values(answers).filter(value => null !== value),
    jawaban: Object.entries(correct_answers).reduce((acc, [key, value]) => "true" === value ? answers[key.replace("_correct", "")] : acc, null)
  }));
}