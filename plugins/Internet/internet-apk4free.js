import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "app"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.apk4free search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apk4free search|vpn");
      m.react(wait);
      try {
        let teks = (await searchApk4free(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📰 *Title:* ${item.title}\n🔗 *Url:* ${item.url}\n🖼️ *Thumbnail:* ${item.thumbnail}\n📌 *Category:* ${item.category}\n🏷️ *Tag:* ${item.tag}\n📝 *Description:* ${item.description}\n👤 *Author Name:* ${item.author.name}\n🖼️ *Author Image:* ${item.author.image}\n👥 *Author Count:* ${item.author.count}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apk4free app|link");
      try {
        let resl = await getApk4free(inputs),
          cap = "*About:*\n" + resl.text.slice(4, 16).join("\n") + "\n*Link:*\n" + resl.download.map((v, index) => index + 1 + ". " + v).join("\n");
        await conn.sendFile(m.chat, resl.image[0], "", cap, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["apk4free"], handler.tags = ["internet"], handler.command = /^(apk4free)$/i;
export default handler;
async function searchApk4free(query) {
  const url = `https://apk4free.org/?s=${encodeURIComponent(query)}`,
    response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html),
    articles = [];
  return $("article").each((index, element) => {
    const $article = $(element);
    articles.push({
      title: $article.find("h1.title a").text(),
      url: $article.find("h1.title a").attr("href"),
      thumbnail: $article.find(".featured-image .thumb.hover-effect span.fullimage").css("background-image").replace(/url\((.*)\)/, "$1"),
      category: $article.find('.tags a[href^="https://apk4free.org/category/"]').map((index, tagElement) => $(tagElement).text()).get(),
      tag: $article.find('.tags a[href^="https://apk4free.org/tag/"]').map((index, tagElement) => $(tagElement).text()).get(),
      description: $article.find(".post-excerpt p").text(),
      author: {
        name: $article.find("footer.author-meta a .author-name").text(),
        image: $article.find("footer.author-meta a .author-image").css("background-image").replace(/url\('(.*)'\)/, "$1"),
        count: $article.find("footer.author-meta a .author-count").text().replace(" Resources", "")
      }
    });
  }), articles;
}
async function getApk4free(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      data = [];
    $('section.post-content p, .slider img, strong a[href^="https://"]').each((index, element) => {
      const $element = $(element);
      if ($element.is("p")) {
        const content = $element.text().trim();
        "" !== content && data.push({
          type: "text",
          content: content
        });
      } else if ($element.is("img")) {
        let src = $element.attr("src");
        src.startsWith("//") && (src = "https:" + src), data.push({
          type: "image",
          src: src
        });
      } else if ($element.is("a")) {
        let link = $element.attr("href");
        link.startsWith("//") && (link = "https:" + link), data.push({
          type: "download",
          link: link
        });
      }
    });
    return data.reduce((result, item) => {
      const {
        type,
        content,
        src,
        link
      } = item;
      return "text" === type ? (result.text || (result.text = []), result.text.push(content)) : "image" === type ? (result.image || (result.image = []), result.image.push(src)) : "download" === type && (result.download || (result.download = []), result.download.push(link)), result;
    }, {});
  } catch (error) {
    console.log(error);
  }
}