import {
  fetch
} from "undici";
import cheerio from "cheerio";
async function searchAnime(query) {
  try {
    const url = "https://oploverz.life/?s=" + query,
      response = await fetch(url),
      body = await response.text(),
      $ = cheerio.load(body);
    return $("article.animpost").map((index, element) => ({
      title: $(element).find(".content-thumb img").attr("title"),
      image: $(element).find(".content-thumb img").attr("src"),
      type: $(element).find(".content-thumb .type").text(),
      score: parseFloat($(element).find(".content-thumb .score").text().trim()) || 0,
      status: $(element).find(".data .type").text(),
      link: $(element).find(".animposx a").attr("href")
    })).get();
  } catch (error) {
    return console.error("Error fetching data:", error), [];
  }
}
async function episodeList(url) {
  try {
    const response = await fetch(url),
      body = await response.text(),
      $ = cheerio.load(body);
    return {
      animeInfo: {
        title: $(".entry-title").text(),
        synopsis: $(".entry-content").text(),
        genres: $(".genre-info a").map((_, elem) => $(elem).text()).get(),
        totalEpisodes: $(".lstepsiode .scrolling li").length
      },
      episodeList: $(".lstepsiode .scrolling li").map((_, elem) => ({
        number: $(elem).find(".eps a").text(),
        title: $(elem).find(".lchx a").text(),
        date: $(elem).find(".date").text(),
        link: $(elem).find(".lchx a").attr("href")
      })).get()
    };
  } catch (error) {
    return console.error("Error fetching data:", error), null;
  }
}
async function episodeInfo(url) {
  try {
    const response = await fetch(url),
      body = await response.text(),
      $ = cheerio.load(body);
    return {
      title: $(".entry-title").text(),
      episodeNumber: parseInt($('.epx span[itemprop="episodeNumber"]').text(), 10),
      image: $(".thumb img").attr("src"),
      synopsis: $(".entry-content").text(),
      genres: $(".genre-info a").map((_, elem) => $(elem).text()).get(),
      downloadLinks: $(".links_table tbody tr").map((_, elem) => ({
        server: $(elem).find("td:first-child").text(),
        quality: $(elem).find("td:nth-child(2) strong").text(),
        link: $(elem).find("td:nth-child(3) a").attr("href")
      })).get()
    };
  } catch (error) {
    return console.error("Error fetching data:", error), null;
  }
}
async function getDownloadLinks(url) {
  const body = await fetch(url),
    $ = cheerio.load(await body.text());
  return $(".links_table tbody tr").get().reduce((downloadLinks, element) => {
    const server = $(element).find("td:nth-child(1)").text().trim().toLowerCase(),
      quality = $(element).find(".quality").text().trim().toLowerCase().split(" ")[0],
      link = $(element).find("td:nth-child(3) a").attr("href"),
      serverKey = server.split(" ")[0];
    return {
      ...downloadLinks,
      [serverKey]: {
        ...downloadLinks[serverKey] || {},
        [quality]: link
      }
    };
  }, {});
}
export {
  searchAnime,
  episodeList,
  episodeInfo,
  getDownloadLinks
};