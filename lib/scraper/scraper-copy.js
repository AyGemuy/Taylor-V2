import cheerio from "cheerio";
import fetch from "node-fetch";
import axios from "axios";
import qs from "qs";
let data, result, x, y, z, pagina, rand, slink, no = 1;

function quotes(input) {
  return new Promise((resolve, reject) => {
    fetch("https://jagokata.com/kata-bijak/kata-" + input.replace(/\s/g, "_") + ".html?page=1").then(res => res.text()).then(res => {
      const $ = cheerio.load(res);
      if (data = [], $('div[id="main"]').find('ul[id="citatenrijen"] > li').each(function(index, element) {
          x = $(this).find('div[class="citatenlijst-auteur"] > a').text().trim(), y = $(this).find('span[class="auteur-beschrijving"]').text().trim(),
            z = $(element).find('q[class="fbquote"]').text().trim(), data.push({
              author: x,
              bio: y,
              quote: z
            });
        }), data.splice(2, 1), 0 === data.length) return resolve({
        creator: "stikerin",
        status: !1
      });
      resolve({
        creator: "stikerin",
        status: !0,
        data: data
      });
    }).catch(reject);
  });
}

function komikindogetch(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("#chapter_list > ul > li").each(function(a, b) {
        result = {
          status: 200,
          author: author,
          title: $(b).find("> span.lchx > a").attr("href"),
          get_url: $(b).find("> span.lchx > a").text()
        }, hasil.push(result);
      }), resolve(hasil);
    }).catch(reject);
  });
}

function otakudesugetepsddl(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("#venkonten > div.venser > div.venutama > div.download > ul:nth-child(2) > li").each(function(a, b) {
        let dati = {
          dl_url: $(b).find("> a ").attr("href"),
          title: $(b).find("> strong ").text()
        };
        hasil.push(dati);
      }), resolve(hasil);
    }).catch(reject);
  });
}

function quotesAnime() {
  return new Promise((resolve, reject) => {
    const page = Math.floor(184 * Math.random());
    axios.get("https://otakotaku.com/quote/feed/" + page).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("div.kotodama-list").each(function(l, h) {
        hasil.push({
          link: $(h).find("a").attr("href"),
          gambar: $(h).find("img").attr("data-src"),
          karakter: $(h).find("div.char-name").text().trim(),
          anime: $(h).find("div.anime-title").text().trim(),
          episode: $(h).find("div.meta").text(),
          up_at: $(h).find("small.meta").text(),
          quotes: $(h).find("div.quote").text().trim()
        });
      }), resolve(hasil);
    }).catch(reject);
  });
}

function nhentaisearch(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://nhentai.to/search?q=${query}`).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("body > div.container.index-container > div").each(function(a, b) {
        result = {
          author: "©lui",
          status: 200,
          index: "" + no++,
          link: "https://nhentai.to" + $(b).find("> a").attr("href"),
          thumb: $(b).find("> a > img:nth-child(2)").attr("src"),
          title: $(b).find("> a > div").text()
        }, hasil.push(result);
      }), resolve(hasil);
    }).catch(reject);
  });
}

function doujindesusearch(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://212.32.226.234/?s=${query}`).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("#archives > div > article").each(function(a, b) {
        result = {
          link: "https://212.32.226.234" + $(b).find("> a").attr("href"),
          thumb: $(b).find("> a > figure > img").attr("src"),
          title: $(b).find("> a > figure > img").attr("title"),
          type: $(b).find("> a > figure > span").text(),
          status: $(b).find("> a > div > div.status").text(),
          score: $(b).find("> a > div > div.score").text()
        }, hasil.push(result);
      }), resolve(hasil);
    }).catch(reject);
  });
}

function doujindesuch(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("#chapter_list > ul > li").each(function(a, b) {
        result = {
          title: $(b).find("> div.chright > span > a").attr("title"),
          url: $(b).find("> div.chright > span > a").attr("href")
        }, hasil.push(result);
      }), resolve(hasil);
    }).catch(reject);
  });
}

function doujindesulatest() {
  return new Promise((resolve, reject) => {
    axios.get("https://212.32.226.234").then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("#archives > div > article").each(function(a, b) {
        result = {
          title: $(b).find("> a").attr("title"),
          link: "https://212.32.226.234" + $(b).find("> a").attr("href"),
          info: $(b).find("div > div > a > span").text(),
          type: $(b).find("> a > figure > span").text(),
          thumb: $(b).find("> a > figure > img").attr("src")
        }, hasil.push(result);
      }), resolve(hasil);
    }).catch(reject);
  });
}

