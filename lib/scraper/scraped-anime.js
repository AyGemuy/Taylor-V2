import axios from "axios";
import cheerio from "cheerio";
import request from "request";
let urlKiryuu = "https://kiryuu.id/",
  urlMangatoon = "https://mangatoon.mobi/";
async function scrapKiryuuSearch(t) {
  return new Promise((i, e) => {
    axios.get(`${urlKiryuu}?s=${t}`).then(({
      data: t
    }) => {
      const e = cheerio.load(t);
      let n = [];
      e("div.listupd > div > div > a").get().map(t => {
        n.push(e(t).attr("href"));
      });
      let a = [];
      e("div.listupd > div > div > a > div > img").get().map(t => {
        a.push(e(t).attr("src"));
      });
      let s = [];
      e("div.listupd > div > div > a").get().map(t => {
        s.push(e(t).attr("title"));
      });
      let d = [];
      e("div.listupd > div > div > a > div > span:nth-child(2)").get().map(t => {
        d.push(e(t).attr("class"));
      });
      let r = [];
      e("div.listupd > div > div > a > div > span:nth-child(3)").get().map(t => {
        r.push(e(t).attr("class"));
      });
      let o = [];
      e("div.listupd > div > div > a > div:nth-child(2) > div > div:nth-child(1)").get().map(t => {
        o.push(e(t).text());
      });
      let l = [];
      e("div.listupd > div > div > a > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(2)").get().map(t => {
        l.push(e(t).text());
      });
      let h = [];
      for (let t = 0; t < n.length; t++) h.push({
        name: s[t],
        thumb: a[t],
        type: d[t],
        chapter: o[t],
        rating: l[t],
        url: n[t]
      });
      let c = h.filter(t => null != t.name && null != t.thumb && null != t.type && null != t.chapter && null != t.rating && null != t.url);
      i(c);
    }).catch(e);
  });
}

function scrapKiryuuGet(t) {
  return new Promise((i, e) => {
    axios.get(t).then(({
      data: t
    }) => {
      const e = cheerio.load(t),
        n = e("h1").text(),
        a = e(".seriestualt").text(),
        s = e(".seriestugenre").text().trim(),
        d = e(".thumb > img").attr("src"),
        r = e("table.infotable > tbody > tr:nth-child(1) > td:nth-child(2)").text(),
        o = e("table.infotable > tbody > tr:nth-child(2) > td:nth-child(2)").text().trim(),
        l = e("table.infotable > tbody > tr:nth-child(4) > td:nth-child(2)").text().trim(),
        h = e("table.infotable > tbody > tr:nth-child(7) > td:nth-child(2)").text().trim(),
        c = e("table.infotable > tbody > tr:nth-child(8) > td:nth-child(2)").text().trim();
      let p = [],
        m = [],
        u = [],
        v = [],
        f = [];
      e("div.eplister > ul > li > div > div:nth-child(1) > a > span:nth-child(1)").get().map(t => {
        p.push(e(t).text().trim());
      }), e("div.eplister > ul > li > div > div:nth-child(1) > a").get().map(t => {
        m.push(e(t).attr("href"));
      }), e("div.eplister > ul > li > div > div:nth-child(2) > a").get().map(t => {
        v.push(e(t).attr("href"));
      }), e("div.eplister > ul > li > div > div:nth-child(1) > a > span:nth-child(2)").get().map(t => {
        u.push(e(t).text().trim());
      });
      let g = [];
      for (let t = 0; t < p.length; t++) f.push(g.push({
        name: p[t],
        update: u[t],
        url: m[t],
        download: v[t]
      }));
      Promise.all(f).then(() => {
        i({
          status: !0,
          title: n,
          alter_title: a,
          author: l,
          type: o,
          genre: s.replace(/ /g, ", "),
          progress: r,
          posted_on: h,
          update_on: c,
          thumb: d,
          result: g
        });
      });
    }).catch(e);
  });
}

