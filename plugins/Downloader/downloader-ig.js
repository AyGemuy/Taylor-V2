import axios from "axios";
import cheerio from "cheerio";
import {
  instagram
} from "@xct007/frieren-scraper";
import {
  instagramdl
} from "@bochilteam/scraper";
import {
  Download
} from "../../lib/download/get-download.js";
import crypto from "crypto";
const generateHash = input => crypto.createHash("sha256").update(input).digest("hex"),
  handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
  }) => {
    let lister = Array.from({
        length: 8
      }, (_, index) => `v${index + 1}`),
      [links, versions] = text.split(" ");
    if (versions = versions || lister[Math.floor(Math.random() * lister?.length)], !lister.includes(versions.toLowerCase())) return m.reply("*Example:*\n" + usedPrefix + command + " link v2\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v.toUpperCase()).join("\n"));
    try {
      if (!links) return m.reply("Input query link");
      if ("v1" === versions) {
        let results = await instagram.v1(links);
        if (results) {
          let caption = `*[ I N S T A G R A M - ${versions.toUpperCase()} ]*\n\n`;
          for (let i = 0; i < results?.length; i++) {
            let media = results[i],
              out = media.url,
              mediaCaption = `Type: ${media.type}\nQuality: ${media.quality}`;
            out && await conn.sendFile(m.chat, out, "", `${caption}${mediaCaption}`, m);
          }
        } else console.log("Invalid data format in results");
      }
      if ("v2" === versions) {
        let results = (await axios.get("https://fantox001-scrappy-api.vercel.app/instadl?url=" + links)).data,
          caption = `*[ I N S T A G R A M - ${versions.toUpperCase()} ]*`,
          out = results.videoUrl;
        if (out) return await conn.sendFile(m.chat, out, "", caption, m);
      }
      if ("v3" === versions) {
        let getIgdl = new Download(),
          results = await getIgdl.igdl(links);
        if (results.media) {
          let caption = `*[ I N S T A G R A M - ${versions.toUpperCase()} ]*\n\n`;
          for (let i = 0; i < results.media?.length; i++) {
            let media = results.media[i];
            media && await conn.sendFile(m.chat, media, "", `${caption}`, m);
          }
        } else console.log("Invalid data format in results");
      }
      if ("v4" === versions) {
        let results = await ig(links);
        if (results.status && results.result && results.result?.medias) {
          let caption = `*[ I N S T A G R A M - ${versions.toUpperCase()} ]*\n\n`;
          for (let i = 0; i < results.result?.medias?.length; i++) {
            let info = results.result,
              media = results.result?.medias[i],
              out = media.url,
              mediaCaption = `Author: ${info.author}\nTitle: ${info.title}\nType: ${info.type}\nQuality: ${media.quality}\nExtension: ${media.extension}`;
            out && await conn.sendFile(m.chat, out, "", `${caption}${mediaCaption}`, m);
          }
        } else console.log("Invalid data format in results");
      }
      if ("v5" === versions) {
        let results = await saveig(links);
        if (results.medias) {
          let caption = `*[ I N S T A G R A M - ${versions.toUpperCase()} ]*\n\n`;
          for (let i = 0; i < results.medias?.length; i++) {
            let media = results.medias[i],
              out = media.url,
              mediaCaption = `Type: ${media.type}\nQuality: ${media.quality}`;
            out && await conn.sendFile(m.chat, out, "", `${caption}${mediaCaption}`, m);
          }
        } else console.log("Invalid data format in results");
      }
      if ("v6" === versions) {
        let results = await instagramdl(links);
        if (results.medias) {
          let caption = `*[ I N S T A G R A M - ${versions.toUpperCase()} ]*\n\n`;
          for (let i = 0; i < results.medias?.length; i++) {
            let media = results.medias[i],
              out = media.url,
              mediaCaption = `Title: ${results.title}\nQuality: ${media.quality}\nExtension: ${media.extension}\nSize: ${media.formattedSize}`;
            out && await conn.sendFile(m.chat, out, "", `${caption}${mediaCaption}`, m);
          }
        } else console.log("Invalid data format in results");
      }
      if ("v7" === versions) {
        let results = await instagramGetUrl(links);
        if (results.insBos) {
          let caption = `*[ I N S T A G R A M - ${versions.toUpperCase()} ]*\n\n`;
          for (let i = 0; i < results.insBos?.length; i++) {
            let media = results.insBos[i],
              out = media.url,
              mediaCaption = `Author: ${media.author}\nType: ${media.type}\nId: ${media.id}`;
            out && await conn.sendFile(m.chat, out, "", `${caption}${mediaCaption}`, m);
          }
        } else console.log("Invalid data format in results");
      }
      if ("v8" === versions) {
        let results = await FastDl(links);
        if (results.insBos) {
          let caption = `*[ I N S T A G R A M - ${versions.toUpperCase()} ]*\n\n`;
          for (let i = 0; i < results.result?.url?.length; i++) {
            let media = results.result?.url[i],
              out = media.url,
              mediaCaption = `Name: ${media.name}\nType: ${media.type}`;
            out && await conn.sendFile(m.chat, out, "", `${caption}${mediaCaption}`, m);
          }
        } else console.log("Invalid data format in results");
      }
    } catch (e) {
      m.reply(e.toString());
    }
  };
handler.help = ["instagram"], handler.tags = ["downloader"], handler.command = /^i(nsta(gram(dl)?|dl)|g(dl)?)$/i;
export default handler;
async function ig(url) {
  try {
    const a = await axios.get("https://116.203.129.92/"),
      csrf = cheerio.load(a.data)('meta[name="csrf-token"]').attr("content"),
      b = await axios.post("https://116.203.129.92/getData", `url=${encodeURIComponent(url)}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Accept: "*/*",
          "X-CSRF-TOKEN": csrf,
          "X-Requested-With": "XMLHttpRequest",
          cookie: a.headers["set-cookie"]
        }
      });
    return b.data.error ? {
      status: !1
    } : {
      status: !0,
      result: b.data
    };
  } catch (error) {
    return {
      status: !1
    };
  }
}
async function saveig(q) {
  try {
    const html = (await axios.post("https://saveig.app/api/ajaxSearch", new URLSearchParams({
        q: q,
        t: "media",
        lang: "id"
      }))).data.data,
      $ = cheerio.load(html),
      medias = $("ul.download-box li").map((index, element) => {
        const $thumb = $(element).find(".download-items__thumb img"),
          $btn = $(element).find(".download-items__btn a"),
          $options = $(element).find(".photo-option select option"),
          type = $btn.attr("onclick")?.includes("click_download_video") ? "video" : "image";
        return {
          type: type,
          thumb: $thumb.attr("src") || "",
          url: $btn.attr("href")?.replace("&dl=1", "") || "",
          quality: $options.filter(":selected").text() || "",
          options: $options.map((i, opt) => ({
            type: type,
            url: $(opt).val() || "",
            quality: $(opt).text() || ""
          })).get()
        };
      }).get();
    return {
      medias: medias
    };
  } catch (error) {
    return console.error("Error fetching Instagram media:", error), {
      error: "Failed to fetch media"
    };
  }
}
async function instagramGetUrl(url_media) {
  try {
    return (await axios.get(`https://api.sssgram.com/st-tik/ins/dl?url=${url_media}&timestamp=${Date.now()}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3",
        "Accept-Encoding": "gzip, deflate, br",
        Origin: "https://www.sssgram.com",
        Connection: "keep-alive",
        Referer: "https://www.sssgram.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site"
      }
    })).data.result;
  } catch (err) {
    throw err;
  }
}
async function FastDl(link) {
  try {
    const ts = Date.now(),
      _ts = ts - Math.floor(1e6 * Math.random()),
      _tsc = Math.floor(1e6 * Math.random()),
      _s = generateHash(`${link}${ts}${_ts}${_tsc}`),
      {
        data
      } = await axios.post("https://fastdl.app/api/convert", {
        url: link,
        ts: ts,
        _ts: _ts,
        _tsc: _tsc,
        _s: _s
      }, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      });
    return {
      status: 200,
      creator: "David XD",
      result: data
    };
  } catch (error) {
    return console.error(error), {
      status: 500,
      message: "Internal Server Error"
    };
  }
}