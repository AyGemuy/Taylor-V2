import fetch from "node-fetch";
import * as cheerio from "cheerio";
class Tazkia {
  constructor(baseUrl = "https://hadits.tazkia.ac.id") {
    this.baseUrl = baseUrl;
  }
  async search(query) {
    try {
      const res = await fetch(`${this.baseUrl}/search/hadits?q=${query}`);
      const html = await res.text();
      const $ = cheerio.load(html);
      return (
        $(".hadits")
          .map((i, el) => ({
            title: $(el).find("h2").text(),
            arabic: $(el).find(".arabic").text(),
            indonesia: $(el).find(".indonesia").text(),
          }))
          .get() || "No results found"
      );
    } catch (err) {
      return `Error: ${err.message}`;
    }
  }
}
export { Tazkia };
