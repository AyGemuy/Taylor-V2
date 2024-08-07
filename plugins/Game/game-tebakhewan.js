import fetch from "node-fetch";
import cheerio from "cheerio";
import path from "path";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  conn.tebakhewan = conn.tebakhewan ? conn.tebakhewan : {};
  let id = m.chat;
  if (id in conn.tebakhewan) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.tebakhewan[id][0]), !1;
  let src = await tebakHewan(),
    json = src[Math.floor(Math.random() * src.length)],
    caption = `*${command.toUpperCase()}*\nhewan apakah ini?\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hhew untuk bantuan\nBonus: ${poin} XP\n    `.trim();
  conn.tebakhewan[id] = [await conn.sendFile(m.chat, json.url, "", caption, m), json, poin, setTimeout(async () => {
    conn.tebakhewan[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.title}*`, conn.tebakhewan[id][0]),
      delete conn.tebakhewan[id];
  }, timeout)];
};
handler.help = ["tebakhewan"], handler.tags = ["game"], handler.command = /^tebakhewan/i;
export default handler;
const buttons = [
  ["Hint", "/hhew"],
  ["Nyerah", "menyerah"]
];
async function tebakHewan() {
  const url = `https://rimbakita.com/daftar-nama-hewan-lengkap/${Math.floor(20 * Math.random()) + 1}/`;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $("div.entry-content.entry-content-single img[class*=wp-image-][data-src]").map((_, element) => {
      const src = $(element).attr("data-src"),
        alt = path.basename(src, path.extname(src)).replace(/-/g, " ");
      return {
        title: alt.charAt(0).toUpperCase() + alt.slice(1),
        url: src
      };
    }).get();
  } catch (error) {
    return console.error("Error:", error), [];
  }
}