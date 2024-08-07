import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "read"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.dongeng search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .dongeng search|kancil");
      m.react(wait);
      try {
        let teks = (await searchDongeng(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📚 Title: ${item.entryTitle}\n🔗 Link: ${item.link}\n📝 Summary: ${item.entrySummary}\n  `).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("read" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .dongeng read|link");
      m.react(wait);
      try {
        let item = await readDongeng(inputs),
          cap = `🔍 *[ RESULT ]*\n\n📰 *Title:* ${item.title}\n🖼️ *Thumbnail:* ${item.image}\n📌 *Category:* ${item.cat}\n🏷️ *Tag:* ${item.tag}\n📝 *Content:* ${cleanText(item.content)}\n👤 *Author Name:* ${item.author}\n📝 *Date:* ${item.date}\n`;
        await conn.sendFile(m.chat, item.image || logo, "", cap, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["dongeng"], handler.tags = ["internet"], handler.command = /^(dongeng)$/i;
export default handler;

function cleanText(html) {
  return html.replace(/<[^>]+>/g, "");
}
async function searchDongeng(q) {
  try {
    const url = "https://dongengceritarakyat.com/?s=" + q,
      response = await fetch(url),
      body = await response.text(),
      $ = cheerio.load(body),
      results = [];
    return $("article").each((index, element) => {
      const article = $(element),
        result = {
          entryTitle: article.find(".entry-title a").text(),
          link: article.find(".entry-title a").attr("href"),
          imageSrc: article.find(".featured-image amp-img").attr("src"),
          entrySummary: article.find(".entry-summary").text(),
          footerTag: article.find(".cat-links a").text(),
          from: article.find(".tags-links a").text()
        };
      results.push(result);
    }), results;
  } catch (error) {
    return console.error("Error:", error), [];
  }
}
async function readDongeng(url) {
  const response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html);
  return {
    image: $("div.featured-image amp-img").attr("src"),
    title: $("h1.entry-title").text(),
    date: $("span.posted-date").text(),
    author: $("span.posted-author a").text(),
    content: $("div.entry-content").text(),
    tag: $("span.tags-links a").text(),
    cat: $("span.cat-links a").text()
  };
}