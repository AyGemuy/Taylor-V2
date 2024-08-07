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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.mobapks search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .mobapks search|vpn");
      m.react(wait);
      try {
        let teks = (await searchApp(inputs)).map((item, index) => `🔍 [ RESULT ${index + 1} ]\n\n🔗 *link:* ${item.link}\n📌 *title:* ${item.title}\n📝 *detail:* ${item.category}\n🖼️ *image:* ${item.image}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .mobapks app|link");
      try {
        let item = await getApp(inputs),
          cap = `🔍 [ RESULT ]\n\n📌 *title:* ${item.caption}\n✨ *version:* ${item.info.version}\n⭐️ *ratings:* ${item.info.ratings}\n🔧 *require:* ${item.info.require}\n📦 *size:* ${item.info.size}\n⬇️ *download:* ${item.info.download}\n🔄 *update:* ${item.info.update}\n🗂️ *category:* ${item.info.category}\n\n${wait}\n`;
        m.reply(cap), await conn.sendFile(m.chat, item.downloadLink, item.caption, null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["mobapks"], handler.tags = ["internet"], handler.command = /^(mobapks)$/i;
export default handler;
async function searchApp(q) {
  const url = "https://mobapks.com/?s=" + q;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      articles = [];
    return $(".vce-post").each((index, element) => {
      const $element = $(element),
        title = $element.find(".entry-title a").text().trim(),
        image = $element.find(".meta-image img").attr("src"),
        category = $element.find(".meta-category a").text().trim(),
        link = $element.find(".entry-title a").attr("href");
      articles.push({
        title: title,
        image: image,
        category: category,
        link: link
      });
    }), articles;
  } catch (error) {
    console.error(error);
  }
}
async function getApp(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      title = $("h2 span").first().text(),
      caption = $("p.wp-caption-text").first().text(),
      infoRows = $("table").eq(0).find("tr"),
      downloadLink = await getLink(url),
      ogImage = $('meta[property="og:image"]').attr("content"),
      info = {
        version: infoRows.eq(0).find("td").eq(1).text(),
        ratings: infoRows.eq(1).find("td").eq(1).text(),
        require: infoRows.eq(2).find("td").eq(1).text(),
        size: infoRows.eq(3).find("td").eq(1).text(),
        download: infoRows.eq(4).find("td").eq(1).text(),
        update: infoRows.eq(5).find("td").eq(1).text(),
        category: infoRows.eq(6).find("td").eq(1).find("a").text()
      },
      features = $("h2 span").last().parent().nextAll("p").map((index, element) => $(element).text()).get();
    return {
      title: title,
      caption: caption,
      downloadLink: downloadLink,
      ogImage: ogImage,
      info: info,
      features: features
    };
  } catch (error) {
    throw console.log("Error:", error), error;
  }
}
async function getLink(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      scriptText = $(".entry-content script").html(),
      match = /<form([^>]*)>(.*?)<\/form>/.exec(scriptText);
    if (match && match[2]) {
      const formContent = match[2],
        urlInput = cheerio.load(formContent)('input[name="url"]');
      return urlInput.val();
    }
  } catch (error) {
    console.error(error);
  }
}