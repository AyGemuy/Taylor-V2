import cheerio from "cheerio";
import {
  URL
} from "url";
import axios from "axios";
import crypto from "crypto";
import {
  Agent
} from "https";
const Instance = axios.create({});
Instance.interceptors.response.use(response => 200 !== response.status ? {
  error: !0,
  data: response.data
} : {
  error: !1,
  data: response.data
}), Instance.interceptors.request.use(config => (config.headers.Referer = config.url, config.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/89.0.4389.90 Safari/537.36", config.httpsAgent = new Agent({
  keepAlive: !0
}), config));
export async function doods(url, opts = {}) {
  return await fetch_url(url, opts).catch(err => ({
    error: !0,
    message: err
  }));
}
async function fetch_url(url, opts = {}) {
  const {
    data,
    error
  } = await Instance.get(url);
  if (error) throw new Error("Error fetching url");
  const iframe_url = get_iframe_url(data);
  if (!iframe_url) {
    const base_url = get_base_url(url).endsWith("/") ? get_base_url(url) : get_base_url(url) + "/",
      {
        path,
        token,
        expiry,
        char
      } = get_token(data),
      _url = await pass_hash(base_url + path, {
        Referer: url
      });
    if (!_url) throw new Error("Error fetching url");
    return {
      url: _url,
      fullUrl: _url + char + "?" + new URLSearchParams({
        token: token,
        expiry: expiry
      }),
      meta: {
        token: token,
        expiry: expiry,
        char: char
      },
      download: async () => await download(_url + char + "?" + new URLSearchParams({
        token: token,
        expiry: expiry
      }), opts)
    };
  }
  const base_url = get_base_url(url);
  return await doods(base_url + iframe_url, {
    ...opts
  });
}
async function pass_hash(url, opts = {}) {
  const {
    data,
    error
  } = await Instance.get(url, opts);
  if (error) throw new Error("Error fetching url");
  return data;
}
async function download(url, opts = {}) {
  return await Instance.get(url, {
    ...opts,
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/89.0.4389.90 Safari/537.36",
      Referer: "https://doodstream.com/"
    }
  });
}

function get_iframe_url(html) {
  return cheerio.load(html)("#os_player iframe").attr("src");
}

function get_base_url(url) {
  const {
    origin
  } = new URL(url);
  return origin;
}

function get_token(html) {
  const $ = cheerio.load(html),
    scripts = $("script");
  for (let i = 0; i < scripts.length; i++) {
    const text = $(scripts[i]).html();
    if (text.includes("data:text/vtt;base64")) {
      const expiry = Date.now(),
        hash = text.split("hash=")[1].split("&")[0],
        token = text.split("token=")[1].split("&")[0];
      return {
        path: join_url_parts("pass_md5", hash, token),
        expiry: expiry,
        token: token,
        char: random_str()
      };
    }
  }
}

function join_url_parts(...parts) {
  return parts.join("/");
}