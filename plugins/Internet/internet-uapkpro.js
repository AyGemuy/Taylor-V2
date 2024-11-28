import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  try {
    switch (command) {
      case "uapkpro":
        try {
          const results = await searchUapkpro(text);
          if (!results.length)
            return m.reply(`Query "${text}" tidak ditemukan :/`);
          const buttons = conn.ctaButton
            .setBody("Pilih aplikasi di bawah ini.")
            .setFooter("Detail lebih lanjut dapat ditemukan di UAPKPro.")
            .addSelection("Klik di sini")
            .makeSections("UAPKPro", "Pilih aplikasi");
          results.forEach((item, index) => {
            buttons.makeRow(
              `🔍 *[ RESULT ${index + 1} ]*`,
              `📖 *Title:* ${item.title}`,
              `⭐ *Rating:* ${item.rating}`,
              `${usedPrefix}uapkproapp ${item.url}`,
            );
          });
          buttons.run(m.chat, conn, m);
        } catch (searchError) {
          console.error("Error in searchUapkpro:", searchError);
          m.reply("Terjadi kesalahan saat mencari aplikasi.");
          m.react(eror);
        }
        break;
      case "uapkproapp":
        try {
          const appInfo = await getUapkpro(text);
          if (!appInfo) return m.reply(`URL "${text}" tidak ditemukan :/`);
          const caption =
            `📦 *Detail Aplikasi* 📦\n\n` +
            `📱 *Supported Android:* ${appInfo.supportedAndroid}\n` +
            `📖 *Title:* ${appInfo.title}\n` +
            `🔗 *Download Link:* ${appInfo.downloadLink}\n` +
            `🖼️ *Image:* ${appInfo.ogImageUrl}`;
          await conn.sendFile(m.chat, appInfo.ogImageUrl || "", "", caption, m);
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
        } catch (appError) {
          console.error("Error in getUapkpro:", appError);
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
handler.help = ["uapkpro"];
handler.tags = ["tools"];
handler.command = /^(uapkpro|uapkproapp)$/i;
export default handler;
async function searchUapkpro(query) {
  try {
    const url = `https://uapk.pro/?s=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const result = [];
    $(".col-md-2.col-sm-4.col-xs-6").each((index, element) => {
      const obj = {
        title: $(element).find(".inner-box a[href]").text().trim(),
        url: $(element).find(".inner-box a[href]").attr("href"),
        category: $(element).find(".detail .sub-detail a").text().trim(),
        rating: $(element).find(".detail .display-rating").text().trim(),
        downloadUrl: $(element).find("a[href].anchor-hover").attr("href"),
      };
      result.push(obj);
    });
    return result;
  } catch (error) {
    console.error("Error in searchUapkpro:", error);
    return [];
  }
}
async function getUapkpro(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const ogImageUrl = $('meta[property="og:image"]').attr("content");
    return {
      supportedAndroid: $("p strong").text().trim(),
      title: $("h1").text().trim(),
      downloadLink: $("p a").attr("href"),
      ogImageUrl: ogImageUrl,
    };
  } catch (error) {
    console.error("Error in getUapkpro:", error);
    return null;
  }
}
