import axios from "axios";
import * as cheerio from "cheerio";
import ytdl from "ytdl-core";
import fetch from "node-fetch";
import yts from "yt-search";
import { stringify } from "querystring";
const kuki = {
  requestOptions: {
    headers: {
      cookie:
        "SID=g.a000nwi0qfCP7MA_pUTLV7T_VqTuMqXW61ic0zpNayXP8JVtvuY9vWM9hz80ktp-wqZT6YQgKgACgYKARkSARASFQHGX2Mir5zoflKiX9chraiZUNJ7URoVAUF8yKqHpUstOP9aBLNV-YHJWBaV0076; APISID=7bCoXkMGV-dYa5jq/AglRaj8SihR85ej_9; SAPISID=tWS9LmzgyWefwIa9/AwbdEOM7HcqsNCwgh; __Secure-1PAPISID=tWS9LmzgyWefwIa9/AwbdEOM7HcqsNCwgh; __Secure-3PAPISID=tWS9LmzgyWefwIa9/AwbdEOM7HcqsNCwgh; PREF=f4=4000000&tz=Asia.Makassar; SIDCC=AKEyXzUd7hrow1igpjOe7wSVN3Wm2fA0ETxZaCSgMWtSZa9vhqWccTPeE1NobI8wenHTZMPE;",
    },
  },
};
class YTDL {
  constructor() {
    this.client = kuki;
  }
  async ytmp4(url) {
    try {
      const yt = await ytdl.getInfo(url, this.client);
      const link = ytdl.chooseFormat(yt.formats, {
        quality: "highest",
        filter: "audioandvideo",
      });
      try {
        const headRes = await fetch(link.url, {
          method: "HEAD",
        });
        const contentType = headRes.headers.get("content-type");
        return headRes.ok
          ? {
              url: link.url,
              buffer: Buffer.from(
                await fetch(link.url, {
                  headers: {
                    Referer: url,
                  },
                }).then((res) => res.arrayBuffer()),
              ),
              contentType: contentType,
              title: yt.videoDetails.title,
              description: yt.videoDetails.description,
              author: yt.videoDetails.author.name,
            }
          : null;
      } catch {
        return null;
      }
    } catch (error) {
      console.error("An error occurred while fetching video info:", error);
      return null;
    }
  }
  async ytmp3(url) {
    try {
      const yt = await ytdl.getInfo(url, this.client);
      const link = ytdl.chooseFormat(yt.formats, {
        quality: "highestaudio",
      });
      try {
        const headRes = await fetch(link.url, {
          method: "HEAD",
        });
        const contentType = headRes.headers.get("content-type");
        return headRes.ok
          ? {
              url: link.url,
              buffer: Buffer.from(
                await fetch(link.url, {
                  headers: {
                    Referer: url,
                  },
                }).then((res) => res.arrayBuffer()),
              ),
              contentType: contentType,
              title: yt.videoDetails.title,
              description: yt.videoDetails.description,
              author: yt.videoDetails.author.name,
            }
          : null;
      } catch {
        return null;
      }
    } catch (error) {
      console.error("An error occurred while fetching audio info:", error);
      return null;
    }
  }
}
async function ytshort(Url, type = "mp4") {
  let { data: html } = await axios.post(
    "https://ytdownloadid.herokuapp.com/download",
    {
      "choices-single-default":
        "mp4" === format ? "Mp4 / Video" : "Mp3 / Audio",
      url: Url,
    },
  );
  return cheerio
    .load(html)("div.s003 > div.first-wrap > button")
    .attr("onclick")
    .split(" = ")[1]
    .replace(/[\"]/g, "");
}
async function ytmp4(url) {
  try {
    const id = ytdl.getVideoID(url, kuki);
    const data = await ytdl.getInfo(
      `https://www.youtube.com/watch?v=${id}`,
      kuki,
    );
    const formats = data.formats;
    const video = formats
      .filter(
        (format) =>
          format.container === "mp4" && format.hasVideo && format.hasAudio,
      )
      .map((format) => format.url);
    const title =
      data.player_response.microformat.playerMicroformatRenderer.title
        .simpleText;
    const thumb =
      data.player_response.microformat.playerMicroformatRenderer.thumbnail
        .thumbnails[0].url;
    const channel =
      data.player_response.microformat.playerMicroformatRenderer
        .ownerChannelName;
    const views =
      data.player_response.microformat.playerMicroformatRenderer.viewCount;
    const published =
      data.player_response.microformat.playerMicroformatRenderer.publishDate;
    const duration = data.player_response.lengthSeconds;
    return {
      title: title,
      duration: duration,
      thumb: thumb,
      channel: channel,
      published: published,
      views: views,
      url: video[0],
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function ytmp3(url) {
  try {
    const { videoDetails } = await ytdl.getInfo(url, kuki);
    const stream = ytdl(url, {
      filter: "audioonly",
      quality: 140,
      requestOptions: kuki.requestOptions,
    });
    const chunks = [];
    stream.on("data", (chunk) => {
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
        image: videoDetails.thumbnails.slice(-1)[0].url,
      },
      buffer: buffer,
      size: buffer.length,
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
  return (
    formattedNum.endsWith(".0") && (formattedNum = formattedNum.slice(0, -2)),
    formattedNum + ["", "k", "M", "B", "T"][suffixIndex]
  );
}
async function ytsearch(query, maxResults = 100, similarityThreshold = 0.5) {
  try {
    const res = await yts(query),
      videos = res.videos.slice(0, maxResults).filter((video) => {
        const titleWords = video.title.toLowerCase().split(" "),
          queryWords = query.toLowerCase().split(" ");
        return (
          titleWords.filter((word) => queryWords.includes(word)).length /
            titleWords.length >=
          similarityThreshold
        );
      });
    return videos.length > 0
      ? videos[0]
      : res.videos.length > 0
        ? res.videos[0]
        : {};
  } catch (e) {
    return console.error(e), {};
  }
}
const videoId = (url) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/)([\w\-]+)/,
  );
  return match?.[1] ?? "VideoId tidak ditemukan";
};
const Ytdl = {
  search: async (q) => {
    try {
      const result = (await yts(q)).videos;
      return {
        status: true,
        data: result.map(({ title, videoId, image, author }) => ({
          title: title,
          url: `https://youtu.be/${videoId}`,
          img: image,
          author: author,
        })),
      };
    } catch {
      return {
        status: false,
        msg: "Data tidak dapat di temukan!",
      };
    }
  },
  mp4: async (url) => {
    try {
      const serverResponse = await fetch(
        "https://proxy.ezmp3.cc/api/getServer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const { serverURL } = await serverResponse.json();
      const convertResponse = await fetch(`${serverURL}/api/convert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          quality: 128,
          trim: false,
          startT: 0,
          endT: 0,
          videoLength: 4,
          restricted: false,
          code: 0,
        }),
      });
      const { title = new Date().toISOString(), url: downloadUrl } =
        await convertResponse.json();
      const downloadResponse = await fetch(
        "https://ssyoutube.com.co/mates/en/convert?id=YgEl3OEU2DA",
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/javascript, */*; q=0.01",
            "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Sec-Ch-Ua": '"Not-A.Brand";v="99", "Chromium";v="124"',
            "Sec-Ch-Ua-Mobile": "?1",
            "Sec-Ch-Ua-Platform": '"Android"',
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            Referer: "https://ssyoutube.com.co/en111bv/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
          body: `platform=youtube&url=${encodeURIComponent(url)}&title=${title}&id=YgEl3OEU2DA&ext=mp4&note=720p&format=136`,
        },
      );
      const downloadData = await downloadResponse.json();
      try {
        const headRes = await fetch(downloadUrl || downloadData.downloadUrlX, {
          method: "HEAD",
        });
        const contentType = headRes.headers.get("content-type");
        return headRes.ok
          ? {
              url: downloadUrl || downloadData.downloadUrlX,
              buffer: Buffer.from(
                await fetch(downloadUrl || downloadData.downloadUrlX, {
                  headers: {
                    Referer: url,
                  },
                }).then((res) => res.arrayBuffer()),
              ),
              contentType: contentType,
              title: title,
            }
          : null;
      } catch {
        return null;
      }
    } catch {
      return {
        status: false,
        msg: "Gagal saat mengambil data!",
      };
    }
  },
  mp3: async (url) => {
    try {
      const serverResponse = await fetch(
        "https://proxy.ezmp3.cc/api/getServer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const { serverURL } = await serverResponse.json();
      const convertResponse = await fetch(`${serverURL}/api/convert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          quality: 128,
          trim: false,
          startT: 0,
          endT: 0,
          videoLength: 4,
          restricted: false,
          code: 0,
        }),
      });
      const { title = new Date().toISOString(), url: downloadUrl } =
        await convertResponse.json();
      const downloadResponse = await fetch(
        "https://ssyoutube.com.co/mates/en/convert?id=YgEl3OEU2DA",
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/javascript, */*; q=0.01",
            "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Sec-Ch-Ua": '"Not-A.Brand";v="99", "Chromium";v="124"',
            "Sec-Ch-Ua-Mobile": "?1",
            "Sec-Ch-Ua-Platform": '"Android"',
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            Referer: "https://ssyoutube.com.co/en111bv/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
          body: `platform=youtube&url=${encodeURIComponent(url)}&title=${title}&id=YgEl3OEU2DA&ext=mp4&note=720p&format=136`,
        },
      );
      const downloadData = await downloadResponse.json();
      try {
        const headRes = await fetch(downloadUrl || downloadData.downloadUrlX, {
          method: "HEAD",
        });
        const contentType = headRes.headers.get("content-type");
        return headRes.ok
          ? {
              url: downloadUrl || downloadData.downloadUrlX,
              buffer: Buffer.from(
                await fetch(downloadUrl || downloadData.downloadUrlX, {
                  headers: {
                    Referer: url,
                  },
                }).then((res) => res.arrayBuffer()),
              ),
              contentType: contentType,
              title: title,
            }
          : null;
      } catch {
        return null;
      }
    } catch {
      return {
        status: false,
        msg: "Gagal saat mengambil data!",
      };
    }
  },
  all: async (u, f) => {
    const downloadUrl = await getMP3(u, f);
    try {
      const headRes = await fetch(downloadUrl, {
        method: "HEAD",
      });
      const contentType = headRes.headers.get("content-type");
      return headRes.ok
        ? {
            url: downloadUrl,
            buffer: Buffer.from(
              await fetch(downloadUrl, {
                headers: {
                  Referer: url,
                },
              }).then((res) => res.arrayBuffer()),
            ),
            contentType: contentType,
            title: new Date().toISOString(),
          }
        : null;
    } catch {
      return null;
    }
  },
};
async function getMP3(videolink, frmt = "mp3") {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        -1 < videolink.indexOf("youtu.be") ||
        -1 < videolink.indexOf("youtube.com/shorts/")
      ) {
        videolink =
          "https://www.youtube.com/watch?v=" +
          /\/([a-zA-Z0-9\-\_]{11})/.exec(videolink)[1];
      } else if (-1 < videolink.indexOf("youtube.com")) {
        videolink =
          "https://www.youtube.com/watch?v=" +
          /v\=([a-zA-Z0-9\-\_]{11})/.exec(videolink)[1];
      } else {
        videolink = null;
      }
      if (!videolink) reject("Invalid video link youtube");
      const mxios = axios.create({
        headers: {
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
          Origin: "https://ytmp3s.nu",
          Pragma: "no-cache",
          Referer: "https://ytmp3s.nu/",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "cross-site",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
          "sec-ch-ua":
            '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "x-forwarded-for": generateRandomIP(),
        },
      });
      const convresp = await mxios.get("https://nu.ummn.nu/api/v1/init", {
        params: {
          1337: "M17n1ck",
          p: "y",
          _: Math.random(),
        },
      });
      const conlink = await validate(convresp);
      const mainresp = await progress(
        `${conlink.convertURL}&v=${videolink}&f=${frmt}&_=${Math.random()}`,
      );
      await checkProgress(mainresp.progressURL);
      resolve(mainresp.downloadURL);
      async function validate(response) {
        return new Promise((resolve, reject) => {
          if (response.status != 200)
            return reject(response.statusText || "NO STATUS");
          const conlink = response.data;
          if (conlink.error != "0")
            return reject(JSON.stringify(conlink) || "NO ERROR");
          return resolve(conlink);
        });
      }
      async function progress(link) {
        return new Promise(async (resolve, reject) => {
          try {
            const response = await mxios.get(link);
            let data = await validate(response);
            const redirect = data.redirectURL;
            if (redirect) {
              data = await progress(redirect);
            }
            resolve(data);
          } catch (e) {
            reject(e);
          }
        });
      }
      async function checkProgress(progresslink) {
        let attempts = 0;
        const maxAttempts = 10;
        return new Promise((resolve, reject) => {
          const interval = setInterval(async () => {
            attempts++;
            const response = await mxios.get(progresslink);
            const { progress, error } = response.data;
            if (progress === 3) {
              clearInterval(interval);
              resolve("Success");
            } else if (progress === 0 || error !== 0) {
              if (error !== 0) {
                clearInterval(interval);
                reject(new Error("Error, Not valid video/video is private"));
              }
              if (attempts >= maxAttempts) {
                clearInterval(interval);
                reject(new Error("Error happened / timeout"));
              }
            }
            if (attempts >= maxAttempts) {
              clearInterval(interval);
              reject(new Error("Error max attempts, reset"));
            }
          }, 3e3);
        });
      }

      function generateRandomIP() {
        const randomOctet = () => Math.floor(Math.random() * 256);
        return `${randomOctet()}.${randomOctet()}.${randomOctet()}.${randomOctet()}`;
      }
    } catch (e) {
      reject(e);
    }
  });
}
const youtubedl = new YTDL();
class Invidious {
  constructor() {
    this.baseUrls = ["https://invidious.jing.rocks"];
    this.okBaseUrl = null;
  }
  async checkStatus() {
    for (const url of this.baseUrls) {
      try {
        const response = await fetch(url, {
          method: "HEAD",
        });
        if (response.ok) {
          this.okBaseUrl = url;
          break;
        }
      } catch (error) {
        console.error("Error:", error);
        continue;
      }
    }
  }
  async detail(v, type = "mp4") {
    try {
      const isBaseUrlOk = await this.checkStatus();
      const apiUrl = this.okBaseUrl;
      const body = await (await fetch(`${apiUrl}/watch?v=${v}`)).text();
      const $ = cheerio.load(body);
      const playerData = JSON.parse($("#player_data").html());
      const videoInfo = {
        title: playerData.title || "N/A",
        description: playerData.description || "N/A",
        thumbnail: `https://www.youtube.com${playerData.thumbnail || ""}`,
        aspectRatio: playerData.aspect_ratio || "16:9",
        sources: [
          ...$("video source")
            .map((i, el) => ({
              src: `${apiUrl}${$(el).attr("src")}`,
              type: $(el).attr("type"),
            }))
            .get(),
        ],
        captions: [
          ...$("video track")
            .map((i, el) => ({
              kind: $(el).attr("kind"),
              src: `${apiUrl}${$(el).attr("src")}`,
            }))
            .get(),
        ],
      };
      if (videoInfo) {
        const { title, sources } = videoInfo;
        for (const urlObj of sources.flat()) {
          const url = urlObj.src;
          const response = await fetch(url, {
            method: "HEAD",
          });
          if (response.ok) {
            const bufferResponse = await fetch(url, {
              headers: {
                Referer: `${apiUrl}/watch?v=${v}`,
              },
            });
            const buffer = await bufferResponse.arrayBuffer();
            if (buffer && buffer.length !== 0) {
              return {
                title: title,
                url: url,
                buffer: Buffer.from(buffer),
                contentType: type === "mp4" ? "video/mp4" : "audio/mp3",
                detail: videoInfo,
              };
            }
          }
        }
      }
      return null;
    } catch (error) {
      console.error("Error fetching video details:", error);
      return {};
    }
  }
  async search(q) {
    try {
      const isBaseUrlOk = await this.checkStatus();
      const apiUrl = this.okBaseUrl;
      const body = await (await fetch(`${apiUrl}/search?q=${q}`)).text();
      const $ = cheerio.load(body);
      return $(".pure-u-1.pure-u-md-1-4")
        .map((_, el) => {
          const em = $(el);
          return {
            title: em.find(".video-card-row a p").text().trim() || "N/A",
            videoUrl: `https://www.youtube.com${em.find(".thumbnail a").attr("href") || ""}`,
            thumbnail: `https://www.youtube.com${em.find("img.thumbnail").attr("src") || ""}`,
            duration:
              em.find(".bottom-right-overlay p.length").text().trim() || "N/A",
            channel: em.find(".channel-name").text().trim() || "N/A",
            views: em.find(".video-data").last().text().trim() || "N/A",
            posted: em.find(".video-data").first().text().trim() || "N/A",
          };
        })
        .get();
    } catch (error) {
      console.error("Error fetching video data:", error);
      return [];
    }
  }
}
const invidious = new Invidious();
const notube = async (url, format = "mp4") => {
  const parameters = {
    url: url,
    format: format,
    lang: "en",
  };
  try {
    const {
      data: { token },
    } = await axios.post(
      "https://s64.notube.net/recover_weight.php",
      stringify(parameters),
    );
    if (!token) throw new Error("No token received.");
    const { data: downloadPage } = await axios.get(
      `https://notube.net/en/download?token=${token}`,
    );
    const $ = cheerio.load(downloadPage);
    const title = $("#breadcrumbs-section h2").text();
    const videoUrl = $("#breadcrumbs-section #downloadButton").attr("href");
    const { data: buffer } = await axios.get(videoUrl, {
      responseType: "arraybuffer",
    });
    if (buffer && buffer.length !== 0) {
      return {
        title: title,
        url: videoUrl,
        buffer: Buffer.from(buffer),
        contentType: format === "mp4" ? "video/mp4" : "audio/mp3",
      };
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
const cobalt = async (url, type = "mp4") => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0",
      Referer: "https://cobalt.tools/",
    },
    body: JSON.stringify({
      url: url,
    }),
  };
  try {
    const response = await fetch("https://api.cobalt.tools/", options);
    const data = await response.json();
    const buffer = await (
      await fetch(data.url, {
        headers: {
          Referer: url,
        },
      })
    ).arrayBuffer();
    if (buffer && buffer.length !== 0) {
      return {
        title: data.filename,
        url: data.url,
        buffer: Buffer.from(buffer),
        contentType: type === "mp4" ? "video/mp4" : "audio/mp3",
        detail: {
          title: data.filename,
          url: data.url,
        },
      };
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
const quick = async (ytUrl, type = "mp4") => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "x-rapidapi-key": "1003c07223msh07af8432abe6d7fp135876jsn34d096ee567f",
      "x-rapidapi-host": "youtube-quick-video-downloader.p.rapidapi.com",
      "X-Forwarded-For": "70.41.3.18",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
      Referer: "https://www.hirequotient.com/youtube-video-downloader",
    },
    body: JSON.stringify({
      url: ytUrl,
    }),
  };
  try {
    const data = await (
      await fetch(
        "https://youtube-quick-video-downloader.p.rapidapi.com/api/youtube/links",
        options,
      )
    ).json();
    if (data[0]) {
      const {
        meta: { title },
        urls,
      } = data[0];
      for (const urlObj of urls.flat()) {
        const url = urlObj.url;
        const response = await fetch(url, {
          method: "HEAD",
        });
        if (response.ok) {
          const bufferResponse = await fetch(url, {
            headers: {
              Referer: url,
            },
          });
          const buffer = await bufferResponse.arrayBuffer();
          if (buffer && buffer.length !== 0) {
            return {
              title: title,
              url: url,
              buffer: Buffer.from(buffer),
              contentType: type === "mp4" ? "video/mp4" : "audio/mp3",
              detail: data[0],
            };
          }
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching YouTube links:", error);
  }
};
export {
  ytmp4,
  ytmp3,
  formatNumber,
  ytsearch,
  ytshort,
  Ytdl,
  youtubedl,
  invidious,
  notube,
  cobalt,
  quick,
};
