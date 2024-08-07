import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "get"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.brilio search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .brilio search|vpn");
      m.react(wait);
      try {
        let teks = filterByBrilioLink(await searchBrilio(inputs)).map((item, index) => `*[ RESULT ${index + 1} ]*\n*Title:* ${item.title}\n*Url:* ${item.url}\n*Image:* ${item.image}\n*Date:* ${item.date}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("get" === feature) {
      if (!inputs.startsWith("https://m.brilio.net")) return m.reply("Input query link\nExample: .brilio app|link");
      try {
        let item = await getBrilio(inputs),
          cap = `*[ RESULT ]*\n*Title:* ${item.title}\n*Image:* ${item.image.src}\n*Source:* ${item.source}\n*Date:* ${item.date}\n\n*Description:*\n${item.description}\n\n*Article:*\n${item.articleBody}\n`;
        await conn.sendFile(m.chat, item.image.src, "", cap, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["brilio"], handler.tags = ["internet"], handler.command = /^(brilio)$/i;
export default handler;
async function searchBrilio(query) {
  const url = "https://m.brilio.net",
    response = await fetch(`${url}/search-result/${query}`),
    html = await response.text(),
    $ = cheerio.load(html),
    results = [];
  return $("ul.article-berita li").each((index, element) => {
    const $element = $(element),
      articleTitle = $element.find(".text-article a").text().trim(),
      articleUrl = $element.find(".text-article a").attr("href"),
      articleImage = $element.find(".article-img-index").attr("src"),
      articleDate = $element.find(".index-date").text().trim(),
      articleData = {
        title: articleTitle,
        url: articleUrl.startsWith("https://") ? articleUrl : url + articleUrl,
        image: articleImage,
        date: articleDate
      };
    results.push(articleData);
  }), results;
}
async function getBrilio(url) {
  const response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html),
    articleBody = $(".news-content .main-content").find("p").map((_, el) => $(el).text().trim()).get().join("\n\n");
  return {
    date: $(".date-detail").text().trim(),
    title: $(".title-detail").text().trim(),
    description: $(".desc-title-detail").text().trim(),
    image: {
      src: $("figure.headline-index img").attr("data-src"),
      alt: $("figure.headline-index img").attr("alt")
    },
    source: $(".source").text().trim(),
    articleBody: articleBody
  };
}

function filterByBrilioLink(results) {
  return results.filter(article => article.url.startsWith("https://m.brilio.net"));
}