import axios from "axios";
import cheerio from "cheerio";
import request from "request";
import {
  JSDOM
} from "jsdom";
import fetch from "node-fetch";

function aiovideodl(link) {
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
let baseUrl = "https://snapsave.app";
const snapsave = async url => {
  const {
    data
  } = await axios.post(baseUrl + "/action.php", "url=" + encodeURIComponent(url), {
    header: {
      referer: baseUrl
    }
  }), encodeDom = data.split(/<script type=".+?">(.*?)<\/script>/)[1], doms = encodeDom.split("}(")[1].replace(/"/g, "").split(")")[0]?.split(","), decoded = decode(...doms).split("</style>")[1].split('";')[0];
  let list = [...new JSDOM(decoded).window.document.querySelectorAll("table > tbody > tr")].filter(x => x.querySelector("td > a"));
  return {
    url: list[0]?.querySelector("td > a").href.replace(/\\|"/g, "")
  };
};

function accesToken(d, e, f) {
  const alfabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/".split(""),
    h = alfabet.slice(0, e),
    i = alfabet.slice(0, f);
  let j = d.split("").reverse().reduce(function(a, b, c) {
      if (-1 !== h.indexOf(b)) return a + h.indexOf(b) * Math.pow(e, c);
    }, 0),
    k = "";
  for (; j > 0;) k = i[j % f] + k, j = (j - j % f) / f;
  return k || "0";
}

function decode(h, u, n, t, e, r) {
  r = "";
  for (let i = 0, len = h.length; i < len; i++) {
    let s = "";
    for (; h[i] !== n[e];) s += h[i], i++;
    for (let j = 0; j < n.length; j++) s = s.replace(new RegExp(n[j], "g"), j.toString());
    r += String.fromCharCode(x(s, e, 10) - t);
  }
  return decodeURIComponent(encodeURIComponent(r));
}
async function tikmateApp(url) {
  const {
    data
  } = await axios.post("https://api.tikmate.app/api/lookup", "url=" + encodeURIComponent(url), {
    headers: {
      referer: "https://tikmate.app"
    }
  });
  return {
    ...data,
    videoUrl: `https://tikmate.app/download/${data.token}/${data.id}.mp4`,
    videoUrlHd: `https://tikmate.app/download/${data.token}/${data.id}.mp4?hd=1`
  };
}

function post(url, formdata) {
  return fetch(url, {
    method: "POST",
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: new URLSearchParams(Object.entries(formdata))
  });
}
const ytIdRegex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/;
async function yt(url, quality, type, bitrate, server = "en68") {
  let ytId = ytIdRegex.exec(url);
  url = "https://youtu.be/" + ytId[1];
  let list, res = await post(`https://www.y2mate.com/mates/${server}/analyze/ajax`, {
      url: url,
      q_auto: 0,
      ajax: 1
    }),
    json = await res.json(),
    {
      document
    } = new JSDOM(json.result).window,
    table = document.querySelectorAll("table")[{
      mp4: 0,
      mp3: 1
    } [type] || 0];
  switch (type) {
    case "mp4":
      list = Object.fromEntries([...table.querySelectorAll('td > a[href="#"]')].filter(v => !/\.3gp/.test(v.innerHTML)).map(v => [v.innerHTML.match(/.*?(?=\()/)[0]?.trim(), v.parentElement.nextSibling.nextSibling.innerHTML]));
      break;
    case "mp3":
      list = {
        "128kbps": table.querySelector('td > a[href="#"]').parentElement.nextSibling.nextSibling.innerHTML
      };
      break;
    default:
      list = {};
  }
  let filesize = list[quality],
    id = /var k__id = "(.*?)"/.exec(document.body.innerHTML) || ["", ""],
    thumb = document.querySelector("img").src,
    title = document.querySelector("b").innerHTML,
    res2 = await post(`https://www.y2mate.com/mates/${server}/convert`, {
      type: "youtube",
      _id: id[1],
      v_id: ytId[1],
      ajax: "1",
      token: "",
      ftype: type,
      fquality: bitrate
    }),
    json2 = await res2.json(),
    KB = parseFloat(filesize) * (1e3 * /MB$/.test(filesize));
  return {
    dl_link: /<a.+?href="(.+?)"/.exec(json2.result)[1].replace(/https/g, "http"),
    thumb: thumb,
    title: title,
    filesizeF: filesize,
    filesize: KB
  };
}
let servers = ["en136", "id4", "en60", "en61", "en68", "en154"];

function yta(url, resol = "128kbps", server = "en154") {
  return yt(url, resol, "mp3", resol.endsWith("kbps") ? resol.replace(/kbps/g, "") : resol, server);
}

function ytv(url, resol = "360p", server = "en136") {
  return yt(url, resol, "mp4", resol.endsWith("p") ? resol.replace(/p/g, "") : resol, server);
}
export default {
  ytv: ytv,
  yta: yta,
  yt: yt,
  ytIdRegex: ytIdRegex,
  snapsave: snapsave,
  tikmateApp: tikmateApp,
  aiovideodl: aiovideodl,
  servers: servers
};