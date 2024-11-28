import axios from "axios";
import * as cheerio from "cheerio";
import fetch from "node-fetch";
import moment from "moment";
import AdmZip from "adm-zip";
const ranNumb = (min, max = null) =>
  max !== null
    ? Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) +
      Math.ceil(min)
    : Math.floor(Math.random() * min) + 1;
const padLead = (num, size) => {
  let s = num.toString();
  while (s.length < size) s = "0" + s;
  return s;
};
const niceBytes = (x) => {
  let l = 0,
    n = parseInt(x, 10) || 0;
  while (n >= 1024 && ++l) n /= 1024;
  return (
    n.toFixed(n < 10 && l > 0 ? 1 : 0) +
    " " +
    ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][l]
  );
};
const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
const isNumber = (number) =>
  number
    ? typeof (number = parseInt(number)) === "number" && !isNaN(number)
    : number;
const runtime = (seconds) => {
  seconds = Number(seconds);
  const d = Math.floor(seconds / 86400),
    h = Math.floor((seconds % 86400) / 3600),
    m = Math.floor((seconds % 3600) / 60),
    s = Math.floor(seconds % 60);
  return (
    (d > 0 ? `${d} ${d === 1 ? "day, " : "days, "}` : "") +
    (h > 0 ? `${h} ${h === 1 ? "hour, " : "hours, "}` : "") +
    (m > 0 ? `${m} ${m === 1 ? "minute, " : "minutes, "}` : "") +
    (s > 0 ? `${s} ${s === 1 ? "second" : "seconds"}` : "")
  );
};
const runtimes = (seconds) => {
  seconds = Number(seconds);
  const d = Math.floor(seconds / 86400),
    h = Math.floor((seconds % 86400) / 3600),
    m = Math.floor((seconds % 3600) / 60),
    s = Math.floor(seconds % 60);
  return (
    (d > 0 ? `${d}d ` : "") +
    (h < 10 ? `0${h}:` : h > 0 ? `${h}:` : "") +
    (m < 10 ? `0${m}:` : m > 0 ? `${m}:` : "") +
    (s < 10 ? `0${s}` : s > 0 ? `${s}` : "")
  );
};
const clockString = (ms) => {
  if (isNaN(ms) || ms < 0) return "Invalid input";
  const duration = moment.duration(ms);
  const tahun = Math.floor(duration.asYears());
  const bulan = duration.months();
  const minggu = Math.floor((duration.asDays() - tahun * 365 - bulan * 30) / 7);
  const hari = duration.days() % 7;
  const jam = duration.hours();
  const menit = duration.minutes();
  const detik = duration.seconds();
  return (
    `${tahun ? `*\`${tahun}\`* Tahun ` : ""}` +
    `${bulan || tahun ? `*\`${bulan}\`* Bulan ` : ""}` +
    `${minggu || bulan || tahun ? `*\`${minggu}\`* Minggu ` : ""}` +
    `${hari || minggu || bulan || tahun ? `*\`${hari}\`* Hari ` : ""}` +
    `${jam || hari || minggu || bulan || tahun ? `*\`${jam}\`* Jam ` : ""}` +
    `${menit || jam || hari || minggu || bulan || tahun ? `*\`${menit}\`* Menit ` : ""}` +
    `*\`${detik}\`* Detik`
  );
};
const cerpen = async (category) => {
  return new Promise(async (resolve, reject) => {
    let length,
      judul = category.toLowerCase().replace(/[()*]/g, "").replace(/\s/g, "-");
    try {
      const res = await axios.get(
        `http://cerpenmu.com/category/cerpen-${judul}`,
      );
      length = cheerio
        .load(
          res.data,
        )("html body div#wrap div#content article.post div.wp-pagenavi a")[4]
        ?.attribs.href.split("/")
        .pop();
    } catch {
      length = 0;
    }
    const page = Math.floor(Math.random() * parseInt(length));
    axios
      .get(`http://cerpenmu.com/category/cerpen-${judul}/page/${page}`)
      .then((get) => {
        const $ = cheerio.load(get.data);
        const link = [];
        $("article.post").each((a, b) => {
          link.push($(b).find("a").attr("href"));
        });
        const random = link[Math.floor(Math.random() * link.length)];
        axios.get(random).then((res) => {
          const $$ = cheerio.load(res.data);
          const hasil = {
            title: $$("#content > article > h1").text(),
            author: $$("#content > article")
              .text()
              .split("Cerpen Karangan: ")[1]
              .split("Kategori: ")[0],
            kategori: $$("#content > article")
              .text()
              .split("Kategori: ")[1]
              .split("\n")[0],
            lolos: $$("#content > article")
              .text()
              .split("Lolos moderasi pada: ")[1]
              .split("\n")[0],
            cerita: $$("#content > article > p").text(),
          };
          resolve(hasil);
        });
      });
  });
};
const quotesAnime = () => {
  return new Promise((resolve, reject) => {
    const page = Math.floor(185 * Math.random());
    axios
      .get(`https://otakotaku.com/quote/feed/${page}`)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const hasil = [];
        $("div.kotodama-list").each((l, h) => {
          hasil.push({
            link: $(h).find("a").attr("href"),
            gambar: $(h).find("img").attr("data-src"),
            karakter: $(h).find("div.char-name").text().trim(),
            anime: $(h).find("div.anime-title").text().trim(),
            episode: $(h).find("div.meta").text(),
            up_at: $(h).find("small.meta").text(),
            quotes: $(h).find("div.quote").text().trim(),
          });
        });
        resolve(hasil);
      })
      .catch(reject);
  });
};
const getBuffer = async (url, options) => {
  try {
    const response = await axios({
      method: "get",
      url: url,
      headers: {
        DNT: 1,
        "Upgrade-Insecure-Request": 1,
      },
      ...options,
      responseType: "arraybuffer",
    });
    return response.data;
  } catch (err) {
    return err;
  }
};
const lirik = (judul) => {
  return new Promise(async (resolve, reject) => {
    axios
      .get(`https://www.musixmatch.com/search/${judul}`)
      .then(async ({ data }) => {
        const $ = cheerio.load(data);
        const hasil = {};
        const link =
          "https://www.musixmatch.com" +
          $("div.media-card-body > div > h2").find("a").attr("href");
        await axios.get(link).then(({ data }) => {
          const $$ = cheerio.load(data);
          hasil.thumb =
            "https:" +
            $$(
              "div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div",
            )
              .find("img")
              .attr("src");
          $$("div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics").each(
            (a, b) => {
              hasil.lirik =
                $$(b).find("span > p > span").text() +
                "\n" +
                $$(b).find("span > div > p > span").text();
            },
          );
        });
        resolve(hasil);
      })
      .catch(reject);
  });
};
const wallpaper = (query) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://www.wallpaperflare.com/search?wallpaper=${query}`, {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          cookie:
            "_ga=GA1.2.863074474.1624987429; _gid=GA1.2.857771494.1624987429; __gads=ID=84d12a6ae82d0a63-2242b0820eca0058:T=1624987427:RT=1624987427:S=ALNI_MaJYaH0-_xRbokdDkQ0BNSlKaa0Hg; __gpi=UID=00000c80e037ba0f:T=1624987427:RT=1624987427:S=ALNI_MaJkE-55hGUlNTe87I5YhoD1Q-0zA; _gat=1",
        },
      })
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const hasil = [];
        $("div.item").each((l, h) => {
          hasil.push(
            $(h)
              .find("img")
              .attr("src")
              .replace(/small|_small/g, "large"),
          );
        });
        resolve(hasil);
      })
      .catch(reject);
  });
};
const playstore = async (name) => {
  try {
    const response = await fetch(
      `https://play.google.com/store/search?q=${encodeURIComponent(name)}&c=apps`,
    );
    const data = await response.text();
    const $ = cheerio.load(data);
    const result = [];
    const ln = [];
    const nm = [];
    const dv = [];
    const lm = [];
    $("div.wXUyZd > a").each((_, elem) =>
      ln.push("https://play.google.com" + $(elem).attr("href")),
    );
    $("div.b8cIId.ReQCgd.Q9MA7b > a > div").each((_, elem) =>
      nm.push($(elem).text().trim()),
    );
    $("div.b8cIId.ReQCgd.KoLSrc > a > div").each((_, elem) =>
      dv.push($(elem).text().trim()),
    );
    $("div.b8cIId.ReQCgd.KoLSrc > a").each((_, elem) =>
      lm.push("https://play.google.com" + $(elem).attr("href")),
    );
    for (let i = 0; i < ln.length; i++) {
      result.push({
        name: nm[i],
        link: ln[i],
        developer: dv[i],
        link_dev: lm[i],
      });
    }
    return result;
  } catch (error) {
    console.error("Error fetching Play Store data:", error);
    throw error;
  }
};
const linkwa = async (nama) => {
  try {
    const response = await fetch(
      `http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search=${encodeURIComponent(nama)}&searchby=name`,
    );
    const data = await response.text();
    const $ = cheerio.load(data);
    const result = [];
    const lnk = [];
    const nm = [];
    $("div.wa-chat-title-container a").each((_, elem) =>
      lnk.push($(elem).attr("href")),
    );
    $("div.wa-chat-title-text").each((_, elem) => nm.push($(elem).text()));
    for (let i = 0; i < lnk.length; i++) {
      result.push({
        nama: nm[i].split(". ")[1],
        link: lnk[i].split("?")[0],
      });
    }
    return result;
  } catch (error) {
    console.error("Error fetching WhatsApp group links:", error);
    throw error;
  }
};
const pickRandom = (list) => list[Math.floor(list.length * Math.random())];
const generate = (n) => {
  const max = 11;
  if (n > max) return generate(max) + generate(n - max);
  const min = Math.pow(10, n + 1) / 10;
  return (
    "" +
    (Math.floor(Math.random() * (Math.pow(10, n + 1) - min + 1)) + min)
  ).substring(1);
};
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
const isUrl = (text) =>
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/gi.test(
    text,
  );
