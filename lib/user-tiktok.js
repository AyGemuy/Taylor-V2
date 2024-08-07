import axios from "axios";
export default async function getUserTikTokData(username) {
  return new Promise(async resolve => {
    try {
      const json = await (await axios.get("https://tiktok-video-no-watermark2.p.rapidapi.com/user/posts?unique_id=@" + username + "&count=15", {
        headers: {
          Accept: "*/*",
          "User-Agent": "TikTok 16.6.5 rv:166515 (iPhone; iOS 13.6; en_US) Cronet",
          Origin: "https://tik.storyclone.com",
          Referer: "https://tik.storyclone.com/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          "sec-ch-ua": '"Chromium";v="107", "Not=A?Brand";v="24"',
          "sec-ch-ua-platform": "Android",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-rapiapi-host": "tiktok-video-no-watermark2.p.rapidapi.com",
          "x-rapidapi-key": "533115be6amsh2515f73f171c6f1p160d9djsn833294e42f10",
          "x-requested-with": "XMLHttpRequest"
        }
      })).data.data.videos;
      if (json.length < 1) return resolve({
        creator: "Wudysoft",
        status: !1,
        msg: "Content not available!"
      });
      const data = [];
      json.map(v => data.push({
        caption: v.title,
        author: {
          ...v.author,
          username: v.author.unique_id
        },
        stats: {
          play_count: v.play_count,
          digg_count: v.digg_count,
          share_count: v.share_count,
          comment_count: v.comment_count
        },
        music: v.music_info,
        duration: v.duration,
        video: v.play
      })), resolve({
        creator: "Wudysoft",
        status: !0,
        data: data[Math.floor(Math.random() * data.length)]
      });
    } catch (e) {
      console.log(e), resolve({
        creator: "Wudysoft",
        status: !1,
        msg: e.message
      });
    }
  });
}