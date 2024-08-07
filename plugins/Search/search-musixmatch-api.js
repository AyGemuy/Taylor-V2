import fetch from "node-fetch";
const API_KEY = "46a908cae9e6fe663a1fe8ef339f08f6";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  const lister = ["search", "top", "lyrics", "track"];
  const [feature, inputs] = text.split("|");
  if (!lister.includes(feature)) {
    return m.reply(`*Example:*\n.${command} search|adel\n\n*Pilih jenis yang tersedia:*\n${lister.map(v => `  ○ ${v}`).join("\n")}`);
  }
  if (!inputs) {
    return m.reply(`Input query!\n*Contoh:*\n.${command} search|hello`);
  }
  m.react(wait);
  try {
    let teks;
    switch (feature) {
      case "search":
        teks = await searchMusixMatch(inputs);
        break;
      case "top":
        teks = await getTopTracks();
        break;
      case "lyrics":
        teks = await getLyrics(inputs);
        break;
      case "track":
        teks = await getTrackInfo(inputs);
        break;
      default:
        throw "Invalid feature";
    }
    await conn.reply(m.chat, formatMessage(teks), m, {
      adReply: true
    });
  } catch (error) {
    m.react(eror);
  }
};
handler.help = ["mm type query"];
handler.tags = ["internet"];
handler.command = /^(mm)$/i;
export default handler;
async function searchMusixMatch(query) {
  try {
    const SEARCH_URL = `https://api.musixmatch.com/ws/1.1/track.search?q_track=${query}&page_size=10&page=1&s_track_rating=desc&apikey=${API_KEY}`;
    const response = await fetch(SEARCH_URL);
    const data = await response.json();
    const {
      track_list
    } = data.message.body;
    return track_list;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
}
async function getTopTracks() {
  try {
    const TOP_TEN_SONGS_URL = `https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=ind&f_has_lyrics=1&apikey=${API_KEY}`;
    const response = await fetch(TOP_TEN_SONGS_URL);
    const data = await response.json();
    const {
      track_list
    } = data.message.body;
    return track_list;
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    throw error;
  }
}
async function getLyrics(trackId) {
  try {
    const FETCH_LYRICS_URL = `https://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=${trackId}&apikey=${API_KEY}`;
    const response = await fetch(FETCH_LYRICS_URL);
    const data = await response.json();
    const {
      lyrics
    } = data.message.body;
    return lyrics;
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    throw error;
  }
}
async function getTrackInfo(trackId) {
  try {
    const FETCH_TRACK_URL = `https://api.musixmatch.com/ws/1.1/track.get?commontrack_id=${trackId}&apikey=${API_KEY}`;
    const response = await fetch(FETCH_TRACK_URL);
    const data = await response.json();
    const {
      track
    } = data.message.body;
    return track;
  } catch (error) {
    console.error("Error fetching track info:", error);
    throw error;
  }
}

function formatMessage(results) {
  if (!results || results.length === 0) {
    return "Tidak ada hasil yang ditemukan.";
  }
  return results.map((result, index) => {
    switch (result.track) {
      case "search":
        return formatSearchResult(result);
      case "top":
        return formatTopResult(result);
      case "lyrics":
        return formatLyricsResult(result);
      case "track":
        return formatTrackResult(result);
      default:
        return "";
    }
  }).join("\n\n________________________\n\n");
}

function formatSearchResult(result) {
  return `*乂 Search ${result.index + 1} 乂*\n` + `*track_id:* ${result.track.track_id}\n` + `*commontrack_id:* ${result.track.commontrack_id}\n` + `*track_name:* ${result.track.track_name}\n` + `*track_rating:* ${result.track.track_rating}\n` + `*has_lyrics:* ${result.track.has_lyrics}\n` + `*artist_name:* ${result.track.artist_name}\n` + `*updated_time:* ${result.track.updated_time}\n` + `*track_share_url:* ${result.track.track_share_url}\n`;
}

function formatTopResult(result) {
  return `*乂 Top ${result.index + 1} 乂*\n` + `*track_id:* ${result.track.track_id}\n` + `*commontrack_id:* ${result.track.commontrack_id}\n` + `*track_name:* ${result.track.track_name}\n` + `*track_rating:* ${result.track.track_rating}\n` + `*has_lyrics:* ${result.track.has_lyrics}\n` + `*artist_name:* ${result.track.artist_name}\n` + `*updated_time:* ${result.track.updated_time}\n` + `*track_share_url:* ${result.track.track_share_url}\n`;
}

function formatLyricsResult(result) {
  return `*乂 Lirik 乂*\n${result.lyrics_body || "Tidak diketahui"}\n\n` + `*乂 Copyright 乂*\n${result.lyrics_copyright || "Tidak diketahui"}\n\n` + `*乂 Update 乂*\n${result.updated_time || "Tidak diketahui"}\n\n` + `_By musixmatch_`;
}

function formatTrackResult(result) {
  return `*乂 Track 乂*\n` + `*track_id:* ${result.track_id}\n` + `*commontrack_id:* ${result.commontrack_id}\n` + `*track_name:* ${result.track_name}\n` + `*album_id:* ${result.album_id}\n` + `*album_name:* ${result.album_name}\n` + `*artist_name:* ${result.artist_name}\n` + `*updated_time:* ${result.updated_time}\n` + `*track_share_url:* ${result.track_share_url}\n`;
}