import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "chord"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.gitagram search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .gitagram search|hello");
      m.react(wait);
      try {
        let teks = (await searchGitagram(inputs)).map((item, index) => `🔍 *[ RESULT ${item.index} ]*\n\n📰 *Title:* ${item.title || "Tidak diketahui"}\n🔗 *Url:* ${item.link || "Tidak diketahui"}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("chord" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .gitagram chord|link");
      try {
        let item = await chordGitagram(inputs),
          teks = `🔍 *[ RESULT ]*\n\n📰 *Title:* ${item.title || "Tidak diketahui"}\n🖼️ *Image:* ${item.image || "Tidak diketahui"}\n📅 *Release Date:* ${item.releaseDate || "Tidak diketahui"}\n👤 *Author:* ${item.author || "Tidak diketahui"}\n🎸 *Chord:* ${item.chord || "Tidak diketahui"}\n📝 *Description:* ${item.description || "Tidak diketahui"}\n🔗 *Link:* ${item.link || "Tidak diketahui"}\n`;
        await conn.sendFile(m.chat, item.image || flaaa.getRandom() + command, "", teks, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["gitagram"], handler.tags = ["internet"], handler.command = /^(gitagram)$/i;
export default handler;
async function searchGitagram(query) {
  const url = `https://www.gitagram.com/index.php?s=${encodeURIComponent(query)}`,
    response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html),
    results = [];
  return $(".main .section .container .columns .column .panel .table tbody tr").each((index, element) => results.push({
    index: index + 1,
    title: $(element).find("span.title").first().text().trim(),
    link: $(element).find("a").attr("href")
  })), results;
}
async function chordGitagram(url) {
  const response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html),
    element = $(".main .section.single .container .columns .column.cetak article");
  return {
    title: element.find(".entry-header .title.is-5").text().trim(),
    image: element.find(".entry-header .image img").attr("src"),
    releaseDate: element.find(".entry-meta .icon-text").first().text().trim(),
    author: element.find(".entry-meta .title.is-7").text().trim(),
    chord: element.find(".content pre").text().trim(),
    description: $('meta[property="og:description"]').attr("content"),
    link: $('meta[property="og:url"]').attr("content")
  };
}