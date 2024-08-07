import axios from "axios";
import cheerio from "cheerio";
const UserAgent = () => (ossss = ["Macintosh; Intel Mac OS X 10_15_7", "Macintosh; Intel Mac OS X 10_15_5", "Macintosh; Intel Mac OS X 10_11_6", "Macintosh; Intel Mac OS X 10_11_5", "Windows NT 10.0; Win64; x64", "Windows NT 10.0"], `Mozilla/5.0 (${ossss[Math.floor(Math.random() * ossss.length)]}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${Math.floor(3 * Math.random()) + 87}.0.${Math.floor(190 * Math.random()) + 4100}.${Math.floor(50 * Math.random()) + 140} Safari/537.36`);
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
async function tiktok2(Url) {
  return new Promise(async (resolve, reject) => {
    await axios.request({
      url: "https://ttdownloader.com/",
      method: "GET",
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9,id;q=0.8",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
        cookie: "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934"
      }
    }).then(respon => {
      const token = cheerio.load(respon.data)("#token").attr("value");
      axios({
        url: "https://ttdownloader.com/req/",
        method: "POST",
        data: new URLSearchParams(Object.entries({
          url: Url,
          format: "",
          token: token
        })),
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
          cookie: "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934"
        }
      }).then(res => {
        const ch = cheerio.load(res.data),
          result = {
            status: res.status,
            result: {
              nowatermark: ch("#results-list > div:nth-child(2)").find("div.download > a").attr("href"),
              watermark: ch("#results-list > div:nth-child(3)").find("div.download > a").attr("href"),
              audio: ch("#results-list > div:nth-child(4)").find(" div.download > a").attr("href")
            }
          };
        resolve(result);
      }).catch(reject);
    }).catch(reject);
  });
}
async function musicaldown(Url) {
  return new Promise((resolve, rejecet) => {
    axios.get("https://musicaldown.com/id", {
      headers: {
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
      }
    }).then(res => {
      const $ = cheerio.load(res.data),
        url_name = $("#link_url").attr("name"),
        token_name = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("name"),
        token_ = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("value"),
        verify = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(3)").attr("value");
      let data = {
        [`${url_name}`]: URL,
        [`${token_name}`]: token_,
        verify: verify
      };
      axios.request({
        url: "https://musicaldown.com/id/download",
        method: "post",
        data: new URLSearchParams(Object.entries(data)),
        headers: {
          "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
          cookie: res.headers["set-cookie"]
        }
      }).then(respon => {
        const ch = cheerio.load(respon.data);
        axios.request({
          url: "https://musicaldown.com/id/mp3",
          method: "post",
          headers: {
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
            cookie: res.headers["set-cookie"]
          }
        }).then(resaudio => {
          const hc = cheerio.load(resaudio.data),
            result = {
              creator: "Arya-kun >///<",
              video: ch("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)").attr("href"),
              audio: hc("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)").attr("href"),
              video_original: ch("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)").attr("href"),
              audio_original: hc("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)").attr("href"),
              preview: ch("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4 > img").attr("src")
            };
          resolve(result);
        });
      });
    });
  });
}
async function aiovideodl(Url) {
  return new Promise((resolve, reject) => {
    axios({
      url: "https://aiovideodl.ml/",
      method: "GET",
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        cookie: "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653"
      }
    }).then(src => {
      let token = cheerio.load(src.data)("#token").attr("value");
      axios({
        url: "https://aiovideodl.ml/wp-json/aio-dl/video-data/",
        method: "POST",
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          cookie: "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653"
        },
        data: new URLSearchParams(Object.entries({
          url: link,
          token: token
        }))
      }).then(({
        data
      }) => {
        resolve(data);
      });
    });
  });
}
export {
  tiktokmusic,
  tiktok2,
  musicaldown,
  aiovideodl
};