import {
  fetch
} from "undici";
import cheerio from "cheerio";
async function searchDrakor(query) {
  try {
    const response = await fetch("https://drakorasia.us?s=" + query + "&post_type=post"),
      html = await response.text(),
      $ = cheerio.load(html);
    return $("#post.archive").map((index, element) => ({
      title: $(element).find("h2 a").text().trim(),
      link: $(element).find("h2 a").attr("href"),
      image: $(element).find("img").attr("src"),
      categories: $(element).find('.genrenya span[rel="tag"]').map((index, el) => $(el).text()).get(),
      year: $(element).find('.category a[rel="tag"]').text(),
      episodes: $(element).find(".category").contents().filter((index, el) => 3 === el.nodeType).text().trim()
    })).get();
  } catch (error) {
    return console.error("Error:", error), [];
  }
}
async function downloadDrakor(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      genres = $('.genrenya span[rel="tag"]').map(function(_, el) {
        return $(el).text().trim();
      }).get(),
      resolutions = $("thead th").filter(function(_, el) {
        return $(el).text().includes("Download");
      }).map(function(_, el) {
        return $(el).text().trim().replace("Download ", "").toLowerCase();
      }).get();
    return {
      title: $("h2 span.border-b-4").text().trim(),
      synopsis: $("#synopsis p.caps strong").text().trim(),
      rating: $(".wpd-rating-value .wpdrv").text(),
      genres: genres,
      downloadInfo: $("#content-post table.mdl-data-table tbody tr").map(function(_, el) {
        return {
          episode: $(el).find("td:first-child").text().trim(),
          episodeInfo: Object.fromEntries(resolutions.map(function(resolution) {
            const columnIndex = $('thead th:contains("Download ' + resolution + '")').index();
            return [resolution, $(el).find("td:eq(" + columnIndex + ")").find("a").map(function(_, a) {
              const link = $(a).attr("href");
              return {
                platform: $(a).text().trim(),
                link: link
              };
            }).get()];
          }))
        };
      }).get()
    };
  } catch (error) {
    return console.error("Error:", error), {};
  }
}
export {
  searchDrakor,
  downloadDrakor
};