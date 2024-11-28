import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "apkfab":
      try {
        const results = await fetchSearchResults(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Detail lebih lanjut dapat ditemukan di APKFAB.")
          .addSelection("Klik di sini")
          .makeSections("APKFAB", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Title:* ${item.title}`,
            `⭐ *Rating:* ${item.rating}`,
            `${usedPrefix}apkfabapp ${item.link}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "apkfabapp":
      try {
        const appInfo = await fetchDownloadDetails(text);
        if (!appInfo) return m.reply(`Link "${text}" tidak ditemukan :/`);
        const caption =
          `📦 *Detail Aplikasi* 📦\n\n` +
          `📰 *Title:* ${appInfo.title}\n` +
          `🔗 *Download Link:* ${appInfo.downloadURL}\n` +
          `💾 *Direct Link:* ${appInfo.link}`;
        await conn.sendFile(m.chat, appInfo.link || "", "", caption, m);
        await conn.sendFile(
          m.chat,
          appInfo.downloadURL || "",
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
handler.help = ["apkfab"];
handler.tags = ["internet"];
handler.command = /^(apkfab|apkfabapp)$/i;
export default handler;
async function fetchSearchResults(q) {
  try {
    const url = `https://apkfab.com/search?q=${encodeURIComponent(q)}`,
      response = await fetch(url),
      body = await response.text(),
      $ = cheerio.load(body);
    return $(".list-template.lists .list")
      .map((index, element) => ({
        title: $(element).find(".title").text().trim(),
        link: $(element).find("a").attr("href"),
        image: $(element).find(".icon img").attr("data-src"),
        rating: $(element).find(".other .rating").text().trim(),
        review: $(element).find(".other .review").text().trim(),
      }))
      .get();
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
}
async function fetchDownloadDetails(url) {
  try {
    const response = await fetch(
        url.endsWith("/download") ? url : url + "/download",
      ),
      body = await response.text(),
      $ = cheerio.load(body),
      title = $(".download_button_box a.down_btn").attr("title"),
      link = $(".download_button_box a.down_btn").attr("href"),
      downloadURL = `https://d.apkpure.com/b/APK/${link.split("/")[4]}?version=latest`;
    return {
      title: title,
      link: link,
      downloadURL: downloadURL,
    };
  } catch (error) {
    console.error("Error fetching download details:", error);
  }
}
