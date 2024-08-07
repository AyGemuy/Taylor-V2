import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "read", "list"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.wattpad search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .wattpad read|5\nList: .wattpad list");
      m.react(wait);
      try {
        let teks = (await searchWattpad(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n🔗 Link: ${item.link}\n🖼️ Image: ${item.image}\n📚 Title: ${item.title}\n👁️‍🗨️ Read Count: ${item.readCount}\n🔥 Vote Count: ${item.voteCount}\n📖 Chapter Count: ${item.chapterCount}\nℹ️ Description: ${item.description}\n  `).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("list" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .wattpad read|5\nList: .wattpad list");
      m.react(wait);
      try {
        let lin = await getStartReadingLink(inputs),
          teks = (await listRead(lin)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📚 Title: ${item.title}\n🔗 Link: ${item.link}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("read" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .wattpad read|5\nList: .wattpad list");
      m.react(wait);
      try {
        let cap = `🔍 *[ RESULT ]*\n\n📝 Content: ${await readWattpad(inputs)}\n`;
        m.reply(cap);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["wattpad"], handler.tags = ["internet"], handler.command = /^(wattpad)$/i;
export default handler;
async function searchWattpad(q) {
  const baseUrl = "https://www.wattpad.com",
    url = `${baseUrl}/search/${q}`,
    response = await fetch(url),
    body = await response.text(),
    $ = cheerio.load(body);
  return $("section#section-results-stories article#results-stories ul.list-group li.list-group-item").map((index, element) => ({
    link: baseUrl + $(element).find(".story-card").attr("href"),
    image: $(element).find(".cover img").attr("src"),
    title: $(element).find('.story-info .title[aria-hidden="true"]').first().text().trim(),
    readCount: $(element).find(".new-story-stats .stats-value").eq(0).text(),
    voteCount: $(element).find(".new-story-stats .stats-value").eq(1).text(),
    chapterCount: $(element).find(".new-story-stats .stats-value").eq(2).text(),
    description: $(element).find(".description").text().trim()
  })).get();
}
async function readWattpad(url, page = 1, output = "\n\n", prevTitle = null) {
  const pageURL = `${url}/page/${page}`,
    response = await fetch(pageURL),
    text = await response.text(),
    $ = cheerio.load(text),
    newTitle = $("title").text();
  if (newTitle === prevTitle) {
    const nextURL = $("a.on-navigate.next-up").attr("href");
    return nextURL ? readWattpad(nextURL, 1, output + `\n\n\t${prevTitle}\n`, null) : output;
  }
  return console.log(newTitle, text.length), $("p").each((index, element) => {
    const paragraph = $(element).text().trim();
    output += `${paragraph}\n`;
  }), readWattpad(url, page + 1, output, newTitle);
}
async function getStartReadingLink(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return "https://www.wattpad.com" + $("a.read-btn").attr("href");
  } catch (error) {
    throw new Error("Error fetching data:", error);
  }
}
async function listRead(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $('ul.table-of-contents li[class=""]').map((index, element) => ({
      title: $(element).find(".part-title").text().trim(),
      link: "https://www.wattpad.com" + $(element).find("a.on-navigate").attr("href")
    })).get();
  } catch (error) {
    return console.error("Error:", error), null;
  }
}