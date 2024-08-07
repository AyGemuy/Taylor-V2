import cheerio from "cheerio";
import axios from "axios";
import request from "request";
import got from "got";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  let lister = ["Jodoh", "artiNama", "genius", "googleImage", "googleIt", "haribaik", "harilarangan", "kecocokannama", "mediafiredl", "ramalanjodoh", "rejekiweton", "tafsirMimpi", "tanggaljadi", "tiktokdl", "watakartis", "wikipedia", "youtubeSearch"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split(/[^\w\s]/g);
  if (!lister.includes(feature)) return m.reply("*Example:*\n.fs youtube.search.hello\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("Jodoh" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await Jodoh(inputs, inputs_);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("artiNama" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await artiNama(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("genius" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await genius(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("googleImage" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await googleImage(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("googleIt" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await googleIt(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("haribaik" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await haribaik(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("harilarangan" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await harilarangan(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("kecocokannama" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await kecocokannama(inputs, inputs_);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("mediafiredl" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await mediafiredl(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("ramalanjodoh" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await ramalanjodoh(inputs, inputs_, inputs__, inputs___);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("rejekiweton" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await rejekiweton(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("tafsirMimpi" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await tafsirMimpi(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("tanggaljadi" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await tanggaljadi(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("tiktokdl" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await tiktokdl(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("watakartis" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await watakartis(inputs, inputs_);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("wikipedia" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await wikipedia(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("youtubeSearch" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await youtubeSearch(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
  }
};
handler.help = ["scrap1 type query"], handler.tags = ["internet"], handler.command = /^(scrap1)$/i;
export default handler;
async function youtubeSearch(query) {
  try {
    const body = await got("https://www.youtube.com/results", {
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
        },
        searchParams: {
          search_query: query
        }
      }).text(),
      $ = cheerio.load(body);
    let sc;
    $("script").map(function() {
      const el = $(this).html();
      let regex;
      return (regex = /var ytInitialData = /gi.exec(el || "")) && (sc = JSON.parse(regex.input.replace(/^var ytInitialData = /i, "").replace(/;$/, ""))),
        regex && sc;
    });
    const results = {
      video: [],
      channel: [],
      playlist: []
    };
    return sc.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0]?.itemSectionRenderer.contents.forEach(v => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _4, _5, _6, _7, _10, _11, _12, _13;
      const typeName = Object.keys(v)[0],
        result = v[typeName];
      if (["horizontalCardListRenderer", "shelfRenderer"].includes(typeName)) return;
      const isChannel = "channelRenderer" === typeName,
        isMix = "radioRenderer" === typeName;
      if ("videoRenderer" === typeName) {
        const durationMultipliers = {
            1: {
              0: 1
            },
            2: {
              0: 60,
              1: 1
            },
            3: {
              0: 3600,
              1: 60,
              2: 1
            }
          },
          view = (null === (_a = result.viewCountText) || void 0 === _a ? void 0 : _a.simpleText) || (null === (_b = result.shortViewCountText) || void 0 === _b ? void 0 : _b.simpleText) || (null === (_d = null === (_c = result.shortViewCountText) || void 0 === _c ? void 0 : _c.accessibility) || void 0 === _d ? void 0 : _d.accessibilityData.label),
          _duration = null === (_f = null === (_e = result.thumbnailOverlays) || void 0 === _e ? void 0 : _e.find(v => "thumbnailOverlayTimeStatusRenderer" === Object.keys(v)[0])) || void 0 === _f ? void 0 : _f.thumbnailOverlayTimeStatusRenderer.text,
          videoId = result.videoId,
          duration = (null === (_g = result.lengthText) || void 0 === _g ? void 0 : _g.simpleText) || (null == _duration ? void 0 : _duration.simpleText);
        let durationS = 0;
        null === (_h = (null == duration ? void 0 : duration.split(".").length) && -1 === duration.indexOf(":") ? duration.split(".") : null == duration ? void 0 : duration.split(":")) || void 0 === _h || _h.forEach((v, i, arr) => durationS += durationMultipliers[arr.length]["" + i] * parseInt(v)),
          results.video.push({
            authorName: null === (_l = ((null === (_j = result.ownerText) || void 0 === _j ? void 0 : _j.runs) || (null === (_k = result.longBylineText) || void 0 === _k ? void 0 : _k.runs) || [])[0]) || void 0 === _l ? void 0 : _l.text,
            authorAvatar: null === (_p = null === (_o = null === (_m = result.channelThumbnailSupportedRenderers) || void 0 === _m ? void 0 : _m.channelThumbnailWithLinkRenderer.thumbnail.thumbnails) || void 0 === _o ? void 0 : _o.filter(({
              url
            }) => url)) || void 0 === _p ? void 0 : _p.pop().url,
            videoId: videoId,
            url: encodeURI("https://www.youtube.com/watch?v=" + videoId),
            thumbnail: result.thumbnail.thumbnails.pop().url,
            title: null === (_t = (null === (_r = null === (_q = result.title) || void 0 === _q ? void 0 : _q.runs.find(v => v.text)) || void 0 === _r ? void 0 : _r.text) || (null === (_s = result.title) || void 0 === _s ? void 0 : _s.accessibility.accessibilityData.label)) || void 0 === _t ? void 0 : _t.trim(),
            description: null === (_y = null === (_x = null === (_w = null === (_v = null === (_u = result.detailedMetadataSnippets) || void 0 === _u ? void 0 : _u[0]) || void 0 === _v ? void 0 : _v.snippetText.runs) || void 0 === _w ? void 0 : _w.filter(({
              text
            }) => text)) || void 0 === _x ? void 0 : _x.map(({
              text
            }) => text)) || void 0 === _y ? void 0 : _y.join(""),
            publishedTime: null === (_z = result.publishedTimeText) || void 0 === _z ? void 0 : _z.simpleText,
            durationH: (null === (_0 = result.lengthText) || void 0 === _0 ? void 0 : _0.accessibility.accessibilityData.label) || (null == _duration ? void 0 : _duration.accessibility.accessibilityData.label),
            durationS: durationS,
            duration: duration,
            viewH: view,
            view: null === (_1 = (-1 === (null == view ? void 0 : view.indexOf("x")) ? null == view ? void 0 : view.split(" ")[0] : null == view ? void 0 : view.split("x")[0]) || view) || void 0 === _1 ? void 0 : _1.trim(),
            type: typeName.replace(/Renderer/i, "")
          });
      }
      if (isChannel) {
        const channelId = result.channelId;
        results.channel.push({
          channelId: channelId,
          url: encodeURI("https://www.youtube.com/channel/" + channelId),
          channelName: result.title.simpleText || (null === (_5 = null === (_4 = result.shortBylineText) || void 0 === _4 ? void 0 : _4.runs.find(v => v.text)) || void 0 === _5 ? void 0 : _5.text),
          avatar: "https:" + (null === (_6 = result.thumbnail.thumbnails.filter(({
            url
          }) => url)) || void 0 === _6 ? void 0 : _6.pop().url),
          isVerified: "BADGE_STYLE_TYPE_VERIFIED" === (null === (_7 = result.ownerBadges) || void 0 === _7 ? void 0 : _7.pop().metadataBadgeRenderer.style),
          description: null === (_13 = null === (_12 = null === (_11 = null === (_10 = result.descriptionSnippet) || void 0 === _10 ? void 0 : _10.runs) || void 0 === _11 ? void 0 : _11.filter(({
            text
          }) => text)) || void 0 === _12 ? void 0 : _12.map(({
            text
          }) => text)) || void 0 === _13 ? void 0 : _13.join(""),
          type: typeName.replace(/Renderer/i, "")
        });
      }
      isMix && results.playlist.push({
        playlistId: result.playlistId,
        title: result.title.simpleText,
        thumbnail: result.thumbnail.thumbnails.pop().url,
        video: result.videos.map(({
          childVideoRenderer
        }) => ({
          videoId: childVideoRenderer.videoId,
          title: childVideoRenderer.title.simpleText,
          durationH: childVideoRenderer.lengthText.accessibility.accessibilityData.label,
          duration: childVideoRenderer.lengthText.simpleText
        })),
        type: "mix"
      });
    }), {
      status: !0,
      result: results
    };
  } catch (e) {
    return {
      status: !1,
      result: e
    };
  }
}
async function tiktokdl(url) {
  try {
    const valid = await async function(url) {
      let result;
      const Konto1 = /video\/([\d|\+]+)?\/?/,
        valid = url.match(Konto1);
      if (valid) return valid[1];
      try {
        const data = await got.get(url, {
            headers: {
              "Accept-Encoding": "deflate"
            },
            maxRedirects: 0
          }).catch(e => e.response.headers.location),
          _valid = data.match(Konto1);
        _valid && (result = _valid[1]);
      } catch (error) {
        result = !1;
      }
      return result;
    }(url), data = await got.get((aweme = valid, `https://api16-core-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${aweme}&version_name=1.0.4&version_code=104&build_number=1.0.4&manifest_version_code=104&update_version_code=104&openudid=4dsoq34x808ocz3m&uuid=6320652962800978&_rticket=1671193816600&ts=1671193816&device_brand=POCO&device_type=surya&device_platform=android&resolution=1080*2179&dpi=440&os_version=12&os_api=31&carrier_region=US&sys_region=US%C2%AEion=US&app_name=TikMate%20Downloader&app_language=en&language=en&timezone_name=Western%20Indonesia%20Time&timezone_offset=25200&channel=googleplay&ac=wifi&mcc_mnc=&is_my_cn=0&aid=1180&ssmix=a&as=a1qwert123&cp=cbfhckdckkde1`), {
      headers: {
        "Accept-Encoding": "deflate",
        "User-Agent": "okhttp/3.14.9"
      }
    }).catch(e => e.response), obj = JSON.parse(data.body).aweme_list.find(o => o.aweme_id === valid);
    return {
      status: !0,
      result: {
        aweme_id: obj.aweme_id,
        region: obj.region,
        desc: obj.desc,
        create_time: obj.create_time,
        author: {
          uid: obj.author.uid,
          unique_id: obj.author.unique_id,
          nickname: obj.author.nickname,
          birthday: obj.author.birthday
        },
        duration: obj.music.duration,
        download: {
          nowm: obj.video.play_addr.url_list[0],
          wm: obj.video.download_addr.url_list[0],
          music: obj.music.play_url.url_list[0],
          music_info: {
            id: obj.music.id,
            title: obj.music.title,
            author: obj.music.author,
            is_original: obj.music.is_original,
            cover_hd: obj.music.cover_hd.url_list[0],
            cover_large: obj.music.cover_large.url_list[0],
            cover_medium: obj.music.cover_medium.url_list[0]
          }
        }
      }
    };
  } catch (e) {
    return {
      status: !1,
      result: e
    };
  }
  var aweme;
}
async function mediafiredl(url) {
  try {
    var _a, _b;
    const data = await got(url).text(),
      $ = cheerio.load(data),
      Url = ($("#downloadButton").attr("href") || "").trim(),
      url2 = ($("#download_link > a.retry").attr("href") || "").trim(),
      $intro = $("div.dl-info > div.intro"),
      filename = $intro.find("div.filename").text().trim(),
      filetype = $intro.find("div.filetype > span").eq(0).text().trim(),
      ext = (null === (_b = null === (_a = /\(\.(.*?)\)/.exec($intro.find("div.filetype > span").eq(1).text())) || void 0 === _a ? void 0 : _a[1]) || void 0 === _b ? void 0 : _b.trim()) || "bin",
      $li = $("div.dl-info > ul.details > li"),
      aploud = $li.eq(1).find("span").text().trim(),
      filesizeH = $li.eq(0).find("span").text().trim();
    return {
      status: !0,
      result: {
        url: Url || url2,
        url2: url2,
        filename: filename,
        filetype: filetype,
        ext: ext,
        aploud: aploud,
        filesizeH: filesizeH,
        filesize: parseFileSize(filesizeH)
      }
    };
  } catch (e) {
    return {
      status: !1,
      result: e
    };
  }
}

