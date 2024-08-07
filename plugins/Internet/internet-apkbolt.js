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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.apkbolt search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkbolt search|vpn");
      m.react(wait);
      try {
        let teks = (await searchApp(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📷 *imageURL:* ${item.imageURL}\n📚 *title:* ${item.title}\n🔗 *link:* ${item.link}\n🔖 *categories:* ${item.categories}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkbolt app|link");
      m.react(wait);
      try {
        let item = await getInfo(inputs),
          cap = `🔍 *[ RESULT ]*\n\n📷 *imageURL:* ${item.image}\n📚 *title:* ${item.name}\n🔗 *link:* ${item.link}\n🔗 *downloadLink:* ${item.downloadLink}\n💾 *downloadFile:* ${item.downloadFile}\n`;
        await conn.sendFile(m.chat, item.image || logo, "", cap, m), await conn.sendFile(m.chat, item.downloadFile || logo, item.name || "Tidak diketahui", null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["apkbolt"], handler.tags = ["internet"], handler.command = /^(apkbolt)$/i;
export default handler;
async function searchApp(q) {
  const url = "https://apkbolt.com/?s=" + q;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      articles = [];
    return $("article.vce-post").each((index, element) => {
      const article = {},
        metaImage = $(element).find(".meta-image");
      article.imageURL = metaImage.find("img").attr("src"), article.title = $(element).find(".entry-title a").text().trim(),
        article.link = $(element).find(".entry-title a").attr("href"), article.categories = [],
        $(element).find(".meta-category a").each((index, element) => {
          article.categories.push($(element).text().trim());
        }), articles.push(article);
    }), articles;
  } catch (error) {
    console.log(error);
  }
}
async function getInfo(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      mediaText = $(".wp-block-media-text");
    mediaText.find(".wp-block-media-text__content").find("script").remove();
    const downloadLink = $(".redirect-press-final-link").attr("href"),
      downloadFile = await getApp(downloadLink);
    return {
      name: $('meta[property="og:title"]').attr("content"),
      image: $('meta[property="og:image"]').attr("content"),
      link: $('meta[property="og:url"]').attr("content"),
      downloadLink: downloadLink,
      downloadFile: downloadFile
    };
  } catch (error) {
    console.log(error);
  }
}
async function getApp(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      mainWrapper = cheerio.load(html)("#main-wrapper");
    mainWrapper.find("script").remove();
    return mainWrapper.find("a").attr("href");
  } catch (error) {
    return console.log(error), null;
  }
}