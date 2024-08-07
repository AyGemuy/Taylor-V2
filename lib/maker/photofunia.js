import fs from "fs";
import axios from "axios";
import cheerio from "cheerio";
import FormData from "form-data";
import chalk from "chalk";
import {
  fileURLToPath
} from "url";
const base = "https://m.photofunia.com";
async function photofunSearch(teks) {
  try {
    const html = (await axios.get(`${base}/search?q=${teks}`)).data,
      $ = cheerio.load(html);
    return $(".effects-list li").map((index, element) => {
      const title = $(element).find(".name").text().trim(),
        link = $(element).find("a").attr("href"),
        description = $(element).find(".description").text().trim(),
        image = $(element).find("img").attr("src");
      if (title && link && description && image) return {
        judul: title,
        link: base + link,
        desc: description,
        thumb: image
      };
    }).get().filter(effect => void 0 !== effect);
  } catch (error) {
    return console.error(error), [];
  }
}
async function photofunEffect(url) {
  try {
    const emror = {
      error: "Link Tidak Valid"
    };
    if (!url.includes(base)) return emror;
    const res = await axios.get(url),
      $ = cheerio.load(res.data),
      hasil = [],
      inputs = [],
      exam = $("div > div.image-preview > a > img").attr("src"),
      judul = $("div > h2").text();
    $("form > div >  input").each(function(a, b) {
      const input = $(b).attr("name");
      inputs.push({
        input: input
      });
    });
    const desc = $("div.description").text();
    return hasil.push({
      judul: judul,
      desc: desc,
      exam: exam,
      inputs: inputs
    }), hasil;
  } catch (error) {
    return console.error(error), {};
  }
}
async function photofunUse(teks, url) {
  try {
    const emror = {
      error: "Link Tidak Valid"
    };
    if (!url.includes(base)) return emror;
    const form = new FormData();
    form.append("text", teks);
    const post = await fetch(url, {
        method: "POST",
        headers: {
          "User-Agent": "GoogleBot",
          ...form.getHeaders()
        },
        body: form.getBuffer()
      }),
      html = await post.text(),
      $ = cheerio.load(html);
    return $("div.image-container").find("img").attr("src");
  } catch (error) {
    return console.error(error), "";
  }
}
async function getCookies() {
  try {
    const response = await axios.get("https://photofunia.com/images?server=1", {
        headers: {
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; Flow) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/359.0.0.288 Safari/537.36",
          Accept: "application/json, text/javascript, */*; q=0.01",
          Host: "photofunia.com"
        }
      }),
      coki = response.headers["set-cookie"][0]?.split(";")[0];
    return {
      coki: coki
    };
  } catch (e) {
    return handleError(e);
  }
}
async function getImageKey(url, image) {
  const u = new URL(url);
  try {
    const {
      coki
    } = await getCookies(), form = new FormData();
    form.append("image", image, {
      filename: `${Math.floor(1e4 * Math.random())}.jpg`
    });
    const response = await axios.post("https://photofunia.com/images?server=1", form, {
      headers: {
        ...getCommonHeaders(coki),
        Referer: "https://photofunia.com" + u.pathname
      }
    });
    return {
      key: response.data.response.key,
      coki: coki,
      data: response.data
    };
  } catch (e) {
    return handleError(e);
  }
}
async function photofunImg(url, image) {
  const u = new URL(url);
  if (!/https:\/\/.+\.photofunia.+/g.test(url)) return {
    status: "gagal",
    msg: "itu bukan link dari photofunia"
  };
  const {
    key,
    coki
  } = await getImageKey(url, image);
  try {
    const form2 = new FormData();
    form2.append("current-category", "all_effects"), form2.append("image", key), form2.append("image:crop", "0");
    const response = await axios.post("https://photofunia.com" + u.pathname + "?server=1", form2, {
      headers: {
        ...getCommonHeaders(coki),
        Referer: "https://photofunia.com" + u.pathname
      }
    });
    return {
      status: "sukses",
      url: /data-share-image="(.+?)"/.exec(response.data)[1]
    };
  } catch (e) {
    return handleError(e);
  }
}
async function photofunImg2(url, image, image2) {
  const u = new URL(url);
  if (!/https:\/\/.+\.photofunia.+/g.test(url)) return {
    status: "gagal",
    msg: "itu bukan link dari photofunia"
  };
  const {
    key,
    coki
  } = await getImageKey(url, image), img2 = await getImageKey(url, image2);
  try {
    const form2 = new FormData();
    form2.append("current-category", "all_effects"), form2.append("image", key), form2.append("image2", img2.key),
      form2.append("image:crop", "0");
    const response = await axios.post("https://photofunia.com" + u.pathname + "?server=1", form2, {
      headers: {
        ...getCommonHeaders(coki),
        Referer: "https://photofunia.com" + u.pathname
      }
    });
    return {
      status: "sukses",
      url: /data-share-image="(.+?)"/.exec(response.data)[1]
    };
  } catch (e) {
    return handleError(e);
  }
}
async function photofunText(url, text) {
  return new Promise(async resolve => {
    const u = new URL(url);
    if (!/https:\/\/.+\.photofunia.+/g.test(url)) return resolve({
      msg: "itu bukan link dari photofunia"
    });
    try {
      const a = await axios.get("https://photofunia.com/cookie-warning?server=1", {
          headers: {
            Host: "photofunia.com",
            Referer: "https://photofunia.com" + u.pathname
          }
        }),
        coki = a.headers["set-cookie"][0]?.split(";")[0],
        form = new FormData();
      form.append("current-category", "all_effect"), text.forEach((v, index) => {
        const fieldName = 0 === index ? "text" : `text${index + 1}`;
        form.append(fieldName, v);
      });
      const response = await axios.post("https://photofunia.com" + u.pathname + "?server=1", form, {
        headers: {
          ...getCommonHeaders(coki),
          referer: "https://photofunia.com" + u.pathname
        }
      });
      return resolve({
        status: "sukses",
        url: /data-share-image="(.+?)"/.exec(response.data)[1]
      });
    } catch (e) {
      return resolve(handleError(e));
    }
  });
}

function getCommonHeaders(cookie) {
  return {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; Flow) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/359.0.0.288 Safari/537.36",
    Accept: "application/json, text/javascript, */*; q=0.01",
    Host: "photofunia.com",
    cookie: cookie + "; accept_cookie=true",
    "Accept-Language": "id-ID,id;q=0.9,en-GB;q=0.8,en;q=0.7,en-US;q=0.6"
  };
}

function handleError(e) {
  return e.response ? {
    status: "gagal",
    msg: e.response.statusText
  } : {
    status: "gagal",
    msg: "error nih"
  };
}
export {
  photofunSearch,
  photofunEffect,
  photofunUse,
  photofunImg,
  photofunImg2,
  photofunText
};