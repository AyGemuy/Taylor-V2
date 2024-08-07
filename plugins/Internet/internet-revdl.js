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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.revdl search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .revdl search|vpn");
      m.react(wait);
      try {
        let teks = (await searchRevdl(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📝 *title:* ${item.title}\n🔗 *titleUrl:* ${item.titleUrl}\n🖼️ *imageUrl:* ${item.imageUrl}\n🏷️ *categoryTags:* ${item.categoryTags}\n👤 *postedBy:* ${item.postedBy}\n📅 *postDate:* ${item.postDate}\n📖 *excerpt:* ${item.excerpt}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .revdl app|link");
      try {
        m.reply("Not features");
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["revdl"], handler.tags = ["internet"], handler.command = /^(revdl)$/i;
export default handler;
async function searchRevdl(query) {
  const url = `https://www.revdl.com/?s=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $(".full-left").map((index, element) => {
      const $element = $(element),
        titleLink = $element.find(".post-title a");
      return {
        title: titleLink.text().trim(),
        titleUrl: titleLink.attr("href"),
        imageUrl: $element.find("img").attr("src"),
        categoryTags: $element.find(".entry_categories a").map((index, el) => $(el).text()).get(),
        postedBy: $element.find(".vcard .fn").text().trim(),
        postDate: $element.find(".post-date").text().trim(),
        excerpt: $element.find(".maga-excerpt p").text().trim()
      };
    }).get();
  } catch (error) {
    return console.error(error), [];
  }
}