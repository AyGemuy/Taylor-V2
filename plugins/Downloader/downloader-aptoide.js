import {
  download as aptoideDown
} from "aptoide-scraper";
const handler = async (m, {
  conn,
  text
}) => {
  try {
    if (!/^[a-z]\w*(\.[a-z]\w*)+$/i.test(text)) throw "❌ Nama paket tidak valid";
    m.react(wait);
    const aptodl = await aptoideDown(text);
    const caption = `📦 *Info Aplikasi* 📦\n\n` + `📌 *Nama:* ${aptodl.name}\n` + `📦 *Paket:* ${aptodl.package}\n` + `🕒 *Terakhir Diperbarui:* ${aptodl.lastup}\n` + `📂 *Ukuran:* ${aptodl.size}\n\n` + `⌛ *Tunggu sebentar sementara link unduhan sedang dipersiapkan...*`;
    await conn.sendFile(m.chat, aptodl.icon, "", caption, m);
    await conn.sendFile(m.chat, aptodl.dllink, aptodl.name, null, m, true, {
      quoted: m,
      mimetype: "application/vnd.android.package-archive"
    });
    m.react(sukses);
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
  }
};
handler.help = ["aptoidedown"];
handler.tags = ["tools"];
handler.command = /^ap(ptoided(own|l)|toided(own|l))$/i;
export default handler;