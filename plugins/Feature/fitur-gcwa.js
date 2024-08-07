import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  text,
  usedPrefix,
  command
}) => {
  let [query, num] = text.trim().split("|");
  if (!query) return m.reply("ℹ️ Masukkan kata kunci pencarian.\nContoh penggunaan: gcwa anime|2");
  m.react(wait);
  try {
    const links = await getAllLinks(query);
    if (links.length === 0) {
      return m.reply(`Tidak ditemukan hasil untuk query "${query}".`);
    }
    if (!num) {
      const buttons = conn.ctaButton.setBody(`Pilih nomor untuk melihat detail grup WhatsApp:\n\n${links.map((link, idx) => `*${idx + 1}.* ${link.title}`).join("\n")}`).setFooter("Klik tombol di bawah untuk memilih hasil.").addSelection("Pilih Hasil").makeSections("Daftar Hasil", "Pilih Hasil");
      links.forEach((link, index) => buttons.makeRow("", link.title, `Pilih ${link.title}`, `${usedPrefix + command} ${query}|${index + 1}`));
      return buttons.run(m.chat, conn, m);
    } else {
      const index = parseInt(num);
      if (isNaN(index) || index <= 0 || index > links.length) {
        return m.reply(`ℹ️ Indeks tidak valid. Mohon berikan nomor antara 1 dan ${links.length}.\nContoh penggunaan: gcwa anime|2`);
      }
      const selectedLink = links[index - 1];
      const details = await getDetails(selectedLink.link);
      if (details.length === 0) {
        return m.reply(`Tidak ditemukan grup WhatsApp untuk hasil nomor ${index}.`);
      }
      const buttons = conn.ctaButton.setBody(`Detail grup WhatsApp untuk hasil nomor ${index}:\n\n${details.map((detail, idx) => `*${idx + 1}.* Judul: ${detail.title}\n   Link: ${detail.link}`).join("\n\n")}`).setFooter("Klik tombol di bawah untuk memilih grup.").addSelection("Pilih Grup").makeSections("Detail Grup", "Pilih Grup");
      details.forEach((detail, idx) => buttons.makeRow("", detail.title, `Pilih ${detail.title}`, `${usedPrefix}inspect ${detail.link}`));
      return buttons.run(m.chat, conn, m);
    }
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
  }
};
handler.help = ["gcwa <query>|<index>"];
handler.command = ["gcwa"];
handler.tags = ["random"];
export default handler;
async function getAllLinks(keyword) {
  try {
    const response = await fetch(`https://www.whatsapgrup.com/search?q=${encodeURIComponent(keyword)}`);
    const html = await response.text();
    const $ = cheerio.load(html);
    const links = $(".blog-posts .blog-post.hentry .post-title a").map((_, element) => {
      const title = $(element).text().trim();
      const link = $(element).attr("href");
      return {
        title: title,
        link: link
      };
    }).get();
    return links;
  } catch (error) {
    console.error("Error fetching the URL:", error);
    throw error;
  }
}
async function getDetails(link) {
  try {
    const response = await fetch(link);
    const html = await response.text();
    const $ = cheerio.load(html);
    const details = $("div.post-body.post-content").children().map((_, element) => {
      const text = $(element).text().trim();
      if (text.includes("Link")) {
        const title = text.split("-")[0].trim();
        const linkElement = $(element).find("a");
        if (linkElement.length > 0) {
          const link = linkElement.attr("href").trim();
          return {
            title: title,
            link: link
          };
        }
      }
      return null;
    }).get().filter(detail => detail && detail.link.includes("chat.whatsapp.com"));
    return details;
  } catch (error) {
    console.error("Error fetching details:", error);
    return [];
  }
}