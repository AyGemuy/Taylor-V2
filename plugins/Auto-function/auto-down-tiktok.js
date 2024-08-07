import axios from "axios";
import got from "got";
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
  ShortLink
} from "../../lib/tools/shortlink.js";
const short = new ShortLink();
export async function before(m) {
  if (m.isBaileys || !m.text) return !1;
  const matches = m.text.trim().match(/(http(?:s)?:\/\/)?(?:www\.)?(?:tiktok\.com\/@[^\/]+\/video\/(\d+))|(http(?:s)?:\/\/)?vm\.tiktok\.com\/([^\s&]+)|(http(?:s)?:\/\/)?vt\.tiktok\.com\/([^\s&]+)/g),
    chat = db.data.chats[m.chat];
  if (!matches || !matches[0] || !0 !== chat.autodlTiktok) return;
  let lister = Array.from({
      length: 15
    }, (_, index) => `v${index + 1}`),
    [links, versions] = [matches[0], null];
  versions = versions || lister[Math.floor(Math.random() * lister.length)];
  let spaces = "                ";
  if (!lister.includes(versions.toLowerCase())) return m.reply("*Example:*\nlink v2\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v.toUpperCase()).join("\n"));
  try {
    if (!links) return m.reply("Input query link");
    if ("v1" === versions) {
      let video = await tiktokJs.aweme(links),
        caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n❤️ Views: ${video?.stats?.total_views || ""}\n💬 Comments: ${video?.stats?.total_comment || ""}\n🔁 Shares: ${video?.stats?.total_share || ""}\n▶️ Download: ${video?.stats?.total_download || ""}\n🎵 Music: ${video?.music?.title} - ${video?.music?.author || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Aweme ]*`;
      await this.sendFile(m.chat, video?.videos[0] || video?.videos[1] || video?.videos[2] || giflogo, "", caption, m);
    }
    if ("v2" === versions) {
      let video = await tiktokJs.musicaldown(links),
        caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n🎵 Music: ${video?.music?.title || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Musicaldown ]*`;
      await this.sendFile(m.chat, video?.videos[0] || video?.videos[1] || video?.videos[2] || giflogo, "", caption, m);
    }
    if ("v3" === versions) {
      let video = await tiktokJs.savetik(links),
        caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n🎵 Music: ${video?.music?.title || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Savetik ]*`;
      await this.sendFile(m.chat, video?.videos[0] || video?.videos[1] || video?.videos[2] || giflogo, "", caption, m);
    }
    if ("v4" === versions) {
      let video = await tiktokJs.snaptik(links),
        caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n❤️ Views: ${video?.total_views || ""}\n💬 Comments: ${video?.total_comment || ""}\n🎵 Music: ${video?.music?.title} - ${video?.music?.author || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Snaptik ]*`;
      await this.sendFile(m.chat, video?.videos[0] || video?.videos[1] || video?.videos[2] || giflogo, "", caption, m);
    }
    if ("v5" === versions) {
      let video = await tiktokJs.snaptikpro(links),
        caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n❤️ Views: ${video?.total_views || ""}\n💬 Comments: ${video?.total_comment || ""}\n🎵 Music: ${video?.music?.title} - ${video?.music?.author || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Snaptikpro ]*`;
      await this.sendFile(m.chat, video?.videos || video?.videos[0] || video?.videos[1] || giflogo, "", caption, m);
    }
    if ("v6" === versions) {
      let video = await tiktokJs.ssstik(links),
        caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n❤️ Views: ${video?.total_views || ""}\n💬 Comments: ${video?.total_comment || ""}\n🎵 Music: ${video?.music?.title} - ${video?.music?.author || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Ssstik ]*`;
      await this.sendFile(m.chat, video?.videos || video?.videos[0] || video?.videos[1] || giflogo, "", caption, m);
    }
    if ("v7" === versions) {
      let video = await tiktokJs.tikcdn(links),
        caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n❤️ Views: ${video?.stats?.total_views || ""}\n💬 Comments: ${video?.stats?.total_comment || ""}\n🔁 Shares: ${video?.stats?.total_share || ""}\n▶️ Download: ${video?.stats?.total_download || ""}\n🎵 Music: ${video?.music?.title} - ${video?.music?.author || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Tikcdn ]*`;
      await this.sendFile(m.chat, video?.videos[0] || video?.videos[1] || giflogo, "", caption, m);
    }
    if ("v8" === versions) {
      let video = await tiktokJs.tikmate(links),
        caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n❤️ Views: ${video?.total_views || ""}\n💬 Comments: ${video?.total_comment || ""}\n🎵 Music: ${video?.music?.title} - ${video?.music?.author || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Tikmate ]*`;
      await this.sendFile(m.chat, video?.videos || video?.videos[0] || giflogo, "", caption, m);
    }
    if ("v9" === versions) {
      let video = await tiktokJs.tiktokdownloadr(links),
        caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n❤️ Views: ${video?.total_views || ""}\n💬 Comments: ${video?.total_comment || ""}\n🎵 Music: ${video?.music?.title} - ${video?.music?.author || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Tiktokdownloadr ]*`;
      await this.sendFile(m.chat, video?.videos[0] || video?.videos[1] || video?.videos[2] || giflogo, "", caption, m);
    }
    if ("v10" === versions) {
      let video = await tiktokJs.tikwm(links),
        caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n❤️ Views: ${video?.stats?.total_views || ""}\n💬 Comments: ${video?.stats?.total_comment || ""}\n🔁 Shares: ${video?.stats?.total_share || ""}\n▶️ Download: ${video?.stats?.total_download || ""}\n🎵 Music: ${video?.music?.title} - ${video?.music?.author || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Tikwm ]*`;
      await this.sendFile(m.chat, video?.videos || video?.videos[0] || giflogo, "", caption, m);
    }
    if ("v11" === versions) {
      let video = await tiktokJs.ttdownloader(links),
        caption = `${spaces}*[ T I K T O K ]*\n🔗 ID: ${video?.video_id || ""}\n👤 Author: ${video?.author?.name || ""}\n❤️ Views: ${video?.total_views || ""}\n💬 Comments: ${video?.total_comment || ""}\n🎵 Music: ${video?.music?.title} - ${video?.music?.author || ""}\n🖼️ Thumbnail URL: ${await short.tinyurl(video?.thumbnail) || ""}\n${spaces}*[ Ttdownloader ]*`;
      await this.sendFile(m.chat, video?.videos || video?.videos[0] || giflogo, "", caption, m);
    }
    if ("v12" === versions) {
      let Scrap = await Tiktokdl(links),
        S = Scrap?.result,
        obj = S,
        ScrapCap = `${spaces}*「 T I K T O K 」*\n\n🆔 Aweme ID: ${obj?.aweme_id}\n🌍 Region: ${obj?.region}\n💬 Description: ${obj?.desc}\n🕒 Create Time: ${obj?.create_time}\n👤 Author:\n  🆔 UID: ${obj?.author?.uid}\n  🆔 Unique ID: ${obj?.author?.unique_id}\n  👤 Nickname: ${obj?.author?.nickname}\n  🎂 Birthday: ${obj?.author?.birthday}\n⏱ Duration: ${obj?.duration}\n⬇️ Download:\n  ▶️ Nowm: ${await short.tinyurl(obj?.download?.nowm)}\n  ▶️ WM: ${await short.tinyurl(obj?.download?.wm)}\n  🎵 Music: ${obj?.download?.music}\n  🎵 Music Info:\n    🆔 ID: ${obj?.download?.music_info?.id}\n    🎵 Title: ${obj?.download?.music_info?.title}\n    👤 Author: ${obj?.download?.music_info?.author}\n    🔄 Is Original: ${obj?.download?.music_info?.is_original}\n\n${spaces}*[ ${versions.toUpperCase()} ]*`;
      await this.sendFile(m.chat, obj?.download?.nowm || obj?.download?.wm || obj?.download?.nowm || giflogo, "", ScrapCap, m);
    }
    if ("v13" === versions) {
      let god = await axios.get("https://godownloader.com/api/tiktok-no-watermark-free?url=" + links + "&key=godownloader.com"),
        GoCap = `${spaces}*[ T I K T O K ]*\n\n*Desc:* ${god?.data?.desc}\n\n${spaces}*[ ${versions.toUpperCase()} ]*`;
      await this.sendFile(m.chat, god?.data?.video_no_watermark, "", GoCap, m);
    }
    if ("v14" === versions) {
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
        let PrevCap = `${spaces}*[ T I K T O K ]*\n\n${getVideoInfo(video)}\n\n${spaces}*[ ${versions.toUpperCase()} ]*`;
        await this.sendFile(m.chat, buffer || giflogo, "", PrevCap, m);
      } catch (e) {
        spinner.fail(chalk.red("Download failed")), console.error(e);
      }
    }
    if ("v15" === versions) {
      let videoX = await Tiktok(links),
        XctCap = `${spaces}*[ T I K T O K ]*\n\n${getUserProfileInfo(videoX)}\n\n${spaces}*[ ${versions.toUpperCase()} ]*`;
      await this.sendFile(m.chat, videoX?.download?.nowm || giflogo, "", XctCap, m);
    }
  } catch (e) {
    m.reply(e.toString());
  }
}
export const disabled = !1;
async function Tiktokdl(url) {
  function ranGen(charset, length) {
    let result = "";
    const charactersLength = charset.length;
    for (let i = 0; i < length; i++) result += charset.charAt(Math.floor(Math.random() * charactersLength));
    return result;
  }
  let valid = await async function(url) {
    let Konto1 = /video\/([\d|\+]+)?\/?/,
      valid = url.match(Konto1);
    if (valid) return valid[1];
    try {
      let _valid = (await fetch(url, {
        headers: {
          "Accept-Encoding": "deflate"
        },
        redirect: "manual"
      })).headers.get("location").match(Konto1);
      if (_valid) return _valid[1];
    } catch (e) {
      return !1;
    }
  }(url);
  if (!valid) return {
    status: !1,
    result: "Invalid URL"
  };
  let apiUrl = await async function(videoId) {
    const API = {
      AID: 0,
      APP_NAME: "musical_ly",
      HOSTNAME: "api22-normal-c-alisg.tiktokv.com",
      API_V: "v1",
      VERSION_WORKING: !1,
      FORMATS: ["play_addr", "play_addr_h264", "play_addr_bytevc1", "download_addr"],
      VERSIONS: [
        ["26.1.3", "260103"],
        ["26.1.2", "260102"],
        ["26.1.1", "260101"],
        ["25.6.2", "250602"],
        ["24.1.5", "240105"]
      ],
      constructApiQuery: async (videoId, appVersion, manifestAppVersion) => {
        const ts = Math.round(Date.now() / 1e3),
          parameters = {
            aweme_id: videoId,
            version_name: appVersion,
            version_code: manifestAppVersion,
            build_number: appVersion,
            manifest_version_code: manifestAppVersion,
            update_version_code: manifestAppVersion,
            openudid: ranGen("0123456789abcdef", 16),
            uuid: ranGen("0123456789", 16),
            _rticket: 1e3 * ts,
            ts: ts,
            device_brand: "Google",
            device_type: "ASUS_Z01QD",
            device_platform: "android",
            iid: "7318518857994389254",
            device_id: "7318517321748022790",
            resolution: "1080*1920",
            dpi: 420,
            os_version: "10",
            os_api: "29",
            carrier_region: "US",
            sys_region: "US",
            region: "US",
            app_name: API.APP_NAME,
            app_language: "en",
            language: "en",
            timezone_name: "America/New_York",
            timezone_offset: "-14400",
            channel: "googleplay",
            ac: "wifi",
            mcc_mnc: "310260",
            is_my_cn: 0,
            aid: API.AID,
            ssmix: "a",
            as: "a1qwert123",
            cp: "cbfhckdckkde1"
          },
          queryParams = Object.keys(parameters).map((key, index) => `${index > 0 ? "&" : "?"}${key}=${parameters[key]}`).join("");
        return `https://${API.HOSTNAME}/aweme/${API.API_V}/feed/${queryParams}`;
      }
    };
    return await API.constructApiQuery(videoId, API.VERSIONS[0][0], API.VERSIONS[0][1]);
  }(valid), data = await fetch(apiUrl, {
    headers: {
      "Accept-Encoding": "deflate",
      "User-Agent": "okhttp/3.14.9"
    }
  });
  if (!data.ok) return {
    status: !1,
    result: "Error fetching data"
  };
  let obj = (await data.json()).aweme_list.find(o => o.aweme_id === valid);
  return {
    status: !0,
    result: {
      aweme_id: obj?.aweme_id || "",
      region: obj?.region || "",
      desc: obj?.desc || "",
      create_time: obj?.create_time || "",
      author: {
        uid: obj?.author?.uid || "",
        unique_id: obj?.author?.unique_id || "",
        nickname: obj?.author?.nickname || "",
        birthday: obj?.author?.birthday || ""
      },
      duration: obj?.music?.duration || "",
      download: {
        nowm: obj?.video?.play_addr?.url_list[0] || "",
        wm: obj?.video?.download_addr?.url_list[0] || "",
        music: obj?.music?.play_url?.url_list[0] || "",
        music_info: {
          id: obj?.music?.id || "",
          title: obj?.music?.title || "",
          author: obj?.music?.author || "",
          is_original: obj?.music?.is_original || "",
          cover_hd: obj?.music?.cover_hd?.url_list[0] || "",
          cover_large: obj?.music?.cover_large?.url_list[0] || "",
          cover_medium: obj?.music?.cover_medium.url_list[0] || ""
        }
      }
    }
  };
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