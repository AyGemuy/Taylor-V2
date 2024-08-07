import axios from "axios";
import fetch from "node-fetch";
import cheerio from "cheerio";
import {
  fetchVideo
} from "@prevter/tiktok-scraper";
import {
  Tiktok
} from "@xct007/tiktok-scraper";
import ora from "ora";
import chalk from "chalk";
import {
  TiktokJs
} from "../../lib/download/tiktok-js.js";
let tiktokJs = new TiktokJs();
import {
  tiktokdl
} from "../../lib/scraper/scraper-api.js";
import {
  ShortLink
} from "../../lib/tools/shortlink.js";
let short = new ShortLink(),
  handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
  }) => {
    let lister = Array.from({
        length: 20
      }, (_, index) => parseInt(index + 1)),
      [links, versions] = text.split(" ");
    versions = parseInt(versions) || lister[Math.floor(Math.random() * lister.length)];
    let spaces = "                ";
    if (!lister.includes(parseInt(versions))) return m.reply(`*Example:*\n${usedPrefix}${command} link 12\n\n*Pilih angka yg ada*\nDari angka *1* sampai *${lister.length}*`);
    m.react(wait);
    try {
      if (!links) return m.reply("Input query link");
      if (1 === parseInt(versions)) {
        let video = await tiktokJs.aweme(links),
          caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n❤️ Views: ${video?.stats?.total_views || ""}\n💬 Comments: ${video?.stats?.total_comment || ""}\n🔁 Shares: ${video?.stats?.total_share || ""}\n▶️ Download: ${video?.stats?.total_download || ""}\n🎵 Music: ${video?.music?.title} - ${video?.music?.author || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Aweme ]*`;
        await conn.sendFile(m.chat, video?.videos[0] || video?.videos[1] || video?.videos[2] || giflogo, "", caption, m);
      }
      if (2 === parseInt(versions)) {
        let video = await tiktokJs.musicaldown(links),
          caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n🎵 Music: ${video?.music?.title || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Musicaldown ]*`;
        await conn.sendFile(m.chat, video?.videos[0] || video?.videos[1] || video?.videos[2] || giflogo, "", caption, m);
      }
      if (3 === parseInt(versions)) {
        let video = await tiktokJs.savetik(links),
          caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n🎵 Music: ${video?.music?.title || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Savetik ]*`;
        await conn.sendFile(m.chat, video?.videos[0] || video?.videos[1] || video?.videos[2] || giflogo, "", caption, m);
      }
      if (4 === parseInt(versions)) {
        let video = await tiktokJs.snaptik(links),
          caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n❤️ Views: ${video?.total_views || ""}\n💬 Comments: ${video?.total_comment || ""}\n🎵 Music: ${video?.music?.title} - ${video?.music?.author || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Snaptik ]*`;
        await conn.sendFile(m.chat, video?.videos[0] || video?.videos[1] || video?.videos[2] || giflogo, "", caption, m);
      }
      if (5 === parseInt(versions)) {
        let video = await tiktokJs.snaptikpro(links),
          caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n❤️ Views: ${video?.total_views || ""}\n💬 Comments: ${video?.total_comment || ""}\n🎵 Music: ${video?.music?.title} - ${video?.music?.author || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Snaptikpro ]*`;
        await conn.sendFile(m.chat, video?.videos || video?.videos[0] || video?.videos[1] || giflogo, "", caption, m);
      }
      if (6 === parseInt(versions)) {
        let video = await tiktokJs.ssstik(links),
          caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n❤️ Views: ${video?.total_views || ""}\n💬 Comments: ${video?.total_comment || ""}\n🎵 Music: ${video?.music?.title} - ${video?.music?.author || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Ssstik ]*`;
        await conn.sendFile(m.chat, video?.videos || video?.videos[0] || video?.videos[1] || giflogo, "", caption, m);
      }
      if (7 === parseInt(versions)) {
        let video = await tiktokJs.tikcdn(links),
          caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n❤️ Views: ${video?.stats?.total_views || ""}\n💬 Comments: ${video?.stats?.total_comment || ""}\n🔁 Shares: ${video?.stats?.total_share || ""}\n▶️ Download: ${video?.stats?.total_download || ""}\n🎵 Music: ${video?.music?.title} - ${video?.music?.author || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Tikcdn ]*`;
        await conn.sendFile(m.chat, video?.videos[0] || video?.videos[1] || giflogo, "", caption, m);
      }
      if (8 === parseInt(versions)) {
        let video = await tiktokJs.tikmate(links),
          caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n❤️ Views: ${video?.total_views || ""}\n💬 Comments: ${video?.total_comment || ""}\n🎵 Music: ${video?.music?.title} - ${video?.music?.author || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Tikmate ]*`;
        await conn.sendFile(m.chat, video?.videos || video?.videos[0] || giflogo, "", caption, m);
      }
      if (9 === parseInt(versions)) {
        let video = await tiktokJs.tiktokdownloadr(links),
          caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n❤️ Views: ${video?.total_views || ""}\n💬 Comments: ${video?.total_comment || ""}\n🎵 Music: ${video?.music?.title} - ${video?.music?.author || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Tiktokdownloadr ]*`;
        await conn.sendFile(m.chat, video?.videos[0] || video?.videos[1] || video?.videos[2] || giflogo, "", caption, m);
      }
      if (10 === parseInt(versions)) {
        let video = await tiktokJs.tikwm(links),
          caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n❤️ Views: ${video?.stats?.total_views || ""}\n💬 Comments: ${video?.stats?.total_comment || ""}\n🔁 Shares: ${video?.stats?.total_share || ""}\n▶️ Download: ${video?.stats?.total_download || ""}\n🎵 Music: ${video?.music?.title} - ${video?.music?.author || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Tikwm ]*`;
        await conn.sendFile(m.chat, video?.videos || video?.videos[0] || giflogo, "", caption, m);
      }
      if (11 === parseInt(versions)) {
        let video = await tiktokJs.ttdownloader(links),
          caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n❤️ Views: ${video?.total_views || ""}\n💬 Comments: ${video?.total_comment || ""}\n🎵 Music: ${video?.music?.title} - ${video?.music?.author || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Ttdownloader ]*`;
        await conn.sendFile(m.chat, video?.videos || video?.videos[0] || giflogo, "", caption, m);
      }
      if (12 === parseInt(versions)) {
        let Scrap = await Tiktokdl(links),
          obj = Scrap?.result,
          ScrapCap = `${spaces}*「 T I K T O K 」*\n\n🆔 Aweme ID: ${obj?.aweme_id}\n🌍 Region: ${obj?.region}\n💬 Description: ${obj?.desc}\n🕒 Create Time: ${obj?.create_time}\n👤 Author:\n  🆔 UID: ${obj?.author?.uid}\n  🆔 Unique ID: ${obj?.author?.unique_id}\n  👤 Nickname: ${obj?.author?.nickname}\n  🎂 Birthday: ${obj?.author?.birthday}\n⏱ Duration: ${obj?.duration}\n  🎵 Music: ${obj?.download?.music}\n  🎵 Music Info:\n    🆔 ID: ${obj?.download?.music_info?.id}\n    🎵 Title: ${obj?.download?.music_info?.title}\n    👤 Author: ${obj?.download?.music_info?.author}\n    🔄 Is Original: ${obj?.download?.music_info?.is_original}\n\n${spaces}*[ ${versions} ]*`;
        await conn.sendFile(m.chat, obj?.download?.nowm || obj?.download?.wm || giflogo, "", ScrapCap, m);
      }
      if (13 === parseInt(versions)) {
        let god = await axios.get("https://godownloader.com/api/tiktok-no-watermark-free?url=" + links + "&key=godownloader.com"),
          GoCap = `${spaces}*[ T I K T O K ]*\n\n*Desc:* ${god?.data?.desc}\n\n${spaces}*[ ${versions} ]*`;
        await conn.sendFile(m.chat, god?.data?.video_no_watermark, "", GoCap, m);
      }
      if (14 === parseInt(versions)) {
        let spinner = ora({
          text: "Downloading...",
          spinner: "moon"
        }).start();
        try {
          let video = await fetchVideo(links),
            buffer = await video.download({
              progress: p => {
                let progressText = chalk.blue(`Downloaded ${p.progress}%`) + ` (${chalk.green(p.downloaded)}/${chalk.green(p.total)} bytes)`;
                spinner.text = progressText;
              }
            });
          spinner.succeed(chalk.green("Download completed"));
          let PrevCap = `${spaces}*[ T I K T O K ]*\n\n${getVideoInfo(video)}\n\n${spaces}*[ ${versions} ]*`;
          await conn.sendFile(m.chat, buffer || giflogo, "", PrevCap, m);
        } catch (e) {
          spinner.fail(chalk.red("Download failed")), console.error(e);
        }
      }
      if (15 === parseInt(versions)) {
        let videoX = await Tiktok(links),
          XctCap = `${spaces}*[ T I K T O K ]*\n\n${getUserProfileInfo(videoX)}\n\n${spaces}*[ ${versions} ]*`;
        await conn.sendFile(m.chat, videoX?.download?.nowm || giflogo, "", XctCap, m);
      }
      if (16 === parseInt(versions)) {
        let tdl = await tiktokdl(links),
          tdlC = `${spaces}*[ T I K T O K ]*\n\n${infoTdlData(tdl)}\n\n${spaces}*[ ${versions} ]*`;
        await conn.sendFile(m.chat, tdl?.links[1]?.a || tdl?.links[0]?.a || tdl?.links[2]?.a || tdl?.links[3]?.a || tdl?.links[4]?.a || tdl?.links[5]?.a || tdl?.links[6]?.a || tdl?.links[7]?.a || tdl?.links[8]?.a || giflogo, "", tdlC, m);
      }
      if (17 === parseInt(versions)) {
        let tWm = await TikWmdl(links),
          tWC = `${spaces}*[ T I K T O K ]*\n\n${getUserProfileInfo(tWm)}\n\n${spaces}*[ ${versions} ]*`;
        await conn.sendFile(m.chat, tWm?.download?.nowm || giflogo, "", tWC, m);
      }
      if (18 === parseInt(versions)) {
        let tikLy = await TiklyDown(links),
          tiCLy = `${spaces}*[ T I K T O K ]*\n\n${getUserProfileInfo(tikLy)}\n\n${spaces}*[ ${versions} ]*`;
        await conn.sendFile(m.chat, tikLy?.download?.nowm || giflogo, "", tiCLy, m);
      }
      if (19 === parseInt(versions)) {
        let tikBet = await TikBeta(links),
          tikCbet = `${spaces}*[ T I K T O K ]*\n\n${getUserProfileInfo(tikBet)}\n\n${spaces}*[ ${versions} ]*`;
        await conn.sendFile(m.chat, tikBet?.download?.nowm || giflogo, "", tikCbet, m);
      }
      if (20 === parseInt(versions)) {
        let Estk = await SSSTik(links),
          obj = Estk?.result,
          EstkCap = `${spaces}*「 T I K T O K 」*\n\nℹ️ Type: ${obj.type}\n💬 Description: ${obj.desc}\n👤 Nickname: ${obj.author.nickname}\n📊 Statistics:\n  - Like Count: ${obj.statistics.likeCount}\n  - Comment Count: ${obj.statistics.commentCount}\n  - Share Count: ${obj.statistics.shareCount}\n${spaces}*[ ${versions} ]*`;
        await conn.sendFile(m.chat, obj?.video || obj?.music || giflogo, "", EstkCap, m);
      }
    } catch (e) {
      m.react(eror);
      console.log(e);
    }
  };
handler.help = ["tiktok"], handler.tags = ["downloader"], handler.command = /^t(ik(tok(dl)?|dl)?|t(dl)?)$/i;
export default handler;
async function TikBeta(url) {
  let Utils = {
    API_URL: "https://tools.betabotz.eu.org"
  };
  if (!url) throw new Error("url input is required");
  let params = new URLSearchParams({
    url: url
  }).toString();
  try {
    let apiUrl = `${Utils.API_URL}/tools/tiktokdl?${params}`;
    let res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    let data = await res.json();
    return {
      author: {
        uid: data.result?.data?.author.id,
        nickname: data.result?.data?.author.nickname
      },
      statistics: {
        comment_count: data.result?.data?.comment_count,
        digg_count: data.result?.data?.digg_count
      },
      desc: data.result?.data?.title,
      download: {
        nowm: data.result?.data?.play,
        music_info: {
          title: data.result?.data?.music_info.title
        }
      }
    };
  } catch (error) {
    return {
      status: false,
      error: error.message
    };
  }
}
async function TiklyDown(url, version = "") {
  let Utils = {
    API_URL: "https://api.tiklydown.eu.org"
  };
  if (!url) throw new Error("url input is required");
  let params = new URLSearchParams({
    url: url
  }).toString();
  try {
    let apiUrl = `${Utils.API_URL}/api/download/${version}?${params}`;
    let res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    let data = await res.json();
    return {
      author: {
        uid: data?.author.id,
        nickname: data?.author.name
      },
      statistics: {
        comment_count: data?.stats.commentCount,
        digg_count: data?.stats.likeCount
      },
      desc: data?.title,
      download: {
        nowm: data?.video.noWatermark,
        music_info: {
          title: data?.music.title
        }
      }
    };
  } catch (error) {
    try {
      let apiUrl = `${Utils.API_URL}/api/download/v2?${params}`;
      let res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      let data = await res.json();
      return {
        author: {
          uid: data?.author.id,
          nickname: data?.author.name
        },
        statistics: {
          comment_count: data?.stats.commentCount,
          digg_count: data?.stats.likeCount
        },
        desc: data?.title,
        download: {
          nowm: data?.video.noWatermark,
          music_info: {
            title: data?.music.title
          }
        }
      };
    } catch (error) {
      try {
        let apiUrl = `${Utils.API_URL}/api/download/v3?${params}`;
        let res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        let data = await res.json();
        return {
          author: {
            uid: data?.author.id,
            nickname: data?.author.name
          },
          statistics: {
            comment_count: data?.stats.commentCount,
            digg_count: data?.stats.likeCount
          },
          desc: data?.title,
          download: {
            nowm: data?.video.noWatermark,
            music_info: {
              title: data?.music.title
            }
          }
        };
      } catch (error) {
        try {
          let apiUrl = `${Utils.API_URL}/api/download/v4?${params}`;
          let res = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          });
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          let data = await res.json();
          return {
            author: {
              uid: data?.author.id,
              nickname: data?.author.name
            },
            statistics: {
              comment_count: data?.stats.commentCount,
              digg_count: data?.stats.likeCount
            },
            desc: data?.title,
            download: {
              nowm: data?.video.noWatermark,
              music_info: {
                title: data?.music.title
              }
            }
          };
        } catch (error) {
          throw error;
        }
      }
    }
  }
}
async function TikWmdl(url) {
  try {
    let host = "https://www.tikwm.com";
    let res = await fetch(host + "/api/", {
      method: "POST",
      headers: {
        Accept: "application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Sec-CH-UA": '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
      },
      body: new URLSearchParams({
        url: url,
        count: 12,
        cursor: 0,
        web: 1,
        hd: 1
      })
    });
    let data = await res.json();
    return {
      author: {
        uid: data.data?.author.id,
        nickname: data.data?.author.nickname
      },
      statistics: {
        comment_count: data.data?.comment_count,
        digg_count: data.data?.digg_count
      },
      desc: data.data?.title,
      download: {
        nowm: host + data.data?.play,
        music_info: {
          title: data.data?.music_info.title
        }
      }
    };
  } catch (error) {
    return {
      status: false,
      error: error.message
    };
  }
}
const randomChar = (chars, length) => Array.from({
  length: length
}, () => chars[Math.floor(Math.random() * chars.length)]).join("");
const tiktokParams = (args = {}) => {
  const defaultParams = {
    version_name: "1.1.9",
    version_code: "2018111632",
    build_number: "1.1.9",
    manifest_version_code: "2018111632",
    update_version_code: "2018111632",
    openudid: randomChar("0123456789abcdef", 16),
    uuid: randomChar("1234567890", 16),
    _rticket: Date.now(),
    ts: Math.floor(Date.now() / 1e3),
    device_brand: "Google",
    device_type: "Pixel 4",
    device_platform: "android",
    resolution: "1080*1920",
    dpi: 420,
    os_version: "10",
    os_api: "29",
    carrier_region: "US",
    sys_region: "US",
    region: "US",
    timezone_name: "America/New_York",
    timezone_offset: "-14400",
    channel: "googleplay",
    ac: "wifi",
    mcc_mnc: "310260",
    is_my_cn: 0,
    ssmix: "a",
    as: "a1qwert123",
    cp: "cbfhckdckkde1",
    device_id: "7238642534011110914",
    iid: "7318518857994389254"
  };
  return new URLSearchParams({
    ...defaultParams,
    ...args
  }).toString();
};
const TIKTOK_API_BASE_URL = "https://api.tiktokv.com/aweme/v1/feed/";
const USER_AGENT = "com.zhiliaoapp.musically/300904 (2018111632; U; Android 10; en_US; Pixel 4; Build/QQ3A.200805.001; Cronet/58.0.2991.0)";
const Tikxxen = {
  constructTikTokUrl: params => `${TIKTOK_API_BASE_URL}?${params}`,
  fetchTikTokData: async awemeId => {
    const params = tiktokParams({
      aweme_id: awemeId
    });
    const url = Tikxxen.constructTikTokUrl(params);
    const res = await fetch(url, {
      method: "OPTIONS",
      headers: {
        "User-Agent": USER_AGENT
      }
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  },
  extractAwemeId: url => {
    const match = url.match(/\d{17,21}/);
    return match ? match[0] : null;
  },
  Download: async url => {
    const processedUrl = url.replace("https://vm", "https://vt");
    try {
      const response = await fetch(processedUrl, {
        method: "HEAD"
      });
      const responseUrl = response.url;
      const awemeId = Tikxxen.extractAwemeId(responseUrl);
      if (!awemeId) {
        return {
          status: "error",
          message: "Failed to fetch TikTok URL. Please ensure your TikTok URL is correct."
        };
      }
      const result = await Tikxxen.fetchTikTokData(awemeId);
      const content = result.aweme_list.find(o => o.aweme_id === awemeId);
      if (!content) {
        return {
          status: "error",
          message: "Unsupported content type"
        };
      }
      return {
        status: true,
        result: {
          aweme_id: content.aweme_id || "",
          region: content.region || "",
          desc: content.desc || "",
          create_time: content.create_time || "",
          author: {
            uid: content.author?.uid || "",
            unique_id: content.author?.unique_id || "",
            nickname: content.author?.nickname || "",
            birthday: content.author?.birthday || ""
          },
          duration: content.music?.duration || "",
          download: {
            nowm: content.video?.play_addr?.url_list[0] || "",
            wm: content.video?.download_addr?.url_list[0] || "",
            music: content.music?.play_url?.url_list[0] || "",
            music_info: {
              id: content.music?.id || "",
              title: content.music?.title || "",
              author: content.music?.author || "",
              is_original: content.music?.is_original || "",
              cover_hd: content.music?.cover_hd?.url_list[0] || "",
              cover_large: content.music?.cover_large?.url_list[0] || "",
              cover_medium: content.music?.cover_medium?.url_list[0] || ""
            }
          }
        }
      };
    } catch (error) {
      return {
        status: "error",
        message: "An error occurred while processing the TikTok URL",
        error: error.message
      };
    }
  }
};
async function Tiktokdl(url) {
  try {
    const result = await Tikxxen.Download(url);
    return result;
  } catch (error) {
    console.log(error);
  }
}
const TiktokURLregex = /https:\/\/(?:m|www|vm|vt)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video)\/|\?shareId=|\&item_id=)(\d+))|\w+)/;
async function fetchTT() {
  try {
    const response = await fetch("https://ssstik.io", {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0"
      }
    });
    const data = await response.text();
    const regex = /s_tt\s*=\s*["']([^"']+)["']/;
    const match = data.match(regex);
    if (match) {
      const value = match[1];
      return {
        status: "success",
        result: value
      };
    } else {
      return {
        status: "error",
        message: "Failed to get the request form!"
      };
    }
  } catch (error) {
    return {
      status: "error",
      message: error.message
    };
  }
}
async function SSSTik(url) {
  try {
    if (!TiktokURLregex.test(url)) {
      return {
        status: "error",
        message: "Invalid Tiktok URL. Make sure your url is correct!"
      };
    }
    const tt = await fetchTT();
    if (tt.status !== "success") {
      return {
        status: "error",
        message: tt.message
      };
    }
    const response = await fetch("https://ssstik.io/abc?url=dl", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Origin: "https://ssstik.io",
        Referer: `https://ssstik.io/en`,
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0"
      },
      body: new URLSearchParams({
        id: url,
        locale: "en",
        tt: tt.result
      })
    });
    const data = await response.text();
    const $ = cheerio.load(data);
    const desc = $("p.maintext").text().trim();
    const author = {
      avatar: $("img.result_author").attr("src"),
      nickname: $("h2").text().trim()
    };
    const statistics = {
      likeCount: $("#trending-actions > .justify-content-start").text().trim(),
      commentCount: $("#trending-actions > .justify-content-center").text().trim(),
      shareCount: $("#trending-actions > .justify-content-end").text().trim()
    };
    const images = $("ul.splide__list > li").map((_, img) => $(img).find("a").attr("href")).get();
    if (images.length !== 0) {
      return {
        status: "success",
        result: {
          type: "image",
          desc: desc,
          author: author,
          statistics: statistics,
          images: images,
          music: $("a.music").attr("href")
        }
      };
    } else {
      return {
        status: "success",
        result: {
          type: "video",
          desc: desc,
          author: author,
          statistics: statistics,
          video: $("a.without_watermark").attr("href"),
          music: $("a.music").attr("href")
        }
      };
    }
  } catch (error) {
    return {
      status: "error",
      message: error.message
    };
  }
}

