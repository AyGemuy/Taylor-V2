import cheerio from "cheerio";
import fetch from "node-fetch";
import axios from "axios";
import request from "request";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  let lister = ["android1", "anime", "anoboydl", "anoboys", "apkmirror", "apkmody", "artinama", "asupanfilm", "asupanfilminfo", "bacaresep", "carigc", "cariresep", "chara", "corona", "devianart", "dewabatch", "drakor", "film", "gempa", "ghfollower", "ghfollowing", "ghuser", "goredl", "happymod", "happymoddl", "hentaivid", "igdll", "igstalk", "job", "kiryu", "konachan", "manga", "mangatoon", "mediafire", "palingmurah", "pinterest", "pornvid", "randomgore", "randomtt", "searchgore", "sfiledown", "sfilesearch", "soundcloud", "stickersearch", "textmakervid", "trendtwit", "wallpapercave", "wallpapercraft", "wallpaperhd", "wattpad", "webtoons", "wikisearch", "zerochan"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split(/[^\w\s]/g);
  if (!lister.includes(feature)) return m.reply("*Example:*\n.fs youtube.search.hello\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("android1" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await android1(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("anime" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await anime(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("anoboydl" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await anoboydl(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("anoboys" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await anoboys(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("apkmirror" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await apkmirror(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("apkmody" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await apkmody(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("artinama" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await artinama(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("asupanfilm" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await asupanfilm(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("asupanfilminfo" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await asupanfilminfo(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("bacaresep" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await bacaresep(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("carigc" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await carigc(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("cariresep" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await cariresep(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("chara" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await chara(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("corona" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await corona(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("devianart" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await devianart(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("dewabatch" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await dewabatch(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("drakor" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await drakor(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("film" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await film(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("gempa" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await gempa(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("ghfollower" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await ghfollower(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("ghfollowing" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await ghfollowing(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("ghuser" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await ghuser(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("goredl" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await goredl(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("happymod" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await happymod(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("happymoddl" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await happymoddl(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("hentaivid" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await hentaivid(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("igdll" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await igdll(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("igstalk" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await igstalk(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("job" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await job(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("kiryu" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await kiryu(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("konachan" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await konachan(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("manga" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await manga(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("mangatoon" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await mangatoon(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("mediafire" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await mediafire(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("palingmurah" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await palingmurah(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("pinterest" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await pinterest(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("pornvid" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await pornvid(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("randomgore" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await randomgore(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("randomtt" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await randomtt(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("searchgore" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await searchgore(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("sfiledown" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await sfiledown(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("sfilesearch" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await sfilesearch(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("soundcloud" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await soundcloud(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("stickersearch" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await stickersearch(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("textmakervid" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await textmakervid(inputs, inputs_);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("trendtwit" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await trendtwit(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("wallpapercave" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await wallpapercave(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("wallpapercraft" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await wallpapercraft(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("wallpaperhd" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await wallpaperhd(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("wattpad" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await wattpad(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("webtoons" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await webtoons(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("wikisearch" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await wikisearch(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("zerochan" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await zerochan(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
  }
};
handler.help = ["scrap3 type query"], handler.tags = ["internet"], handler.command = /^(scrap3)$/i;
export default handler;

