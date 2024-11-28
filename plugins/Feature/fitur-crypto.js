import fetch from "node-fetch";
const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(
      "🔍 *Cari Cryptocurrency*\n\nContoh penggunaan:\n*.crypto bitcoin*",
    );
  }
  m.react(wait);
  try {
    const results = await coingecko(text);
    if (!results || results.length === 0) {
      m.reply(
        "⚠️ *Tidak ditemukan*: Cryptocurrency yang kamu cari tidak tersedia.",
      );
      return;
    }
    const message = results
      .map(
        (result) =>
          `💰 *${result.cryptoName}*\n📈 Perubahan Harga: ${result.priceChange}\n`,
      )
      .join("\n");
    m.reply(`📊 *Hasil Pencarian Cryptocurrency:*\n\n${message}`);
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
    m.reply("❌ *Terjadi kesalahan saat mengambil data. Coba lagi nanti.*");
  }
};
handler.help = ["crypto <query>"];
handler.command = ["crypto"];
handler.tags = ["finance"];
export default handler;
async function coingecko(search) {
  const apiUrl = new URL("https://api.coingecko.com/api/v3/coins/markets");
  apiUrl.searchParams.append("vs_currency", "usd");
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    const result = data
      .filter((crypto) =>
        crypto.name.toLowerCase().includes(search.toLowerCase()),
      )
      .map((crypto) => ({
        cryptoName: `${crypto.name} (${crypto.symbol}) - $${crypto.current_price}`,
        priceChange: `${crypto.price_change_percentage_24h.toFixed(2)}%`,
      }));
    return result;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
