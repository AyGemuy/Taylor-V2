import axios from "axios";
import cheerio from "cheerio";
class Donghua {
  baseUrl = "https://donghua.web.id";
  headers = {
    Accept: "*/*",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36"
  };
  async search(query) {
    try {
      const data = (await axios.get(`${this.baseUrl}/?s=${query}`, {
          headers: this.headers
        })).data,
        $ = cheerio.load(data),
        animeData = $("article").map((i, e) => ({
          title: $(e).find("h2").text(),
          status: $(e).find(".epx").text(),
          type: $(e).find(".typez").text(),
          url: $(e).find("a").attr("href")
        })).get();
      return animeData.length < 1 ? {
        creator: "Wudysoft",
        status: !1,
        msg: "Movie/Serial not found!"
      } : {
        creator: "Wudysoft",
        status: !0,
        data: animeData
      };
    } catch (error) {
      return console.error(error), {
        creator: "Wudysoft",
        status: !1
      };
    }
  }
  replacer(str) {
    return str.replace(new RegExp("diposting oleh", "g"), "author").replace(new RegExp("tipe", "g"), "type").replace(new RegExp("dirilis", "g"), "release").replace(new RegExp("total episode", "g"), "episode").replace(new RegExp("durasi", "g"), "duration").replace(new RegExp("diperbarui pada", "g"), "updated");
  }
  async fetch(url) {
    try {
      const data = (await axios.get(url, {
          headers: this.headers
        })).data,
        $ = cheerio.load(data),
        infoContentHtml = $("div.info-content").html(),
        spanElements = $(infoContentHtml).find("span"),
        genreElements = $(".genxed").find("a"),
        eplisterLiElements = $("div.eplister").find("li"),
        spanData = {};
      spanElements.each((i, e) => {
        const parts = $(e).text().split(":");
        2 === parts.length && (spanData[this.replacer(parts[0]?.toLowerCase().trim())] = this.replacer(parts[1].trim()));
      });
      const genreData = genreElements.map((i, e) => $(e).text()).get(),
        episodesData = eplisterLiElements.map((i, e) => ({
          eps: $(e).find(".epl-num").text(),
          title: `Episode ${$(e).find(".epl-num").text()}`,
          release: $(e).find(".epl-date").text(),
          url: $(e).find("a").attr("href")
        })).get();
      return {
        creator: "Wudysoft",
        status: !0,
        data: {
          thumbnail: $($("div.bigcontent").find("noscript").html()).attr("src"),
          title: $("h1.entry-title").text(),
          ...spanData,
          rating: $($(".rating")[0]).text().split(" ")[2]?.trim(),
          genre: genreData.join(", "),
          episodes: episodesData
        }
      };
    } catch (error) {
      return console.error(error), {
        creator: "Wudysoft",
        status: !1
      };
    }
  }
  async stream(url) {
    try {
      const data = (await axios.get(url, {
          headers: this.headers
        })).data,
        stream = cheerio.load(data)("div.player-embed").find("iframe").attr("src");
      if (!stream) return {
        creator: "Wudysoft",
        status: !1,
        msg: "Streaming url not found!"
      };
      const streamUrl = "https:" + stream,
        streamData = (await axios.get(streamUrl, {
          headers: this.headers
        })).data.match(/sources:(.*?)\n/)[1].replace(/],/g, "]");
      return {
        creator: "Wudysoft",
        status: !0,
        data: {
          url: streamUrl,
          file: JSON.parse(streamData.trim().replace(/ /g, "").replace(/"/g, "").replace(/'/g, '"').replace(/src/g, '"src"').replace(/size/g, '"size"').replace(/type/g, '"type"'))
        }
      };
    } catch (error) {
      return console.error(error), {
        creator: "Wudysoft",
        status: !1
      };
    }
  }
}
export {
  Donghua
};