function randomarray(array) {
  return array[Math.floor(Math.random() * array.length)];
}
async function hentaivid() {
  return new Promise((resolve, reject) => {
    axios.get("https://sfmcompile.club/?redirect_to=random").then(data => {
      const $ = cheerio.load(data.data),
        hasil = [];
      $("#primary > div > div > ul > li > article").each(function(a, b) {
        hasil.push({
          title: $(b).find("header > h2").text(),
          link: $(b).find("header > h2 > a").attr("href"),
          category: $(b).find("header > div.entry-before-title > span > span").text().replace("in ", ""),
          share_count: $(b).find("header > div.entry-after-title > p > span.entry-shares").text(),
          views_count: $(b).find("header > div.entry-after-title > p > span.entry-views").text(),
          type: $(b).find("source").attr("type") || "image/jpeg",
          video_1: $(b).find("source").attr("src") || $(b).find("img").attr("data-src"),
          video_2: $(b).find("video > a").attr("href") || ""
        });
      });
      const random = hasil[Math.floor(Math.random() * hasil.length)];
      resolve({
        status: data.status,
        creator: "Wudysoft",
        hasil: random
      });
    });
  });
}
async function pornvid() {
  return new Promise((resolve, reject) => {
    axios.get("https://tikporntok.com/?random=1").then(res => {
      const $ = cheerio.load(res.data),
        hasil = {};
      hasil.title = $("article > h1").text(), hasil.source = $("article > div.video-wrapper.vxplayer").attr("data-post") || "Web Not Response",
        hasil.thumb = $("article > div.video-wrapper.vxplayer > div.vx_el").attr("data-poster") || "https://4.bp.blogspot.com/-hyMqjmQQq4o/W6al-Rk4IpI/AAAAAAAADJ4/m-lVBA_GC9Q5d4BIQg8ZO3fYmQQC3LqSACLcBGAs/s1600/404_not_found.png",
        hasil.desc = $("article > div.intro").text(), hasil.upload = $("article > div.single-pre-meta.ws.clearfix > time").text(),
        hasil.like = $("article > div.single-pre-meta.ws.clearfix > div > span:nth-child(1) > span").text(),
        hasil.dislike = $("article > div.single-pre-meta.ws.clearfix > div > span:nth-child(2) > span").text(),
        hasil.favorite = $("article > div.single-pre-meta.ws.clearfix > div > span:nth-child(3) > span").text(),
        hasil.views = $("article > div.single-pre-meta.ws.clearfix > div > span:nth-child(4) > span").text(),
        hasil.tags = $("article > div.post-tags").text(), hasil.video = $("article > div.video-wrapper.vxplayer > div.vx_el").attr("src") || $("article > div.video-wrapper.vxplayer > div.vx_el").attr("data-src") || "https://4.bp.blogspot.com/-hyMqjmQQq4o/W6al-Rk4IpI/AAAAAAAADJ4/m-lVBA_GC9Q5d4BIQg8ZO3fYmQQC3LqSACLcBGAs/s1600/404_not_found.png",
        resolve({
          status: res.status,
          creator: "Wudysoft",
          hasil: hasil
        });
    });
  });
}
async function asupanfilm(query) {
  return new Promise(resolve => {
    axios.get(`https://asupanfilm.link/?search=${query}`).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        judul = [],
        desc = [],
        thumb = [],
        link = [],
        result = [];
      $("body > div > div > div.card-body.p-2 > ul > li > div > div > h6 > a").each(function(a, b) {
        let deta = $(b).text();
        judul.push(deta);
      }), $("body > div > div > div.card-body.p-2 > ul > li > div > div").each(function(a, b) {
        let deta = $(b).text();
        desc.push(deta.split("   ")[2]);
      }), $("body > div > div > div.card-body.p-2 > ul > li > div > img").each(function(a, b) {
        thumb.push($(b).attr("src").split("UX67_CR0,0,67,98_AL_")[0]);
      }), $("body > div > div > div.card-body.p-2 > ul > li > div > div > h6 > a").each(function(a, b) {
        link.push("https://asupanfilm.link/" + $(b).attr("href"));
      });
      for (let i = 0; i < judul.length; i++) result.push({
        judul: judul[i],
        deskripsi: desc[i],
        thumb: thumb[i],
        link: link[i]
      });
      resolve(result);
    });
  });
}
async function asupanfilminfo(link) {
  return new Promise(resolve => {
    axios.get(link).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        info = {
          judul: $("body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(1)").text(),
          thumb: $("body > div > div.card.mb-3 > div.card-footer > a").attr("href"),
          alurcerita_imdb: $("body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(2)").text().split(" Alur Cerita IMDb: ")[1],
          alurcerita_tmdb: $("body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(3)").text().split(" Alur Cerita TMDb: ")[1],
          direksi: $("body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(4)").text().split(" Direksi: ")[1],
          pemeran: $("body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(5)").text().split(" Pemeran: ")[1],
          kategori: $("body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(6)").text().split(" Kategori: ")[1],
          negara: $("body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(7)").text().split(" Negara: ")[1],
          tahun_rilis: $("body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(8)").text().split(" Tahun Rilis: ")[1],
          durasi: $("body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(9)").text().split(" Durasi: ")[1],
          skor: $("body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(10)").text().split(" Skor: ")[1],
          kualitas: $("body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(11)").text().split(" Kualitas: ")[1],
          jenis: $("body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(12)").text().split(" Jenis: ")[1]
        };
      resolve(info);
    });
  });
}
async function stickersearch(query) {
  return new Promise(resolve => {
    axios.get(`https://getstickerpack.com/stickers?query=${query}`).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        link = [];
      $("#stickerPacks > div > div:nth-child(3) > div > a").each(function(a, b) {
        link.push($(b).attr("href"));
      });
      let rand = link[Math.floor(Math.random() * link.length)];
      axios.get(rand).then(({
        data
      }) => {
        const $$ = cheerio.load(data),
          url = [];
        $$("#stickerPack > div > div.row > div > img").each(function(a, b) {
          url.push($$(b).attr("src").split("&d=")[0]);
        }), resolve({
          creator: "Wudysoft",
          title: $$("#intro > div > div > h1").text(),
          author: $$("#intro > div > div > h5 > a").text(),
          author_link: $$("#intro > div > div > h5 > a").attr("href"),
          sticker: url
        });
      });
    });
  });
}
async function randomtt(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://brainans.com/search?query=" + query).then(({
      data
    }) => {
      const luser = cheerio.load(data)("#search-container > div:nth-child(1) > div.content__text > a").attr("href");
      axios.get("https://brainans.com/" + luser).then(({
        data
      }) => {
        const $$ = cheerio.load(data);
        let vlink = [];
        $$("#videos_container > div > div.content__list.grid.infinite_scroll.cards > div > div > a").each(function(a, b) {
          vlink.push("https://brainans.com/" + $$(b).attr("href"));
        }), randomarray(vlink).then(res => {
          axios.get(res).then(({
            data
          }) => {
            const $$$ = cheerio.load(data);
            resolve({
              username: $$$("#card-page > div > div.row > div > div > div > div > div.main__user-desc.align-self-center.ml-2 > a").text(),
              caption: $$$("#card-page > div > div.row > div > div > div.main__info.mb-4 > div.main__list").text(),
              like_count: $$$("#card-page > div > div.row > div > div > div.main__info.mb-4 > div > div:nth-child(1) > span").text(),
              comment_count: $$$("#card-page > div > div.row > div > div > div.main__info.mb-4 > div.content__btns.d-flex > div:nth-child(2) > span").text(),
              share_count: $$$("#card-page > div > div.row > div > div > div.main__info.mb-4 > div.content__btns.d-flex > div:nth-child(3) > span").text(),
              videourl: $$$("#card-page > div > div.row > div > div > div.main__info.mb-4 > div.main__image-container > div > video").attr("src")
            });
          });
        });
      });
    });
  });
}
async function trendtwit(country) {
  return new Promise((resolve, reject) => {
    axios.get(`https://getdaytrends.com/${country}/`).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hastag = [],
        tweet = [],
        result = [];
      $("#trends > table.table.table-hover.text-left.clickable.ranking.trends.wider.mb-0 > tbody > tr> td.main > a").each(function(a, b) {
        let deta = $(b).text();
        hastag.push(deta);
      }), $("#trends > table.table.table-hover.text-left.clickable.ranking.trends.wider.mb-0 > tbody > tr > td.main > div > span").each(function(a, b) {
        let deta = $(b).text();
        tweet.push(deta);
      });
      let num = 1;
      for (let i = 0; i < hastag.length; i++) result.push({
        rank: num,
        hastag: hastag[i],
        tweet: tweet[i]
      }), num += 1;
      resolve({
        country: country,
        result: result
      });
    }).catch(reject);
  });
}
async function pinterest(query) {
  return new Promise(async (resolve, reject) => {
    axios.get("https://id.pinterest.com/search/pins/?autologin=true&q=" + query, {
      headers: {
        cookie: '_auth=1; _b="AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg="; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0'
      }
    }).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        result = [],
        hasil = [];
      $("div > a").get().map(b => {
        const link = $(b).find("img").attr("src");
        result.push(link);
      }), result.forEach(v => {
        void 0 !== v && hasil.push(v.replace(/236/g, "736"));
      }), hasil.shift(), resolve(hasil);
    });
  });
}
async function zerochan(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://www.zerochan.net/search?q=" + query).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        judul = [],
        result = [],
        id = [];
      $("#thumbs2 > li > a > img").each(function(a, b) {
        $(b).attr("alt").startsWith("https://static.zerochan.net/") || judul.push($(b).attr("alt"));
      }), $("#thumbs2 > li > a").each(function(a, b) {
        id.push($(b).attr("href"));
      });
      for (let i = 0; i < judul.length; i++) result.push("https://s1.zerochan.net/" + judul[i].replace(/\ /g, ".") + ".600." + id[i].split("/")[1] + ".jpg");
      resolve({
        creator: "Wudysoft",
        result: result
      });
    }).catch(reject);
  });
}
async function happymoddl(link) {
  return new Promise((resolve, reject) => {
    axios.get(link).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        link = [],
        jlink = [],
        result = [],
        title = $("body > div > div.container-left > section:nth-child(1) > div > h1").text(),
        info = $("body > div > div.container-left > section:nth-child(1) > div > ul").text();
      $("body > div.container-row.clearfix.container-wrap.pdt-font-container > div.container-left > section:nth-child(1) > div > div:nth-child(3) > div > p > a").each(function(a, b) {
        let deta = $(b).text();
        jlink.push(deta), $(b).attr("href").startsWith("/") ? link.push("https://happymod.com" + $(b).attr("href")) : link.push($(b).attr("href"));
      });
      for (let i = 0; i < link.length; i++) result.push({
        title: jlink[i],
        dl_link: link[i]
      });
      console.log(link), resolve({
        creator: "Wudysoft",
        title: title,
        info: info.replace(/\t|- /g, ""),
        download: link
      });
    }).catch(reject);
  });
}
async function goredl(link) {
  return new Promise(async (resolve, reject) => {
    axios.get(link).then(({
      data
    }) => {
      const $$ = cheerio.load(data),
        format = {
          judul: $$("div.single-main-container > div > div.bb-col.col-content > div > div > div > div > header > h1").text(),
          views: $$("div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > span > span.count").text(),
          comment: $$("div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > a > span.count").text(),
          link: $$("video > source").attr("src")
        };
      resolve({
        creator: "Wudysoft",
        data: format
      });
    }).catch(reject);
  });
}
async function chara(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.anime-planet.com/characters/all?name=${query}&sort=likes&order=desc`).then(data => {
      const linkp = cheerio.load(data.data)("#siteContainer > table > tbody > tr:nth-child(1) > td.tableCharInfo > a").attr("href");
      axios.get("https://www.anime-planet.com" + linkp).then(data => {
        const $$ = cheerio.load(data.data);
        resolve({
          nama: $$("#siteContainer > h1").text(),
          gender: $$("#siteContainer > section.pure-g.entryBar > div:nth-child(1)").text().split("\nGender: ")[1],
          warna_rambut: $$("#siteContainer > section.pure-g.entryBar > div:nth-child(2)").text().split("\nHair Color: ")[1],
          warna_mata: $$("#siteContainer > section:nth-child(11) > div > div > div > div > div:nth-child(1) > div").text().split("\n")[1],
          gol_darah: $$("#siteContainer > section:nth-child(11) > div > div > div > div > div:nth-child(2) > div").text().split("\n")[1],
          birthday: $$("#siteContainer > section:nth-child(11) > div > div > div > div > div:nth-child(3) > div").text().split("\n")[1],
          description: $$("#siteContainer > section:nth-child(11) > div > div > div > div:nth-child(1) > p").text()
        });
      });
    }).catch(reject);
  });
}
async function anime(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.anime-planet.com/anime/all?name=${query}`).then(data => {
      const $ = cheerio.load(data.data),
        result = [],
        judul = [],
        link = [],
        thumb = [];
      $("#siteContainer > ul.cardDeck.cardGrid > li > a > h3").each(function(a, b) {
        let deta = $(b).text();
        judul.push(deta);
      }), $("#siteContainer > ul.cardDeck.cardGrid > li > a").each(function(a, b) {
        link.push("https://www.anime-planet.com" + $(b).attr("href"));
      }), $("#siteContainer > ul.cardDeck.cardGrid > li > a > div.crop > img").each(function(a, b) {
        thumb.push("https://www.anime-planet.com" + $(b).attr("src"));
      });
      for (let i = 0; i < judul.length; i++) result.push({
        judul: judul[i],
        thumb: thumb[i],
        link: link[i]
      });
      resolve(result);
    }).catch(reject);
  });
}
async function manga(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.anime-planet.com/manga/all?name=${query}`).then(data => {
      const $ = cheerio.load(data.data),
        result = [],
        judul = [],
        link = [],
        thumb = [];
      $("#siteContainer > ul.cardDeck.cardGrid > li > a > h3").each(function(a, b) {
        let deta = $(b).text();
        judul.push(deta);
      }), $("#siteContainer > ul.cardDeck.cardGrid > li > a").each(function(a, b) {
        link.push("https://www.anime-planet.com" + $(b).attr("href"));
      }), $("#siteContainer > ul.cardDeck.cardGrid > li > a > div.crop > img").each(function(a, b) {
        thumb.push("https://www.anime-planet.com" + $(b).attr("src"));
      });
      for (let i = 0; i < judul.length; i++) result.push({
        judul: judul[i],
        thumb: thumb[i],
        link: link[i]
      });
      resolve(result);
    }).catch(reject);
  });
}
async function job(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.jobstreet.co.id/id/job-search/${query}-jobs/`).then(data => {
      const $ = cheerio.load(data.data),
        job = [],
        perusahaan = [],
        daerah = [],
        format = [],
        link = [],
        upload = [];
      $("#jobList > div > div:nth-child(3) > div > div > div > div > article > div > div > div > div > div > h1 > a > div").each(function(a, b) {
        let deta = $(b).text();
        job.push(deta);
      }), $("#jobList > div > div:nth-child(3) > div > div > div > div > article > div > div > div > div > div > span").each(function(a, b) {
        let deta = $(b).text();
        perusahaan.push(deta);
      }), $("#jobList > div > div:nth-child(3) > div > div > div > div > article > div > div > div > div > span > span").each(function(a, b) {
        let deta = $(b).text();
        daerah.push(deta);
      }), $("#jobList > div > div:nth-child(3) > div > div > div > div > article > div > div > div > div > div > h1 > a").each(function(a, b) {
        link.push($(b).attr("href"));
      }), $("#jobList > div > div:nth-child(3) > div > div > div > div > article > div > div > div.sx2jih0.zcydq852.zcydq842.zcydq872.zcydq862.zcydq82a.zcydq832.zcydq8d2.zcydq8cq > div.sx2jih0.zcydq832.zcydq8cq.zcydq8c6.zcydq882 > time > span").each(function(a, b) {
        let deta = $(b).text();
        upload.push(deta);
      });
      for (let i = 0; i < job.length; i++) format.push({
        job: job[i],
        perusahaan: perusahaan[i],
        daerah: daerah[i],
        upload: upload[i],
        link_Detail: "https://www.jobstreet.co.id" + link[i]
      });
      resolve(format);
    }).catch(reject);
  });
}
async function anoboys(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://anoboy.media/?s=" + query).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        format = [],
        link = [],
        judul = [],
        thumb = [],
        uptime = [];
      $("body > div.wrap > div.container > div.column-content > a > div > div.amvj > h3").each(function(a, b) {
        let jud = $(b).text();
        judul.push(jud);
      }), $("body > div.wrap > div.container > div.column-content > a > div > div.jamup").each(function(c, d) {
        let upt = $(d).text();
        uptime.push(upt);
      }), $("body > div.wrap > div.container > div.column-content > a > div > amp-img").each(function(e, f) {
        thumb.push($(f).attr("src"));
      }), $("body > div.wrap > div.container > div.column-content > a").each(function(g, h) {
        link.push($(h).attr("href"));
      });
      for (let i = 0; i < link.length; i++) format.push({
        judul: judul[i],
        thumb: thumb[i],
        link: link[i]
      });
      const result = {
        status: data.status,
        creator: "Wudysoft",
        data: format
      };
      resolve(result);
    }).catch(reject);
  });
}
async function anoboydl(query) {
  return new Promise((resolve, reject) => {
    axios.get(query).then(({
      data
    }) => {
      const $ = cheerio.load(data);
      resolve({
        judul: $("body > div.wrap > div.container > div.pagetitle > h1").text(),
        uptime: $("body > div.wrap > div.container > div.pagetitle > div > div > span > time").text(),
        direct_link: $("#tontonin > source").attr("src"),
        mforu: {
          SD: $("#colomb > p > span:nth-child(1) > a:nth-child(3)").attr("href"),
          HD: $("#colomb > p > span:nth-child(1) > a:nth-child(5)").attr("href")
        },
        zippy: {
          SD: $("#colomb > p > span:nth-child(3) > a:nth-child(3)").attr("href"),
          HD: $("#colomb > p > span:nth-child(3) > a:nth-child(5)").attr("href")
        },
        mirror: {
          SD: $("#colomb > p > span:nth-child(5) > a:nth-child(3)").attr("href"),
          HD: $("#colomb > p > span:nth-child(5) > a:nth-child(5)").attr("href")
        }
      });
    }).catch(reject);
  });
}
async function film(query) {
  return new Promise((resolve, reject) => {
    axios.get(`http://167.99.71.200/?s=${query}`).then(data => {
      const $ = cheerio.load(data.data),
        judul = [],
        genre = [],
        thumb = [],
        link = [],
        format = [];
      $("div > div.item-article > header > h2 > a").each(function(a, b) {
        let deta = $(b).text();
        judul.push(deta);
      }), $("div > div.item-article > header > div.gmr-movie-on").each(function(a, b) {
        let deta = $(b).text();
        genre.push(deta);
      }), $("div > div.content-thumbnail.text-center > a > img").each(function(a, b) {
        thumb.push($(b).attr("src"));
      }), $("div > div.item-article > header > div.gmr-watch-movie > a").each(function(a, b) {
        link.push($(b).attr("href"));
      });
      for (let i = 0; i < judul.length; i++) format.push({
        judul: judul[i],
        genre: genre[i],
        thumb: thumb[i],
        link_nonton: link[i]
      });
      resolve("" === format ? {
        status: "error"
      } : format);
    }).catch(reject);
  });
}
async function webtoons(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.webtoons.com/id/search?keyword=${query}`).then(data => {
      const $ = cheerio.load(data.data),
        judul = [],
        genre = [],
        author = [],
        link = [],
        likes = [],
        format = [];
      $("#content > div > ul > li > a > div > p.subj").each(function(a, b) {
        let deta = $(b).text();
        judul.push(deta);
      }), $("div > ul > li > a > span").each(function(a, b) {
        let deta = $(b).text();
        genre.push(deta);
      }), $("div > ul > li > a > div > p.author").each(function(a, b) {
        let deta = $(b).text();
        author.push(deta);
      }), $("div > ul > li > a > div > p.grade_area > em").each(function(a, b) {
        let deta = $(b).text();
        likes.push(deta);
      }), $("#content > div > ul > li > a").each(function(a, b) {
        link.push($(b).attr("href"));
      });
      for (let i = 0; i < judul.length; i++) format.push({
        judul: judul[i],
        genre: genre[i],
        author: author[i],
        likes: likes[i],
        link: "https://www.webtoons.com" + link[i]
      });
      resolve("" === likes ? {
        status: `${query} tidak dapat ditemukan/error`
      } : format);
    }).catch(reject);
  });
}
async function soundcloud(link) {
  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: "https://www.klickaud.co/download.php",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      formData: {
        value: link,
        "2311a6d881b099dc3820600739d52e64a1e6dcfe55097b5c7c649088c4e50c37": "710c08f2ba36bd969d1cbc68f59797421fcf90ca7cd398f78d67dfd8c3e554e3"
      }
    }, async function(error, response, body) {
      if (console.log(body), error) throw new Error(error);
      const $ = cheerio.load(body);
      resolve({
        judul: $("#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(2)").text(),
        download_count: $("#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(3)").text(),
        thumb: $("#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(1) > img").attr("src"),
        link: $("#dlMP3").attr("onclick").split("downloadFile('")[1].split("',")[0]
      });
    });
  });
}
async function igdll(link) {
  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: "https://downloadgram.org/#downloadhere",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      formData: {
        url: link,
        submit: ""
      }
    }, async function(error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body),
        result = [];
      $("div.downloadBox > a").each(function(a, b) {
        result.push($(b).attr("href"));
      }), console.log(result), resolve(result);
    });
  });
}
async function igstalk(username) {
  return new Promise(async (resolve, reject) => {
    let {
      data
    } = await axios("https://www.instagram.com/" + username + "/?__a=1", {
      method: "GET",
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
        cookie: '_auth=1; _b="AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg="; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0'
      }
    }), user = data.graphql.user;
    resolve({
      creator: "Wudysoft",
      status: "ok",
      code: 200,
      username: user.username,
      fullname: user.full_name,
      verified: user.is_verified,
      video_count_reel: user.highlight_reel_count,
      followers: user.edge_followed_by.count,
      follow: user.edge_follow.count,
      is_bussines: user.is_business_account,
      is_professional: user.is_professional_account,
      category: user.category_name,
      thumbnail: user.profile_pic_url_hd,
      bio: user.biography,
      info_account: data.seo_category_infos
    });
  });
}
async function gempa() {
  return new Promise(async (resolve, reject) => {
    axios.get("https://www.bmkg.go.id/gempabumi/gempabumi-dirasakan.bmkg").then(({
      data
    }) => {
      const $ = cheerio.load(data),
        drasa = [];
      $("table > tbody > tr:nth-child(1) > td:nth-child(6) > span").get().map(rest => {
        let dir = $(rest).text();
        drasa.push(dir.replace("\t", " "));
      });
      let teks = "";
      for (let i = 0; i < drasa.length; i++) teks += drasa[i] + "\n";
      const rasa = teks,
        format = {
          imagemap: $("div.modal-body > div > div:nth-child(1) > img").attr("src"),
          magnitude: $("table > tbody > tr:nth-child(1) > td:nth-child(4)").text(),
          kedalaman: $("table > tbody > tr:nth-child(1) > td:nth-child(5)").text(),
          wilayah: $("table > tbody > tr:nth-child(1) > td:nth-child(6) > a").text(),
          waktu: $("table > tbody > tr:nth-child(1) > td:nth-child(2)").text(),
          lintang_bujur: $("table > tbody > tr:nth-child(1) > td:nth-child(3)").text(),
          dirasakan: rasa
        };
      resolve({
        creator: "Wudysoft",
        data: format
      });
    }).catch(reject);
  });
}
async function cariresep(query) {
  return new Promise(async (resolve, reject) => {
    axios.get("https://resepkoki.id/?s=" + query).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        link = [],
        judul = [],
        format = [];
      $("body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-media > a").each(function(a, b) {
        link.push($(b).attr("href"));
      }), $("body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-content > header > h3 > a").each(function(c, d) {
        let jud = $(d).text();
        judul.push(jud);
      });
      for (let i = 0; i < link.length; i++) format.push({
        judul: judul[i],
        link: link[i]
      });
      resolve({
        data: format
      });
    }).catch(reject);
  });
}
async function bacaresep(query) {
  return new Promise(async (resolve, reject) => {
    axios.get(query).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        abahan = [],
        atakaran = [],
        atahap = [];
      $("body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-name").each(function(a, b) {
        let bh = $(b).text();
        abahan.push(bh);
      }), $("body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-amount").each(function(c, d) {
        let uk = $(d).text();
        atakaran.push(uk);
      }), $("body > div.all-wrapper with-animations > div.single-panel os-container > div.single-panel-main > div.single-content > div.single-steps > table > tbody > tr > td.single-step-description > div > p").each(function(e, f) {
        let th = $(f).text();
        atahap.push(th);
      });
      const judul = $("body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-title > h1").text(),
        waktu = $("body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-cooking-time > span").text(),
        hasil = $("body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-serves > span").text().split(": ")[1],
        level = $("body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-difficulty > span").text().split(": ")[1],
        thumb = $("body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-main-media > img").attr("src");
      let tbahan = "bahan\n";
      for (let i = 0; i < abahan.length; i++) tbahan += abahan[i] + " " + atakaran[i] + "\n";
      let ttahap = "tahap\n";
      for (let i = 0; i < atahap.length; i++) ttahap += atahap[i] + "\n\n";
      const tahap = ttahap,
        result = {
          data: {
            judul: judul,
            waktu_masak: waktu,
            hasil: hasil,
            tingkat_kesulitan: level,
            thumb: thumb,
            bahan: tbahan.split("bahan\n")[1],
            langkah_langkah: tahap.split("tahap\n")[1]
          }
        };
      resolve(result);
    }).catch(reject);
  });
}
async function searchgore(query) {
  return new Promise(async (resolve, reject) => {
    axios.get("https://seegore.com/?s=" + query).then(dataa => {
      let pagina = cheerio.load(dataa)("#main > div.container.main-container > div > div.bb-col.col-content > div > div > div > div > nav > ul > li:nth-child(4) > a").text(),
        rand = Math.floor(Math.random() * pagina) + 1;
      if (1 === rand) var slink = "https://seegore.com/?s=" + query;
      else slink = `https://seegore.com/page/${rand}/?s=${query}`;
      axios.get(slink).then(({
        data
      }) => {
        const $ = cheerio.load(data),
          link = [],
          judul = [],
          uploader = [],
          format = [],
          thumb = [];
        $("#post-items > li > article > div.content > header > h2 > a").each(function(a, b) {
          link.push($(b).attr("href"));
        }), $("#post-items > li > article > div.content > header > h2 > a").each(function(c, d) {
          let jud = $(d).text();
          judul.push(jud);
        }), $("#post-items > li > article > div.content > header > div > div.bb-cat-links > a").each(function(e, f) {
          let upl = $(f).text();
          uploader.push(upl);
        }), $("#post-items > li > article > div.post-thumbnail > a > div > img").each(function(g, h) {
          thumb.push($(h).attr("src"));
        });
        for (let i = 0; i < link.length; i++) format.push({
          judul: judul[i],
          uploader: uploader[i],
          thumb: thumb[i],
          link: link[i]
        });
        resolve({
          creator: "Wudysoft",
          data: format
        });
      }).catch(reject);
    });
  });
}
async function randomgore() {
  return new Promise(async (resolve, reject) => {
    axios.get("https://seegore.com/gore/").then(dataa => {
      let pagina = cheerio.load(dataa)("#main > div.container.main-container.bb-stretched-full > div > div > div > div > div > div > nav > ul > li:nth-child(4) > a").text(),
        rand = Math.floor(Math.random() * pagina) + 1,
        randvid = Math.floor(16 * Math.random()) + 1;
      if (1 === rand) var slink = "https://seegore.com/gore/";
      else slink = `https://seegore.com/gore/page/${rand}/`;
      axios.get(slink).then(({
        data
      }) => {
        const $ = cheerio.load(data),
          linkp = $(`#post-items > li:nth-child(${randvid}) > article > div.post-thumbnail > a`).attr("href"),
          thumbb = $(`#post-items > li:nth-child(${randvid}) > article > div.post-thumbnail > a > div > img`).attr("src");
        axios.get(linkp).then(({
          data
        }) => {
          const $$ = cheerio.load(data),
            format = {
              judul: $$("div.single-main-container > div > div.bb-col.col-content > div > div > div > div > header > h1").text(),
              views: $$("div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > span > span.count").text(),
              comment: $$("div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > a > span.count").text(),
              thumb: thumbb,
              link: $$("video > source").attr("src")
            };
          resolve({
            creator: "Wudysoft",
            data: format
          });
        });
      }).catch(reject);
    });
  });
}
async function textmakervid(text1, style) {
  if ("poly" === style) var tstyle = 0;
  else if ("bold" === style) tstyle = 1;
  else if ("glowing" === style) tstyle = 2;
  else if ("colorful" === style) tstyle = 3;
  else if ("army" === style) tstyle = 4;
  else if ("retro" === style) tstyle = 5;
  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: "https://photooxy.com/other-design/make-a-video-that-spells-your-name-237.html",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      formData: {
        optionNumber_0: tstyle,
        text_1: text1,
        login: "OK"
      }
    }, async function(error, response, body) {
      if (error) throw new Error(error);
      const result = {
        url: cheerio.load(body)("div.btn-group > a").attr("href")
      };
      resolve(result);
    });
  });
}
async function apkmirror(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://www.apkmirror.com/?post_type=app_release&searchtype=apk&s=" + query).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        nama = [],
        developer = [],
        lupdate = [],
        size = [],
        down = [],
        version = [],
        link = [],
        format = [];
      $("#content > div > div > div.appRow > div > div > div > h5 > a").each(function(a, b) {
        let nem = $(b).text();
        nama.push(nem);
      }), $("#content > div > div > div.appRow > div > div > div > a").each(function(c, d) {
        let dev = $(d).text();
        developer.push(dev);
      }), $("#content > div > div > div.appRow > div > div > div > div.downloadIconPositioning > a").each(function(e, f) {
        link.push("https://www.apkmirror.com" + $(f).attr("href"));
      }), $("#content > div > div > div.infoSlide > p > span.infoslide-value").each(function(g, h) {
        let data = $(h).text();
        data.match("MB") ? size.push(data) : data.match("UTC") ? lupdate.push(data) : !isNaN(data) || data.match(",") ? down.push(data) : version.push(data);
      });
      for (let i = 0; i < link.length; i++) format.push({
        judul: nama[i],
        dev: developer[i],
        size: size[i],
        version: version[i],
        uploaded_on: lupdate[i],
        download_count: down[i],
        link: link[i]
      });
      resolve({
        creator: "Wudysoft",
        data: format
      });
    }).catch(reject);
  });
}
async function sfiledown(link) {
  return new Promise((resolve, reject) => {
    axios.get(link).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        nama = $("body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(2) > b").text(),
        size = $("#download").text().split("Download File"),
        desc = $("body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(7) > center > h1").text(),
        type = $("body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(4) > a:nth-child(3)").text(),
        upload = $("body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(5)").text(),
        uploader = $("body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(4) > a:nth-child(2)").text(),
        download = $("body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(6)").text(),
        link = $("#download").attr("href");
      let other = link.split("/")[7].split("&is")[0];
      const format = {
        judul: nama + other.substr(other.length - 6).split(".")[1],
        size: size[1].split("(")[1].split(")")[0],
        type: type,
        mime: other.substr(other.length - 6).split(".")[1],
        desc: desc,
        uploader: uploader,
        uploaded: upload.split("\n - Uploaded: ")[1],
        download_count: download.split(" - Downloads: ")[1],
        link: link
      };
      resolve({
        data: format
      });
    }).catch(reject);
  });
}
async function android1(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://an1.com/tags/MOD/?story=" + query + "&do=search&subaction=search").then(({
      data
    }) => {
      const $ = cheerio.load(data),
        nama = [],
        link = [],
        rating = [],
        thumb = [],
        developer = [],
        format = [];
      $("body > div.page > div > div > div.app_list > div > div > div.cont > div.data > div.name > a > span").each(function(a, b) {
        let nem = $(b).text();
        nama.push(nem);
      }), $("div > ul > li.current-rating").each(function(c, d) {
        let rat = $(d).text();
        rating.push(rat);
      }), $("body > div.page > div > div > div.app_list > div > div > div.cont > div.data > div.developer.xsmf.muted").each(function(e, f) {
        let dev = $(f).text();
        developer.push(dev);
      }), $("body > div.page > div > div > div.app_list > div > div > div.img > img").each(function(g, h) {
        thumb.push($(h).attr("src"));
      }), $("body > div.page > div > div > div.app_list > div > div > div.cont > div.data > div.name > a").each(function(i, j) {
        link.push($(j).attr("href"));
      });
      for (let i = 0; i < link.length; i++) format.push({
        judul: nama[i],
        dev: developer[i],
        rating: rating[i],
        thumb: thumb[i],
        link: link[i]
      });
      resolve({
        creator: "Wudysoft",
        data: format
      });
    }).catch(reject);
  });
}
async function apkmody(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://apkmody.io/?s=" + query).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        nama = [],
        link = [],
        mod = [],
        thumb = [],
        format = [];
      $("#primary > section:nth-child(3) > div > div > div > article > a > div > div > div > h2").each(function(a, b) {
        let nem = $(b).text();
        nama.push(nem);
      }), $("#primary > section:nth-child(3) > div > div > div > article > a > div > div > p").each(function(c, d) {
        let modd = $(d).text();
        mod.push(modd.split("\n")[1]);
      }), $("#primary > section:nth-child(3) > div > div > div > article > a > div > img").each(function(e, f) {
        thumb.push($(f).attr("src"));
      }), $("#primary > section:nth-child(3) > div > div > div > article > a").each(function(g, h) {
        link.push($(h).attr("href"));
      });
      for (let i = 0; i < link.length; i++) format.push({
        judul: nama[i],
        infomod: mod[i],
        thumb: thumb[i],
        link: link[i]
      });
      resolve({
        creator: "Wudysoft",
        data: format
      });
    }).catch(reject);
  });
}
async function happymod(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://www.happymod.com/search.html?q=" + query).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        nama = [],
        link = [],
        rating = [],
        thumb = [],
        format = [];
      $("body > div.container-row.clearfix.container-wrap > div.container-left > section > div > div > h3 > a").each(function(a, b) {
        let nem = $(b).text();
        nama.push(nem), link.push("https://happymod.com" + $(b).attr("href"));
      }), $("body > div.container-row.clearfix.container-wrap > div.container-left > section > div > div > div.clearfix > span").each(function(c, d) {
        let rat = $(d).text();
        rating.push(rat);
      }), $("body > div.container-row.clearfix.container-wrap > div.container-left > section > div > a > img").each(function(e, f) {
        thumb.push($(f).attr("data-original"));
      });
      for (let i = 0; i < link.length; i++) format.push({
        judul: nama[i],
        thumb: thumb[i],
        rating: rating[i],
        link: link[i]
      });
      resolve({
        creator: "Wudysoft",
        data: format
      });
    }).catch(reject);
  });
}
async function ghuser(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://github.com/search?q=" + query + "&type=users").then(({
      data
    }) => {
      const $ = cheerio.load(data),
        username = [],
        link = [],
        result = [],
        thumb = [];
      $("#user_search_results > div > div > div.flex-auto > div > div.f4.text-normal > a.color-text-secondary").each(function(a, b) {
        link.push("https://github.com/" + $(b).attr("href"));
        let usr = $(b).text();
        username.push(usr);
      }), $("#user_search_results > div > div > div.flex-shrink-0.mr-2 > a > img").each(function(c, d) {
        thumb.push($(d).attr("src").replace("s=40&", ""));
      });
      for (let i = 0; i < link.length; i++) result.push({
        name: username[i],
        thumb: thumb[i],
        link: link[i]
      });
      resolve(result);
    }).catch(reject);
  });
}
async function ghfollower(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://github.com/" + query + "?tab=followers").then(({
      data
    }) => {
      const $ = cheerio.load(data),
        link = [],
        result = [],
        username = [];
      $("#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-9.mb-4.mb-md-0 > div > div > div > div.d-table-cell.col-9.v-align-top.pr-3 > a").each(function(a, b) {
        link.push("https://github.com/" + $(b).attr("href")), username.push($(b).attr("href").split("/")[1]);
      });
      for (let i = 0; i < link.length; i++) result.push({
        username: username[i],
        link: link[i]
      });
      const hasil = {
        username: $("#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.js-profile-editable-replace > div.clearfix.d-flex.d-md-block.flex-items-center.mb-4.mb-md-0 > div.vcard-names-container.float-left.js-profile-editable-names.col-12.py-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-nickname.vcard-username.d-block").text().split("\n")[1].replace("          ", ""),
        followers: $("#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.js-profile-editable-replace > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div.flex-order-1.flex-md-order-none.mt-2.mt-md-0 > div > a:nth-child(1) > span").text(),
        avatar: $("#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.js-profile-editable-replace > div.clearfix.d-flex.d-md-block.flex-items-center.mb-4.mb-md-0 > div.position-relative.d-inline-block.col-2.col-md-12.mr-3.mr-md-0.flex-shrink-0 > a > img").attr("src"),
        listfollowers: result
      };
      resolve(hasil);
    }).catch(reject);
  });
}
async function ghfollowing(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://github.com/" + query + "?tab=following").then(({
      data
    }) => {
      const $ = cheerio.load(data),
        link = [],
        result = [],
        username = [];
      $("#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-9.mb-4.mb-md-0 > div > div > div > div.d-table-cell.col-9.v-align-top.pr-3 > a").each(function(a, b) {
        link.push("https://github.com/" + $(b).attr("href")), username.push($(b).attr("href").split("/")[1]);
      });
      for (let i = 0; i < link.length; i++) result.push({
        username: username[i],
        link: link[i]
      });
      const hasil = {
        username: $("#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.js-profile-editable-replace > div.clearfix.d-flex.d-md-block.flex-items-center.mb-4.mb-md-0 > div.vcard-names-container.float-left.js-profile-editable-names.col-12.py-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-nickname.vcard-username.d-block").text().split("\n")[1].replace("          ", ""),
        following: $("#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.js-profile-editable-replace > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div.flex-order-1.flex-md-order-none.mt-2.mt-md-0 > div > a:nth-child(1) > span").text(),
        avatar: $("#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.js-profile-editable-replace > div.clearfix.d-flex.d-md-block.flex-items-center.mb-4.mb-md-0 > div.position-relative.d-inline-block.col-2.col-md-12.mr-3.mr-md-0.flex-shrink-0 > a > img").attr("src"),
        listfollowing: result
      };
      resolve(hasil);
    }).catch(reject);
  });
}
async function corona(country) {
  if (!country) return loghandler.noinput;
  try {
    const res = await axios.request("https://www.worldometers.info/coronavirus/country/" + country, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Linux; Android 9; Redmi 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36"
      }
    });
    let result = {};
    const $ = cheerio.load(res.data);
    return result.status = res.status, result.negara = $("div").find("h1").text().slice(3).split(/ /g)[0],
      result.total_kasus = $("div#maincounter-wrap").find("div.maincounter-number > span").eq(0).text() + " total",
      result.total_kematian = $("div#maincounter-wrap").find("div.maincounter-number > span").eq(1).text() + " total",
      result.total_sembuh = $("div#maincounter-wrap").find("div.maincounter-number > span").eq(2).text() + " total",
      result.informasi = $("div.content-inner > div").eq(1).text(), result.informasi_lengkap = "https://www.worldometers.info/coronavirus/country/" + country, "" === result.negara && (result.status = "error"), result;
  } catch (e) {
    return "=> Error => " + e;
  }
}
async function mangatoon(search) {
  if (!search) return "No Querry Input! Bakaa >//<";
  try {
    const res = await axios.get(`https://mangatoon.mobi/en/search?word=${search}`, {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Linux; Android 9; Redmi 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36"
        }
      }),
      hasil = [],
      $ = cheerio.load(res.data);
    return $("div.recommend-item").each(function(a, b) {
      let comic_name = $(b).find("div.recommend-comics-title > span").text(),
        comic_type = $(b).find("div.comics-type > span").text().slice(1).split(/ /g).join(""),
        comic_url = $(b).find("a").attr("href"),
        comic_thumb = $(b).find("img").attr("src");
      const result = {
        status: res.status,
        creator: "Wudysoft",
        comic_name: comic_name,
        comic_type: comic_type,
        comic_url: "https://mangatoon.mobi" + comic_url,
        comic_thumb: comic_thumb
      };
      hasil.push(result);
    }), hasil.filter(v => void 0 !== v.comic_name && void 0 !== v.comic_type);
  } catch (e) {
    return "=> Error =>" + e;
  }
}
async function palingmurah(produk) {
  if (!produk) return "No Querry Input! Bakaaa >//<";
  try {
    const res = await axios.get("https://palingmurah.net/pencarian-produk/?term=" + produk),
      hasil = [],
      $ = cheerio.load(res.data);
    return $("div.ui.card.wpj-card-style-2 ").each(function(a, b) {
      let url = $(b).find("a.image").attr("href"),
        img = $(b).find("img.my_image.lazyload").attr("data-src"),
        title = $(b).find("a.list-header").text().trim(),
        product_desc = $(b).find("div.description.visible-on-list").text().trim(),
        price = $(b).find("div.flex-master.card-job-price.text-right.text-vertical-center").text().trim();
      const result = {
        status: res.status,
        creator: "Wudysoft",
        product: title,
        product_desc: product_desc,
        product_image: img,
        product_url: url,
        price: price
      };
      hasil.push(result);
    }), hasil;
  } catch (e) {
    return "=> Error =>" + e;
  }
}
async function mediafire(query) {
  return new Promise((resolve, reject) => {
    axios.get(query).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        size = ($("body > div.mf-dlr.page.ads-alternate > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div").text(), $("body > div.mf-dlr.page.ads-alternate > div.content > div.center > div > div.dl-info > ul > li:nth-child(1) > span").text()),
        upload_date = $("body > div.mf-dlr.page.ads-alternate > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span").text(),
        link = $("#downloadButton").attr("href"),
        hsil = {
          judul: link.split("/")[5],
          upload_date: upload_date,
          size: size,
          mime: link.split("/")[5].split(".")[1],
          link: link
        };
      resolve(hsil);
    }).catch(reject);
  });
}
async function artinama(query) {
  return new Promise((resolve, reject) => {
    let queryy = query.replace(/ /g, "+");
    axios.get("https://www.primbon.com/arti_nama.php?nama1=" + queryy + "&proses=+Submit%21+").then(({
      data
    }) => {
      const result5 = cheerio.load(data)("#body").text().split("\n      \n        \n        \n")[0].split("ARTI NAMA")[1].split(".\n\n"),
        result6 = result5[0] + "\n\n" + result5[1];
      resolve(result6);
    }).catch(reject);
  });
}
async function drakor(query) {
  return new Promise((resolve, reject) => {
    let queryy = query.replace(/ /g, "+");
    axios.get("https://drakorasia.net/?s=" + queryy + "&post_type=post").then(({
      data
    }) => {
      const $ = cheerio.load(data),
        result = [],
        link = [],
        judul = [],
        thumb = [];
      $("#post > div > div.thumbnail > a").each(function(a, b) {
        link.push($(b).attr("href")), thumb.push($(b).find("img").attr("src"));
      }), $("#post > div > div.title.text-center.absolute.bottom-0.w-full.py-2.pb-4.px-3 > a > h2").each(function(c, d) {
        let titel = $(d).text();
        judul.push(titel);
      });
      for (let i = 0; i < link.length; i++) result.push({
        judul: judul[i],
        thumb: thumb[i],
        link: link[i]
      });
      resolve(result);
    }).catch(reject);
  });
}
async function wattpad(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://www.wattpad.com/search/" + query).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        result = [],
        linkk = [],
        judull = [],
        thumb = [],
        dibaca = [],
        vote = [],
        bab = [];
      $("ul.list-group > li.list-group-item").each(function(a, b) {
        linkk.push("https://www.wattpad.com" + $(b).find("a").attr("href")), thumb.push($(b).find("img").attr("src"));
      }), $("div.story-card-data.hidden-xxs > div.story-info > ul > li:nth-child(1) > div.icon-container > div > span.stats-value").each(function(e, f) {
        let baca = $(f).text();
        dibaca.push(baca);
      }), $("div.story-card-data.hidden-xxs > div.story-info > ul > li:nth-child(2) > div.icon-container > div > span.stats-value").each(function(g, h) {
        let vot = $(h).text();
        vote.push(vot);
      }), $("div.story-card-data.hidden-xxs > div.story-info > ul > li:nth-child(3) > div.icon-container > div > span.stats-value").each(function(i, j) {
        let bb = $(j).text();
        bab.push(bb);
      }), $("div.story-card-data.hidden-xxs > div.story-info > div.title").each(function(c, d) {
        let titel = $(d).text();
        judull.push(titel);
      });
      for (let i = 0; i < linkk.length; i++) "" === !judull[i] && result.push({
        judul: judull[i],
        dibaca: dibaca[i],
        divote: vote[i],
        thumb: thumb[i],
        link: linkk[i]
      });
      resolve(result);
    }).catch(reject);
  });
}
async function dewabatch(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://dewabatch.com/?s=" + query).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        result = [],
        linkk = [],
        judull = [],
        thumb = [],
        rating = [];
      $("div.thumb > a").each(function(a, b) {
        linkk.push($(b).attr("href")), judull.push($(b).attr("title")), thumb.push($(b).find("img").attr("src").split("?resize")[0]);
      }), $("#content > div.postbody > div > div > ul > li > div.dtl > div.footer-content-post.fotdesktoppost > div.contentleft > span:nth-child(1) > rating > ratingval > ratingvalue").each(function(c, d) {
        let rate = $(d).text();
        rating.push(rate.split(" ")[0]);
      });
      for (let i = 0; i < linkk.length; i++) result.push({
        judul: judull[i],
        rating: rating[i],
        thumb: thumb[i],
        link: linkk[i]
      });
      resolve(result);
    }).catch(reject);
  });
}
async function kiryu(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://kiryuu.id/?s=" + query).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        result = [],
        linkk = [],
        judull = [],
        thumb = [],
        rating = [];
      $("div.bsx > a").each(function(a, b) {
        linkk.push($(b).attr("href")), judull.push($(b).attr("title")), thumb.push($(b).find("img").attr("src").split("?resize")[0]);
      }), $("div.rating > div.numscore").each(function(c, d) {
        let rate = $(d).text();
        rating.push(rate);
      });
      for (let i = 0; i < linkk.length; i++) result.push({
        judul: judull[i],
        rating: rating[i],
        thumb: thumb[i],
        link: linkk[i]
      });
      resolve(result);
    }).catch(reject);
  });
}
async function sfilesearch(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://sfile.mobi/search.php?q=" + query + "&search=Search").then(({
      data
    }) => {
      const $ = cheerio.load(data),
        result = [],
        link = [],
        neme = [],
        size = [];
      $("div.w3-card.white > div.list > a").each(function(a, b) {
        link.push($(b).attr("href"));
      }), $("div.w3-card.white > div.list > a").each(function(c, d) {
        let name = $(d).text();
        neme.push(name);
      }), $("div.w3-card.white > div.list").each(function(e, f) {
        let siz = $(f).text();
        size.push(siz.split("(")[1]);
      });
      for (let i = 0; i < link.length; i++) result.push({
        nama: neme[i],
        size: size[i].split(")")[0],
        link: link[i]
      });
      resolve(result);
    }).catch(reject);
  });
}
async function carigc(nama) {
  return new Promise((resolve, reject) => {
    axios.get("http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search=" + nama + "&searchby=name").then(({
      data
    }) => {
      const $ = cheerio.load(data),
        result = [],
        lnk = [],
        nm = [];
      $("div.wa-chat-title-container").each(function(a, b) {
        const limk = $(b).find("a").attr("href");
        lnk.push(limk);
      }), $("div.wa-chat-title-text").each(function(c, d) {
        const name = $(d).text();
        nm.push(name);
      });
      for (let i = 0; i < lnk.length; i++) result.push({
        nama: nm[i].split(". ")[1],
        link: lnk[i].split("?")[0]
      });
      resolve(result);
    }).catch(reject);
  });
}
async function wikisearch(query) {
  const res = await axios.get(`https://id.m.wikipedia.org/w/index.php?search=${query}`),
    $ = cheerio.load(res.data),
    hasil = [];
  let wiki = $("#mf-section-0").find("p").text(),
    thumb = $("#mf-section-0").find("div > div > a > img").attr("src");
  thumb = thumb || "//pngimg.com/uploads/wikipedia/wikipedia_PNG35.png", thumb = "https:" + thumb;
  let judul = $("h1#section_0").text();
  return hasil.push({
    wiki: wiki,
    thumb: thumb,
    judul: judul
  }), hasil;
}
async function devianart(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://www.deviantart.com/search?q=" + query).then(({
      data
    }) => {
      const $$ = cheerio.load(data);
      let no;
      $$("#root > div.hs1JI > div > div._3WsM9 > div > div > div:nth-child(3) > div > div > div:nth-child(1) > div > div:nth-child(1) > div > section > a").each(function(c, d) {
        no = $$(d).attr("href");
      }), axios.get(no).then(({
        data
      }) => {
        const $ = cheerio.load(data),
          result = [];
        $("#root > main > div > div._2QovI > div._2rKEX._17aAh._1bdC8 > div > div._2HK_1 > div._1lkTS > div > img").each(function(a, b) {
          result.push($(b).attr("src"));
        }), resolve(result);
      });
    }).catch(reject);
  });
}
async function konachan(chara) {
  return new Promise((resolve, reject) => {
    let text = chara.replace(" ", "_");
    axios.get("https://konachan.net/post?tags=" + text + "+").then(({
      data
    }) => {
      const $$ = cheerio.load(data),
        no = [];
      $$("div.pagination > a").each(function(c, d) {
        no.push($$(d).text());
      });
      let mat = Math.floor(Math.random() * no.length);
      axios.get("https://konachan.net/post?page=" + mat + "&tags=" + text + "+").then(({
        data
      }) => {
        const $ = cheerio.load(data),
          result = [];
        $("#post-list > div.content > div:nth-child(4) > ul > li > a.directlink.largeimg").each(function(a, b) {
          result.push($(b).attr("href"));
        }), resolve(result);
      });
    }).catch(reject);
  });
}
async function wallpapercave(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://wallpapercave.com/search?q=" + query).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        result = [];
      $("div.imgrow > a").each(function(a, b) {
        $(b).find("img").attr("src").includes(".gif") || result.push("https://wallpapercave.com/" + $(b).find("img").attr("src").replace("fuwp", "uwp"));
      }), resolve(result);
    }).catch(reject);
  });
}
async function wallpapercraft(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://wallpaperscraft.com/search/?query=" + query).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        result = [];
      $("span.wallpapers__canvas").each(function(a, b) {
        result.push($(b).find("img").attr("src"));
      }), resolve(result);
    }).catch(reject);
  });
}
async function wallpaperhd(chara) {
  return new Promise((resolve, reject) => {
    axios.get("https://wall.alphacoders.com/search.php?search=" + chara + "&filter=4K+Ultra+HD").then(({
      data
    }) => {
      const $ = cheerio.load(data),
        result = [];
      $("div.boxgrid > a > picture").each(function(a, b) {
        result.push($(b).find("img").attr("src").replace("thumbbig-", ""));
      }), resolve(result);
    }).catch(reject);
  });
}

function clean(string) {
  return string.replace(/{/g, "").replace(/}/g, "").replace(/"/g, "");
}