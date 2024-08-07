import fetch from "node-fetch";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  if (!text) {
    return m.reply("*Example:*\n.deezer sfw|wave");
  }
  m.react(wait);
  try {
    let data = await searchDeezer(text);
    let list = data.data.map((item, index) => `*${++index}.* *Title:* ${item.title}\n` + `*ID:* ${item.id}\n` + `*Artist:* ${item.artist.name}\n` + `*Duration:* ${item.duration}\n` + `*Link:* ${item.link}\n` + `*Preview:* ${item.preview}`).join("\n\n");
    await conn.sendFile(m.chat, data.data[0]?.artist.picture, "", `*📺 Deezer Search 🔎*\n\n${list}`, m);
  } catch (error) {
    console.error("Error fetching Deezer data:", error);
    m.reply("Terjadi kesalahan saat mencari lagu di Deezer.");
  }
};
handler.help = ["deezer query"];
handler.tags = ["internet"];
handler.command = /^(deezer)$/i;
export default handler;
async function searchDeezer(query) {
  try {
    let res = await fetch("https://api.deezer.com/2.0/search?q=" + query);
    return await res.json();
  } catch (error) {
    console.error("Error fetching Deezer data:", error);
    throw new Error("Terjadi kesalahan saat mencari data dari Deezer API.");
  }
}