import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "apkmirror":
      try {
        const results = await searchApkmirror(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Detail lebih lanjut dapat ditemukan di APKMirror.")
          .addSelection("Klik di sini")
          .makeSections("APKMirror", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Title:* ${item.title}`,
            `📦 *Version:* ${item.version}`,
            `${usedPrefix}apkmirrorapp ${item.link}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "apkmirrorapp":
      try {
        const appInfo = await getApkmirror(text);
        if (!appInfo) return m.reply(`Link "${text}" tidak ditemukan :/`);
        const caption =
          `📦 *Detail Aplikasi* 📦\n\n` +
          `📝 *Title:* ${appInfo.title}\n` +
          `🖼️ *Image:* ${appInfo.gambar}\n` +
          `🔗 *Link:* ${appInfo.link}\n` +
          `🔗 *Download Link:* ${appInfo.linkdl}\n` +
          `🖋️ *Download Text:* ${appInfo.downloadText}\n` +
          `✍️ *Author:* ${appInfo.author}\n` +
          `📝 *Info:* ${appInfo.info}\n` +
          `📝 *Description:* ${appInfo.description}\n` +
          `📏 *Size:* ${appInfo.size || "N/A"}\n` +
          `📅 *Date:* ${appInfo.tanggal || "N/A"}`;
        await conn.sendFile(m.chat, appInfo.gambar || "", "", caption, m);
        await conn.sendFile(
          m.chat,
          appInfo.linkdl || "",
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
handler.help = ["apkmirror"];
handler.tags = ["internet"];
handler.command = /^(apkmirror|apkmirrorapp)$/i;
export default handler;
async function searchApkmirror(query) {
  const url = `https://www.apkmirror.com/?post_type=app_release&searchtype=apk&s=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url),
      body = await response.text(),
      $ = cheerio.load(body);
    return $(".appRow")
      .map((_, element) => ({
        image:
          "https://www.apkmirror.com" +
          $(element).find(".ellipsisText").attr("src"),
        link:
          "https://www.apkmirror.com" +
          $(element).find(".appRowTitle a").attr("href"),
        title: $(element).find(".appRowTitle a").text().trim(),
        developer: $(element).find(".byDeveloper").text().trim(),
        uploadDate: $(element).find(".dateyear_utc").text().trim(),
        version: $(element)
          .next(".infoSlide")
          .find(".infoSlide-value")
          .eq(0)
          .text()
          .trim(),
        fileSize: $(element)
          .next(".infoSlide")
          .find(".infoSlide-value")
          .eq(2)
          .text()
          .trim(),
        downloads: $(element)
          .next(".infoSlide")
          .find(".infoSlide-value")
          .eq(3)
          .text()
          .trim(),
      }))
      .get()
      .filter((obj) => Object.values(obj).every((value) => value !== ""));
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
async function getApkmirror(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      link = "https://www.apkmirror.com" + $(".downloadButton").attr("href");
    if (link.includes("#downloads")) {
      const link2 = $('meta[property="og:url"]').attr("content") + "#downloads",
        responses2 = await fetch(link2),
        htmls2 = await responses2.text(),
        $s = cheerio.load(htmls2),
        result = [];
      $s(".table-row.headerFont").each((index, row) => {
        const rowData = {
          version: $s(row).find("a.accent_color").text().trim(),
          bundle: $s(row).find(".apkm-badge.success").eq(0).text().trim(),
          splits: $s(row).find(".apkm-badge.success").eq(1).text().trim(),
          apkUrl:
            "https://www.apkmirror.com" +
            $s(row).find("a.accent_color").attr("href"),
          downloadDate: $s(row).find(".dateyear_utc").data("utcdate"),
        };
        if (
          Object.values(rowData).some(
            (value) => value !== undefined && value !== "",
          )
        ) {
          result.push(rowData);
        }
      });
      const response3 = await fetch(result[1]?.apkUrl),
        html3 = await response3.text(),
        link3 =
          "https://www.apkmirror.com" +
          cheerio.load(html3)(".downloadButton").attr("href"),
        response2 = await fetch(link3),
        html2 = await response2.text(),
        formElement2 = cheerio.load(html2)("#filedownload"),
        id2 = formElement2.find('input[name="id"]').attr("value"),
        linkdl = `https://www.apkmirror.com/wp-content/themes/APKMirror/download.php?id=${id2}&key=${formElement2.find('input[name="key"]').attr("value")}`;
      return {
        title: $('meta[property="og:title"]').attr("content"),
        gambar: $('meta[property="og:image"]').attr("content"),
        link: link,
        linkdl: linkdl,
        downloadText: $(".downloadButton").text().trim(),
        author: url.split("/")[4].toUpperCase(),
        info: $(".infoSlide").text().trim(),
        description: $("#description .notes").text().trim(),
      };
    } else {
      const response2 = await fetch(link),
        html2 = await response2.text(),
        formElement = cheerio.load(html2)("#filedownload"),
        id = formElement.find('input[name="id"]').attr("value"),
        key = formElement.find('input[name="key"]').attr("value"),
        linkdl = `https://www.apkmirror.com/wp-content/themes/APKMirror/download.php?id=${id}&key=${key}&forcebaseapk=${formElement.find('input[name="forcebaseapk"]').attr("value")}`;
      return {
        title: $('meta[property="og:title"]').attr("content"),
        gambar: $('meta[property="og:image"]').attr("content"),
        link: link,
        linkdl: linkdl,
        downloadText: $(".downloadButton").text().trim(),
        author: url.split("/")[4].toUpperCase(),
        info: $(".appspec-value").text().trim(),
        description: $("#description .notes").text().trim(),
        size: $(".appspec-row:nth-child(2) .appspec-value").text().trim(),
        tanggal: $(".appspec-row:last-child .appspec-value .datetime_utc").attr(
          "data-utcdate",
        ),
      };
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return null;
  }
}
