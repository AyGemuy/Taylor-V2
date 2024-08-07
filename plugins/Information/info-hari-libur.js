import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  conn
}) => {
  try {
    m.react(wait);
    const {
      nextLibur,
      libnas_content
    } = await HariLibur();
    let caption = `📅 *Hari Libur Nasional Berikutnya* 📅\n\n🎉 ${nextLibur}\n\n📋 *Daftar Hari Libur Nasional:*\n`;
    caption += libnas_content.map(item => `\n🌟 *${item.summary}*\n📅 ${item.dateMonth}\n🗓️ ${item.days}\n`).join("");
    await conn.reply(m.chat, caption, m);
    m.react("✅");
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["harilibur", "liburnasional"];
handler.tags = ["info"];
handler.command = /^(harilibur|liburnasional)$/i;
handler.limit = true;
export default handler;
async function HariLibur() {
  try {
    const response = await fetch("https://www.liburnasional.com/");
    const html = await response.text();
    const $ = cheerio.load(html);
    const nextLibur = $("div.row.row-alert > div").text().split("Hari libur")[1].trim();
    const libnas_content = $("tbody > tr > td > span > div").map((index, element) => {
      const summary = $(element).find("span > strong > a").text();
      const days = $(element).find("div.libnas-calendar-holiday-weekday").text();
      const dateMonth = $(element).find("time.libnas-calendar-holiday-datemonth").text();
      return {
        summary: summary,
        days: days,
        dateMonth: dateMonth
      };
    }).get();
    return {
      nextLibur: nextLibur,
      libnas_content: libnas_content
    };
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    throw error;
  }
}