import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  usedPrefix,
  args,
  command
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  try {
    const {
      title,
      definition,
      source,
      relatedWords
    } = await ArtiKata(text);
    await conn.reply(m.chat, `*${title}*\n\n📘 *Definisi*: ${definition}\n\n📚 *Sumber*: ${source}\n\n🔗 *Kata Terkait*: ${relatedWords}`, m);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["artikata"].map(v => v + " [input]"), handler.tags = ["kerang"],
  handler.command = ["artikata"];
export default handler;
async function ArtiKata(input) {
  try {
    const formData = new URLSearchParams({
      input: input
    });
    const response = await fetch("https://www.artikata.com/translate.php", {
      method: "POST",
      body: formData
    });
    if (!response.ok) throw new Error("Jaringan bermasalah");
    const $ = cheerio.load(await response.text());
    return {
      title: $("title").text().trim() || "Tidak ada",
      definition: $(".contents9 table tr td:last-of-type").text().trim() || "Tidak ada",
      source: $(".contents12").text().trim() || "Tidak ada",
      relatedWords: $(".related").map((_, el) => $(el).text().trim()).get().join(", ") || "Tidak ada"
    };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}