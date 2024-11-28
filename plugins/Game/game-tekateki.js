import fetch from "node-fetch";
let timeout = 12e4,
  poin = (Math.random() * 5001 + 5e3) | 0;
const handler = async (m, { conn, command, usedPrefix }) => {
  let imgr = flaaa.getRandom();
  db.data.game.tekateki = db.data.game.tekateki ? db.data.game.tekateki : {};
  let id = m.chat;
  if (id in db.data.game.tekateki)
    return (
      await conn.reply(
        m.chat,
        "Masih ada soal belum terjawab di chat ini",
        db.data.game.tekateki[id][0],
      ),
      !1
    );
  let src = await (
      await fetch(
        "https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json",
      )
    ).json(),
    json = src[Math.floor(Math.random() * src.length)],
    caption = `*\`🕹️ GAME - ${command.toUpperCase()}\`*

*Soal:*
- ${json.soal}
*Clue:*
- ${"```" + json.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```"}

*Hadiah:* ${poin} XP  
*Waktu:* ${(timeout / 1e3).toFixed(2)} detik

Balas pesan ini untuk menjawab!`;
  db.data.game.tekateki[id] = [
    await conn.reply(m.chat, caption, m, {
      contextInfo: {
        mentionedJid: [m.sender],
      },
    }),
    json,
    poin,
    setTimeout(async () => {
      db.data.game.tekateki[id] &&
        (await conn.reply(
          m.chat,
          `*\`❌ TIMEOUT - ${command.toUpperCase()}\`*
Jawabannya adalah *${json.jawaban}*`,
          db.data.game.tekateki[id][0],
        )),
        delete db.data.game.tekateki[id];
    }, timeout),
  ];
};
(handler.help = ["tekateki"]),
  (handler.tags = ["game"]),
  (handler.command = /^tekateki/i);
export default handler;
const buttons = [
  ["Hint", "/htek"],
  ["Nyerah", "menyerahtek"],
];
