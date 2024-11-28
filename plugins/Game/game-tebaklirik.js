import fetch from "node-fetch";
let timeout = 12e4,
  poin = (Math.random() * 5001 + 5e3) | 0;
const handler = async (m, { conn, command, usedPrefix }) => {
  let imgr = flaaa.getRandom();
  db.data.game.tebaklirik = db.data.game.tebaklirik
    ? db.data.game.tebaklirik
    : {};
  let id = m.chat;
  if (id in db.data.game.tebaklirik)
    return (
      await conn.reply(
        m.chat,
        "Masih ada soal belum terjawab di chat ini",
        db.data.game.tebaklirik[id][0],
      ),
      !1
    );
  let res = await fetch(
    "https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaklirik.json",
  );
  if (!res.ok) return await `${res.status} ${res.statusText}`;
  let data = await res.json(),
    json = data[Math.floor(Math.random() * data.length)],
    caption = `*\`🕹️ GAME - ${command.toUpperCase()}\`*

*Soal:*
- ${json.soal}
*Clue:*
- ${"```" + json.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```"}

*Hadiah:* ${poin} XP  
*Waktu:* ${(timeout / 1e3).toFixed(2)} detik

Balas pesan ini untuk menjawab!`;
  db.data.game.tebaklirik[id] = [
    await conn.reply(m.chat, caption, m, {
      contextInfo: {
        mentionedJid: [m.sender],
      },
    }),
    json,
    poin,
    setTimeout(async () => {
      db.data.game.tebaklirik[id] &&
        (await conn.reply(
          m.chat,
          `*\`❌ TIMEOUT - ${command.toUpperCase()}\`*
Jawabannya adalah *${json.jawaban}*`,
          db.data.game.tebaklirik[id][0],
        )),
        delete db.data.game.tebaklirik[id];
    }, timeout),
  ];
};
(handler.help = ["tebaklirik"]),
  (handler.tags = ["game"]),
  (handler.command = /^tebaklirik/i);
export default handler;
const buttons = [
  ["Hint", "/hlir"],
  ["Nyerah", "menyerah"],
];
