import fetch from "node-fetch";
let timeout = 12e4,
  poin = (Math.random() * 5001 + 5e3) | 0;
const handler = async (m, { conn, command, usedPrefix }) => {
  db.data.game.tebakjkt48 = db.data.game.tebakjkt48
    ? db.data.game.tebakjkt48
    : {};
  let id = m.chat;
  if (id in db.data.game.tebakjkt48)
    return (
      await conn.reply(
        m.chat,
        "Masih ada soal belum terjawab di chat ini",
        db.data.game.tebakjkt48[id][0],
      ),
      !1
    );
  let src = await (
      await fetch("https://api.crstlnz.my.id/api/member?group=jkt48")
    ).json(),
    randoms = src[Math.floor(Math.random() * src.length)],
    json = {
      url: randoms.img,
      name: randoms.name,
    },
    caption = `*\`🕹️ GAME - ${command.toUpperCase()}\`*

*Soal:*
- Siapakah nama member JKT ini.
*Clue:*
- ${"```" + json.name.replace(/[AIUEOaiueo]/gi, "_") + "```"}

*Hadiah:* ${poin} XP  
*Waktu:* ${(timeout / 1e3).toFixed(2)} detik

Balas pesan ini untuk menjawab!`;
  db.data.game.tebakjkt48[id] = [
    await conn.sendFile(m.chat, json.url, "", caption, m),
    json,
    poin,
    setTimeout(async () => {
      db.data.game.tebakjkt48[id] &&
        (await conn.reply(
          m.chat,
          `*\`❌ TIMEOUT - ${command.toUpperCase()}\`*
Jawabannya adalah *${json.name}*`,
          db.data.game.tebakjkt48[id][0],
        )),
        delete db.data.game.tebakjkt48[id];
    }, timeout),
  ];
};
(handler.help = ["tebakjkt48"]),
  (handler.tags = ["game"]),
  (handler.command = /^tebakjkt48/i);
export default handler;
const buttons = [
  ["Hint", "/hjkt"],
  ["Nyerah", "menyerah"],
];
