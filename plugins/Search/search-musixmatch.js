import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  usedPrefix,
  command,
  args
}) => {
  let text = args.join(" ");
  if (!text && (!m.quoted || !m.quoted.text)) {
    return m.reply("Input teks!\nContoh: .musixmatch minecraft\n<command> <teks>");
  }
  text = text || m.quoted.text;
  m.react(wait);
  try {
    const result = await MusixMatch(text);
    const caption = `*🎵 MusixMatch Result 🎵*\n\n` + `*Judul:* ${result.judul}\n` + `*Penyanyi:* ${result.penyanyi}\n\n` + `*Lirik:*\n${result.lirik}\n\n` + `*Thumbnail:*\n${result.thumb}`;
    await conn.sendFile(m.chat, result.thumb, "result.jpg", caption, m);
  } catch (error) {
    m.react(eror);
  }
};
handler.help = ["musixmatch"];
handler.tags = ["search"];
handler.command = /^musi[ckx]match$/i;
export default handler;
async function MusixMatch(query) {
  try {
    const searchUrl = "https://www.musixmatch.com/search/" + encodeURIComponent(query);
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.text();
    const $search = cheerio.load(searchData);
    const songUrl = "https://www.musixmatch.com" + $search("#search-all-results").find("div.main-panel > div:nth-child(1) > div.box-content > div > ul > li > div > div.media-card-body > div > h2 > a").attr("href");
    const songResponse = await fetch(songUrl);
    const songData = await songResponse.text();
    const $ = cheerio.load(songData);
    $("script").remove();
    const title = $("#site > div > div > div > main > div > div > div.mxm-track-banner.top > div > div > div").find("div.col-sm-10.col-md-8.col-ml-9.col-lg-9.static-position > div.track-title-header > div.mxm-track-title > h1").text().trim().replace("Lyrics", "");
    const artist = $("#site > div > div > div > main > div > div > div > div > div > div > div> div > div > h2 > span").text().trim();
    const thumb = "https:" + $("#site > div > div > div > main > div > div > div.mxm-track-banner.top > div > div > div").find("div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div > img").attr("src");
    let lyrics = "";
    $("#site > div > div > div > main > div > div > div.mxm-track-lyrics-container").find("div.container > div > div > div > div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics").each(function(a, b) {
      const text = $(b).find("span").text().trim();
      if (text.length > 0 && lyrics === "") {
        lyrics = text;
      }
    });
    return {
      judul: title || "Tidak ada",
      penyanyi: artist || "Tidak ada",
      thumb: thumb || "Tidak ada",
      lirik: lyrics || "Tidak ada"
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}