import { neonime } from "../../lib/scraper/all/anime.js";
const handler = async (m, { conn, usedPrefix, command, text }) => {
  let [query, index, chapter] = text.trim().split("|");
  m.react(wait);
  try {
    if (!query) {
      return m.reply(
        "ℹ️ Masukkan query untuk mencari anime di NeoNime.\nContoh penggunaan: neonime Naruto",
      );
    }
    if (!index && !chapter) {
      const searchResults = await neonime.search(query);
      if (searchResults.length === 0) {
        return m.reply(`Tidak ditemukan hasil untuk query "${query}".`);
      }
      const buttons = conn.ctaButton
        .setBody(`Pilih anime dari hasil pencarian untuk "${query}".`)
        .setFooter("Informasi lebih lanjut dapat ditemukan di NeoNime.")
        .addSelection("Klik di sini")
        .makeSections("NeoNime", "Pilih anime");
      searchResults.forEach((result, idx) => {
        buttons.makeRow(
          ``,
          `📺 *[ RESULT ${idx + 1} ]*`,
          `📰 *Judul:* ${result.title}`,
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
    const searchResults = await neonime.search(query);
    if (index > searchResults.length) {
      return m.reply(
        `ℹ️ Indeks tidak valid. Mohon berikan nomor antara 1 dan ${searchResults.length}.`,
      );
    }
    const selectedResult = searchResults[index - 1];
    if (!chapter) {
      const infoResult = await neonime.getData(selectedResult.link);
      if (!infoResult || Object.keys(infoResult).length === 0) {
        return m.reply(
          `Tidak dapat mengambil informasi untuk anime "${selectedResult.title}".`,
        );
      }
      const buttons = conn.ctaButton
        .setBody(`Informasi untuk anime "${selectedResult.title}".`)
        .setFooter("Informasi lebih lanjut dapat ditemukan di NeoNime.")
        .addSelection("Klik di sini")
        .makeSections("NeoNime", "Pilih episode");
      let replyMessage = `Informasi untuk anime "${selectedResult.title}":
- Judul: ${infoResult.title}
- Genre: ${infoResult.genre}
- Status: ${infoResult.status}
- Sinopsis: ${infoResult.sinopsis}
- Episode: ${infoResult.episode}
- Rating: ${infoResult.rating}
- Link: ${selectedResult.link}`;
      if (infoResult.download.length > 0) {
        infoResult.download.forEach((download, idx) => {
          buttons.makeRow(
            ``,
            `📚 *Episode ${idx + 1}*`,
            `⭐ *Quality:* ${download.quality}`,
            `${usedPrefix}${command} ${query}|${index}|${idx + 1}`,
          );
        });
      } else {
        replyMessage += `\nTidak ada episode yang tersedia.`;
      }
      return buttons.run(m.chat, conn, m);
    }
    if (isNaN(chapter) || chapter <= 0) {
      return m.reply(
        "ℹ️ Chapter tidak valid. Mohon berikan nomor antara 1 dan jumlah episode yang tersedia.",
      );
    }
    const infoResult = await neonime.getData(selectedResult.link);
    if (
      !infoResult ||
      !infoResult.download ||
      !infoResult.download[chapter - 1]
    ) {
      return m.reply(
        `Tidak ditemukan link download untuk episode ${chapter} dari anime "${selectedResult.title}".`,
      );
    }
    const downloadLinks = Object.entries(infoResult.download[chapter - 1])
      .map(([type, link]) => {
        return `  - ${type}: ${link}`;
      })
      .join("\n");
    m.reply(
      `Link download untuk episode ${chapter} dari anime "${selectedResult.title}":\n\n${downloadLinks}`,
    );
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
  }
};
handler.help = [
  "neonime <query>|<index>|<chapter>",
  "neonime <query>|<index>",
  "neonime <query>",
];
handler.command = ["neonime"];
handler.tags = ["search"];
export default handler;
