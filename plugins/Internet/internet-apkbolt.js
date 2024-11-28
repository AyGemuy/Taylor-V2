import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "apkbolt":
      try {
        const results = await searchApp(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Keterangan lebih lanjut dapat ditemukan di APKBOLT.")
          .addSelection("Klik di sini")
          .makeSections("APKBOLT", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Title:* ${item.title}`,
            `🖼️ *Image:* ${item.imageURL}`,
            `${usedPrefix}apkboltapp ${item.link}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "apkboltapp":
      try {
        const appInfo = await getInfo(text);
        if (!appInfo) return m.reply(`Link "${text}" tidak ditemukan :/`);
        const caption =
          `📦 *Detail Aplikasi* 📦\n\n` +
          `📝 *Name:* ${appInfo.name}\n` +
          `🖼️ *Image:* ${appInfo.image}\n` +
          `🔗 *Link:* ${appInfo.link}\n` +
          `⬇️ *Download Link:* ${appInfo.downloadLink}`;
        if (appInfo.downloadFile) {
          await conn.sendFile(
            m.chat,
            appInfo.downloadFile || "",
            appInfo.name || "Aplikasi",
            null,
            m,
            false,
            {
              quoted: m,
              mimetype: "application/vnd.android.package-archive",
            },
          );
        }
        await conn.sendFile(m.chat, appInfo.image || "", "", caption, m);
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
handler.help = ["apkbolt"];
handler.tags = ["internet"];
handler.command = /^(apkbolt|apkboltapp)$/i;
export default handler;
async function searchApp(query) {
  const url = `https://apkbolt.com/?s=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      articles = [];
    $("article.vce-post").each((index, element) => {
      const $element = $(element);
      const article = {
        imageURL: $element.find(".meta-image img").attr("src"),
        title: $element.find(".entry-title a").text().trim(),
        link: $element.find(".entry-title a").attr("href"),
        categories: $element
          .find(".meta-category a")
          .map((_, el) => $(el).text().trim())
          .get(),
      };
      articles.push(article);
    });
    return articles;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
async function getInfo(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    const mediaText = $(".wp-block-media-text");
    mediaText.find(".wp-block-media-text__content script").remove();
    const downloadLink = $(".redirect-press-final-link").attr("href"),
      downloadFile = await getApp(downloadLink);
    return {
      name: $('meta[property="og:title"]').attr("content"),
      image: $('meta[property="og:image"]').attr("content"),
      link: $('meta[property="og:url"]').attr("content"),
      downloadLink: downloadLink,
      downloadFile: downloadFile,
    };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
async function getApp(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      mainWrapper = $("#main-wrapper");
    mainWrapper.find("script").remove();
    return mainWrapper.find("a").attr("href");
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
