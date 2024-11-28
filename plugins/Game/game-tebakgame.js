import fetch from "node-fetch";
let timeout = 12e4,
  poin = (Math.random() * 5001 + 5e3) | 0;
const handler = async (m, { conn, command, usedPrefix }) => {
  flaaa.getRandom();
  db.data.game.tebakgame = db.data.game.tebakgame ? db.data.game.tebakgame : {};
  let id = m.chat;
  if (id in db.data.game.tebakgame)
    return (
      await conn.reply(
        m.chat,
        "Masih ada soal belum terjawab di chat ini",
        db.data.game.tebakgame[id][0],
      ),
      !1
    );
  let src = await (
      await fetch(
        "https://raw.githubusercontent.com/qisyana/scrape/main/tebakgame.json",
      )
    ).json(),
    json = src[Math.floor(Math.random() * src.length)],
    caption = `*\`🕹️ GAME - ${command.toUpperCase()}\`*

*Soal:*
- Apakah nama logo ini.
*Clue:*
- ${"```" + json.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```"}

*Hadiah:* ${poin} XP  
*Waktu:* ${(timeout / 1e3).toFixed(2)} detik

Balas pesan ini untuk menjawab!`;
  db.data.game.tebakgame[id] = [
    await conn.reply(m.chat, caption, m, {
      contextInfo: {
        mentionedJid: [m.sender],
      },
    }),
    json,
    poin,
    setTimeout(async () => {
      db.data.game.tebakgame[id] &&
        (await conn.reply(
          m.chat,
          `*\`❌ TIMEOUT - ${command.toUpperCase()}\`*
Jawabannya adalah *${json.jawaban}*`,
          db.data.game.tebakgame[id][0],
        )),
        delete db.data.game.tebakgame[id];
    }, timeout),
  ];
};
(handler.help = ["tebakgame"]),
  (handler.tags = ["game"]),
  (handler.command = /^tebakgame/i);
export default handler;
const buttons = [
  ["Hint", "/hgame"],
  ["Nyerah", "menyerah"],
];