function playstore(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://play.google.com/store/search?q=${query}&c=apps`).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("#yDmH0d > c-wiz.SSPGKf.glB9Ve > div > div > c-wiz > c-wiz > c-wiz > section > div > div > div > div").each(function(a, b) {
        result = {
          status: 200,
          author: "@lui",
          video_preview: $(b).find("div > div > div > a > div.Vc0mnc > div > button").text(),
          thumb: $(b).find("> div > div.limitnjg > img").attr("src"),
          info: $(b).find("> div > div.desc").text(),
          url: $(b).find("> div > h2 > a").attr("href")
        }, hasil.push(result);
      }), resolve(hasil);
    }).catch(reject);
  });
}

function sektekomiksearch(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://sektekomik.xyz/manga?search=${query}`).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("#swiper-wrapper-32f18f5ed9677ea4 > div").each(function(a, b) {
        result = {
          status: 200,
          author: "@lui",
          title: $(b).find("> div > div.product__item__text > h5 > a").text(),
          thumb: $(b).find("> div > div.product__item__pic.set-bg.manga").attr("data-setbg"),
          type: $(b).find("> div > div.product__item__pic.set-bg.manga > div.ep.m-type > a").text()
        }, hasil.push(result);
      }), resolve(hasil);
    }).catch(reject);
  });
}

function nekopoisearch(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://nekopoi.care/search/${query}`).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("#content > div.postsbody > div.result > ul > li").each(function(a, b) {
        result = {
          status: 200,
          author: "@lui",
          title: $(b).find("> div > h2 > a").text(),
          thumb: $(b).find("> div > div.limitnjg > img").attr("src"),
          info: $(b).find("> div > div.desc").text(),
          url: $(b).find("> div > h2 > a").attr("href")
        }, hasil.push(result);
      }), resolve(hasil);
    }).catch(reject);
  });
}

function kusonimelatest() {
  return new Promise((resolve, reject) => {
    axios.get("https://kusonime.com").then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("#venkonten > div.vezone > div.venser > div > div.rseries > div.rapi > div.venz > ul > div").each(function(a, b) {
        result = {
          title: $(b).find("> div > div.thumb > a").attr("title"),
          thumb: $(b).find("> div > div.thumb > a > div > img").attr("src"),
          genre: $(b).find("div > div.content > p:nth-child(4)").text(),
          url: $(b).find("> div > div.thumb > a").attr("href")
        }, hasil.push(result);
      }), resolve(hasil);
    }).catch(reject);
  });
}

function nekopoilatest() {
  return new Promise((resolve, reject) => {
    axios.get("https://nekopoi.care").then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("#boxid > div").each(function(a, b) {
        result = {
          title: $(b).find("> div.eroinfo > h2 > a").text(),
          epsd_url: $(b).find("> div.eroinfo > h2 > a").attr("href"),
          thumb: $(b).find("> div.eroimg > div > img").attr("src"),
          up_date: $(b).find("> div.eroinfo > span:nth-child(2)").text(),
          url: $(b).find("> div.eroinfo > span:nth-child(3) > a").attr("href")
        }, hasil.push(result);
      }), resolve(hasil);
    }).catch(reject);
  });
}

function nkpepsddl(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("#content > div.postsbody > div > div.arealinker > div.boxdownload > div").each(function(a, b) {
        let dati = {
          Drop: $(b).find("> div.listlink > p > a:nth-child(1)").attr("href"),
          Slare: $(b).find("> div.listlink > p > a:nth-child(2)").attr("href"),
          StreamSB: $(b).find("> div.listlink > p > a:nth-child(2)").attr("href"),
          Dood: $(b).find("> div.listlink > p > a:nth-child(3)").attr("href"),
          Racaty: $(b).find("> div.listlink > p > a:nth-child(4)").attr("href"),
          ZippyShare: $(b).find("> div.listlink > p > a:nth-child(5)").attr("href")
        };
        hasil.push(dati);
      }), resolve(hasil);
    }).catch(reject);
  });
}

function nhgetimg(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("#thumbnail-container > div").each(function(a, b) {
        hasil.push($(b).find("> a > img").attr("data-src"));
      }), resolve(hasil);
    }).catch(reject);
  });
}

function dojindsgetimg(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("#anu > img").each(function(a, b) {
        hasil.push($(b).attr("src"));
      }), resolve(hasil);
    }).catch(reject);
  });
}

