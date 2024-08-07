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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.caraqu search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .caraqu search|vpn");
      m.react(wait);
      try {
        let teks = (await searchCaraqu(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📚 title: ${item.title}\n🔗 link: ${item.link}\n🖼️ image: ${item.image}\n📅 date: ${item.date}\n📖 story: ${item.story}\n  `).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("detail" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .caraqu search|group");
      m.react(wait);
      try {
        let item = await detailCaraqu(inputs),
          cap = `🔍 *[ RESULT ]*\n\n📚 Title: ${item.title}\n📝 Content: ${item.content}\n🖼️ Image: ${item.image}\n`;
        await conn.sendFile(m.chat, item.image || logo, "", cap, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["caraqu"], handler.tags = ["internet"], handler.command = /^(caraqu)$/i;
export default handler;
async function searchCaraqu(query) {
  const url = `https://www.caraqu.com/?s=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url),
      body = await response.text(),
      $ = cheerio.load(body);
    return $(".mvp-blog-story-wrap").map((index, element) => ({
      title: $(element).find(".mvp-blog-story-in h2").text().trim(),
      link: $(element).find("a").attr("href"),
      image: $(element).find(".mvp-blog-story-img .mvp-big-img").attr("src"),
      date: $(element).find(".mvp-cat-date-wrap .mvp-cd-date").text().trim(),
      story: $(element).find(".mvp-blog-story-text p").text().trim()
    })).get();
  } catch (error) {
    return console.log("Error:", error), [];
  }
}
async function detailCaraqu(url) {
  try {
    const response = await fetch(url),
      body = await response.text(),
      $ = cheerio.load(body),
      title = $("h1.entry-title").text().trim(),
      image = $("div#mvp-post-feat-img img").attr("src"),
      content = $("div#mvp-content-body").find("p, ul > li").map((index, element) => {
        const paragraph = $(element).clone().children().remove().end().text().trim(),
          link = $(element).find("a").attr("href");
        return link ? `${paragraph}\n${link}` : paragraph;
      }).get().join("\n"),
      related = $("ul.related-posts-list li").map((index, element) => ({
        title: $(element).find(".mvp-blog-story-in h2").text().trim(),
        link: $(element).find(".mvp-blog-story-out a").attr("href"),
        image: $(element).find(".mvp-blog-story-img .mvp-big-img").attr("src")
      })).get();
    return {
      title: title,
      image: image,
      content: content,
      related: related,
      tableOfContents: $(".lwptoc_item").map((index, element) => ({
        number: $(element).find(".lwptoc_item_number").text().trim(),
        label: $(element).find(".lwptoc_item_label").text().trim(),
        link: $(element).find(".lwptoc_item a").attr("href")
      })).get()
    };
  } catch (error) {
    return console.log("Error:", error), null;
  }
}