function parseFileSize(size) {
  return parseFloat(size) * (/GB/i.test(size) ? 1e6 : /MB/i.test(size) ? 1e3 : /KB/i.test(size) ? 1 : /bytes?/i.test(size) ? .001 : /B/i.test(size) ? .1 : 0);
}
async function googleImage(query) {
  try {
    const data = await got(`https://www.google.com/search?q=${query}&tbm=isch`, {
        headers: {
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9,id;q=0.8",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36"
        }
      }).text(),
      $ = cheerio.load(data),
      pattern = /\[1,\[0,"(?<id>[\d\w\-_]+)",\["https?:\/\/(?:[^"]+)",\d+,\d+\]\s?,\["(?<url>https?:\/\/(?:[^"]+))",\d+,\d+\]/gm,
      matches = $.html().matchAll(pattern),
      decodeUrl = url => decodeURIComponent(JSON.parse(`"${url}"`));
    return {
      status: !0,
      result: [...matches].map(({
        groups
      }) => decodeUrl(null == groups ? void 0 : groups.url)).filter(v => /.*\.jpe?g|png$/gi.test(v))
    };
  } catch (e) {
    return {
      status: !1,
      result: e
    };
  }
}
async function genius(query) {
  try {
    const res = await got("https://genius.com/api/search/song?per_page=5&q=" + encodeURIComponent(query), {
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
        }
      }).text(),
      reduce = JSON.parse(res).response.sections.reduce((pv, x) => [...pv, ...x.hits], []),
      firstSong = reduce.filter(s => "song" === s.type)[0],
      url = firstSong.result.url,
      data = await got(url, {
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
        }
      }).text(),
      $ = cheerio.load(data),
      container = $("div[class*='Lyrics__Container']").toArray().map(x => {
        const ele = $(x);
        return ele.find("br").replaceWith("\n"), ele.text();
      }).join("\n").trim();
    return {
      status: !0,
      result: {
        song: firstSong.result,
        lyrics: container.replace(/\[[^\]]+\]\n?/g, "")
      }
    };
  } catch (e) {
    return {
      status: !1,
      result: e
    };
  }
}
async function wikipedia(querry) {
  try {
    const link = await got.get(`https://id.wikipedia.org/wiki/${querry}`),
      $ = cheerio.load(link.body);
    let judul = $("#firstHeading").text().trim(),
      isi = [];
    $("#mw-content-text > div.mw-parser-output").each(function(rayy, Ra) {
      let penjelasan = $(Ra).find("p").text().trim();
      isi.push(penjelasan);
    });
    for (let i of isi) return {
      status: !0,
      result: {
        judul: judul,
        isi: i
      }
    };
  } catch (e) {
    return {
      status: !1,
      result: e
    };
  }
}
async function googleIt(query) {
  try {
    const body = await got("https://www.google.com/search", {
        searchParams: {
          q: query
        },
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
        }
      }).text(),
      $ = cheerio.load(body),
      infoEl = $("div.I6TXqe > div.osrp-blk"),
      info = {
        title: infoEl.find("h2.qrShPb > span").text().trim(),
        type: infoEl.find("div.SPZz6b > div.wwUB2c > span").text().trim(),
        description: "",
        image: []
      };
    infoEl.find("div.LuVEUc > div.UDZeY > div.wDYxhc[data-attrid]:not(.NFQFxe)").each(function() {
      const desc = $(this).text().trim();
      desc && (info.description += desc + "\n");
    }), infoEl.find("div[jscontroller=M0hWhd] > div[jscontroller=ABJeBb] > div.eA0Zlc[jsname=dTDiAc]").each(function() {
      var _a, _b;
      const img = null === (_a = $(this).find("a > g-img.BA0A6c > img.rISBZc").attr("src")) || void 0 === _a ? void 0 : _a.trim();
      img && (null === (_b = info.image) || void 0 === _b || _b.push(img));
    }), info.image = [...new Set(info.image)];
    const articles = [];
    $("div.tF2Cxc").each(function() {
      const el = $(this),
        header = el.find("cite.iUh30").text(),
        title = el.find("div.yuRUbf > a > h3").text(),
        url = el.find("div.yuRUbf > a[href]").attr("href"),
        description = el.find("div.VwiC3b > span").text() || el.find("div.VwiC3b").text();
      el.length && url && articles.push({
        header: header,
        title: title,
        url: url,
        description: description
      });
    });
    return {
      status: !0,
      result: {
        info: info,
        articles: articles
      }
    };
  } catch (e) {
    return {
      status: !1,
      result: e
    };
  }
}

