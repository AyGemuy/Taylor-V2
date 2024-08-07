import cheerio from "cheerio";
import fetch from "node-fetch";
async function wikihowSearch(quer) {
  try {
    const response = await fetch(`https://id.wikihow.com/wikiHowTo?search=${quer}`);
    if (response.ok) {
      const html = await response.text(),
        $ = cheerio.load(html),
        data = [];
      return $("div a.result_link").each(function(a, b) {
        data.push({
          title: $(b).find("div.result_title").text().trim(),
          date: $(b).find("li.sr_updated").text().trim().replace(/[\t]/g, "").replace(/[\n]/g, " "),
          view: $(b).find("li.sr_view").text().trim().replace(/[\t]/g, "").replace(/[\n]/g, " "),
          link: $(b).attr("href")
        });
      }), data;
    }
  } catch (error) {
    throw error;
  }
}
async function wikihowRead(text) {
  try {
    const response = await fetch(text);
    if (response.ok) {
      const html = await response.text(),
        $ = cheerio.load(html),
        data = [];
      return $("div.step").each(function(a, b) {
        data.push({
          title: $(b).find("b").text().trim(),
          data: $(b).find("li").text().trim().replace(/[\[\]0-9]/g, "").replace(/[\t]/g, "").replace(/[\n]/g, " ")
        });
      }), data;
    }
  } catch (error) {
    throw error;
  }
}
export {
  wikihowSearch,
  wikihowRead
};