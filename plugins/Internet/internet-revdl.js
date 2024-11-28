import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  try {
    switch (command) {
      case "revdl":
        try {
          const results = await searchRevdl(text);
          if (!results.length)
            return m.reply(`Query "${text}" tidak ditemukan :/`);
          const buttons = conn.ctaButton
            .setBody("Pilih hasil pencarian di bawah ini.")
            .setFooter("Detail lebih lanjut dapat ditemukan di RevDL.")
            .addSelection("Klik di sini")
            .makeSections("RevDL", "Pilih hasil");
          results.forEach((item, index) => {
            buttons.makeRow(
              `🔍 *[ RESULT ${index + 1} ]*`,
              `📰 *Title:* ${item.title}`,
              `📜 *Excerpt:* ${item.excerpt}`,
              `${usedPrefix}revdlapp ${item.titleUrl}`,
            );
          });
          buttons.run(m.chat, conn, m);
        } catch (searchError) {
          console.error("Error in searchRevdl:", searchError);
          m.reply("Terjadi kesalahan saat mencari aplikasi.");
          m.react(eror);
        }
        break;
      case "revdlapp":
        m.reply(`Detail aplikasi dapat ditemukan di: ${text}`);
        m.react(sukses);
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
handler.help = ["revdl"];
handler.tags = ["internet"];
handler.command = /^(revdl|revdlapp)$/i;
export default handler;
async function searchRevdl(query) {
  const url = `https://www.revdl.com/?s=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    return $(".full-left")
      .map((index, element) => {
        const $element = $(element),
          titleLink = $element.find(".post-title a");
        return {
          title: titleLink.text().trim(),
          titleUrl: titleLink.attr("href"),
          imageUrl: $element.find("img").attr("src"),
          categoryTags: $element
            .find(".entry_categories a")
            .map((index, el) => $(el).text())
            .get(),
          postedBy: $element.find(".vcard .fn").text().trim(),
          postDate: $element.find(".post-date").text().trim(),
          excerpt: $element.find(".maga-excerpt p").text().trim(),
        };
      })
      .get();
  } catch (error) {
    console.error("Error in searchRevdl:", error);
    return [];
  }
}
