import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  isPrems,
  isOwner,
  usedPrefix,
  command
}) => {
  if (!args || !args[0]) throw `✳️ Example :\n${usedPrefix + command} youtube link (playlist)`;
  m.react(wait);
  try {
    args[1];
    let v = args[0],
      cap = `🔍 *[ RESULT ]*\n📝 Link: ${(await YoutubePlaylist(v)).download_url || "Tidak diketahui"}\n`;
    m.reply(cap);
  } catch {
    m.react(eror);
  }
};
handler.help = ["playlist", "v", ""].map(v => "yt" + v + " <url> <without message>"),
  handler.tags = ["downloader"], handler.command = /^y(outube(playlist|playlistdl)|t((playlist)|playlistdl))$/i,
  handler.exp = 0, handler.register = !1, handler.limit = !0;
export default handler;
async function shortUrl(url) {
  let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`);
  return await res.text();
}
async function YoutubePlaylist(url, format) {
  try {
    const downloadData = await (await fetch(`https://loader.to/ajax/download.php?format=${format}&url=${url}`)).json();
    return await (await fetch(`https://loader.to/ajax/progress.php?id=${downloadData.id}`)).json();
  } catch (error) {
    return {
      error: error.message
    };
  }
}