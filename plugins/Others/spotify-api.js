import fetch from "node-fetch";
const SpotifyApiBaseUrl = "https://spotifyapi.caliphdev.com/api";
const search = async (query) => {
  try {
    const searchUrl = `${SpotifyApiBaseUrl}/search/tracks?q=${encodeURIComponent(query)}`;
    const response = await fetch(searchUrl, {
      headers: {
        accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
        Referer:
          "https://spotifyapi.caliphdev.com/#/default/get_api_search_tracks",
      },
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    if (data.length === 0) throw new Error("No results found");
    const track = data[0];
    const downloadUrl = `${SpotifyApiBaseUrl}/download/track?url=${encodeURIComponent(track.url)}`;
    const downloadRes = await fetch(downloadUrl, {
      headers: {
        accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
        Referer:
          "https://spotifyapi.caliphdev.com/#/default/get_api_download_track",
      },
    });
    if (!downloadRes.ok)
      throw new Error(`HTTP error! Status: ${downloadRes.status}`);
    const downloadArrayBuffer = await downloadRes.arrayBuffer();
    const downloadBuffer = Buffer.from(downloadArrayBuffer);
    if (!downloadBuffer) throw new Error("Failed to download track");
    return {
      title: track.title,
      artist: track.artist,
      album: track.album,
      thumbnail: track.thumbnail,
      download: downloadBuffer,
    };
  } catch (e) {
    return {
      error: e.message || "Failed to download track from Spotify.",
    };
  }
};
const handler = async (m, { conn, text }) => {
  if (!text) return m.reply("Masukan query!");
  try {
    m.react(wait);
    const result = await search(text);
    if (result?.error) throw new Error(result.error);
    const { title, artist, album, thumbnail, download } = result;
    const msg = `
🎶 *Title:* ${title}
🎤 *Artist:* ${artist}
🎆 *Album:* ${album}
📥 *Download:* Available
    `;
    await conn.sendMessage(m.chat, {
      image: {
        url: thumbnail,
      },
      caption: msg,
    });
    await conn.sendMessage(
      m.chat,
      {
        audio: download,
        mimetype: "audio/mp4",
        fileName: `${title}.mp3`,
      },
      {
        quoted: m,
      },
    );
    m.react(sukses);
  } catch (e) {
    console.log(e);
    m.react(eror);
  }
};
handler.help = ["spotifyapi <query>"];
handler.tags = ["internet"];
handler.command = /^(spotifyapi)$/i;
export default handler;
