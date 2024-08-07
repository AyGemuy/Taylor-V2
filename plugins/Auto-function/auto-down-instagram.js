import axios from "axios";
import cheerio from "cheerio";
import {
  instagram
} from "@xct007/frieren-scraper";
const {
  instagramdl
} = await import("@bochilteam/scraper");
import {
  Download
} from "../../lib/download/get-download.js";
export async function before(m) {
  if (m.isBaileys || !m.text) return false;
  const regex = /(https?:\/\/(?:www\.)?instagram\.[a-z\.]{2,6}\/[\w\-\.]+(\/[^\s]*)?)/g;
  const matches = m.text.trim().match(regex);
  const chat = db.data.chats[m.chat];
  const spas = "                ";
  if (!matches || !matches[0] || chat.autodlInstagram !== true) return;
  let lister = Array.from({
    length: 7
  }, (_, index) => `v${index + 1}`);
  let [links, versions] = [matches[0], null];
  versions = versions ? versions : lister[Math.floor(Math.random() * lister.length)];
  if (!lister.includes(versions.toLowerCase())) return m.reply("*Example:*\nlink v2\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v.toUpperCase()).join("\n"));
  try {
    if (!links) return m.reply("Input query link");
    if (versions === "v1") {
      let results = await instagram.v1(links);
      if (results) {
        let caption = `*[ I N S T A G R A M - ${versions.toUpperCase()} ]*\n\n`;
        for (let i = 0; i < results.length; i++) {
          let media = results[i];
          let out = media.url;
          let mediaCaption = `Type: ${media.type}\nQuality: ${media.quality}`;
          if (out) await this.sendFile(m.chat, out, "", `${caption}${mediaCaption}`, m);
        }
      } else console.log("Invalid data format in results");
    }
    if (versions === "v2") {
      let response = await axios.get("https://fantox001-scrappy-api.vercel.app/instadl?url=" + links);
      let results = response.data;
      let caption = `*[ I N S T A G R A M - ${versions.toUpperCase()} ]*`;
      let out = results.videoUrl;
      if (out) return await this.sendFile(m.chat, out, "", caption, m);
    }
    if (versions === "v3") {
      let getIgdl = new Download();
      let results = await getIgdl.igdl(links);
      if (results.media) {
        let caption = `*[ I N S T A G R A M - ${versions.toUpperCase()} ]*\n\n`;
        for (let i = 0; i < results.media.length; i++) {
          let media = results.media[i];
          if (media) await this.sendFile(m.chat, media, "", `${caption}`, m);
        }
      } else console.log("Invalid data format in results");
    }
    if (versions === "v4") {
      let results = await ig(links);
      if (results.status && results.result && results.result.medias) {
        let caption = `*[ I N S T A G R A M - ${versions.toUpperCase()} ]*\n\n`;
        for (let i = 0; i < results.result.medias.length; i++) {
          let info = results.result;
          let media = results.result.medias[i];
          let out = media.url;
          let mediaCaption = `Author: ${info.author}\nTitle: ${info.title}\nType: ${info.type}\nQuality: ${media.quality}\nExtension: ${media.extension}`;
          if (out) await this.sendFile(m.chat, out, "", `${caption}${mediaCaption}`, m);
        }
      } else console.log("Invalid data format in results");
    }
    if (versions === "v5") {
      let results = await saveig(links);
      if (results.medias) {
        let caption = `*[ I N S T A G R A M - ${versions.toUpperCase()} ]*\n\n`;
        for (let i = 0; i < results.medias.length; i++) {
          let media = results.medias[i];
          let out = media.url;
          let mediaCaption = `Type: ${media.type}\nQuality: ${media.quality}`;
          if (out) await this.sendFile(m.chat, out, "", `${caption}${mediaCaption}`, m);
        }
      } else console.log("Invalid data format in results");
    }
    if (versions === "v6") {
      let results = await instagramdl(links);
      if (results.medias) {
        let caption = `*[ I N S T A G R A M - ${versions.toUpperCase()} ]*\n\n`;
        for (let i = 0; i < results.medias.length; i++) {
          let media = results.medias[i];
          let out = media.url;
          let mediaCaption = `Title: ${results.title}\nQuality: ${media.quality}\nExtension: ${media.extension}\nSize: ${media.formattedSize}`;
          if (out) await this.sendFile(m.chat, out, "", `${caption}${mediaCaption}`, m);
        }
      } else console.log("Invalid data format in results");
    }
    if (versions === "v7") {
      let results = await instagramGetUrl(links);
      if (results.insBos) {
        let caption = `*[ I N S T A G R A M - ${versions.toUpperCase()} ]*\n\n`;
        for (let i = 0; i < results.insBos.length; i++) {
          let media = results.insBos[i];
          let out = media.url;
          let mediaCaption = `Author: ${media.author}\nType: ${media.type}\nId: ${media.id}`;
          if (out) await this.sendFile(m.chat, out, "", `${caption}${mediaCaption}`, m);
        }
      } else console.log("Invalid data format in results");
    }
  } catch (e) {
    m.reply(e.toString());
  }
}
export const disabled = false;
async function ig(url) {
  try {
    const a = await axios.get("https://116.203.129.92/");
    const _a = cheerio.load(a.data);
    const csrf = _a('meta[name="csrf-token"]').attr("content");
    const b = await axios.post("https://116.203.129.92/getData", `url=${encodeURIComponent(url)}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "*/*",
        "X-CSRF-TOKEN": csrf,
        "X-Requested-With": "XMLHttpRequest",
        cookie: a.headers["set-cookie"]
      }
    });
    return b.data.error ? {
      status: false
    } : {
      status: true,
      result: b.data
    };
  } catch (error) {
    return {
      status: false
    };
  }
}
async function saveig(q) {
  try {
    const response = await axios.post("https://saveig.app/api/ajaxSearch", new URLSearchParams({
      q: q,
      t: "media",
      lang: "id"
    }));
    const html = response.data.data;
    const $ = cheerio.load(html);
    const medias = $("ul.download-box li").map((index, element) => {
      const $thumb = $(element).find(".download-items__thumb img");
      const $btn = $(element).find(".download-items__btn a");
      const $options = $(element).find(".photo-option select option");
      const type = $btn.attr("onclick")?.includes("click_download_video") ? "video" : "image";
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
    const result = {
      medias: medias
    };
    return result;
  } catch (error) {
    console.error("Error fetching Instagram media:", error);
    return {
      error: "Failed to fetch media"
    };
  }
}
async function instagramGetUrl(url_media) {
  const BASE_URL = "https://api.sssgram.com/st-tik/ins/dl?";
  try {
    const response = await axios.get(`${BASE_URL}url=${url_media}&timestamp=${Date.now()}`, {
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
    });
    return response.data.result;
  } catch (err) {
    throw err;
  }
}