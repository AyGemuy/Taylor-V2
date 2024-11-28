import { Search } from "../../lib/tools/search-animewall.js";
const handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) {
    return m.reply("ℹ️ Masukkan kueri untuk mencari.");
  }
  let result, output;
  let searchUrl;
  try {
    switch (command) {
      case "e621":
        result = new Search("e621");
        break;
      case "gelbooru":
        result = new Search("gelbooru");
        break;
      case "rule34":
        result = new Search("rule34");
        break;
      case "danbooru":
        result = new Search("danbooru");
        break;
      case "konachan":
        result = new Search("konachan");
        break;
      case "konachan18":
        result = new Search("konachan18");
        break;
      case "hypnohub":
        result = new Search("hypnohub");
        break;
      case "xbooru":
        result = new Search("xbooru");
        break;
      case "realbooru":
        result = new Search("realbooru");
        break;
      case "furrybooru":
        result = new Search("furrybooru");
        break;
      default:
        return m.reply("ℹ️ Command tidak dikenal.");
    }
    output = await result.search(text);
    if (
      !output ||
      !output.posts ||
      !output.posts.post ||
      output.posts.post.length === 0
    ) {
      return m.reply("Tidak ada hasil ditemukan.");
    }
    const posts = output.posts.post.slice(0, 25);
    const buttons = conn.ctaButton
      .setBody("Hasil pencarian:")
      .setFooter("Klik pada setiap tombol untuk melihat gambar.")
      .addSelection("Klik di sini")
      .makeSections("Anime Wall", "Pilih konten");
    posts.forEach((post, idx) => {
      buttons.makeRow(
        ``,
        `⭐ *Score:* ${post.score}`,
        `🔗 *Tags:* ${post.tags}`,
        `${usedPrefix}get ${post.file_url}`,
      );
    });
    return buttons.run(m.chat, conn, m);
  } catch (error) {
    m.reply("Terjadi kesalahan saat memproses pencarian. Silakan coba lagi.");
    console.error("Error:", error);
  }
};
handler.tags = ["search"];
handler.help = [
  "e621 <query>",
  "gelbooru <query>",
  "rule34 <query>",
  "danbooru <query>",
  "konachan <query>",
  "konachan18 <query>",
  "hypnohub <query>",
  "xbooru <query>",
  "realbooru <query>",
  "furrybooru <query>",
];
handler.command =
  /^(e621|gelbooru|rule34|danbooru|konachan|konachan18|hypnohub|xbooru|realbooru|furrybooru)$/i;
export default handler;
