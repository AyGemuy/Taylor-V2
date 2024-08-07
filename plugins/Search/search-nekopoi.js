import {
  nekopoi
} from "../../lib/scraper/all/anime.js";
const handler = async (m, {
  text
}) => {
  let [query, index, episode] = text.trim().split("|");
  m.react(wait);
  try {
    if (!query) {
      return m.reply("ℹ️ Masukkan query untuk mencari konten di AnimeBatch.\nContoh penggunaan: nekopoi Naruto");
    }
    if (!index && !episode) {
      const searchResult = await nekopoi.search(query);
      if (searchResult.length === 0) {
        return m.reply(`Tidak ditemukan hasil untuk query "${query}".`);
      }
      const resultsList = searchResult.map((result, idx) => {
        return `Konten ${idx + 1}:
- Judul: ${result.title}
- Genre: ${result.genre}
- Producers: ${result.producers}
- Duration: ${result.duration}
- Size: ${result.size}
- Link: ${result.link}`;
      }).join("\n\n");
      return m.reply(`Daftar konten untuk query "${query}":\n\n${resultsList}`);
    }
    index = parseInt(index);
    episode = parseInt(episode);
    if (isNaN(index) || index <= 0) {
      return m.reply("ℹ️ Indeks tidak valid. Mohon berikan nomor antara 1 dan jumlah hasil pencarian.");
    }
    const searchResult = await nekopoi.search(query);
    if (index > searchResult.length) {
      return m.reply(`ℹ️ Indeks tidak valid. Mohon berikan nomor antara 1 dan ${searchResult.length}.`);
    }
    const selectedResult = searchResult[index - 1];
    if (!episode) {
      const detailResult = await nekopoi.detail(selectedResult.link);
      if (!detailResult || Object.keys(detailResult).length === 0) {
        return m.reply(`Tidak dapat mengambil informasi untuk konten "${selectedResult.title}".`);
      }
      let replyMessage = `Detail untuk konten "${selectedResult.title}":
- Judul: ${detailResult.title}
- Sinopsis: ${detailResult.sinopsis}
- Gambar: ${detailResult.img}
- Genre: ${detailResult.genre}
- Producers: ${detailResult.producers}
- Duration: ${detailResult.duration}
- Size: ${detailResult.size}
- Streaming Link: ${detailResult.stream}
- Download Links:`;
      detailResult.download.forEach((download, idx) => {
        replyMessage += `
  ${download.title} (${download.type}):
  ${download.links.map(link => `- ${link.name}: ${link.link}`).join("\n  ")}`;
      });
      return m.reply(replyMessage);
    }
    if (isNaN(episode) || episode <= 0 || episode > selectedResult.episodes.length) {
      return m.reply(`Episode tidak valid. Mohon berikan nomor antara 1 dan ${selectedResult.episodes.length}.`);
    }
    const detailResult = await nekopoi.detail(selectedResult.link);
    if (!detailResult || !detailResult.download || !detailResult.download[episode - 1]) {
      return m.reply(`Tidak ditemukan link download untuk episode ${episode} dari konten "${selectedResult.title}".`);
    }
    const downloadLinks = detailResult.download[episode - 1].links.map((link, idx) => {
      return `  - Link ${idx + 1}: ${link.name} (${link.link})`;
    }).join("\n");
    m.reply(`Link download untuk episode ${episode} dari konten "${selectedResult.title}":\n\n${downloadLinks}`);
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
  }
};
handler.help = ["nekopoi <query>|<index>|<episode>", "nekopoi <query>|<index>", "nekopoi <query>"];
handler.command = ["nekopoi"];
handler.tags = ["search"];
export default handler;