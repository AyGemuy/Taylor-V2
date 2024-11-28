import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "apk4free":
      try {
        const results = await searchApk4free(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Keterangan lebih lanjut dapat ditemukan di APK4FREE.")
          .addSelection("Klik di sini")
          .makeSections("APK4FREE", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Title:* ${item.title}`,
            `🏷️ *Tag:* ${item.tag.join(", ")}`,
            `${usedPrefix}apk4freeapp ${item.url}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "apk4freeapp":
      try {
        const res = await getApk4free(text);
        if (!res) return m.reply(`Link "${text}" tidak ditemukan :/`);
        const {
          text: texts = [],
          image: images = [],
          download: downloads = [],
        } = res;
        let caption = "📦 *Detail Aplikasi* 📦\n\n";
        texts.forEach((item) => (caption += `📄 ${item}\n`));
        if (images.length) caption += `\n🖼️ *Images:* ${images.join("\n")}\n`;
        if (downloads.length)
          caption += `\n🔗 *Downloads:* ${downloads.join("\n")}\n`;
        await conn.sendFile(m.chat, images[0] || "", "", caption, m);
        await conn.sendFile(
          m.chat,
          downloads[0] || "",
          texts[0] || "Aplikasi",
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
handler.help = ["apk4free"];
handler.tags = ["internet"];
handler.command = /^(apk4free|apk4freeapp)$/i;
export default handler;
async function searchApk4free(query) {
  const url = `https://apk4free.org/?s=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      articles = [];
    $("article").each((index, element) => {
      const $article = $(element);
      articles.push({
        title: $article.find("h1.title a").text(),
        url: $article.find("h1.title a").attr("href"),
        thumbnail: $article
          .find(".featured-image .thumb.hover-effect span.fullimage")
          .css("background-image")
          .replace(/url\((.*)\)/, "$1"),
        category: $article
          .find('.tags a[href^="https://apk4free.org/category/"]')
          .map((_, tagElement) => $(tagElement).text())
          .get(),
        tag: $article
          .find('.tags a[href^="https://apk4free.org/tag/"]')
          .map((_, tagElement) => $(tagElement).text())
          .get(),
        description: $article.find(".post-excerpt p").text(),
        author: {
          name: $article.find("footer.author-meta a .author-name").text(),
          image: $article
            .find("footer.author-meta a .author-image")
            .css("background-image")
            .replace(/url\('(.*)'\)/, "$1"),
          count: $article
            .find("footer.author-meta a .author-count")
            .text()
            .replace(" Resources", ""),
        },
      });
    });
    return articles;
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
}
async function getApk4free(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      data = [];
    $('section.post-content p, .slider img, strong a[href^="https://"]').each(
      (_, element) => {
        const $element = $(element);
        if ($element.is("p")) {
          const content = $element.text().trim();
          if (content)
            data.push({
              type: "text",
              content: content,
            });
        } else if ($element.is("img")) {
          let src = $element.attr("src");
          if (src.startsWith("//")) src = "https:" + src;
          data.push({
            type: "image",
            src: src,
          });
        } else if ($element.is("a")) {
          let link = $element.attr("href");
          if (link.startsWith("//")) link = "https:" + link;
          data.push({
            type: "download",
            link: link,
          });
        }
      },
    );
    return data.reduce((result, item) => {
      const { type, content, src, link } = item;
      if (type === "text") {
        result.text = result.text || [];
        result.text.push(content);
      } else if (type === "image") {
        result.image = result.image || [];
        result.image.push(src);
      } else if (type === "download") {
        result.download = result.download || [];
        result.download.push(link);
      }
      return result;
    }, {});
  } catch (error) {
    console.error("Error:", error);
  }
}
