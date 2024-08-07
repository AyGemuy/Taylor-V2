import got from "got";
import cheerio from "cheerio";
const handler = async (m, {
  text,
  usedPrefix,
  command
}) => {
  if (!text) throw `uhm.. teksnya mana?\n\ncontoh:\n${usedPrefix + command} kejadian`;
  try {
    let hasil = `🔍 *[ RESULT ]*\n\n${(await searchAlkitab(text)).map(item => `📌 *Title:* ${item.title}\n🔗 *Link:* ${item.link}\n📝 *Description:* ${item.description}\n`).join("\n________________________\n")}`;
    m.reply(hasil);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["alkitab"].map(v => v + " <pencarian>"), handler.tags = ["kristian"],
  handler.command = /^(alkitab)$/i;
export default handler;
async function searchAlkitab(q) {
  const url = "https://alkitab.me/search?q=" + q;
  try {
    const {
      body
    } = await got(url), $ = cheerio.load(body), results = [];
    return $("#main.search-results .vw").each((index, element) => {
      if (0 !== index) {
        const link = $(element).find("a").attr("href"),
          title = $(element).find("a").text().trim(),
          description = $(element).find("p.vc").text().trim();
        results.push({
          title: title,
          link: link,
          description: description
        });
      }
    }), results;
  } catch (error) {
    return console.error("Error:", error.message), [];
  }
}