import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  try {
    switch (command) {
      case "modded1":
        const results = await searchModded(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Detail lebih lanjut dapat ditemukan di Modded-1.")
          .addSelection("Klik di sini")
          .makeSections("Modded-1", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Title:* ${item.title}`,
            `📜 *Meta:* ${item.meta}`,
            `${usedPrefix}modded1app ${item.url}`,
          );
        });
        buttons.run(m.chat, conn, m);
        break;
      case "modded1app":
        const modInfo = await getMod1(text);
        if (!modInfo.url) return m.reply(`URL "${text}" tidak ditemukan :/`);
        const caption =
          `📦 *Detail Mod* 📦\n\n` +
          `🖼️ *Image:* ${modInfo.ogImageUrl}\n` +
          `📜 *Text:* ${modInfo.text}\n` +
          `🔗 *Download Link:* ${modInfo.url}`;
        await conn.sendFile(m.chat, modInfo.ogImageUrl || "", "", caption, m);
        await conn.sendFile(
          m.chat,
          modInfo.url || "",
          modInfo.text || "Aplikasi",
          null,
          m,
          false,
          {
            quoted: m,
            mimetype: "application/vnd.android.package-archive",
          },
        );
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
handler.help = ["modded1"];
handler.tags = ["internet"];
handler.command = /^(modded1|modded1app)$/i;
export default handler;
async function searchModded(query) {
  try {
    const response = await fetch(
        `https://modded-1.com/?s=${encodeURIComponent(query)}`,
      ),
      html = await response.text(),
      $ = cheerio.load(html),
      articles = [];
    $("article").each((index, element) => {
      const article = {
        title: $(element).find(".app-name h2").text().trim(),
        url: $(element).find(".app").attr("href"),
        iconUrl: $(element).find(".app-icon img").attr("src"),
        meta: $(element).find(".app-meta").first().text().trim(),
        categories: $(element)
          .find(".app-meta span")
          .map((index, el) => $(el).text().trim())
          .get(),
      };
      articles.push(article);
    });
    return articles;
  } catch (error) {
    console.error("Error in searchModded:", error);
    return [];
  }
}
async function getMod1(url) {
  try {
    const response = await fetch(
        url.endsWith("/download/0") ? url : `${url}/download/0`,
      ),
      html = await response.text(),
      $ = cheerio.load(html),
      ogImageUrl = $('meta[property="og:image"]').attr("content"),
      link = $("#download").find("a"),
      text = link.text().trim(),
      downloadUrl = link.attr("href");
    return {
      text: text,
      url: downloadUrl,
      ogImageUrl: ogImageUrl,
    };
  } catch (error) {
    console.error("Error in getMod1:", error);
    return {};
  }
}
