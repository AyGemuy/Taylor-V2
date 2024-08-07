import axios from "axios";
import cheerio from "cheerio";
import fetch from "node-fetch";

function ranNumb(min, max = null) {
  return null !== max ? (min = Math.ceil(min), max = Math.floor(max), Math.floor(Math.random() * (max - min + 1)) + min) : Math.floor(Math.random() * min) + 1;
}

function padLead(num, size) {
  for (var s = num + ""; s.length < size;) s = "0" + s;
  return s;
}

function niceBytes(x) {
  let l = 0,
    n = parseInt(x, 10) || 0;
  for (; n >= 1024 && ++l;) n /= 1024;
  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][l];
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function isNumber(number) {
  return number ? "number" == typeof(number = parseInt(number)) && !isNaN(number) : number;
}

function runtime(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / 86400),
    h = Math.floor(seconds % 86400 / 3600),
    m = Math.floor(seconds % 3600 / 60),
    s = Math.floor(seconds % 60);
  return (d > 0 ? d + (1 === d ? " day, " : " days, ") : "") + (h > 0 ? h + (1 === h ? " hour, " : " hours, ") : "") + (m > 0 ? m + (1 === m ? " minute, " : " minutes, ") : "") + (s > 0 ? s + (1 === s ? " second" : " seconds") : "");
}

function runtimes(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / 86400),
    h = Math.floor(seconds % 86400 / 3600),
    m = Math.floor(seconds % 3600 / 60),
    s = Math.floor(seconds % 60);
  return (d > 0 ? d + "d " : "") + (h < 10 ? "0" + h + ":" : h > 0 ? h + ":" : "") + (m < 10 ? "0" + m + ":" : m > 0 ? m + ":" : "") + (s < 10 ? "0" + s : s > 0 ? s : "");
}
async function cerpen(category) {
  return new Promise(async (resolve, reject) => {
    let length, judul = category.toLowerCase().replace(/[()*]/g, "").replace(/\s/g, "-");
    try {
      let res = await axios.get("http://cerpenmu.com/category/cerpen-" + judul);
      length = (await cheerio.load(res.data))("html body div#wrap div#content article.post div.wp-pagenavi a"),
        length = length[4].attribs.href.split("/").pop();
    } catch {
      length = 0;
    }
    let page = Math.floor(Math.random() * parseInt(length));
    axios.get("http://cerpenmu.com/category/cerpen-" + judul + "/page/" + page).then(get => {
      let $ = cheerio.load(get.data),
        link = [];
      $("article.post").each(function(a, b) {
        link.push($(b).find("a").attr("href"));
      });
      let random = link[Math.floor(Math.random() * link.length)];
      axios.get(random).then(res => {
        let $$ = cheerio.load(res.data),
          hasil = {
            title: $$("#content > article > h1").text(),
            author: $$("#content > article").text().split("Cerpen Karangan: ")[1].split("Kategori: ")[0],
            kategori: $$("#content > article").text().split("Kategori: ")[1].split("\n")[0],
            lolos: $$("#content > article").text().split("Lolos moderasi pada: ")[1].split("\n")[0],
            cerita: $$("#content > article > p").text()
          };
        resolve(hasil);
      });
    });
  });
}

function quotesAnime() {
  return new Promise((resolve, reject) => {
    const page = Math.floor(185 * Math.random());
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
async function getBuffer(url, options) {
  try {
    return (await axios({
      method: "get",
      url: url,
      headers: {
        DNT: 1,
        "Upgrade-Insecure-Request": 1
      },
      ...options,
      responseType: "arraybuffer"
    })).data;
  } catch (err) {
    return err;
  }
}

function lirik(judul) {
  return new Promise(async (resolve, reject) => {
    axios.get("https://www.musixmatch.com/search/" + judul).then(async ({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = {};
      const link = "https://www.musixmatch.com" + $("div.media-card-body > div > h2").find("a").attr("href");
      await axios.get(link).then(({
        data
      }) => {
        const $$ = cheerio.load(data);
        hasil.thumb = "https:" + $$("div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div").find("img").attr("src"),
          $$("div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics").each(function(a, b) {
            hasil.lirik = $$(b).find("span > p > span").text() + "\n" + $$(b).find("span > div > p > span").text();
          });
      }), resolve(hasil);
    }).catch(reject);
  });
}

function wallpaper(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://www.wallpaperflare.com/search?wallpaper=" + query, {
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        cookie: "_ga=GA1.2.863074474.1624987429; _gid=GA1.2.857771494.1624987429; __gads=ID=84d12a6ae82d0a63-2242b0820eca0058:T=1624987427:RT=1624987427:S=ALNI_MaJYaH0-_xRbokdDkQ0B49vSYgYcQ"
      }
    }).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        result = [];
      $("#gallery > li > figure > a").each(function(a, b) {
        result.push($(b).find("img").attr("data-src"));
      }), resolve(result);
    }).catch({
      status: "err"
    });
  });
}