function mangatoons(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://mangatoon.mobi/en/search?word=${query}`).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("#page-content > div.search-page > div > div.comics-result > div.recommended-wrap > div > div ").each(function(a, b) {
        result = {
          status: 200,
          author: author,
          judul: $(b).find("> div.recommend-comics-title > span").text(),
          genre: $(b).find("> div.comics-type > span").text().trim(),
          link: "https://mangatoon.mobi" + $(b).find("> a").attr("href"),
          thumbnail: $(b).find("> a > div > img").attr("src")
        }, hasil.push(result);
      }), resolve(hasil);
    }).catch(reject);
  });
}

function webtoons(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.webtoons.com/id/search?keyword=${query}`).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("#content > div.card_wrap.search._searchResult > ul > li ").each(function(a, b) {
        result = {
          status: 200,
          author: author,
          judul: $(b).find("> a > div > p.subj").text(),
          like: $(b).find("> a > div > p.grade_area > em").text(),
          creator: $(b).find("> a > div > p.author").text(),
          genre: $(b).find("> a > span").text(),
          thumbnail: $(b).find("> a > img").attr("src"),
          url: "https://www.webtoons.com" + $(b).find("> a").attr("href")
        }, hasil.push(result);
      }), resolve(hasil);
    }).catch(reject);
  });
}

function joox(query) {
  return new Promise((resolve, reject) => {
    const time = Math.floor(new Date() / 1e3);
    axios.get("http://api.joox.com/web-fcgi-bin//web_search?lang=id&country=id&type=0&search_input=" + query + "&pn=1&sin=0&ein=29&_=" + time).then(({
      data
    }) => {
      result = [];
      let hasil = [],
        promoses = [],
        ids = [];
      data.itemlist.forEach(result => {
        ids.push(result.songid);
      });
      for (let i = 0; i < data.itemlist.length; i++) {
        const get = "http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=" + ids[i];
        promoses.push(axios.get(get, {
          headers: {
            Cookie: "wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;"
          }
        }).then(({
          data
        }) => {
          const res = JSON.parse(data.replace("MusicInfoCallback(", "").replace("\n)", ""));
          hasil.push({
            lagu: res.msong,
            album: res.malbum,
            penyanyi: res.msinger,
            publish: res.public_time,
            img: res.imgSrc,
            mp3: res.mp3Url
          }), Promise.all(promoses).then(() => resolve({
            creator: "ariffb",
            status: !0,
            data: hasil
          }));
        }).catch(reject));
      }
    }).catch(reject);
  });
}

function otakudesu(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://otakudesu.video=/?s=${query}&post_type=anime`).then(({
      data
    }) => {
      const hasil = [],
        $ = cheerio.load(data);
      $("#venkonten > div > div.venser > div > div > ul > li").each(function(a, b) {
        result = {
          status: 200,
          author: author,
          judul: $(b).find("> h2 > a").text(),
          thumbnail: $(b).find("> img").attr("src"),
          link: $(b).find("> h2 > a").attr("href")
        }, hasil.push(result);
      }), resolve(hasil);
    }).catch(reject);
  });
}

function gore(query) {
  return new Promise(async (resolve, reject) => {
    axios.get("https://seegore.com/?s=" + query).then(dataa => {
      const $$$ = cheerio.load(dataa);
      pagina = $$$("#main > div.container.main-container > div > div.bb-col.col-content > div > div > div > div > nav > ul > li:nth-child(4) > a").text(),
        rand = Math.floor(Math.random() * pagina) + 1, slink = 1 === rand ? "https://seegore.com/?s=" + query : `https://seegore.com/page/${rand}/?s=${query}`,
        axios.get(slink).then(({
          data
        }) => {
          const $ = cheerio.load(data),
            link = [],
            judul = [],
            uploader = [],
            format = [],
            thumb = [];
          $("#post-items > li > article > div.content > header > h2 > a").each(function(a, b) {
            link.push($(b).attr("href"));
          }), $("#post-items > li > article > div.content > header > h2 > a").each(function(c, d) {
            jud = $(d).text(), judul.push(jud);
          }), $("#post-items > li > article > div.content > header > div > div.bb-cat-links > a").each(function(e, f) {
            upl = $(f).text(), uploader.push(upl);
          }), $("#post-items > li > article > div.post-thumbnail > a > div > img").each(function(g, h) {
            thumb.push($(h).attr("src"));
          });
          for (let i = 0; i < link.length; i++) format.push({
            judul: judul[i],
            uploader: uploader[i],
            thumb: thumb[i],
            link: link[i]
          });
          resolve("" != format ? {
            creator: "Fajar Ihsana",
            status: !0,
            data: format
          } : {
            creator: "Fajar Ihsana",
            status: !1
          });
        }).catch(reject);
    });
  });
}

