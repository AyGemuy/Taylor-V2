import fetch from "node-fetch";
import axios from "axios";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  text,
  args,
  usedPrefix,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    name = (await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()), conn.getName(who));
  if ("apakah2" === command) {
    if (!text) throw `Use example .${command} halo`;
    m.reply(`\n*Pertanyaan:* ${command} ${text}\n*Jawaban:* ${[ "Iya keknya", "Y saja", "Gtau", "Gk", "No", "Ynkts", "...", "Tanya yg lain", "Bisajadi" ].getRandom()}\n  `.trim(), null, m.mentionedJid ? {
      mentions: conn.parseMention(m.text)
    } : {});
  }
  if ("turu" === command) {
    let keban = db.data.chats[m.chat].isBanned;
    "on" === args[0] ? (keban = !0, m.reply("Bot Turu Dulu bang :>!")) : "off" === args[0] && (keban = !1, m.reply("Bot Udah Bangun bang :>!"));
  }
  if ("turnbackhoax" === command) {
    m.react(wait);
    let hox = await xturnbackhoax(),
      row = Object.values(hox).map((v, index) => ({
        title: index + " " + v.title,
        description: "\nDate: " + v.date + "\nImg: " + v.thumbnail + "\nDesc: " + v.desc + "\nUrl: " + v.link,
        rowId: usedPrefix + "get " + v.thumbnail
      })),
      button = {
        buttonText: `☂️ ${command} Search Disini ☂️`,
        description: `⚡ ${name} Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return await conn.sendListM(m.chat, button, row, m);
  }
  if ("xaiovideodl" === command) {
    if (m.react(wait), !text) throw `Use example .${command} link`;
    let tek = await xaiovideodl(text);
    return await conn.sendFile(m.chat, tek.data.url, "", wm, m);
  }
  if ("xpinterest" === command) {
    if (m.react(wait), !text) throw `Use example .${command} car`;
    let rant = (await xpinterest(text)).getRandom();
    await conn.sendFile(m.chat, rant, "", rant, m);
  }
  if ("xwallpaper" === command) {
    if (m.react(wait), !text) throw `Use example .${command} hd`;
    let tek = await xwallpaper(text),
      row = Object.values(tek).map((v, index) => ({
        title: index + " " + v.title,
        description: "\ntype: " + v.type + "\nsource: " + v.source + "\nimage: " + v.image[0],
        rowId: usedPrefix + "get " + v.image[0]
      })),
      button = {
        buttonText: `☂️ ${command} Search Disini ☂️`,
        description: `⚡ ${name} Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return await conn.sendListM(m.chat, button, row, m);
  }
  if ("xwikimedia" === command) {
    if (m.react(wait), !text) throw `Use example .${command} manuk`;
    let tek = await xwikimedia(text),
      row = Object.values(tek).map((v, index) => ({
        title: index + " " + v.title,
        description: "\nsource: " + v.source + "\nimage: " + v.image,
        rowId: usedPrefix + "get " + v.image
      })),
      button = {
        buttonText: `☂️ ${command} Search Disini ☂️`,
        description: `⚡ ${name} Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return await conn.sendListM(m.chat, button, row, m);
  }
  if ("xquotesnime" === command) {
    m.react(wait);
    let tek = await xquotesAnime(),
      row = Object.values(tek).map((v, index) => ({
        title: index + " " + v.karakter,
        description: "\nsource: " + v.link + "\nimage: " + v.gambar + "\nanime: " + v.anime + "\nepisode: " + v.episode + "\nup: " + v.up_at + "\nquotes: " + v.quotes,
        rowId: usedPrefix + "get " + v.gambar
      })),
      button = {
        buttonText: `☂️ ${command} Search Disini ☂️`,
        description: `⚡ ${name} Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return await conn.sendListM(m.chat, button, row, m);
  }
  if ("xumma" === command) {
    if (m.react(wait), !text) throw `Use example .${command} umma`;
    let tek = await xumma(text),
      cap = `*title:* ${tek.title}\n*author name:* ${tek.author.name}\n*author profilePic:* ${tek.author.profilePic}\n*caption:* ${tek.caption}\n*media:* ${tek.media}\n*type:* ${tek.type}\n*like:* ${tek.like}\n`;
    await conn.sendFile(m.chat, tek.media, "", cap, m);
  }
  if ("xringtone" === command) {
    if (m.react(wait), !text) throw `Use example .${command} drum`;
    let tek = await xringtone(text),
      row = Object.values(tek).map((v, index) => ({
        title: index + " " + v.title,
        description: "\nsource: " + v.source,
        rowId: usedPrefix + "get " + v.audio
      })),
      button = {
        buttonText: `☂️ ${command} Search Disini ☂️`,
        description: `⚡ ${name} Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return await conn.sendListM(m.chat, button, row, m);
  }
  if ("xstyletext" === command) {
    if (m.react(wait), !text) throw `Use example .${command} text`;
    let tek = await xstyletext(text),
      row = Object.values(tek).map((v, index) => ({
        title: index + " " + v.name,
        description: v.result,
        rowId: usedPrefix + "tts " + v.result
      })),
      button = {
        buttonText: `☂️ ${command} Search Disini ☂️`,
        description: `⚡ ${name} Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return await conn.sendListM(m.chat, button, row, m);
  }
  if ("xhentai" === command) {
    if (m.react(wait), !text) throw `Use example .${command} 1153`;
    let tek = await xhentai(text),
      listSections = [];
    return Object.values(tek).map((v, index) => {
      listSections.push([++index + " " + cmenub + " " + v.title, [
        ["Video 1", usedPrefix + "get " + v.video_1, "\nLink " + v.link + "\ncategory " + v.category + "\nshare_count " + v.share_count + "\nviews_count " + v.views_count + "\ntype " + v.type + "\nvideo_1 " + v.video_1],
        ["Video 2", usedPrefix + "get " + v.video_2, "\nLink " + v.link + "\ncategory " + v.category + "\nshare_count " + v.share_count + "\nviews_count " + v.views_count + "\ntype " + v.type + "\nvideo_2 " + v.video_2]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Hentai Search 🔎 " + htka, `⚡ Silakan pilih Hentai Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ Hentai Search Disini ☂️", listSections, m);
  }
};
handler.command = ["xhentai", "xstyletext", "xringtone", "xumma", "xquotesnime", "xwikimedia", "xwallpaper", "xpinterest", "xaiovideodl", "apakah2", "turu", "turnbackhoax"];
export default handler;
async function xpinterest(querry) {
  return new Promise(async (resolve, reject) => {
    axios.get("https://id.pinterest.com/search/pins/?autologin=true&q=" + querry, {
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
async function xwallpaper(title, page = "1") {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.besthdwallpaper.com/search?CurrentPage=${page}&q=${title}`).then(({
      data
    }) => {
      let $ = cheerio.load(data),
        hasil = [];
      $("div.grid-item").each(function(a, b) {
        hasil.push({
          title: $(b).find("div.info > a > h3").text(),
          type: $(b).find("div.info > a:nth-child(2)").text(),
          source: "https://www.besthdwallpaper.com/" + $(b).find("div > a:nth-child(3)").attr("href"),
          image: [$(b).find("picture > img").attr("data-src") || $(b).find("picture > img").attr("src"), $(b).find("picture > source:nth-child(1)").attr("srcset"), $(b).find("picture > source:nth-child(2)").attr("srcset")]
        });
      }), resolve(hasil);
    });
  });
}
async function xwikimedia(title) {
  return new Promise((resolve, reject) => {
    axios.get(`https://commons.wikimedia.org/w/index.php?search=${title}&title=Special:MediaSearch&go=Go&type=image`).then(res => {
      let $ = cheerio.load(res.data),
        hasil = [];
      $(".sdms-search-results__list-wrapper > div > a").each(function(a, b) {
        hasil.push({
          title: $(b).find("img").attr("alt"),
          source: $(b).attr("href"),
          image: $(b).find("img").attr("data-src") || $(b).find("img").attr("src")
        });
      }), resolve(hasil);
    });
  });
}
async function xquotesAnime() {
  return new Promise((resolve, reject) => {
    const page = Math.floor(184 * Math.random());
    axios.get("https://otakotaku.com/quote/feed/" + page).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        hasil = [];
      $("div.kotodama-list").each(function(l, h) {
        hasil.push({
          link: $(h).find("a").attr("href"),
          gambar: $(h).find("img").attr("data-src"),
          karakter: $(h).find("div.char-name").text().trim(),
          anime: $(h).find("div.anime-title").text().trim(),
          episode: $(h).find("div.meta").text(),
          up_at: $(h).find("small.meta").text(),
          quotes: $(h).find("div.quote").text().trim()
        });
      }), resolve(hasil);
    }).catch(reject);
  });
}
async function xaiovideodl(link) {
  return new Promise((resolve, reject) => {
    axios({
      url: "https://aiovideodl.ml/",
      method: "GET",
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        cookie: "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653"
      }
    }).then(src => {
      let token = cheerio.load(src.data)("#token").attr("value");
      axios({
        url: "https://aiovideodl.ml/wp-json/aio-dl/video-data/",
        method: "POST",
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          cookie: "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653"
        },
        data: new URLSearchParams(Object.entries({
          url: link,
          token: token
        }))
      }).then(({
        data
      }) => {
        resolve(data);
      });
    });
  });
}
async function xumma(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      let $ = cheerio.load(res.data),
        image = [];
      $("#article-content > div").find("img").each(function(a, b) {
        image.push($(b).attr("src"));
      });
      let hasil = {
        title: $("#wrap > div.content-container.font-6-16 > h1").text().trim(),
        author: {
          name: $("#wrap > div.content-container.font-6-16 > div.content-top > div > div.user-ame.font-6-16.fw").text().trim(),
          profilePic: $("#wrap > div.content-container.font-6-16 > div.content-top > div > div.profile-photo > img.photo").attr("src")
        },
        caption: $("#article-content > div > p").text().trim(),
        media: $("#article-content > div > iframe").attr("src") ? [$("#article-content > div > iframe").attr("src")] : image,
        type: $("#article-content > div > iframe").attr("src") ? "video" : "image",
        like: $("#wrap > div.bottom-btns > div > button:nth-child(1) > div.text.font-6-12").text()
      };
      resolve(hasil);
    });
  });
}
async function xringtone(title) {
  return new Promise((resolve, reject) => {
    axios.get("https://meloboom.com/en/search/" + title).then(get => {
      let $ = cheerio.load(get.data),
        hasil = [];
      $("#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li").each(function(a, b) {
        hasil.push({
          title: $(b).find("h4").text(),
          source: "https://meloboom.com" + $(b).find("a").attr("href"),
          audio: $(b).find("audio").attr("src")
        });
      }), resolve(hasil);
    });
  });
}
async function xstyletext(teks) {
  return new Promise((resolve, reject) => {
    axios.get("http://qaz.wtf/u/convert.cgi?text=" + teks).then(({
      data
    }) => {
      let $ = cheerio.load(data),
        hasil = [];
      $("table > tbody > tr").each(function(a, b) {
        hasil.push({
          name: $(b).find("td:nth-child(1) > span").text(),
          result: $(b).find("td:nth-child(2)").text().trim()
        });
      }), resolve(hasil);
    });
  });
}
async function xturnbackhoax() {
  return new Promise((resolve, reject) => {
    axios.get("https://turnbackhoax.id/").then(tod => {
      const $ = cheerio.load(tod.data);
      let hasil = [];
      $("figure.mh-loop-thumb").each(function(a, b) {
        $("div.mh-loop-content.mh-clearfix").each(function(c, d) {
          const Data = {
            title: $(d).find("h3.entry-title.mh-loop-title > a").text().trim(),
            thumbnail: $(b).find("img.attachment-mh-magazine-lite-medium.size-mh-magazine-lite-medium.wp-post-image").attr("src"),
            desc: $(d).find("div.mh-excerpt > p").text().trim(),
            date: $(d).find("span.mh-meta-date.updated").text().trim(),
            link: $(d).find("h3.entry-title.mh-loop-title > a").attr("href")
          };
          hasil.push(Data);
        });
      }), resolve(hasil);
    });
  });
}
async function xhentai(page) {
  return new Promise((resolve, reject) => {
    axios.get("https://sfmcompile.club/page/" + page).then(data => {
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
      }), resolve(hasil);
    });
  });
}