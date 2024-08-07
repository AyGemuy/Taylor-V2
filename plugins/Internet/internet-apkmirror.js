import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "app"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.apkmirror search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkmirror search|vpn");
      m.react(wait);
      try {
        let teks = (await searchApkmirror(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n🖼️ *Gambar:* ${decodeURIComponent(item.image) || "Tidak diketahui"}\n🔗 *Tautan:* ${item.link || "Tidak diketahui"}\n📝 *Judul:* ${item.title || "Tidak diketahui"}\n👨‍💻 *Pengembang:* ${item.developer || "Tidak diketahui"}\n📅 *Tanggal Unggah:* ${item.uploadDate || "Tidak diketahui"}\n🆕 *Versi:* ${item.version || "Tidak diketahui"}\n💾 *Ukuran File:* ${item.fileSize || "Tidak diketahui"}\n⬇️ *Unduhan:* ${item.downloads || "Tidak diketahui"}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkmirror app|link");
      m.react(wait);
      try {
        let item = await getApkmirror(inputs),
          cap = `🔍 *[ RESULT ]*\n\n📝 *Judul:* ${item.title || "Tidak diketahui"}\n📷 *Gambar:* ${decodeURIComponent(item.gambar) || "Tidak diketahui"}\n🔗 *Link:* ${item.link || "Tidak diketahui"}\n⬇️ *Linkdl:* ${item.linkdl || "Tidak diketahui"}\n✍️ *DownloadText:* ${item.downloadText || "Tidak diketahui"}\nℹ️ *Author:* ${item.author || "Tidak diketahui"}\n📝 *Info:* ${item.info || "Tidak diketahui"}\n📏 *Description:* ${item.description || "Tidak diketahui"}\n📏 *Size:* ${item.size || "Tidak diketahui"}\n📅 *Tanggal:* ${item.tanggal || "Tidak diketahui"}\n`;
        await conn.sendFile(m.chat, item.gambar, "", cap, m), await conn.sendFile(m.chat, item.linkdl, item.title || "Tidak diketahui", null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["apkmirror"], handler.tags = ["internet"], handler.command = /^(apkmirror)$/i;
export default handler;
async function searchApkmirror(query) {
  const url = `https://www.apkmirror.com/?post_type=app_release&searchtype=apk&s=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url),
      body = await response.text(),
      $ = cheerio.load(body);
    return $(".appRow").map((_, element) => ({
      image: "https://www.apkmirror.com" + $(element).find(".ellipsisText").attr("src"),
      link: "https://www.apkmirror.com" + $(element).find(".appRowTitle a").attr("href"),
      title: $(element).find(".appRowTitle a").text().trim(),
      developer: $(element).find(".byDeveloper").text().trim(),
      uploadDate: $(element).find(".dateyear_utc").text().trim(),
      version: $(element).next(".infoSlide").find(".infoSlide-value").eq(0).text().trim(),
      fileSize: $(element).next(".infoSlide").find(".infoSlide-value").eq(2).text().trim(),
      downloads: $(element).next(".infoSlide").find(".infoSlide-value").eq(3).text().trim()
    })).get().filter(obj => Object.values(obj).every(value => "" !== value));
  } catch (error) {
    throw error;
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
          apkUrl: "https://www.apkmirror.com" + $s(row).find("a.accent_color").attr("href"),
          downloadDate: $s(row).find(".dateyear_utc").data("utcdate")
        };
        Object.values(rowData).some(value => void 0 !== value && "" !== value) && result.push(rowData);
      });
      const response3 = await fetch(result[1].apkUrl),
        html3 = await response3.text(),
        link3 = "https://www.apkmirror.com" + cheerio.load(html3)(".downloadButton").attr("href"),
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
        description: $("#description .notes").text().trim()
      };
    } {
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
        tanggal: $(".appspec-row:last-child .appspec-value .datetime_utc").attr("data-utcdate")
      };
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}