function doujindesu(url) {
  return new Promise((resolve, reject) => {
    const hasil = {};
    axios.get(url).then(res => {
      const $ = cheerio.load(res.data);
      hasil.thumb = $("#archive > div > aside > figure > a > img").attr("src"), hasil.title = $("#archive > div > section > h1.title").text(),
        hasil.status = $("#archive > div > section > table > tbody > tr:nth-child(1) > td:nth-child(2) > a").text(),
        hasil.type = $("#archive > div > section > table > tbody > tr.magazines > td:nth-child(2) > a").text(),
        hasil.series = $("#archive > div > section > table > tbody > tr.parodies > td:nth-child(2) > a").text(),
        hasil.author = $("#archive > div > section > table > tbody > tr:nth-child(4) > td:nth-child(2) > a").text(),
        hasil.group = $("#archive > div > section > table > tbody > tr:nth-child(5) > td:nth-child(2) > a").text(),
        hasil.rating = $("#archive > div > section > table > tbody > tr:nth-child(6) > td:nth-child(2) > div").text(),
        hasil.upload = $("#archive > div > section > table > tbody > tr.created.createdAt > td:nth-child(2)").text(),
        hasil.synopsis = $("#archive > div > section > div.pb-2 > p:nth-child(1)").text() || "tidak ada sinopsis karena bukan manhwa!!",
        hasil.chapter = [];
    }), axios.get(url).then(({
      data
    }) => {
      const $ = cheerio.load(data);
      $("#chapter_list > ul > li").each(function(a, b) {
        result = {
          title: $(b).find("> div.epsright > span > a").attr("title"),
          url: "https://212.32.226.234" + $(b).find("> div.epsright > span > a").attr("href"),
          dl_url: $(b).find("> div.chright > span > a").attr("href") || "Eror link mungkin telah di hapus oleh admin webnya"
        }, hasil.chapter.push(result);
      }), resolve(hasil);
    });
  });
}

function nhentai(url) {
  return new Promise((resolve, reject) => {
    const hasil = {};
    axios.get(url).then(res => {
      const $ = cheerio.load(res.data);
      hasil.thumb = $("#cover > a > img").attr("src"), hasil.info = $("#info").text(),
        resolve(hasil);
    });
  });
}

function kusonimeinfo(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      const $ = cheerio.load(res.data),
        hasil = {};
      hasil.title = $("#venkonten > div.vezone > div.venser > div.post-thumb > h1").text(),
        hasil.info = $("#venkonten > div.vezone > div.venser > div.venutama > div.lexot > div.info").text(),
        hasil.thumb = $("#venkonten > div.vezone > div.venser > div.post-thumb > img").attr("src"),
        hasil.synopsis = $("#venkonten > div.vezone > div.venser > div.venutama > div.lexot > p:nth-child(3)").text(),
        hasil.dl_url_360p = $("#venkonten > div.vezone > div.venser > div.venutama > div.lexot > div.dlbod > div > div:nth-child(2) > a:nth-child(2)").attr("href"),
        hasil.dl_url_480p = $("#venkonten > div.vezone > div.venser > div.venutama > div.lexot > div.dlbod > div > div:nth-child(3) > a:nth-child(2)").attr("href"),
        resolve(hasil);
    });
  });
}

