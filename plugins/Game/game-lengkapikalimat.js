import fetch from "node-fetch";
let timeout = 12e4,
  poin = (Math.random() * 5001 + 5e3) | 0;
const handler = async (m, { conn, command, usedPrefix }) => {
  let imgr = flaaa.getRandom();
  db.data.game.lengkapikalimat = db.data.game.lengkapikalimat
    ? db.data.game.lengkapikalimat
    : {};
  let id = m.chat;
  if (id in db.data.game.lengkapikalimat)
    return (
      await conn.reply(
        m.chat,
        "Masih ada soal belum terjawab di chat ini",
        db.data.game.lengkapikalimat[id][0],
      ),
      !1
    );
  let src = await (
      await fetch(
        "https://raw.githubusercontent.com/qisyana/scrape/main/lengkapikalimat.json",
      )
    ).json(),
    json = src[Math.floor(Math.random() * src.length)],
    caption = `*\`🕹️ GAME - ${command.toUpperCase()}\`*

*Soal:*
- ${json.pertanyaan}
*Clue:*
- ${"```" + json.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```"}

*Hadiah:* ${poin} XP  
*Waktu:* ${(timeout / 1e3).toFixed(2)} detik

Balas pesan ini untuk menjawab!`;
  db.data.game.lengkapikalimat[id] = [
    await conn.sendFile(m.chat, imgr + command, "", caption, m),
    json,
    poin,
    setTimeout(async () => {
      db.data.game.lengkapikalimat[id] &&
        (await conn.reply(
          m.chat,
          `*\`❌ TIMEOUT - ${command.toUpperCase()}\`*
Jawabannya adalah *${json.jawaban}*`,
          db.data.game.lengkapikalimat[id][0],
        )),
        delete db.data.game.lengkapikalimat[id];
    }, timeout),
  ];
};
(handler.help = ["lengkapikalimat"]),
  (handler.tags = ["game"]),
  (handler.command = /^lengkapikalimat/i);
export default handler;
const buttons = [
  ["Hint", "/hlen"],
  ["Nyerah", "menyerah"],
];
