import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  text,
  args,
  usedPrefix,
  command
}) => {
  if (!text) throw "Input query and caption required\n*Example:* " + usedPrefix + command + " 516088";
  try {
    const formattedList = (await GenerateCC(text)).map((card, index) => `- *CARD ${index + 1}:*\n  Card Number: ${card.CardNumber}\n  Expiration Date: ${card.ExpirationDate}\n  CVV: ${card.CVV}`).join("\n\n");
    m.reply(formattedList);
  } catch (e) {
    m.reply("Error occurred");
  }
};
handler.help = ["vccgen"].map(v => v + " (query)"), handler.tags = ["generator"],
  handler.command = /^(vccgen)$/i, handler.limit = !0;
export default handler;
async function GenerateCC(query) {
  try {
    const response = await fetch("https://tools.revesery.com/vcc/revesery.php?bin=" + parseInt(query), {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
      }
    });
    if (!response.ok) throw new Error("Gagal mengambil data.");
    const html = await response.text(),
      $ = cheerio.load(html),
      cards = [];
    return $("hr").each((index, element) => {
      const [cardNumber, expirationDate, cvv] = $(element).prevAll("p").map((i, el) => $(el).text().split(": ")[1]);
      cards.push({
        CardNumber: cardNumber,
        ExpirationDate: expirationDate,
        CVV: cvv
      });
    }), cards;
  } catch (error) {
    throw console.error(error), new Error("Failed to perform the search");
  }
}