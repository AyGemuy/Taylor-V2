import fetch from "node-fetch";
import { cleanHtml } from "../../lib/other-function.js";
let timeout = 12e4,
  poin = (Math.random() * 5001 + 5e3) | 0;
const handler = async (m, { conn, text, command, usedPrefix }) => {
  let imgr = flaaa.getRandom();
  db.data.game.question = db.data.game.question ? db.data.game.question : {};
  let id = m.chat;
  if (!text)
    return m.reply(
      `Please use this command like this: ${usedPrefix}question easy/medium/hard`,
    );
  if (id in db.data.game.question)
    return (
      await conn.reply(
        m.chat,
        "Masih ada soal belum terjawab di chat ini",
        db.data.game.question[id][0],
      ),
      !1
    );
  let data = await (
      await fetch(
        "https://opentdb.com/api.php?amount=1&difficulty=" +
          text +
          "&type=multiple",
      )
    ).json(),
    json = {
      results: [
        {
          question: cleanHtml(data.results[0]?.question),
          category: cleanHtml(data.results[0]?.category),
          difficulty: cleanHtml(data.results[0]?.difficulty),
          correct_answer: cleanHtml(data.results[0]?.correct_answer),
        },
      ],
    },
    caption = `*\`🕹️ GAME - ${command.toUpperCase()}\`*

*Question:*
- ${json.results[0]?.question}
*Category:*
- ${json.results[0]?.category}
*Difficulty:*
- ${json.results[0]?.difficulty}
*Clue:*
- ${"```" + json.results[0]?.correct_answer.replace(/[AIUEOaiueo]/gi, "_") + "```"}

*Hadiah:* ${poin} XP  
*Waktu:* ${(timeout / 1e3).toFixed(2)} detik

Balas pesan ini untuk menjawab!`;
  db.data.game.question[id] = [
    await conn.reply(m.chat, caption, m, {
      contextInfo: {
        mentionedJid: [m.sender],
      },
    }),
    json,
    poin,
    setTimeout(async () => {
      db.data.game.question[id] &&
        (await conn.reply(
          m.chat,
          `*\`❌ TIMEOUT - ${command.toUpperCase()}\`*
Jawabannya adalah *${json.results[0]?.correct_answer}*`,
          db.data.game.question[id][0],
        )),
        delete db.data.game.question[id];
    }, timeout),
  ];
};
(handler.help = ["question"]),
  (handler.tags = ["game"]),
  (handler.command = /^question$/i);
export default handler;
const buttons = [
  ["Hint", "/hasa"],
  ["Nyerah", "menyerah"],
];
