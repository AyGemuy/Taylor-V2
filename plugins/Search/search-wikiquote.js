import WikiquoteApi from "../../lib/wikiquote-api.js";
async function displaySearchList(query) {
  try {
    return await WikiquoteApi.openSearch(query);
  } catch (error) {
    return console.error("Error fetching search results:", error.message), [];
  }
}
async function displayQuotes(pageId, sectionIndexes) {
  try {
    await WikiquoteApi.getSectionsForPage(pageId);
    return await WikiquoteApi.getQuotesForSection(pageId, sectionIndexes);
  } catch (error) {
    return console.error("Error fetching quotes:", error.message), null;
  }
}
const handler = async (m, {
  text
}) => {
  let [query, number] = text.split("|");
  const searchResults = await displaySearchList(query);
  if (void 0 === number) return 0 === searchResults.length ? m.reply(`Tidak ditemukan hasil pencarian untuk "${query}".`) : m.reply(`Hasil pencarian:\n${searchResults.join("\n")}`);
  const pageId = await WikiquoteApi.queryTitles(searchResults[0]),
    sections = await WikiquoteApi.getSectionsForPage(pageId),
    validNumber = parseInt(number);
  if (isNaN(validNumber) || validNumber <= 0 || validNumber > sections.sections.length) {
    const availableNumbers = Array.from({
      length: sections.sections.length
    }, (_, i) => i + 1);
    return m.reply(`Nomor tidak valid untuk "${searchResults[0]}". Pilihan nomor yang tersedia: ${availableNumbers.join(", ")}.`);
  }
  const quotes = await displayQuotes(pageId, [sections.sections[validNumber - 1]]);
  if (!quotes) return m.reply(`Gagal mengambil kutipan untuk "${searchResults[0]}".`);
  const formattedQuoteText = quotes.quotes.map(quote => quote.replace(/<\/?[^>]+(>|$)/g, "")).join("\n\n");
  m.reply(`Kutipan dari "${quotes.titles}":\n\n${formattedQuoteText}`);
};
handler.help = ["wikiquote"], handler.tags = ["internet"], handler.command = /^(wikiquote)$/i;
export default handler;