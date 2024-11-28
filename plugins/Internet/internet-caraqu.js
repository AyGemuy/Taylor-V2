import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  const inputs = text ? text.split("|") : [];
  const query = (inputs[0] || "").trim();
  const searchIndex = parseInt((inputs[1] || "").trim(), 10);
  try {
    switch (command.toLowerCase()) {
      case "caraqu":
        if (!query) {
          m.reply("Mohon masukkan query pencarian.");
          return;
        }
        const searchResults = await searchCaraqu(query);
        if (searchResults.length === 0) {
          m.reply("Tidak ada hasil ditemukan.");
          return;
        }
        const searchButtons = conn.ctaButton
          .setBody("Pilih kategori cerpen di bawah ini.")
          .setFooter("Cerpen diambil dari Caraqu.com")
          .addSelection("Klik di sini")
          .makeSections("Kategori Cerpen", "Pilih kategori");
        searchResults.forEach((result, index) => {
          searchButtons.makeRow(
            `📖 *[ ARTIKEL ${index + 1} ]*`,
            `📖 *Judul:* ${result.title}`,
            `📅 *Excerpt:* ${result.excerpt}`,
            `${usedPrefix}caraquread ${query}|${index + 1}`,
          );
        });
        searchButtons.run(m.chat, conn, m);
        break;
      case "caraquread":
        if (isNaN(searchIndex) || searchIndex <= 0 || !query) {
          m.reply(
            "Nomor artikel tidak valid. Mohon masukkan nomor yang benar.",
          );
          return;
        }
        const results = await searchCaraqu(query);
        if (searchIndex <= results.length) {
          const article = results[searchIndex - 1];
          const content = await detailCaraqu(article.link);
          if (content) {
            const caption =
              `📖 *Judul:* ${content.title}\n` +
              `✍️ *Penulis:* ${content.author}\n` +
              `📅 *Tanggal Terakhir Diperbarui:* ${content.lastUpdated}\n\n` +
              `📜 *Konten:* ${content.content}\n\n` +
              `🔗 *Breadcrumb:* ${content.breadcrumb.map((b) => `- ${b.text} (${b.url})`).join("\n")}`;
            await conn.sendFile(m.chat, content.ogImage || "", "", caption, m);
            m.react(sukses);
          } else {
            m.reply("Gagal mengambil detail artikel.");
          }
        } else {
          m.reply("Nomor artikel tidak valid.");
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
handler.help = ["caraqu"];
handler.tags = ["internet"];
handler.command = /^(caraqu|caraquread)$/i;
export default handler;
async function searchCaraqu(query) {
  try {
    const url = `https://www.caraqu.com/?s=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    return (
      $("#posts-container .post-item")
        .map((_, el) => {
          const postElement = $(el);
          return {
            title: postElement.find(".post-title a").text().trim() || "",
            link: postElement.find(".post-title a").attr("href") || "",
            excerpt: postElement.find(".post-excerpt").text().trim() || "",
            image: postElement.find(".post-thumb img").attr("src") || "",
          };
        })
        .get() || []
    );
  } catch (error) {
    console.error("Error fetching data from Caraqu:", error);
    return [];
  }
}
async function detailCaraqu(url) {
  try {
    const html = await (await fetch(url)).text();
    const $ = cheerio.load(html);
    const content = $(".entry-content.entry").clone();
    content.find("script, style").remove();
    content
      .find("*")
      .contents()
      .filter((_, el) => el.nodeType === 3 && !el.nodeValue.trim())
      .remove();
    return {
      title: $(".post-title.entry-title").text().trim() || "",
      author: $(".author-meta .meta-author a").text().trim() || "",
      lastUpdated:
        $("#single-post-meta .last-updated")
          .text()
          .replace("Last Updated: ", "")
          .trim() || "",
      content: content.text().trim() || "",
      ogImage: $('meta[property="og:image"]').attr("content") || "",
      breadcrumb:
        $("#breadcrumb a")
          .map((_, el) => ({
            text: $(el).text().trim() || "",
            url: $(el).attr("href") || "",
          }))
          .get() || [],
    };
  } catch (error) {
    console.error("Error fetching article details:", error);
    return null;
  }
}