function scrapMangatoonSearch(t) {
  return new Promise((i, e) => {
    axios.get(`${urlMangatoon}id/search?word=${t}`).then(({
      data: t
    }) => {
      const e = cheerio.load(t);
      let n = [];
      e("div.comics-result > div > div.recommend-comics > div > a").get().map(t => {
        n.push(e(t).attr("href"));
      });
      let a = [];
      e("div.comics-result > div > div.recommend-comics > div > div:nth-child(2) > span").get().map(t => {
        a.push(e(t).text());
      });
      let s = [];
      e("div.comics-result > div > div.recommend-comics > div > a > div > img").get().map(t => {
        s.push(e(t).attr("src"));
      });
      let d = [];
      e("div.comics-result > div > div.recommend-comics > div > div:nth-child(3) > span").get().map(t => {
        d.push(e(t).text().trim());
      });
      let r = [];
      for (let t = 0; t < n.length; t++) r.push({
        title: a[t],
        thumb: s[t],
        genre: d[t],
        url: `https://mangatoon.mobi${n[t]}`
      });
      i(r);
    });
  });
}

function scrapMangatoonGet(t) {
  return new Promise((i, e) => {
    axios.get(t).then(({
      data: t
    }) => {
      const e = cheerio.load(t),
        n = e("div.detail-title-bg > span").text(),
        a = e("div.detail-img > img:nth-child(1)").attr("src"),
        s = e("div.detail-tags-info > span").text(),
        d = e("span.view-count").text(),
        r = e("span.like-count").text(),
        o = e("span.detail-score-points").text(),
        l = e("div.detail-author-name").text().slice(13),
        h = e('div[class="detail-description-short detail-description-all"]').text().trim();
      let c = [];
      e("div.episodes-wrap-new > a").get().map(t => {
        c.push(e(t).attr("href"));
      });
      let p = [];
      e("div.episodes-wrap-new > a > div >div:nth-child(2)").get().map(t => {
        p.push(e(t).text().trim());
      });
      let m = [];
      for (let t = 0; t < c.length; t++) m.push({
        episode: p[t],
        url: `https://mangatoon.mobi${c[t]}`
      });
      i({
        status: !0,
        title: n,
        thumb: a,
        genre: s,
        author: l,
        score: o,
        view_count: d,
        like_count: r,
        desc: h,
        result: m
      });
    }).catch(e);
  });
}

function scrapMangatoonRead(t) {
  return new Promise((i, e) => /mangatoon.mobi/g.test(t) ? /watch/g.test(t) ? void axios.get(t).then(({
    data: t
  }) => {
    const e = cheerio.load(t),
      n = e("div.title-phone").text().trim(),
      a = e("div.episode").text().trim().split("\n")[0].replace(/ /g, ""),
      s = e("div.bottom-bar > a:nth-child(1)").attr("href"),
      d = e("div.bottom-bar > a:nth-child(2)").attr("href");
    let r = [];
    e("div.pictures > div > img").get().map(t => {
      r.push(e(t).attr("src"));
    });
    let o = r.filter(t => "/images/icon/Spin-1s-200px.gif" != t);
    i({
      status: !0,
      title: n,
      episode: a,
      next_page: `https://mangatoon.mobi${d}`,
      before_page: `https://mangatoon.mobi${s}`,
      result: o
    });
  }) : i({
    status: !1,
    message: "url tidak valid! contoh https://mangatoon.mobi/id/watch/2074/6933"
  }) : i({
    status: !1,
    message: "url tidak valid!"
  }));
}

