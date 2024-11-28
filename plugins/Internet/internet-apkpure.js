import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "apkpures":
      try {
        const results = await searchApkpures(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Detail lebih lanjut dapat ditemukan di APKPure.")
          .addSelection("Klik di sini")
          .makeSections("APKPures", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Name:* ${item.name}`,
            `🔧 *Version:* ${item.version}`,
            `${usedPrefix}apkpureapp ${item.link}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "apkpureapp":
      try {
        const appInfo = await getApkpure(text);
        if (!appInfo) return m.reply(`Link "${text}" tidak ditemukan :/`);
        const caption =
          `📦 *Detail Aplikasi* 📦\n\n` +
          `🔗 *Download Link:* ${appInfo.link}\n` +
          `📰 *Title:* ${appInfo.title}`;
        await conn.sendFile(m.chat, appInfo.img || "", "", caption, m);
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
handler.help = ["apkpures"];
handler.tags = ["internet"];
handler.command = /^(apkpures|apkpureapp)$/i;
export default handler;
async function searchApkpures(q) {
  try {
    const end = "https://m.apkpure.com",
      url = `${end}/cn/search?q=${encodeURIComponent(q)}&t=app`,
      response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      searchData = [];
    $("ul.search-res li").each((index, element) => {
      const $element = $(element),
        obj = {
          link: end + $element.find("a.dd").attr("href"),
          image: $element.find("img").attr("src"),
          name: $element.find(".p1").text().trim(),
          developer: $element.find(".p2").text().trim(),
          tags: $element
            .find(".tags .tag")
            .map((i, el) => $(el).text().trim())
            .get(),
          downloadLink:
            end + $element.find(".right_button a.is-download").attr("href"),
          fileSize: $element
            .find(".right_button a.is-download")
            .data("dt-filesize"),
          version: $element
            .find(".right_button a.is-download")
            .data("dt-version"),
          versionCode: $element
            .find(".right_button a.is-download")
            .data("dt-versioncode"),
        };
      searchData.push(obj);
    });
    return searchData;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
async function getApkpure(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      linkTag = $('link[rel="canonical"]').attr("href"),
      titleTag = $('meta[property="og:title"]').attr("content"),
      imgTag = $('meta[property="og:image"]').attr("content"),
      downloadURL = `https://d.apkpure.com/b/APK/${linkTag.split("/")[5]}?version=latest`;
    return {
      link: downloadURL,
      title: titleTag,
      img: imgTag,
    };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