function porno() {
  return new Promise((resolve, reject) => {
    axios.get("https://tikporntok.com/?random=1").then(res => {
      const $ = cheerio.load(res.data),
        hasil = {};
      hasil.title = $("article > h1").text(), hasil.source = $("article > div.video-wrapper.vxplayer").attr("data-post") || "Web Not Response",
        hasil.thumb = $("article > div.video-wrapper.vxplayer > div.vx_el").attr("data-poster") || "https://4.bp.blogspot.com/-hyMqjmQQq4o/W6al-Rk4IpI/AAAAAAAADJ4/m-lVBA_GC9Q5d4BIQg8ZO3fYmQQC3LqSACLcBGAs/s1600/404_not_found.png",
        hasil.desc = $("article > div.intro").text(), hasil.upload = $("article > div.single-pre-meta.ws.clearfix > time").text(),
        hasil.like = $("article > div.single-pre-meta.ws.clearfix > div > span:nth-child(1) > span").text(),
        hasil.dislike = $("article > div.single-pre-meta.ws.clearfix > div > span:nth-child(2) > span").text(),
        hasil.favorite = $("article > div.single-pre-meta.ws.clearfix > div > span:nth-child(3) > span").text(),
        hasil.views = $("article > div.single-pre-meta.ws.clearfix > div > span:nth-child(4) > span").text(),
        hasil.tags = $("article > div.post-tags").text(), hasil.video = $("article > div.video-wrapper.vxplayer > div.vx_el").attr("src") || $("article > div.video-wrapper.vxplayer > div.vx_el").attr("data-src") || "https://4.bp.blogspot.com/-hyMqjmQQq4o/W6al-Rk4IpI/AAAAAAAADJ4/m-lVBA_GC9Q5d4BIQg8ZO3fYmQQC3LqSACLcBGAs/s1600/404_not_found.png",
        resolve(hasil);
    });
  });
}

function hentai() {
  return new Promise((resolve, reject) => {
    const page = Math.floor(1153 * Math.random());
    axios.get("https://sfmcompile.club/page/" + page).then(data => {
      const $ = cheerio.load(data.data),
        hasil = [];
      $("#primary > div > div > ul > li > article").each(function(a, b) {
        hasil.push({
          title: $(b).find("header > h2").text(),
          link: $(b).find("header > h2 > a").attr("href"),
          category: $(b).find("header > div.entry-before-title > span > span").text().replace("in ", ""),
          share_count: $(b).find("header > div.entry-after-title > p > span.entry-shares").text(),
          views_count: $(b).find("header > div.entry-after-title > p > span.entry-views").text(),
          type: $(b).find("source").attr("type") || "image/jpeg",
          video_1: $(b).find("source").attr("src") || $(b).find("img").attr("data-src"),
          video_2: $(b).find("video > a").attr("href") || ""
        });
      }), resolve(hasil);
    });
  });
}

function tiktok(url) {
  return new Promise(async (resolve, reject) => {
    axios.get("https://ttdownloader.com/", {
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        cookie: "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
      }
    }).then(({
      data
    }) => {
      let token = cheerio.load(data)("#token").attr("value"),
        config = {
          url: url,
          format: "",
          token: token
        };
      axios("https://ttdownloader.com/req/", {
        method: "POST",
        data: new URLSearchParams(Object.entries(config)),
        headers: {
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          cookie: "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
        }
      }).then(({
        data
      }) => {
        const $ = cheerio.load(data);
        resolve({
          nowm: $("div:nth-child(2) > div.download > a").attr("href"),
          wm: $("div:nth-child(3) > div.download > a").attr("href"),
          audio: $("div:nth-child(4) > div.download > a").attr("href")
        });
      });
    }).catch(reject);
  });
}

function ttdown(url) {
  try {
    const tokenn = axios.get("https://downvideo.quora-wiki.com/tiktok-video-downloader#url=" + url);
    const param = {
        url: url,
        token: cheerio.load(tokenn.data)("#token").attr("value")
      },
      {
        data
      } = axios.request("https://downvideo.quora-wiki.com/system/action.php", {
        method: "post",
        data: new URLSearchParams(Object.entries(param)),
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
          referer: "https://downvideo.quora-wiki.com/tiktok-video-downloader"
        }
      });
    return {
      status: 200,
      author: author,
      title: data.title,
      thumbnail: "https:" + data.thumbnail,
      duration: data.duration,
      media: data.medias
    };
  } catch (e) {
    return e;
  }
}

function twitter(url) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    params.append("URL", url), fetch("https://twdown.net/download.php", {
      method: "POST",
      body: params
    }).then(res => res.text()).then(res => {
      const $ = cheerio.load(res);
      if (data = [], $("div.container").find("tbody > tr > td").each(function(index, element) {
          x = $(this).find("a").attr("href"), "#" !== x && void 0 !== x && data.push({
            url: x
          });
        }), 0 === data.length) return resolve({
        status: !1
      });
      resolve({
        status: !0,
        data: data
      });
    }).catch(reject);
  });
}

