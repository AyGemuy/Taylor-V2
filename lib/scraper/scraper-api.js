import cheerio from "cheerio";
import axios from "axios";
import qs from "qs";
import chalk from "chalk";
import cookie from "cookie";
import FormData from "form-data";
import request from "request";
import {
  queryString
} from "object-query-string";
async function spotify(url) {
  return (await fetch("https://api.spotify-downloader.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "link=" + url
  })).json();
}
async function hentaivid() {
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
async function ephoto(url, texk) {
  let form = new FormData(),
    gT = await axios.get(url, {
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
      }
    }),
    $ = cheerio.load(gT.data),
    text = texk,
    token = $("input[name=token]").val(),
    build_server = $("input[name=build_server]").val(),
    build_server_id = $("input[name=build_server_id]").val();
  form.append("text[]", text), form.append("token", token), form.append("build_server", build_server),
    form.append("build_server_id", build_server_id);
  let res = await axios({
      url: url,
      method: "POST",
      data: form,
      headers: {
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
        cookie: gT.headers["set-cookie"].join("; "),
        ...form.getHeaders()
      }
    }),
    $$ = cheerio.load(res.data),
    json = JSON.parse($$("input[name=form_value_input]").val());
  json["text[]"] = json.text, delete json.text;
  let {
    data
  } = await axios.post("https://en.ephoto360.com/effect/create-image", new URLSearchParams(json), {
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
      cookie: gT.headers["set-cookie"].join("; ")
    }
  });
  return build_server + data.image;
}

function otakudesu(judul) {
  return new Promise(async (resolve, reject) => {
    axios.get("https://otakudesu.watch/?s=" + judul + "&post_type=anime").then(({
      data
    }) => {
      const $ = cheerio.load(data),
        result = {};
      let limk = $("#venkonten > div > div.venser > div > div > ul > li:nth-child(1) > h2 > a").attr("href");
      axios.get(limk).then(({
        data
      }) => {
        const $$ = cheerio.load(data);
        result.message = "By Resta", result.img = $$("#venkonten > div.venser > div.fotoanime").find("img").attr("src"),
          $$("#venkonten > div.venser > div.fotoanime > div.infozin > div").each(function(a, b) {
            result.judul = $$(b).find("p:nth-child(1)").text().replace("Judul: ", ""), result.jepang = $$(b).find("p:nth-child(2)").text().replace("Japanese: ", ""),
              result.rate = $$(b).find("p:nth-child(3)").text().replace("Skor: ", ""), result.produser = $$(b).find("p:nth-child(4)").text().replace("Produser: ", ""),
              result.tipe = $$(b).find("p:nth-child(5)").text().replace("Tipe: ", ""), result.status = $$(b).find("p:nth-child(6)").text().replace("Status: ", ""),
              result.episode = $$(b).find("p:nth-child(7)").text().replace("Total Episode: ", ""),
              result.durasi = $$(b).find("p:nth-child(8)").text().replace("Durasi: ", ""), result.rilis = $$(b).find("p:nth-child(9)").text().replace("Tanggal Rilis: ", ""),
              result.studio = $$(b).find("p:nth-child(10)").text().replace("Studio: ", ""), result.genre = $$(b).find("p:nth-child(11)").text().replace("Genre: ", ""),
              result.desc = $$("#venkonten > div.venser > div.fotoanime > div.sinopc").text().replace(".", "\n") + $$(b).find("div.sinopc > p:nth-child(2)").text(),
              result.batch = $$("#venkonten > div.venser > div:nth-child(10) > ul > li > span:nth-child(1) > a").attr("href");
          });
        const lim = $$("#venkonten > div.venser > div:nth-child(10) > ul > li > span:nth-child(1) > a").attr("href");
        axios.get(lim).then(({
          data
        }) => {
          const $$$ = cheerio.load(data);
          result.batchSD = $$$("#venkonten > div:nth-child(6) > ul > li:nth-child(1) > a:nth-child(3)").attr("href"),
            result.batchHD = $$$("#venkonten > div:nth-child(6) > ul > li:nth-child(3) > a:nth-child(3)").attr("href"),
            resolve(result);
        });
      });
    }).catch(reject);
  });
}

