import cheerio from "cheerio";
import fetch from "node-fetch";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  conn.tebakkabupaten = conn.tebakkabupaten ? conn.tebakkabupaten : {};
  let id = m.chat;
  if (id in conn.tebakkabupaten) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.tebakkabupaten[id][0]), !1;
  let json = await getRandomKabupaten(),
    caption = `*${command.toUpperCase()}*\nKabupaten apakah ini?\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hkab untuk bantuan\nBonus: ${poin} XP\n    `.trim();
  conn.tebakkabupaten[id] = [await conn.sendFile(m.chat, json.url, "", caption, m), json, poin, setTimeout(async () => {
    conn.tebakkabupaten[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.title}*`, conn.tebakkabupaten[id][0]),
      delete conn.tebakkabupaten[id];
  }, timeout)];
};
handler.help = ["tebakkabupaten"], handler.tags = ["game"], handler.command = /^tebakkabupaten/i;
export default handler;
const buttons = [
    ["Hint", "/hkab"],
    ["Nyerah", "menyerah"]
  ],
  baseUrl = "https://id.m.wikipedia.org";
async function getRandomKabupaten() {
  try {
    const response = await fetch(baseUrl + "/wiki/Daftar_kabupaten_di_Indonesia"),
      html = await response.text(),
      $ = cheerio.load(html),
      kabupatenList = $('td a[href^="/wiki/Kabupaten"]').map((index, element) => ({
        link: baseUrl + $(element).attr("href"),
        name: $(element).attr("title")
      })).get().filter(item => item.link && item.name);
    if (0 === kabupatenList.length) return null;
    const randomKabupaten = kabupatenList[Math.floor(Math.random() * kabupatenList.length)],
      imageUrl = await fetchImageUrl(randomKabupaten.link),
      judulBaru = randomKabupaten.name.replace("Kabupaten ", ""),
      ukuranBaru = imageUrl.replace(/\/\d+px-/, "/1080px-");
    return {
      link: randomKabupaten.link,
      title: judulBaru,
      url: ukuranBaru
    };
  } catch (error) {
    return console.error(error), null;
  }
}
async function fetchImageUrl(url) {
  try {
    const response = await fetch(url),
      html = await response.text();
    return "https:" + cheerio.load(html)("tr.mergedtoprow td.infobox-full-data.maptable div.ib-settlement-cols-row div.ib-settlement-cols-cell a.mw-file-description img.mw-file-element").attr("src") || null;
  } catch (error) {
    return null;
  }
}