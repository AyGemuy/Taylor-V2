import gplay from "google-play-scraper";
import {
  apkdl
} from "../../lib/scraper/scraper-apk.js";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "apksearch":
    case "searchapk":
    case "apk":
      try {
        let res = await gplay.search({
          term: text
        }) || await apkdl.search(text);
        if (!res.length) return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton.setBody("Pilih aplikasi di bawah ini.").setFooter("Keterangan lebih lanjut dapat ditemukan di APK-DL.").addSelection("Klik di sini").makeSections("Apk-dl", "rekomendasi");
        res.forEach(item => {
          buttons.makeRow("", `${item.title || item.name}`, `Dapatkan ${item.title || item.name}`, `${usedPrefix}apksearchdl ${"https://apk-dl.com/" + item.appId || item.link}`);
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "apksearchdl":
      try {
        let res = await apkdl.download(text);
        if (!res) return m.reply(`Query "${text}" tidak ditemukan :/`);
        const {
          appname,
          developer,
          img,
          link
        } = res || {};
        const caption = `📦 *Info Aplikasi* 📦\n\n` + `📌 *Nama:* ${appname || "Tidak tersedia"}\n` + `⭐ *Dev:* ${developer || "Tidak tersedia"}\n`;
        await conn.sendFile(m.chat, img?.split("?")[0] || "", "", caption, m);
        await conn.sendFile(m.chat, link || "", appname || "Aplikasi", null, m, true, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
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
handler.help = ["apksearch"];
handler.tags = ["tools"];
handler.command = /^(apk|apksearch|searchapk|apksearchdl)$/i;
export default handler;