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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.hellosehat search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .hellosehat search|vpn");
      m.react(wait);
      try {
        let teks = (await searchhellosehat(inputs)).result.map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📚 Title: ${item.title}\n🔗 Link: ${item.link}\n📅 Date: ${item.time}\n📖 Description: ${item.desc}\n👤 Author: ${item.author}\n`).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("detail" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .hellosehat search|group");
      m.react(wait);
      try {
        let item = await detailhellosehat(inputs);
        m.reply(item);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["hellosehat"], handler.tags = ["internet"], handler.command = /^(hellosehat)$/i;
export default handler;
async function searchhellosehat(query) {
  try {
    const url = `https://wp.hellosehat.com/?s=${encodeURIComponent(query)}`,
      response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const $ = cheerio.load(await response.text()),
      results = $(".card.article--card").map((index, element) => {
        const article = $(element),
          title = article.find("h2.entry-title a").text().trim(),
          link = article.find("h2.entry-title a").attr("href"),
          desc = article.find(".entry-summary p").text().trim(),
          author = article.find(".author.vcard a").text().trim(),
          time = article.find("time.entry-date.published").attr("datetime");
        return title && desc ? {
          title: title,
          link: link,
          desc: desc,
          author: author,
          time: time
        } : null;
      }).get().filter(Boolean);
    if (!results.length) throw new Error("No matching results found.");
    return {
      total: parseInt($(".search--result-count").text()) || 0,
      result: results
    };
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}
async function detailhellosehat(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const $ = cheerio.load(await response.text());
    $("style, script, frame").remove();
    const validTags = ["p", "h2"];
    let result = "";
    const processElement = element => {
      if ("text" === element.type) {
        const text = element.data && element.data.trim();
        text && (result += text + "\n");
      } else if ("tag" === element.type) {
        const tagName = element.name && element.name.toLowerCase();
        if (validTags.includes(tagName)) {
          const text = $(element).text().trim();
          text && (result += text + "\n\n");
        }
      }
    };
    return $("body *").each((index, element) => {
      const tagName = element.name && element.name.toLowerCase();
      validTags.includes(tagName) && processElement(element);
    }), $("img").remove(), result = result.replace(/<img.*?>/g, ""), result.trim();
  } catch (error) {
    throw new Error("Error fetching the page: " + error.message);
  }
}