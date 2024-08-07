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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.apkfolks search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkfolks search|vpn");
      m.react(wait);
      try {
        let teks = (await searchApp(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📢 *title:* ${item.headline || "Not available"}\n🌐 *url:* ${item.headlineLink || "Not available"}\n⏰ *dateModified:* ${item.dateModified || "Not available"}\n📅 *datePublished:* ${item.datePublished || "Not available"}\n👤 *author:* ${item.author || "Not available"}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkfolks app|link");
      m.react(wait);
      try {
        let item = await getApp(inputs),
          cap = `🔍 *[ RESULT ]*\n\n📌 *title:* ${item.title}\n🖼️ *image:* ${item.image}\n🔗 *url:* ${item.url}\n⬇️ *downloadLink:* ${item.link}\n💾 *downloadText:* ${item.description}\n🔗 *directLink:*\n${Object.entries(item.download).map(([ key, value ]) => key + value.trim()).join("\n")}\n📋 *apkTechnicalInfo:*\n${Object.entries(item.versionInfo).map(([ key, value ]) => key + value.trim()).join("\n")}\n`,
          dlnow = Object.values(item.download).filter(url => url.endsWith(".apk")).map(url => url)[0],
          ini = Object.entries(item.download).map(([key, value]) => key + value.trim()).join("\n");
        0 === !Object.keys(item.download).length && !item.download.constructor === Object ? (await conn.sendFile(m.chat, item.image || logo, "", cap, m), await conn.sendFile(m.chat, dlnow || logo, item.title || "Tidak diketahui", null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        }), m.reply("Download link: " + ini)) : m.reply("Download link: " + item.link);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["apkfolks"], handler.tags = ["internet"], handler.command = /^(apkfolks)$/i;
export default handler;
async function searchApp(query) {
  const url = `https://apkfolks.com/?s=${query}`,
    response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html);
  return $("article").map((index, element) => ({
    articleId: $(element).attr("id"),
    articleClass: $(element).attr("class"),
    headline: $(element).find("h2.entry-title a").text().trim(),
    headlineLink: $(element).find("h2.entry-title a").attr("href"),
    dateModified: $(element).find("time.updated").attr("datetime"),
    datePublished: $(element).find("time.entry-date.published").attr("datetime"),
    author: $(element).find(".author-name").text().trim()
  })).get();
}
async function getApp(url) {
  const response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html),
    link = $(".wp-block-button__link").attr("href"),
    linkdl = await getAppDown(link),
    description = $(".entry-content p").first().text(),
    versionInfoTable = $("table").first(),
    versionInfo = {};
  versionInfoTable.find("tr").each((index, element) => {
    const key = $(element).find("td").first().text(),
      value = $(element).find("td").last().text();
    versionInfo[key] = ": " + value;
  });
  const downloadSection = $('h2:contains("Download")').parent(),
    downloadInfo = {};
  return downloadSection.find("p").each((index, element) => {
    const key = $(element).find("strong").text().replace(":", ""),
      value = $(element).find("a").attr("href");
    downloadInfo[key] = value;
  }), {
    title: $('meta[property="og:title"]').attr("content"),
    image: $('meta[property="og:image"]').attr("content"),
    url: $('meta[property="og:url"]').attr("content"),
    link: link,
    download: linkdl.downloadInfo,
    description: description,
    versionInfo: versionInfo
  };
}
async function getAppDown(url) {
  const response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html),
    downloadSection = $(".entry-content .su-box.su-box-style-default"),
    image = downloadSection.find(".wp-block-image img").attr("src"),
    versionInfoTable = downloadSection.find(".wp-block-table"),
    versionInfo = {};
  versionInfoTable.find("tr").each((index, element) => {
    const key = $(element).find("td").eq(0).text(),
      value = $(element).find("td").eq(1).text();
    versionInfo[key] = value;
  });
  const downloadInfo = {};
  return downloadSection.find(".wp-block-button a").each((index, element) => {
    const key = `${index + 1}`,
      value = $(element).attr("href");
    downloadInfo[key] = value;
  }), {
    image: image,
    versionInfo: versionInfo,
    downloadInfo: downloadInfo
  };
}