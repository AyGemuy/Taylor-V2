import cheerio from "cheerio";
import axios from "axios";
class WABetaInfo {
  async home() {
    try {
      const {
        data
      } = await axios.get("https://wabetainfo.com"), $ = cheerio.load(data);
      return $('article[id^="post-"]').map((_, el) => ({
        title: $(".entry-title a", el).text().trim(),
        date: new Date($(".published.updated", el).attr("datetime")).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }),
        category: $(".entry-categories a", el).map((_, cat) => $(cat).text().trim().toUpperCase()).get(),
        excerpt: $(".entry-excerpt", el).text().trim(),
        readMoreLink: $(".entry-read-more", el).attr("href")
      })).get().filter(article => Object.values(article).every(value => void 0 !== value && "" !== value));
    } catch (error) {
      return console.error("Error fetching home page:", error), [];
    }
  }
  async read(url) {
    try {
      const {
        data
      } = await axios.get(url), $ = cheerio.load(data);
      return $(".quads-location, .sharedaddy, .channel_card, style").remove(), $('article[id^="post-"]').map((_, el) => ({
        category: $(el).attr("class").match(/category-(\w+)/i)?.[1].toUpperCase() || "",
        date: new Date($(".entry-date time", el).attr("datetime")).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }),
        article: $(".kenta-article-content", el).clone().find(".wpra-reactions-container, table").remove().end().text().trim().replace(/\n+/g, "\n"),
        reactions: $(".wpra-reactions-container .wpra-reaction", el).map((_, el) => ({
          name: ["Thumbs Up", "Heart", "Laughing", "Surprised", "Angry", "Sad"][$(el).index()],
          count: parseInt($(el).attr("data-count"), 10)
        })).get(),
        questions: $(".kenta-article-content table tbody tr", el).map((_, el) => ({
          question: $("td:first-child", el).text().trim(),
          answer: $("td:last-child", el).text().trim()
        })).get(),
        image: $(".image-container img", el).map((_, img) => $(img).attr("src")).get(),
        recents: $("#recent-posts-2 ul li a", el).map((_, el) => ({
          title: $(el).text().trim(),
          link: $(el).attr("href")
        })).get()
      })).get();
    } catch (error) {
      return console.error("Error fetching article:", error), [];
    }
  }
  async search(q) {
    try {
      const {
        data
      } = await axios.get(`https://wabetainfo.com/?s=${encodeURIComponent(q)}`), $ = cheerio.load(data);
      return $('article[id^="post-"]').map((_, el) => ({
        title: $(".entry-title a", el).text().trim(),
        date: new Date($(".published", el).attr("datetime")).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }),
        category: $(".entry-categories a", el).map((_, cat) => $(cat).text().trim().toUpperCase()).get(),
        excerpt: $(".entry-excerpt", el).text().trim(),
        readMoreLink: $(".entry-read-more", el).attr("href")
      })).get().filter(article => Object.values(article).every(value => void 0 !== value && "" !== value));
    } catch (error) {
      return console.error("Error fetching search results:", error), [];
    }
  }
}
export {
  WABetaInfo
};