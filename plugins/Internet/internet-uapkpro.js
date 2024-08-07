import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "uapkpro":
      try {
        let res = await searchUapkpro(text);
        if (!res.length) return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton.setBody("Pilih aplikasi di bawah ini.").setFooter("Keterangan lebih lanjut dapat ditemukan di APK-DL.").addSelection("Klik di sini").makeSections("Apk-dl", "rekomendasi");
        res.forEach(item => {
          buttons.makeRow("", `${item.title}`, `Dapatkan ${item.title}`, `${usedPrefix}uapkprodl ${item.url}`);
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "uapkprodl":
      try {
        let res = await getUapkpro(text);
        if (!res) return m.reply(`Query "${text}" tidak ditemukan :/`);
        const {
          supportedAndroid,
          title,
          ogImageUrl,
          downloadLink
        } = res || {};
        const caption = `📦 *Info Aplikasi* 📦\n\n` + `📌 *Nama:* ${title || "Tidak tersedia"}\n` + `⭐ *Support:* ${supportedAndroid || "Tidak tersedia"}\n`;
        await conn.sendFile(m.chat, ogImageUrl || "", "", caption, m);
        await conn.sendFile(m.chat, downloadLink || "", title || "Aplikasi", null, m, true, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
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
handler.help = ["uapkpro"];
handler.tags = ["tools"];
handler.command = /^(uapkpro|uapkprodl)$/i;
export default handler;
async function searchUapkpro(q) {
  try {
    const url = "https://uapk.pro/?s=" + q;
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
        downloadUrl: $(element).find("a[href].anchor-hover").attr("href")
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
      supportedAndroid: $("p strong").text(),
      title: $("h1").text(),
      downloadLink: $("p a").attr("href"),
      ogImageUrl: ogImageUrl
    };
  } catch (error) {
    console.error("Error in getUapkpro:", error);
    return null;
  }
}