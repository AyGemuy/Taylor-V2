import axios from "axios";
import cheerio from "cheerio";
import fetch from "node-fetch";
async function ttsModel() {
  try {
    const response = await axios.get("https://tiktokvoicegenerator.com"),
      $ = cheerio.load(response.data);
    return $('select#voice option[value*="_"]').get().map(option => ({
      title: $(option).text().trim(),
      id: $(option).attr("value")
    }));
  } catch (error) {
    return console.error("Terjadi kesalahan:", error), [];
  }
}
async function tiktokTts(text, model) {
  try {
    const modelVoice = model || "en_us_001",
      {
        status,
        data
      } = await axios.post("https://tiktok-tts.weilnet.workers.dev/api/generation", {
        text: text,
        voice: modelVoice
      }, {
        headers: {
          "content-type": "application/json"
        }
      });
    return data;
  } catch (err) {
    return console.log(err.response.data), err.response.data;
  }
}
async function enhanceImg(url, scale) {
  const scaleNumber = scale || 2,
    {
      data
    } = await axios.post("https://toolsapi.spyne.ai/api/forward", {
      image_url: url,
      scale: scaleNumber,
      save_params: {
        extension: ".png",
        quality: 95
      }
    }, {
      headers: {
        "content-type": "application/json",
        accept: "*/*"
      }
    });
  return data;
}
async function cekResi(kurir, resi) {
  let {
    data
  } = await axios.post("https://pluginongkoskirim.com/front/resi", {
    kurir: kurir,
    resi: resi
  }, {
    headers: {
      accept: "*/*",
      "content-type": "application/json"
    }
  });
  return data;
}
const baseCerpen = "http://cerpenmu.com/100-cerpen-kiriman-terbaru",
  pickRandom = ext => ext[Math.floor(Math.random() * ext.length)],
  fetchURL = async url => {
    const {
      data
    } = await axios.get(url);
    return cheerio.load(data);
  }, listCerpen = async () => {
    const $ = await fetchURL(baseCerpen),
      result = [];
    return $("#content > article > strong > a").each(function() {
      result.push($(this).attr("href"));
    }), pickRandom(result);
  }, getUrlCerpenHorror = async () => {
    const randomNumber = Math.floor(127 * Math.random()),
      $ = await fetchURL(`https://cerpenmu.com/category/cerpen-horor-hantu/page/${randomNumber}`),
      result = [];
    return $("div#wrap > #content > article > article").each(function() {
      result.push($(this).find("h2 > a").attr("href"));
    }), pickRandom(result);
  }, getCerpenData = async url => {
    const $ = await fetchURL(url);
    return {
      title: $("#content > article > h1").text(),
      creator: $("#content > article > a:nth-child(2)").text(),
      category: $("#content > article > a:nth-child(4)").text(),
      content: $("#content > article > p").text()
    };
  }, anime = {
    neko: async () => axios.get("https://api.waifu.pics/sfw/neko"),
    waifu: async () => axios.get("https://api.waifu.pics/sfw/waifu"),
    shinobu: async () => axios.get("https://api.waifu.pics/sfw/shinobu")
  }, truthOrDare = async (language = "id") => {
    try {
      const [dareResponse, truthResponse] = await Promise.all([axios.post("https://psycatgames.com/api/tod-v2/", {
        id: "truth-or-dare",
        language: language,
        category: "mixed",
        type: "dare"
      }, {
        headers: {
          Referer: "https://psycatgames.com"
        }
      }), axios.post("https://psycatgames.com/api/tod-v2/", {
        id: "truth-or-dare",
        language: language,
        category: "mixed",
        type: "truth"
      }, {
        headers: {
          Referer: "https://psycatgames.com"
        }
      })]), dare = pickRandom(dareResponse.data.results);
      return {
        status: !0,
        dare: dare,
        truth: pickRandom(truthResponse.data.results)
      };
    } catch (err) {
      return console.log(err), {
        status: !1,
        message: "Unknown error occurred"
      };
    }
  }, getCerpen = async () => {
    try {
      const url = await listCerpen();
      return {
        status: !0,
        ...await getCerpenData(url)
      };
    } catch {
      return {
        status: !1,
        message: "Unknown error occurred"
      };
    }
  }, getCerpenHorror = async () => {
    try {
      const url = await getUrlCerpenHorror();
      return {
        status: !0,
        ...await getCerpenData(url)
      };
    } catch (err) {
      return console.log(err), {
        status: !1,
        message: String(err)
      };
    }
  }, baseOtakudesu = "https://otakudesu.wiki/", baseFilmApik = "https://film-apik.online/", baseSSS = "https://instasupersave.com/", convertMs = duration => {
    const seconds = parseInt(duration / 1e3 % 60),
      minutes = parseInt(duration / 6e4 % 60),
      formatNumber = value => value < 10 ? "0" + value : value;
    return `${formatNumber(parseInt(duration / 36e5 % 24))}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
  }, otakuDesuSearch = async query => {
    try {
      const {
        data
      } = await axios.get(`${baseOtakudesu}?s=${query}&post_type=anime`), $ = cheerio.load(data), result = {
        status: !0,
        data: []
      };
      return $(".page > ul > li").each(function() {
        result.data.push({
          title: $(this).find("h2 > a").text().split(" Subtitle")[0],
          status: $(this).find("div:nth-child(4)").text().split(" : ")[1],
          genre: $(this).find("div:nth-child(3)").text().split(" : ")[1],
          rating: $(this).find("div:nth-child(5)").text().split(" : ")[1],
          thumbnail: $(this).find("img").attr("src"),
          url: $(this).find("h2 > a").attr("href")
        });
      }), 0 === result.data.length ? {
        status: !1,
        message: "Couldn't find the anime you're looking for"
      } : result;
    } catch (error) {
      return console.error(error), {
        status: !1,
        message: "An error occurred"
      };
    }
  }, filmApikS = async query => {
    try {
      const {
        data
      } = await axios.get(`${baseFilmApik}?s=${query}`), $ = cheerio.load(data), result = {
        status: !0,
        data: []
      };
      return $(".search-page > .result-item > article").each(function() {
        result.data.push({
          title: $(this).find(".details > .title > a").text().replace("Nonton Film ", "").split(" Subtitle")[0]?.split(" Sub")[0],
          rating: $(this).find(".details > .meta > span").text().replace("IMDb ", "").replace("TMDb ", ""),
          thumbnail: $(this).find(".image > div > a > img").attr("src"),
          url: $(this).find(".image > div > a").attr("href"),
          synopsis: $(this).find(".details > .contenido > p").text()
        });
      }), 0 === result.data.length ? {
        status: !1,
        message: "Couldn't find the movie you're looking for"
      } : result;
    } catch (error) {
      return console.error(error), {
        status: !1,
        message: "An error occurred"
      };
    }
  }, filmApikDl = async url => {
    try {
      const {
        data
      } = await axios.get(`${url}/play`), result = {
        status: !0,
        creator: "Wudysoft",
        Url: {}
      }, $ = cheerio.load(data);
      return $(".box_links #download > .links_table > .fix-table > center > a").each(function() {
        const provider = $(this).text().split(" ")[1],
          url = $(this).attr("href");
        result.Url[provider] = url;
      }), 0 === Object.keys(result.Url).length ? {
        status: !1,
        message: "Couldn't find the download link"
      } : result;
    } catch (error) {
      return console.error(error), {
        status: !1,
        message: "An error occurred"
      };
    }
  };
async function findSongs(text) {
  try {
    const {
      data
    } = await axios.get("https://songsear.ch/q/" + encodeURIComponent(text)), $ = cheerio.load(data), result = {
      title: $("div.results > div:nth-child(1) > .head > h3 > b").text() + " - " + $("div.results > div:nth-child(1) > .head > h2 > a").text(),
      album: $("div.results > div:nth-child(1) > .head > p").text(),
      number: $("div.results > div:nth-child(1) > .head > a").attr("href").split("/")[4],
      thumb: $("div.results > div:nth-child(1) > .head > a > img").attr("src")
    }, {
      data: lyricData
    } = await axios.get(`https://songsear.ch/api/song/${result.number}?text_only=true`), lyrics = lyricData.song.text_html.replace(/<br\/>/g, "\n").replace(/&#x27;/g, "'");
    return {
      status: !0,
      title: result.title,
      album: result.album,
      thumb: result.thumb,
      lyrics: lyrics
    };
  } catch (err) {
    return console.log(err), {
      status: !1,
      error: "Unknown error occurred"
    };
  }
}
async function igStalk(username) {
  try {
    const {
      data
    } = await axios.get(`${baseSSS}api/ig/userInfoByUsername/${username}`), pronouns = 0 === data.result.user.pronouns.length ? "" : data.result.user.pronouns.join("/"), res = data.result.user;
    return {
      status: !0,
      creator: "Wudysoft",
      username: res.username,
      fullName: res.full_name,
      followers: res.follower_count,
      following: res.following_count,
      pronouns: pronouns,
      verified: res.is_verified,
      private: res.is_private,
      totalPosts: res.media_count,
      bio: res.biography,
      externalUrl: res.external_url,
      urlAcc: `https://instagram.com/${username}`,
      profilePic: res.hd_profile_pic_url_info.url,
      pkId: res.pk_id
    };
  } catch (err) {
    return console.log(err), {
      status: !1,
      creator: "Wudysoft",
      message: "Tidak dapat menemukan akun"
    };
  }
}
async function similarBand(query) {
  try {
    const {
      data
    } = await axios.get(`https://www.music-map.com/${query}`), result = [], $ = cheerio.load(data);
    return $("#gnodMap > a").each(function() {
      result.push($(this).text());
    }), result;
  } catch (err) {
    return console.log(err), {
      status: !1,
      message: "Error, I can't find similar band that you're looking for"
    };
  }
}
export {
  enhanceImg,
  cekResi,
  tiktokTts,
  ttsModel,
  anime,
  truthOrDare,
  getCerpen,
  getCerpenHorror,
  findSongs,
  igStalk,
  similarBand,
  otakuDesuSearch,
  filmApikS,
  filmApikDl
};