const getRandom = (ext) => `${Math.floor(1e4 * Math.random())}${ext}`;
const readMore = String.fromCharCode(8206).repeat(4001);
const someincludes = (data, id) => data.some((el) => id.includes(el));
const somematch = (data, id) => data.includes(id);
const GDriveDl = async (url) => {
  if (!url || !url.match(/drive\.google/i))
    return {
      error: true,
    };
  try {
    const id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1];
    if (!id) throw new Error("ID Not Found");
    const response = await fetch(
      `https://drive.google.com/uc?id=${id}&authuser=0&export=download`,
      {
        method: "POST",
        headers: {
          "accept-encoding": "gzip, deflate, br",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          origin: "https://drive.google.com",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
          "x-client-data": "CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=",
          "x-drive-first-party": "DriveWebUi",
          "x-json-requested": "true",
        },
      },
    );
    const { fileName, sizeBytes, downloadUrl } = JSON.parse(
      (await response.text()).slice(4),
    );
    if (!downloadUrl) throw new Error("Link Download Limit!");
    const data = await fetch(downloadUrl);
    return 200 !== data.status
      ? data.statusText
      : {
          downloadUrl: downloadUrl,
          fileName: fileName,
          fileSize: formatSize(sizeBytes),
          mimetype: data.headers.get("content-type"),
        };
  } catch (error) {
    console.error("Error fetching Google Drive data:", error);
    return {
      error: true,
    };
  }
};
const summarize = async (input, num = 50) => {
  try {
    const response = await fetch(
      `https://api.text-summarize.com/summarize?ratio=${num}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input,
        }),
      },
    );
    if (!response.ok)
      throw new Error(`Network response was not ok: ${response.statusText}`);
    const { summary } = await response.json();
    return summary;
  } catch (error) {
    console.error("Error during summarization:", error.message);
    throw error;
  }
};
async function extractHtmlZip(zipBuffer) {
  try {
    const zip = new AdmZip(zipBuffer);
    const htmlFileEntries = zip
      .getEntries()
      .filter((entry) => entry.entryName.endsWith(".html"));
    if (htmlFileEntries.length > 0) {
      return new Promise((resolve, reject) => {
        htmlFileEntries[0].getDataAsync((data, err) => {
          if (err) {
            console.error(`Error getting HTML data: ${err}`);
            return reject(null);
          }
          resolve(data.toString("utf8"));
        });
      });
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error extracting HTML file: ${error}`);
    return null;
  }
}
const saveWeb2zip = async (link, options = {}) => {
  const apiUrl = "https://copier.saveweb2zip.com";
  let attempts = 0;
  let md5;
  try {
    const copyResponse = await fetch(`${apiUrl}/api/copySite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
        Referer: "https://saveweb2zip.com/en",
      },
      body: JSON.stringify({
        url: link,
        renameAssets: options.renameAssets || false,
        saveStructure: options.saveStructure || false,
        alternativeAlgorithm: options.alternativeAlgorithm || false,
        mobileVersion: options.mobileVersion || false,
      }),
    });
    ({ md5 } = await copyResponse.json());
    if (!md5) throw new Error("Failed to retrieve MD5 hash");
    while (attempts < 10) {
      const statusResponse = await fetch(`${apiUrl}/api/getStatus/${md5}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
          Referer: "https://saveweb2zip.com/en",
        },
      });
      const statusResult = await statusResponse.json();
      if (statusResult.isFinished) {
        const downloadResponse = await fetch(
          `${apiUrl}/api/downloadArchive/${md5}`,
          {
            method: "GET",
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
              Referer: "https://saveweb2zip.com/en",
            },
          },
        );
        const buffer = await downloadResponse.arrayBuffer();
        const fileName = `${md5}.zip`;
        return {
          fileName: fileName,
          buffer: buffer,
          link: `${apiUrl}/api/downloadArchive/${md5}`,
        };
      }
      await new Promise((resolve) => setTimeout(resolve, 6e4));
      attempts++;
    }
    throw new Error("Timeout: Max attempts reached without completion");
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
class ViewSource {
  async view(url, index = 0) {
    try {
      if (index === 0) {
        const response = await fetch(
          "https://viewsourcepage.com/wp-admin/admin-ajax.php",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
              Accept: "*/*",
              "X-Requested-With": "XMLHttpRequest",
              "User-Agent":
                "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
              Referer: "https://viewsourcepage.com/",
            },
            body: new URLSearchParams({
              action: "psvAjaxAction",
              url: url,
            }).toString(),
          },
        );
        const body = await response.text();
        return body;
      } else if (index === 1) {
        const response = await fetch(
          `https://wholly-api.skinnyrunner.com/get/website-data.php?get_html=${url}`,
          {
            method: "GET",
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
              Accept: "*/*",
            },
          },
        );
        const body = await response.text();
        return body;
      } else if (index === 2) {
        const { buffer: zipBuffer } = await saveWeb2zip(`${url}`);
        return await extractHtmlZip(Buffer.from(zipBuffer));
      } else {
        throw new Error("Invalid index");
      }
    } catch (err) {
      console.error("Error:", err);
      return [];
    }
  }
}
const viewSource = new ViewSource();
const detectText = async (input_text) => {
  try {
    const response = await fetch(
      "https://api.zerogpt.com/api/detect/detectText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "https://www.zerogpt.com",
          "sec-fetch-site": "same-site",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        },
        body: JSON.stringify({
          input_text: input_text,
        }),
      },
    );
    return await response.json();
  } catch (error) {
    console.error("Error detecting text:", error);
    throw error;
  }
};
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
const isValidUrl = (urlString) => {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i",
  );
  return urlPattern.test(urlString);
};
const cleanHtml = (str) => {
  return str
    .replace(/<[^>]*>?/gm, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "...")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rsquo;/g, "’");
};

function stream2buffer(stream) {
  return new Promise((resolve, reject) => {
    const _buf = [];
    stream.on("data", (chunk) => _buf.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(_buf)));
    stream.on("error", (err) => reject(err));
  });
}
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
  clockString,
  someincludes,
  somematch,
  wallpaper,
  summarize,
  detectText,
  slugify,
  isValidUrl,
  cleanHtml,
  viewSource,
  stream2buffer,
  saveWeb2zip,
};
