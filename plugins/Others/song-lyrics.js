import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  text
}) => {
  if (!text) return m.reply("🎵 *Penggunaan:* .songlyrics query|num");
  const args = text.split("|"),
    query = args[0]?.trim(),
    num = parseInt(args[1]) || 1,
    url = `https://www.songlyrics.com/index.php?section=search&searchW=${query}&submit=Search`,
    data = await songSearch(url);
  if (!data || num < 1 || num > data.songs.length) {
    if (data) {
      const songList = data.songs.map((song, index) => `*${index + 1}.* ${song.title} - ${song.artist}`).join("\n");
      return m.reply(`🎵 *Daftar lagu:*\n\n${songList}`);
    }
    return m.reply("❌ Tidak ada hasil untuk pencarian tersebut.");
  }
  const lyrics = await songLyrics(data.songs[num - 1].link);
  if (!lyrics) return m.reply("❌ Tidak dapat mengambil lirik lagu.");
  m.reply(lyrics.lyrics);
};
handler.help = ["songlyrics query|num"], handler.tags = ["internet"], handler.command = /^(songlyrics)$/i;
export default handler;
async function songSearch(url) {
  try {
    const response = await fetch(url),
      $ = cheerio.load(await response.text()),
      totalResults = parseInt($(".search-results").text().match(/\d+/)[0]),
      pageLinks = $(".li_pagination a[href]").map((_, el) => "https://www.songlyrics.com" + $(el).attr("href")).get();
    return {
      totalResults: totalResults,
      pageLinks: pageLinks,
      songs: $(".serpresult").map((_, el) => {
        const title = $(el).find("h3 a").text(),
          link = $(el).find("h3 a").attr("href"),
          [artist, album] = $(el).find(".serpdesc-2 p a").map((_, el) => $(el).text()).get();
        return {
          title: title,
          link: link,
          artist: artist,
          album: album,
          description: $(el).find(".serpdesc-2 p:eq(1)").text()
        };
      }).get()
    };
  } catch (error) {
    return console.error("Error:", error), null;
  }
}
async function songLyrics(url) {
  try {
    const response = await fetch(url);
    return {
      lyrics: cheerio.load(await response.text())("#songLyricsDiv").text().trim()
    };
  } catch (error) {
    return console.error("Error:", error), null;
  }
}