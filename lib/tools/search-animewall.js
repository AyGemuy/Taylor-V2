import axios from "axios";
import util from "util";
import {
  Parser
} from "xml2js";
class Search {
  constructor(site, limit = 30) {
    this.searchTypes = {
      e621: {
        url: "https://e621.net/posts.json",
        params: {}
      },
      gelbooru: {
        url: "https://gelbooru.com/index.php",
        params: {
          page: "dapi",
          s: "post",
          q: "index"
        }
      },
      rule34: {
        url: "https://rule34.xxx/index.php",
        params: {
          page: "dapi",
          s: "post",
          q: "index"
        }
      },
      danbooru: {
        url: "https://danbooru.donmai.us/posts.json",
        params: {}
      },
      konachan: {
        url: "https://konachan.net/post.json",
        params: {}
      },
      konachan18: {
        url: "https://konachan.com/post.json",
        params: {}
      },
      hypnohub: {
        url: "https://hypnohub.net/post/index.json",
        params: {}
      },
      xbooru: {
        url: "https://xbooru.com/index.php",
        params: {
          page: "dapi",
          s: "post",
          q: "index"
        }
      },
      realbooru: {
        url: "https://realbooru.com/index.php",
        params: {
          page: "dapi",
          s: "post",
          q: "index"
        }
      },
      furrybooru: {
        url: "https://furry.booru.org/index.php",
        params: {
          page: "dapi",
          s: "post",
          q: "index"
        }
      }
    }, this.site = site || this.getRandomSite(), this.limit = limit;
  }
  getRandomSite() {
    const sites = Object.keys(this.searchTypes);
    return sites[Math.floor(Math.random() * sites.length)];
  }
  async search(query = "Random", customLimit) {
    try {
      const {
        url,
        params
      } = this.searchTypes[this.site], queryParams = {
        ...params,
        tags: encodeURIComponent(query),
        limit: customLimit || this.limit
      }, response = await axios.get(url, {
        params: queryParams
      }), contentType = response.headers["content-type"];
      return /xml/.test(contentType) || /<\?xml.*?>/.test(response.data) ? await this.xmlToJson(response.data) : response.data;
    } catch (error) {
      return console.error("Error:", error), null;
    }
  }
  async xmlToJson(xml) {
    try {
      const parseXml = util.promisify(new Parser({
        explicitArray: !1,
        mergeAttrs: !0
      }).parseString);
      return await parseXml(xml);
    } catch (error) {
      return console.error("Error parsing XML:", error), null;
    }
  }
}
export {
  Search
};