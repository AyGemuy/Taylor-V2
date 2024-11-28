import fetch from "node-fetch";
import * as cheerio from "cheerio";
const handler = async (m, { conn, args, command }) => {
  try {
    const text = args.length ? args.join(" ") : m.quoted?.text || null;
    if (!text)
      return m.reply("⚠️ *Masukkan judul musik!*\nContoh: `.lirik hello`");
    const nothing = "*Tidak diketahui!*";
    let result = null;
    let image = null;
    m.react(wait);
    const providers = [
      async () => {
        try {
          const fetchData = async (url) => {
            try {
              const response = await fetch(url);
              return response.json();
            } catch {
              return null;
            }
          };
          const geniusData = await fetchData(
            `${Object.entries(APIs).find(([key]) => key.includes("proxy"))?.[1]}https://genius.com/api/search/multi?q=${encodeURIComponent(text)}&sort=popularity&text_format=plain&page=1&per_page=5`,
          );
          if (geniusData?.response?.sections[0]?.hits[0]?.result?.path) {
            const path = geniusData.response.sections[0].hits[0].result.path;
            const lyricsFromPath = await getLyrics(`https://genius.com${path}`);
            if (lyricsFromPath)
              return {
                text: `*📝 Lirik:*\n- ${lyricsFromPath.trim()}\n\n- _By Genius API_`,
                image:
                  geniusData?.response?.sections[0]?.hits[0]?.result
                    ?.song_art_image_url,
              };
          }
          const notApiData = await fetchData(
            `https://notapi.vercel.app/api/lyrics?q=${encodeURIComponent(text)}`,
          );
          if (notApiData?.lyrics)
            return {
              text: `*🎵 Judul:*\n${notApiData.title || nothing}\n\n*📝 Lirik:*\n- ${notApiData.lyrics.trim() || nothing}\n\n*🎤 Penyanyi:*\n${notApiData.artist || nothing}\n\n*🔗 URL:*\n${notApiData.url || nothing}\n\n- _By Not API_`,
              image: null,
            };
          const globalData = await fetchData(
            `https://globalapis.onrender.com/api/lyrics?songName=${encodeURIComponent(text)}`,
          );
          if (globalData?.lyrics)
            return {
              text: `*📝 Lirik:*\n- ${globalData.lyrics.trim()}\n\n- _By Global API_`,
              image: globalData?.image,
            };
          const textylData = await fetchData(
            `https://api.textyl.co/api/lyrics?q=${encodeURIComponent(text)}`,
          );
          if (textylData?.length)
            return {
              text: `*📝 Lirik:*\n- ${textylData
                .map((item) => item.lyrics)
                .join("\n")
                .trim()}\n\n- _By Textyl API_`,
              image: null,
            };
          const kingAryanData = await fetchData(
            `https://king-aryanapis.onrender.com/api/lyrics?songName=${encodeURIComponent(text)}`,
          );
          if (kingAryanData?.lyrics)
            return {
              text: `*📝 Lirik:*\n- ${kingAryanData.lyrics.trim()}\n\n- _By King Aryan API_`,
              image: kingAryanData?.image,
            };
          const lyricsFreakData = await fetch(
            `https://www.lyricsfreak.com/search.php?a=search&q=${encodeURIComponent(text)}`,
          );
          const lyricsFreakHtml = await lyricsFreakData.text();
          const $ = cheerio.load(lyricsFreakHtml);
          const songLink = $(".song").attr("href");
          if (songLink) {
            const songPage = await fetch(
              `https://www.lyricsfreak.com${songLink}`,
            );
            const songData = await songPage.text();
            const $ = cheerio.load(songData);
            const lyrics = $(".lyrictxt").text();
            if (lyrics)
              return {
                text: `*📝 Lirik:*\n- ${lyrics.trim()}\n\n- _By LyricsFreak_`,
                image: null,
              };
          }
          const lyristData = await fetchData(
            `https://lyrist.vercel.app/api/${encodeURIComponent(text)}`,
          );
          if (lyristData?.lyrics)
            return {
              text: `*🎵 Judul:*\n${lyristData.title || nothing}\n\n*📝 Lirik:*\n- ${lyristData.lyrics.trim() || nothing}\n\n*🎤 Penyanyi:*\n${lyristData.artist || nothing}\n\n- _By Lyrist API_`,
              image: lyristData?.image || null,
            };
        } catch (err) {
          return null;
        }
      },
    ];
    for (let provider of providers) {
      const resultData = await provider();
      if (resultData) {
        result = resultData.text;
        image = resultData.image;
        break;
      }
    }
    image = image || `${fla}${command}`;
    if (result) {
      await conn.reply(m.chat, result, m, {
        contextInfo: {
          mentionedJid: [m.sender],
        },
      });
    } else {
      m.reply("❌ *Tidak dapat menemukan lirik!*");
    }
  } catch (e) {
    m.react(eror);
    console.log(e);
  }
};
handler.help = ["lirik"].map((v) => v + " <judul>");
handler.tags = ["internet"];
handler.command = /^l(irik(musik)?|yrics?)$/i;
export default handler;
async function getLyrics(url) {
  try {
    const response = await fetch(
      `${Object.entries(APIs).find(([key]) => key.includes("proxy"))?.[1]}${url}`,
    );
    const html = await response.text();
    const $ = cheerio.load(html);
    let lyrics = "";
    $('div[class^="Lyrics__Container"]').each((i, elem) => {
      if ($(elem).text().length) {
        const snippet = $(elem)
          .html()
          .replace(/<br>/g, "\n")
          .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, "");
        lyrics += $("<textarea/>").html(snippet).text().trim() + "\n\n";
      }
    });
    return lyrics;
  } catch {
    return null;
  }
}
