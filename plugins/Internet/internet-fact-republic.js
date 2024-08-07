import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  m.react(wait);
  try {
    let item = await getRandomFact(),
      cap = `🔍 *[ RESULT ]*\n\n📚 Title: ${item.title}\n🔗 Link: ${item.source}\n📖 Description: ${item.description}\n`;
    await conn.sendFile(m.chat, item.image || logo, "", cap, m);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["factrepublic"], handler.tags = ["internet"], handler.command = /^(factrepublic)$/i;
export default handler;
async function getRandomFact() {
  try {
    const url = "https://factrepublic.com/random-facts-generator/",
      response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch the page");
    const html = await response.text(),
      $ = cheerio.load(html),
      randomIndex = Math.floor(Math.random() * $(".td-item").length),
      randomFactElement = $(".td-item").eq(randomIndex);
    return {
      title: randomFactElement.find(".td-sml-current-item-title").text(),
      description: randomFactElement.find(".td-sml-description p").text(),
      image: randomFactElement.find("img").attr("src"),
      source: randomFactElement.find(".source").attr("href")
    };
  } catch (error) {
    throw new Error("An error occurred while fetching or parsing the data");
  }
}