function igstory(url) {
  return new Promise(async (resolve, reject) => {
    await axios.request({
      url: "https://igs.sf-converter.com/api/profile/" + url,
      method: "GET",
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        origin: "https://id.savefrom.net",
        pragma: "no-cache",
        referer: "https://id.savefrom.net/,",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "Windows",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
      }
    }).then(async respon => {
      let position = [],
        data2 = [],
        id = respon.data.result.id;
      await axios.get("https://igs.sf-converter.com/api/stories/" + id).then(res => {
        Object.values(res.data.result).forEach(i => {
          position.push(i);
        });
        for (let i of position)
          if (void 0 !== i.video_versions)
            for (let j of i.video_versions) 1280 === j.height && data2.push(j.url);
        resolve({
          status: !0,
          author: "piyo",
          data: data2
        });
      }).catch(reject);
    }).catch(reject);
  });
}

function igdl(url) {
  return new Promise(async (resolve, reject) => {
    axios.request({
      url: "https://www.instagramsave.com/download-instagram-videos.php",
      method: "GET",
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        cookie: "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
      }
    }).then(({
      data
    }) => {
      const token = cheerio.load(data)("#token").attr("value");
      let config = {
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
          cookie: "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        },
        data: {
          url: url,
          action: "post",
          token: token
        }
      };
      axios.post("https://www.instagramsave.com/system/action.php", qs.stringify(config.data), {
        headers: config.headers
      }).then(({
        data
      }) => {
        resolve(data.medias);
      });
    }).catch(reject);
  });
}

function ssweb(url, device = "desktop") {
  return new Promise((resolve, reject) => {
    const base = "https://www.screenshotmachine.com",
      param = {
        url: url,
        device: device,
        full: !0,
        cacheLimit: 0
      };
    axios({
      url: base + "/capture.php",
      method: "POST",
      data: new URLSearchParams(Object.entries(param)),
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    }).then(data => {
      const cookies = data.headers["set-cookie"];
      "success" === data.data.status ? axios.get(base + "/" + data.data.link, {
        headers: {
          cookie: cookies.join("")
        },
        responseType: "arraybuffer"
      }).then(({
        data
      }) => {
        result = {
          status: 200,
          author: author,
          result: data
        }, resolve(result);
      }) : reject({
        status: 404,
        author: author,
        message: data.data
      });
    }).catch(reject);
  });
}

function otakudesuongoing() {
  return new Promise((resolve, reject) => {
    axios.get("https://otakudesu.bid").then(({
      data
    }) => {
      const hasil = [],
        $ = cheerio.load(data);
      $("#venkonten > div > div.venser > div.venutama > div > div.rapi > div > ul > li").each(function(a, b) {
        result = {
          status: 200,
          author: author,
          judul: $(b).find("> div > div.thumb > a > div > h2").text().trim(),
          episode: $(b).find("> div > div.epz").text().trim(),
          tanggal: $(b).find("> div > div.newnime").text().trim(),
          hari: $(b).find("> div > div.epztipe").text().trim(),
          thumbnail: $(b).find("> div > div.thumb > a > div > img").attr("src"),
          link: $(b).find("> div > div.thumb > a").attr("href")
        }, hasil.push(result);
      }), resolve(hasil);
    }).catch(reject);
  });
}

function komikindosearch(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://komikindo.id/?s=${query}`).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("#content > div.postbody > section > div.film-list > div").each(function(a, b) {
        let dati = {
          thumb: $(b).find("> div > a > div > img ").attr("src"),
          title: $(b).find("> div > div > a").attr("title"),
          url: $(b).find("> div > div > a").attr("href")
        };
        hasil.push(dati);
      }), resolve(hasil);
    }).catch(reject);
  });
}

function nekopoi(url) {
  return new Promise((resolve, reject) => {
    const hasil = {};
    axios.get(url).then(res => {
      const $ = cheerio.load(res.data);
      hasil.thumb = $("#content > div.animeinfos > div.imgdesc > img").attr("src"), hasil.synopsis = $("#content > div.animeinfos > div.imgdesc > span > p").text(),
        hasil.visitor_count = $("#content > div.animeinfos > div.tabulasi > div:nth-child(3)").text(),
        hasil.judul_jp = $("#content > div.animeinfos > div.listinfo > ul > li:nth-child(1)").text(),
        hasil.type = $("#content > div.animeinfos > div.listinfo > ul > li:nth-child(2)").text(),
        hasil.jmlh_epsd = $("#content > div.animeinfos > div.listinfo > ul > li:nth-child(3)").text(),
        hasil.status = $("#content > div.animeinfos > div.listinfo > ul > li:nth-child(4)").text(),
        hasil.publish = $("#content > div.animeinfos > div.listinfo > ul > li:nth-child(5)").text(),
        hasil.judul = $("#content > div.animeinfos > div.listinfo > ul > li:nth-child(6)").text(),
        hasil.genre = $("#content > div.animeinfos > div.listinfo > ul > li:nth-child(7)").text(),
        hasil.duration = $("#content > div.animeinfos > div.listinfo > ul > li:nth-child(8)").text(),
        hasil.rating = $("#content > div.animeinfos > div.listinfo > ul > li:nth-child(9)").text(),
        hasil.episode_url = [];
    }), axios.get(url).then(({
      data
    }) => {
      const $ = cheerio.load(data);
      $("#content > div.animeinfos > div.episodelist > ul > li").each(function(a, b) {
        result = {
          title: $(b).find("> span.leftoff > a").text(),
          epsd_url: $(b).find("> span.leftoff > a").attr("href")
        }, hasil.episode_url.push(result);
      }), resolve(hasil);
    });
  });
}

