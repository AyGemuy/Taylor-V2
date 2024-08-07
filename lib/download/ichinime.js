import {
  fetch
} from "undici";
import cheerio from "cheerio";
async function Download(url) {
  try {
    const html = await fetch(url).then(response => response.text()),
      $ = cheerio.load(html);
    return $(".releases").siblings(".mctnx").find(".soraurlx a").map((index, link) => ({
      vendor: $(link).text().trim(),
      link: $(link).attr("href")
    })).get();
  } catch (error) {
    return console.error("Error fetching or parsing data:", error), [];
  }
}
async function Episode(url) {
  try {
    const html = await fetch(url).then(response => response.text()),
      $ = cheerio.load(html),
      synopsis = $(".bixbox.synp .entry-content").text().trim();
    return {
      synopsis: synopsis,
      episodes: $(".bixbox.bxcl.epcheck .eplister li").map((index, item) => ({
        episode: $(".epl-num", item).text(),
        title: $(".epl-title", item).text(),
        date: $(".epl-date", item).text(),
        link: $("a", item).attr("href")
      })).get().filter(episode => Object.values(episode).every(value => value))
    };
  } catch (error) {
    return console.error("Error fetching or parsing data:", error), {
      synopsis: "",
      episodes: []
    };
  }
}
async function Search(q) {
  try {
    const response = await fetch("https://tv1.ichinime.id/?s=" + q),
      html = await response.text(),
      $ = cheerio.load(html);
    return $("article.bs").map((index, item) => ({
      title: $(".tt h2", item).text().trim(),
      link: $(".bsx a", item).attr("href"),
      status: $(".limit .status", item).text().trim(),
      type: $(".limit .typez", item).text().trim(),
      imageSrc: $(".limit img", item).attr("src")
    })).get().filter(item => Object.values(item).every(value => value));
  } catch (error) {
    return console.error("Error fetching or parsing data:", error), [];
  }
}
export {
  Download,
  Episode,
  Search
};