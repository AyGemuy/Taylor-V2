import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  text
}) => {
  if (!text) return m.reply("🎵 *Penggunaan:* .laguplus query|num");
  const args = text.split("|"),
    query = args[0]?.trim(),
    num = parseInt(args[1]) || 1,
    data = await songSearch(query);
  if (!data || num < 1 || num > data.length) {
    if (data) {
      const songList = data.map((song, index) => `*${index + 1}.* ${song.title} - ${song.author}`).join("\n");
      return m.reply(`🎵 *Daftar lagu:*\n\n${songList}`);
    }
    return m.reply("❌ Tidak ada hasil untuk pencarian tersebut.");
  }
  const lyrics = await songLyrics(data[num - 1].link);
  if (!lyrics) return m.reply("❌ Tidak dapat mengambil lirik lagu.");
  m.reply(lyrics.lirik);
};
handler.help = ["laguplus query|num"], handler.tags = ["internet"], handler.command = /^(laguplus)$/i;
export default handler;
async function songSearch(q) {
  try {
    const url = "https://www.liriklaguplus.com/search?q=" + q + "&m=1",
      html = await (await fetch(url)).text(),
      $ = cheerio.load(html);
    return $("article.post").map((index, article) => ({
      title: $(article).find("h2.post-title a").text(),
      link: $(article).find("h2.post-title a").attr("href"),
      snippet: $(article).find(".post-snippet").text(),
      author: $(article).find(".post-info1 .vcard .fn").text(),
      publishedDate: $(article).find(".post-info1 time.published").attr("datetime")
    })).get();
  } catch (error) {
    return console.error("Error:", error), [];
  }
}
async function songLyrics(url) {
  try {
    const html = await (await fetch(url)).text(),
      $ = cheerio.load(html),
      [judulLagu, penyanyi, pencipta, album, lirik] = [$("h2").text(), $("Penyanyi").text(), $("Pencipta").text(), $("Album").text(), $("blockquote").text()];
    return {
      judulLagu: judulLagu,
      penyanyi: penyanyi,
      pencipta: pencipta,
      album: album,
      lirik: lirik
    };
  } catch (error) {
    return console.error("Error:", error), null;
  }
}