function scrapKusonime(t) {
  return new Promise((i, e) => {
    const n = t;
    axios.get(`https://kusonime.com/?s=${n}&post_type=post`).then(({
      data: t
    }) => {
      const e = cheerio.load(t);
      let n = [];
      e("div.content > h2 > a").get().map(t => {
        n.push(e(t).attr("href"));
      }), axios.get(n[0]).then(({
        data: t
      }) => {
        const e = cheerio.load(t),
          n = e('div[class="post-thumb"] > h1').text(),
          a = e('div[class="post-thumb"] > img').attr("src"),
          s = e("div.info > p:nth-child(1)").text().split(":")[1].trim(),
          d = e("div.info > p:nth-child(2)").text().split(":")[1].trim(),
          r = e("div.info > p:nth-child(3)").text().split(":")[1].trim(),
          o = e("div.info > p:nth-child(4)").text().split(":")[1].trim(),
          l = e("div.info > p:nth-child(5)").text().split(":")[1].trim(),
          h = e("div.info > p:nth-child(6)").text().split(":")[1].trim(),
          c = e("div.info > p:nth-child(7)").text().split(":")[1].trim(),
          p = e("div.info > p:nth-child(8)").text().split(":")[1].trim(),
          m = e("div.info > p:nth-child(9)").text().split(":")[1].trim(),
          u = e("div.info > p:nth-child(10)").text().split(":")[1].trim(),
          v = e("div.kategoz > span").text(),
          f = e("div.lexot > p:nth-child(3)").text();
        let g = [];
        e('div[class="venser"]').find('div[class="lexot"]').children('div[class="dlbod"]').children('div[class="smokeddl"]').first().children('div[class="smokeurl"]').each((t, i) => {
          const n = [],
            a = e(i).children("strong").text();
          e(i).children("a").each((t, i) => {
            const a = e(i).attr("href"),
              s = e(i).text();
            n.push({
              url: a,
              name: s
            });
          }), g.push({
            reso: a,
            list: n
          });
        }), i({
          status: !0,
          title: n,
          title_jp: s,
          view: v,
          thumb: a,
          genre: d,
          season: r,
          producers: o,
          type: l,
          status_anime: h,
          total_episode: c,
          score: p,
          duration: m,
          released: u,
          description: f,
          result: g
        });
      });
    }).catch(e);
  });
}

function animeIdLatest() {
  return new Promise((t, i) => {
    axios.get("https://nontonanimeid.com/").then(({
      data: i
    }) => {
      const e = cheerio.load(i);
      let n = [];
      e(".misha_posts_wrap > article").get().map(t => {
        let i = e(t).find("a").attr("href"),
          a = e(t).find("h3").text(),
          s = e(t).find('span[class="types episodes"]').text(),
          d = e(t).find("img").attr("src");
        n.push({
          name: a,
          thumb: d,
          episode: s,
          url: i
        });
      }), t(n);
    }).catch(i);
  });
}

function animeIdSr(t) {
  return new Promise((i, e) => {
    axios.get(`https://nontonanimeid.com/?s=${t}`).then(async ({
      data: t
    }) => {
      const e = cheerio.load(t);
      let n = [];
      e(".result > ul > li").get().map(t => {
        let i = e(t).find("a").attr("href"),
          a = e(t).find("h2").text(),
          s = e(t).find("img").attr("src"),
          d = e(t).find("p").text(),
          r = e(t).find(".nilaiseries").text(),
          o = e(t).find(".typeseries").text(),
          l = [];
        e(t).find('span[class="genre"]').get().map(t => {
          l.push(e(t).text());
        }), n.push({
          name: a,
          thumb: s,
          stars: r,
          type: o,
          desc: d,
          genre: l.toString(),
          url: i
        });
      }), i(n);
    }).catch(e);
  });
}