function covid() {
  return new Promise(async (resolve, reject) => {
    axios.get("https://covid19.go.id/").then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("#case > div > div > div > div > div:nth-child(2)").each(function(a, b) {
        const pindo = $(b).find("div:nth-child(3) > strong").text(),
          mindo = $(b).find("div:nth-child(5) > strong").text(),
          sindo = $(b).find("div:nth-child(4) > strong").text(),
          upindo = $(b).find("div.pt-4.text-color-black.text-1").text().trim();
        $("#case > div > div > div > div > div:nth-child(1)").each(function(c, d) {
          const neg = $(d).find("div:nth-child(3) > strong").text(),
            pglo = $(d).find("div:nth-child(4) > strong").text(),
            nglo = $(d).find("div:nth-child(5) > strong").text(),
            up = $(d).find("div.pt-4.text-color-grey.text-1").text().trim(),
            result = {
              message: "By Resta",
              indo: {
                positif_indo: pindo,
                meninggal_indo: mindo,
                sembuh_indo: sindo,
                update_indo: upindo.split(":")[1]
              },
              global: {
                negara: neg,
                positif: pglo,
                meninggal: nglo,
                update: up.split(":")[1].split("\n")[0]
              }
            };
          hasil.push(result);
        });
      }), resolve(hasil);
    }).catch(reject);
  });
}

function igstalk(Username) {
  return new Promise((resolve, reject) => {
    axios.get("https://dumpor.com/v/" + Username, {
      headers: {
        cookie: "_inst_key=SFMyNTY.g3QAAAABbQAAAAtfY3NyZl90b2tlbm0AAAAYWGhnNS1uWVNLUU81V1lzQ01MTVY2R0h1.fI2xB2dYYxmWqn7kyCKIn1baWw3b-f7QvGDfDK2WXr8",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
      }
    }).then(res => {
      const $ = cheerio.load(res.data),
        result = {
          profile: $("#user-page > div.user > div.row > div > div.user__img").attr("style").replace(/(background-image: url\(\'|\'\);)/gi, ""),
          fullname: $("#user-page > div.user > div > div.col-md-4.col-8.my-3 > div > a > h1").text(),
          username: $("#user-page > div.user > div > div.col-md-4.col-8.my-3 > div > h4").text(),
          post: $("#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(1)").text().replace(" Posts", ""),
          followers: $("#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(2)").text().replace(" Followers", ""),
          following: $("#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(3)").text().replace(" Following", ""),
          bio: $("#user-page > div.user > div > div.col-md-5.my-3 > div").text()
        };
      resolve(result);
    });
  });
}

function joox(query) {
  return new Promise((resolve, reject) => {
    const time = Math.floor(new Date() / 1e3);
    axios.get("http://api.joox.com/web-fcgi-bin//web_search?lang=id&country=id&type=0&search_input=" + query + "&pn=1&sin=0&ein=29&_=" + time).then(({
      data
    }) => {
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
            creator: "Arietube",
            status: !0,
            data: hasil
          }));
        }).catch(reject));
      }
    }).catch(reject);
  });
}

function ongoing() {
  return new Promise((reject, resolve) => {
    axios.get("https://otakudesu.link/ongoing//").then(({
      data
    }) => {
      const $ = cheerio.load(data),
        result = [],
        img = [],
        epz = [],
        ne = [],
        th = [],
        ep = [],
        nm = [];
      $("div.detpost").each(function(a, b) {
        img.push($(b).find("img").attr("src")), nm.push($(b).find("h2").text()), th.push($(b).find("a").attr("href"));
      }), $("div.epztipe").each(function(d, c) {
        epz.push($(c).text());
      }), $("div.newnime").each(function(f, g) {
        ne.push($(g).text());
      }), $("div.epz").each(function(m, n) {
        ep.push($(n).text());
      });
      for (let i = 0; i < img.length; i++) result.push({
        nama: nm[i],
        image: img[i],
        episode: ep[i],
        setiap: epz[i],
        rilis: ne[i],
        link: th[i]
      });
      resolve(result);
    }).catch(reject);
  });
}