function otakudesuinfo(url) {
  return new Promise((resolve, reject) => {
    const hasil = {};
    axios.get(url).then(res => {
      const $ = cheerio.load(res.data);
      hasil.judul = $("#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(1) > span").text().split(": ")[1],
        hasil.japanese = $("#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(2) > span").text().split(": ")[1],
        hasil.rating = $("#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(3) > span").text().split(": ")[1],
        hasil.produser = $("#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(4) > span").text().split(": ")[1],
        hasil.tipe = $("#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(5) > span").text().split(": ")[1],
        hasil.anime_status = $("#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(6) > span").text().split(": ")[1],
        hasil.total_episode = $("#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(7) > span").text().split(": ")[1],
        hasil.durasi = $("#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(8) > span").text().split(": ")[1],
        hasil.rilis = $("#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(9) > span").text().split(": ")[1],
        hasil.studio = $("#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(10) > span").text().split(": ")[1],
        hasil.genre = $("#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(11)").text().split(": ")[1],
        hasil.thumbnail = $("#venkonten > div.venser > div.fotoanime > img").attr("src"),
        hasil.sinopsis = $("#venkonten > div.venser > div.fotoanime > div.sinopc").text().trim(),
        hasil.epsd_url = [];
    }), axios.get(url).then(({
      data
    }) => {
      const $ = cheerio.load(data);
      $("#venkonten > div.venser > div:nth-child(8) > ul > li").each(function(a, b) {
        result = {
          title: $(b).find("> span:nth-child(1) > a").text(),
          epsd_url: $(b).find("> span:nth-child(1) > a").attr("href")
        }, hasil.epsd_url.push(result);
      }), resolve(hasil);
    });
  });
}

function ssweb2(url, device = "mobile") {
  return new Promise((resolve, reject) => {
    const base = "https://www.screenshotmachine.com",
      param = {
        url: url,
        device: device,
        full: !0,
        cacheLimit: 0
      };
    axios({
      url: base + "/capture.php",
      method: "POST",
      data: new URLSearchParams(Object.entries(param)),
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    }).then(data => {
      const cookies = data.headers["set-cookie"];
      "success" === data.data.status ? axios.get(base + "/" + data.data.link, {
        headers: {
          cookie: cookies.join("")
        },
        responseType: "arraybuffer"
      }).then(({
        data
      }) => {
        result = {
          status: 200,
          author: author,
          result: data
        }, resolve(result);
      }) : reject({
        status: 404,
        author: author,
        message: data.data
      });
    }).catch(reject);
  });
}

