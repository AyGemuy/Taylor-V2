import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "mobapks":
      try {
        const results = await searchApp(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Detail lebih lanjut dapat ditemukan di MobAPKs.")
          .addSelection("Klik di sini")
          .makeSections("MobAPKs", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Title:* ${item.title}`,
            `🏷️ *Category:* ${item.category}`,
            `${usedPrefix}mobapksapp ${item.link}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "mobapksapp":
      try {
        const appInfo = await getApp(text);
        if (!appInfo) return m.reply(`Link "${text}" tidak ditemukan :/`);
        const caption =
          `📦 *Detail Aplikasi* 📦\n\n` +
          `🖼️ *Image:* ${appInfo.ogImage}\n` +
          `📜 *Title:* ${appInfo.title}\n` +
          `✒️ *Caption:* ${appInfo.caption}\n` +
          `🔗 *Download Link:* ${appInfo.downloadLink}\n\n` +
          `🗂️ *Information:*\n` +
          `📝 *Version:* ${appInfo.info.version}\n` +
          `⭐ *Ratings:* ${appInfo.info.ratings}\n` +
          `🛠️ *Require:* ${appInfo.info.require}\n` +
          `📦 *Size:* ${appInfo.info.size}\n` +
          `📥 *Download:* ${appInfo.info.download}\n` +
          `🔄 *Update:* ${appInfo.info.update}\n` +
          `📂 *Category:* ${appInfo.info.category}\n\n` +
          `📝 *Features:*\n` +
          `${appInfo.features.join("\n")}`;
        await conn.sendFile(m.chat, appInfo.ogImage || "", "", caption, m);
        await conn.sendFile(
          m.chat,
          appInfo.downloadLink || "",
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
handler.help = ["mobapks"];
handler.tags = ["internet"];
handler.command = /^(mobapks|mobapksapp)$/i;
export default handler;
async function searchApp(q) {
  const url = `https://mobapks.com/?s=${encodeURIComponent(q)}`;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      articles = [];
    $(".vce-post").each((index, element) => {
      const $element = $(element),
        title = $element.find(".entry-title a").text().trim(),
        image = $element.find(".meta-image img").attr("src"),
        category = $element.find(".meta-category a").text().trim(),
        link = $element.find(".entry-title a").attr("href");
      articles.push({
        title: title,
        image: image,
        category: category,
        link: link,
      });
    });
    return articles;
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
        category: infoRows.eq(6).find("td").eq(1).find("a").text(),
      },
      features = $("h2 span")
        .last()
        .parent()
        .nextAll("p")
        .map((index, element) => $(element).text())
        .get();
    return {
      title: title,
      caption: caption,
      downloadLink: downloadLink,
      ogImage: ogImage,
      info: info,
      features: features,
    };
  } catch (error) {
    console.error("Error:", error);
    throw error;
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
    console.error("Error:", error);
    return null;
  }
}
