import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "apkgod":
      try {
        const results = await searchApkgod(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Detail lebih lanjut dapat ditemukan di APKGod.")
          .addSelection("Klik di sini")
          .makeSections("APKGod", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Title:* ${item.title}`,
            `📅 *Version:* ${item.version}`,
            `${usedPrefix}apkgodapp ${item.link}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "apkgodapp":
      try {
        const appInfo = await getResultLink(text);
        if (!appInfo) return m.reply(`Link "${text}" tidak ditemukan :/`);
        const caption =
          `📦 *Detail Aplikasi* 📦\n\n` +
          `📰 *Title:* ${appInfo.title}\n` +
          `🔗 *Download Link:* ${appInfo.link}\n` +
          `🖼️ *Icon:* ${appInfo.icon}\n` +
          `📊 *Version:* ${appInfo.version}\n` +
          `⭐ *Rating:* ${appInfo.rating}`;
        await conn.sendFile(m.chat, appInfo.icon || "", "", caption, m);
        await conn.sendFile(
          m.chat,
          appInfo.link || "",
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
handler.help = ["apkgod"];
handler.tags = ["internet"];
handler.command = /^(apkgod|apkgodapp)$/i;
export default handler;
async function searchApkgod(query) {
  const url = `https://apkgod.co/?s=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      items = [];
    $("article.flex-item").each((index, element) => {
      const $element = $(element),
        item = {
          title: $element.find(".app-name h3").text().trim(),
          image: $element.find(".app-icon img").attr("src"),
          version: $element
            .find(".app-name .has-small-font-size")
            .first()
            .text()
            .trim(),
          tags: $element
            .find(".app-tags .app-tag")
            .map((index, tag) => $(tag).text().trim())
            .get(),
          link: $element.find("a.app").attr("href"),
        };
      items.push(item);
    });
    return items;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
async function getLinkDown(url) {
  try {
    const response = await fetch(
        url.endsWith("/download") ? url : url + "/download",
      ),
      html = await response.text(),
      $ = cheerio.load(html),
      downloadList = $(".download-list.margin-top-15"),
      results = [];
    downloadList.find("details").each((index, element) => {
      const downloadItem = $(element).find(".download-item"),
        icon = downloadItem.find(".download-item-icon img").attr("src"),
        name = downloadItem
          .find(".download-item-name .has-vivid-cyan-blue-color")
          .text()
          .trim(),
        link = $(element)
          .find(".collapsible-body .wp-block-button__link")
          .attr("href");
      results.push({
        icon: icon,
        name: name,
        link: link,
      });
    });
    return results;
  } catch (error) {
    throw new Error(`Scraping failed: ${error}`);
  }
}
async function getResultLink(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      entryContent = $(".entry-block.entry-content.main-entry-content"),
      appIcon = entryContent.find(".app-icon img").attr("src"),
      appName = entryContent
        .find(".app-name .app-box-name-heading h1")
        .text()
        .trim(),
      appVersion = appName.match(/\[Latest\]$/i) ? "Latest" : "",
      appRating = entryContent.find(
        ".app-name .rating span.star.active",
      ).length,
      downloadButton = $("#download-button").attr("href");
    return {
      icon: appIcon,
      title: appName,
      version: appVersion,
      rating: appRating,
      link: downloadButton,
    };
  } catch (error) {
    throw new Error(`Scraping failed: ${error}`);
  }
}
