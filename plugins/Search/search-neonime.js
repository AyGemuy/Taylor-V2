import {
  neonime
} from "../../lib/scraper/all/anime.js";
const handler = async (m, {
  text
}) => {
  let [query, index, chapter] = text.trim().split("|");
  m.react(wait);
  try {
    if (!query) {
      return m.reply("ℹ️ Masukkan query untuk mencari anime di NeoNime.\nContoh penggunaan: neonime Naruto");
    }
    if (!index && !chapter) {
      const searchResult = await neonime.search(query);
      if (searchResult.length === 0) {
        return m.reply(`Tidak ditemukan hasil untuk query "${query}".`);
      }
      const resultsList = searchResult.map((result, idx) => {
        return `Anime ${idx + 1}:
- Judul: ${result.title}
- Link: ${result.link}`;
      }).join("\n\n");
      return m.reply(`Daftar anime untuk query "${query}":\n\n${resultsList}`);
    }
    index = parseInt(index);
    chapter = parseInt(chapter);
    if (isNaN(index) || index <= 0) {
      return m.reply("ℹ️ Indeks tidak valid. Mohon berikan nomor antara 1 dan jumlah hasil pencarian.");
    }
    const searchResult = await neonime.search(query);
    if (index > searchResult.length) {
      return m.reply(`ℹ️ Indeks tidak valid. Mohon berikan nomor antara 1 dan ${searchResult.length}.`);
    }
    const selectedResult = searchResult[index - 1];
    if (!chapter) {
      const infoResult = await neonime.getData(selectedResult.link);
      if (!infoResult || Object.keys(infoResult).length === 0) {
        return m.reply(`Tidak dapat mengambil informasi untuk anime "${selectedResult.title}".`);
      }
      let replyMessage = `Informasi untuk anime "${selectedResult.title}":
- Judul: ${infoResult.title}
- Genre: ${infoResult.genre}
- Status: ${infoResult.status}
- Sinopsis: ${infoResult.sinopsis}
- Episode: ${infoResult.episode}
- Rating: ${infoResult.rating}
- Link: ${selectedResult.link}`;
      return m.reply(replyMessage);
    }
    if (isNaN(chapter) || chapter <= 0) {
      return m.reply("ℹ️ Chapter tidak valid. Mohon berikan nomor antara 1 dan jumlah episode yang tersedia.");
    }
    const infoResult = await neonime.getData(selectedResult.link);
    if (!infoResult || !infoResult.download || !infoResult.download[chapter - 1]) {
      return m.reply(`Tidak ditemukan link download untuk episode ${chapter} dari anime "${selectedResult.title}".`);
    }
    const downloadLinks = Object.entries(infoResult.download[chapter - 1]).map(([type, link]) => {
      return `  - ${type}: ${link}`;
    }).join("\n");
    m.reply(`Link download untuk episode ${chapter} dari anime "${selectedResult.title}":\n\n${downloadLinks}`);
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
  }
};
handler.help = ["neonime <query>|<index>|<chapter>", "neonime <query>|<index>", "neonime <query>"];
handler.command = ["neonime"];
handler.tags = ["search"];
export default handler;