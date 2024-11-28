import fetch from "node-fetch";
import { spotifySearch } from "../../lib/scraper/scraped-downloader.js";
const MusicApiJamendoBaseUrl = "https://api.jamendo.com";
const search = async (query, limitValue = 50) => {
  try {
    const response = await fetch(
      `${MusicApiJamendoBaseUrl}/v3.0/tracks/?client_id=f5db3eb4&format=json&limit=${limitValue}&order=downloads_total&imagesize=200&namesearch=${encodeURIComponent(query)}`,
    );
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    if (data.results?.length) {
      return data.results
        .filter((v) => v.audiodownload_allowed && v.audio)
        .map((obj) => ({
          title: obj.name,
          artist: obj.artist_name,
          album: obj.album_name,
          release_date: obj.releasedate,
          thumbnail: obj.image,
          audio: obj.audio,
        }));
    } else {
      throw new Error("No results found");
    }
  } catch (e) {
    return {
      error: true,
      message: e.message,
    };
  }
};
const spotifyDownload = async (query) => {
  try {
    const isSpotifyLink = query.includes("spotify.com/track/");
    const searchUrl = isSpotifyLink
      ? `https://manaxu-seven.vercel.app/api/downloader/spotify?url=${query}`
      : `https://manaxu-seven.vercel.app/api/internet/spotify?query=${encodeURIComponent(query)}`;
    const res = await fetch(searchUrl);
    const data = await res.json();
    if (
      !data.status ||
      (isSpotifyLink ? !data.result : data.result.length === 0)
    ) {
      throw new Error("Tidak ditemukan hasil untuk query tersebut.");
    }
    return isSpotifyLink
      ? data.result
      : (
          await fetch(
            `https://manaxu-seven.vercel.app/api/downloader/spotify?url=${data.result[0]?.link}`,
          )
        ).json().result;
  } catch (e) {
    return {
      error: e.message || "Gagal mengunduh lagu dari Spotify.",
    };
  }
};
const handler = async (m, { conn, text }) => {
  if (!text) return m.reply("Masukan query!");
  try {
    const result = await spotifyDownload(text);
    if (result?.error) throw new Error(result.error);
    const { title, artis, durasi, image, download } = result;
    const msg = `
🎶 *Title:* ${title}
🎤 *Artist:* ${artis}
⏱️ *Duration:* ${Math.floor(durasi / 6e4)}:${Math.floor((durasi % 6e4) / 1e3)
      .toString()
      .padStart(2, "0")}
📥 *Download:* ${download}
    `;
    await conn.sendMessage(m.chat, {
      image: {
        url: image,
      },
      caption: msg,
    });
    await conn.sendMessage(
      m.chat,
      {
        audio: {
          url: download,
        },
        mimetype: "audio/mp4",
        fileName: `${title}.mp3`,
      },
      {
        quoted: m,
      },
    );
  } catch (e) {
    try {
      const json = await spotifySearch(text);
      const { title, artist, album, thumbnail, url, preview_mp3 } = json[0];
      const spotifyinfo = `✨️ *Title:* ${title}\n🗣️ *Artists:* ${artist}\n🎆️ *Album:* ${album}\n🌐️ *URL*: ${url}\n💚️ *Direct URL:* ${preview_mp3}`;
      await conn.sendFile(m.chat, thumbnail, "", spotifyinfo, m);
      await conn.sendFile(m.chat, preview_mp3, "spotify.mp3", spotifyinfo, m);
    } catch (e) {
      try {
        const json = await search(text);
        if (json.error) throw new Error(json.message);
        const { title, artist, album, thumbnail, release_date, audio } =
          json[0];
        const spotifyinfo = `✨️ *Title:* ${title}\n🗣️ *Artists:* ${artist}\n🎆️ *Album:* ${album}\n🌐️ *Date*: ${release_date}\n💚️ *Direct URL:* ${audio}`;
        await conn.sendFile(m.chat, thumbnail, "", spotifyinfo, m);
        await conn.sendFile(m.chat, audio, "spotify.mp3", spotifyinfo, m);
      } catch (e) {
        console.log(e);
        m.react(eror);
      }
    }
  }
};
handler.help = ["spotify <query>"];
handler.tags = ["internet"];
handler.command = /^(spotify|music)$/i;
export default handler;
