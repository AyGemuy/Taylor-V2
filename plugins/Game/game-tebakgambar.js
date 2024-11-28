import fetch from "node-fetch";
let timeout = 12e4,
  poin = (Math.random() * 5001 + 5e3) | 0;
const handler = async (m, { conn, command, usedPrefix }) => {
  db.data.game.tebakingambar = db.data.game.tebakingambar
    ? db.data.game.tebakingambar
    : {};
  let id = m.chat;
  if (id in db.data.game.tebakingambar)
    return (
      await conn.reply(
        m.chat,
        "Masih ada soal belum terjawab di chat ini",
        db.data.game.tebakingambar[id][0],
      ),
      !1
    );
  let json = await tebakgambar(),
    caption = `*\`🕹️ GAME - ${command.toUpperCase()}\`*

*Soal:*
- Rangkailah gambar ini menjadi satu kalimat.
*Clue:*
- ${"```" + json.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```"}

*Hadiah:* ${poin} XP  
*Waktu:* ${(timeout / 1e3).toFixed(2)} detik

Balas pesan ini untuk menjawab!`,
    imgurl = json.img;
  db.data.game.tebakingambar[id] = [
    await conn.sendFile(m.chat, imgurl, "", caption, m),
    json,
    poin,
    setTimeout(async () => {
      db.data.game.tebakingambar[id] &&
        (await conn.reply(
          m.chat,
          `*\`❌ TIMEOUT - ${command.toUpperCase()}\`*
Jawabannya adalah *${json.jawaban}*`,
          db.data.game.tebakingambar[id][0],
        )),
        delete db.data.game.tebakingambar[id];
    }, timeout),
  ];
};
(handler.help = ["tebakgambar"]),
  (handler.tags = ["game"]),
  (handler.command = /^tebakgambar/i);
export default handler;
const buttons = [
  ["Hint", "/hgam"],
  ["Nyerah", "menyerah"],
];
let tebakgambarjson;
async function tebakgambar() {
  if (!tebakgambarjson) {
    const response = await fetch(
      "https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json",
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch tebakgambar data: ${response.statusText}`,
      );
    }
    tebakgambarjson = await response.json();
  }
  const randomIndex = Math.floor(Math.random() * tebakgambarjson.length);
  return tebakgambarjson[randomIndex];
}
