import axios from "axios";
import cheerio from "cheerio";
async function randomCerpen() {
  try {
    const n = await axios.get("http://cerpenmu.com/"),
      a = cheerio.load(n.data);
    let r = [];
    a("#sidebar > div").each(function(t, e) {
      a(e).find("ul > li").each(function(t, e) {
        let n = a(e).find("a").attr("href");
        r.push(n);
      });
    });
    var t = r[Math.floor(Math.random() * r.length)];
    let o = await axios.get(`${t}`);
    const i = cheerio.load(o.data);
    let c = [];
    i("#content > article > article").each(function(t, e) {
      let n = i(e).find("h2 > a").attr("href");
      c.push(n);
    });
    var e = c[Math.floor(Math.random() * c.length)];
    let s = await axios.get(`${e}`),
      u = cheerio.load(s.data),
      l = u("#content").find("article > h1").text().trim(),
      h = u("#content").find("article > a:nth-child(2)").text().trim(),
      f = [];
    u("#content > article > p").each(function(t, e) {
      let n = u(e).text().trim();
      f.push(n);
    });
    let w = [];
    for (let t of f) w += t;
    return {
      status: !0,
      judul: l,
      penulis: h,
      sumber: e,
      cerita: w
    };
  } catch (t) {
    return {
      status: !1
    };
  }
}
async function ceritahantu() {
  return new Promise((t, e) => {
    axios.get("https://cerita-hantu.com/list-cerita-hantu-a-z/").then(({
      data: e
    }) => {
      const n = cheerio.load(e),
        a = [];
      n("div > div > ul:nth-child(7) > li > a").each(function(t, e) {
        a.push(n(e).attr("href"));
      }), n("div > div > ul:nth-child(9) > li > a").each(function(t, e) {
        null != n(e).attr("href") && a.push(n(e).attr("href"));
      }), n("div > div > ol > li > a").each(function(t, e) {
        null != n(e).attr("href") && a.push(n(e).attr("href"));
      }), axios.get(a[Math.floor(Math.random() * a.length)]).then(({
        data: e
      }) => {
        const n = cheerio.load(e),
          a = [];
        n("div > div > a").each(function(t, e) {
          n(e).attr("href").startsWith("https:") && a.push(n(e).attr("href"));
        }), rand = a[Math.floor(Math.random() * a.length)], axios.get(rand).then(({
          data: e
        }) => {
          const n = cheerio.load(e);
          t({
            judul: n("div > header > div > h1 > a").text(),
            author: n("div > header > div > div > span.simple-grid-entry-meta-single-author > span > a").text(),
            author_link: n("div > header > div > div > span.simple-grid-entry-meta-single-author > span > a").attr("href"),
            upload_date: n("div > header > div > div > span.simple-grid-entry-meta-single-date").text(),
            kategori: n("div > header > div > div > span.simple-grid-entry-meta-single-cats > a").text(),
            source: rand,
            cerita: n("div > div > p").text().split("Cerita Hantu")[1].split("Copyright")[0]
          });
        });
      });
    });
  });
}
export {
  randomCerpen,
  ceritahantu
};