import axios from "axios";
import cheerio from "cheerio";
import fetch from "node-fetch";
import qs from "qs";

function convertAngka(number) {
  const data = String(number).split("").reverse();
  let combine = "";
  for (let i = 0; i < data.length; i++)(i + 1) % 3 == 0 && i != data.length - 1 && (data[i] = `.${data[i]}`);
  return combine = `${data.reverse().join("")}`, combine;
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
            mp3: res.mp3Url
          }), Promise.all(promoses).then(() => resolve({
            creator: "WH MODS DEV",
            status: !0,
            data: hasil
          }));
        }).catch(reject));
      }
    }).catch(reject);
  });
}
async function facebook(url) {
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
async function zippydl(urls) {
  return new Promise((resolve, reject) => {
    axios.get(urls).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        li = $.html(),
        po = $("#dlbutton").next().html(),
        le = po.split(";")[0],
        lo = le.split("document.getElementById('dlbutton').href =")[1],
        result = `${urls.split("/v")[0]}${eval(lo)}`,
        ho = $("#lrbox").text().replace(/\n/g, ""),
        ext = ho.split("Name:")[1].split("Size:")[0]?.split(".")[1],
        hasil = {
          title: ho.split("Name:")[1].split("Size:")[0]?.trim(),
          extension: ext,
          filesize: ho.split("Size:")[1].split("Uploaded:")[0]?.trim(),
          upload: ho.split("Uploaded:")[1].split("          ")[0]?.trim(),
          link: result
        };
      resolve(hasil);
    });
  });
}
async function trustpositif(url) {
  if (!url) return !1;
  url = Array.isArray(url) ? encodeURIComponent(url.join("\n")) : url;
  let {
    data
  } = await axios({
    url: "https://trustpositif.kominfo.go.id/Rest_server/getrecordsname_home",
    method: "POST",
    data: {
      name: url
    }
  }), result = {};
  for (let i of data.values) result[i.Domain] = "Ada" === i.Status;
  return result;
}
export {
  facebook,
  zippydl,
  trustpositif,
  joox
};