function playstore(name) {
  return new Promise((resolve, reject) => {
    axios.get("https://play.google.com/store/search?q=" + name + "&c=apps").then(({
      data
    }) => {
      const $ = cheerio.load(data);
      let ln = [],
        nm = [],
        dv = [],
        lm = [];
      const result = [];
      $("div.wXUyZd > a").each(function(a, b) {
        const link = "https://play.google.com" + $(b).attr("href");
        ln.push(link);
      }), $("div.b8cIId.ReQCgd.Q9MA7b > a > div").each(function(d, e) {
        const name = $(e).text().trim();
        nm.push(name);
      }), $("div.b8cIId.ReQCgd.KoLSrc > a > div").each(function(f, g) {
        const dev = $(g).text().trim();
        dv.push(dev);
      }), $("div.b8cIId.ReQCgd.KoLSrc > a").each(function(h, i) {
        const limk = "https://play.google.com" + $(i).attr("href");
        lm.push(limk);
      });
      for (let i = 0; i < ln.length; i++) result.push({
        name: nm[i],
        link: ln[i],
        developer: dv[i],
        link_dev: lm[i]
      });
      resolve(result);
    }).catch(reject);
  });
}

function linkwa(nama) {
  return new Promise((resolve, reject) => {
    axios.get("http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search=" + nama + "&searchby=name").then(({
      data
    }) => {
      const $ = cheerio.load(data),
        result = [],
        lnk = [],
        nm = [];
      $("div.wa-chat-title-container").each(function(a, b) {
        const limk = $(b).find("a").attr("href");
        lnk.push(limk);
      }), $("div.wa-chat-title-text").each(function(c, d) {
        const name = $(d).text();
        nm.push(name);
      });
      for (let i = 0; i < lnk.length; i++) result.push({
        nama: nm[i].split(". ")[1],
        link: lnk[i].split("?")[0]
      });
      resolve(result);
    }).catch(reject);
  });
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

function generate(n) {
  var max = 11;
  if (n > max) return generate(max) + generate(n - max);
  var min = (max = Math.pow(10, n + 1)) / 10;
  return ("" + (Math.floor(Math.random() * (max - min + 1)) + min)).substring(1);
}
const delay = time => new Promise(res => setTimeout(res, time)),
  isUrl = text => text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, "gi")),
  getRandom = ext => `${Math.floor(1e4 * Math.random())}${ext}`,
  readMore = String.fromCharCode(8206).repeat(4001),
  someincludes = (data, id) => !!data.find(el => id.includes(el)),
  somematch = (data, id) => !!data.find(el => el === id);
async function GDriveDl(url) {
  let id, res = {
    error: !0
  };
  if (!url || !url.match(/drive\.google/i)) return res;
  try {
    if (id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1], !id) throw "ID Not Found";
    res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
      method: "post",
      headers: {
        "accept-encoding": "gzip, deflate, br",
        "content-length": 0,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        origin: "https://drive.google.com",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
        "x-client-data": "CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=",
        "x-drive-first-party": "DriveWebUi",
        "x-json-requested": "true"
      }
    });
    let {
      fileName,
      sizeBytes,
      downloadUrl
    } = JSON.parse((await res.text()).slice(4));
    if (!downloadUrl) throw "Link Download Limit!";
    let data = await fetch(downloadUrl);
    return 200 !== data.status ? data.statusText : {
      downloadUrl: downloadUrl,
      fileName: fileName,
      fileSize: formatSize(sizeBytes),
      mimetype: data.headers.get("content-type")
    };
  } catch (e) {
    return console.log(e), res;
  }
}
async function summarize(input, num) {
  try {
    const ratio = parseInt(num || 50),
      summaryText = input || "You can select the compression level by choosing a percentage on the drop-down menu above the editing text box. You can also copy and paste the text you want to compress from another program over into the editor. Pressing the you will find the summarized text in the text box on the right. Tip: Bookmark this page now.",
      response = await fetch("https://api.text-summarize.com/summarize?ratio=" + ratio, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: summaryText
        })
      });
    if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
    return (await response.json()).summary;
  } catch (error) {
    throw console.error("Error during summarization:", error.message), error;
  }
}
async function detectText(input_text) {
  try {
    return (await axios.post("https://api.zerogpt.com/api/detect/detectText", {
      input_text: input_text
    }, {
      headers: {
        "content-type": "application/json",
        origin: "https://www.zerogpt.com",
        "sec-fetch-site": "same-site",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
      }
    })).data;
  } catch (error) {
    console.error(error);
  }
}
export const slugify = str => str.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
export const isValidUrl = urlString => {
  const urlPattern = new RegExp("^(https?:\\/\\/)?" + "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + "((\\d{1,3}\\.){3}\\d{1,3}))" + "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + "(\\?[;&a-z\\d%_.~+=-]*)?" + "(\\#[-a-z\\d_]*)?$", "i");
  return urlPattern.test(urlString);
};
export {
  GDriveDl,
  capitalizeFirstLetter,
  cerpen,
  delay,
  generate,
  getBuffer,
  getRandom,
  isNumber,
  isUrl,
  linkwa,
  lirik,
  niceBytes,
  padLead,
  pickRandom,
  playstore,
  quotesAnime,
  ranNumb,
  readMore,
  runtime,
  runtimes,
  someincludes,
  somematch,
  wallpaper,
  summarize,
  detectText
};