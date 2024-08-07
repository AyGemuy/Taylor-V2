import axios from "axios";
import cheerio from "cheerio";
import qs from "qs";
import formData from "form-data";
import request from "request";
async function twitter(link) {
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
async function joox(query) {
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
            audio: res.mp3Url
          }), Promise.all(promoses).then(() => resolve({
            creator: "Rizky.A",
            status: !0,
            data: hasil
          }));
        }).catch(reject));
      }
    }).catch(reject);
  });
}
async function tiktokmusic(URL) {
  return new Promise(async (resolve, reject) => {
    axios.get(URL, {
      headers: {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
        Cookie: "ttwid=1%7C5UyITGuqEDXVZHtmtbU-7V35lTk8--iB6IjJuxRKPTs%7C1625390616%7C62c0b171e938115d5940a9af40c377000bc616cc7b25dfd76557913951585606; Domain=.tiktok.com; Path=/; Expires=Mon, 04 Jul 2022 09:23:36 GMT; HttpOnlytt_webid_v2=6980999485653632513; path=/; expires=Mon, 04 Jul 2022 09:23:37 GMT; domain=.tiktok.com; samesite=none; secure; httponlytt_webid=6980999485653632513; path=/; expires=Mon, 04 Jul 2022 09:23:37 GMT; domain=.tiktok.com; samesite=none; secure; httponlytt_csrf_token=9u_ml89_dULuOD6oMp_zTH06; path=/; domain=.tiktok.com; samesite=lax; secure; httponly"
      }
    }).then(({
      data
    }) => {
      var $ = cheerio.load(data);
      ttdata = JSON.parse($("script#__NEXT_DATA__").get()[0]?.children[0]?.data), meta = ttdata.props.pageProps.itemInfo.itemStruct,
        resolve({
          meta: meta
        });
    });
  });
}
export {
  twitter,
  joox,
  tiktokmusic
};