function getVideoInfo(video) {
  return `Video description: ${video?.description || ""}\n🔗 URL: ${video?.url || ""}\n👤 Author: ${video?.author || ""}\n❤️ Likes: ${video?.likes || ""}\n💬 Comments: ${video?.comments || ""}\n🔁 Shares: ${video?.shares || ""}\n▶️ Plays: ${video?.playCount || ""}\n🎵 Music: ${video?.music?.name} - ${video?.music?.author || ""}\n🖼️ Thumbnail URL: ${video?.previewImageUrl}`;
}

function getEmojiCount(count) {
  let emojis = ["👍", "❤️", "🔁", "💬", "🔥"];
  return emojis[Math.floor(Math.random() * emojis.length)] + count.toLocaleString();
}

function getUserProfileInfo(tiktokData) {
  let user = tiktokData.author,
    stats = tiktokData.statistics;
  return `User Profile:\n🆔 Unique ID: ${user?.uid || ""}\n👤 Nickname: ${user?.nickname || ""}\n💬 Description: ${tiktokData?.desc || ""}\n👥 Comments: ${getEmojiCount(stats?.comment_count) || ""}\n👍 Likes: ${getEmojiCount(stats?.digg_count) || ""}\n🎵 Music: ${tiktokData?.download?.music_info?.title || ""}`;
}

function infoTdlData(tdlData) {
  return `User Profile: ${tdlData?.author || ""}\n🆔 Unique ID: ${tdlData?.vid || ""}\n👤 Nickname: ${tdlData?.author_name || ""}\n💬 Description: ${tdlData?.desc || ""}\n🎵 Music: ${tdlData?.links[9]?.s || ""}`;
}