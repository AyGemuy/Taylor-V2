import fetch from "node-fetch";
import { facebook } from "@xct007/frieren-scraper";
import got from "got";
import axios from "axios";
import * as cheerio from "cheerio";
const handler = async (m, { conn, args, text, usedPrefix, command }) => {
  const ends = ["v1", "v2", "v3", "v4"];
  let [links, version, quality] = text.split(" ");
  const linkRegex = /^(https?:\/\/[^\s]+)/;
  if (!links || !linkRegex.test(links)) {
    return conn.reply(
      m.chat,
      `🔗 *Masukkan tautan yang valid.*\n\n📌 *Contoh Penggunaan:*\n${usedPrefix + command} https://example.com`,
      m,
    );
  }
  if (!version) {
    const buttons = conn.ctaButton
      .setBody(`🔍 *Pilih versi untuk link:*\n${links}`)
      .addSelection("Pilih versi")
      .makeSections("Versi yang tersedia", "Pilih salah satu versi");
    ends.forEach((v) => {
      buttons.makeRow(
        "",
        `Versi ${v.toUpperCase()}`,
        `Pilih versi ${v.toUpperCase()}`,
        `${usedPrefix}${command} ${links} ${v}`,
      );
    });
    return buttons.run(m.chat, conn, m);
  }
  if (!quality) {
    const buttons = conn.ctaButton
      .setBody(`🔍 *Pilih kualitas untuk versi:*\n${version.toUpperCase()}`)
      .addSelection("Pilih kualitas")
      .makeSections("Kualitas yang tersedia", "Pilih salah satu kualitas");
    ["hd", "sd"].forEach((q) => {
      buttons.makeRow(
        "",
        `Kualitas ${q.toUpperCase()}`,
        `Pilih kualitas ${q.toUpperCase()}`,
        `${usedPrefix}${command} ${links} ${version} ${q}`,
      );
    });
    return buttons.run(m.chat, conn, m);
  }
  if (ends.includes(version)) {
    if ("v1" === version.toLowerCase()) {
      try {
        let results = await facebook.v1(links);
        let out,
          caption = `📹 *[ F A C E B O O K ]*\n\n*🎥 Title:* ${results.title}\n*HD Available:* ${results.isHdAvailable ? "Yes" : "No"}\n`;
        if ("hd" === quality) {
          out = results.urls[0]?.hd || results.urls[1]?.sd;
          if (!results.urls[0]?.hd)
            caption += `\n💡 *Memakai SD karena HD error.*`;
        } else if ("sd" === quality) {
          out = results.urls[1]?.sd || results.urls[0]?.hd;
          if (!results.urls[1]?.sd)
            caption += `\n💡 *Memakai HD karena SD error.*`;
        }
        if (!out) caption += `\n❌ *Semua error.*`;
        m.react(wait);
        await conn.sendFile(m.chat, out, "", caption, m);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("v2" === version.toLowerCase()) {
      try {
        let results = await FbDownload(links);
        let out,
          caption = `📹 *[ F A C E B O O K ]*\n\n*🎥 Title:* ${results.title}`;
        if ("hd" === quality) {
          out =
            results.links["Download High Quality"] ||
            results.links["Download Low Quality"];
          if (!results.links["Download High Quality"])
            caption += `\n💡 *Memakai SD karena HD error.*`;
        } else if ("sd" === quality) {
          out =
            results.links["Download Low Quality"] ||
            results.links["Download High Quality"];
          if (!results.links["Download Low Quality"])
            caption += `\n💡 *Memakai HD karena SD error.*`;
        }
        if (!out) caption += `\n❌ *Semua error.*`;
        m.react(wait);
        await conn.sendFile(m.chat, out, "", caption, m);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("v3" === version.toLowerCase()) {
      try {
        const { result } = await facebookdl(links);
        let results = result;
        let out,
          caption = `📹 *[ F A C E B O O K ]*\n\n*🎥 Title:* ${results.title}`;
        if ("hd" === quality.toLowerCase()) {
          out =
            results.find((video) => "hd" === video.quality)?.url ||
            results.find((video) => "sd" === video.quality)?.url;
          if (!results.find((video) => "hd" === video.quality))
            caption += `\n💡 *Memakai SD karena HD error.*`;
        } else if ("sd" === quality.toLowerCase()) {
          out =
            results.find((video) => "sd" === video.quality)?.url ||
            results.find((video) => "hd" === video.quality)?.url;
          if (!results.find((video) => "sd" === video.quality))
            caption += `\n💡 *Memakai HD karena SD error.*`;
        }
        if (!out) caption += `\n❌ *Semua error.*`;
        m.react(wait);
        await conn.sendFile(m.chat, out, "", caption, m);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("v4" === version.toLowerCase()) {
      try {
        let results = await facebookVideo(links);
        let out,
          caption = `📹 *[ F A C E B O O K ]*\n\n*⏱️ Duration:* ${results.duration}`;
        if ("hd" === quality) {
          out = results.result[0]?.url || results.result[1]?.url;
          if (!results.result[0]?.url)
            caption += `\n💡 *Memakai SD karena HD error.*`;
        } else if ("sd" === quality) {
          out = results.result[1]?.url || results.result[0]?.url;
          if (!results.result[1]?.url)
            caption += `\n💡 *Memakai HD karena SD error.*`;
        }
        if (!out) caption += `\n❌ *Semua error.*`;
        m.react(wait);
        await conn.sendFile(m.chat, out, "", caption, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["facebook"];
handler.tags = ["downloader"];
handler.alias = ["fb", "fbdl", "facebook", "facebookdl"];
handler.command = /^((facebook|fb)(dl)?)$/i;
export default handler;
async function FbDownload(vid_url) {
  try {
    const data = {
      url: vid_url,
    };
    const searchParams = new URLSearchParams();
    searchParams.append("url", data.url);
    const response = await fetch(
      "https://facebook-video-downloader.fly.dev/app/main.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: searchParams.toString(),
      },
    );
    return await response.json();
  } catch (e) {
    return null;
  }
}
const baseURL = "https://fdownloader.net/id";
const apiURL = "https://v3.fdownloader.net/api/ajaxSearch?lang=en";
const facebookVideo = async (url) => {
  try {
    const { data } = await axios(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
      },
      data: new URLSearchParams(
        Object.entries({
          recaptchaToken: "",
          q: url,
          t: "media",
          lang: "en",
        }),
      ),
    });
    const script = cheerio.load(data)("body").find("script").text().trim();
    const k_token = script.split("k_token = ")[1].split(";")[0];
    const k_exp = script.split("k_exp = ")[1].split(";")[0];
    const { data: apiData } = await axios(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
      },
      data: new URLSearchParams(
        Object.entries({
          k_exp: k_exp,
          k_token: k_token,
          q: url,
          lang: "en",
          web: "fdownloader.net",
          v: "v2",
          w: "",
        }),
      ),
    });
    const $api = cheerio.load(apiData.data);
    const result = [];
    const duration = $api("div.clearfix > p").text().trim();
    $api("div.tab__content")
      .find("tbody > tr")
      .each((index, element) => {
        const quality = $api(element).find("td.video-quality").text();
        const videoUrl = $api(element).find("td > a").attr("href");
        if (quality && videoUrl) {
          result.push({
            quality: quality,
            url: videoUrl,
          });
        }
      });
    return {
      duration: duration,
      result: result,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
async function facebookdl(url) {
  const html = await got("https://fdownloader.net/en").text();
  const k_url_search = /k_url_search="(.*?)"/.exec(html)?.[1];
  const k_exp = /k_exp="(.*?)"/.exec(html)?.[1];
  const k_token = /k_token="(.*?)"/.exec(html)?.[1];
  const form = {
    k_exp: k_exp,
    k_token: k_token,
    q: url,
    lang: "en",
    web: "fdownloader.net",
    v: "v2",
    w: "",
  };
  const data = await got
    .post(k_url_search || "", {
      headers: {
        referer: "https://fdownloader.net/",
      },
      form: form,
    })
    .json();
  const $ = cheerio.load(data.data);
  const k_url_convert = /k_url_convert = "(.*?)"/.exec($.html())?.[1];
  const c_exp = /k_exp = "(.*?)"/.exec($.html())?.[1];
  const c_token = /c_token = "(.*?)"/.exec($.html())?.[1];
  const thumbnail = $(".thumbnail > .image-fb > img").attr("src");
  const duration = $(".content > .clearfix > p").text() || undefined;
  const video = $("table.table")
    .eq(0)
    .find("tbody > tr")
    .map((_, el) => {
      const $el = $(el);
      const $td = $el.find("td");
      const quality = $td.eq(0).text();
      const videoUrl = $td.eq(2).find("a").attr("href");
      if (videoUrl) {
        return {
          quality: quality,
          download: () => Promise.resolve(videoUrl),
        };
      }
      return null;
    })
    .toArray()
    .filter(Boolean);
  const audioUrl = $("#audioUrl").attr("value");
  const audio = audioUrl
    ? [
        {
          quality: "7kbps",
          download: () => Promise.resolve(audioUrl),
        },
      ]
    : [];
  const result = {
    thumbnail: thumbnail,
    duration: duration,
    video: video,
    audio: audio,
  };
  return result;
}
