import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  text
}) => {
  if (!text) return m.reply("🎵 *Penggunaan:* .resvlyrics query");
  try {
    const lyrics = await fetchData(text);
    if (!lyrics) return m.reply("❌ Tidak dapat mengambil lirik lagu.");
    m.reply(lyrics);
  } catch (error) {
    return console.error(error), m.reply("Terjadi kesalahan: " + error.message);
  }
};
handler.help = ["resvlyrics query|num"], handler.tags = ["internet"], handler.command = /^(resvlyrics)$/i;
export default handler;
const fetchData = async songTitle => {
  try {
    const response = await fetch("https://tools.revesery.com/lyrics/get_lyrics.php?songTitle=" + encodeURIComponent(songTitle), {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
      }
    });
    if (!response.ok) throw new Error("Gagal mengambil data.");
    const html = await response.text(),
      $ = cheerio.load(html);
    return $(".lyrics").text();
  } catch (error) {
    return console.error(error), "Terjadi kesalahan: " + error.message;
  }
};