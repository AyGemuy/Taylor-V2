import axios from "axios";
import cheerio from "cheerio";
class Eporner {
  async home() {
    try {
      const response = await axios.get("https://www.eporner.com/"),
        $ = cheerio.load(response.data);
      return $("#vidresults .mb").map((index, el) => ({
        id: $(el).data("id") || "ID not available",
        quality: $(el).find(".mvhdico span").text() || "Quality not available",
        title: $(el).find(".mbtit a").text() || "Title not available",
        duration: $(el).find(".mbtim").text() || "Duration not available",
        rating: $(el).find(".mbrate").text() || "Rating not available",
        views: $(el).find(".mbvie").text() || "Views not available",
        uploader: $(el).find(".mb-uploader a").text() || "Uploader not available",
        link: new URL($(el).find(".mbtit a").attr("href"), "https://www.eporner.com").href || "Link not available",
        thumbnail: $(el).find(".mbimg img").attr("src") || "Thumbnail not available"
      })).get();
    } catch (error) {
      return console.error("Error fetching data:", error), null;
    }
  }
  async search(q) {
    try {
      const response = await axios.get(`https://www.eporner.com/search?q=${q}`),
        $ = cheerio.load(response.data);
      return $("#vidresults .mb").map((index, el) => ({
        id: $(el).data("id") || "ID not available",
        quality: $(el).find(".mvhdico span").text() || "Quality not available",
        title: $(el).find(".mbtit a").text() || "Title not available",
        duration: $(el).find(".mbtim").text() || "Duration not available",
        rating: $(el).find(".mbrate").text() || "Rating not available",
        views: $(el).find(".mbvie").text() || "Views not available",
        uploader: $(el).find(".mb-uploader a").text() || "Uploader not available",
        link: new URL($(el).find(".mbtit a").attr("href"), "https://www.eporner.com").href || "Link not available",
        thumbnail: $(el).find(".mbimg img").attr("src") || "Thumbnail not available"
      })).get();
    } catch (error) {
      return console.error("Error fetching data:", error), null;
    }
  }
  async download(url) {
    try {
      const response = await axios.get(url),
        $ = cheerio.load(response.data),
        title = $('meta[property="og:title"]').attr("content") || "Meta Title Not Found",
        description = $('meta[property="og:description"]').attr("content") || "Meta Description Not Found",
        thumbnail = $('meta[property="og:image"]').attr("content") || "Thumbnail Not Found";
      return {
        title: title,
        description: description,
        thumbnail: thumbnail,
        download: $(".dloaddivcol .download-h264 a").map((idx, downloadEl) => {
          const qualityMatch = $(downloadEl).text().match(/\d+p/),
            fileSizeMatch = $(downloadEl).text().match(/\d+\.\d+\s*MB/),
            downloadURL = new URL($(downloadEl).attr("href"), url);
          return {
            quality: qualityMatch ? qualityMatch[0] : "Quality Not Found",
            url: downloadURL.href,
            info: $(downloadEl).text().trim(),
            size: fileSizeMatch ? fileSizeMatch[0] : "Size Not Found"
          };
        }).get()
      };
    } catch (error) {
      return console.error("Error fetching data:", error), null;
    }
  }
  async categoryList() {
    try {
      const response = await axios.get("https://www.eporner.com"),
        $ = cheerio.load(response.data),
        baseURL = new URL("https://www.eporner.com");
      return $('a[href*="/cat/"]').map((index, element) => new URL($(element).attr("href"), baseURL).href).get().filter((link, index, self) => link && link.includes("/cat/") && !link.includes("/cat//") && self.indexOf(link) === index);
    } catch (error) {
      return console.error("Error fetching data:", error), [];
    }
  }
  async categoryInfo(url) {
    try {
      const response = await axios.get(url),
        $ = cheerio.load(response.data);
      return $("#vidresults .mb").map((index, el) => ({
        id: $(el).data("id") || "ID not available",
        quality: $(el).find(".mvhdico span").text() || "Quality not available",
        title: $(el).find(".mbtit a").text() || "Title not available",
        duration: $(el).find(".mbtim").text() || "Duration not available",
        rating: $(el).find(".mbrate").text() || "Rating not available",
        views: $(el).find(".mbvie").text() || "Views not available",
        uploader: $(el).find(".mb-uploader a").text() || "Uploader not available",
        link: new URL($(el).find(".mbtit a").attr("href"), "https://www.eporner.com").href || "Link not available",
        thumbnail: $(el).find(".mbimg img").attr("src") || "Thumbnail not available"
      })).get();
    } catch (error) {
      return console.error("Error fetching data:", error), null;
    }
  }
}
export const eporner = new Eporner();