function komiku(judul) {
  return new Promise(async (resolve, reject) => {
    axios.get("https://data.komiku.id/cari/?post_type=manga&s=" + encodeURIComponent(judul)).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        img = [],
        or = [],
        ind = [],
        up = [],
        des = [],
        li = [],
        ch = [],
        ch1 = [];
      $("div.daftar").each(function(a, b) {
        img.push($(b).find("img").attr("data-src")), $("div.kan").each(function(c, d) {
          or.push($(d).find("h3").text().trim()), ind.push($(d).find("span.judul2").text()),
            li.push("https://komiku.id" + $(d).find("a").attr("href")), up.push($(d).find("p").text().trim().split(". ")[0]),
            des.push($(d).find("p").text().trim().split(". ")[1]), ch1.push($(d).find("div:nth-child(5) > a").attr("title")),
            $("div.new1").each(function(e, f) {
              ch.push($(f).find("a").attr("title"));
            });
        });
      });
      for (let i = 0; i < img.length; i++) resolve({
        image: img[i],
        title: or[i],
        indo: ind[i],
        update: up[i],
        desc: des[i],
        chapter_awal: ch[i],
        chapter_akhir: ch1[i],
        link: li[i]
      });
    }).catch(reject);
  });
}

function tebakgambar() {
  return new Promise(async (resolve, reject) => {
    axios.get("https://jawabantebakgambar.net/all-answers/").then(({
      data
    }) => {
      const $ = cheerio.load(data),
        result = [];
      let random = Math.floor(2836 * Math.random()) + 2;
      $(`#images > li:nth-child(${random}) > a`).each(function(a, b) {
        const img = "https://jawabantebakgambar.net" + $(b).find("img").attr("data-src"),
          jwb = $(b).find("img").attr("alt");
        result.push({
          message: "By Resta",
          image: img,
          jawaban: jwb.replace("Jawaban ", "")
        }), resolve(result);
      });
    }).catch(reject);
  });
}

function surah(no) {
  return new Promise(async (resolve, reject) => {
    axios.get("https://kalam.sindonews.com/surah/" + no).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        result = [],
        ar = [],
        id = [],
        lt = [];
      $("div.breadcrumb-new > ul > li:nth-child(5)").each(function(c, d) {
        result.audio = $(d).find("a").attr("href").replace("surah", "audioframe");
      }), $("div.ayat-arab").each(function(a, b) {
        ar.push($(b).text());
      }), $("li > div.ayat-text").each(function(e, f) {
        id.push($(f).text().replace(",", "").trim());
      }), $("div.ayat-latin").each(function(g, h) {
        lt.push($(h).text().trim());
      });
      for (let i = 0; i < ar.length; i++) result.push({
        arab: ar[i],
        indo: id[i],
        latin: lt[i]
      });
      resolve(result);
    }).catch(reject);
  });
}

function sholat(NO) {
  return new Promise(async (resolve, reject) => {
    axios.get("https://kalam.sindonews.com/jadwalsholat/" + NOMOR).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        result = {};
      $("div.imsakiyah-content").each(function(a, b) {
        result.Tanggal = $(b).find("tr:nth-child(1) > td:nth-child(1)").text(), result.imsak = $(b).find("tr:nth-child(1) > td:nth-child(2)").text(),
          result.subuh = $(b).find("tr:nth-child(1) > td:nth-child(3)").text(), result.zuhur = $(b).find("tr:nth-child(1) > td:nth-child(4)").text(),
          result.ashar = $(b).find("tr:nth-child(1) > td:nth-child(5)").text(), result.maghrib = $(b).find("tr:nth-child(1) > td:nth-child(6)").text(),
          result.isya = $(b).find("tr:nth-child(1) > td:nth-child(7)").text();
      }), resolve(result);
    }).catch(reject);
  });
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

