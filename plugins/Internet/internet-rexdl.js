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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.rexdl search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .rexdl search|vpn");
      m.react(wait);
      try {
        let teks = (await searchRexdl(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n🖼️ *Thumbnail:* ${item.thumbnail}\n🏷️ *Categories:* ${item.categories}\n📅 *Date:* ${item.date}\n👤 *Author:* ${item.author}\n📝 *Title:* ${item.title}\n🔗 *Url:* ${item.titleUrl}\n📖 *About:* ${item.excerpt}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .rexdl app|link");
      try {
        let resl = await getRexdl(inputs),
          cap = `📝 *Title:* ${resl.info.headingTitle}\n💡 *Version:* ${resl.download.currentVersion}\n🔄 *Update:* ${resl.download.updated}\n📦 *Size:* ${resl.download.fileSizeDownload}\n🔐 *Password:* ${resl.download.password}\n\n📖 *About:* ${resl.info.headingText}\n\n${wait}`;
        await conn.sendFile(m.chat, resl.info.imageData, "", cap, m), await conn.sendFile(m.chat, resl.download.apkUrls[resl.download.apkUrls.length - 1], resl.info.headingTitle, null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["rexdl"], handler.tags = ["internet"], handler.command = /^(rexdl)$/i;
export default handler;
async function searchRexdl(query) {
  const url = `https://rexdl.com/?s=${query}`;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      articles = [];
    return $("article").each((index, element) => {
      const $article = $(element),
        articleData = {
          thumbnail: $article.find(".post-thumbnail img").attr("data-src"),
          categories: $article.find(".post-category a").map((index, el) => $(el).text()).get(),
          date: $article.find(".post-date time").attr("datetime"),
          author: $article.find(".post-byline .author a").text(),
          title: $article.find(".post-title a").text(),
          titleUrl: $article.find(".post-title a").attr("href"),
          excerpt: $article.find(".entry p").text().trim()
        };
      articles.push(articleData);
    }), articles;
  } catch (error) {
    throw console.error("Error:", error), error;
  }
}
async function getRexdl(url) {
  const response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html),
    dlbox = $("#dlbox"),
    headingText = $(".entry-inner").text(),
    headingTitle = $(".entry-inner").text().split(",")[0],
    downloadLink = $(".readdownload a").attr("href"),
    imageData = dlbox.find("img").attr("data-src"),
    dlList = dlbox.find(".dl-list"),
    info = {
      imageData: imageData,
      headingTitle: headingTitle,
      headingText: headingText,
      downloadLink: downloadLink,
      version: dlList.find(".dl-version span").text().trim(),
      fileSize: dlList.find(".dl-size span").text().trim(),
      sourceLink: dlList.find(".dl-source a").attr("href")
    },
    resdown = await fetch(info.downloadLink),
    htmldown = await resdown.text(),
    $down = cheerio.load(htmldown),
    dlboxdown = $down("#dlbox"),
    apkUrls = dlboxdown.find("a").map((index, element) => $down(element).attr("href")).get().filter(url => url.endsWith(".apk"));
  return {
    info: info,
    download: {
      apkUrls: apkUrls,
      updated: dlboxdown.find("li.dl-update span").eq(1).text(),
      currentVersion: dlboxdown.find("li.dl-version span").eq(1).text(),
      fileSizeDownload: dlboxdown.find("li.dl-size span").eq(1).text(),
      password: dlbox.find("li.dl-key span.txt-dl-list").text()
    }
  };
}