import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "apkhouse":
      try {
        const results = await searchApkhouse(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Detail lebih lanjut dapat ditemukan di APKHouse.")
          .addSelection("Klik di sini")
          .makeSections("APKHouse", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Title:* ${item.title}`,
            `📦 *Version:* ${item.version}`,
            `${usedPrefix}apkhouseapp ${item.href}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "apkhouseapp":
      try {
        const appInfo = await getApkhouse(text);
        if (!appInfo) return m.reply(`Link "${text}" tidak ditemukan :/`);
        const caption =
          `📦 *Detail Aplikasi* 📦\n\n` +
          `🔗 *Download Links:* ${appInfo.map((link) => `- ${link.text}: ${link.link}`).join("\n")}\n` +
          `🖼️ *Image:* ${appInfo.ogImageUrl}`;
        await conn.sendFile(m.chat, appInfo.ogImageUrl || "", "", caption, m);
        await conn.sendFile(
          m.chat,
          appInfo.map((link) => link.link)[0] || "",
          appInfo.map((link) => link.text)[0] || "Aplikasi",
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
handler.help = ["apkhouse"];
handler.tags = ["internet"];
handler.command = /^(apkhouse|apkhouseapp)$/i;
export default handler;
async function searchApkhouse(query) {
  try {
    const url = `https://apk-house.com/?s=${encodeURIComponent(query)}`,
      response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $(".bloque-app")
      .map((index, element) => {
        const appElement = $(element),
          linkElement = appElement.find("a"),
          imageElement = appElement.find("img"),
          titleElement = appElement.find(".title"),
          developerElement = appElement.find(".developer"),
          versionElement = appElement.find(".version"),
          ratingElement = appElement.find(".stars");
        return {
          href: linkElement.attr("href"),
          imageSrc: imageElement.attr("data-src"),
          alt: imageElement.attr("alt"),
          title: titleElement.text().trim(),
          developer: developerElement.text().trim(),
          version: versionElement.text().trim(),
          rating:
            ratingElement
              .attr("style")
              ?.replace("width:", "")
              .replace("%", "")
              .trim() || "N/A",
        };
      })
      .get();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
async function getApkhouse(url) {
  try {
    const response = await fetch(
        url.endsWith("?download=links") ? url : url + "?download=links",
      ),
      html = await response.text(),
      $ = cheerio.load(html);
    return $(".bx-download li")
      .map((index, element) => {
        const linkElement = $(element).find("a");
        return {
          link: linkElement.attr("href"),
          text: linkElement.text().trim(),
          ogImageUrl: $('meta[property="og:image"]').attr("content"),
        };
      })
      .get();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
