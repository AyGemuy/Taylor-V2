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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.tnw search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .tnw search|vpn");
      m.react(wait);
      try {
        let teks = (await searchTNW(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📰 *Title:* ${item.title}\n🔗 *Url:* ${item.articleUrl}\n🖼️ *Thumb:* ${item.imageUrl}\n📆 *Date:* ${item.date}\n👤 *Author:* ${item.author}\n📰 *Source:* ${item.source}\n🔢 *Word Count:* ${item.wordCount}\n📝 *Description:* ${item.description}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("read" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .tnw read|link");
      try {
        let item = await detailTNW(inputs),
          teks = `🔍 *[ RESULT ]*\n\n📰 *Title:* ${item.ogTitle}\n🖼️ *Image:* ${item.ogImage}\n📝 *Description:* ${item.ogDescription}\n🔗 *URL:* ${item.ogUrl}\n💬 *Combined Data:*\n${item.combinedData}`;
        await conn.sendFile(m.chat, item.ogImage, item.ogTitle, teks, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["tnw"], handler.tags = ["internet"], handler.command = /^(tnw)$/i;
export default handler;
async function searchTNW(q) {
  try {
    const response = await fetch("https://www.technewsworld.com/search-results?keyword=" + q + "&orderby=post_date&order=desc"),
      html = await response.text(),
      $ = cheerio.load(html),
      searchItems = [];
    return $("div.search-item").each((index, element) => {
      const searchItem = {
        imageUrl: $(element).find("img").attr("src"),
        articleUrl: $(element).find("a").eq(0).attr("href"),
        title: $(element).find("h2").text(),
        author: $(element).find(".story-meta li").eq(0).text(),
        date: $(element).find(".story-meta li").eq(1).text(),
        source: $(element).find(".story-meta li").eq(2).text(),
        wordCount: $(element).find(".story-meta li").eq(3).text(),
        description: $(element).find("p").text()
      };
      searchItems.push(searchItem);
    }), searchItems;
  } catch (error) {
    console.log("Error:", error);
  }
}
async function detailTNW(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      ogTitle = $('meta[property="og:title"]').attr("content") || "",
      ogImage = $('meta[property="og:image"]').attr("content") || "",
      ogDescription = $('meta[property="og:description"]').attr("content") || "",
      ogUrl = $('meta[property="og:url"]').attr("content") || "";
    return {
      ogTitle: ogTitle,
      ogImage: ogImage,
      ogDescription: ogDescription,
      ogUrl: ogUrl,
      combinedData: $("div.story-content p").map((index, element) => {
        const text = $(element).text(),
          link = $(element).find("a").attr("href") || "";
        return `${text} ${link || ""}`.trim();
      }).get().join("\n")
    };
  } catch (error) {
    return console.error("Error:", error), null;
  }
}