function Search(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://www.mynimeku.com/?s=" + query).then(res => {
      const $ = cheerio.load(res.data),
        result = [],
        hasil = [];
      $("body > main > div > div > div.flexbox2 > div > div").each(function(a, b) {
        const url = $(b).find("a").attr("href"),
          thumb = $(b).find("a > div > img").attr("src"),
          title = $(b).find("a > div > img").attr("alt");
        result.push({
          url: url,
          thumb: thumb,
          title: title
        }), result.forEach(v => {
          /anime/.test(v.url) && hasil.push(v);
        });
      }), resolve(hasil);
    }).catch(reject);
  });
}

function animeDetail(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      const $ = cheerio.load(res.data),
        _eps = [];
      $("#episode_list > ul > li").each(function(a, b) {
        const link = $(b).find("div > div.flexeps-infoz > a").attr("href"),
          title = $(b).find("div > div.flexeps-infoz > a").attr("title");
        _eps.push({
          link: link,
          title: title
        });
      });
      const result = {
        thumb: $("body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-thumb > img").attr("src"),
        title: $("body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > div.series-titlex > h2").text(),
        title_japanese: $("body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > div.series-titlex > span").text(),
        rating: $("body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > div.series-infoz.score > span").text(),
        musim: $("body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > ul > li:nth-child(3) > span > a").text(),
        studio: $("body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > ul > li:nth-child(4) > span > a").text(),
        episode: $("body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > ul > li:nth-child(5) > span").text(),
        aired: $("body > main > div > div > div.container > div.series-flex > div.series-flexleft > div.series-info > ul > li:nth-child(6) > span").text(),
        genre: $("body > main > div > div > div.container > div.series-flex > div.series-flexright > div.series-genres").text(),
        synopsis: $("body > main > div > div > div.container > div.series-flex > div.series-flexright > div.series-synops > p").text(),
        episode_list: _eps
      };
      resolve(result);
    }).catch(reject);
  });
}

