import axios from "axios";
import cheerio from "cheerio";
import _ from "lodash";
class Tiktok {
  constructor() {}
  async fetchData(url, languageId) {
    try {
      const response = await axios.post("https://ttsave.app/download", {
        query: url,
        language_id: languageId
      }, {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      });
      return cheerio.load(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async downloader(url) {
    const $ = await this.fetchData(url, "1");
    return {
      uniqueId: $("h2.font-extrabold.text-xl.text-center").text().trim(),
      urls: $('a[title="zuo888z"]').attr("href"),
      thumbnail: $('a[title="zuo888z"] img').attr("src"),
      download: _.map($('a[onclick="bdl(this, event)"]').get(), el => ({
        type: $(el).attr("type"),
        link: $(el).attr("href")
      }))
    };
  }
  async stalker(user) {
    const $ = await this.fetchData(user, "1");
    return {
      uniqueId: $("#unique-id").val(),
      username: $("h2").text().trim(),
      thumbnail: $('a[target="_blank"] img').attr("src"),
      download: $('a[target="_blank"]').attr("href")
    };
  }
  async slideDownloader(url) {
    const $ = await this.fetchData(url, "2");
    return {
      uniqueId: $("#unique-id").val(),
      username: $("h2.font-extrabold.text-xl.text-center").text().trim(),
      thumbnail: $('a[target="_blank"]').attr("href"),
      profile: $("img.h-24.w-34.rounded-full").attr("src"),
      description: $("p.text-gray-600.px-2.text-center.break-all.w-3/4.oneliner").text().trim(),
      stats: _.mapValues({
        views: "text-gray-500",
        likes: "text-red-500",
        comments: "text-green-500",
        shares: "text-yellow-500",
        downloads: "text-blue-500"
      }, cls => $(`svg.h-5.w-5.${cls} + span`).text().trim()),
      download: _.map($('a[onclick="bdl(this, event)"]').get(), el => ({
        link: $(el).attr("href"),
        type: $(el).attr("type"),
        title: $(el).text().trim()
      }))
    };
  }
}
export {
  Tiktok
};