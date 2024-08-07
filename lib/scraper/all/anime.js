import axios from "axios";
import cheerio from "cheerio";
import fetch from "node-fetch";
import _ from "lodash";
class Meganei {
  constructor() {
    this.BASE_URL = "https://meganei.net";
  }
  async search(query) {
    try {
      const res = await fetch(this.BASE_URL + "/?" + new URLSearchParams({
        s: query
      }));
      if (!res.ok) {
        throw new Error("Query Not Found!");
      }
      const html = await res.text();
      const $ = cheerio.load(html);
      const main = $("body").find("main#main").find("article.post");
      const data = {
        query: query,
        total: $(main).length,
        result: []
      };
      main.each((i, element) => {
        const thumbnail = $(element).find("img").attr("srcset").split(" ")[0].replace("-THUMBNAIL", "").replace(".jpg", "-HEADER.jpg");
        const post = {
          title: $(element).find("h2.entry-title").text().trim(),
          thumbnail: thumbnail.includes("-VOLUME") ? thumbnail : thumbnail.replace("-0", "-VOLUME-0"),
          id: $(element).attr("id"),
          createTime: new Date($(element).find("time").attr("datetime")) - 1,
          timeFormat: $(element).find("time").text().trim(),
          publisher: $(element).find("span.author").text().trim(),
          desc: $(element).find("div.entry-content > p").text().trim() + "... Baca Selengkapnya",
          category: _.filter($(element).attr("class").split(" "), v => v.includes("category")).map(v => v.replace("category-", "")),
          tag: _.filter($(element).attr("class").split(" "), v => v.includes("tag")).map(v => v.replace("tag-", "")),
          link: $(element).find("a").attr("href")
        };
        data.result.push(post);
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
  async info(url) {
    try {
      if (!url.includes(this.BASE_URL)) {
        throw new Error("Invalid URL!");
      }
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("URL Not Found");
      }
      const html = await res.text();
      const $ = cheerio.load(html);
      const content = $("div#content").children("section");
      const prime = content.eq(0);
      const second = content.eq(1);
      const data = {
        title: $(prime).find("h1.entry-title").text().trim(),
        thumbnail: $(prime).find("img").attr("data-src"),
        createTime: new Date($(prime).find("time").attr("datetime")) - 1,
        formatTime: $(prime).find("time").text().trim(),
        publisher: $(prime).find("span.author").text().trim(),
        category: $(prime).find(".meta-category").children("a").map((i, el) => $(el).text().trim().toLowerCase()).get(),
        tag: $(second).find("#tag_cloud-11 > .tagcloud").children("a").map((i, el) => $(el).text().trim().toLowerCase()).get(),
        genre: $(second).find("#tag_cloud-10 > .tagcloud").children("a").map((i, el) => $(el).text().trim().toLowerCase()).get(),
        info: [],
        desc: $(prime).find("strong").parent().first().text().trim(),
        password: $(second).find("aside#text-7 > .textwidget").text().trim(),
        download: []
      };
      $(prime).find(".info-komik").children("ul").each((i, el) => {
        $(el).children("li").each((i, el) => {
          data.info.push({
            name: $(el).find("b").text().trim().toLowerCase(),
            data: $(el).find("span").text().trim().toLowerCase()
          });
        });
      });
      $(prime).find(".dwnld > li").each((i, el) => {
        const download = {
          range: $(el).find("span.chapter-range").text().trim(),
          link: $(el).find("span.the-link > a").map((i, el) => {
            return {
              type: $(el).text().trim().toLowerCase(),
              link: $(el).attr("href")
            };
          }).get()
        };
        data.download.push(download);
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}
class NeoNime {
  search = async (query, page = 1) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          data
        } = await axios.get(`https://neonime.ink/page/${page}/?s=${query}`);
        const $ = cheerio.load(data);
        const result = $("div.item_1.items > div.item.episode-home").map((_, el) => {
          const title = $(el).find("a > div.judul-anime span").text().trim();
          if (title) {
            return {
              title: title,
              link: $(el).find("a").attr("href")
            };
          }
        }).get();
        resolve(result);
      } catch (e) {
        throw e;
      }
    });
  };
  ongoing = async (page = 1) => {
    return new Promise(resolve => {
      if (!page) page = 1, axios.get(`https://neonime.cloud/episode/page/${page}/`).then(({
        data
      }) => {
        const $ = cheerio.load(data);
        const result = [];
        $("#episodes > table > tbody > tr").each(function() {
          let episode = $(this).find("td.bb > a > span").text().trim();
          result.push({
            title: $(this).find("td.bb > a").text().split(episode)[0].trim(),
            episode: episode,
            upload_date: $(this).find("td.dd").text(),
            url: $(this).find("td.bb > a").attr("href")
          });
        });
        resolve(result != "" ? {
          status: true,
          author: author,
          page: page,
          result: result
        } : {
          status: false
        });
      }).catch(e => resolve({
        status: false,
        message: "unknown error"
      }));
    });
  };
  getData = async url => {
    return new Promise(async resolve => {
      const {
        data
      } = await axios.get(url);
      const $ = cheerio.load(data);
      const result = {};
      $("#info > div").each(function() {
        let param = $(this).find("b").text().replace(/ /g, "_").toLowerCase();
        if (param) result[param] = $(this).find("span").text();
      });
      result.download = {};
      $("#series > div.ladoB > div.central > div > ul > ul").each(function() {
        $(this).find("li").each(function(a, b) {
          $(b).find("a").each(function() {
            let name = $(b).find("label").text().replace(/ /g, "_").toLowerCase().trim();
            if (Object.keys(result.download).length <= 10) result.download[name] ? result.download[name] : result.download[name] = {
              name: $(b).find("label").text()
            };
            result.download[name][$(this).text().toLowerCase().trim()] = $(this).attr("href");
          });
        });
      });
      resolve(result);
    });
  };
}
class Anoboy {
  baseURL = "https://anoboy.show";
  request = url => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(url, {
          headers: {
            cookie: "HstCfa4720330=1703520404446; HstCla4720330=1703520404446; HstCmu4720330=1703520404446; HstPn4720330=1; HstPt4720330=1; HstCnv4720330=1; HstCns4720330=1"
          }
        });
        const data = response.data;
        resolve(data);
      } catch (e) {
        console.error(e);
        reject(new Error(e));
      }
    });
  };
  latest = () => {
    return new Promise(async (resolve, reject) => {
      const response = await this.request(this.baseURL);
      const $ = cheerio.load(response);
      const result = [];
      $("#jadwal table tr").each((i, el) => {
        result.push({
          title: $(el).find("td a").eq(0).text().trim(),
          url: $(el).find("td a").eq(0).attr("href")
        });
      });
      resolve(result);
    });
  };
  search = query => {
    return new Promise(async (resolve, reject) => {
      const response = await this.request(this.baseURL + "/?s=" + query);
      const $ = cheerio.load(response);
      const result = [];
      $("div.container > div.column-content a").each((i, el) => {
        result.push({
          title: $(el).attr("title"),
          upload: $(el).find(".amv .jamup").text().replace("UP", "").trim(),
          url: $(el).attr("href")
        });
      });
      resolve(result);
    });
  };
  detail = url => {
    return new Promise(async (resolve, reject) => {
      const response = await this.request(url);
      const $ = cheerio.load(response);
      const result = {};
      if (/download/.test(url)) {
        result.title = $(".unduhan .sisi.entry-content h3").text().trim();
        result.image = $(".unduhan .sisi.entry-content amp-img").attr("src");
        $(".unduhan .sisi .contenttable table tbody tr").each((i, el) => {
          const param = $(el).find("th").text().trim().replace(/ /g, "_").toLowerCase();
          result[param] = $(el).find("td").text().trim();
        });
        result.decs = $(".unduhan .sisi .contentdeks").text().trim();
        result.batch = [];
        $(".container .unduhan span a").each((i, el) => {
          result.batch.push({
            quality: $(el).text(),
            link: $(el).attr("href")
          });
        });
        result.download = [];
        $(".container .unduhan table").each((i, el) => {
          const quality = $(el).prev().text().trim().match(/\d+P/);
          $(el).find("tr").each((rowIndex, row) => {
            const episodeName = $(row).find("td:first-child").text().trim();
            const downloadLinks = [];
            $(row).find("td:nth-child(n+2) a").each((linkIndex, linkElement) => {
              const downloadLink = $(linkElement).attr("href");
              if (downloadLink) {
                downloadLinks.push(downloadLink);
              }
            });
            if (episodeName && quality && downloadLinks.length > 0) {
              result.download.push({
                quality: quality[0],
                episode: episodeName,
                link: downloadLinks
              });
            }
          });
        });
        resolve(result);
      } else {
        result.title = $('.pagetitle a[itemprop="item"] span[itemprop="name"]').text().trim();
        result.episode = $('.pagetitle a[itemprop="item"] span[itemprop="name"]').eq(2).text().trim();
        result.upload = $(".postdetails time.updated").text();
        result.image = $(".unduhan .sisi.entry-content amp-img").attr("src");
        $(".unduhan .sisi .contenttable table tbody tr").each((i, el) => {
          const param = $(el).find("th").text().trim().replace(/ /g, "_").toLowerCase();
          result[param] = $(el).find("td").text().trim();
        });
        result.desc = $(".unduhan .sisi .contentdeks").text().trim();
        result.download = {};
        const downloadLinks = [];
        $('span[style*="margin-bottom"]').each((index, element) => {
          const sourceName = $(element).find("span").first().text().replace(/\s/g, "");
          const links = $(element).find("a").map((i, el) => {
            const text = $(el).text();
            const url = $(el).attr("href");
            return {
              quality: text,
              url: url
            };
          }).get();
          result.download[sourceName] = links;
        });
        resolve(result);
      }
    });
  };
}
class Otakudesu {
  constructor() {
    this.baseurl = "https://otakudesu.lol";
  }
  latest = () => {
    return new Promise(async (resolve, reject) => {
      const {
        data
      } = await axios.request({
        method: "GET",
        url: this.baseurl,
        headers: {
          cookie: "_ga=GA1.2.892220948.1691376515; _gid=GA1.2.64016645.1691376515; _gat=1",
          "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
        }
      }).catch(e => {
        reject(e);
      });
      const $ = cheerio.load(data);
      const result = $("div.venz > ul > li > div.detpost").map((_, el) => {
        return {
          title: $(el).find(".thumb > a > .thumbz > h2").text().trim(),
          day: $(el).find(".epztipe").text().trim(),
          date: $(el).find(".newnime").text().trim(),
          thumbnail: $(el).find(".thumb > a > .thumbz > img").attr("src"),
          link: $(el).find(".thumb > a").attr("href")
        };
      }).get();
      resolve(result);
    });
  };
  search = query => {
    return new Promise(async (resolve, reject) => {
      const {
        data
      } = await axios.request({
        method: "GET",
        baseURL: this.baseurl,
        url: "/?s=" + query + "&post_type=anime",
        headers: {
          cookie: "_ga=GA1.2.892220948.1691376515; _gid=GA1.2.64016645.1691376515; _gat=1",
          "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
        }
      }).catch(e => {
        reject(e?.response);
      });
      const $ = cheerio.load(data);
      const result = $(".chivsrc > li").map((_, el) => {
        return {
          title: $(el).find("h2").text().trim(),
          genres: $("div.set").eq(0).text().replace("Genres : ", "").trim(),
          status: $("div.set").eq(1).text().replace("Status : ", "").trim(),
          rating: $("div.set").eq(2).text().replace("Rating : ", "").trim(),
          thumbnail: $(el).find("img").attr("src"),
          link: $(el).find("h2 > a").attr("href")
        };
      }).get();
      resolve(result);
    });
  };
  detail = url => {
    return new Promise(async (resolve, reject) => {
      const rest = await await axios.request({
        method: "GET",
        url: url,
        headers: {
          cookie: "_ga=GA1.2.892220948.1691376515; _gid=GA1.2.64016645.1691376515; _gat=1",
          "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
        }
      }).catch(e => {
        reject(e?.response);
      });
      const $ = cheerio.load(rest.data);
      const result = {};
      const eps = new Array();
      const batchLink = $("div.episodelist > ul > li > span a").attr("href");
      result.title = $("div.venser > div.jdlrx > h1").text().trim();
      result.image = $("div.fotoanime > img").attr("src");
      $("div.infozin > div.infozingle p").each((a, b) => {
        const param = $(b).find("b").text().replace(/ /g, "_").toLowerCase();
        const value = $(b).find("span").text().trim();
        result[param] = value;
      });
      $("div.episodelist > ul > li").each((a, b) => {
        eps.push({
          judul: $(b).find("span a").text().trim(),
          link: $(b).find("span a").attr("href"),
          upload: $(b).find(".zeebr").text().trim()
        });
      });
      result.sinopsis = $("div.sinopc").text().trim();
      result.batch = batchLink;
      result.episode = eps;
      result.download = await this.getBatch(batchLink);
      resolve(result);
    });
  };
  getBatch = url => {
    return new Promise(async (resolve, reject) => {
      const {
        data
      } = await axios.request({
        method: "GET",
        url: url,
        headers: {
          cookie: "_ga=GA1.2.892220948.1691376515; _gid=GA1.2.64016645.1691376515; _gat=1",
          "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
        }
      }).catch(e => {
        reject(e?.response);
      });
      const $ = cheerio.load(data);
      const results = [];
      $("div.batchlink > ul > li").each((a, b) => {
        results.push({
          type: $(b).find("strong").text().replace("MP4", "").trim(),
          size: $(b).find("i").text().trim(),
          links: $(b).find("a").map((c, d) => {
            return {
              name: $(d).text(),
              link: $(d).attr("href")
            };
          }).get()
        });
      });
      resolve(results);
    });
  };
  getEpsode = url => {
    return new Promise(async (resolve, reject) => {
      const rest = await await axios.request({
        method: "GET",
        url: url,
        headers: {
          cookie: "_ga=GA1.2.892220948.1691376515; _gid=GA1.2.64016645.1691376515; _gat=1",
          "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
        }
      }).catch(e => {
        reject(e?.response);
      });
      const $ = cheerio.load(rest.data);
      const results = [];
      $("div.download > ul > li").each((a, b) => {
        results.push({
          type: $(b).find("strong").text().replace("MP4", "").trim(),
          size: $(b).find("i").text().trim(),
          links: $(b).find("a").map((c, d) => {
            return {
              name: $(d).text(),
              link: $(d).attr("href")
            };
          }).get()
        });
      });
      resolve({
        title: $("div.download > h4").text().trim(),
        download: results
      });
    });
  };
  getVideoFromEps = urls => {
    return new Promise(async (resolve, reject) => {
      const rest = await await axios.request({
        method: "GET",
        url: urls,
        headers: {
          cookie: "_ga=GA1.2.892220948.1691376515; _gid=GA1.2.64016645.1691376515; _gat=1",
          "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
        }
      }).catch(e => {
        reject(e?.response);
      });
      const $ = cheerio.load(rest.data);
      const {
        data
      } = await axios.get("https://desustream.me/beta/stream/?id=Q3R0b0krQXpmRzlVMmtnTFJNWm4yZz09");
      const $$ = cheerio.load(data);
      const url = $$('script[type="text/javascript"]').eq(0).text().match(/'file':'(.*?)'/)[1];
      resolve(url);
    });
  };
}
class Kiryuu {
  search = async query => {
    return new Promise((resolve, reject) => {
      axios.request({
        url: "https://kiryuu.id/?s=" + encodeURIComponent(query),
        method: "GET",
        headers: {
          "user-agent": "Mozilla/5.0 (Linux; Android 10; RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36"
        }
      }).then(({
        data
      }) => {
        const $ = cheerio.load(data);
        const hasil = $("div.bs > div.bsx").map(function() {
          return {
            title: $(this).find("a").attr("title"),
            chapter: $(this).find("a > div.bigor > div.adds > div.epxs").text().trim(),
            ranting: $(this).find("a > div.bigor > div.adds > div.rt > div.rating > div.numscore").text().trim(),
            url: $(this).find("a").attr("href")
          };
        }).toArray();
        resolve(hasil);
      });
    });
  };
  detail = async url => {
    return new Promise((resolve, reject) => {
      axios.request({
        url: url,
        method: "GET",
        headers: {
          "user-agent": "Mozilla/5.0 (Linux; Android 10; RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36"
        }
      }).then(({
        data
      }) => {
        const $ = cheerio.load(data);
        const title = $("div.seriestucon > div.seriestuheader > h1").text();
        const ranting = $("div.rating.bixbox > div.rating-prc > div.num").text();
        const desc = $("div.entry-content.entry-content-single > p").text();
        const status = $(".infotable tr:nth-child(1) td:nth-child(2)").text().trim();
        const type = $(".infotable tr:nth-child(2) td:nth-child(2)").text().trim();
        const released = $(".infotable tr:nth-child(3) td:nth-child(2)").text().trim();
        const author = $(".infotable tr:nth-child(4) td:nth-child(2)").text().trim();
        const artist = $(".infotable tr:nth-child(5) td:nth-child(2)").text().trim();
        const serialization = $(".infotable tr:nth-child(6) td:nth-child(2)").text().trim();
        const postedBy = $(".infotable tr:nth-child(7) td:nth-child(2)").text().trim();
        const postedOn = $(".infotable tr:nth-child(8) td:nth-child(2)").text().trim();
        const updatedOn = $(".infotable tr:nth-child(9) td:nth-child(2)").text().trim();
        const genres = $(".seriestugenre a").map((_, element) => $(element).text().trim()).get();
        const chapterList = $("div.eplister > ul > li").map(function() {
          return {
            chapter: $(this).attr("data-num"),
            url: $(this).find("a").attr("href"),
            downloadUrl: $(this).find("div.dt > a").attr("href")
          };
        }).toArray();
        resolve({
          title: title,
          ranting: ranting,
          desc: desc,
          status: status,
          type: type,
          released: released,
          author: author,
          artist: artist,
          serialization: serialization,
          postedBy: postedBy,
          postedOn: postedOn,
          updatedOn: updatedOn,
          genres: genres,
          chapter: chapterList
        });
      });
    });
  };
}
class MangaToon {
  search = async query => {
    return new Promise((resolve, reject) => {
      axios.request({
        baseURL: "https://mangatoon.mobi",
        url: "/id/search?word=" + query,
        method: "GET",
        headers: {
          "user-agent": "Mozilla/5.0 (Linux; Android 10; RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36"
        }
      }).then(({
        data
      }) => {
        const $ = cheerio.load(data);
        const hasil = $("#page-content > div.search-page > div.have-result > div.comics-result > div.recommended-wrap > div.recommend-comics > div.recommend-item").map(function() {
          const result = {
            title: $(this).find("div.recommend-comics-title > span").text().trim(),
            image: $(this).find("a > div.comics-image > img").attr("data-src"),
            url: baseUrl + $(this).find("a").attr("href")
          };
          return result;
        }).toArray();
        resolve(hasil);
      });
    });
  };
  detail = async url => {
    return new Promise((resolve, reject) => {
      axios.request({
        url: url,
        method: "GET",
        headers: {
          "user-agent": "Mozilla/5.0 (Linux; Android 10; RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36"
        }
      }).then(({
        data
      }) => {
        const $ = cheerio.load(data);
        const title = $("#page-content > div.detail-wrap > div.detail-top-info > div.detail-info > div.detail-title-bg > span").text();
        const image = $("#page-content > div.detail-wrap > div.detail-top-info > div.detail-img").find("img").attr("src");
        const info = $("#page-content > div.detail-wrap > div.detail-top-info > div.detail-info > div.detail-tags-info.select-text").text();
        const chapter = $("#page-content > div.selected-episodes > div.episodes-wrap-new > a").map(function() {
          return {
            url: baseUrl + $(this).attr("href"),
            info: $(this).find("div.item-top-2 > div.episode-title-new-2").text().trim()
          };
        }).toArray();
        resolve({
          title: title,
          image: image,
          info: info,
          chapter: chapter
        });
      });
    });
  };
}
class Kusonime {
  search = async query => {
    return new Promise((resolve, reject) => {
      axios.request({
        url: "https://kusonime.com/?s=" + query,
        method: "GET",
        headers: {
          "user-agent": "Mozilla/5.0 (Linux; Android 10; RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36"
        }
      }).then(({
        data
      }) => {
        const $ = cheerio.load(data);
        const res = $('div[class="content"]').map(function() {
          return {
            title: $(this).find("h2 > a").attr("title"),
            release: $(this).find('p:contains("Released")').text().trim(),
            genre: $(this).find('p:contains("Genre") > a').map((_, element) => $(element).text()).get(),
            url: $(this).find("h2 > a").attr("href")
          };
        }).toArray();
        resolve(res);
      });
    });
  };
  detail = async url => {
    return new Promise(async (resolve, reject) => {
      await axios.get(url, {
        headers: {
          "user-agent": "Mozilla/5.0 (Linux; Android 10; RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36"
        }
      }).then(({
        data
      }) => {
        const $ = cheerio.load(data);
        const rootContent = $('div[class="venser"]');
        const rootBody = rootContent.find('div[class="lexot"]');
        const rootInfo = rootBody.children('div[class="info"]');
        let judul = $('div[class="post-thumb"] > h1[class="jdlz"]').text();
        let japanese = $('div[class="info"] > p:nth-child(1)').text();
        let genre = $('div[class="info"] > p:nth-child(2)').text();
        let season = $('div[class="info"] > p:nth-child(3)').text();
        let totaleps = $('div[class="info"] > p:nth-child(7)').text();
        let score = $('div[class="info"] > p:nth-child(8)').text();
        let durasi = $('div[class="info"] > p:nth-child(9)').text();
        let tglrilis = $('div[class="info"] > p:nth-child(10)').text();
        let type = $(rootInfo.children("p").get(4)).text().split(":")[1].trim();
        let rate = $(rootInfo.children("p").get(7)).text().split(":")[1].trim();
        let status = $(rootInfo.children("p").get(5)).text().split(":")[1].trim();
        let desk = $('div[class="venser"]').find('div[class="lexot"]').children("p").first().text();
        let producer = $(rootInfo.children("p").get(3)).text().split(":")[1].trim();
        const linkk = {};
        $(".smokeurlrh").each((index, element) => {
          const format = $(element).find("strong").text().trim();
          let linkss = {};
          const links = $(element).find("a[href]").each((i, link) => {
            const name = $(link).text().trim();
            const href = $(link).attr("href");
            linkss[name] = href;
          });
          linkk[format] = linkss;
        });
        const result = {
          judul: judul,
          japanese: japanese,
          genre: genre,
          season: season,
          producer: producer,
          type: type,
          status: status,
          totaleps: totaleps.split(": ")[1],
          score: score,
          durasi: durasi,
          rilis: tglrilis.split(": ")[1],
          image: $('div[class="post-thumb"] > img').attr("src"),
          desk: desk,
          download: linkk
        };
        resolve(result);
      });
    });
  };
}
class Komiku {
  constructor() {
    this.baseURL = "https://komiku.id", this.dataBaseURL = "https://data.komiku.id";
  }
  latest = () => {
    return new Promise(async (resolve, reject) => {
      const {
        data
      } = await axios.get(this.baseURL).catch(e => e?.response);
      const $ = cheerio.load(data);
      const result = $("#Terbaru > div.ls4w > .ls4").map((_, e) => {
        return {
          title: $(e).find("div.ls4j > h4 a").text(),
          chapter: $("div.ls4j > .ls24").map((_, e) => $(e).text().trim()).get(),
          img: $(e).find("div.ls4v > a img").attr("data-src"),
          link: this.baseURL + $(e).find("div.ls4v > a").attr("href")
        };
      }).get();
      resolve(result);
    });
  };
  search = query => {
    return new Promise(async (resolve, reject) => {
      const {
        data
      } = await axios.get(this.dataBaseURL + "/cari/?post_type=manga&s=" + query).catch(e => e?.response);
      const $ = cheerio.load(data);
      const result = $("div.daftar > div.bge").map((_, el) => {
        return {
          title: $(el).find("div.kan > a h3").text().trim(),
          img: $(el).find("div.bgei > a img").attr("data-src"),
          chapter: {
            awal: $(el).find("div.kan > div.new1 > a > span").eq(1).text(),
            akhir: $(el).find("div.kan > div.new1 > a > span").eq(3).text()
          },
          link: $(el).find("div.bgei > a").attr("href")
        };
      }).get();
      resolve(result);
    });
  };
  detail = url => {
    return new Promise(async (resolve, reject) => {
      const {
        data
      } = await axios.get(url).catch(e => e?.response);
      const $ = cheerio.load(data);
      const result = {};
      result.title = $("#Judul > h1").text().trim();
      result.img = $("div.ims > img").attr("src");
      result.metadata = {};
      $(".inftable tbody tr").each((a, b) => {
        const param = $(b).find("td:first-child").text().replace(/ /g, "_").toLowerCase();
        const value = $(b).find("td:nth-child(2)").text().trim();
        result.metadata[param] = value;
      });
      result.metadata.genre = $("#Informasi > .genre li").map((a, b) => $(b).find("a").text().trim()).get();
      result.sinopsis = $(".desc").text().replace(/\n/g, "").trim();
      result.chapters = [];
      $("#Daftar_Chapter tbody tr").each((a, b) => {
        const chapter = $(b).find("td:first-child > a span").text().trim();
        const title = $(b).find("td:first-child > a").attr("title");
        const upload = $(b).find("td:nth-child(2)").text().trim();
        const url = this.baseURL + $(b).find("td:first-child > a").attr("href");
        if (chapter !== "" && title !== undefined && upload !== "" && url !== this.baseURL + "undefined") {
          result.chapters.push({
            chapter: chapter,
            title: title,
            upload: upload,
            url: url
          });
        }
      });
      resolve(result);
    });
  };
  getChapter = url => {
    return new Promise(async (resolve, reject) => {
      const {
        data
      } = await axios.get(url).catch(e => e?.response);
      const $ = cheerio.load(data);
      const result = {};
      result.title = $(".content > #Judul h1").eq(0).text().trim();
      result.images = [];
      $("#Baca_Komik img").each((a, b) => {
        result.images.push({
          id: $(b).attr("id"),
          title: $(b).attr("alt"),
          url: $(b).attr("src")
        });
      });
      resolve(result);
    });
  };
}
class AnimeBatch {
  search = query => {
    return new Promise(async (resolve, reject) => {
      const {
        data
      } = await axios.get("https://www.animebatch.id/?s=" + query);
      const $ = cheerio.load(data),
        result = [];
      $("article").each((a, b) => {
        result.push({
          title: $(b).find("div.animepost > div.animposx a").attr("title"),
          score: $(b).find(".score").text().trim(),
          type: $(b).find(".content-thumb > .type").text().trim(),
          status: $(b).find("a .type").eq(1).text(),
          link: $(b).find("div.animepost > div.animposx a").attr("href")
        });
      });
      resolve(result);
    });
  };
  detail = url => {
    return new Promise(async (resolve, reject) => {
      const {
        data
      } = await axios.get(url);
      const $ = cheerio.load(data);
      const result = {};
      $("div.infox > div.spe span").each((index, el) => {
        const key = $(el).find("b").text().trim().replace(/ /g, "_").toLowerCase();
        const value = $(el).contents().filter((_, el) => el.nodeType === 3).text().trim();
        if (key.toLowerCase() !== "genre") result[key] = value;
      });
      result.genre = $("div.infox > div.spe .Genrex a").map((index, element) => $(element).text()).get().join(", ");
      result.image = $("div.player-area.widget_senction img").attr("src");
      result.desc = $("div.downman p").text().trim();
      result.batch = [];
      $(".download-content > .item ul li").each((a, b) => {
        const download = [];
        $(b).find("a").each((d, c) => {
          download.push({
            [$(c).text()]: $(c).attr("href")
          });
        });
        if (download.length == 0) {
          delete result.batch;
        } else {
          result.batch.push({
            quality: $(b).find("strong").text().trim(),
            download: download
          });
        }
      });
      result.download = [];
      if ($(".dl-content-for")) {
        $(".dlx ul").each(function() {
          const title = $(this).prev("h4").text();
          $(this).find("li").each(function() {
            const quality = $(this).find("strong").text().trim();
            const links = [];
            $(this).find("a").each(function() {
              const name = $(this).text();
              const link = $(this).attr("href");
              links.push({
                [$(this).text()]: link
              });
            });
            result.download.push({
              title: title,
              quality: quality,
              links: links
            });
          });
        });
      } else {
        $(".dl-content-for").each((a, b) => {
          const link = [];
          $(b).find(".reso").each((c, d) => {
            link.push({
              quality: $(d).find("p").text(),
              link: $(d).find("a").attr("href")
            });
          });
          result.download.push({
            title: $(b).prev().text(),
            link: link
          });
        });
      }
      resolve(result);
    });
  };
}
class DoujinDesu {
  constructor() {
    this.baseURL = "https://doujindesu.tv";
  }
  fetchURL = url => {
    return new Promise(async (resolve, reject) => {
      const {
        data
      } = await axios.get(url, {
        headers: {
          "User-Agent": "Site24x7",
          "Cache-Control": "no-cache",
          Accept: "/",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip",
          Host: "doujindesu.tv"
        }
      }).catch(e => {
        resolve(e?.["respose"]);
      });
      resolve(data);
    });
  };
  latest = () => {
    return new Promise(async (resolve, reject) => {
      const html = await this.fetchURL(this.baseURL);
      const $ = cheerio.load(html),
        arr = [];
      $("div.entries > .entry").each((a, b) => {
        arr.push({
          title: $(b).find("a").attr("title"),
          image: $(b).find("a > .thumbnail img").attr("src"),
          url: this.baseURL + $(b).find("a").attr("href")
        });
      });
      resolve(arr);
    });
  };
  search = query => {
    return new Promise(async (resolve, reject) => {
      const html = await this.fetchURL(this.baseURL + "/?s=" + query);
      const $ = cheerio.load(html),
        arr = [];
      $("div.entries > .entry").each((a, b) => {
        arr.push({
          title: $(b).find("a").attr("title"),
          image: $(b).find("a > .thumbnail img").attr("src"),
          url: this.baseURL + $(b).find("a").attr("href")
        });
      });
      resolve(arr);
    });
  };
  detail = url => {
    return new Promise(async (resolve, reject) => {
      const html = await this.fetchURL(url);
      const $ = cheerio.load(html),
        result = {};
      result.title = $(".thumbnail a img").attr("title");
      result.thumbnail = $(".thumbnail a img").attr("src");
      result.metadata = {};
      result.metadata.title = $(".metadata > .title").contents().filter(function() {
        return this.type === "text";
      }).text().trim();
      result.metadata.title_japanese = $(".title .alter i").text().trim();
      result.metadata.title_english = $("h1.title").text().replace(result.metadata.title_japanese, "").trim();
      $(".metadata table tbody tr").each((a, b) => {
        const param = $(b).find("td").eq(0).text().replace(/ /g, "_").toLowerCase();
        const value = $(b).find("td").eq(1).text().trim();
        if (value) result.metadata[param] = value;
      });
      result.tags = $(".metadata .tags a").map((a, b) => $(b).text().trim()).get();
      result.shipnosis = $(".metadata .pb-2 p").eq(0).text().replace("Sinopsis :", "").trim();
      result.chapters = [];
      $("div#chapter_list ul li").each((a, b) => {
        result.chapters.push({
          judul: $(b).find("div.epsleft span a").attr("title"),
          link: this.baseURL + $(b).find("div.epsright span a").attr("href"),
          chapter: $(b).find("div.epsright span a").text().trim(),
          upload: $(b).find("div.epsleft .date").text().trim(),
          linkdl: $(b).find("div.chright span a").attr("href")
        });
      });
      resolve(result);
    });
  };
}
class Nekopoi {
  latest = () => {
    return new Promise(async (resolve, reject) => {
      const {
        data
      } = await axios.get("https://nekopoi.care", {
        headers: {
          "User-Agent": "Site24x7",
          "Cache-Control": "no-cache",
          Accept: "*/*",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip",
          "X-Site24x7-Id": "1420e1c1b70c",
          Host: "nekopoi.care"
        }
      });
      const $ = cheerio.load(data);
      const result = $("div#boxid > div.eropost").map(function() {
        return {
          title: $(this).find("div.eroinfo > h2 > a").text().trim(),
          upload: $(this).find("div.eroinfo > span").eq(0).text().trim(),
          image: $(this).find("div.eroimg > div.limitero > img").attr("src"),
          link: $(this).find("div.eroinfo > h2 > a").attr("href")
        };
      }).get();
      resolve(result);
    });
  };
  search = (query, page = 1) => {
    return new Promise(async (resolve, reject) => {
      query = encodeURIComponent(query);
      const {
        data
      } = await axios.get(`https://nekopoi.care/search/${query}/page/${page}`, {
        headers: {
          "User-Agent": "Site24x7",
          "Cache-Control": "no-cache",
          Accept: "*/*",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip",
          "X-Site24x7-Id": "1420e1c1b70c",
          Host: "nekopoi.care"
        }
      });
      const $ = cheerio.load(data);
      const result = $("div.result > ul > li").map(function() {
        return {
          title: $(this).find("div.top > h2 > a").text().trim(),
          link: $(this).find("div.top > h2 > a").attr("href"),
          image: $(this).find("div.limitnjg > img").attr("src"),
          genre: $(this).find("div.desc > p").eq(3).text().replace("Genre :", "").trim(),
          producers: $(this).find("div.desc > p").eq(5).text().replace("Producers :", "").trim(),
          duration: $(this).find("div.desc > p").eq(6).text().replace("Duration :", "").trim(),
          size: $(this).find("div.desc > p").eq(7).text().replace("Size :", "").trim()
        };
      }).get();
      resolve(result);
    });
  };
  detail = url => {
    return new Promise(async (resolve, reject) => {
      const {
        data
      } = await axios.get(url, {
        headers: {
          "User-Agent": "Site24x7",
          "Cache-Control": "no-cache",
          Accept: "*/*",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip",
          "X-Site24x7-Id": "1420e1c1b70c",
          Host: "nekopoi.care"
        }
      });
      const $ = cheerio.load(data);
      const result = {};
      result.title = $("div.eropost > div.eroinfo > h1").text().trim();
      result.info = $("div.eropost > div.eroinfo > p").text().trim();
      result.img = $("div.contentpost > div.thm > img").attr("src");
      $(".konten p").each((index, element) => {
        const text = $(element).text();
        if (text.includes("Genre")) {
          result["genre"] = text.replace("Genre", "").replace(":", "").trim();
        } else if (text.includes("Sinopsis")) {
          result["sinopsis"] = $(element).next().text().replace(":", "").trim();
        } else if (text.includes("Anime")) {
          result["anime"] = text.replace("Anime", "").replace(":", "").trim();
        } else if (text.includes("Producers")) {
          result["producers"] = text.replace("Producers", "").replace(":", "").trim();
        } else if (text.includes("Duration")) {
          result["duration"] = text.replace("Duration", "").replace(":", "").trim();
        } else if (text.includes("Size")) {
          result["size"] = text.replace("Size", "").replace(":", "").trim();
        }
      });
      result.stream = $("div#stream1 > iframe").attr("src");
      result.download = $("div.arealinker > div.boxdownload > div.liner").map(function() {
        const title = $(this).find("div.name").text().trim();
        const type = title.match(/\[(\d+p)\]/)[1];
        return {
          type: type,
          title: title,
          links: $(this).find("div.listlink > p a").map((_, el) => {
            return {
              name: $(el).text().trim(),
              link: $(el).attr("href")
            };
          }).get()
        };
      }).get();
      resolve(result);
    });
  };
}
class Nhentai {
  constructor() {
    this.baseURL = "https://nhentai.to";
  }
  latest = () => {
    return new Promise(async (resolve, reject) => {
      await axios.request({
        url: this.baseURL,
        method: "GET",
        headers: {
          "user-agent": "Mozilla/5.0 (Linux; Android 11; RMX3261) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36"
        }
      }).then(response => {
        const $ = cheerio.load(response.data);
        const result = $("div.container.index-container > div.gallery").map((_, el) => {
          return {
            id: $(el).find("a").attr("href").match(/\d+/)[0],
            title: $(el).find("a > div.caption").text().trim(),
            thumbnail: $(el).find("a > img").attr("data-src"),
            link: this.baseURL + $(el).find("a").attr("href")
          };
        }).get();
        resolve(result);
      }).catch(e => {
        reject(e);
      });
    });
  };
  search = query => {
    return new Promise(async (resolve, reject) => {
      await axios.request({
        baseURL: this.baseURL,
        url: "/search?q=" + encodeURIComponent(query),
        method: "GET",
        headers: {
          "user-agent": "Mozilla/5.0 (Linux; Android 11; RMX3261) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36"
        }
      }).then(response => {
        const $ = cheerio.load(response.data);
        const result = $("div.container.index-container > div.gallery").map((_, el) => {
          return {
            id: $(el).find("a").attr("href").match(/\d+/)[0],
            title: $(el).find("a > div.caption").text().trim(),
            thumbnail: $(el).find("a > img").attr("src"),
            link: this.baseURL + $(el).find("a").attr("href")
          };
        }).get();
        resolve(result);
      }).catch(e => {
        reject(e);
      });
    });
  };
  get = id => {
    return new Promise(async (resolve, reject) => {
      await axios.request({
        url: this.baseURL + "/g/" + id,
        method: "GET",
        headers: {
          "user-agent": "Mozilla/5.0 (Linux; Android 11; RMX3261) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36"
        }
      }).then(response => {
        const $ = cheerio.load(response.data);
        const data = {
          id: "",
          title: "",
          titleJa: "",
          cover: "",
          parodies: [],
          characters: [],
          tags: [],
          artists: [],
          groups: [],
          languages: [],
          categories: [],
          uploaded: "",
          pages: []
        };
        data.id = $("div#info > h3").text().trim();
        data.title = $("div#info > h1").text().trim();
        data.cover = $("div#cover > a > img").attr("src");
        data.titleJa = $("div#info > h2").text().trim();
        data.uploaded = $("div.tag-container.field-name span.tags time").attr("datetime");
        $("div#thumbnail-container > div.thumb-container").each((index, element) => {
          const pages = $(element).find("a > img").attr("data-src");
          data.pages.push(pages);
        });
        $("a.tag.tag-66049").each((index, element) => {
          const parodyName = $(element).find("span.name").text();
          data.parodies.push(parodyName);
        });
        $("a.tag.tag-62150, a.tag.tag-62151").each((index, element) => {
          const characterName = $(element).find("span.name").text();
          data.characters.push(characterName);
        });
        $("a.tag").not(".tag-66049, .tag-62150, .tag-62151").each((index, element) => {
          const tagName = $(element).find("span.name").text();
          data.tags.push(tagName);
        });
        $("a.tag.tag-19368").each((index, element) => {
          const artistName = $(element).find("span.name").text();
          data.artists.push(artistName);
        });
        $("a.tag.tag-22152").each((index, element) => {
          const groupName = $(element).find("span.name").text();
          data.groups.push(groupName);
        });
        $("a.tag.tag-19, a.tag.tag-17").each((index, element) => {
          const languageName = $(element).find("span.name").text();
          data.languages.push(languageName);
        });
        $("a.tag.tag-9").each((index, element) => {
          const categoryName = $(element).find("span.name").text();
          data.categories.push(categoryName);
        });
        resolve(data);
      }).catch(e => {
        reject(e);
      });
    });
  };
}
class Komikcast {
  latest = () => {
    return new Promise(async (resolve, reject) => {
      const response = await axios.get("https://komikcast.lol/daftar-komik/?orderby=update");
      const $ = cheerio.load(response.data);
      const result = [];
      $(".list-update_item").each((index, element) => {
        const link = $(element).find("a").attr("href");
        const title = $(element).find(".title").text().trim();
        const type = $(element).find(".type").text().trim();
        const chapter = $(element).find(".chapter").text().trim();
        const image = $(element).find(".list-update_item-image img").attr("src");
        result.push({
          title: title,
          type: type,
          chapter: chapter,
          link: link,
          image: image
        });
      });
      resolve(result);
    });
  };
  search = query => {
    return new Promise(async (resolve, reject) => {
      const response = await axios.get("https://komikcast.lol/?s=" + query);
      const $ = cheerio.load(response.data);
      const result = [];
      $(".list-update_item").each((index, element) => {
        const link = $(element).find("a").attr("href");
        const title = $(element).find(".title").text().trim();
        const type = $(element).find(".type").text().trim();
        const chapter = $(element).find(".chapter").text().trim();
        const image = $(element).find(".list-update_item-image img").attr("src");
        result.push({
          title: title,
          type: type,
          chapter: chapter,
          link: link,
          image: image
        });
      });
      resolve(result);
    });
  };
  detail = url => {
    return new Promise(async (resolve, reject) => {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const result = {};
      result.title = $(".komik_info-content-body-title").text().trim();
      result.alternativeTitle = $(".komik_info-content-native").text().trim();
      result.genres = $(".komik_info-content-genre a").map((index, element) => $(element).text().trim()).get();
      $(".komik_info-content-meta span").each((index, element) => {
        const key = $(element).find("b").text().replace(":", "").replace(/ /g, "_").toLowerCase().trim();
        const value = $(element).contents().filter((index, el) => el.nodeType === 3).text().trim();
        result[key] = value;
      });
      result.type = $(".komik_info-content-info-type a").text().trim();
      result.lastUpdated = $(".komik_info-content-update time").attr("datetime");
      result.image = $(".komik_info-cover-image img").attr("src");
      result.synopsis = $(".komik_info-description-sinopsis p").text().trim();
      result.chapters = [];
      $(".komik_info-chapters-item").each((index, element) => {
        const chapterNumber = $(element).find(".chapter-link-item").text().trim().replace(/\s+/g, " ");
        const chapterURL = $(element).find(".chapter-link-item").attr("href");
        const timeAgo = $(element).find(".chapter-link-time").text().trim();
        const chapterInfo = {
          number: chapterNumber,
          url: chapterURL,
          timeAgo: timeAgo
        };
        result.chapters.push(chapterInfo);
      });
      resolve(result);
    });
  };
  chapter = url => {
    return new Promise(async (resolve, reject) => {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const result = {};
      result.title = $(".chapter_headpost h1").text().trim();
      result.images = [];
      $("div.main-reading-area img").each((i, el) => {
        result.images.push($(el).attr("src"));
      });
      resolve(result);
    });
  };
}
class Oploverz {
  constructor() {
    this.baseURL = "https://oploverz.life";
  }
  latest = (page = 1) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(`${this.baseURL}/last-episode/page/${page}/`);
        const $ = cheerio.load(response.data);
        const results = [];
        $("article").each((index, element) => {
          const image = $(element).find(".content-thumb img").attr("src");
          const title = $(element).find(".dataver2 .title").text();
          const episode = $(element).find(".data .title h2").text();
          const url = $(element).find(".animposx a").attr("href");
          results.push({
            title: title,
            image: image,
            episode: episode,
            url: url
          });
        });
        resolve(results);
      } catch (e) {
        console.error(e);
        reject(new Error(e));
      }
    });
  };
  search = query => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(`${this.baseURL}/?s=${query}`);
        const $ = cheerio.load(response.data);
        const results = [];
        $("article").each((index, element) => {
          const imageUrl = $(element).find(".content-thumb img").attr("src");
          const title = $(element).find(".data .title h2").text();
          const status = $(element).find(".data .type").text().trim();
          const score = $(element).find(".score i").text().trim();
          const url = $(element).find(".animposx a").attr("href");
          results.push({
            title: title,
            imageUrl: imageUrl,
            status: status,
            url: url
          });
        });
        resolve(results);
      } catch (e) {
        console.error(e);
        reject(new Error(e));
      }
    });
  };
  detail = url => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const animeInfo = {};
        if (/anime/.test(url)) {
          animeInfo.title = $(".areatitle .title h1.entry-title").text();
          animeInfo.image = $(".infoanime .thumb img").attr("src");
          animeInfo.type = $(".alternati .type").text().trim();
          animeInfo.status = $(".alternati span").eq(1).text().trim();
          animeInfo.duration = $(".alternati span").eq(2).text().trim();
          animeInfo.url = url;
          animeInfo.synopsis = $(".desc .entry-content p").text();
          animeInfo.genre = [];
          $(".genre-info a").each((index, element) => {
            animeInfo.genre.push($(element).text());
          });
          animeInfo.detail = {};
          $(".anime.infoanime .infox .spe span").each((index, element) => {
            let key = $(element).find("b").text();
            const value = $(element).text().trim().replace(key, "").trim();
            key = key.replace(/ /g, "_").replace(/:/g, "").trim().toLowerCase();
            animeInfo.detail[key] = value;
          });
          animeInfo.episode = [];
          $(".lstepsiode.listeps li").each((index, element) => {
            const episodeNumber = $(element).find(".eps a").text().trim();
            const episodeTitle = $(element).find(".lchx a").text().trim();
            const episodeDate = $(element).find(".date").text().trim();
            const episodeInfo = {
              number: episodeNumber,
              title: episodeTitle,
              date: episodeDate,
              url: $(element).find(".eps a").attr("href")
            };
            animeInfo.episode.push(episodeInfo);
          });
        } else {
          animeInfo.title = $(".areatitle .title .entry-title").text().trim();
          animeInfo.status = $(".areatitle .alternati span:nth-child(2)").text().trim();
          animeInfo.duration = $(".areatitle .alternati span:nth-child(3)").text().trim();
          animeInfo.releaseSeason = $(".areatitle .alternati span:nth-child(4) a").text().trim();
          animeInfo.sinopsis = $(".desc .entry-content").text().trim();
          animeInfo.genres = $(".genre-info a").map((index, element) => $(element).text().trim()).get();
          animeInfo.download = {};
          $("table tbody tr").each((index, element) => {
            const quality = $(element).find("td:nth-child(2) strong").text().trim();
            const server = $(element).find("td:nth-child(1) b").text().trim();
            const link = $(element).find("td:nth-child(3) a").attr("href");
            if (quality && server && link) {
              animeInfo.download[quality] = animeInfo.download[quality] || {};
              animeInfo.download[quality][server] = link;
            }
          });
        }
        resolve(animeInfo);
      } catch (e) {
        console.error(e);
        reject(new Error(e));
      }
    });
  };
}
export const neonime = new NeoNime();
export const anoboy = new Anoboy();
export const otakudesu = new Otakudesu();
export const kiryuu = new Kiryuu();
export const mangatoon = new MangaToon();
export const kusonime = new Kusonime();
export const komiku = new Komiku();
export const animebatch = new AnimeBatch();
export const doujindesu = new DoujinDesu();
export const nekopoi = new Nekopoi();
export const nhentai = new Nhentai();
export const komikcast = new Komikcast();
export const oploverz = new Oploverz();
export const meganei = new Meganei();