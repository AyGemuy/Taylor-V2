import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "detail"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.halodoc search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .halodoc search|vpn");
      m.react(wait);
      try {
        let teks = (await searchHalodoc(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n  📚 Title: ${item.title}\n  🔗 Article Link: ${item.articleLink}\n  🖼️ Image Src: ${item.imageSrc}\n  ⚕️ Health Link: ${item.healthLink}\n  🏥 Health Title: ${item.healthTitle}\n  📝 Description: ${item.description}\n  `).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("detail" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .halodoc app|link");
      m.react(wait);
      try {
        let item = await getDetails(inputs),
          cap = `🔍 *[ RESULT ]*\n\n📚 Title: ${item.title}\n📝 Content: ${item.content}\n⌛ Times: ${item.times}\n✍️ Author: ${item.author}\n🔗 Link: ${item.link}\n🖼️ Image: ${item.image}\n`;
        await conn.sendFile(m.chat, item.image || logo, "", cap, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["halodoc"], handler.tags = ["internet"], handler.command = /^(halodoc)$/i;
export default handler;
async function searchHalodoc(query) {
  const url = `https://www.halodoc.com/artikel/search/${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $("magneto-card").map((index, element) => ({
      title: $(element).find("header a").text(),
      articleLink: "https://www.halodoc.com" + $(element).find("header a").attr("href"),
      imageSrc: $(element).find("magneto-image-mapper img").attr("src"),
      healthLink: "https://www.halodoc.com" + $(element).find(".tag-container a").attr("href"),
      healthTitle: $(element).find(".tag-container a").text(),
      description: $(element).find(".description").text()
    })).get();
  } catch (err) {
    return console.log(err), [];
  }
}
async function getDetails(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return {
      title: $("div.wrapper div.item").text(),
      content: $("div.article-page__article-body").text(),
      times: $("div.article-page__article-subheadline span.article-page__reading-time").text(),
      author: $("div.article-page__reviewer a").text(),
      link: $('meta[property="og:url"]').attr("content") || "",
      image: $('meta[property="og:image"]').attr("content") || ""
    };
  } catch (error) {
    throw new Error(error);
  }
}