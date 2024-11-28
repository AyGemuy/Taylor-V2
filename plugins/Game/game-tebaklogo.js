import fetch from "node-fetch";
let timeout = 12e4,
  poin = (Math.random() * 5001 + 5e3) | 0;
const handler = async (m, { conn, command, usedPrefix }) => {
  db.data.game.tebaklogo = db.data.game.tebaklogo ? db.data.game.tebaklogo : {};
  let id = m.chat;
  if (id in db.data.game.tebaklogo)
    return (
      await conn.reply(
        m.chat,
        "Masih ada soal belum terjawab di chat ini",
        db.data.game.tebaklogo[id][0],
      ),
      !1
    );
  let res = await fetch(
      "https://raw.githubusercontent.com/orderku/db/main/dbbot/game/tebakapp.json",
    ),
    src = await res.json(),
    json = {
      hasil: src[Math.floor(Math.random() * src.length)],
    },
    caption = `*\`🕹️ GAME - ${command.toUpperCase()}\`*

*Soal:*
- Sebutkan nama logo ini.
*Clue:*
- ${"```" + json.hasil.data.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```"}

*Hadiah:* ${poin} XP  
*Waktu:* ${(timeout / 1e3).toFixed(2)} detik

Balas pesan ini untuk menjawab!`;
  db.data.game.tebaklogo[id] = [
    await conn.reply(m.chat, caption, m, {
      contextInfo: {
        mentionedJid: [m.sender],
      },
    }),
    json,
    poin,
    setTimeout(async () => {
      db.data.game.tebaklogo[id] &&
        (await conn.reply(
          m.chat,
          `*\`❌ TIMEOUT - ${command.toUpperCase()}\`*
Jawabannya adalah *${json.hasil.data.jawaban}*`,
          db.data.game.tebaklogo[id][0],
        )),
        delete db.data.game.tebaklogo[id];
    }, timeout),
  ];
};
(handler.help = ["tebaklogo"]),
  (handler.tags = ["game"]),
  (handler.command = /^tebaklogo/i);
export default handler;
const buttons = [
  ["Hint", "/hlog"],
  ["Nyerah", "menyerah"],
];
