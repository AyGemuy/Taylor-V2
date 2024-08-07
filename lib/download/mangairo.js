import cheerio from "cheerio";
import {
  fetch
} from "undici";
import moment from "moment-timezone";
import fakeUserAgent from "fake-useragent";
import PDFDocument from "pdfkit";
import {
  PassThrough
} from "stream";
const convertToDate = date => moment.utc(date).tz("Asia/Jakarta").format("DD MMMM YYYY");
class MangaIro {
  async mangaSearch(keyword) {
    try {
      const response = await fetch("https://w.mangairo.com/list/search/" + keyword),
        html = await response.text(),
        $ = cheerio.load(html);
      return $(".story-list .story-item").map((_, el) => ({
        title: $(el).find(".story-name a").text().trim() || "",
        link: $(el).find(".story-name a").attr("href") || "",
        chapter: $(el).find(".chapter-name").first().text().trim() || "",
        author: $(el).find('span:contains("Author")').text().replace("Author : ", "").trim() || "",
        updated: $(el).find('span:contains("Last updated")').text().replace("Last updated : ", "").trim() || "",
        views: $(el).find('span:contains("View")').text().replace("View : ", "").trim() || ""
      })).get() || [];
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async mangaInfo(url) {
    try {
      const response = await fetch(url),
        html = await response.text(),
        $ = cheerio.load(html),
        mangaInfo = {
          title: $(".story_info_right h1").text().trim() || "",
          alternativeTitles: $(".story_info_right h2").text().trim() || "",
          author: $('.story_info_right li:contains("Author(s):") a').text().trim() || "",
          genres: $('.story_info_right li:contains("Genres :") a').map((_, el) => $(el).text().trim()).get(),
          status: $('.story_info_right li:contains("Status :") a').text().trim() || "",
          lastUpdated: $('.story_info_right li:contains("Last updated :")').text().replace("Last updated :", "").trim() || "",
          views: $('.story_info_right li:contains("View :")').text().replace("View :", "").trim() || "",
          firstChapter: $('.story_info_right li:contains("Read First Chapter :") a').attr("href") || "",
          latestChapter: $('.story_info_right li:contains("Read Latest Chapter :") a').attr("href") || "",
          summary: $("#story_discription p").text().trim() || ""
        };
      return {
        mangaInfo: mangaInfo,
        chapterList: $("#chapter_list ul li").map((_, el) => ({
          title: $(el).find("a").text().trim() || "",
          link: $(el).find("a").attr("href") || "",
          date: $(el).find("p").text().trim().replace(/[^0-9A-Za-z:]/g, " ") || ""
        })).get()
      } || {};
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async getPages(url) {
    try {
      const response = await fetch(url),
        html = await response.text(),
        $ = cheerio.load(html);
      return $(".panel-read-story img.img_content").map((_, el) => $(el).attr("src")).get() || [];
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async getMangaPdf(imageSources) {
    const headers = {
      "User-Agent": fakeUserAgent(),
      Referer: "https://mangakakalot.com/",
      Cookie: "__cfduid=d92a49507fe881e99fffddfad020ecb271612495383"
    };
    try {
      const buffers = [],
        pdfDoc = new PDFDocument(),
        pdfStream = new PassThrough();
      if (pdfDoc.pipe(pdfStream), !imageSources || 0 === imageSources.length) return console.log("No images found."),
        null;
      for (const [index, imageSource] of imageSources.entries()) try {
        let imageData;
        if ("string" == typeof imageSource) {
          const imageResponse = await (await fetch(imageSource, {
            headers: headers
          })).arrayBuffer();
          imageData = Buffer.from(imageResponse);
        } else {
          if (!Buffer.isBuffer(imageSource)) {
            console.error(`Invalid image source at index ${index + 1}`);
            continue;
          }
          imageData = imageSource;
        }
        await pdfDoc.addPage().image(imageData, {
          fit: [pdfDoc.page.width, pdfDoc.page.height]
        });
      } catch (error) {
        console.error(`Error processing image at index ${index + 1}:`, error);
      }
      return pdfDoc.end(), pdfStream.on("data", chunk => buffers.push(chunk)), new Promise(resolve => pdfStream.on("end", () => resolve(Buffer.concat(buffers))));
    } catch (error) {
      throw console.error("Error fetching data:", error), error;
    }
  }
}
export {
  MangaIro
};