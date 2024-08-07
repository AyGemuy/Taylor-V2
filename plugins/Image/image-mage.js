import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  command,
  args
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  try {
    m.react(wait);
    let res = await ComicvineSearch(text),
      list = res.results.map((item, index) => `*${htki} SEARCH ${htka}*\n\n*ID:* ${item.id}\n*Name:* ${item.name}\n*Deck:* ${item.deck}\n\n`).join("\n"),
      list1 = (await ComicvineCharacters()).results.map((item, index) => `*${htki} CHARACTER ${htka}*\n\n*ID:* ${item.id}\n*Name:* ${item.name}\n*Deck:* ${item.deck}\n*Alias:* ${item.aliases}\n\n`).join("\n"),
      list2 = (await ComicvineVideos()).results.map((item, index) => `*${htki} VIDEOS ${htka}*\n\n*ID:* ${item.id}\n*GUID:* ${item.guid}\n*Name:* ${item.name}\n*Hurl:* ${item.high_url}\n*Deck:* ${item.deck}\n\n`).join("\n");
    await conn.sendFile(m.chat, res.results[0]?.image.original_url, "result", "\n" + list + "\n" + list1 + "\n" + list2, m);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["comicvine"], handler.tags = ["search"], handler.command = /^(comicvine)$/i;
export default handler;
async function ComicvineSearch(query) {
  const response = await fetch("https://www.comicvine.com/api/search?format=json&field_list=name,id,deck,image&api_key=d800216c205879548fdc491e0a260ff402633c00&query=" + query);
  return await response.json();
}
async function ComicvineCharacters() {
  const response = await fetch("https://www.comicvine.com/api/characters?format=json&api_key=d800216c205879548fdc491e0a260ff402633c00");
  return await response.json();
}
async function ComicvineVideos() {
  const response = await fetch("https://www.comicvine.com/api/videos?format=json&api_key=d800216c205879548fdc491e0a260ff402633c00");
  return await response.json();
}