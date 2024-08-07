import {
  oploverz
} from "../../lib/scraper/all/anime.js";
const handler = async (m, {
  text
}) => {
  let [query, index, episode] = text.trim().split("|");
  m.react(wait);
  try {
    if (!query) {
      return m.reply("ℹ️ Masukkan query untuk mencari konten di Oploverz.\nContoh penggunaan: oploverz Naruto");
    }
    if (!index && !episode) {
      const searchResult = await oploverz.search(query);
      if (searchResult.length === 0) {
        return m.reply(`Tidak ditemukan hasil untuk query "${query}".`);
      }
      const resultsList = searchResult.map((result, idx) => {
        return `Konten ${idx + 1}:
- Judul: ${result.title}
- Status: ${result.status}
- Link: ${result.url}`;
      }).join("\n\n");
      return m.reply(`Daftar konten untuk query "${query}":\n\n${resultsList}`);
    }
    index = parseInt(index);
    episode = parseInt(episode);
    if (isNaN(index) || index <= 0) {
      return m.reply("ℹ️ Indeks tidak valid. Mohon berikan nomor antara 1 dan jumlah hasil pencarian.");
    }
    const searchResult = await oploverz.search(query);
    if (index > searchResult.length) {
      return m.reply(`ℹ️ Indeks tidak valid. Mohon berikan nomor antara 1 dan ${searchResult.length}.`);
    }
    const selectedResult = searchResult[index - 1];
    if (!episode) {
      const detailResult = await oploverz.detail(selectedResult.url);
      if (!detailResult || Object.keys(detailResult).length === 0) {
        return m.reply(`Tidak dapat mengambil informasi untuk konten "${selectedResult.title}".`);
      }
      let replyMessage = `Detail untuk konten "${selectedResult.title}":
- Judul: ${detailResult.title}
- Sinopsis: ${detailResult.sinopsis}
- Gambar: ${detailResult.image}
- Status: ${detailResult.status}
- Durasi: ${detailResult.duration}
- Genre: ${detailResult.genres.join(", ")}
- Link: ${detailResult.url}
- Download Links:`;
      Object.keys(detailResult.download).forEach(quality => {
        Object.keys(detailResult.download[quality]).forEach(server => {
          replyMessage += `
  ${quality} (${server}): ${detailResult.download[quality][server]}`;
        });
      });
      return m.reply(replyMessage);
    }
    if (isNaN(episode) || episode <= 0 || episode > selectedResult.episode.length) {
      return m.reply(`Episode tidak valid. Mohon berikan nomor antara 1 dan ${selectedResult.episode.length}.`);
    }
    const detailResult = await oploverz.detail(selectedResult.episode[episode - 1].url);
    if (!detailResult || !detailResult.download) {
      return m.reply(`Tidak ditemukan link download untuk episode ${episode} dari konten "${selectedResult.title}".`);
    }
    let replyMessage = `Link download untuk episode ${episode} dari konten "${selectedResult.title}":`;
    Object.keys(detailResult.download).forEach(quality => {
      Object.keys(detailResult.download[quality]).forEach(server => {
        replyMessage += `
  ${quality} (${server}): ${detailResult.download[quality][server]}`;
      });
    });
    m.reply(replyMessage);
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
  }
};
handler.help = ["oploverz <query>|<index>|<episode>", "oploverz <query>|<index>", "oploverz <query>"];
handler.command = ["oploverz"];
handler.tags = ["search"];
export default handler;