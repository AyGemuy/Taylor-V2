import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "apkhome":
      try {
        const results = await searchApkhome(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Detail lebih lanjut dapat ditemukan di APKHome.")
          .addSelection("Klik di sini")
          .makeSections("APKHome", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Title:* ${item.title}`,
            `📅 *Edition:* ${item.edition}`,
            `${usedPrefix}apkhomeapp ${item.href}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "apkhomeapp":
      try {
        const appInfo = await getApkhome(text);
        if (!appInfo) return m.reply(`Link "${text}" tidak ditemukan :/`);
        const caption =
          `📦 *Detail Aplikasi* 📦\n\n` +
          `📰 *Title:* ${appInfo.title}\n` +
          `📋 *Description:* ${appInfo.description}\n` +
          `📱 *Supported Android:* ${appInfo.supportedAndroid}\n` +
          `📱 *Supported Android Versions:* ${appInfo.supportedAndroidVersions}\n` +
          `🔗 *Download Link:* ${appInfo.downloadLinkURL}\n` +
          `🖼️ *Image:* ${appInfo.ogImageUrl}`;
        await conn.sendFile(m.chat, appInfo.ogImageUrl || "", "", caption, m);
        await conn.sendFile(
          m.chat,
          appInfo.downloadLinkURL || "",
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
handler.help = ["apkhome"];
handler.tags = ["internet"];
handler.command = /^(apkhome|apkhomeapp)$/i;
export default handler;
async function searchApkhome(query) {
  try {
    const url = `https://apkhome.io/id/?s=${encodeURIComponent(query)}`,
      response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      elements = $("li > dl > a");
    return elements
      .map((index, element) => {
        const anchorElement = $(element);
        return {
          href: anchorElement.attr("href"),
          imageSrc:
            anchorElement.find(".l img").attr("data-cfsrc") ||
            anchorElement.find(".l img").attr("src"),
          title: anchorElement.find(".r .p1").text().trim(),
          edition: anchorElement.find(".r p:last-of-type").text().trim(),
        };
      })
      .get();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
async function getApkhome(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      ogImageUrl = $('meta[property="og:image"]').attr("content"),
      gtBlockElement = $("p.gt-block");
    return {
      title: gtBlockElement.find("strong").first().text().trim(),
      description: gtBlockElement.first().text().trim(),
      supportedAndroid: gtBlockElement
        .filter(':contains("Android yang didukung")')
        .next("br")
        .text()
        .trim(),
      supportedAndroidVersions: gtBlockElement
        .filter(':contains("Versi Android yang didukung")')
        .next("br")
        .text()
        .trim(),
      ogImageUrl: ogImageUrl,
      downloadLink: $('a[href^="https://dl2.apkhome.io"]').text().trim(),
      downloadLinkURL: $('a[href^="https://dl2.apkhome.io"]').attr("href"),
    };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
