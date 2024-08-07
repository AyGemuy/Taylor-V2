import axios from "axios";
import FormData from "form-data";
const SPOTIFY_CLIENT_ID = "4c4fc8c3496243cbba99b39826e2841f",
  SPOTIFY_CLIENT_SECRET = "d598f89aba0946e2b85fb8aefa9ae4c8";
export default class Spotify {
  async spotifyCreds() {
    try {
      const json = await axios.post("https://accounts.spotify.com/api/token", "grant_type=client_credentials", {
        headers: {
          Authorization: "Basic " + Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString("base64")
        }
      });
      return json.access_token ? {
        creator: "Wudysoft",
        status: !0,
        data: json.data
      } : {
        creator: "Wudysoft",
        status: !1,
        msg: "Can't generate token!"
      };
    } catch (e) {
      return {
        creator: "Wudysoft",
        status: !1,
        msg: e.message
      };
    }
  }
  convert(ms) {
    var minutes = Math.floor(ms / 6e4),
      seconds = (ms % 6e4 / 1e3).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  async getTask(str) {
    try {
      const parse = await axios.get("https://ytmp3api.net/iframe/?color=green&vid=48MUdbh6B0w"),
        p = {
          hash: cheerio.load(parse.data)('input[name="hash"]').attr("value"),
          color: "green"
        };
      let form = new FormData();
      form.append("hash", p.hash), form.append("color", p.color);
      const html = await axios.post("https://ytmp3api.net/iframe/convert.php", form, {
          headers: {
            Accept: "*/*",
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36",
            "Referrer-Policy": "strict-origin-when-cross-origin",
            "sec-ch-ua": '"Chromium";v="107", "Not=A?Brand";v="24"',
            "sec-ch-ua-platform": "Android",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
          }
        }),
        taskId = (html.split("taskId")[1].split("}")[0]?.replace(/[":]/g, "")).trim();
      return taskId ? {
        creator: "Wudysoft",
        status: !0,
        data: {
          taskId: taskId
        }
      } : {
        creator: "Wudysoft",
        status: !1,
        msg: "TaskId not found!"
      };
    } catch (e) {
      return console.log(e), {
        creator: "Wudysoft",
        status: !1,
        msg: e.message
      };
    }
  }
  async getInfo(url) {
    try {
      const creds = await this.spotifyCreds();
      if (!creds.status) return creds;
      const json = await axios.get("https://api.spotify.com/v1/tracks/" + url.split("track/")[1], {
        headers: {
          Authorization: "Bearer " + creds.data.access_token
        }
      });
      return {
        creator: "Wudysoft",
        status: !0,
        data: {
          thumbnail: json.data.album.images[0]?.url,
          title: json.data.artists[0]?.name + " - " + json.data.name,
          artist: json.data.artists[0],
          duration: this.convert(json.data.duration_ms),
          preview: json.data.preview_url
        }
      };
    } catch (e) {
      return {
        creator: "Wudysoft",
        status: !1,
        msg: e.message
      };
    }
  }
  async search(query, type = "track", limit = 20) {
    try {
      const creds = await this.spotifyCreds();
      if (!creds.status) return creds;
      const json = await axios.get("https://api.spotify.com/v1/search?query=" + query + "&type=" + type + "&offset=0&limit=" + limit, {
        headers: {
          Authorization: "Bearer " + creds.data.access_token
        }
      });
      if (!json.data.tracks.items || json.data.tracks.items.length < 1) return {
        creator: "Wudysoft",
        status: !1,
        msg: "Music not found!"
      };
      let data = [];
      return json.data.tracks.items.map(v => data.push({
        title: v.album.artists[0]?.name + " - " + v.name,
        duration: this.convert(v.duration_ms),
        popularity: v.popularity + "%",
        preview: v.preview_url,
        url: v.external_urls.spotify
      })), {
        creator: "Wudysoft",
        status: !0,
        data: data
      };
    } catch (e) {
      return {
        creator: "Wudysoft",
        status: !1,
        msg: e.message
      };
    }
  }
  async fetch(url) {
    try {
      var id = (/track/.test(url) ? url.split("track/")[1] : url.split("playlist/")[1]).trim();
      if (/playlist/.test(url)) {
        const parse = await axios.get("https://api.spotifydown.com/metadata/playlist/" + id, {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36",
            Origin: "https://spotifydown.com",
            Referer: "https://spotifydown.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
          }
        });
        if (!parse.data.success) return {
          creator: "Wudysoft",
          status: !1,
          msg: "Can't get playlist metadata!"
        };
        const json = await axios.get("https://api.spotifydown.com/trackList/playlist/" + id, {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36",
            Origin: "https://spotifydown.com",
            Referer: "https://spotifydown.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
          }
        });
        if (!json.data.success || json.data.trackList.length < 1) return {
          creator: "Wudysoft",
          status: !1,
          msg: "Failed to get playlist"
        };
        let tracks = [];
        return json.data.trackList.map(v => tracks.push({
          cover: v.cover,
          title: v.title,
          artists: v.artists,
          album: v.album,
          url: "https://open.spotify.com/track/" + v.id
        })), {
          creator: "Wudysoft",
          status: !0,
          data: {
            cover: parse.data.cover,
            title: parse.data.title
          },
          tracks: tracks
        };
      } {
        const info = await this.getInfo(url);
        if (!info.status) return info;
        const json = await axios.get("https://api.spotifydown.com/download/" + id, {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36",
            Origin: "https://spotifydown.com",
            Referer: "https://spotifydown.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
          }
        });
        return json.data.success && json.data.link ? {
          creator: "Wudysoft",
          status: !0,
          data: {
            ...info.data,
            url: json.data.link
          }
        } : {
          creator: "Wudysoft",
          status: !1,
          msg: "Failed to get file link"
        };
      }
    } catch (e) {
      return console.log(e), {
        creator: "Wudysoft",
        status: !1,
        msg: e.message
      };
    }
  }
}