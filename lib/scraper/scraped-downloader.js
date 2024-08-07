import axios from "axios";
import cheerio from "cheerio";
import fetch from "node-fetch";
import moment from "moment-timezone";
import mimetype from "mime-types";
import qs from "qs";
async function shortener(t) {
  return html = (await axios("https://caliphdev.net", {
    method: "POST",
    data: new URLSearchParams(Object.entries({
      url: t
    }))
  })).data, $ = cheerio.load(html), $("#app-6 > input").attr("value");
}

function igDown(url_media) {
  return new Promise(async (resolve, reject) => {
    const BASE_URL = "https://instasupersave.com/";
    try {
      const cookie = (await axios(BASE_URL)).headers["set-cookie"],
        session = cookie[0]?.split(";")[0]?.replace("XSRF-TOKEN=", "").replace("%3D", "");
      axios({
        method: "post",
        url: `${BASE_URL}api/convert`,
        headers: {
          origin: "https://instasupersave.com",
          referer: "https://instasupersave.com/pt/",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52",
          "x-xsrf-token": session,
          "Content-Type": "application/json",
          Cookie: `XSRF-TOKEN=${session}; instasupersave_session=${session}`
        },
        data: {
          url: url_media
        }
      }).then(function(response) {
        let ig = [];
        Array.isArray(response.data) ? response.data.forEach(post => {
          ig.push(void 0 === post.sd ? post.thumb : post.sd.url);
        }) : ig.push(response.data.url[0]?.url), resolve({
          results_number: ig.length,
          url_list: ig
        });
      }).catch(function(error) {
        reject(error.message);
      });
    } catch (e) {
      reject(e.message);
    }
  });
}

function pinterestvideodownloader(t) {
  return new Promise(async (e, a) => {
    let i = new URLSearchParams();
    i.append("url", t);
    let o = await (await fetch("https://pinterestvideodownloader.com/", {
      method: "POST",
      body: i
    })).text();
    $ = cheerio.load(o);
    let r = [];
    if ($("table > tbody > tr").each(function(t, e) {
        "" != $($(e).find("td")[0]).text() && r.push({
          url: $($(e).find("td")[0]).find("a").attr("href")
        });
      }), 0 === r.length) return e({
      status: !1
    });
    e({
      status: !0,
      data: r
    });
  });
}
async function mediafires(t) {
  const e = await axios.get(t),
    a = cheerio.load(e.data),
    i = [],
    o = a("a#downloadButton").attr("href"),
    r = a("a#downloadButton").text().replace("Download", "").replace("(", "").replace(")", "").replace("\n", "").replace("\n", "").trim(),
    n = o.split("/")[5];
  return mime = n.split("."), mime = mimetype.lookup(mime[1]), i.push({
    nama: n,
    mime: mime,
    size: r,
    link: o
  }), i[0];
}

function facebook(t) {
  return new Promise(async (e, a) => {
    const i = await fetch("https://www.getfvid.com/downloader", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: "https://www.getfvid.com/"
        },
        body: new URLSearchParams(Object.entries({
          url: t
        }))
      }),
      o = cheerio.load(await i.text());
    e({
      result: {
        url: t,
        title: o("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-5.no-padd > div > h5 > a").text(),
        time: o("#time").text(),
        hd: o("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a").attr("href"),
        sd: o("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(2) > a").attr("href"),
        audio: o("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(3) > a").attr("href")
      }
    });
  });
}

function downloader4twitter(t) {
  return new Promise(async e => {
    try {
      let a = new URLSearchParams();
      a.append("twitter_url", t), a.append("submit", "submit");
      let i = await (await axios.post("https://downloader4twitter.com/", a)).data,
        o = cheerio.load(i),
        r = [];
      return o("div.search-form-output").find("img").each((t, e) => /thumb/.test(o(e).attr("src")) ? "" : r.push({
        type: "jpg",
        url: o(e).attr("src")
      })), o("div.search-form-output").find("a.btn-download").each((t, e) => r.push({
        type: "mp4",
        url: o(e).attr("onclick").match(/("(.*?)")/)[2]
      })), 0 === r.length ? e({
        status: !1
      }) : e({
        status: !0,
        data: r
      });
    } catch (t) {
      return console.log(t), e({
        status: !1
      });
    }
  });
}
async function shortlink(t) {
  return (await require("axios").get("https://tinyurl.com/api-create.php?url=" + encodeURIComponent(t))).data;
}
async function stickerTelegram(t) {
  let e = (await axios.get("https://api.wibusoft.com/api/telestick/getpath?url=" + t, {
    responseType: "json",
    headers: {
      accept: "application/json"
    }
  })).data;
  return "success" != e.status ? {
    status: !1
  } : {
    status: !0,
    name: e.result.name,
    title: e.result.title,
    fileid: e.result.fileid
  };
}
async function stickerTelegramDownload(t) {
  let e = await fetch("https://api.wibusoft.com/api/telestick/getstick?pathid=" + t, {
    headers: {
      accept: "image/webp"
    }
  });
  return await e.arrayBuffer();
}

