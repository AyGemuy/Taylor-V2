import { readFileSync } from "fs";
let timeout = 12e4;
let poin = (Math.random() * 5001 + 5e3) | 0;
const handler = async (m, { conn, command }) => {
  let imgr = flaaa.getRandom();
  db.data.game.sambungkata = db.data.game.sambungkata || {};
  let id = m.chat;
  if (id in db.data.game.sambungkata) {
    return (
      await conn.reply(
        m.chat,
        "Masih ada soal belum terjawab di chat ini",
        db.data.game.sambungkata[id][0],
      ),
      !1
    );
  }
  let database = JSON.parse(readFileSync("./json/game/kata.json"));
  let huruf = "abcdefghijklmnpqrstuw"[Math.floor(Math.random() * 20)];
  let res = database.filter((v) => v.startsWith(huruf));
  let kata = res[Math.floor(Math.random() * res.length)];
  let caption = `*\`🕹️ GAME - ${command.toUpperCase()}\`*

*Mulai dari huruf:*
- ${kata.slice(-1).toUpperCase()}...?
*Clue:*
- ${"```" + kata.replace(/[AIUEOaiueo]/gi, "_") + "```"}

*Hadiah:* ${poin} XP  
*Waktu:* ${(timeout / 1e3).toFixed(2)} detik

Balas pesan ini untuk menjawab!`;
  db.data.game.sambungkata[id] = [
    await conn.reply(m.chat, caption, m, {
      contextInfo: {
        mentionedJid: [m.sender],
      },
    }),
    kata.toLowerCase(),
    poin,
    setTimeout(async () => {
      if (db.data.game.sambungkata[id]) {
        await conn.reply(
          m.chat,
          `*\`❌ TIMEOUT - ${command.toUpperCase()}\`*\nJawabannya adalah *${kata}*`,
          db.data.game.sambungkata[id][0],
        );
        delete db.data.game.sambungkata[id];
      }
    }, timeout),
  ];
};
handler.help = ["sambungkata"];
handler.tags = ["game"];
handler.command = /^s(ambung)?kata$/i;
export default handler;
