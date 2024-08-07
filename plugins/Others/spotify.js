import {
  spotifySearch
} from "../../lib/scraper/scraped-downloader.js";
import {
  music
} from "@xct007/frieren-scraper";
const handler = async (m, {
  conn,
  text
}) => {
  if (!text) throw "Masukkan judul musik!";
  try {
    let json = await spotifySearch(text),
      {
        title,
        artist,
        album,
        thumbnail,
        url,
        preview_mp3
      } = json[0],
      spotifyinfo = `✨️ *Title:* ${title}\n🗣️ *Artists:* ${artist}\n🎆️ *Album:* ${album}\n🌐️ *URL*: ${url}\n💚️ *Direct URL:* ${preview_mp3}`;
    await conn.sendFile(m.chat, thumbnail, "", spotifyinfo, m), await conn.sendFile(m.chat, preview_mp3, "spotify.mp3", spotifyinfo, m);
  } catch (e) {
    try {
      let json = await music.search(text),
        {
          title,
          artist,
          album,
          thumbnail,
          release_date,
          audio
        } = json[0],
        spotifyinfo = `✨️ *Title:* ${title}\n🗣️ *Artists:* ${artist}\n🎆️ *Album:* ${album}\n🌐️ *Date*: ${release_date}\n💚️ *Direct URL:* ${audio}`;
      await conn.sendFile(m.chat, thumbnail, "", spotifyinfo, m), await conn.sendFile(m.chat, audio, "spotify.mp3", spotifyinfo, m);
    } catch (e) {
      m.react(eror);
    }
  }
};
handler.help = ["spotify <query>"], handler.tags = ["internet"], handler.command = /^(spotify|music)$/i;
export default handler;