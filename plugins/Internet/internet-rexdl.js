import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  try {
    switch (command) {
      case "rexdl":
        try {
          const results = await searchRexdl(text);
          if (!results.length)
            return m.reply(`Query "${text}" tidak ditemukan :/`);
          const buttons = conn.ctaButton
            .setBody("Pilih artikel di bawah ini.")
            .setFooter("Detail lebih lanjut dapat ditemukan di RexDL.")
            .addSelection("Klik di sini")
            .makeSections("RexDL", "Pilih artikel");
          results.forEach((item, index) => {
            buttons.makeRow(
              `🔍 *[ RESULT ${index + 1} ]*`,
              `📖 *Title:* ${item.title}`,
              `📝 *Excerpt:* ${item.excerpt}`,
              `${usedPrefix}rexdlapp ${item.titleUrl}`,
            );
          });
          buttons.run(m.chat, conn, m);
        } catch (searchError) {
          console.error("Error in searchRexdl:", searchError);
          m.reply("Terjadi kesalahan saat mencari artikel.");
          m.react(eror);
        }
        break;
      case "rexdlapp":
        try {
          const appInfo = await getRexdl(text);
          if (!appInfo.info.imageData)
            return m.reply(`URL "${text}" tidak ditemukan :/`);
          const caption =
            `📦 *Detail Aplikasi* 📦\n\n` +
            `🖼️ *Image:* ${appInfo.info.imageData}\n` +
            `📖 *Title:* ${appInfo.info.headingTitle}\n` +
            `📜 *Description:* ${appInfo.info.headingText}\n` +
            `🔗 *Download Link:* ${appInfo.info.downloadLink}\n` +
            `📅 *Version:* ${appInfo.info.version}\n` +
            `📏 *File Size:* ${appInfo.info.fileSize}\n` +
            `🔗 *Source Link:* ${appInfo.info.sourceLink}\n\n` +
            `📥 *Download URLs:* ${appInfo.download.apkUrls.join("\n")}\n` +
            `🆕 *Updated:* ${appInfo.download.updated}\n` +
            `📜 *Current Version:* ${appInfo.download.currentVersion}\n` +
            `📏 *File Size (Download):* ${appInfo.download.fileSizeDownload}\n` +
            `🔑 *Password:* ${appInfo.download.password}`;
          await conn.sendFile(
            m.chat,
            appInfo.info.imageData || "",
            "",
            caption,
            m,
          );
          await conn.sendFile(
            m.chat,
            appInfo.download.apkUrls[0] || "",
            appInfo.info.headingTitle || "Aplikasi",
            null,
            m,
            false,
            {
              quoted: m,
              mimetype: "application/vnd.android.package-archive",
            },
          );
          m.react(sukses);
        } catch (appError) {
          console.error("Error in getRexdl:", appError);
          m.reply("Terjadi kesalahan saat mendapatkan detail aplikasi.");
          m.react(eror);
        }
        break;
      default:
        m.reply("Perintah tidak dikenali.");
        break;
    }
  } catch (e) {
    console.error("General Error:", e);
    m.react(eror);
  }
};
handler.help = ["rexdl"];
handler.tags = ["internet"];
handler.command = /^(rexdl|rexdlapp)$/i;
export default handler;
async function searchRexdl(query) {
  const url = `https://rexdl.com/?s=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      articles = [];
    $("article").each((index, element) => {
      const $article = $(element),
        articleData = {
          thumbnail: $article.find(".post-thumbnail img").attr("data-src"),
          categories: $article
            .find(".post-category a")
            .map((index, el) => $(el).text())
            .get(),
          date: $article.find(".post-date time").attr("datetime"),
          author: $article.find(".post-byline .author a").text(),
          title: $article.find(".post-title a").text(),
          titleUrl: $article.find(".post-title a").attr("href"),
          excerpt: $article.find(".entry p").text().trim(),
        };
      articles.push(articleData);
    });
    return articles;
  } catch (error) {
    console.error("Error in searchRexdl:", error);
    return [];
  }
}
async function getRexdl(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      dlbox = $("#dlbox"),
      headingText = $(".entry-inner").text(),
      headingTitle = headingText.split(",")[0],
      downloadLink = $(".readdownload a").attr("href"),
      imageData = dlbox.find("img").attr("data-src"),
      dlList = dlbox.find(".dl-list");
    const info = {
      imageData: imageData,
      headingTitle: headingTitle,
      headingText: headingText,
      downloadLink: downloadLink,
      version: dlList.find(".dl-version span").text().trim(),
      fileSize: dlList.find(".dl-size span").text().trim(),
      sourceLink: dlList.find(".dl-source a").attr("href"),
    };
    const resdown = await fetch(info.downloadLink),
      htmldown = await resdown.text(),
      $down = cheerio.load(htmldown),
      dlboxdown = $down("#dlbox"),
      apkUrls = dlboxdown
        .find("a")
        .map((index, element) => $down(element).attr("href"))
        .get()
        .filter((url) => url.endsWith(".apk"));
    return {
      info: info,
      download: {
        apkUrls: apkUrls,
        updated: dlboxdown.find("li.dl-update span").eq(1).text(),
        currentVersion: dlboxdown.find("li.dl-version span").eq(1).text(),
        fileSizeDownload: dlboxdown.find("li.dl-size span").eq(1).text(),
        password: dlbox.find("li.dl-key span.txt-dl-list").text(),
      },
    };
  } catch (error) {
    console.error("Error in getRexdl:", error);
    return {};
  }
}
