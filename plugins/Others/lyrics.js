import fetch from "node-fetch";
import Genius from "genius-lyrics";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args
}) => {
  const text = args.length ? args.join(" ") : m.quoted?.text || null;
  if (!text) return m.reply("⚠️ *Masukkan judul musik!*\nContoh: `.lirik hello`");
  const nothing = "*Tidak diketahui!*";
  const Client = new Genius.Client("h6fTn1BYNjYi5VTszhyAFTcM3WWtk2E4hqrXCcutfObE4jVFnJ3LVyewHKIYTli7");
  let result = null;
  let image = null;
  m.react("⌛");
  const providers = [async () => {
    try {
      const song = await Client.songs.search(text);
      const jenius = song[0];
      const jeniusLyrics = await jenius.lyrics() || await getLyrics(jenius.url);
      if (jeniusLyrics) {
        return {
          text: `*🎵 Judul:*\n${jenius.title || nothing}\n\n*📝 Lirik:*\n- ${jeniusLyrics.replace(/\n/g, "\n") || nothing}\n\n*🎤 Penyanyi:*\n${(await jenius.artist).name || nothing}\n\n*🔗 URL:*\n${jenius.url || nothing}\n\n- _By Genius_`,
          image: jenius.thumbnail
        };
      }
      return null;
    } catch {
      return null;
    }
  }, async () => {
    try {
      const fetchData = async url => {
        const response = await fetch(url);
        return response.json().catch(() => null);
      };
      const geniusData = await fetchData(`${Object.entries(APIs).find(([ key ]) => key.includes("proxy"))?.[1]}https://genius.com/api/search/lyrics?q=${encodeURIComponent(text)}`);
      if (geniusData?.response?.sections[0]?.hits[0]?.result?.path) {
        const path = geniusData.response.sections[0].hits[0].result.path;
        const lyricsFromPath = await getLyrics(`https://genius.com${path}`);
        if (lyricsFromPath) return {
          text: `*📝 Lirik:*\n- ${lyricsFromPath.replace(/\n/g, "\n")}\n\n- _By Genius API_`,
          image: geniusData?.response?.sections[0]?.hits[0]?.result?.song_art_image_url
        };
      }
      const textylData = await fetchData(`https://api.textyl.co/api/lyrics?q=${encodeURIComponent(text)}`);
      if (textylData?.length) return {
        text: `*📝 Lirik:*\n- ${textylData.map(item => item.lyrics).join("\n").replace(/\n/g, "\n")}\n\n- _By Textyl API_`,
        image: null
      };
      const globalData = await fetchData(`https://globalapis.onrender.com/api/lyrics?songName=${encodeURIComponent(text)}`);
      if (globalData?.lyrics) return {
        text: `*📝 Lirik:*\n- ${globalData.lyrics.replace(/\n/g, "\n")}\n\n- _By Global API_`,
        image: globalData?.image
      };
      const notApiData = await fetchData(`https://notapi.vercel.app/api/lyrics?q=${encodeURIComponent(text)}`);
      if (notApiData?.lyrics) return {
        text: `*🎵 Judul:*\n${notApiData.title || nothing}\n\n*📝 Lirik:*\n- ${notApiData.lyrics.replace(/\n/g, "\n") || nothing}\n\n*🎤 Penyanyi:*\n${notApiData.artist || nothing}\n\n*🔗 URL:*\n${notApiData.url || nothing}\n\n- _By Not API_`,
        image: null
      };
      const kingAryanData = await fetchData(`https://king-aryanapis.onrender.com/api/lyrics?songName=${encodeURIComponent(text)}`);
      if (kingAryanData?.lyrics) return {
        text: `*📝 Lirik:*\n- ${kingAryanData.lyrics.replace(/\n/g, "\n")}\n\n- _By King Aryan API_`,
        image: kingAryanData?.image
      };
      const lyricsFreakData = await fetch(`https://www.lyricsfreak.com/search.php?a=search&q=${encodeURIComponent(text)}`);
      const lyricsFreakHtml = await lyricsFreakData.text();
      const $ = cheerio.load(lyricsFreakHtml);
      const songLink = $(".song").attr("href");
      if (songLink) {
        const songPage = await fetch(`https://www.lyricsfreak.com${songLink}`);
        const songData = await songPage.text();
        const $ = cheerio.load(songData);
        const lyrics = $(".lyrictxt").text();
        if (lyrics) return {
          text: `*📝 Lirik:*\n- ${lyrics.replace(/\n/g, "\n")}\n\n- _By LyricsFreak_`,
          image: null
        };
      }
    } catch {
      return null;
    }
  }];
  for (let provider of providers) {
    const resultData = await provider();
    if (resultData) {
      result = resultData.text;
      image = resultData.image;
    }
  }
  image = image || fla + command;
  result ? conn.sendFile(m.chat, image, "", result, m) : m.reply("❌ *Tidak dapat menemukan lirik!*");
};
handler.help = ["lirik"].map(v => v + " <judul>");
handler.tags = ["internet"];
handler.command = /^l(irik(musik)?|yrics?)$/i;
export default handler;
async function getLyrics(url) {
  try {
    const response = await fetch(Object.entries(APIs).find(([key]) => key.includes("proxy"))?.[1] + url);
    const html = await response.text();
    const $ = cheerio.load(html);
    let lyrics = "";
    $('div[class^="Lyrics__Container"]').each((i, elem) => {
      if ($(elem).text().length) {
        const snippet = $(elem).html().replace(/<br>/g, "\n").replace(/<(?!\s*br\s*\/?)[^>]+>/gi, "");
        lyrics += $("<textarea/>").html(snippet).text().trim() + "\n\n";
      }
    });
    return lyrics;
  } catch {
    return null;
  }
}