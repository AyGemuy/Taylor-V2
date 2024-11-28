import fetch from "node-fetch";
import * as cheerio from "cheerio";
import path from "path";
let timeout = 12e4,
  poin = (Math.random() * 5001 + 5e3) | 0;
const handler = async (m, { conn, command, usedPrefix }) => {
  db.data.game.tebakhewan = db.data.game.tebakhewan
    ? db.data.game.tebakhewan
    : {};
  let id = m.chat;
  if (id in db.data.game.tebakhewan)
    return (
      await conn.reply(
        m.chat,
        "Masih ada soal belum terjawab di chat ini",
        db.data.game.tebakhewan[id][0],
      ),
      !1
    );
  let src = await tebakHewan(),
    json = src[Math.floor(Math.random() * src.length)],
    caption = `*\`🕹️ GAME - ${command.toUpperCase()}\`*

*Soal:*
- Apakah nama hewan ini.
*Clue:*
- ${"```" + json.title.replace(/[AIUEOaiueo]/gi, "_") + "```"}

*Hadiah:* ${poin} XP  
*Waktu:* ${(timeout / 1e3).toFixed(2)} detik

Balas pesan ini untuk menjawab!`;
  db.data.game.tebakhewan[id] = [
    await conn.sendFile(m.chat, json.url, "", caption, m),
    json,
    poin,
    setTimeout(async () => {
      db.data.game.tebakhewan[id] &&
        (await conn.reply(
          m.chat,
          `*\`❌ TIMEOUT - ${command.toUpperCase()}\`*
Jawabannya adalah *${json.title}*`,
          db.data.game.tebakhewan[id][0],
        )),
        delete db.data.game.tebakhewan[id];
    }, timeout),
  ];
};
(handler.help = ["tebakhewan"]),
  (handler.tags = ["game"]),
  (handler.command = /^tebakhewan/i);
export default handler;
const buttons = [
  ["Hint", "/hhew"],
  ["Nyerah", "menyerah"],
];
async function tebakHewan() {
  const url = `https://rimbakita.com/daftar-nama-hewan-lengkap/${Math.floor(20 * Math.random()) + 1}/`;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $(
      "div.entry-content.entry-content-single img[class*=wp-image-][data-src]",
    )
      .map((_, element) => {
        const src = $(element).attr("data-src"),
          alt = path.basename(src, path.extname(src)).replace(/-/g, " ");
        return {
          title: alt.charAt(0).toUpperCase() + alt.slice(1),
          url: src,
        };
      })
      .get();
  } catch (error) {
    return console.error("Error:", error), [];
  }
}