function downloadEps(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      const $ = cheerio.load(res.data),
        dl_link = {
          low: {
            uptobox: $("#linklist > p:nth-child(10) > a:nth-child(1)").attr("href"),
            mega: $("#linklist > p:nth-child(10) > a:nth-child(2)").attr("href"),
            zippyshare: $("#linklist > p:nth-child(10) > a:nth-child(3)").attr("href")
          },
          medium: {
            uptobox: $("#linklist > p:nth-child(13) > a:nth-child(1)").attr("href"),
            mega: $("#linklist > p:nth-child(13) > a:nth-child(2)").attr("href"),
            zippyshare: $("#linklist > p:nth-child(13) > a:nth-child(3)").attr("href")
          },
          high: {
            uptobox: $("#linklist > p:nth-child(16) > a:nth-child(1)").attr("href"),
            mega: $("#linklist > p:nth-child(16) > a:nth-child(2)").attr("href"),
            zippyshare: $("#linklist > p:nth-child(16) > a:nth-child(3)").attr("href")
          }
        };
      resolve(dl_link);
    }).catch(reject);
  });
}

function alphacoders(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://wall.alphacoders.com/search.php?search=" + query).then(res => {
      const $ = cheerio.load(res.data),
        result = [];
      $("div.boxgrid > a > picture").each(function(a, b) {
        result.push($(b).find("img").attr("src").replace("thumbbig-", ""));
      }), resolve(result);
    }).catch(reject);
  });
}

