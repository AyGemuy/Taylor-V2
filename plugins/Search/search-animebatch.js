import { animebatch as animeBatch } from "../../lib/scraper/all/anime.js";
const handler = async (m, { conn, command, usedPrefix, text }) => {
  let [query, index, chapter] = text.trim().split("|");
  m.react(wait);
  try {
    if (!query) {
      return m.reply(
        "ℹ️ Masukkan query untuk mencari konten di AnimeBatch.\nContoh penggunaan: animebatch Naruto",
      );
    }
    if (!index && !chapter) {
      const searchResults = await animeBatch.search(query);
      if (searchResults.length === 0) {
        return m.reply(`Tidak ditemukan hasil untuk query "${query}".`);
      }
      const buttons = conn.ctaButton
        .setBody(`Pilih konten dari hasil pencarian untuk "${query}".`)
        .setFooter("Informasi lebih lanjut dapat ditemukan di AnimeBatch.")
        .addSelection("Klik di sini")
        .makeSections("AnimeBatch", "Pilih konten");
      searchResults.forEach((result, idx) => {
        buttons.makeRow(
          ``,
          `📰 *Judul:* ${result.title}`,
          `⭐ *Score:* ${result.score}`,
          `${usedPrefix}${command} ${query}|${idx + 1}`,
        );
      });
      return buttons.run(m.chat, conn, m);
    }
    index = parseInt(index);
    chapter = parseInt(chapter);
    if (isNaN(index) || index <= 0) {
      return m.reply(
        "ℹ️ Indeks tidak valid. Mohon berikan nomor antara 1 dan jumlah hasil pencarian.",
      );
    }
    const searchResults = await animeBatch.search(query);
    if (index > searchResults.length) {
      return m.reply(
        `ℹ️ Indeks tidak valid. Mohon berikan nomor antara 1 dan ${searchResults.length}.`,
      );
    }
    const selectedResult = searchResults[index - 1];
    if (!chapter) {
      const detailResult = await animeBatch.detail(selectedResult.link);
      if (!detailResult || Object.keys(detailResult).length === 0) {
        return m.reply(
          `Tidak dapat mengambil informasi untuk konten "${selectedResult.title}".`,
        );
      }
      const buttons = conn.ctaButton
        .setBody(`Detail untuk konten "${selectedResult.title}".`)
        .setFooter("Informasi lebih lanjut dapat ditemukan di AnimeBatch.")
        .addSelection("Klik di sini")
        .makeSections("AnimeBatch", "Pilih episode");
      let replyMessage = `Detail untuk konten "${selectedResult.title}":
- Judul: ${detailResult.title}
- Sinopsis: ${detailResult.desc}
- Gambar: ${detailResult.image}
- Batch Link: ${detailResult.batch.length > 0 ? detailResult.batch.map((batch) => batch.quality).join(", ") : "Tidak tersedia"}
- Episode:`;
      if (detailResult.download.length > 0) {
        detailResult.download.forEach((download, idx) => {
          replyMessage += `
  Episode ${idx + 1} (${download.title}):
  - Quality: ${download.quality}
  - Links: ${download.links.map((link) => `${Object.keys(link)[0]} (${Object.values(link)[0]})`).join(", ")}`;
          buttons.makeRow(
            ``,
            `📚 *Episode ${idx + 1} (${download.title})*`,
            `⭐ *Quality:* ${download.quality}`,
            `${usedPrefix}${command} ${query}|${index}|${idx + 1}`,
          );
        });
      } else {
        replyMessage += `
  Tidak ada episode yang tersedia.`;
      }
      return buttons.run(m.chat, conn, m);
    }
    if (isNaN(chapter) || chapter <= 0) {
      return m.reply(
        "ℹ️ Chapter tidak valid. Mohon berikan nomor antara 1 dan jumlah episode yang tersedia.",
      );
    }
    const detailResult = await animeBatch.detail(selectedResult.link);
    if (
      !detailResult ||
      !detailResult.download ||
      !detailResult.download[chapter - 1]
    ) {
      return m.reply(
        `Tidak ditemukan link download untuk episode ${chapter} dari konten "${selectedResult.title}".`,
      );
    }
    const downloadLinks = detailResult.download[chapter - 1].links
      .map((link, idx) => {
        return `  - Link ${idx + 1}: ${Object.keys(link)[0]} (${Object.values(link)[0]})`;
      })
      .join("\n");
    m.reply(
      `Link download untuk episode ${chapter} dari konten "${selectedResult.title}":\n\n${downloadLinks}`,
    );
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
  }
};
handler.help = [
  "animebatch <query>|<index>|<chapter>",
  "animebatch <query>|<index>",
  "animebatch <query>",
];
handler.command = ["animebatch"];
handler.tags = ["search"];
export default handler;
