import fetch from "node-fetch";
let timeout = 12e4,
  poin = (Math.random() * 5001 + 5e3) | 0;
const handler = async (m, { conn, command, usedPrefix }) => {
  db.data.game.tebakbendera = db.data.game.tebakbendera
    ? db.data.game.tebakbendera
    : {};
  let json,
    id = m.chat;
  if (id in db.data.game.tebakbendera)
    return (
      await conn.reply(
        m.chat,
        "Masih ada soal belum terjawab di chat ini",
        db.data.game.tebakbendera[id][0],
      ),
      !1
    );
  try {
    let data = await (await fetch("https://flagcdn.com/en/codes.json")).json();
    const randomKey =
      Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)];
    json = {
      name: data[randomKey],
      img: `https://flagpedia.net/data/flags/ultra/${randomKey}.png`,
    };
  } catch (e) {
    try {
      let src = await (
        await fetch(
          "https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera2.json",
        )
      ).json();
      json = src[Math.floor(Math.random() * src.length)];
    } catch (e) {
      throw !1;
    }
  }
  let caption = `*\`🕹️ GAME - ${command.toUpperCase()}\`*

*Soal:*
- Bendera dari negara manakah ini?
*Clue:*
- ${"```" + json.name.replace(/[AIUEOaiueo]/gi, "_") + "```"}

*Hadiah:* ${poin} XP  
*Waktu:* ${(timeout / 1e3).toFixed(2)} detik

Balas pesan ini untuk menjawab!`;
  conn.logger.info(json.name),
    (db.data.game.tebakbendera[id] = [
      await conn.reply(m.chat, caption, m, {
        contextInfo: {
          mentionedJid: [m.sender],
        },
      }),
      json,
      poin,
      setTimeout(async () => {
        db.data.game.tebakbendera[id] &&
          (await conn.reply(
            m.chat,
            `*\`❌ TIMEOUT - ${command.toUpperCase()}\`*
Jawabannya adalah *${json.name}*`,
            db.data.game.tebakbendera[id][0],
          )),
          delete db.data.game.tebakbendera[id];
      }, timeout),
    ]);
};
(handler.help = ["tebakbendera"]),
  (handler.tags = ["game"]),
  (handler.command = /^tebakbendera/i);
export default handler;
const buttons = [
  ["Hint", "/hben"],
  ["Nyerah", "menyerah"],
];
