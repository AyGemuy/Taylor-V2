import SpotifyAPI from "../../lib/download/spotify-down.js";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) return await conn.reply(m.chat, "Harap Masukan Query", m);
  m.reply("Searching...");
  const spotify = await SpotifyAPI();
  var json = await spotify.trackSearch(text);
  let ini_txt = "✨ *Spotify Search* ✨";
  for (const x of json.tracks.items) ini_txt += `\n      \n🎵 *Judul:* ${x.name}\n👥 *Artis:* ${x.artists.map(v => v.name).join(", ")}\n👥 *Artis Album:* ${x.album.artists.map(v => v.name).join(", ")}\n🆔 *ID:* ${x.id}\n📅 *Tanggal Rilis Album:* ${x.album.release_date}\n🆔 *ID Album:* ${x.album.id}\n🎵 *Jumlah Trek Album:* ${x.album.total_tracks}\n🔢 *Nomor Trek:* ${x.album.track_number}\n⏳ *Durasi:* ${x.duration_ms} ms\n🔗 *Uri:* ${x.uri}\n🎵 *URL Album*: ${x.album.external_urls.spotify}\n🔗 *URL:* ${x.external_urls.spotify}\n${x.preview_url ? `🎧 *Direct URL:* ${x.preview_url}` : ""}\n───────────────────`;
  m.reply(ini_txt);
};
handler.help = ["spotif"].map(v => v + " <query>"), handler.tags = ["tools"],
  handler.command = /^(spotif)$/i, handler.owner = !1, handler.exp = 0, handler.limit = !0;
export default handler;