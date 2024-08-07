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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.uptodown search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .uptodown search|vpn");
      m.react(wait);
      try {
        let teks = (await searchApp(inputs)).map((item, index) => `*[ RESULT ${index + 1} ]*\n\n📰 *Title:* ${item.title}\n🔗 *Link:* ${item.link}\n📝 *Description:* ${item.description}\n🖼️ *Image:* ${item.image}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .uptodown app|link");
      try {
        let resl = await getApp(inputs),
          faqs = resl.faqs.map((item, index) => `${index + 1}. ${item.question}\n${item.answer}\n\n`).join(""),
          tech = resl.technicalInformation.map((item, index) => `${index + 1}. ${item.key}\n${item.value}\n\n`).join(""),
          cap = `🔗 URL: ${resl.url}\n📌 Title: ${resl.title}\n📏 Size: ${resl.size}\n🆓 Is Free: ${resl.isFree}\n🖼️ Screenshot: ${resl.screenshotSrc}\n📝 Description: ${resl.description}\n👥 Reviewer: ${resl.reviewer}\n🌐 Translated By: ${resl.translatedBy}\n📋 Requirements: ${resl.requirements}\n❓ FAQs: ${faqs}\n🔧 Technical Information: ${tech}\n\n${wait}`;
        await conn.sendFile(m.chat, resl.screenshotSrc, "", cap, m), await conn.sendFile(m.chat, resl.url, resl.title, null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["uptodown"], handler.tags = ["internet"], handler.command = /^(uptodown)$/i;
export default handler;
async function searchApp(query) {
  const data = new URLSearchParams();
  data.append("q", query);
  try {
    const response = await fetch("https://id.uptodown.com/android/search", {
        method: "POST",
        body: data
      }),
      html = await response.text(),
      $ = cheerio.load(html),
      resultArray = [];
    return $(".item").each((index, element) => {
      const nameElement = $(element).find(".name a"),
        imageElement = $(element).find(".app_card_img"),
        item = {
          title: nameElement.text(),
          link: nameElement.attr("href"),
          description: $(element).find(".description").text(),
          image: imageElement.attr("src")
        };
      resultArray.push(item);
    }), resultArray;
  } catch (error) {
    throw new Error(error);
  }
}
async function getInfo(url) {
  const response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html);
  return {
    screenshotSrc: $('img[itemprop="screenshot"]').attr("src"),
    description: $(".text-description").text().trim(),
    reviewer: $(".by span").eq(0).text().trim(),
    translatedBy: $(".by span").eq(1).text().trim(),
    requirements: $('h2:contains("Persyaratan") + ul li').map((index, element) => $(element).text().trim()).get(),
    faqs: $(".question-content").map((index, element) => ({
      question: $(element).find("h3.title").text().trim(),
      answer: $(element).find("p").text().trim()
    })).get(),
    technicalInformation: $("section#technical-information table tr").map((index, element) => ({
      key: $(element).find("th").text().trim(),
      value: $(element).find("td").last().text().trim()
    })).get(),
    category: $("section.info table tr").eq(0).find("td a").text().trim(),
    language: $("section.info table tr").eq(1).find("td").first().text().trim(),
    publisher: $("section.info table tr").eq(2).find("td a").text().trim(),
    downloads: $("section.info table tr").eq(3).find("td").last().text().trim(),
    date: $("section.info table tr").eq(4).find("td").last().text().trim(),
    contentRating: $("section.info table tr").eq(5).find("td").last().text().trim()
  };
}
async function getApp(url) {
  const links = url.endsWith("/download") ? url : url + "/download",
    response = await fetch(links),
    html = await response.text(),
    button = cheerio.load(html)(".button-group .button.download"),
    info = await getInfo(links.replace(/\/download$/, ""));
  return {
    url: button.attr("data-url"),
    title: button.attr("title"),
    size: button.find(".size").text(),
    isFree: "gratis" === button.find("p:last-of-type").text(),
    screenshotSrc: info.screenshotSrc,
    description: info.description,
    reviewer: info.reviewer,
    translatedBy: info.translatedBy,
    requirements: info.requirements,
    faqs: info.faqs,
    technicalInformation: info.technicalInformation
  };
}