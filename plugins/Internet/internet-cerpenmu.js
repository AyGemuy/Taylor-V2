import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  const inputs = text ? text.split(" ") : [];
  const categoryIndex = inputs[0] ? parseInt(inputs[0], 10) : null;
  const articleIndex = inputs[1] ? parseInt(inputs[1], 10) : null;
  const page = inputs[2] ? parseInt(inputs[2], 10) : null;
  try {
    switch (command) {
      case "cerpenmu":
        let categoriesData;
        try {
          categoriesData = await getCategories();
        } catch (error) {
          return m.reply("Gagal mendapatkan kategori cerpen.");
        }
        if (!categoriesData.length)
          return m.reply("Tidak ada kategori cerpen yang ditemukan.");
        if (!categoryIndex) {
          const categoriesButtons = conn.ctaButton
            .setBody("Pilih kategori cerpen di bawah ini.")
            .setFooter("Cerpen diambil dari Cerpenmu.com")
            .addSelection("Klik di sini")
            .makeSections("Kategori Cerpen", "Pilih kategori");
          categoriesData.forEach((category, index) => {
            categoriesButtons.makeRow(
              `📚 *[ KATEGORI ${index + 1} ]*`,
              `📖 *Judul:* ${category.name}`,
              `📑 *Total Cerpen:* ${category.count}`,
              `${usedPrefix}cerpenmu ${index + 1}`,
            );
          });
          categoriesButtons.run(m.chat, conn, m);
        } else if (categoryIndex <= categoriesData.length) {
          const category = categoriesData[categoryIndex - 1];
          let articlesData;
          try {
            const pageUrl = page && page > 0 ? `/page/${page}` : "";
            articlesData = await getArticles(category.link + pageUrl);
          } catch (error) {
            return m.reply("Gagal mendapatkan artikel dalam kategori ini.");
          }
          if (!articlesData.articles.length)
            return m.reply(
              "Tidak ada artikel yang ditemukan dalam kategori ini.",
            );
          if (!articleIndex) {
            const articlesButtons = conn.ctaButton
              .setBody(
                `Pilih artikel dalam kategori *${category.name}* di bawah ini.`,
              )
              .setFooter("Artikel diambil dari Cerpenmu.com")
              .addSelection("Klik di sini")
              .makeSections("Artikel Cerpen", "Pilih artikel");
            articlesData.articles.forEach((article, index) => {
              articlesButtons.makeRow(
                `📖 *[ ARTIKEL ${index + 1} ]*`,
                `📖 *Judul:* ${article.title}`,
                `✍️ *Penulis:* ${article.author}`,
                `${usedPrefix}cerpenmu ${categoryIndex} ${index + 1}`,
              );
            });
            articlesButtons.run(m.chat, conn, m);
          } else if (articleIndex <= articlesData.articles.length) {
            const article = articlesData.articles[articleIndex - 1];
            const contentUrl = article.link;
            let articleContent;
            try {
              articleContent = await getArticleDetails(contentUrl);
            } catch (error) {
              return m.reply("Gagal mengambil konten artikel.");
            }
            const caption =
              `📖 *Judul:* ${articleContent.title}\n` +
              `✍️ *Penulis:* ${articleContent.author}\n` +
              `🏷️ *Kategori:* ${articleContent.categories.join(", ")}\n\n` +
              `📜 *Konten:* ${articleContent.content}`;
            await conn.reply(m.chat, caption, m, {
              contextInfo: {
                mentionedJid: [m.sender],
              },
            });
            m.react(sukses);
          } else {
            m.reply("Nomor artikel tidak valid.");
          }
        } else {
          m.reply("Nomor kategori tidak valid.");
        }
        break;
      default:
        m.reply("Perintah tidak dikenali.");
        break;
    }
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
  }
};
handler.help = ["cerpenmu"];
handler.tags = ["internet"];
handler.command = /^(cerpenmu)$/i;
export default handler;
async function getCategories() {
  try {
    const response = await fetch("https://cerpenmu.com");
    const $ = cheerio.load(await response.text());
    return $(".cat-item")
      .map((_, el) => ({
        name: $(el).find("a").text().trim(),
        link: $(el).find("a").attr("href"),
        count: parseInt($(el).text().replace(/\D/g, "") || "0"),
      }))
      .get();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
}
const getArticles = async (url) => {
  try {
    const $ = cheerio.load(await (await fetch(url)).text());
    const articles = $("article.post")
      .map((_, el) => ({
        title: $(el).find("h2 a").text().trim(),
        link: $(el).find("h2 a").attr("href"),
        author: $(el).find('a[rel="tag"]').text().trim(),
        published: $(el)
          .text()
          .match(/Lolos Moderasi Pada: (.*)/)[1]
          .trim(),
        summary: $(el).find("blockquote").text().trim(),
      }))
      .get();
    const pagesMatch = $(".wp-pagenavi .pages")
      .text()
      .match(/Page \d+ of (\d+):/);
    const pages = pagesMatch ? parseInt(pagesMatch[1]) : 1;
    return {
      articles: articles,
      pages: pages,
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};
async function getArticleDetails(url) {
  try {
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);
    return {
      title: $("article.post h1").text().trim(),
      author: $('a[rel="tag"]').first().text().trim(),
      categories: $('a[rel="category tag"]')
        .map((_, el) => $(el).text().trim())
        .get(),
      content: $("article.post p").text().trim(),
    };
  } catch (error) {
    console.error("Failed to fetch article details:", error);
    throw error;
  }
}
