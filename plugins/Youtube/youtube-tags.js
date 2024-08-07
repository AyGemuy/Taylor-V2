import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  m.react(wait);
  try {
    let teks = await getYouTubeTags(text);
    m.reply(teks);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["yttags"], handler.tags = ["internet"], handler.command = /^(yttags)$/i;
export default handler;
async function getYouTubeTags(url) {
  try {
    const response = await fetch(url),
      body = await response.text(),
      $ = cheerio.load(body);
    return $('meta[name="keywords"]').attr("content");
  } catch (error) {
    return console.error("Error:", error), null;
  }
}