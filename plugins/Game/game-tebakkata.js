import fetch from "node-fetch";
let timeout = 12e4,
  poin = (Math.random() * 5001 + 5e3) | 0;
const handler = async (m, { conn, command, usedPrefix }) => {
  let imgr = flaaa.getRandom();
  db.data.game.tebakkata = db.data.game.tebakkata ? db.data.game.tebakkata : {};
  let id = m.chat;
  if (id in db.data.game.tebakkata)
    return (
      await conn.reply(
        m.chat,
        "Masih ada soal belum terjawab di chat ini",
        db.data.game.tebakkata[id][0],
      ),
      !1
    );
  const json = await tebakkata();
  let caption = `*\`🕹️ GAME - ${command.toUpperCase()}\`*

*Soal:*
- ${json.soal}
*Clue:*
- ${"```" + json.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```"}

*Hadiah:* ${poin} XP  
*Waktu:* ${(timeout / 1e3).toFixed(2)} detik

Balas pesan ini untuk menjawab!`;
  db.data.game.tebakkata[id] = [
    await conn.reply(m.chat, caption, m, {
      contextInfo: {
        mentionedJid: [m.sender],
      },
    }),
    json,
    poin,
    setTimeout(async () => {
      db.data.game.tebakkata[id] &&
        (await conn.reply(
          m.chat,
          `*\`❌ TIMEOUT - ${command.toUpperCase()}\`*
Jawabannya adalah *${json.jawaban}*`,
          db.data.game.tebakkata[id][0],
        )),
        delete db.data.game.tebakkata[id];
    }, timeout),
  ];
};
(handler.help = ["tebakkata"]),
  (handler.tags = ["game"]),
  (handler.command = /^tebakkata/i);
export default handler;
const buttons = [
  ["Hint", "/hkat"],
  ["Nyerah", "menyerah"],
];
let tebakkatajson;
async function tebakkata() {
  if (!tebakkatajson) {
    const response = await fetch(
      "https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json",
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch tebakkata data: ${response.statusText}`);
    }
    tebakkatajson = await response.json();
  }
  const randomIndex = Math.floor(Math.random() * tebakkatajson.length);
  return tebakkatajson[randomIndex];
}
