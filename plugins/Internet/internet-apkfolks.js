import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "apkfolks":
      try {
        const results = await searchApp(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Detail lebih lanjut dapat ditemukan di APKFolks.")
          .addSelection("Klik di sini")
          .makeSections("APKFolks", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Headline:* ${item.headline}`,
            `✍️ *Author:* ${item.author}`,
            `${usedPrefix}apkfolksapp ${item.headlineLink}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "apkfolksapp":
      try {
        const appInfo = await getApp(text);
        if (!appInfo) return m.reply(`Link "${text}" tidak ditemukan :/`);
        const caption =
          `📦 *Detail Aplikasi* 📦\n\n` +
          `📰 *Title:* ${appInfo.title}\n` +
          `🔗 *App Link:* ${appInfo.link}\n` +
          `🖼️ *Image:* ${appInfo.image}\n` +
          `📄 *Description:* ${appInfo.description}\n` +
          `📊 *Version Info:*\n${Object.entries(appInfo.versionInfo)
            .map(([key, value]) => `  *${key}* ${value}`)
            .join("\n")}\n` +
          `🔗 *Download Links:*\n${Object.entries(appInfo.download)
            .map(([key, value]) => `  *${key}* ${value}`)
            .join("\n")}`;
        await conn.sendFile(m.chat, appInfo.image || "", "", caption, m);
        await conn.sendFile(
          m.chat,
          Object.entries(appInfo.download).map(([key, value]) => value)[0] ||
            "",
          appInfo.title || "Aplikasi",
          null,
          m,
          false,
          {
            quoted: m,
            mimetype: "application/vnd.android.package-archive",
          },
        );
        m.react(sukses);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    default:
      m.reply("Perintah tidak dikenali.");
      break;
  }
};
handler.help = ["apkfolks"];
handler.tags = ["internet"];
handler.command = /^(apkfolks|apkfolksapp)$/i;
export default handler;
async function searchApp(query) {
  const url = `https://apkfolks.com/?s=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $("article")
      .map((index, element) => ({
        articleId: $(element).attr("id"),
        articleClass: $(element).attr("class"),
        headline: $(element).find("h2.entry-title a").text().trim(),
        headlineLink: $(element).find("h2.entry-title a").attr("href"),
        dateModified: $(element).find("time.updated").attr("datetime"),
        datePublished: $(element)
          .find("time.entry-date.published")
          .attr("datetime"),
        author: $(element).find(".author-name").text().trim(),
      }))
      .get();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
async function getApp(url) {
  try {
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
    downloadSection.find("p").each((index, element) => {
      const key = $(element).find("strong").text().replace(":", ""),
        value = $(element).find("a").attr("href");
      downloadInfo[key] = value;
    });
    return {
      title: $('meta[property="og:title"]').attr("content"),
      image: $('meta[property="og:image"]').attr("content"),
      url: $('meta[property="og:url"]').attr("content"),
      link: link,
      download: downloadInfo,
      description: description,
      versionInfo: versionInfo,
    };
  } catch (error) {
    console.error("Error:", error);
  }
}
async function getAppDown(url) {
  try {
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
    downloadSection.find(".wp-block-button a").each((index, element) => {
      const key = `${index + 1}`,
        value = $(element).attr("href");
      downloadInfo[key] = value;
    });
    return {
      image: image,
      versionInfo: versionInfo,
      downloadInfo: downloadInfo,
    };
  } catch (error) {
    console.error("Error:", error);
  }
}
