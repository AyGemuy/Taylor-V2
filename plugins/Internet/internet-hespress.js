import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["all", "read"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.hespress search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("all" === feature) {
      m.react(wait);
      try {
        let teks = (await allHespress()).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📚 Title: ${item.title}\n🔗 Link: ${decodeURIComponent(item.link)}\n📝 Date: ${item.date}\n  `).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("read" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .hespress read|5\nList: .hespress list");
      m.react(wait);
      try {
        let url, res = await allHespress();
        url = isNumberFormat(inputs) ? res[parseInt(inputs) + 1].link : inputs;
        let item = await readHespress(url),
          cap = `🔍 *[ RESULT ]*\n\n📚 Title: ${item.title}\n🖼️ Image: ${item.image}\n📝 Caption: ${item.caption}\n✍️ Author: ${item.author}\n📅 Date: ${item.date}\n📜 Content: ${item.content}\n🔖 Tags: ${item.tags}\n`;
        await conn.sendFile(m.chat, item.image || logo, "", cap, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["hespress"], handler.tags = ["internet"], handler.command = /^(hespress)$/i;
export default handler;

function isNumberFormat(input) {
  return /^\d+$/.test(input);
}
async function allHespress() {
  try {
    const response = await fetch("https://www.hespress.com/all"),
      html = await response.text(),
      $ = cheerio.load(html),
      result = [];
    return $(".col-12.col-sm-6.col-md-6.col-xl-3").each((index, element) => {
      const card = {
        title: $(element).find(".card-title").text().trim(),
        date: $(element).find(".date-card small").text().trim(),
        image: $(element).find(".card-img-top img").attr("src"),
        link: $(element).find(".stretched-link").attr("href")
      };
      result.push(card);
    }), result;
  } catch (error) {
    console.error("Error:", error);
  }
}
async function readHespress(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    $("script").remove(), $("style").remove();
    const title = $(".article-header").find(".post-title").text().trim(),
      image = $(".figure-heading-post .post-thumbnail img").attr("src"),
      caption = $(".figure-heading-post figcaption").text().trim(),
      author = $(".author a").text().trim(),
      date = $(".date-post").text().trim(),
      content = $(".article-content").text().trim(),
      tags = $(".box-tags .tag_post_tag").map((index, element) => $(element).text().trim()).get();
    return {
      title: title,
      image: image,
      caption: caption,
      author: author,
      date: date,
      content: content,
      tags: tags
    };
  } catch (error) {
    console.error("Error:", error);
  }
}