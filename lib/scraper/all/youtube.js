import ytdl from "ytdl-core";
import axios from "axios";
import yts from "yt-search";
import _ from "lodash";
import fetch from "node-fetch";
const bytesToSize = bytes => {
  return new Promise((resolve, reject) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) resolve(`${bytes} ${sizes[i]}`);
    resolve(`${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`);
  });
};
const shortUrl = async url => {
  let res = await fetch("https://arifzyn.xyz/create", {
    method: "POST",
    body: new URLSearchParams(Object.entries({
      url: url,
      costum: ""
    })),
    headers: {
      "context-type": "application/json"
    }
  });
  let response = await res.json();
  return "https://arifzyn.xyz/" + response.result.id;
};
const formated = ms => {
  let h = isNaN(ms) ? "--" : Math.floor(ms / 36e5);
  let m = isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(":");
};
class YouTube {
  ytMp4 = url => {
    return new Promise(async (resolve, reject) => {
      ytdl.getInfo(url).then(async getUrl => {
        let result = [];
        for (let i = 0; i < getUrl.formats.length; i++) {
          let item = getUrl.formats[i];
          if (item.container == "mp4" && item.hasVideo == true && item.hasAudio == true) {
            let {
              qualityLabel,
              contentLength,
              approxDurationMs
            } = item;
            let bytes = await bytesToSize(contentLength);
            result[i] = {
              video: item.url,
              quality: qualityLabel,
              size: bytes,
              duration: formated(parseInt(approxDurationMs))
            };
          }
        }
        let resultFix = result.filter(x => x.video != undefined && x.size != undefined && x.quality != undefined);
        let tinyUrl = resultFix[0].video;
        let title = getUrl.videoDetails.title;
        let desc = getUrl.videoDetails.description;
        let views = parseInt(getUrl.videoDetails.viewCount || 0);
        let likes = getUrl.videoDetails.likes;
        let dislike = getUrl.videoDetails.dislikes;
        let channel = getUrl.videoDetails.ownerChannelName;
        let uploadDate = getUrl.videoDetails.uploadDate;
        let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
        resolve({
          title: title,
          result: tinyUrl,
          quality: resultFix[0].quality,
          size: resultFix[0].size,
          duration: resultFix[0].duration,
          thumb: thumb,
          views: views,
          likes: likes,
          dislike: dislike,
          channel: channel ? channel.replace(/\s(\-\sTopic)/, "") : "Unknown",
          uploadDate: uploadDate,
          desc: desc
        });
      }).catch(reject);
    });
  };
  ytMp3 = url => {
    return new Promise((resolve, reject) => {
      ytdl.getInfo(url).then(async getUrl => {
        let result = [];
        for (let i = 0; i < getUrl.formats.length; i++) {
          let item = getUrl.formats[i];
          if (item.mimeType == 'audio/webm; codecs="opus"') {
            let {
              contentLength,
              approxDurationMs
            } = item;
            let bytes = await bytesToSize(contentLength);
            result[i] = {
              audio: item.url,
              size: bytes,
              duration: formated(parseInt(approxDurationMs))
            };
          }
        }
        let resultFix = result.filter(x => x.audio != undefined && x.size != undefined);
        let tinyUrl = resultFix[0].audio;
        let title = getUrl.videoDetails.title;
        let desc = getUrl.videoDetails.description;
        let views = parseInt(getUrl.videoDetails.viewCount || 0);
        let likes = getUrl.videoDetails.likes;
        let dislike = getUrl.videoDetails.dislikes;
        let channel = getUrl.videoDetails.ownerChannelName;
        let uploadDate = getUrl.videoDetails.uploadDate;
        let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
        resolve({
          title: title,
          result: tinyUrl,
          size: resultFix[0].size,
          duration: resultFix[0].duration,
          thumb: thumb,
          views: views,
          likes: likes,
          dislike: dislike,
          channel: channel ? channel.replace(/\s(\-\sTopic)/, "") : "Unknown",
          uploadDate: uploadDate,
          desc: desc
        });
      }).catch(reject);
    });
  };
  ytPlay = query => {
    return new Promise((resolve, reject) => {
      yts(query).then(async getData => {
        let result = getData.videos.slice(0, 5);
        let url = [];
        for (let i = 0; i < result.length; i++) {
          url.push(result[i].url);
        }
        let random = url[0];
        let getAudio = await this.ytMp3(random);
        resolve(getAudio);
      }).catch(reject);
    });
  };
  ytPlayVid = query => {
    return new Promise((resolve, reject) => {
      yts(query).then(async getData => {
        let result = getData.videos.slice(0, 5);
        let url = [];
        for (let i = 0; i < result.length; i++) {
          url.push(result[i].url);
        }
        let random = url[0];
        let getVideo = await this.ytMp4(random);
        resolve(getVideo);
      }).catch(reject);
    });
  };
}
class YoutubeConverter {
  async analyzeAndConvert(videoUrl) {
    return new Promise(async (resolve, reject) => {
      try {
        const searchData = `query=${encodeURIComponent(videoUrl)}&vt=home`;
        const searchResponse = await axios.post("https://9convert.com/api/ajaxSearch/index", searchData, {
          headers: this.searchHeaders
        });
        const json = searchResponse.data;
        const video = {};
        Object.values(json.links.mp4).forEach(({
          q,
          size,
          k
        }) => {
          video[q] = {
            quality: q,
            fileSizeH: size,
            fileSize: parseFloat(size) * (/MB$/.test(size) ? 1e3 : 1),
            download: () => this.convert(json.vid, k)
          };
        });
        const audio = {};
        Object.values(json.links.mp3).forEach(({
          q,
          size,
          k
        }) => {
          audio[q] = {
            quality: q,
            fileSizeH: size,
            fileSize: parseFloat(size) * (/MB$/.test(size) ? 1e3 : 1),
            download: () => this.convert(json.vid, k)
          };
        });
        const res = {
          id: json.vid,
          title: json.title,
          thumbnail: `https://i.ytimg.com/vi/${json.vid}/0.jpg`,
          video: video,
          audio: audio
        };
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
  async convert(vid, k) {
    return new Promise(async (resolve, reject) => {
      const params = `vid=${vid}&k=${k}`;
      const {
        data
      } = await axios.post("https://9convert.com/api/ajaxConvert/convert", params, {
        headers: {
          "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        }
      });
      if (data.c_status == "CONVERTING") {
        const param = `vid=${vid}&b_id=${data.b_id}`;
        const json = await axios.post("https://9convert.com/api/ajaxConvert/checkTask", params, {
          headers: {
            "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
          }
        });
        resolve(json.data.dlink);
      } else {
        resolve(data.dlink);
      }
    });
  }
}
const YouTubeConvert = async url => {
  return new Promise(async (resolve, reject) => {
    try {
      const converter = new YoutubeConverter();
      const data = await converter.analyzeAndConvert(url);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};
const ytsearch = async (query, maxResults = 5, similarityThreshold = .5) => {
  try {
    const res = await yts(query);
    const videos = _.filter(res.videos.slice(0, maxResults), video => {
      const titleWords = _.words(_.toLower(video.title));
      const queryWords = _.words(_.toLower(query));
      const matchedWords = _.intersection(titleWords, queryWords);
      const similarity = _.size(matchedWords) / _.size(titleWords);
      return similarity >= similarityThreshold || _.size(matchedWords) >= _.size(queryWords) - 1;
    });
    return _.isEmpty(videos) ? {} : _.first(videos);
  } catch (e) {
    console.error(e);
    return {};
  }
};
const search = async (query, limit = 1) => {
  try {
    const searchResult = await ytsearch(query, limit);
    return searchResult ? [{
      title: searchResult.title,
      url: searchResult.url,
      author: searchResult.author,
      views: searchResult.views,
      duration: searchResult.duration,
      uploadedAt: searchResult.uploadedAt
    }] : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
const ytdlget = async url => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://tomp3.cc/api/ajax/search",
    headers: {
      accept: "*/*",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    data: `query=${encodeURIComponent(url)}`
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Request failed");
  }
};
const formatYtdata = (data, {
  type,
  quality
}) => {
  const formatted_data = [];
  const processFormat = format => {
    formatted_data.push({
      vid: data.vid,
      id: format.k,
      size: format.size,
      quality: format.q,
      type: format.f
    });
  };
  _.forOwn(data.links.mp4, processFormat);
  processFormat(data.links.mp3?.mp3128);
  processFormat(data.links["3gp"]?.["3gp@144p"]);
  return _.filter(formatted_data, format => (type ? format.type === type : true) && (quality ? format.quality === quality : true));
};
const ytdlDl = async (vid, k) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://tomp3.cc/api/ajax/convert",
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9,en-IN;q=0.8",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    data: `vid=${vid}&k=${encodeURIComponent(k)}`
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Request failed");
  }
};
const yta = async url => {
  try {
    const data = await ytdlget(url);
    const [formatted] = formatYtdata(data, {
      type: "mp3"
    });
    const {
      id: k,
      vid
    } = formatted || {};
    const response = k && vid ? await ytdlDl(vid, k) : {};
    return {
      ...response,
      sizes: formatted?.size,
      thumb: `https://i.ytimg.com/vi/${vid}/0.jpg`
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get audio");
  }
};
const ytv = async (url, quality = "480p") => {
  try {
    const data = await ytdlget(url);
    const [formatted] = formatYtdata(data, {
      type: "mp4",
      quality: quality
    });
    const {
      id: k,
      vid
    } = formatted || {};
    const response = k && vid ? await ytdlDl(vid, k) : {};
    return {
      ...response,
      sizes: formatted?.size,
      thumb: `https://i.ytimg.com/vi/${vid}/0.jpg`
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get video");
  }
};
const ytsdl = async (query, type = "audio") => {
  try {
    const searchResults = await search(query);
    const url = searchResults[0]?.url;
    return type === "audio" ? await yta(url) : type === "video" ? await ytv(url) : Promise.reject(new Error("Invalid type. Use 'audio' or 'video'"));
  } catch (error) {
    console.error(error);
    throw new Error("Search download failed");
  }
};
export {
  yta,
  ytv,
  ytdlDl,
  ytdlget,
  formatYtdata,
  ytsdl
};
export const youtube = new YouTube();
export {
  YouTubeConvert as youtubev2
};