function animeIdGet(t) {
  return new Promise((i, e) => {
    axios.get(`${t}`).then(async ({
      data: t
    }) => {
      const e = cheerio.load(t),
        n = e('h1[class="entry-title cs"]').text(),
        a = e(".poster > img").attr("src"),
        s = e('.scoreseries > span[class="nilaiseries"]').text(),
        d = e('span[class="typeseries"]').text(),
        r = [];
      e(".tagline > a").get().map(t => {
        r.push(e(t).text());
      });
      const o = e('.data > .bottomtitle > span[class="infoseries"]:nth-child(1)').text().split(":")[1].trim(),
        l = e(".data > .bottomtitle > span:nth-child(2)").text().split(":")[1].trim(),
        h = e(".data > .bottomtitle > span:nth-child(3)").text().split(":")[1].trim(),
        c = e(".data > .bottomtitle > span:nth-child(4)").text().split(":")[1].trim(),
        p = e(".data > .bottomtitle > span:nth-child(5)").text().split(":")[1].trim(),
        m = [];
      e('ul[class="misha_posts_wrap2"] > li > span > a').get().map(t => {
        m.push({
          episode: e(t).text(),
          url: e(t).attr("href")
        });
      }), i({
        status: !0,
        title: n,
        thumb: a,
        stars: s,
        type: d,
        genre: r.toString(),
        popularity: o,
        members: l,
        duration: h,
        studios: c,
        aired: p,
        result: m
      });
    }).catch(e);
  });
}
async function manga(t) {
  return new Promise((i, e) => {
    axios.get(`https://www.anime-planet.com/manga/all?name=${t}`).then(({
      data: t
    }) => {
      const e = [],
        n = cheerio.load(t);
      n("#siteContainer > ul.cardDeck.cardGrid > li ").each(function(t, i) {
        result = {
          status: !0,
          judul: n(i).find("> a > h3").text(),
          link: "https://www.anime-planet.com" + n(i).find("> a").attr("href"),
          thumbnail: "https://www.anime-planet.com" + n(i).find("> a > div.crop > img").attr("src")
        }, e.push(result);
      }), i(e);
    }).catch(e);
  });
}
async function chara(t) {
  return new Promise((i, e) => {
    axios.get(`https://www.anime-planet.com/characters/all?name=${t}`).then(({
      data: t
    }) => {
      const e = [],
        n = cheerio.load(t);
      n("#siteContainer > table > tbody > tr").each(function(t, i) {
        result = {
          status: !0,
          character: n(i).find("> td.tableCharInfo > a").text(),
          link: "https://www.anime-planet.com" + n(i).find("> td.tableCharInfo > a").attr("href"),
          thumbnail: n(i).find("> td.tableAvatar > a > img").attr("src").startsWith("https://") ? n(i).find("> td.tableAvatar > a > img").attr("src") : "https://www.anime.planet.com" + n(i).find("> td.tableAvatar > a > img").attr("src")
        }, e.push(result);
      }), i(e);
    }).catch(e);
  });
}
async function Otakudesu(t) {
  try {
    const i = await axios.get(`https://otakudesu.vip/?s=${t}&post_type=anime`);
    let e = cheerio.load(i.data)("#venkonten > div > div.venser > div > div > ul > li:nth-child(1) > h2 > a").attr("href");
    const n = await axios.get(e),
      a = cheerio.load(n.data);
    let s = a("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(1) > span").text().trim(),
      d = a("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(2) > span").text().trim(),
      r = a("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(3) > span").text().trim(),
      o = a("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(4) > span").text().trim(),
      l = a("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(5) > span").text().trim(),
      h = a("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(6) > span").text().trim(),
      c = a("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(7) > span").text().trim(),
      p = a("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(8) > span").text().trim(),
      m = a("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(9) > span").text().trim(),
      u = a("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(10) > span").text().trim(),
      v = a("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(11) > span").text().trim(),
      f = a("#venkonten > div.venser > div.fotoanime").find("img").attr("src"),
      g = a("#venkonten > div.venser > div.fotoanime > div.sinopc").find("p").text().trim();
    return {
      status: !0,
      judul: s,
      thumb: f,
      japan: d,
      rating: r,
      produser: o,
      type: l,
      status: h,
      episode: c,
      durasi: p,
      rilis: m,
      studio: u,
      genre: v,
      LinkDown: a("#venkonten").find("div.venser > div:nth-child(8) > ul > li:nth-child(4) > span:nth-child(1) > a").attr("href"),
      sinopsis: g
    };
  } catch (t) {
    return {
      status: !1,
      Pesan: "Internal Server Error"
    };
  }
}
export {
  scrapKiryuuSearch,
  scrapKiryuuGet,
  scrapMangatoonSearch,
  scrapMangatoonGet,
  scrapMangatoonRead,
  scrapKusonime,
  animeIdLatest,
  animeIdSr,
  animeIdGet,
  manga,
  chara,
  Otakudesu
};