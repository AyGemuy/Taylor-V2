import {
  otakudesu
} from "../../lib/scraper/all/anime.js";
const handler = async (m, {
  text
}) => {
  let [query, index, chapter] = text.trim().split("|");
  m.react(wait);
  try {
    if (!query) {
      return m.reply("ℹ️ Masukkan query untuk mencari konten di Otakudesu.\nContoh penggunaan: otakudesu Naruto");
    }
    if (!index && !chapter) {
      const searchResult = await otakudesu.search(query);
      if (searchResult.length === 0) {
        return m.reply(`Tidak ditemukan hasil untuk query "${query}".`);
      }
      const resultsList = searchResult.map((result, idx) => {
        return `Konten ${idx + 1}:
- Judul: ${result.title}
- Genres: ${result.genres}
- Status: ${result.status}
- Rating: ${result.rating}
- Thumbnail: ${result.thumbnail}
- Link: ${result.link}`;
      }).join("\n\n");
      return m.reply(`Daftar konten untuk query "${query}":\n\n${resultsList}`);
    }
    index = parseInt(index);
    chapter = parseInt(chapter);
    if (isNaN(index) || index <= 0) {
      return m.reply("ℹ️ Indeks tidak valid. Mohon berikan nomor antara 1 dan jumlah hasil pencarian.");
    }
    const searchResult = await otakudesu.search(query);
    if (index > searchResult.length) {
      return m.reply(`ℹ️ Indeks tidak valid. Mohon berikan nomor antara 1 dan ${searchResult.length}.`);
    }
    const selectedResult = searchResult[index - 1];
    if (!chapter) {
      const detailResult = await otakudesu.detail(selectedResult.link);
      if (!detailResult || Object.keys(detailResult).length === 0) {
        return m.reply(`Tidak dapat mengambil informasi untuk konten "${selectedResult.title}".`);
      }
      let replyMessage = `Detail untuk konten "${selectedResult.title}":
- Judul: ${detailResult.title}
- Sinopsis: ${detailResult.sinopsis}
- Gambar: ${detailResult.image}
- Batch Link: ${detailResult.batch}
- Episode:`;
      detailResult.episode.forEach((episode, idx) => {
        replyMessage += `
  Episode ${idx + 1}:
  - Judul: ${episode.judul}
  - Upload: ${episode.upload}
  - Link: ${episode.link}`;
      });
      return m.reply(replyMessage);
    }
    if (isNaN(chapter) || chapter <= 0) {
      return m.reply("ℹ️ Chapter tidak valid. Mohon berikan nomor antara 1 dan jumlah episode yang tersedia.");
    }
    const detailResult = await otakudesu.detail(selectedResult.link);
    if (!detailResult || !detailResult.download || !detailResult.download[chapter - 1]) {
      return m.reply(`Tidak ditemukan link download untuk episode ${chapter} dari konten "${selectedResult.title}".`);
    }
    const downloadLinks = detailResult.download[chapter - 1].map((link, idx) => {
      return `  - Link ${idx + 1}: ${link.name} (${link.link})`;
    }).join("\n");
    m.reply(`Link download untuk episode ${chapter} dari konten "${selectedResult.title}":\n\n${downloadLinks}`);
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
  }
};
handler.help = ["otakudesu <query>|<index>|<chapter>", "otakudesu <query>|<index>", "otakudesu <query>"];
handler.command = ["otakudesu"];
handler.tags = ["search"];
export default handler;