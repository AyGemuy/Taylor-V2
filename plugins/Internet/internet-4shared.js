import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "4shared":
      try {
        const results = await search4shared(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih item di bawah ini.")
          .setFooter("Detail lebih lanjut dapat ditemukan di 4shared.")
          .addSelection("Klik di sini")
          .makeSections("4Shared", "Pilih item");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📜 *Title:* ${item.title}`,
            `📦 *Size:* ${item.size}`,
            `${usedPrefix}4sharedapp ${item.link}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "4sharedapp":
      try {
        const appInfo = await app4shared(text);
        if (!appInfo) return m.reply(`Link "${text}" tidak ditemukan :/`);
        const caption =
          `📦 *Detail Aplikasi* 📦\n\n` +
          `🖼️ *Image:* ${appInfo.ogImageUrl}\n` +
          `📜 *Title:* ${appInfo.text}\n` +
          `🔗 *URL:* ${appInfo.url}`;
        await conn.sendFile(m.chat, appInfo.ogImageUrl, "", caption, m);
        await conn.sendFile(
          m.chat,
          appInfo.url,
          appInfo.text || "Aplikasi",
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
handler.help = ["4shared"];
handler.tags = ["internet"];
handler.command = /^(4shared|4sharedapp)$/i;
export default handler;
async function search4shared(query) {
  try {
    const url = `https://www.4shared.com/web/q/?query=${encodeURIComponent(query)}`;
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $(".col-xs-12.jsSearchItemColumn.jsVisibleItemColumn")
      .map((index, element) => {
        const $element = $(element);
        return {
          author: $element.find(".author a").text(),
          title: $element.find(".namePlus a").text(),
          link: $element.find(".namePlus a").attr("href"),
          date: $element.find(".date").text(),
          time: $element.find(".time").text(),
          size: $element
            .find('.meta-info span:contains("Size")')
            .text()
            .replace("Size", "")
            .trim(),
          bitrate: $element
            .find('.meta-info span:contains("Bitrate")')
            .text()
            .replace("Bitrate", "")
            .trim(),
          tags: $element
            .find(".meta-tags div")
            .map((index, tagElement) => $(tagElement).text())
            .get(),
        };
      })
      .get();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
async function app4shared(link) {
  return {
    text: "Example App Name",
    url: link,
    ogImageUrl: "https://example.com/image.png",
  };
}
