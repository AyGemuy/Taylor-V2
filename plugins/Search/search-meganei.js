import {
  meganei
} from "../../lib/scraper/all/anime.js";
const handler = async (m, {
  conn,
  text
}) => {
  let [query, index, chapter] = text.trim().split("|");
  m.react(wait);
  try {
    if (!query) {
      m.react(eror);
      return m.reply("ℹ️ Masukkan query untuk mencari anime.\nContoh penggunaan: meganei cute");
    }
    if (!index && !chapter) {
      const searchResult = await meganei.search(query);
      if (searchResult.total === 0) {
        m.react(eror);
        return m.reply(`Tidak ditemukan hasil untuk query "${query}".`);
      }
      const buttons = conn.ctaButton.setBody("🔍 Hasil Pencarian Anime:").setFooter("Pilih anime di bawah ini.").addSelection("Klik di sini").makeSections("Anime", "Rekomendasi");
      searchResult.result.forEach((result, idx) => {
        buttons.makeRow("", result.title, `📚 ${result.title}`, `.meganei ${query}|${idx + 1}`);
      });
      buttons.run(m.chat, conn, m);
      m.react(sukses);
      return;
    }
    index = parseInt(index);
    chapter = parseInt(chapter);
    if (isNaN(index) || index <= 0) {
      m.react(eror);
      return m.reply("ℹ️ Indeks tidak valid. Mohon berikan nomor antara 1 dan maksimal jumlah hasil pencarian.");
    }
    const searchResult = await meganei.search(query);
    if (index > searchResult.total) {
      m.react(eror);
      return m.reply(`ℹ️ Indeks tidak valid. Mohon berikan nomor antara 1 dan ${searchResult.total}.`);
    }
    const selectedResult = searchResult.result[index - 1];
    if (!chapter) {
      const infoResult = await meganei.info(selectedResult.link);
      if (!infoResult.download || infoResult.download.length === 0) {
        m.react(eror);
        return m.reply(`Tidak ditemukan chapter untuk anime "${selectedResult.title}".`);
      }
      const buttons = conn.ctaButton.setBody(`📚 ${selectedResult.title} - Daftar Chapter:`).setFooter("Pilih chapter di bawah ini.").addSelection("Klik di sini").makeSections("Chapter", "Rekomendasi");
      infoResult.download.forEach((chapter, idx) => {
        buttons.makeRow("", `Chapter ${idx + 1}`, `📖 Chapter ${idx + 1}`, `.meganei ${query}|${index}|${idx + 1}`);
      });
      buttons.run(m.chat, conn, m);
      m.react(sukses);
      return;
    }
    if (isNaN(chapter) || chapter <= 0) {
      m.react(eror);
      return m.reply("ℹ️ Chapter tidak valid. Mohon berikan nomor antara 1 dan jumlah chapter yang tersedia.");
    }
    const infoResult = await meganei.info(selectedResult.link);
    if (chapter > infoResult.download.length) {
      m.react(eror);
      return m.reply(`ℹ️ Chapter tidak valid. Mohon berikan nomor antara 1 dan ${infoResult.download.length}.`);
    }
    const downloadLinks = infoResult.download[chapter - 1].link.map(link => `• ${link.type}: ${link.link}`).join("\n");
    if (!downloadLinks) {
      m.react(eror);
      return m.reply(`Tidak ditemukan link download untuk chapter ${chapter} dari anime "${selectedResult.title}".`);
    }
    m.reply(`*Link download untuk ${selectedResult.title} Chapter ${chapter}:*\n\n${downloadLinks}`);
    m.react(sukses);
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
    m.reply(`Terjadi kesalahan: ${e.message}`);
  }
};
handler.help = ["meganei <query>|<index>|<chapter>", "meganei <query>|<index>", "meganei <query>"];
handler.command = ["meganei"];
handler.tags = ["search"];
export default handler;