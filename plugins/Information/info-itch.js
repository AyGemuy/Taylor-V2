import { itch } from "../../lib/info/itch.js";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "itch":
      try {
        let results = await itch.search(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Keterangan lebih lanjut dapat ditemukan di itch.")
          .addSelection("Klik di sini")
          .makeSections("itch", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 [ RESULT ${index + 1} ]`,
            `📰 Title: ${item.title}`,
            `⭐ Rating: ${item.rating}`,
            `${usedPrefix}itchdetail ${item.link}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "itchdetail":
      try {
        let res = await itch.detail(text);
        if (!res) return m.reply(`Link "${text}" tidak ditemukan :/`);
        const {
          csrfToken,
          title,
          author,
          platforms,
          rating,
          tags,
          description,
          downloads,
        } = res;
        const caption =
          `📦 *Info Aplikasi* 📦\n\n` +
          `📌 *Nama:* ${title || "Tidak tersedia"}\n` +
          `🔗 *Link:* ${text || "Tidak tersedia"}\n` +
          `📅 *Versi Saat Ini:* ${csrfToken || "Tidak tersedia"}\n` +
          `🔧 *Developer:* ${author || "Tidak tersedia"}\n` +
          `📆 *Terbaru:* ${rating || "Tidak tersedia"}\n` +
          `⭐ *Rating Konten:* ${tags || "Tidak tersedia"}\n` +
          `🌐 *Dapatkan di:* ${platforms || "Tidak tersedia"}\n` +
          `📜 *Kebutuhan:* ${description || "Tidak tersedia"}\n` +
          `📛 *ID Aplikasi:* ${csrfToken || "Tidak tersedia"}`;
        for (const download of downloads) {
          await conn.sendFile(m.chat, download.image || "", "", caption, m);
          await conn.sendFile(
            m.chat,
            download.link || "",
            download.title || "Unduhan",
            null,
            m,
            false,
            {
              quoted: m,
              mimetype: "application/vnd.android.package-archive",
            },
          );
        }
        m.react(sukses);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    default:
      m.reply("Perintah tidak dikenali.");
      break;
  }
};
handler.help = ["itch", "itchdetail"];
handler.tags = ["internet"];
handler.command = /^(itch|itchdetail)$/i;
export default handler;
