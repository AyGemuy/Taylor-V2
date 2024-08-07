import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  if (!text) return m.reply("*Example:*\n.quotesweb 1");
  if (!/^\d+$/.test(text)) return m.reply("Input harus berupa angka");
  m.react(wait);
  try {
    let src = await fetchQuotes(text),
      json = src[Math.floor(Math.random() * src.length)],
      output = Object.entries(json).map(([key, value]) => `  ○ *${key.toUpperCase()}:* ${value}`).join("\n");
    m.reply(output);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["quotesweb page"], handler.tags = ["internet"], handler.command = /^(quotesweb)$/i;
export default handler;
async function fetchQuotes(page) {
  try {
    const response = await fetch("https://www.goodreads.com/quotes/tag/indonesia?page=" + page),
      html = await response.text(),
      $ = cheerio.load(html),
      quotes = [];
    return $(".quoteDetails").each((index, element) => {
      const quotes = $(".quoteText", element).text().trim(),
        author = $(".authorOrTitle", element).text().trim(),
        tags = $('.quoteFooter a[href^="/quotes/tag/"]', element).map((index, tagElement) => $(tagElement).text().trim()).get(),
        likes = $(".quoteFooter a.smallText", element).text().trim();
      quotes.push({
        quotes: quotes,
        author: author,
        tags: tags,
        likes: likes
      });
    }), quotes;
  } catch (error) {
    return console.error("Error fetching quotes:", error), [];
  }
}