function spotifyDown(url) {
  return new Promise((resolve, reject) => {
    if (!url) return reject(new Error("url input is required"));
    axios.get("https://spotify-api.caliph.my.id/api/info/track", {
      params: {
        url: url
      }
    }).then(b => resolve(b.data)).catch(reject);
  });
}

function spotifySearch(q) {
  return new Promise((resolve, reject) => {
    if (!q) return reject(new Error("query input is required"));
    axios.get("https://spotify-api.caliph.my.id/api/search/tracks", {
      params: {
        q: q
      }
    }).then(b => resolve(b.data)).catch(reject);
  });
}

function ttdown(url) {
  return new Promise((resolve, reject) => {
    if (!url) return reject(new Error("url input is required"));
    axios.get("https://developers.tiklydown.me/api/download", {
      params: {
        url: url
      }
    }).then(b => resolve(b.data)).catch(reject);
  });
}

function ttdown2(url) {
  return new Promise((resolve, reject) => {
    if (!url) return reject(new Error("url input is required"));
    axios.get("https://developers.tiklydown.me/api/download/v2", {
      params: {
        url: url
      }
    }).then(b => resolve(b.data)).catch(reject);
  });
}

function aio(t) {
  return new Promise(async (e, a) => {
    try {
      let a = {
          headers: {
            Referer: "https://snapsave.app/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
          }
        },
        i = new URLSearchParams();
      i.append("url", t);
      let o = await fetch("https://snapsave.app/action.php", {
        method: "POST",
        body: i,
        ...a
      });
      if (!o.ok) return e({
        status: !1
      });
      e(await o.json());
    } catch (t) {
      return console.log(t), e({
        status: !1
      });
    }
  });
}
async function xnxxSearch(t) {
  return new Promise((n, e) => {
    const r = "https://www.xnxx.com";
    fetch(`${r}/search/${t}/${Math.floor(3 * Math.random()) + 1}`, {
      method: "get"
    }).then(t => t.text()).then(t => {
      let e = cheerio.load(t, {
          xmlMode: !1
        }),
        o = [],
        a = [],
        i = [],
        s = [];
      e("div.mozaique").each(function(t, n) {
        e(n).find("div.thumb").each(function(t, n) {
          a.push(r + e(n).find("a").attr("href").replace("/THUMBNUM/", "/"));
        });
      }), e("div.mozaique").each(function(t, n) {
        e(n).find("div.thumb-under").each(function(t, n) {
          i.push(e(n).find("p.metadata").text()), e(n).find("a").each(function(t, n) {
            o.push(e(n).attr("title"));
          });
        });
      });
      for (let t = 0; t < o.length; t++) s.push({
        title: o[t],
        info: i[t],
        link: a[t]
      });
      n({
        status: !0,
        result: s
      });
    }).catch(t => e({
      status: !1,
      result: t
    }));
  });
}

function xnxxDownloader(t) {
  return new Promise((n, e) => {
    fetch(`${t}`, {
      method: "get"
    }).then(t => t.text()).then(e => {
      let r = cheerio.load(e, {
        xmlMode: !1
      });
      const o = r('meta[property="og:title"]').attr("content"),
        a = r('meta[property="og:duration"]').attr("content"),
        i = r('meta[property="og:image"]').attr("content"),
        s = r('meta[property="og:video:type"]').attr("content"),
        c = r('meta[property="og:video:width"]').attr("content"),
        u = r('meta[property="og:video:height"]').attr("content"),
        f = r("span.metadata").text().trim(),
        l = r("#video-player-bg > script:nth-child(6)").html(),
        m = {
          low: (l.match("html5player.setVideoUrlLow\\('(.*?)'\\);") || [])[1],
          high: l.match("html5player.setVideoUrlHigh\\('(.*?)'\\);")[1],
          HLS: l.match("html5player.setVideoHLS\\('(.*?)'\\);")[1],
          thumb: l.match("html5player.setThumbUrl\\('(.*?)'\\);")[1],
          thumb69: l.match("html5player.setThumbUrl169\\('(.*?)'\\);")[1],
          thumbSlide: l.match("html5player.setThumbSlide\\('(.*?)'\\);")[1],
          thumbSlideBig: l.match("html5player.setThumbSlideBig\\('(.*?)'\\);")[1]
        };
      n({
        status: !0,
        title: o,
        URL: t,
        duration: a,
        image: i,
        videoType: s,
        videoWidth: c,
        videoHeight: u,
        info: f,
        files: m
      });
    }).catch(t => e({
      status: !1,
      result: t
    }));
  });
}
export {
  igDown,
  pinterestvideodownloader,
  mediafires,
  facebook,
  downloader4twitter,
  stickerTelegram,
  stickerTelegramDownload,
  aio,
  spotifyDown,
  spotifySearch,
  ttdown,
  ttdown2,
  xnxxSearch,
  xnxxDownloader
};