function wallpaperflare(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://www.wallpaperflare.com/search?wallpaper=" + query, {
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        cookie: "_ga=GA1.2.863074474.1624987429; _gid=GA1.2.857771494.1624987429; __gads=ID=84d12a6ae82d0a63-2242b0820eca0058:T=1624987427:RT=1624987427:S=ALNI_MaJYaH0-_xRbokdDkQ0B49vSYgYcQ"
      }
    }).then(res => {
      const $ = cheerio.load(res.data),
        result = [];
      $("#gallery > li > figure > a").each(function(a, b) {
        result.push($(b).find("img").attr("data-src"));
      }), resolve(result);
    }).catch(reject);
  });
}

function wallpaperscraft(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://wallpaperscraft.com/search/?query=" + query).then(res => {
      const $ = cheerio.load(res.data),
        result = [];
      $("span.wallpapers__canvas").each(function(a, b) {
        result.push($(b).find("img").attr("src"));
      }), resolve(result);
    }).catch(reject);
  });
}

function wallpapercave(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://wallpapercave.com/search?q=" + query).then(res => {
      const $ = cheerio.load(res.data),
        result = [];
      $("div.imgrow > a").each(function(a, b) {
        $(b).find("img").attr("src").includes(".gif") || result.push("https://wallpapercave.com/" + $(b).find("img").attr("src").replace("fuwp", "uwp"));
      }), resolve(result);
    }).catch(reject);
  });
}

