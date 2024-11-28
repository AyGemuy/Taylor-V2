import fetch from "node-fetch";
let timeout = 12e4,
  poin = (Math.random() * 5001 + 5e3) | 0;
const handler = async (m, { conn, text, command, usedPrefix }) => {
  let imgr = flaaa.getRandom();
  db.data.game.quizz = db.data.game.quizz ? db.data.game.quizz : {};
  let id = m.chat;
  if (!text)
    return m.reply(
      `Please use this command like this: ${usedPrefix}quizz easy/medium/hard`,
    );
  if (id in db.data.game.quizz)
    return (
      await conn.reply(
        m.chat,
        "Masih ada soal belum terjawab di chat ini",
        db.data.game.quizz[id][0],
      ),
      !1
    );
  let json = await quizApi(text),
    caption = `*\`🕹️ GAME - ${command.toUpperCase()}\`*

*Soal:*
- ${json[0]?.soal}
*Clue:*
- ${"```" + json[0]?.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```"}

*Hadiah:* ${poin} XP  
*Waktu:* ${(timeout / 1e3).toFixed(2)} detik

Balas pesan ini untuk menjawab!`;
  db.data.game.quizz[id] = [
    await conn.reply(m.chat, caption, m, {
      contextInfo: {
        mentionedJid: [m.sender],
      },
    }),
    json,
    poin,
    setTimeout(async () => {
      db.data.game.quizz[id] &&
        (await conn.reply(
          m.chat,
          `*\`❌ TIMEOUT - ${command.toUpperCase()}\`*
Jawabannya adalah *${json[0]?.jawaban}*`,
          db.data.game.quizz[id][0],
        )),
        delete db.data.game.quizz[id];
    }, timeout),
  ];
};
(handler.help = ["quizz"]),
  (handler.tags = ["game"]),
  (handler.command = /^quizz/i);
export default handler;
const buttons = [
  ["Hint", "/quizzh"],
  ["Nyerah", "menyerah"],
];
async function quizApi(difficulty) {
  const response = await fetch(
    "https://quizapi.io/api/v1/questions?apiKey=MrSORkLFSsJabARtQhyloo7574YX2dquEAchMn8x&difficulty=" +
      difficulty +
      "&limit=1",
  );
  return (await response.json()).map(
    ({ question, answers, correct_answers }) => ({
      soal: question,
      hint: Object.values(answers).filter((value) => null !== value),
      jawaban: Object.entries(correct_answers).reduce(
        (acc, [key, value]) =>
          "true" === value ? answers[key.replace("_correct", "")] : acc,
        null,
      ),
    }),
  );
}
