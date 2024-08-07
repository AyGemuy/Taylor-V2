import axios from "axios";
import cheerio from "cheerio";
import ytdl from "ytdl-core";
import fetch from "node-fetch";
import yts from "yt-search";
async function ytshort(Url, type = "mp4") {
  let {
    data: html
  } = await axios.post("https://ytdownloadid.herokuapp.com/download", {
    "choices-single-default": "mp4" === format ? "Mp4 / Video" : "Mp3 / Audio",
    url: Url
  });
  return cheerio.load(html)("div.s003 > div.first-wrap > button").attr("onclick").split(" = ")[1].replace(/[\"]/g, "");
}
async function ytmp4(url) {
  return new Promise((resolve, reject) => {
    try {
      const id = ytdl.getVideoID(url);
      const yutub = ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`).then(data => {
        let pormat = data.formats;
        let video = [];
        for (let i = 0; i < pormat.length; i++) {
          if (pormat[i].container == "mp4" && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
            let vid = pormat[i];
            video.push(vid.url);
          }
        }
        const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText;
        const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
        const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName;
        const views = data.player_response.microformat.playerMicroformatRenderer.viewCount;
        const published = data.player_response.microformat.playerMicroformatRenderer.publishDate;
        const duration = data.player_response.lengthSeconds;
        const result = {
          title: title,
          duration: duration,
          thumb: thumb,
          channel: channel,
          published: published,
          views: views,
          url: video[0]
        };
        return result;
      });
      resolve(yutub);
    } catch (error) {
      reject(error);
    }
    console.log(error);
  });
}
async function ytmp3(url) {
  try {
    const {
      videoDetails
    } = await ytdl.getInfo(url, {
      lang: "id"
    });
    const stream = ytdl(url, {
      filter: "audioonly",
      quality: 140
    });
    const chunks = [];
    stream.on("data", chunk => {
      chunks.push(chunk);
    });
    await new Promise((resolve, reject) => {
      stream.on("end", resolve);
      stream.on("error", reject);
    });
    const buffer = Buffer.concat(chunks);
    return {
      meta: {
        title: videoDetails.title,
        channel: videoDetails.author.name,
        seconds: videoDetails.lengthSeconds,
        description: videoDetails.description,
        image: videoDetails.thumbnails.slice(-1)[0].url
      },
      buffer: buffer,
      size: buffer.length
    };
  } catch (error) {
    throw error;
  }
}

function formatNumber(num) {
  const numString = Math.abs(num).toString(),
    numDigits = numString.length;
  if (numDigits <= 3) return numString;
  const suffixIndex = Math.floor((numDigits - 1) / 3);
  let formattedNum = (num / Math.pow(1e3, suffixIndex)).toFixed(1);
  return formattedNum.endsWith(".0") && (formattedNum = formattedNum.slice(0, -2)),
    formattedNum + ["", "k", "M", "B", "T"][suffixIndex];
}
async function ytsearch(query, maxResults = 100, similarityThreshold = .5) {
  try {
    const res = await yts(query),
      videos = res.videos.slice(0, maxResults).filter(video => {
        const titleWords = video.title.toLowerCase().split(" "),
          queryWords = query.toLowerCase().split(" ");
        return titleWords.filter(word => queryWords.includes(word)).length / titleWords.length >= similarityThreshold;
      });
    return videos.length > 0 ? videos[0] : res.videos.length > 0 ? res.videos[0] : {};
  } catch (e) {
    return console.error(e), {};
  }
}
export {
  ytmp4,
  ytmp3,
  formatNumber,
  ytsearch,
  ytshort
};