function replaceAll(string, find, replace) {
  return string.replace(new RegExp(find, "g"), replace);
}

function Tanggal(tanggal) {
  return {
    tanggal: tanggal.replace(/-.*/, ""),
    bulan: tanggal.replace(/-([^-?]+)(?=(?:$|\?))/, "").replace(/.*?-/, ""),
    tahun: tanggal.replace(/.*\-/, "")
  };
}
async function artiNama(nama) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.primbon.com/arti_nama.php?nama1=${nama}&proses=+Submit%21+`).then(({
      data
    }) => {
      const result = cheerio.load(data)("#body").text().split("Nama:")[0].replace(/\n/gi, "").replace("ARTI NAMA", "").replace("                                ", "");
      resolve(result);
    }).catch(reject);
  });
}
async function tafsirMimpi(mimpi) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.primbon.com/tafsir_mimpi.php?mimpi=${mimpi}&submit=+Submit+`).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        cek = $("#body > font > i").text();
      if (!/Tidak ditemukan/g.test(cek)) {
        const hasil = replaceAll(`${$("#body").text().split(`Hasil pencarian untuk kata kunci: ${mimpi}`)[1].replace(/\n\n\n\n\n\n\n\n\n/gi, "\n").replace(/\n/gi, "").replace("       ", "").replace('"        ', "").replace(/Solusi.*$/, "")}`, ".Mimpi", ".\nMimpi");
        resolve(hasil);
      } else resolve(`Tidak ditemukan tafsir mimpi ${mimpi}. Cari dengan kata kunci yang lain..`);
    }).catch(reject);
  });
}
async function Jodoh(nama1, nama2) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.primbon.com/kecocokan_nama_pasangan.php?nama1=${nama1}&nama2=${nama2}&proses=+Submit%21+`).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        love = "https://www.primbon.com/" + $("#body > img").attr("src"),
        res = $("#body").text().split(nama2)[1].replace("< Hitung Kembali", "").split("\n")[0],
        positif = res.split("Sisi Negatif Anda: ")[0]?.replace("Sisi Positif Anda: ", ""),
        negatif = res.split("Sisi Negatif Anda: ")[1];
      resolve({
        namaAnda: nama1,
        namaPasangan: nama2,
        positif: positif,
        negatif: negatif,
        love: love
      });
    }).catch(reject);
  });
}
async function tanggaljadi(tanggal) {
  return new Promise((resolve, reject) => {
    const tgl = Tanggal(tanggal).tanggal,
      bln = Tanggal(tanggal).bulan,
      thn = Tanggal(tanggal).tahun;
    axios.get(`https://www.primbon.com/tanggal_jadian_pernikahan.php?tgl=${tgl}&bln=${bln}&thn=${thn}&proses=+Submit%21+`).then(({
      data
    }) => {
      const result = cheerio.load(data)("#body").text().replace("Karakteristik:", "\nKarakteristik:").replace("Hubungan", "\nHubungan").replace(/^\s*\n/gm, "").replace(/< Hitung Kembali.*$/s, "");
      resolve(result);
    }).catch(reject);
  });
}
async function watakartis(nama, tanggal) {
  return new Promise((resolve, reject) => {
    const tgl = Tanggal(tanggal).tanggal,
      bln = Tanggal(tanggal).bulan,
      thn = Tanggal(tanggal).tahun;
    axios.get(`https://www.primbon.com/selebriti.php?nama=${nama}&tgl=${tgl}&bln=${bln}&thn=${thn}&submit=submit#`).then(({
      data
    }) => {
      const result = cheerio.load(data)("#body").text().replace(/^\s*\n/gm, "").replace("Berdasarkan", "\nBerdasarkan").replace("Nama:", "\nNama:").replace("Tgl. Lahir:", "\nTanggal Lahir:").replace("Weton:", "\nWeton:").replace("Mongso:", "\nMongso:").replace("Wuku:", "\nWuku:").replace("Dibawah", "\n\nDibawah").replace(/1\. /g, "\n1. ").replace(/2\. /g, "\n2. ").replace(/3\. /g, "\n3. ").replace(/4\. /g, "\n4. ").replace(/5\. /g, "\n5. ").replace(/6\. /g, "\n6. ").replace(/7\. /g, "\n7. ").replace(/8\. /g, "\n8. ").replace(/9\. /g, "\n9. ").replace(/10\. /g, "\n10. ").replace(/adalah:/g, "adalah:\n").replace("KEADAAN UMUM", "\nKEADAAN UMUM").replace("ALAM SEMESTA", "\nALAM SEMESTA").replace("POSTUR TUBUH", "\nPOSTUR TUBUH").replace("KEADAAN MASA KANAK-KANAK", "\nKEADAAN MASA KANAK-KANAK").replace("KEADAAN MASA REMAJA", "\nKEADAAN MASA REMAJA").replace("CIRI KHAS", "\nCIRI KHAS").replace("IKATAN PERSAHABATAN", "\nIKATAN PERSAHABATAN").replace("KEADAAN KESEHATAN", "\nKEADAAN KESEHATAN").replace("PEKERJAAN YANG COCOK", "\nPEKERJAAN YANG COCOK").replace("GAMBARAN TENTANG REJEKI", "\nGAMBARAN TENTANG REJEKI").replace("SAAT YANG TEPAT", "\nSAAT YANG TEPAT").replace("HOBI", "\nHOBI").replace("JODO PINASTI", "\nJODO PINASTI").replace("BATU PERMATA", "\nBATU PERMATA").replace("WARNA YANG COCOK", "\nWARNA YANG COCOK").replace("BUNGA", "\nBUNGA").replace(/Di bawah ini.*$/s, "");
      resolve(result);
    }).catch(reject);
  });
}
async function ramalanjodoh(nama1, tanggal1, nama2, tanggal2) {
  return new Promise((resolve, reject) => {
    const tgl1 = Tanggal(tanggal1).tanggal,
      bln1 = Tanggal(tanggal1).bulan,
      thn1 = Tanggal(tanggal1).tahun,
      tgl2 = Tanggal(tanggal2).tanggal,
      bln2 = Tanggal(tanggal2).bulan,
      thn2 = Tanggal(tanggal2).tahun;
    request({
      method: "POST",
      url: "https://primbon.com/ramalan_jodoh.php",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      form: {
        nama1: nama1,
        tgl1: tgl1,
        bln1: bln1,
        thn1: thn1,
        nama2: nama2,
        tgl2: tgl2,
        bln2: bln2,
        thn2: thn2,
        submit: " RAMALAN JODOH &#62;&#62; "
      }
    }, function(error, response, body) {
      if (error) throw new Error(error);
      const result = cheerio.load(body)("#body").text().replace(/^\s*\n/gm, "").replace(nama1, `\n${nama1}`).replace(/Tgl\. Lahir:/g, "\nTanggal Lahir:").replace(nama2, `\n${nama2}`).replace("Dibawah", "\n\nDibawah").replace(/1\. /g, "\n1. ").replace(/2\. /g, "\n2. ").replace(/3\. /g, "\n3. ").replace(/4\. /g, "\n4. ").replace(/5\. /g, "\n5. ").replace(/6\. /g, "\n6. ").replace(/7\. /g, "\n7. ").replace(/8\. /g, "\n8. ").replace(/9\. /g, "\n9. ").replace(/10\. /g, "\n10. ").replace(/\*/s, "\n\n*").replace(/< Hitung Kembali.*$/s, "");
      resolve(result);
    });
  });
}
async function rejekiweton(tanggal) {
  return new Promise((resolve, reject) => {
    const tgl = Tanggal(tanggal).tanggal,
      bln = Tanggal(tanggal).bulan,
      thn = Tanggal(tanggal).tahun;
    request({
      method: "POST",
      url: "https://primbon.com/rejeki_hoki_weton.php",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      form: {
        tgl: tgl,
        bln: bln,
        thn: thn,
        submit: " Submit! "
      }
    }, function(error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body),
        res = $("#body").text().replace(/^\s*\n/gm, "").replace("Hari Lahir:", "\nHari Lahir:").replace("Seseorang", "\nSeseorang").replace("Fluktuasi", "\n\nFluktuasi").replace("Hover\n", "").replace(/< Hitung Kembali.*$/s, ""),
        stats = "https://www.primbon.com/" + $("#body > span > img").attr("src");
      result = {
        penjelasan: res,
        statistik: stats
      }, resolve(result);
    });
  });
}
async function kecocokannama(nama, tanggal) {
  return new Promise((resolve, reject) => {
    const tgl = Tanggal(tanggal).tanggal,
      bln = Tanggal(tanggal).bulan,
      thn = Tanggal(tanggal).tahun;
    request({
      method: "POST",
      url: "https://primbon.com/kecocokan_nama.php",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      form: {
        nama: nama,
        tgl: tgl,
        bln: bln,
        thn: thn,
        kirim: " Submit! "
      }
    }, function(error, response, body) {
      if (error) throw new Error(error);
      const result = cheerio.load(body)("#body").text().replace(/^\s*\n/gm, "").replace("Tgl. Lahir:", "\nTanggal Lahir:").replace(/< Hitung Kembali.*$/s, "");
      resolve(result);
    });
  });
}
async function haribaik(tanggal) {
  return new Promise((resolve, reject) => {
    const tgl = Tanggal(tanggal).tanggal,
      bln = Tanggal(tanggal).bulan,
      thn = Tanggal(tanggal).tahun;
    request({
      method: "POST",
      url: "https://primbon.com/petung_hari_baik.php",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      form: {
        tgl: tgl,
        bln: bln,
        thn: thn,
        submit: " Submit! "
      }
    }, function(error, response, body) {
      if (error) throw new Error(error);
      const result = cheerio.load(body)("#body").text().replace(/^\s*\n/gm, "").replace("Watak", "\nWatak").replace("Kamarokam", "Kamarokam\n").replace(thn, `${thn}\n`).replace(/< Hitung Kembali.*$/s, "");
      resolve(result);
    });
  });
}
async function harilarangan(tanggal) {
  return new Promise((resolve, reject) => {
    const tgl = Tanggal(tanggal).tanggal,
      bln = Tanggal(tanggal).bulan,
      thn = Tanggal(tanggal).tahun;
    request({
      method: "POST",
      url: "https://primbon.com/hari_sangar_taliwangke.php",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      form: {
        tgl: tgl,
        bln: bln,
        thn: thn,
        kirim: " Submit! "
      }
    }, function(error, response, body) {
      if (error) throw new Error(error);
      const result = cheerio.load(body)("#body").text().replace(/^\s*\n/gm, "").replace(tgl, `\n${tgl}`).replace("Termasuk", "\nTermasuk").replace(/Untuk mengetahui.*$/s, "");
      resolve(result);
    });
  });
}

function clean(string) {
  return string.replace(/{/g, "").replace(/}/g, "").replace(/"/g, "");
}