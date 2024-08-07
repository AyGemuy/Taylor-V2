import axios from "axios";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length >= 1 ? args.join(" ") : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  try {
    m.react(wait);
    const res = await fetchThumbnailUrls("https://storyset.com/search?q=" + encodeURIComponent(text));
    const rdm = res[Math.floor(Math.random() * res.length)];
    await conn.ctaButton.setBody("🖼️ *Hasil Pencarian Storyset* 🖼️\n\nGambar thumbnail yang ditemukan.").setFooter('Klik "Next" untuk mencari gambar lainnya').setImage(rdm).addReply("Next", usedPrefix + command + " " + text).run(m.chat, conn, m);
    m.react(sukses);
  } catch (e) {
    m.react(eror);
    console.error(e);
  }
};
handler.help = ["storyset"];
handler.tags = ["internet"];
handler.command = /^(storyset)$/i;
export default handler;
async function fetchThumbnailUrls(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const thumbnailUrls = $('script[type="application/ld+json"]').toArray().map(element => {
      try {
        const jsonData = JSON.parse($(element).html());
        if (jsonData["@type"] === "ImageObject" && jsonData.thumbnailUrl) return jsonData.thumbnailUrl;
      } catch (error) {
        console.error("Gagal mengambil halaman web:", error);
      }
    }).filter(url => url);
    return thumbnailUrls;
  } catch (error) {
    console.error("Gagal mengambil halaman web:", error);
    return [];
  }
}