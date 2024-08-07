import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["list", "read"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.cerpenmu list\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("list" === feature) {
      m.react(wait);
      try {
        let teks = (await getCategoryCerpen()).categories.map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n  📚 Title: ${item.title}\n  🔗 Link: ${item.link}\n  📝 Total: ${item.total}\n  `).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("read" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .cerpenmu read|5\nList: .cerpenmu list");
      m.react(wait);
      try {
        let url, res = await getCategoryCerpen();
        url = isNumberFormat(inputs) ? res.categories[parseInt(inputs) + 1].link : inputs;
        let item = await getContentCerpen(url),
          cap = `🔍 *[ RESULT ]*\n\n📚 Title: ${item.title}\n📝 Content: ${item.content}\n🖼️ Image: ${item.image}\n`;
        await conn.sendFile(m.chat, item.image || logo, "", cap, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["cerpenmu"], handler.tags = ["internet"], handler.command = /^(cerpenmu)$/i;
export default handler;

function isNumberFormat(input) {
  return /^\d+$/.test(input);
}
async function getCategoryCerpen() {
  try {
    const url = "https://cerpenmu.com/",
      response = await fetch(url),
      body = await response.text(),
      $ = cheerio.load(body),
      articles = [];
    $("article.post").each((index, element) => {
      const articleObj = {
        title: $(element).find("h2 > a").text(),
        link: $(element).find("h2 > a").attr("href"),
        author: $(element).find("blockquote > a").text(),
        category: $(element).find('a[rel="category tag"]').map((_, el) => $(el).text()).get()
      };
      articles.push(articleObj);
    });
    const categories = [];
    $(".cat-item").each((index, element) => {
      $(element).text().match(/\((\d+)\)/);
      const category = {
        title: $(element).find("a").text(),
        link: $(element).find("a").attr("href"),
        total: $(element).text().match(/\(([\d,]+)\)/)[1]
      };
      categories.push(category);
    });
    return {
      categories: categories,
      articles: articles
    };
  } catch (err) {
    return console.error(err), null;
  }
}
async function getContentCerpen(url, page = 1) {
  try {
    const pageUrl = url + (page ? `/page/${page}/` : ""),
      response = await fetch(pageUrl),
      body = await response.text(),
      $ = cheerio.load(body),
      articles = $("article.post").map((index, element) => {
        const $element = $(element),
          link = $element.find("h2 a").attr("href");
        if (link && link.endsWith(".html")) return {
          title: $element.find("h2 a").text(),
          link: link,
          tag: $element.find('a[rel="tag"]').text(),
          quote: $element.find("blockquote").text()
        };
      }).get(),
      randomArticle = articles[Math.floor(Math.random() * articles.length)];
    if (randomArticle) {
      const articleResponse = await fetch(randomArticle.link),
        articleBody = await articleResponse.text(),
        $article = cheerio.load(articleBody, {
          xmlMode: !1
        });
      $article("script, style").remove(), Object.assign(randomArticle, {
        title: $article("h1").text(),
        image: $article("img").attr("src"),
        content: $article("p").text()
      });
    }
    return randomArticle || null;
  } catch (error) {
    return console.log("Error:", error), null;
  }
}