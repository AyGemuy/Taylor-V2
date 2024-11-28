import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  try {
    switch (command) {
      case "playmods":
        try {
          const results = await searchApp(text);
          if (!results.length)
            return m.reply(`Query "${text}" tidak ditemukan :/`);
          const buttons = conn.ctaButton
            .setBody("Pilih aplikasi di bawah ini.")
            .setFooter("Detail lebih lanjut dapat ditemukan di PlayMods.")
            .addSelection("Klik di sini")
            .makeSections("PlayMods", "Pilih aplikasi");
          results.forEach((item, index) => {
            buttons.makeRow(
              `🔍 *[ RESULT ${index + 1} ]*`,
              `📰 *Title:* ${item.title}`,
              `📚 *Detail:* ${item.detail}`,
              `${usedPrefix}playmodsapp ${item.link}`,
            );
          });
          buttons.run(m.chat, conn, m);
        } catch (searchError) {
          console.error("Error in searchApp:", searchError);
          m.reply("Terjadi kesalahan saat mencari aplikasi.");
          m.react(eror);
        }
        break;
      case "playmodsapp":
        try {
          const appInfo = await getApp(text);
          if (!appInfo.link) return m.reply(`URL "${text}" tidak ditemukan :/`);
          const caption =
            `📦 *Detail Aplikasi* 📦\n\n` +
            `🖼️ *Image:* ${appInfo.image}\n` +
            `📱 *Name:* ${appInfo.name}\n` +
            `⭐ *Score:* ${appInfo.score}\n` +
            `📅 *Edisi:* ${appInfo.edisi}\n` +
            `📏 *Size:* ${appInfo.size}\n` +
            `📅 *Create:* ${appInfo.create}\n` +
            `🔗 *Download Link:* ${appInfo.link}\n` +
            `📜 *Detail:* ${appInfo.detail}\n\n` +
            `🖼️ *Screenshots:* ${appInfo.screenshots.join("\n")}\n` +
            `📜 *Deskripsi:* ${appInfo.describe}`;
          await conn.sendFile(m.chat, appInfo.image || "", "", caption, m);
          await conn.sendFile(
            m.chat,
            appInfo.link || "",
            appInfo.name || "Aplikasi",
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
          console.error("Error in getApp:", appError);
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
handler.help = ["playmods"];
handler.tags = ["internet"];
handler.command = /^(playmods|playmodsapp)$/i;
export default handler;
async function searchApp(query) {
  try {
    const url = `https://m.playmods.net/id/search/${encodeURIComponent(query)}`,
      response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      dataArray = [];
    $("a.beautify.ajax-a-1").each((index, element) => {
      const $element = $(element),
        data = {
          link: "https://m.playmods.net" + $element.attr("href"),
          title: $element
            .find(".common-exhibition-list-detail-name")
            .text()
            .trim(),
          detail: $element
            .find(".common-exhibition-list-detail-txt")
            .text()
            .trim(),
          image: $element
            .find(".common-exhibition-list-icon img")
            .attr("data-src"),
        };
      dataArray.push(data);
    });
    return dataArray;
  } catch (error) {
    console.error("Error in searchApp:", error);
    return [];
  }
}
async function getApp(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return {
      title: $("h1.name").text().trim(),
      image: $(".icon").attr("src"),
      name: $(".app-name span").text().trim(),
      score: $(".score").text().trim(),
      edisi: $(".edition").text().trim(),
      size: $(".size .operate-cstTime").text().trim(),
      create: $(".size span").text().trim(),
      link: $("a.a_download").attr("href"),
      detail: $(".game-describe-gs").text().trim(),
      screenshots: $(".swiper-slide img")
        .map((index, element) => $(element).attr("data-src"))
        .get(),
      describe: $(".datail-describe-pre div").text().trim(),
    };
  } catch (error) {
    console.error("Error in getApp:", error);
    return {};
  }
}
