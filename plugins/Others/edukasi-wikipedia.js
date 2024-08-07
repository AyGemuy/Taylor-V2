import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  text,
  usedPrefix,
  command
}) => {
  if (!text) throw `Contoh penggunaan ${usedPrefix + command} Golang`;
  m.react(wait);
  try {
    let item = await Wikipedia(text),
      caption = `🔍 *[ RESULT ]*\n📰 *Title:* ${item.title || "Tidak diketahui"}\n📝 *Content:* ${item.content || "Tidak diketahui"}\n🗂️ *Information:* ${item.infoTable || "Tidak diketahui"}\n`;
    await conn.sendFile(m.chat, item.image, "", caption, m);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["wikipedia"].map(v => v + " <apa>"), handler.tags = ["edukasi"],
  handler.command = /^(wiki|wikipedia)$/i;
export default handler;
async function Wikipedia(query) {
  const response = await fetch(`https://id.m.wikipedia.org/w/index.php?search=${query}`),
    html = await response.text(),
    $ = cheerio.load(html),
    contentArray = [];
  $("div.mw-parser-output p").each((index, element) => {
    contentArray.push($(element).text().trim());
  });
  const infoTable = [];
  $("table.infobox tr").each((index, element) => {
    const label = $(element).find("th.infobox-label").text().trim(),
      value = $(element).find("td.infobox-data").text().trim() || $(element).find("td.infobox-data a").text().trim();
    label && value && infoTable.push(`${label}: ${value}`);
  });
  return {
    title: $("title").text().trim(),
    content: contentArray.join("\n"),
    image: "https:" + ($("#mw-content-text img").attr("src") || "//pngimg.com/uploads/wikipedia/wikipedia_PNG35.png"),
    infoTable: infoTable.join("\n")
  };
}