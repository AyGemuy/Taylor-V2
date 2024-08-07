import axios from "axios";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.join(" ") || m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh: *${usedPrefix}${command} Hai, apa kabar?*`);
  m.reply("Mohon tunggu...");
  try {
    const res = await JagoKata(text);
    if (!res.length) return m.reply("Tidak ditemukan hasil untuk pencarian Anda.");
    const item = res[Math.floor(Math.random() * res.length)],
      result = `🔍 *[ RESULT ]*\n\n💬 *Quote:* ${item.quote || "Tidak diketahui"}\n🔗 *Link:* ${item.link || "Tidak diketahui"}\n🖼️ *Image:* ${item.img || "Tidak diketahui"}\n✍️ *Author:* ${item.author || "Tidak diketahui"}\n📝 *Description:* ${item.description || "Tidak diketahui"}\n🕒 *Lifespan:* ${item.lifespan || "Tidak diketahui"}\n👍 *Votes:* ${item.votes || 0}\n📚 *Category:* ${item.category || "Tidak diketahui"}\n💡 *Tags:* ${item.tags || "Tidak diketahui"}`;
    await conn.sendFile(m.chat, item.img || "logo.png", "", result, m);
  } catch (e) {
    m.reply("Terjadi kesalahan, silakan coba lagi nanti.");
  }
};
handler.help = ["jagokata"], handler.tags = ["fun"], handler.command = ["jagokata"];
export default handler;
async function JagoKata(q) {
  try {
    const {
      data
    } = await axios.post("https://jagokata.com/kata-bijak/cari.html", new URLSearchParams({
      citaat: q,
      zoekbutton: "Zoeken"
    })), $ = cheerio.load(data);
    return $("#main #content #content-container #images-container ul li, #main #content #content-container #citatenrijen li").map((_, el) => ({
      quote: $(el).find(".quotebody .fbquote").text().trim(),
      link: `https://jagokata.com${$(el).find("a").attr("href")}`,
      img: $(el).find(".quotebody img").attr("data-src"),
      author: $(el).find(".citatenlijst-auteur > a, .auteurfbnaam").text().trim(),
      description: $(el).find(".citatenlijst-auteur > .auteur-beschrijving").text().trim(),
      lifespan: $(el).find(".citatenlijst-auteur > .auteur-gebsterf").text().trim(),
      votes: $(el).find(".votes-content > .votes-positive").text().trim(),
      category: $("#main").find("h1.kamus").text().trim(),
      tags: $(el).attr("id")
    })).get();
  } catch {
    throw new Error("Error fetching data from JagoKata");
  }
}