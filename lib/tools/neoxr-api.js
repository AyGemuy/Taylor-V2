import fetch from "node-fetch";
class NeoxrApi {
  baseUrl = "https://api.neoxr.eu/api";
  apiKey = null;
  constructor(apiKey) {
    this.apiKey = apiKey || "";
  }
  check = async () => {
    let json = await fetch(this.baseUrl + "/check/" + this.apiKey);
    return await json.json();
  };
  podcast = async url => {
    let json = await fetch(this.baseUrl + "/podcast?url=" + url + "&apikey=" + this.apiKey);
    return await json.json();
  };
  fb = async url => {
    let json = await fetch(this.baseUrl + "/fb?url=" + encodeURIComponent(url) + "&apikey=" + this.apiKey);
    return await json.json();
  };
  ig = async url => {
    let json = await fetch(this.baseUrl + "/ig?url=" + url + "&apikey=" + this.apiKey);
    return await json.json();
  };
  igs = async url => {
    let json = await fetch(this.baseUrl + "/igstory?url=" + url + "&apikey=" + this.apiKey);
    return await json.json();
  };
  igh = async str => {
    let json = await fetch(this.baseUrl + "/igh?url=" + str + "&apikey=" + this.apiKey);
    return await json.json();
  };
  line = async url => {
    let json = await fetch(this.baseUrl + "/line?url=" + url + "&apikey=" + this.apiKey);
    return await json.json();
  };
  pin = async url => {
    let json = await fetch(this.baseUrl + "/pin?url=" + url + "&apikey=" + this.apiKey);
    return await json.json();
  };
  mediafire = async url => {
    let json = await fetch(this.baseUrl + "/mediafire?url=" + url + "&apikey=" + this.apiKey);
    return await json.json();
  };
  tiktok = async url => {
    let json = await fetch(this.baseUrl + "/tiktok?url=" + url + "&apikey=" + this.apiKey);
    return await json.json();
  };
  twitter = async url => {
    let json = await fetch(this.baseUrl + "/twitter?url=" + url + "&apikey=" + this.apiKey);
    return await json.json();
  };
  soundcloud = async url => {
    let json = await fetch(this.baseUrl + "/soundcloud?url=" + url + "&apikey=" + this.apiKey);
    return await json.json();
  };
  rexdl = async str => {
    let json = str.match("rexdl.com") ? await fetch(this.baseUrl + "/rexdl-get?url=" + str + "&apikey=" + this.apiKey) : await fetch(this.baseUrl + "/rexdl?q=" + encodeURIComponent(str) + "&apikey=" + this.apiKey);
    return await json.json();
  };
  pinterest = async query => {
    let json = await fetch(this.baseUrl + "/pinterest?q=" + query + "&apikey=" + this.apiKey);
    return await json.json();
  };
  soundcloud = async str => {
    let json = str.match("soundcloud.com") ? await fetch(this.baseUrl + "/soundcloud?url=" + str + "&apikey=" + this.apiKey) : await fetch(this.baseUrl + "/soundcloud-search?q=" + str + "&apikey=" + this.apiKey);
    return await json.json();
  };
  apk = async (query, no) => {
    if (query && no) {
      let json = await fetch(this.baseUrl + "/apk?q=" + query + "&no=" + no + "&apikey=" + this.apiKey);
      return await json.json();
    }
    if (query) {
      let json = await fetch(this.baseUrl + "/apk?q=" + query + "&apikey=" + this.apiKey);
      return await json.json();
    }
  };
  emojimix = async emoticon => {
    let json = await fetch(this.baseUrl + "/emoji?q=" + encodeURI(emoticon) + "&apikey=" + this.apiKey);
    return await json.json();
  };
  wallpaper = async query => {
    let json = await fetch(this.baseUrl + "/wallpaper2?q=" + query + "&apikey=" + this.apiKey);
    return await json.json();
  };
  sticker = async str => {
    let json = str.match("getstickerpack.com") ? await fetch(this.baseUrl + "/sticker-get?url=" + str + "&apikey=" + this.apiKey) : await fetch(this.baseUrl + "/sticker?q=" + encodeURIComponent(str) + "&apikey=" + this.apiKey);
    return await json.json();
  };
  tm = (style, text) => this.baseUrl + "/" + style + "?text=" + text + "&apikey=" + this.apiKey;
  ie = (style, image) => this.baseUrl + "/effect?style=" + style + "&image=" + image + "&apikey=" + this.apiKey;
  nobg = async image => {
    let json = await fetch(this.baseUrl + "/nobg?image=" + image + "&apikey=" + this.apiKey);
    return await json.json();
  };
  ocr = async image => {
    let json = await fetch(this.baseUrl + "/ocr?image=" + image + "&apikey=" + this.apiKey);
    return await json.json();
  };
  brainly = async (query, lang) => {
    let json = await fetch(this.baseUrl + "/brainly?q=" + query + "&iso=" + lang + "&apikey=" + this.apiKey);
    return await json.json();
  };
  sholat = async city => {
    let json = await fetch(this.baseUrl + "/sholat?q=" + city + "&apikey=" + this.apiKey);
    return await json.json();
  };
  kbbg = async query => {
    let json = await fetch(this.baseUrl + "/kbbg?q=" + query + "&apikey=" + this.apiKey);
    return await json.json();
  };
  chord = async query => {
    let json = await fetch(this.baseUrl + "/chord?q=" + query + "&apikey=" + this.apiKey);
    return await json.json();
  };
  lyric = async query => {
    let json = await fetch(this.baseUrl + "/lyric?q=" + query + "&apikey=" + this.apiKey);
    return await json.json();
  };
  igstalk = async username => {
    let json = await fetch(this.baseUrl + "/igstalk?username=" + username + "&apikey=" + this.apiKey);
    return await json.json();
  };
  google = async (query, image = !1) => {
    let json = await fetch(this.baseUrl + "/" + (image ? "goimg" : "google") + "?q=" + query + "&apikey=" + this.apiKey);
    return await json.json();
  };
  nama = async query => {
    let json = await fetch(this.baseUrl + "/artinama?nama=" + query + "&apikey=" + this.apiKey);
    return await json.json();
  };
  cerpen = async category => {
    let json = await fetch(this.baseUrl + "/cerpen?category=" + category + "&apikey=" + this.apiKey);
    return await json.json();
  };
  cerpenList = async category => {
    let json = await fetch(this.baseUrl + "/cerpen-list?category=" + category + "&apikey=" + this.apiKey);
    return await json.json();
  };
  cerpenFetch = async url => {
    let json = await fetch(this.baseUrl + "/cerpen-get?url=" + url + "&apikey=" + this.apiKey);
    return await json.json();
  };
  cnn = async url => {
    let json = url ? await fetch(this.baseUrl + "/cnn?url=" + url + "&apikey=" + this.apiKey) : await fetch(this.baseUrl + "/cnn?apikey=" + this.apiKey);
    return await json.json();
  };
  gempa = async () => {
    let json = await fetch(this.baseUrl + "/gempa?apikey=" + this.apiKey);
    return await json.json();
  };
  asahotak = async () => {
    let json = await fetch(this.baseUrl + "/asahotak?apikey=" + this.apiKey);
    return await json.json();
  };
  whoami = async () => {
    let json = await fetch(this.baseUrl + "/whoami?apikey=" + this.apiKey);
    return await json.json();
  };
  whatword = async () => {
    let json = await fetch(this.baseUrl + "/whatword?apikey=" + this.apiKey);
    return await json.json();
  };
  whatflag = async () => {
    let json = await fetch(this.baseUrl + "/whatflag?apikey=" + this.apiKey);
    return await json.json();
  };
  whatsong = async () => {
    let json = await fetch(this.baseUrl + "/whatsong?apikey=" + this.apiKey);
    return await json.json();
  };
  tekateki = async () => {
    let json = await fetch(this.baseUrl + "/tekateki?apikey=" + this.apiKey);
    return await json.json();
  };
  toAnime = async url => {
    let json = await fetch("https://qq.indocoder.dev/?url=" + url);
    return await json.json();
  };
  spotify = async url => {
    let json = await fetch(this.baseUrl + "/spotify?url=" + url + "&apikey=" + this.apiKey);
    return await json.json();
  };
  remini = async image => {
    let json = await fetch(this.baseUrl + "/remini?image=" + image + "&apikey=" + this.apiKey);
    return await json.json();
  };
  ageDetector = async image => {
    let json = await fetch(this.baseUrl + "/age?image=" + image + "&apikey=" + this.apiKey);
    return await json.json();
  };
  play = async query => {
    let json = await fetch(this.baseUrl + "/play?q=" + query + "&apikey=" + this.apiKey);
    return await json.json();
  };
  video = async query => {
    let json = await fetch(this.baseUrl + "/video?q=" + query + "&apikey=" + this.apiKey);
    return await json.json();
  };
  youtube = async (url, type = "video", quality = "480p") => {
    let json = await fetch(this.baseUrl + "/youtube?url=" + url + "&type=" + type + "&quality=" + quality + "&apikey=" + this.apiKey);
    return await json.json();
  };
  diffusion = async query => {
    let json = await fetch(this.baseUrl + "/diffusion?q=" + query + "&apikey=" + this.apiKey);
    return await json.json();
  };
  npm = async query => {
    let json = await fetch(this.baseUrl + "/npm?q=" + query + "&apikey=" + this.apiKey);
    return await json.json();
  };
}
export {
  NeoxrApi
};