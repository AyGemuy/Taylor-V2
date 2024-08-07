import fetch from "node-fetch";
import {
  search as aptoideSearch
} from "aptoide-scraper";
import {
  sizeFormatter
} from "human-readable";
const format = sizeFormatter({
  std: "JEDEC",
  decimalPlaces: 2,
  keepTrailingZeroes: false
});
const fetchAPI = async url => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network response was not ok");
    return await res.json();
  } catch (err) {
    throw new Error(`Fetch error: ${err.message}`);
  }
};
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  try {
    if (!text) return m.reply(`Contoh penggunaan: *${usedPrefix + command} WhatsApp*`);
    m.react(wait);
    try {
      const res = await fetchAPI(`http://ws75.aptoide.com/api/7/apps/search?query=${encodeURIComponent(text)}&trusted=true`);
      if (res.datalist.total === 0) return m.reply(`❌ "${text}" tidak ditemukan :/`);
      const resultList = res.datalist.list.slice(0, 1).map((item, i) => `
🔢 *No. Urut:* ${i + 1}
📱 *Nama:* ${item.name}
🆔 *Paket:* ${item.package}
👨‍💻 *Pengembang:* ${item.developer?.name}
📝 *Versi:* ${item.file?.vername}
🔄 *Update:* ${item.modified}
📆 *Ditambahkan:* ${item.added}
📂 *Ukuran:* ${format(item.file?.filesize)}
🌟 *Rating:* ${item.stats.rating?.avg || "N/A"} (Total: ${item.stats.rating?.total || 0} ulasan)
📥 *Unduhan:* ${item.stats.downloads}
🛡️ *Keamanan:* ${item.file?.malware?.rank}
🔗 [Unduh Disini](${item.file?.path})
🔗 [Unduh Alternatif](${item.file?.path_alt})
`).join("\n\n________________________\n\n");
      const buttons = conn.ctaButton.setBody(resultList).setFooter("Pilih aplikasi di bawah ini.").setImage(res.datalist.list[0].icon).addSelection("Klik di sini").makeSections("Aptoide", "rekomendasi");
      for (const item of res.datalist.list) {
        buttons.makeRow("", item.name, `Dapatkan ${item.name}`, `.aptoidedown ${item.package}`);
      }
      buttons.run(m.chat, conn, m);
    } catch (err) {
      const searchResults = await aptoideSearch(text);
      const searchList = searchResults.slice(0, 1).map((v, index) => `
🔍 *[ RESULT ${index + 1} ]*
📱 *Nama:* ${v.name || "Tidak diketahui"}
🆔 *ID:* ${v.id || "Tidak diketahui"}
📝 *Deskripsi:* ${v.desc || "Tidak diketahui"}
🔗 *URL:* ${v.url || "Tidak diketahui"}
🖼️ *Ikon:* ${v.icon || "Tidak diketahui"}
`).join("\n\n________________________\n\n");
      const buttons = conn.ctaButton.setBody(searchList).setFooter("Pilih aplikasi di bawah ini.").setImage(searchResults[0]?.icon || "").addSelection("Klik di sini").makeSections("Aptoide", "rekomendasi");
      for (const item of searchResults) {
        buttons.makeRow("", item.name, `Dapatkan ${item.name}`, `.aptoidedown ${item.id}`);
      }
      buttons.run(m.chat, conn, m);
    }
  } catch (err) {
    console.error("Error in handler:", err);
    m.react(eror);
  }
};
handler.help = ["aptoide"];
handler.tags = ["tools"];
handler.command = /^aptoide(search)?$/i;
export default handler;