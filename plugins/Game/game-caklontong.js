import fetch from "node-fetch";
let timeout = 12e4,
  poin = (Math.random() * 5001 + 5e3) | 0;
const handler = async (m, { conn, command, usedPrefix }) => {
  let imgr = flaaa.getRandom();
  db.data.game.caklontong = db.data.game.caklontong
    ? db.data.game.caklontong
    : {};
  let id = m.chat;
  if (id in db.data.game.caklontong)
    return (
      await conn.reply(
        m.chat,
        "Masih ada soal belum terjawab di chat ini",
        db.data.game.caklontong[id][0],
      ),
      !1
    );
  const json = await caklontong();
  let caption = `*\`🕹️ GAME - ${command.toUpperCase()}\`*

*Soal:*
- ${json.soal}
*Clue:*
- ${"```" + json.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```"}

*Hadiah:* ${poin} XP  
*Waktu:* ${(timeout / 1e3).toFixed(2)} detik

Balas pesan ini untuk menjawab!`;
  db.data.game.caklontong[id] = [
    await conn.reply(m.chat, caption, m, {
      contextInfo: {
        mentionedJid: [m.sender],
      },
    }),
    json,
    poin,
    setTimeout(async () => {
      db.data.game.caklontong[id] &&
        (await conn.reply(
          m.chat,
          `*\`❌ TIMEOUT - ${command.toUpperCase()}\`*
Jawabannya adalah *${json.jawaban}*`,
          db.data.game.caklontong[id][0],
        )),
        delete db.data.game.caklontong[id];
    }, timeout),
  ];
};
(handler.help = ["caklontong"]),
  (handler.tags = ["game"]),
  (handler.command = /^caklontong/i);
export default handler;
const buttons = [
  ["Hint", "/hcak"],
  ["Nyerah", "menyerah"],
];
let caklontongjson;
async function caklontong() {
  if (!caklontongjson) {
    const response = await fetch(
      "https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json",
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch caklontong data: ${response.statusText}`,
      );
    }
    caklontongjson = await response.json();
  }
  const randomIndex = Math.floor(Math.random() * caklontongjson.length);
  return caklontongjson[randomIndex];
}