function textpro(url, text) {
  return new Promise(async (resolve, reject) => {
    if (!/^https:\/\/textpro\.me\/.+\.html$/.test(url)) throw new Error("Url Salah!");
    axios({
      url: url,
      method: "get",
      headers: {
        cookie: "_ga=GA1.2.973149439.1655802326; __gads=ID=48c7bf36c499a70a-2250dc73a4d300d3:T=1655802326:RT=1655802326:S=ALNI_MZutfiaIw3EmxBoKDfSTxZMydnKrA; PHPSESSID=24eg6g44qnh7f34evgskg1ehf1; cookieconsent_status=dismiss; _gid=GA1.2.1310090408.1656776919; __gpi=UID=0000067655c41509:T=1655802326:RT=1656832156:S=ALNI_MYb5ILRvXyZT7o_Ts9jfr_e86-_8w; _gat_gtag_UA_114571019_5=1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
      }
    }).then(da => {
      const $ = cheerio.load(da.data),
        form = new FormData();
      form.append("text[]", text), form.append("submit", "Go"), form.append("token", $("#token").val()),
        form.append("build_server", $("#build_server").val()), form.append("build_server_id", $("#build_server_id").val()),
        axios({
          url: url,
          method: "POST",
          data: form,
          headers: {
            cookie: "_ga=GA1.2.973149439.1655802326; __gads=ID=48c7bf36c499a70a-2250dc73a4d300d3:T=1655802326:RT=1655802326:S=ALNI_MZutfiaIw3EmxBoKDfSTxZMydnKrA; PHPSESSID=24eg6g44qnh7f34evgskg1ehf1; cookieconsent_status=dismiss; _gid=GA1.2.1310090408.1656776919; __gpi=UID=0000067655c41509:T=1655802326:RT=1656832156:S=ALNI_MYb5ILRvXyZT7o_Ts9jfr_e86-_8w; _gat_gtag_UA_114571019_5=1",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
          }
        }).then(da => {
          cheerio.load(da.data);
          const gdata = /<div.*?id="form_value".+>(.*?)<\/div>/.exec(da.data);
          axios({
            url: "https://textpro.me/effect/create-image",
            method: "POST",
            data: new URLSearchParams(JSON.parse(gdata[1].replace(/\[/g, "").replace(/\]/g, "").replace(/text/g, "text[]").replace(/text\[\]pro\.me/g, "textpro.me"))),
            headers: {
              cookie: "_ga=GA1.2.973149439.1655802326; __gads=ID=48c7bf36c499a70a-2250dc73a4d300d3:T=1655802326:RT=1655802326:S=ALNI_MZutfiaIw3EmxBoKDfSTxZMydnKrA; PHPSESSID=24eg6g44qnh7f34evgskg1ehf1; cookieconsent_status=dismiss; _gid=GA1.2.1310090408.1656776919; __gpi=UID=0000067655c41509:T=1655802326:RT=1656832156:S=ALNI_MYb5ILRvXyZT7o_Ts9jfr_e86-_8w; _gat_gtag_UA_114571019_5=1",
              "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
            }
          }).then(a => {
            const result = {
              status: 200,
              author: author,
              result: "https://textpro.me" + a.data.image
            };
            resolve(result);
          }).catch(reject);
        }).catch(reject);
    });
  });
}

function pin(url) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    params.append("url", url), fetch("https://www.expertsphp.com/facebook-video-downloader.php", {
      method: "POST",
      body: params
    }).then(res => res.text()).then(res => {
      const $ = cheerio.load(res);
      if (y = `pinterest_${Math.floor(1e6 * Math.random())}.mp4`, x = $("video").find("source").attr("src"), data = {
          file: y,
          url: x
        }, void 0 === x) return resolve({
        status: !1
      });
      resolve({
        status: !0,
        data: data
      });
    }).catch(reject);
  });
}
let is = {
  headers: {
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
    cookie: "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  }
};

function _token(host) {
  return new Promise(async (resolve, reject) => {
    axios.request({
      url: host,
      method: "GET",
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        cookie: "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
      }
    }).then(({
      data
    }) => {
      let token = cheerio.load(data)("#token").attr("value");
      resolve(token);
    });
  });
}

function facebook(url) {
  return new Promise(async (resolve, reject) => {
    let host = "https://aiovideodl.ml/",
      form = {
        data: {
          url: url,
          token: await _token(host)
        }
      };
    axios.post(host + "/system/action.php", qs.stringify(form.data), {
      headers: is.headers
    }).then(({
      data
    }) => {
      if (0 === data.links.lenght) return resolve({
        creator: "@neoxrs – Wildan Izzudin",
        status: !1
      });
      resolve({
        creator: "@neoxrs – Wildan Izzudin",
        status: !0,
        data: data.links
      });
    });
  });
}
export {
  facebook,
  nkpepsddl,
  komikindogetch,
  komikindosearch,
  otakudesugetepsddl,
  dojindsgetimg,
  nhgetimg,
  nhentai,
  nhentaisearch,
  kusonimelatest,
  kusonimeinfo,
  otakudesuongoing,
  otakudesuinfo,
  sektekomiksearch,
  nekopoisearch,
  nekopoi,
  nekopoilatest,
  porno,
  doujindesuch,
  doujindesu,
  doujindesusearch,
  mangatoons,
  webtoons,
  ssweb,
  ssweb2,
  otakudesu,
  gore,
  hentai,
  quotes,
  doujindesulatest,
  quotesAnime,
  igdl,
  textpro,
  igstory,
  tiktok,
  ttdown,
  twitter,
  joox,
  pin
};