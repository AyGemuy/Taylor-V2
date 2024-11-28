import fetch from "node-fetch";
const handler = async (m, { conn }) => {
  try {
    const quotes = await quotesbucin();
    if (quotes.length > 0) {
      const filteredQuotes = quotes
        .split("\n")
        .filter((_, index) => index !== 1 && index !== quotes.length - 1);
      const randomQuote = filteredQuotes[
        Math.floor(Math.random() * filteredQuotes.length)
      ].slice(1, -2);
      await conn.reply(m.chat, `${randomQuote}`, m);
    } else {
      await conn.reply(m.chat, "Tidak ada kutipan yang tersedia.", m);
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, "Terjadi kesalahan saat mengambil kutipan.", m);
  }
};
handler.help = ["quotesbucin"];
handler.tags = ["quotes"];
handler.command = /^(quotesbucin)$/i;
export default handler;
async function quotesbucin() {
  try {
    const url =
      "https://raw.githubusercontent.com/onlybot12/galau/a3d5c0a37435a9c694c6b69e027385c1fd776df0/bucin.json";
    let res = await fetch(url);
    return await res.text();
  } catch (error) {
    console.error(error);
    return [];
  }
}
