import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";
import {
  spawn,
  exec
} from "child_process";
import FormData from "form-data";
import got from "got";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  let lister = ["awaitFilmApik23", "GSMArena", "Gempa", "Liriklagu", "ManggaToon", "Otakudesu", "RamalJadian", "RandomCerpen", "ReverseVid", "SearchFilm", "Shoope", "SpeedVid", "Tebakgambar", "TiktokDown", "TiktokDownloader", "ToVid", "cnn", "corona", "cuaca", "emoji", "fbDownloader", "igDownloader", "infoFilm123", "photoManipulation", "pinterest", "ssstik_io", "stickerSearch", "uploadFile", "wikipedia", "zodiakHar", "zodiakMing"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split(/[^\w\s]/g);
  if (!lister.includes(feature)) return m.reply("*Example:*\n.fs youtube.search.hello\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("FilmApik23" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await FilmApik23(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("GSMArena" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await GSMArena(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("Gempa" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await Gempa();
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("Liriklagu" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await Liriklagu(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("ManggaToon" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await ManggaToon(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("Otakudesu" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await Otakudesu(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("RamalJadian" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await RamalJadian(inputs, inputs_, inputs__);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("RandomCerpen" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await RandomCerpen();
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("ReverseVid" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await ReverseVid(inputs, inputs_);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("SearchFilm" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await SearchFilm(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("Shoope" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await Shoope(inputs, inputs_);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("SpeedVid" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await SpeedVid(inputs, inputs_);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("Tebakgambar" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await Tebakgambar();
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("TiktokDown" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await TiktokDown(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("TiktokDownloader" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await TiktokDownloader(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("ToVid" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await ToVid(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("cnn" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await cnn();
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("corona" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await corona(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("cuaca" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await cuaca(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("emoji" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await emoji(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("fbDownloader" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await fbDownloader(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("igDownloader" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await igDownloader(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("infoFilm123" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await infoFilm123(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("photoManipulation" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await photoManipulation(inputs, inputs_, inputs__);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("pinterest" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await pinterest(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("ssstik_io" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await ssstik_io(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("stickerSearch" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await stickerSearch(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("uploadFile" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await uploadFile(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("wikipedia" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await wikipedia(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("zodiakHar" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await zodiakHar(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
    if ("zodiakMing" === feature) {
      if (!inputs) return m.reply("Input Query!");
      m.react(wait);
      let outs = await zodiakMing(inputs);
      return await clean(JSON.stringify(outs, null, 4));
    }
  }
};
handler.help = ["scrap2 type query"], handler.tags = ["internet"], handler.command = /^(scrap2)$/i;
export default handler;
async function ManggaToon(judul) {
  try {
    const link = await axios.get(`https://mangatoon.mobi/id/search?word=${judul}`);
    let id = cheerio.load(link.data)("#page-content").find("div.search-page > div > div.comics-result > div.recommended-wrap > div > div > a").attr("href") || "undefined";
    if ("undefined" === id) {
      const link2 = await axios.get(`https://mangatoon.mobi/en/search?word=${judul}`);
      let id2 = cheerio.load(link2.data)("#page-content").find("div.search-page > div > div.comics-result > div.recommended-wrap > div > div:nth-child(1) > a").attr("href");
      const data = await axios.get(`https://mangatoon.mobi${id2}`),
        $ = cheerio.load(data.data);
      judul = $("#page-content").find("div.detail-wrap > div.detail-top-info > div.detail-info > div.detail-title-bg > span").text().trim();
      var genre = $("#page-content").find("div.detail-wrap > div.detail-top-info > div.detail-info > div.detail-tags-info > span").text().trim(),
        author = $("#page-content").find("div.detail-wrap > div.detail-top-info > div.detail-info > div.detail-author-name > span").text().trim(),
        thumb = $("#page-content").find("div.detail-wrap > div.detail-top-info > div.detail-img > img.big-img").attr("src"),
        Link = `https://mangatoon.mobi${$("#page-content").find("div.detail-wrap > div.detail-interact > a").attr("href")}`;
      return {
        judul: judul,
        thumb: thumb,
        genre: genre,
        Author: author.replace("Nama Author: ", ""),
        Link: Link
      };
    } {
      const data = await axios.get(`https://mangatoon.mobi${id}`),
        $ = cheerio.load(data.data);
      judul = $("#page-content").find("div.detail-wrap > div.detail-top-info > div.detail-info > div.detail-title-bg > span").text().trim(),
        genre = $("#page-content").find("div.detail-wrap > div.detail-top-info > div.detail-info > div.detail-tags-info > span").text().trim(),
        author = $("#page-content").find("div.detail-wrap > div.detail-top-info > div.detail-info > div.detail-author-name > span").text().trim(),
        thumb = $("#page-content").find("div.detail-wrap > div.detail-top-info > div.detail-img > img.big-img").attr("src"),
        Link = `https://mangatoon.mobi${$("#page-content").find("div.detail-wrap > div.detail-interact > a").attr("href")}`;
      return {
        judul: judul,
        thumb: thumb,
        genre: genre,
        Author: author.replace("Nama Author: ", ""),
        Link: Link
      };
    }
  } catch (e) {
    return "Not Found 404";
  }
}
async function emoji(emoticon) {
  const emojii = encodeURI(`${emoticon}`),
    link = await axios.get(`https://emojipedia.org/${emojii}/`),
    $ = cheerio.load(link.data);
  var apple = $("body > div.container > div.content").find("article > section.vendor-list > ul > li:nth-child(1) > div.vendor-container.vendor-rollout-target > div.vendor-image > img").attr("src"),
    google = $("body > div.container > div.content").find("article > section.vendor-list > ul > li:nth-child(2) > div.vendor-container.vendor-rollout-target > div.vendor-image > img").attr("src"),
    samsung = $("body > div.container > div.content").find("article > section.vendor-list > ul > li:nth-child(3) > div.vendor-container.vendor-rollout-target > div.vendor-image > img").attr("src"),
    microsoft = $("body > div.container > div.content").find("article > section.vendor-list > ul > li:nth-child(4) > div.vendor-container.vendor-rollout-target > div.vendor-image > img").attr("src"),
    whatsapp = $("body > div.container > div.content").find("article > section.vendor-list > ul > li:nth-child(5) > div.vendor-container.vendor-rollout-target > div.vendor-image > img").attr("src"),
    twitter = $("body > div.container > div.content").find("article > section.vendor-list > ul > li:nth-child(6) > div.vendor-container.vendor-rollout-target > div.vendor-image > img").attr("src"),
    facebook = $("body > div.container > div.content").find("article > section.vendor-list > ul > li:nth-child(7) > div.vendor-container.vendor-rollout-target > div.vendor-image > img").attr("src"),
    jooxpixel = $("body > div.container > div.content").find("article > section.vendor-list > ul > li:nth-child(8) > div.vendor-container.vendor-rollout-target > div.vendor-image > img").attr("src"),
    openmoji = $("body > div.container > div.content").find("article > section.vendor-list > ul > li:nth-child(9) > div.vendor-container.vendor-rollout-target > div.vendor-image > img").attr("src"),
    emojidex = $("body > div.container > div.content").find("article > section.vendor-list > ul > li:nth-child(10) > div.vendor-container.vendor-rollout-target > div.vendor-image > img").attr("src"),
    messager = $("body > div.container > div.content").find("article > section.vendor-list > ul > li:nth-child(11) > div.vendor-container.vendor-rollout-target > div.vendor-image > img").attr("src"),
    LG = $("body > div.container > div.content").find("article > section.vendor-list > ul > li:nth-child(12) > div.vendor-container.vendor-rollout-target > div.vendor-image > img").attr("src"),
    HTC = $("body > div.container > div.content").find("article > section.vendor-list > ul > li:nth-child(13) > div.vendor-container.vendor-rollout-target > div.vendor-image > img").attr("src"),
    mozilla = $("body > div.container > div.content").find("article > section.vendor-list > ul > li:nth-child(14) > div.vendor-container.vendor-rollout-target > div.vendor-image > img").attr("src"),
    softbank = $("body > div.container > div.content").find("article > section.vendor-list > ul > li:nth-child(15) > div.vendor-container.vendor-rollout-target > div.vendor-image > img").attr("src"),
    docomo = $("body > div.container > div.content").find("article > section.vendor-list > ul > li:nth-child(16) > div.vendor-container.vendor-rollout-target > div.vendor-image > img").attr("src"),
    KDDI = $("body > div.container > div.content").find("article > section.vendor-list > ul > li:nth-child(17) > div.vendor-container.vendor-rollout-target > div.vendor-image > img").attr("src");
  return {
    apple: apple.replace("120", "240"),
    google: google.replace("120", "240"),
    samsung: samsung.replace("120", "240"),
    microsoft: microsoft.replace("120", "240"),
    whatsapp: whatsapp.replace("120", "240"),
    twitter: twitter.replace("120", "240"),
    facebook: facebook.replace("120", "240"),
    jooxPixel: jooxpixel.replace("120", "240"),
    openemoji: openmoji.replace("120", "240"),
    emojidex: emojidex.replace("120", "240"),
    messanger: messager.replace("120", "240"),
    LG: LG.replace("120", "240"),
    HTC: HTC.replace("120", "240"),
    mozilla: mozilla.replace("120", "240"),
    softbank: softbank.replace("120", "240"),
    docomo: docomo.replace("120", "240"),
    KDDI: KDDI.replace("120", "240")
  };
}
async function RandomCerpen() {
  try {
    const link = await axios.get("http://cerpenmu.com/"),
      c = cheerio.load(link.data);
    let kumpulan = [];
    c("#sidebar > div").each(function(real, ra) {
      c(ra).find("ul > li").each(function(i, rayy) {
        let random = c(rayy).find("a").attr("href");
        kumpulan.push(random);
      });
    });
    var acak = kumpulan[Math.floor(Math.random() * kumpulan.length)];
    let Otw = await axios.get(`${acak}`);
    const C = cheerio.load(Otw.data);
    let otw = [];
    C("#content > article > article").each(function(a, b) {
      let random = C(b).find("h2 > a").attr("href");
      otw.push(random);
    });
    var Acak = otw[Math.floor(Math.random() * otw.length)];
    let Link = await axios.get(`${Acak}`),
      $ = cheerio.load(Link.data),
      judul = $("#content").find("article > h1").text().trim(),
      karangan = $("#content").find("article > a:nth-child(2)").text().trim(),
      Isi = [];
    $("#content > article > p").each(function(wm, Ra) {
      let isi = $(Ra).text().trim();
      Isi.push(isi);
    });
    let cerita = [];
    for (let i of Isi) cerita += i;
    return {
      status: 200,
      author: "Made by Wudysoft",
      result: {
        Judul: judul,
        Penulis: karangan,
        sumber: Acak,
        cerita: cerita
      }
    };
  } catch (e) {
    return {
      status: 500,
      author: "Made by Wudysoft",
      Pesan: "Erorr!"
    };
  }
}
async function stickerSearch(querry) {
  const link = await axios.get(`https://getstickerpack.com/stickers?query=${querry}`),
    $ = cheerio.load(link.data);
  let sticker1 = {
      sticker: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(1) > a > div > img").attr("src"),
      nama: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(1) > a > div > span.title").text().trim(),
      creator: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(1) > a > div > span.username").text().trim()
    },
    sticker2 = {
      sticker: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(2) > a > div > img").attr("src"),
      nama: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(2) > a > div > span.title").text().trim(),
      creator: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(2) > a > div > span.username").text().trim()
    },
    sticker3 = {
      sticker: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(3) > a > div > img").attr("src"),
      nama: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(3) > a > div > span.title").text().trim(),
      creator: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(3) > a > div > span.username").text().trim()
    },
    sticker4 = {
      sticker: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(4) > a > div > img").attr("src"),
      nama: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(4) > a > div > span.title").text().trim(),
      creator: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(4) > a > div > span.username").text().trim()
    },
    sticker5 = {
      sticker: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(5) > a > div > img").attr("src"),
      nama: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(5) > a > div > span.title").text().trim(),
      creator: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(5) > a > div > span.username").text().trim()
    },
    sticker6 = {
      sticker: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(6) > a > div > img").attr("src"),
      nama: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(6) > a > div > span.title").text().trim(),
      creator: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(6) > a > div > span.username").text().trim()
    },
    sticker7 = {
      sticker: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(7) > a > div > img").attr("src"),
      nama: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(7) > a > div > span.title").text().trim(),
      creator: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(7) > a > div > span.username").text().trim()
    },
    sticker8 = {
      sticker: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(8) > a > div > img").attr("src"),
      nama: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(8) > a > div > span.title").text().trim(),
      creator: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(8) > a > div > span.username").text().trim()
    },
    sticker9 = {
      sticker: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(9) > a > div > img").attr("src"),
      nama: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(9) > a > div > span.title").text().trim(),
      creator: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(9) > a > div > span.username").text().trim()
    },
    sticker10 = {
      sticker: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(10) > a > div > img").attr("src"),
      nama: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(10) > a > div > span.title").text().trim(),
      creator: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(10) > a > div > span.username").text().trim()
    },
    sticker11 = {
      sticker: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(11) > a > div > img").attr("src"),
      nama: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(11) > a > div > span.title").text().trim(),
      creator: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(11) > a > div > span.username").text().trim()
    },
    sticker12 = {
      sticker: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(12) > a > div > img").attr("src"),
      nama: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(12) > a > div > span.title").text().trim(),
      creator: $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(12) > a > div > span.username").text().trim()
    };
  return {
    sticker: [$("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(1) > a > div > img").attr("src"), $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(2) > a > div > img").attr("src"), $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(3) > a > div > img").attr("src"), $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(4) > a > div > img").attr("src"), $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(5) > a > div > img").attr("src"), $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(6) > a > div > img").attr("src"), $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(7) > a > div > img").attr("src"), $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(8) > a > div > img").attr("src"), $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(9) > a > div > img").attr("src"), $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(10) > a > div > img").attr("src"), $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(11) > a > div > img").attr("src"), $("#stickerPacks").find("div > div:nth-child(3) > div:nth-child(12) > a > div > img").attr("src")],
    sticker1: sticker1,
    sticker2: sticker2,
    sticker3: sticker3,
    sticker4: sticker4,
    sticker5: sticker5,
    sticker6: sticker6,
    sticker7: sticker7,
    sticker8: sticker8,
    sticker9: sticker9,
    sticker10: sticker10,
    sticker11: sticker11,
    sticker12: sticker12
  };
}
async function RamalJadian(tanggal, bulan, tahun) {
  if (isNaN(tanggal) && isNaN(bulan) && isNaN(tahun)) return "Tanggal bulan tahun harus berupa angka";
  const link = await axios.get(`https://www.primbon.com/tanggal_jadian_pernikahan.php?tgl=${tanggal}&bln=${bulan}&thn=${tahun}&proses=+Submit%21+`);
  return cheerio.load(link.data)("#body").text().trim().replace("MAKNA TANGGAL JADIAN, PERNIKAHAN", "").replace("Karakteristik:", "\nKarakteristik : ").replace("< Hitung Kembali", "");
}
async function igDownloader(Link) {
  const hasil = [],
    Form = {
      url: Link,
      submit: ""
    };
  return await axios("https://downloadgram.org/", {
    method: "POST",
    data: new URLSearchParams(Object.entries(Form)),
    headers: {
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9,id;q=0.8",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
      cookie: "_ga=GA1.2.1695343126.1621491858; _gid=GA1.2.28178724.1621491859; __gads=ID=8f9d3ef930e9a07b-2258e672bec80081:T=1621491859:RT=1621491859:S=ALNI_MbqLxhztDiYZttJFX2SkvYei6uGOw; __atuvc=3%7C20; __atuvs=60a6eb107a17dd75000; __atssc=google%3B2; _gat_gtag_UA_142480840_1=1"
    },
    referrerPolicy: "strict-origin-when-cross-origin"
  }).then(async res => {
    let url = cheerio.load(res.data)("#downloadBox").find("a").attr("href");
    await axios(Link, {
      method: "GET",
      data: null,
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9,id;q=0.8",
        "cache-control": "max-age=0",
        "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
        cookie: "ig_did=08A3C465-7D43-4D8A-806A-88F98384E63B; ig_nrcb=1; mid=X_ipMwALAAFgQ7AftbrkhIDIdXJ8; fbm_124024574287414=base_domain=.instagram.com; shbid=17905; ds_user_id=14221286336; csrftoken=fXHAj5U3mcJihQEyVXfyCzcg46lHx7QD; sessionid=14221286336%3A5n4czHpQ0GRzlq%3A28; shbts=1621491639.7673564; rur=FTW"
      },
      referrerPolicy: "strict-origin-when-cross-origin"
    }).then(respon => {
      let title = cheerio.load(respon.data)("title").text().trim();
      const result = {
        author: "Made by Wudysoft",
        result: {
          link: url,
          desc: title,
          LinkAwal: Link
        }
      };
      hasil.push(result);
    });
  }), hasil[0];
}
async function SearchFilm(querry) {
  const link = await axios.get(`https://123movies.mom/search/?keyword=${querry}`),
    $ = cheerio.load(link.data);
  let hasil = [],
    result = [];
  return $("#main").each(function(a, b) {
    $(b).find("div").each(function(c, d) {
      let url = $(d).find("a").attr("href"),
        img = $(d).find("a > img").attr("src"),
        data = {
          judul: $(d).find("a > img").attr("alt"),
          thumb: img,
          url: url
        };
      result.push(data);
    });
    for (let i = 29; i < result.length; i++) hasil.push(result[i]);
  }), hasil;
}
async function Liriklagu(querry) {
  return new Promise(async (resolve, reject) => {
    await axios.request({
      url: "https://www.musixmatch.com/search/" + querry,
      method: "GET",
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9,id;q=0.8",
        "cache-control": "max-age=0",
        "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"'
      }
    }).then(async res => {
      let Url = cheerio.load(res.data)("#search-all-results").find("div.main-panel > div:nth-child(1) > div.box-content > div > ul > li > div > div.media-card-body > div > h2 > a").attr("href");
      await axios.request({
        url: "https://www.musixmatch.com" + Url,
        method: "GET",
        data: null,
        headers: {
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "en-US,en;q=0.9,id;q=0.8",
          "cache-control": "max-age=0",
          "if-none-match": 'W/"252c5-LEqIxy/rzHPI2QxgG5//NcL3YjQ"',
          "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
        }
      }).then(({
        data
      }) => {
        const $ = cheerio.load(data);
        let judul = $("#site > div > div > div > main > div > div > div.mxm-track-banner.top > div > div > div").find("div.col-sm-10.col-md-8.col-ml-9.col-lg-9.static-position > div.track-title-header > div.mxm-track-title > h1").text().trim(),
          artis = $("#site > div > div > div > main > div > div > div > div > div > div > div> div > div > h2 > span").text().trim(),
          thumb = $("#site > div > div > div > main > div > div > div.mxm-track-banner.top > div > div > div").find("div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div > img").attr("src"),
          lirik = [];
        $("#site > div > div > div > main > div > div > div.mxm-track-lyrics-container").find("div.container > div > div > div > div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics").each(function(a, b) {
          let isi = $(b).find("span").text().trim();
          lirik.push(isi);
        });
        const result = {
          result: {
            judul: judul.replace("Lyrics", ""),
            penyanyi: artis,
            thumb: "https:" + thumb,
            lirik: lirik[0]
          }
        };
        resolve(result);
      }).catch(reject);
    });
  });
}
async function infoFilm123(url) {
  try {
    const link = await axios.get(`${url}`),
      $ = cheerio.load(link.data);
    let judul = $("#mv-info").find("div.mvi-content > div.mvic-desc > h1").text().trim(),
      genre = $("#mv-info").find("div.mvi-content > div.mvic-desc > div.mvic-info > div.mvici-left > p:nth-child(1) > a").text().trim(),
      aktor = [];
    $("div.mvi-content").each(function(a, b) {
      let res = $(b).find("div.mvic-desc > div.mvic-info > div.mvici-left > p > a").text().trim();
      aktor.push(res);
    });
    let country = $("#mv-info").find("div.mvi-content > div.mvic-desc > div.mvic-info > div.mvici-left > p:nth-child(4) > a").attr("title"),
      durasi = $("#mv-info").find("div.mvi-content > div.mvic-desc > div.mvic-info > div.mvici-right > p:nth-child(1) > strong").text().trim(),
      kualitas = $("#mv-info").find("div.mvi-content > div.mvic-desc > div.mvic-info > div.mvici-right > p:nth-child(2) > span").text().trim(),
      publish = $("#mv-info").find("div.mvi-content > div.mvic-desc > div.mvic-info > div.mvici-right > p:nth-child(4) > a").text().trim(),
      tag = [];
    $("#mv-keywords").each(function(c, d) {
      let res = $(d).find("a").text().trim();
      tag.push(res);
    });
    let thumb = $("#mv-info").find("div.player-holder > a").attr("style"),
      video = $("#mv-info").find("div.player-holder > a").attr("href");
    return {
      judul: judul,
      thumbail: thumb.replace("background-image: url", "").replace("(", "").replace(")", ""),
      genre: genre,
      video: video,
      negara: country,
      durasi: durasi,
      quality: kualitas,
      rilis: publish,
      aktor: aktor,
      hastag: tag
    };
  } catch (e) {
    return "Judul tidak ditemukan";
  }
}
async function Otakudesu(querry) {
  try {
    const link = await axios.get(`https://otakudesu.moe/?s=${querry}&post_type=anime`);
    let id = cheerio.load(link.data)("#venkonten > div > div.venser > div > div > ul > li:nth-child(1) > h2 > a").attr("href");
    const Link = await axios.get(id),
      $ = cheerio.load(Link.data);
    let judul = $("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(1) > span").text().trim(),
      judulJpn = $("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(2) > span").text().trim(),
      score = $("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(3) > span").text().trim(),
      Produser = $("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(4) > span").text().trim(),
      Type = $("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(5) > span").text().trim(),
      Status = $("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(6) > span").text().trim(),
      TotalEpisode = $("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(7) > span").text().trim(),
      durasi = $("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(8) > span").text().trim(),
      Rilis = $("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(9) > span").text().trim(),
      studio = $("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(10) > span").text().trim(),
      genre = $("#venkonten").find("div.venser > div.fotoanime > div.infozin > div > p:nth-child(11) > span").text().trim(),
      thumb = $("#venkonten > div.venser > div.fotoanime").find("img").attr("src"),
      Sinopsis = $("#venkonten > div.venser > div.fotoanime > div.sinopc").find("p").text().trim(),
      LinkDown = $("#venkonten").find("div.venser > div:nth-child(8) > ul > li:nth-child(4) > span:nth-child(1) > a").attr("href");
    return {
      author: "Made by Wudysoft",
      status: link.status,
      result: {
        judul: judul,
        thumb: thumb,
        japan: judulJpn,
        rating: score,
        produser: Produser,
        type: Type,
        status: Status,
        episode: TotalEpisode,
        durasi: durasi,
        rilis: Rilis,
        studio: studio,
        genre: genre,
        LinkDown: LinkDown,
        sinopsis: Sinopsis
      }
    };
  } catch (e) {
    return {
      author: "Made by Wudysoft",
      status: link.status,
      Pesan: "Erorr!"
    };
  }
}
async function wikipedia(querry) {
  try {
    const link = await axios.get(`https://id.wikipedia.org/wiki/${querry}`),
      $ = cheerio.load(link.data);
    let judul = $("#firstHeading").text().trim(),
      thumb = $("#mw-content-text").find("div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img").attr("src") || "//i.ibb.co/nzqPBpC/http-error-404-not-found.png",
      isi = [];
    $("#mw-content-text > div.mw-parser-output").each(function(rayy, Ra) {
      let penjelasan = $(Ra).find("p").text().trim();
      isi.push(penjelasan);
    });
    for (let i of isi) {
      return {
        author: "Made by Wudysoft",
        status: link.status,
        result: {
          judul: judul,
          thumb: "https:" + thumb,
          isi: i
        }
      };
    }
  } catch (e) {
    return {
      author: "Made by Wudysoft",
      status: link.status,
      Pesan: "Erorr!"
    };
  }
}
async function corona(negara) {
  try {
    const link = await axios.get(`https://www.worldometers.info/coronavirus/country/${negara}/`),
      $ = cheerio.load(link.data);
    let kasus = $("#maincounter-wrap").find(" div > span").eq(0).text().trim(),
      mati = $("#maincounter-wrap").find(" div > span").eq(1).text().trim(),
      sembuh = $("#maincounter-wrap").find(" div > span").eq(2).text().trim();
    return {
      author: "Made by Wudysoft",
      status: link.status,
      result: {
        kasus: kasus,
        meninggal: mati,
        sembuh: sembuh
      }
    };
  } catch (e) {
    return {
      author: "Made by Wudysoft",
      status: link.status,
      Pesan: "Erorr!"
    };
  }
}
async function cuaca(wilayah) {
  try {
    const link = await axios.get(`https://www.bmkg.go.id/cuaca/prakiraan-cuaca-indonesia.bmkg${wilayah}`),
      $ = cheerio.load(link.data);
    let hasil = [];
    return $("#TabPaneCuaca2 > div.table-responsive > table > tbody").each(function(a, b) {
      $(b).find("tr").each(function(c, d) {
        let data = {
          daerah: $(d).find("td > a").text().trim(),
          cuaca: $(d).find("td > span").text().trim(),
          suhu: $(d).find("td:nth-child(6)").text().trim() + " °C",
          kelembapan: $(d).find("td:nth-child(7)").text().trim() + "%"
        };
        hasil.push(data);
      });
    }), hasil;
  } catch (e) {
    return {
      author: "Made by Wudysoft",
      status: link.status,
      Pesan: "Erorr!"
    };
  }
}
async function FilmApik23(querry) {
  try {
    const link = await axios.get(`https://filmapik.website/?s=${querry}`),
      c = cheerio.load(link.data);
    let Id = [];
    c("#main > div > div.main-content.main-category > div.movies-list-wrap.mlw-category > div.movies-list.movies-list-full ").each(function(a, b) {
      c(b).find("div").each(function(e, d) {
        let id = c(d).find("a").attr("href");
        Id.push(id);
      });
    });
    let Random = Id[Math.floor(Math.random() * Id.length)];
    const Link = await axios.get(Random),
      $ = cheerio.load(Link.data);
    let judul = $("#mv-info").find("div.mvi-content > div.mvic-desc > h3").text().trim(),
      view = $("#mv-info").find("div.mvi-content > div.mvic-desc > div.mvic-info > div.mvici-left > p:nth-child(1)").text().trim(),
      genre = $("#mv-info").find("div.mvi-content > div.mvic-desc > div.mvic-info > div.mvici-left > p:nth-child(2)").text().trim(),
      studio = $("#mv-info").find("div.mvi-content > div.mvic-desc > div.mvic-info > div.mvici-left > p:nth-child(3) > span").text().trim(),
      durasi = $("#mv-info").find("div.mvi-content > div.mvic-desc > div.mvic-info > div.mvici-right > p:nth-child(1) > span").text().trim(),
      TvStatus = $("#mv-info").find("div.mvi-content > div.mvic-desc > div.mvic-info > div.mvici-right > p:nth-child(2) > span").text().trim(),
      network = $("#mv-info").find("div.mvi-content > div.mvic-desc > div.mvic-info > div.mvici-right > div > p:nth-child(5) > a").text().trim(),
      thumb = $("#mv-info").find("div.mvi-content > div.thumb.mvic-thumb > img").attr("src"),
      BintangFilm = $("#mv-info").find("div.mvi-content > div.mvic-desc > div.mvic-info > p > span").text().trim();
    return {
      author: "Made by Wudysoft",
      status: link.status,
      result: {
        judul: judul,
        thumb: thumb,
        Link: Random,
        penonton: view.replace("Views: ", ""),
        durasi: durasi,
        genre: genre.replace("Genre: ", ""),
        studio: studio,
        TV: TvStatus,
        network: network,
        bintangFilm: BintangFilm
      }
    };
  } catch (e) {
    return {
      author: "Made by Wudysoft",
      status: link.status,
      Pesan: "Erorr!"
    };
  }
}
async function ssstik_io(Link) {
  const hasil = [];
  return await axios.request({
    url: "https://ssstik.io/download-tiktok-mp3",
    method: "GET",
    data: null,
    headers: {
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9,id;q=0.8",
      "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
      cookie: "_ga=GA1.2.1214162640.1613122103; __gads=ID=a84fb2b8cf02d3d7-22dd4d0604c600bf:T=1613122103:RT=1613122103:S=ALNI_MYL7L8hoaImlsOJ4ci_mlprmNr_dQ; __cflb=02DiuEcwseaiqqyPC5pErDKzpi9ACpCy4uc7DgJdduo1D; _gid=GA1.2.318630001.1621485974; PHPSESSID=e6tcghbdi76h30pkem3lmgb6h2; _gat_UA-3524196-6=1"
    }
  }).then(async res => {
    const $ = cheerio.load(res.data);
    let token = $("#splash > div").find("form").attr("data-hx-post"),
      ttts = $("#splash > div").find("form").attr("include-vals");
    const tt = ttts.split(",")[0]?.replace("tt:", ""),
      ts = ttts.split(",")[1].replace("ts:", ""),
      format = {
        id: Link,
        locale: "en",
        tt: tt,
        ts: ts
      };
    await axios("https://ssstik.io" + token, {
      method: "POST",
      data: new URLSearchParams(Object.entries(format)),
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,id;q=0.8",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "hx-active-element": "submit",
        "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
        cookie: "_ga=GA1.2.1214162640.1613122103; __gads=ID=a84fb2b8cf02d3d7-22dd4d0604c600bf:T=1613122103:RT=1613122103:S=ALNI_MYL7L8hoaImlsOJ4ci_mlprmNr_dQ; __cflb=02DiuEcwseaiqqyPC5pErDKzpi9ACpCy4uc7DgJdduo1D; _gid=GA1.2.318630001.1621485974; PHPSESSID=e6tcghbdi76h30pkem3lmgb6h2; _gat_UA-3524196-6=1"
      }
    }).then(respon => {
      const ch = cheerio.load(respon.data),
        data = {
          author: "Made by Wudysoft",
          result: {
            nowm: ch("#mainpicture > div").find("a.pure-button.pure-button-primary.is-center.u-bl.dl-button.download_link.without_watermark_direct.snaptik").attr("href"),
            mp3: ch("#mainpicture > div").find("a.pure-button.pure-button-primary.is-center.u-bl.dl-button.download_link.music.snaptik").attr("href")
          }
        };
      hasil.push(data);
    });
  }), hasil[0];
}
async function TiktokDownloader(link) {
  const Result = [];
  return await axios.request({
    url: "https://ttdownloader.com/",
    method: "get",
    headers: {
      "accept-language": "en-US,en;q=0.9,id;q=0.8",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
      cookie: "_ga=GA1.2.1240046717.1620835673; PHPSESSID=797oo0b7ao6ma18170vfggf8sa; popCookie=1; _gid=GA1.2.182249774.1621486055; _gat_gtag_UA_117413493_7=1"
    }
  }).then(async res => {
    let token = cheerio.load(res.data)("#token").attr("value");
    const Form = {
      url: link,
      format: "",
      token: token
    };
    await axios("https://ttdownloader.com/ajax/", {
      method: "POST",
      data: new URLSearchParams(Object.entries(Form)),
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,id;q=0.8",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
        cookie: "_ga=GA1.2.1240046717.1620835673; PHPSESSID=797oo0b7ao6ma18170vfggf8sa; popCookie=1; _gid=GA1.2.182249774.1621486055; _gat_gtag_UA_117413493_7=1"
      }
    }).then(respon => {
      const ch = cheerio.load(respon.data);
      let result = {
        status: respon.status,
        author: "Made by Wudysoft",
        result: {
          nowm: ch("#results-list > div:nth-child(2)").find("div.download > a").attr("href"),
          wm: ch("#results-list > div:nth-child(3)").find("div.download > a").attr("href"),
          audio: ch("#results-list > div:nth-child(4)").find("div.download > a").attr("href")
        }
      };
      Result.push(result);
    });
  }), Result[0];
}
async function uploadFile(path) {
  const Result = [],
    bodyForm = new FormData();
  return bodyForm.append("files[]", fs.createReadStream(path)), await axios("https://uguu.se/upload.php", {
    method: "POST",
    data: bodyForm,
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9,id;q=0.8",
      "content-type": `multipart/form-data; boundary=${bodyForm._boundary}`
    }
  }).then(({
    data
  }) => {
    const result = {
      author: "Made by Wudysoft",
      status: data.success ? 200 : 404,
      result: {
        url: data.files[0]?.name,
        namaFile: data.files[0]?.url,
        size: data.files[0]?.size,
        hash: data.files[0]?.hash
      }
    };
    Result.push(result.result.url);
  }), Result[0];
}
async function Gempa() {
  try {
    const link = await axios.get("https://www.bmkg.go.id/gempabumi/gempabumi-dirasakan.bmkg"),
      $ = cheerio.load(link.data);
    let hasil = [];
    return $("body > div.wrapper > div.container.content > div > div.col-md-8 > div > div > table > tbody").each(function(a, b) {
      $(b).find("tr").each(function(c, d) {
        let tanggal = $(d).find("td:nth-child(2)").text().trim(),
          koordinat = $(d).find("td:nth-child(3)").text().trim(),
          magnitudo = $(d).find("td:nth-child(4)").text().trim(),
          kedalaman = $(d).find("td:nth-child(5)").text().trim(),
          skala = $(d).find("td:nth-child(6) > a").text().trim();
        const data = {
          author: "Made by Wudysoft",
          status: link.status,
          result: {
            tanggal: tanggal,
            koordinat: koordinat,
            getaran: magnitudo,
            kedalaman: kedalaman,
            skala: skala
          }
        };
        hasil.push(data);
      });
    }), hasil;
  } catch (e) {
    return {
      author: "Made by Wudysoft",
      status: link.status,
      Pesan: "Erorr!"
    };
  }
}
async function cnn() {
  try {
    const link = await axios.get("https://www.cnnindonesia.com/"),
      $ = cheerio.load(link.data);
    let hasil = [];
    return $("#content > div > div.l_content > div.box.feed.berita_terbaru_lst > div.list.media_rows.middle").each(function(a, b) {
      $(b).find("article").each(function(c, d) {
        let judul = $(d).find("a > span.box_text > h2").text().trim() || "-",
          tema = $(d).find("a > span.box_text > span.kanal").text().trim() || "-",
          publik = $(d).find("a > span.box_text > span.date").text().trim() || "-",
          thumb = $(d).find("a > span.ratiobox.ratio_16_9.box_img > span > img").attr("src") || "-",
          url = $(d).find("a").attr("href") || "-";
        const data = {
          author: "Made by Wudysoft",
          status: link.status,
          result: {
            judul: judul,
            tema: tema,
            rilis: publik,
            thumb: thumb,
            url: url
          }
        };
        hasil.push(data);
      });
    }), hasil;
  } catch (e) {
    return {
      author: "Made by Wudysoft",
      status: link.status,
      Pesan: "Erorr!"
    };
  }
}
async function photoManipulation(namaFile, path, effectId) {
  const hasil = [],
    fd = new FormData();
  return fd.append("name", `${namaFile}`), fd.append("file", fs.createReadStream(`${path}`)),
    await axios({
      method: "POST",
      url: "https://photomania.net/upload/file",
      headers: fd.getHeaders(),
      data: fd
    }).then(async res => {
      const formData = {
        photoId: `${res.data.id}`,
        effectId: `${effectId}`
      };
      await axios("https://photomania.net/render", {
        method: "POST",
        data: new URLSearchParams(Object.entries(formData)),
        headers: {
          accept: "application/json, text/javascript, /; q=0.01",
          "accept-language": "en-US,en;q=0.9,id;q=0.8",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"'
        }
      }).then(respon => {
        const result = {
          status: respon.status,
          author: "Made by Wudysoft",
          result: {
            url: respon.data.url,
            url_secury: respon.data.url_secure,
            ukuran: respon.data.width + " x " + respon.data.height,
            explayet: respon.data.expires_at
          }
        };
        return hasil.push(result), result;
      });
    }), hasil[0];
}
async function ToVid(path) {
  return new Promise(async (resolve, reject) => {
    const BodyForm = new FormData();
    BodyForm.append("new-image", fs.createReadStream(path)), BodyForm.append("new-image-url", ""),
      await axios({
        url: "https://s7.ezgif.com/webp-to-mp4",
        method: "POST",
        headers: BodyForm.getHeaders(),
        data: BodyForm
      }).then(res => {
        const $ = cheerio.load(res.data);
        let File = $("#main > form").find("input[type=hidden]:nth-child(1)").attr("value");
        const Format = {
          file: File,
          token: $("#main > form").find("input[type=hidden]:nth-child(2)").attr("value"),
          convert: $("#tool-submit-button").find("input").attr("value")
        };
        axios({
          url: "https://ezgif.com/webp-to-mp4/" + File,
          method: "POST",
          data: new URLSearchParams(Object.entries(Format)),
          headers: {
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9,id;q=0.8",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"'
          }
        }).then(({
          data,
          status
        }) => {
          let link = cheerio.load(data)("#output > p.outfile").find("video > source").attr("src");
          resolve({
            status: status,
            data: "https:" + link
          });
        }).catch(reject);
      });
  });
}
async function fbDownloader(Link) {
  return new Promise(async (resolve, reject) => {
    const BodyForm = {
      url: Link
    };
    await axios({
      url: "https://www.getfvid.com/downloader",
      method: "POST",
      data: new URLSearchParams(Object.entries(BodyForm)),
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9,id;q=0.8",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
      }
    }).then(respon => {
      const $ = cheerio.load(respon.data);
      let HD = $("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered").find("div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a").attr("href"),
        Normal = $("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered").find("div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(2) > a").attr("href");
      const result = {
        status: respon.status,
        author: "Made by Wudysoft",
        result: {
          link_hd: HD,
          normal: Normal
        }
      };
      resolve(result);
    }).catch(reject);
  });
}
async function SpeedVid(path, kecepatan) {
  return new Promise(async (resolve, reject) => {
    const BodyForm = new FormData();
    BodyForm.append("new-image", fs.createReadStream(path)), BodyForm.append("new-image-url", ""),
      BodyForm.append("upload", "Upload video!"), await axios({
        url: "https://s3.ezgif.com/video-speed",
        method: "POST",
        data: BodyForm,
        headers: BodyForm.getHeaders()
      }).then(({
        data
      }) => {
        const $ = cheerio.load(data);
        let File = $("#main > form").find(" input[type=hidden]:nth-child(1)").attr("value");
        const Format = {
          file: File,
          token: $("#main > form").find("input[type=hidden]:nth-child(2)").attr("value"),
          multiplier: kecepatan,
          apply_audio: "on"
        };
        axios({
          url: `https://s3.ezgif.com/video-speed/${File}?ajax=true`,
          method: "POST",
          data: new URLSearchParams(Object.entries(Format)),
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9,id;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"'
          }
        }).then(respon => {
          const ch = cheerio.load(respon.data);
          let result = {
            status: respon.status,
            author: "Made by Wudysoft",
            data: "https:" + ch("p").find("video > source").attr("src")
          };
          resolve(result);
        }).catch(reject);
      });
  });
}
async function ReverseVid(path, audio) {
  return new Promise(async (resolve, reject) => {
    const BodyForm = new FormData();
    BodyForm.append("new-image", fs.createReadStream(path)), BodyForm.append("new-image-url", ""),
      BodyForm.append("upload", "Upload video!"), await axios({
        url: "https://s3.ezgif.com/reverse-video",
        method: "POST",
        data: BodyForm,
        headers: BodyForm.getHeaders()
      }).then(async respon => {
        const $ = cheerio.load(respon.data);
        let File = $("#main > form").find("input[type=hidden]:nth-child(1)").attr("value"),
          token = $("#main > form").find("input[type=hidden]:nth-child(2)").attr("value");
        const Format = await
        function(audioo, File, token) {
          if (!0 === audioo) return {
            file: File,
            token: token,
            audio: "on",
            encoding: "original"
          };
          if (!1 === audioo) return {
            file: File,
            token: token,
            mute: "on",
            encoding: "original"
          };
          return {
            file: File,
            token: token,
            audio: "on",
            encoding: "original"
          };
        }(audio, File, token);
        axios(`https://s3.ezgif.com/reverse-video/${File}?ajax=true`, {
          method: "POST",
          data: new URLSearchParams(Object.entries(Format)),
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9,id;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"'
          }
        }).then(res => {
          const ch = cheerio.load(res.data);
          let Link = ch("p > video").find("source").attr("src"),
            Type = ch("p > video").find("source").attr("type");
          const result = {
            status: res.status,
            created: "I`am Ra",
            result: {
              link: "https:" + Link,
              type: Type
            }
          };
          resolve(result);
        }).catch(reject);
      }).catch(reject);
  });
}
async function GSMArena(querry) {
  const link = await axios.get(`https://www.gsmarena.com/res.php3?sSearch=${querry}`);
  let Url = cheerio.load(link.data)("#review-body > div > ul").find("li:nth-child(1) > a").attr("href");
  const Link = await axios.get(`https://www.gsmarena.com/${Url}`);
  let $ = cheerio.load(Link.data),
    barang = $("#body > div > div.review-header > div").find(" div.article-info-line.page-specs.light.border-bottom > h1").text().trim(),
    rilis = $("#body > div > div.review-header > div").find("div.center-stage.light.nobg.specs-accent > ul > li.specs-brief.pattern > span:nth-child(1) > span").text().trim(),
    thumb = $("#body > div > div.review-header > div").find("div.center-stage.light.nobg.specs-accent > div > a > img").attr("src"),
    ukuran = $("#body > div > div.review-header > div").find("div.center-stage.light.nobg.specs-accent > ul > li.specs-brief.pattern > span:nth-child(3) > span").text().trim(),
    tipe = $("#body > div > div.review-header > div").find("div.center-stage.light.nobg.specs-accent > ul > li.specs-brief.pattern > span:nth-child(5) > span").text().trim(),
    storage = $("#body > div > div.review-header > div").find("div.center-stage.light.nobg.specs-accent > ul > li.specs-brief.pattern > span:nth-child(7) > span").text().trim(),
    display = $("#body > div > div.review-header > div").find("div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-display > div").text().trim(),
    inchi = $("#body > div > div.review-header > div").find("div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-display > strong > span").text().trim(),
    camPix = $("#body > div > div.review-header > div").find("div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-camera > strong > span:nth-child(1)").text().trim(),
    Mp = $("#body > div > div.review-header > div").find("div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-camera > strong > span:nth-child(2)").text().trim(),
    VideoVix = $("#body > div > div.review-header > div").find("div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-camera > div").text().trim(),
    Ram = $("#body > div > div.review-header > div").find("div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-expansion > strong > span:nth-child(2)").text().trim(),
    chipset = $("#body > div > div.review-header > div").find("div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-expansion > div").text().trim(),
    batre = $("#body > div > div.review-header > div").find("div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-battery > strong > span:nth-child(1)").text().trim(),
    Mah = $("#body > div > div.review-header > div").find("div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-battery > strong > span:nth-child(2)").text().trim(),
    merekBatre = $("#body > div > div.review-header > div").find("div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-battery > div").text().trim(),
    AngkaRam = $("#body > div > div.review-header > div").find("div.center-stage.light.nobg.specs-accent > ul > li.help.accented.help-expansion > strong > span:nth-child(1)").text().trim(),
    detail = [];
  $("#specs-list").each(function(anu, RA) {
    let isi = $(RA).text().trim();
    detail.push(isi);
  });
  return {
    status: Link.status,
    author: "Made by Wudysoft",
    result: {
      judul: barang,
      rilis: rilis,
      thumb: thumb,
      ukuran: ukuran,
      type: tipe,
      storage: storage,
      display: display,
      inchi: inchi,
      pixel: camPix + Mp,
      videoPixel: VideoVix,
      ram: AngkaRam + Ram,
      chipset: chipset,
      batrai: batre + Mah,
      merek_batre: merekBatre,
      detail: detail[0]
    }
  };
}
async function zodiakMing(querry) {
  const link = await axios.get(`https://www.fimela.com/zodiak/${querry}/minggu-ini`),
    $ = cheerio.load(link.data);
  let thumb = $("body > div > div > div").find("div > div > a > img").attr("src"),
    judul = $("body > div > div > div").find("div > div > div.zodiak--content-header__text > h5").text().trim(),
    date = $("body > div > div > div").find("div> div.zodiak--content-header__text > span").text().trim(),
    hoki = $("body > div > div > div > div").find("div > div > div:nth-child(1) > div > span").text().trim(),
    umum = $("body > div > div > div > div").find(" div > div > div:nth-child(1) > div > p").text().trim(),
    love = $("body > div > div > div > div").find(" div > div > div:nth-child(2) > div > p").text().trim(),
    keuangan = $("body > div > div > div > div").find(" div > div > div:nth-child(3) > div > p").text().trim();
  return {
    status: link.status,
    data: {
      judul: judul,
      thumb: thumb,
      date: date,
      nomer_hoki: hoki,
      isi: {
        umum: umum,
        love: love,
        keuangan: keuangan
      }
    }
  };
}
async function zodiakHar(querry) {
  let Hasil = [];
  return await axios.request(`https://www.fimela.com/zodiak/${querry}`, {
    method: "GET",
    headers: {
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9,id;q=0.8",
      "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"'
    }
  }).then(({
    data
  }) => {
    const $ = cheerio.load(data);
    let thumb = $("body > div > div > div").find("div > div > a > img").attr("src"),
      judul = $("body > div > div.container-main > div.container-article > div").find("div.zodiak--content-header__right > div.zodiak--content-header__text > h5").text().trim(),
      tanggal = $("body > div > div > div > div > div > div > span").text().trim(),
      nomer_ = $("body > div > div > div > div > div > div").find("div:nth-child(1) > div.zodiak--content__content > span").text().trim(),
      isi = [];
    $("body > div > div > div > div > div > div").each(function(anu, RA) {
      let Data = {
        umum: $(RA).find("div:nth-child(1) > div.zodiak--content__content > p").text().trim() || void 0,
        love: $(RA).find("div:nth-child(2) > div.zodiak--content__content > p").text().trim() || void 0,
        keuangan: $(RA).find("div:nth-child(3) > div.zodiak--content__content > p").text().trim() || void 0
      };
      isi.push(Data);
    });
    let ramal = [];
    isi.map(ryuzin => {
      void 0 !== ryuzin.umum && void 0 !== ryuzin.love && void 0 !== ryuzin.keuangan && ramal.push(ryuzin);
    });
    const result = {
      judul: judul,
      thumb: thumb,
      date: tanggal,
      no_hoki: nomer_,
      teori: ramal[0]
    };
    Hasil.push(result);
  }), Hasil[0];
}
async function Shoope(item, limit) {
  const hasil = [];
  return await axios.request(`https://shopee.co.id/api/v4/search/search_items?by=relevancy&keyword=${item}&limit=${limit}&newest=0&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2`, {
    method: "GET",
    data: null,
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9,id;q=0.8",
      "if-none-match-": "55b03-856cd63f16112f8a43da6096f97ac3fe",
      "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"'
    }
  }).then(respon => {
    hasil.push(respon.data);
  }), hasil[0];
}
async function pinterest(querry) {
  let HASIL = [];
  return await axios.request("https://id.pinterest.com/search/pins/?rs=typed&q=" + querry, {
    method: "GET",
    url: "https://id.pinterest.com/search/pins/?rs=typed&q=" + querry,
    headers: {
      "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
      "sec-ch-ua-mobile": "?0",
      "upgrade-insecure-requests": "1",
      cookie: 'csrftoken=ebe0be3a93cea6072be18633add953a2; _b="AVezvd6F4UtE24FUsA6INxipyZZDoSpyCc5vaJK4QDYXmExosVEc4h6WkiKhlVtQ430="; cm_sub=denied; fba=True; _ga=GA1.2.862909259.1620474446; g_state={"i_l":0}; _auth=1; _pinterest_sess=TWc9PSZ0VEZqZmdDSlJYaGU5REIvNklIcVlnMjE5b0ZraTE5REJVQ0JiMUwxTkZZaGFoVk1sRDVhOFlwQzhkQnQ0YkMwRlNyV0lIWUFlK0ZVTkVxYUhKNmlvZ0R1UXlQYTBRRVVhMU1yYkpmcXpHK3UyNjNhckRqUFFOYVJVa3RnVmJtVzd2MmRGaHFMZUpLNVhtaHptTDhWSnBSdXhZY0FhRnRTN3J1S0V4cGtsVTBxeE54NkF2blVNSFV3R0NTQTR1bVVNRURGVGdnYlN5UjdBbk9YcHVGbGI3a1kwd1dEZDgrZVM1SDc3V0pJMm00OWxKUDVNQjBLVlFocTB4Mjg1M1RnbGxBaFAxbS9MTnVzei91cEQvcjBtakp6N0ZnU2t1Y3NxWW1DRDV1Q3h0ankvQ3FEWGh3MXczcXBHNXJpYVNCMHB6dUoxMGF6ZzVxN2VqQVBoSElSd0tiQk41ZVRPQXlOaGNpNzVQMWJSeVZJbCtYYVMxQ1ZRUFUwalU3eGVzMGRySlNzdWo1NG5uaXNFM3ZpT0o0TkZHR1daUXlwaXFQclMwa04raW9xVnVaTTRSVGEzTE03TVlZcmZYVDd5UmVPd2lZaGw4aE9VMHJBd0tidEsrcHdPWk96RlFMekVLTzY3VU1PL0tIYUdwUE1IWVdJNnJXalBkU09Sb3dEaHlQVVR1T1RqNW5Sc2FRdmVkZmhkMk9HNHBCL0ZpZ3NMdmZvVW9ReVltTFBCTlNLWHpray9LNWJ2UTNvTlBzVm9aZjRvYWRvRFhla0dBNzdveWJVYXZmVFp2cnFFNU5DYUVwSHhxeDlIajNIVTlHaEVYdGptWm5mSGVSRmtIMmQwVVVVZlVCVEh6UHB3TnBtdWV0b2l6L3VTc3pXMXFGN3lHS3ZJM3BwL0NrWVJDMm1HY2tROGxuQVFRNS9OUW45R3dtSk8zeFJidVFSTG1qTG5PelAvKzd3T3lrN1NoKzBHVGNTY1pGSEY0bW8xcGVmc3NtclBhTWE2QUMxOXNpQWUwRmo4UHl0ZGpwUzhUQXVhbjYwT0ZJeHhHai8yOWFUVTA1Wkx2czN4VSttLzMvbkFVQ2svWnZvNC9xZ3E4VkhYSFZ5elo4TzhtU0o5c3ZDcEJyYjE3QVI1WHlmTTFhWThvWHQ1T0tSTWRsWnI3a1lpU245dEVLd1lZSXRremtkTUZmcVA2YUg0c1UrSk1JOWJVRzZpcWd3T0NVaFZkdUh3UUdURi9sbDBqT2pBZVV2ZnlTQzc5ZnBMYkFMQ1ZsWjdIYWcmaDc1Uk5kK2I4MjFMUXBaVUthci9rVHpCUWRvPQ==; _pinterest_cm="TWc9PSYxZnpkMS9XN29Rd2R0TnpBN0RzVktja1J4NUtINUJqRzNGODFXS0xES1pndWlNVm52a0d3V0JocmVIS3p5eDdnNXNZa0hGelNQNDBSTFRId3ZhTFFIQjRGOW1lNlJZMzFiVlg1MHhSOFpmMGhRZUoySUpJZDIyWlVYMjRXNHRaL1lodFl4eW1jWjNyTklpbytYbHZyd29nRm5DY0pQOGgyUWpDdk9zQ1craXR5VEZoNHV4ZzRnOXV4SUFFSStYZCsmT08zMFI1bktXa3pwSDFtK3NNRWpxWWNpQzNzPQ=="; _routing_id="595f24cd-7f4c-4495-aa67-37212d099cd8"; sessionFunnelEventLogged=1'
    }
  }).then(res => {
    const $ = cheerio.load(res.data);
    let hasil = [];
    $("body > div > div > div > div > div > div > div > div > div > div > div").each(function(a, b) {
      $(b).find("div").each(function(c, d) {
        let Link = $(d).find("div > div > div > div > a").find("img").attr("src");
        hasil.push(Link);
      });
    });
    let Data = [];
    hasil.map(V => {
      void 0 !== V && Data.push(V.replace("236x", "originals"));
    });
    let unique = [...new Set(Data)];
    const result = {
      status: res.status,
      author: "Made by Wudysoft",
      result: unique
    };
    HASIL.push(result);
  }), HASIL[0];
}
async function TiktokDown(link) {
  return new Promise(async (resolve, reject) => {
    await axios.request("https://toksaver.com/convertok?url=" + link, {
      method: "GET",
      data: null,
      headers: {
        accept: "/",
        "accept-language": "en-US,en;q=0.9,id;q=0.8",
        "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
      }
    }).then(res => {
      resolve(res.data);
    }).catch(reject);
  });
}

function jagokata(input) {
  return new Promise((resolve, reject) => {
    axios.get("https://jagokata.com/kata-bijak/kata-" + input.replace(/\s/g, "_") + ".html?page=1").then(res => {
      const $ = cheerio.load(res.data);
      let data = [];
      if ($('div[id="main"]').find('ul[id="citatenrijen"] > li').each(function(index, element) {
          let x = $(this).find('div[class="citatenlijst-auteur"] > a').text().trim(),
            y = $(this).find('span[class="auteur-beschrijving"]').text().trim(),
            z = $(element).find('q[class="fbquote"]').text().trim();
          data.push({
            author: x,
            bio: y,
            quote: z
          });
        }), data.splice(2, 1), 0 === data.length) return resolve({
        status: !1
      });
      resolve({
        status: !0,
        result: data
      });
    }).catch(reject);
  });
}

function Nekopoi() {
  return new Promise(function(resolve, reject) {
    axios.get("http://nekopoi.care", {
      timeout: 6e3
    }).then(req => {
      const title = [],
        link = [],
        image = [],
        soup = cheerio.load(req.data);
      if (soup("div.eropost").each(function(i, e) {
          soup(e).find("h2").each(function(j, s) {
            title.push(soup(s).find("a").text().trim()), link.push(soup(s).find("a").attr("href"));
          }), image.push(soup(e).find("img").attr("src"));
        }), void 0 === {}) reject("No Result:(");
      else {
        let i = Math.floor(Math.random() * title.length),
          hehe = {
            title: title[i],
            image: image[i],
            link: link[i]
          };
        resolve(hehe);
      }
    });
  });
}

function NekopoiDl(url) {
  return new Promise(function(resolve, reject) {
    axios.get(url, {
      timeout: 6e3
    }).then(req => {
      try {
        const links = [];
        let soup = cheerio.load(req.data),
          title = soup("title").text();
        soup("div.liner").each(function(i, e) {
          soup(e).find("div.listlink").each(function(j, s) {
            soup(s).find("a").each(function(p, q) {
              links.push(soup(q).attr("href"));
            });
          });
        });
        resolve({
          title: title,
          links: links
        });
      } catch (err) {
        reject("Error : " + err);
      }
    });
  });
}
async function Tebakgambar() {
  let random_level = Math.floor(136 * Math.random()),
    random_eq = Math.floor(20 * Math.random());
  return axios.get(`https://jawabantebakgambar.net/level-${random_level}/`).then(val => {
    let href = cheerio.load(val.data)("ul > * > a").eq(random_eq),
      jwbn = href.find("span").text(),
      src = "https://jawabantebakgambar.net" + href.find("img").attr("data-src"),
      petunjuk = jwbn.replace(/[AIUEO|aiueo]/g, "_");
    return {
      img: src,
      jawaban: jwbn,
      petunjuk: petunjuk
    };
  });
}

function clean(string) {
  return string.replace(/{/g, "").replace(/}/g, "").replace(/"/g, "");
}