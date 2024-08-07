import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "info"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.kompasiana search|adel\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .kompasiana search|hello");
      m.react(wait);
      try {
        let teks = (await searchArticles(inputs)).map((v, index) => `*[ RESULT ${index + 1} ]*\n\n👤 Author: ${v.author}\n🔗 Author url: ${v.author_url}\n📅 Date: ${v.date}\n📝 Title: ${v.title}\n🔗 URL: ${v.url}\n🏷️ Tags: ${v.tags}\n👀 Views: ${v.views}\n👍 Likes: ${v.likes}\n💬 Comments: ${v.comments}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
        await conn.reply(m.chat, teks, m, adReply);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("info" === feature) {
      if (!validateURL(inputs)) return m.reply("Input query link\nExample: .kompasiana get|https://www.kompasiana.com/xxxxx");
      m.react(wait);
      try {
        let res = await getArticles(inputs),
          teks = `*[ Title ]*\n${res.title}\n\n*[ Content ]*\n${res.paragraphs}\n\n*[ Image ]*\n${res.image}`;
        await conn.sendFile(m.chat, res.image, "", teks, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["kompasiana type query"], handler.tags = ["internet"], handler.command = /^(kompasiana)$/i;
export default handler;
async function searchArticles(q) {
  try {
    const response = await fetch("https://www.kompasiana.com/search_artikel?q=" + q),
      body = await response.text(),
      $ = cheerio.load(body),
      articles = [];
    return $(".timeline--item.timeline--artikel").each((index, element) => {
      const article = {},
        artikelCount = $(element).find(".artikel--count");
      article.author = $(element).find(".thumb-user a").text(), article.author_url = $(element).find(".thumb-user a").attr("href"),
        article.date = $(element).find(".date-box").text(), article.title = $(element).find(".artikel--content h2 a").text(),
        article.url = $(element).find(".artikel--content h2 a").attr("href"), article.tags = [],
        $(element).find(".artikel--tag span").each((tagIndex, tagElement) => {
          article.tags.push($(tagElement).text().trim());
        }), article.views = formatCount(artikelCount.find(".artikel--count__item:nth-child(1)").text().trim()),
        article.likes = formatCount(artikelCount.find(".artikel--count__item:nth-child(2)").text().trim()),
        article.comments = formatCount(artikelCount.find(".artikel--count__item:nth-child(3)").text().trim()),
        articles.push(article);
    }), articles;
  } catch (error) {
    return console.error(error), [];
  }
}

function formatCount(count) {
  const number = parseInt(count);
  return isNaN(number) ? count : number >= 1e9 ? (number / 1e9).toFixed(1) + "B" : number >= 1e6 ? (number / 1e6).toFixed(1) + "M" : number >= 1e3 ? (number / 1e3).toFixed(1) + "K" : number.toString();
}
async function getArticles(url) {
  try {
    const response = await fetch(url),
      $ = cheerio.load(await response.text()),
      articleParagraphs = $(".read__keyword p").map((_, el) => $(el).text().trim()).get().join("\n"),
      ogImage = $('meta[property="og:image"]').attr("content");
    return {
      paragraphs: articleParagraphs,
      image: ogImage,
      title: $('meta[property="og:title"]').attr("content")
    };
  } catch (error) {
    console.error(error);
  }
}

function validateURL(url) {
  return /^https:\/\/www\.kompasiana\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/.test(url);
}