function chara(query) {
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

function wattpad(judul) {
  return new Promise((resolve, reject) => {
    axios.get("https://www.wattpad.com/search/" + judul).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        result = [],
        jdl = [],
        img = [],
        des = [],
        lnk = [],
        red = [],
        vt = [];
      $("div.cover.cover-xs.pull-left").each(function(a, b) {
        img.push($(b).find("img").attr("src"));
      }), $("div.content > h5").each(function(a, b) {
        jdl.push($(b).text().trim());
      }), $("div.content > p").each(function(a, b) {
        des.push($(b).text().trim());
      }), $("#results-stories > div > ul > li").each(function(a, b) {
        lnk.push("https://www.wattpad.com/" + $(b).find("a.on-result").attr("data-id"));
      }), $("div.content > div > small.reads").each(function(a, b) {
        red.push($(b).text());
      }), $("div.content > div > small.votes").each(function(a, b) {
        vt.push($(b).text());
      });
      for (let i = 0; i < lnk.length; i++) result.push({
        judul: jdl[i],
        desc: des[i],
        vote: vt[i],
        reads: red[i],
        image: img[i],
        link: lnk[i]
      }), resolve(result);
    }).catch({
      message: "err"
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

function twitter(link) {
  return new Promise((resolve, reject) => {
    let config = {
      URL: link
    };
    axios.post("https://twdown.net/download.php", qs.stringify(config), {
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        cookie: "_ga=GA1.2.1388798541.1625064838; _gid=GA1.2.1351476739.1625064838; __gads=ID=7a60905ab10b2596-229566750eca0064:T=1625064837:RT=1625064837:S=ALNI_Mbg3GGC2b3oBVCUJt9UImup-j20Iw; _gat=1"
      }
    }).then(({
      data
    }) => {
      const $ = cheerio.load(data);
      resolve({
        desc: $("div:nth-child(1) > div:nth-child(2) > p").text().trim(),
        thumb: $("div:nth-child(1) > img").attr("src"),
        HD: $("tbody > tr:nth-child(1) > td:nth-child(4) > a").attr("href"),
        SD: $("tr:nth-child(2) > td:nth-child(4) > a").attr("href"),
        audio: "https://twdown.net/" + $("tr:nth-child(4) > td:nth-child(4) > a").attr("href")
      });
    }).catch(reject);
  });
}
async function tiktok(url) {
  return new Promise(async (resolve, reject) => {
    const msc = await axios({
        url: "https://musicaldown.com/id",
        method: "GET",
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
        }
      }),
      a = cheerio.load(msc.data);
    let FORM = {
      [`${a("#link_url").attr("name")}`]: url,
      [`${a("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("name")}`]: a("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("value"),
      verify: a("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(3)").attr("value")
    };
    const getPost = await axios({
        url: "https://musicaldown.com/id/download",
        method: "POST",
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
          cookie: msc.headers["set-cookie"].join("")
        },
        data: new URLSearchParams(Object.entries(FORM))
      }),
      postmp3 = await axios({
        url: "https://musicaldown.com/id/mp3",
        method: "POST",
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
          cookie: msc.headers["set-cookie"].join("")
        },
        data: new URLSearchParams(Object.entries(getPost))
      }),
      w = cheerio.load(getPost.data),
      x = cheerio.load(postmp3.data);
    return resolve({
      nowm: w("body > div.welcome.section > div").find("div.col.s12.l8 > a").eq(2).attr("href"),
      audio: x("a.btn.waves-effect.waves-light.orange").eq(2).attr("href")
    });
  });
}

function tiktokdl(URL) {
  return new Promise(async (resolve, rejecet) => {
    let {
      data
    } = await axios.request({
      url: "https://lovetik.com/api/ajax/search",
      method: "POST",
      data: new URLSearchParams(Object.entries({
        query: URL
      }))
    });
    resolve(data);
  });
}

function gore() {
  return new Promise((resolve, reject) => {
    const page = Math.floor(228 * Math.random());
    axios.get("https://seegore.com/gore/page/" + page).then(res => {
      const $ = cheerio.load(res.data),
        link = [];
      $("ul > li > article").each(function(a, b) {
        link.push({
          title: $(b).find("div.content > header > h2").text(),
          link: $(b).find("div.post-thumbnail > a").attr("href"),
          thumb: $(b).find("div.post-thumbnail > a > div > img").attr("src"),
          view: $(b).find("div.post-thumbnail > div.post-meta.bb-post-meta.post-meta-bg > span.post-meta-item.post-views").text(),
          vote: $(b).find("div.post-thumbnail > div.post-meta.bb-post-meta.post-meta-bg > span.post-meta-item.post-votes").text(),
          tag: $(b).find("div.content > header > div > div.bb-cat-links").text(),
          comment: $(b).find("div.content > header > div > div.post-meta.bb-post-meta > a").text()
        });
      });
      const random = link[Math.floor(Math.random() * link.length)];
      axios.get(random.link).then(resu => {
        const $$ = cheerio.load(resu.data),
          hasel = {};
        hasel.title = random.title, hasel.source = random.link, hasel.thumb = random.thumb,
          hasel.tag = $$("div.site-main > div > header > div > div > p").text(), hasel.upload = $$("div.site-main").find("span.auth-posted-on > time:nth-child(2)").text(),
          hasel.author = $$("div.site-main").find("span.auth-name.mf-hide > a").text(), hasel.comment = random.comment,
          hasel.vote = random.vote, hasel.view = $$("div.site-main").find("span.post-meta-item.post-views.s-post-views.size-lg > span.count").text(),
          hasel.video1 = $$("div.site-main").find("video > source").attr("src"), hasel.video2 = $$("div.site-main").find("video > a").attr("href"),
          resolve(hasel);
      });
    });
  });
}

function youtube(link) {
  return new Promise((resolve, reject) => {
    const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/;
    if (ytIdRegex.test(link)) {
      let url = ytIdRegex.exec(link),
        config = {
          url: "https://www.youtube.be/" + url,
          q_auto: 0,
          ajax: 1
        },
        headerss = {
          "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Cookie: 'PHPSESSID=6jo2ggb63g5mjvgj45f612ogt7; _ga=GA1.2.405896420.1625200423; _gid=GA1.2.2135261581.1625200423; _PN_SBSCRBR_FALLBACK_DENIED=1625200785624; MarketGidStorage={"0":{},"C702514":{"page":5,"time":1625200846733}}'
        };
      axios("https://www.y2mate.com/mates/en68/analyze/ajax", {
        method: "POST",
        data: new URLSearchParams(Object.entries(config)),
        headers: headerss
      }).then(({
        data
      }) => {
        const $ = cheerio.load(data.result);
        let img = $("div.thumbnail.cover > a > img").attr("src"),
          title = $("div.thumbnail.cover > div > b").text(),
          size = $("#mp4 > table > tbody > tr:nth-child(3) > td:nth-child(2)").text(),
          size_mp3 = $("#audio > table > tbody > tr:nth-child(1) > td:nth-child(2)").text(),
          id = /var k__id = "(.*?)"/.exec(data.result)[1],
          configs = {
            type: "youtube",
            _id: id,
            v_id: url[1],
            ajax: "1",
            token: "",
            ftype: "mp4",
            fquality: 480
          };
        axios("https://www.y2mate.com/mates/en68/convert", {
          method: "POST",
          data: new URLSearchParams(Object.entries(configs)),
          headers: headerss
        }).then(({
          data
        }) => {
          let link = cheerio.load(data.result)("div > a").attr("href"),
            configss = {
              type: "youtube",
              _id: id,
              v_id: url[1],
              ajax: "1",
              token: "",
              ftype: "mp3",
              fquality: 128
            };
          axios("https://www.y2mate.com/mates/en68/convert", {
            method: "POST",
            data: new URLSearchParams(Object.entries(configss)),
            headers: headerss
          }).then(({
            data
          }) => {
            let audio = cheerio.load(data.result)("div > a").attr("href");
            resolve({
              id: url[1],
              title: title,
              size: size,
              quality: "480p",
              thumb: img,
              link: link,
              size_mp3: size_mp3,
              mp3: audio
            });
          });
        });
      }).catch(reject);
    } else reject("link invalid");
  });
}
async function decodeSnap(...args) {
  function _0xe78c(d, e, f) {
    for (var g = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/".split(""), h = g.slice(0, e), i = g.slice(0, f), j = d.split("").reverse().reduce(function(a, b, c) {
        if (-1 !== h.indexOf(b)) return a + h.indexOf(b) * Math.pow(e, c);
      }, 0), k = ""; j > 0;) k = i[j % f] + k, j = (j - j % f) / f;
    return k || "0";
  }
  return function(h, u, n, t, e, r) {
    r = "";
    for (var i = 0, len = h.length; i < len; i++) {
      for (var s = ""; h[i] !== n[e];) s += h[i], i++;
      for (var j = 0; j < n.length; j++) s = s.replace(new RegExp(n[j], "g"), j.toString());
      r += String.fromCharCode(_0xe78c(s, e, 10) - t);
    }
    return decodeURIComponent(encodeURIComponent(r));
  }(...args);
}
async function instadown(url) {
  return new Promise(async (resolve, reject) => {
    try {
      var a = await axios.request("https://snapinsta.app/action2.php?lang=id", {
          method: "POST",
          headers: {
            "user-agent": "Mozilla/5.0 (Linux; Android 11; V2038; Flow) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/359.0.0.288 Mobile Safari/537.36",
            origin: "https://snapinsta.app",
            referer: "https://snapinsta.app/",
            Host: "snapinsta.app",
            "content-type": "application/x-www-form-urlencoded",
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
          },
          data: new URLSearchParams({
            url: url,
            action: "post"
          })
        }),
        decodeParams = a.data.split("))<\/script>")[0].split("decodeURIComponent(escape(r))}(")[1]?.split(",").map(v => v.replace(/^"/, "").replace(/"$/, "").trim());
      if (!Array.isArray(decodeParams) || 6 !== decodeParams.length) return reject({
        status: !1,
        message: `failed to parse decode params!\n${a.data}`
      });
      var decode = await decodeSnap(...decodeParams),
        result = decode?.split('("download").innerHTML = "')?.[1].split("; document.getElementById")[0]?.replaceAll("\\", "");
      log(result);
      const $ = cheerio.load(result),
        results = [];
      return $(".download-content").each(function() {
        let thumbnail = $(this).find(".media-box > img[src]").attr("src");
        /https?:\/\//i.test(thumbnail) || (thumbnail = "https://snapinsta.app" + thumbnail);
        let url = $(this).find(".download-bottom > a[href]").attr("href");
        /https?:\/\//i.test(url || "") || (url = encodeURI("https://snapinsta.app" + url)),
          url && results.push({
            thumbnail: thumbnail,
            url: url
          });
      }), resolve({
        status: !0,
        data: results
      });
    } catch (e) {
      return console.log(e), e.response ? resolve({
        status: !1,
        message: e.response.statusText
      }) : resolve({
        status: !1,
        message: e
      });
    }
  });
}

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
        creator: "@neoxr - Wildan Izzudin & @ariffb.id - Ariffb",
        status: !1
      });
      resolve({
        creator: "@neoxr - Wildan Izzudin & @ariffb.id - Ariffb",
        status: !0,
        data: data
      });
    }).catch(reject);
  });
}
async function ffstalk(userId) {
  let data = {
    "voucherPricePoint.id": 8050,
    "voucherPricePoint.price": "",
    "voucherPricePoint.variablePrice": "",
    email: "",
    n: "",
    userVariablePrice: "",
    "order.data.profile": "",
    "user.userId": userId,
    voucherTypeName: "FREEFIRE",
    affiliateTrackingId: "",
    impactClickId: "",
    checkoutId: "",
    tmwAccessToken: "",
    shopLang: "in_ID"
  };
  return {
    id: userId,
    nickname: (await axios({
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      method: "POST",
      url: "https://order.codashop.com/id/initPayment.action",
      data: data
    })).data.confirmationFields.roles[0].role
  };
}
async function cerpen(category) {
  return new Promise(async (resolve, reject) => {
    let judul = category.toLowerCase().replace(/[()*]/g, "").replace(/\s/g, "-"),
      page = Math.floor(5 * Math.random());
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
export {
  cerpen,
  quotes,
  otakudesu,
  covid,
  ongoing,
  komiku,
  tebakgambar,
  surah,
  sholat,
  lirik,
  ffstalk,
  chara,
  instadown,
  gore,
  spotify,
  hentaivid,
  wattpad,
  playstore,
  linkwa,
  tiktokdl,
  joox,
  igstalk,
  twitter,
  ephoto,
  youtube,
  tiktok
};