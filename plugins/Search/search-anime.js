import fetch from "node-fetch";
import axios from "axios";
import cheerio from "cheerio";
import got from "got";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    name = (await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()), conn.getName(who));
  if (!text) throw `Contoh penggunaan ${usedPrefix + command} Naruto`;
  if (m.react(wait), "anibatch" === command) {
    let url = "https://www.animebatch.id/?s=",
      teks = (await searchAnimebatch(url + text)).map(anime => ({
        title: anime.title,
        type: anime.type,
        score: anime.score,
        thumbnail: anime.thumbnail,
        link: anime.link
      })).map((v, index) => `*[ ${index + 1} ]*\n*Title* : ${v.title}\n*Type* : ${v.type}\n*Score* : ${v.score}\n*Link* : ${v.link}\n*Thumb* : ${v.thumbnail}\n\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
    m.reply(teks);
  }
  if ("animeindo" === command) {
    let teks = (await searchAnimeindo(text)).map((v, index) => `*[ ${index + 1} ]*\n*Title* : ${v.title}\n*Label* : ${v.labels}\n*Desc* : ${v.description}\n*Link* : ${v.link}\n*Image* : ${v.image}\n\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
    m.reply(teks);
  }
  if ("drivenime" === command) {
    let teks = (await searchDrivenime(text)).map((v, index) => `*[ ${index + 1} ]*\n*Title* : ${v.title}\n*Label* : ${v.genre}\n*Desc* : ${v.content}\n*Link* : ${v.url}\n*Image* : ${v.image}\n*Date* : ${v.date}\n\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
    m.reply(teks);
  }
  if ("anikyojin" === command) {
    let res = await fetch("https://violetics.pw/api/anime/anikyojin?apikey=beta&manga=" + text),
      json = await res.json();
    !0 === json.isError && m.react(eror);
    let dapet = json.result,
      row = Object.values(dapet).map((v, index) => ({
        title: index + " " + v.title,
        description: "\nReleased: " + v.released + "\nType: " + v.type + "\nUrl: " + v.url + "\nThumb: " + v.thumbnail,
        rowId: usedPrefix + "ss " + v.url
      })),
      button = {
        buttonText: `☂️ ${command} Search Disini ☂️`,
        description: `⚡ Hai ${name}, Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return conn.sendListM(m.chat, button, row, m);
  }
  if ("animeplanet" === command) {
    let teks = (await searchAnimeplanet(text)).map((v, index) => `*[ ${index + 1} ]*\n*Title* : ${v.cardName}\n*Link* : ${v.href}\n*Desc* : ${v.title}\n*Image* : ${v.imageSrc}\n\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
    m.reply(teks);
  }
  if ("anisearch" === command) {
    let res = await fetch("https://violetics.pw/api/anime/anisearch?apikey=beta&manga=" + text),
      json = await res.json();
    !0 === json.isError && m.react(eror);
    let dapet = json.result,
      row = Object.values(dapet).map((v, index) => ({
        title: index + " " + v.title,
        description: "\nRate: " + v.rate + "\nUrl: " + v.url + "\nThumb: " + v.thumbnail + "\nThumb: " + v.type + "\nDuration: " + v.duration + "\nDescription: " + v.description,
        rowId: usedPrefix + "ss " + v.url
      })),
      button = {
        buttonText: `☂️ ${command} Search Disini ☂️`,
        description: `⚡ Hai ${name}, Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return conn.sendListM(m.chat, button, row, m);
  }
  if ("fanfox" === command) {
    let teks = (await searchFanfox(text)).map((v, index) => `*[ ${index + 1} ]*\n*Title* : ${v.title}\n*Genre* : ${v.genre}\n*Status* : ${v.status}\n*Rank* : ${v.rank}\n*Image* : ${v.image}\n*Url* : ${v.url}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
    m.reply(teks);
  }
  if ("gogoanime" === command) {
    let teks = (await searchGogoanime(text)).map((v, index) => `*[ ${index + 1} ]*\n*Title* : ${v.title}\n*Released* : ${v.released}\n*Image* : ${v.imgSrc}\n*Url* : ${v.href}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
    m.reply(teks);
  }
  if ("kiryu" === command) {
    let res = await fetch("https://violetics.pw/api/anime/kiryu?apikey=beta&manga=" + text),
      json = await res.json();
    !0 === json.isError && m.react(eror);
    let dapet = json.result,
      row = Object.values(dapet).map((v, index) => ({
        title: index + " " + v.title,
        description: "\nRate: " + v.rate + "\nUrl: " + v.url + "\nThumb: " + v.thumbnail + "\nChapter: " + v.chapter,
        rowId: usedPrefix + "ss " + v.url
      })),
      button = {
        buttonText: `☂️ ${command} Search Disini ☂️`,
        description: `⚡ Hai ${name}, Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return conn.sendListM(m.chat, button, row, m);
  }
  if ("kissmanga" === command) {
    let teks = (await searchKissmanga(text)).map((v, index) => `*[ ${index + 1} ]*\n*Title* : ${v.title}\n*Chapter* : ${v.chapter}\n*Chapter Url* : ${v.chapterUrl}\n*Url* : ${v.url}\n*Status* : ${v.status}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
    m.reply(teks);
  }
  if ("klikmanga" === command) {
    let teks = (await searchKlikmanga(text)).map((v, index) => `*[ ${index + 1} ]*\n*Image Url:* ${v.imageUrl}\n*Title:* ${v.title}\n*Alternate Titles:* ${v.alternateTitles}\n*Authors:* ${v.authors}\n*Illustrator:* ${v.illustrator}\n*Genres:* ${v.genres}\n*Status:* ${v.status}\n*Release Year:* ${v.releaseYear}\n*Latest Chapter:* ${v.latestChapter}\n*Url:* ${v.url}\n*Release Url:* ${v.releaseUrl}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
    m.reply(teks);
  }
  if ("komiku" === command) {
    let teks = (await searchKomiku(text)).map((v, index) => `*[ ${index + 1} ]*\n*Image Url:* ${v.imageSrc}\n*Title:* ${v.title}\n*Alternate Titles:* ${v.subtitle}\n*Update:* ${v.update}\n*Chapters:* ${v.chapters}\n*Link:* ${v.link}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
    m.reply(teks);
  }
  if ("mangadex" === command) {
    let teks = (await searchMangadex(text)).map((v, index) => {
      let input = JSON.stringify(v.links),
        data = JSON.parse(input),
        output = "";
      for (const key in data) output += "\n*" + key + ":*\n" + data[key] + "\n";
      return `*[ ${index + 1} ]*\n*Title:* ${v.title.en}\n*Alternate Titles:* ${v.altTitles.map(v => v.ja)}\n*Description:* ${v.description.id}\n*Status:* ${v.status}\n*State:* ${v.state}\n*Link:* ${output}\n*Year:* ${v.year}\n*Tags:* ${v.tags.map(v => v.attributes.name.en)}\n*Created:* ${v.createdAt}\n*Ppdated:* ${v.updatedAt}\n   `.trim();
    }).filter(v => v).join("\n\n________________________\n\n");
    m.reply(teks);
  }
  if ("manganato" === command) {
    let teks = (await searchManganato(text)).map((v, index) => `*[ ${index + 1} ]*\n*Title:* ${v.title}\n*Chapter:* ${v.chapter}\n*View:* ${v.viewCount}\n*Date:* ${v.date}\n*Author:* ${v.author}\n*Description:* ${v.description}\n*Url:* ${v.url}\n*Image:* ${v.image}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
    m.reply(teks);
  }
  if ("myanimelist" === command) {
    let res = await fetch("https://violetics.pw/api/anime/myanimelist?apikey=beta&manga=" + text),
      json = await res.json();
    !0 === json.isError && m.react(eror);
    let dapet = json.result,
      row = Object.values(dapet).map((v, index) => ({
        title: index + " " + v.title,
        description: "\nUrl: " + v.url + "\nThumb: " + v.thumbnail + "\nRate: " + v.rate + "\nChapter: " + v.chapter + "\nDescription: " + v.description,
        rowId: usedPrefix + "ss " + v.url
      })),
      button = {
        buttonText: `☂️ ${command} Search Disini ☂️`,
        description: `⚡ Hai ${name}, Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return conn.sendListM(m.chat, button, row, m);
  }
  if ("nimegami" === command) {
    let res = await fetch("https://violetics.pw/api/anime/nimegami?apikey=beta&manga=" + text),
      json = await res.json();
    !0 === json.isError && m.react(eror);
    let dapet = json.result,
      row = Object.values(dapet).map((v, index) => ({
        title: index + " " + v.title,
        description: "\nUrl: " + v.url + "\nThumb: " + v.thumbnail + "\nRate: " + v.rate + "\nStatus: " + v.status,
        rowId: usedPrefix + "ss " + v.url
      })),
      button = {
        buttonText: `☂️ ${command} Search Disini ☂️`,
        description: `⚡ Hai ${name}, Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return conn.sendListM(m.chat, button, row, m);
  }
  if ("samehadaku" === command) {
    let res = await fetch("https://violetics.pw/api/anime/samehadaku?apikey=beta&manga=" + text),
      json = await res.json();
    !0 === json.isError && m.react(eror);
    let dapet = json.result,
      row = Object.values(dapet).map((v, index) => ({
        title: index + " " + v.title,
        description: "\nUrl: " + v.url + "\nThumb: " + v.thumbnail + "\nRate: " + v.rate + "\nType: " + v.type + "\nStatus: " + v.status + "\nViews: " + v.views + "\nDescription: " + v.description,
        rowId: usedPrefix + "ss " + v.url
      })),
      button = {
        buttonText: `☂️ ${command} Search Disini ☂️`,
        description: `⚡ Hai ${name}, Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return conn.sendListM(m.chat, button, row, m);
  }
  if ("amino" === command) {
    let res = await fetch("https://violetics.pw/api/search/amino?apikey=beta&query=" + text),
      json = await res.json();
    !0 === json.isError && m.react(eror);
    let dapet = json.result,
      row = Object.values(dapet).map((v, index) => ({
        title: index + " " + v.title,
        description: "\nUrl: " + v.url + "\nThumb: " + v.thumbnail + "\nMember: " + v.member + "\nDescription: " + v.description,
        rowId: usedPrefix + "ss " + v.url
      })),
      button = {
        buttonText: `☂️ ${command} Search Disini ☂️`,
        description: `⚡ Hai ${name}, Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return conn.sendListM(m.chat, button, row, m);
  }
  if ("googleit" === command) {
    let res = await fetch("https://violetics.pw/api/search/googleit?apikey=beta&query=" + text),
      json = await res.json();
    !0 === json.isError && m.react(eror);
    let dapet = json.result,
      row = Object.values(dapet).map((v, index) => ({
        title: index + " " + v.title,
        description: "\nSnippet: " + v.snippet + "\nLink: " + v.link,
        rowId: usedPrefix + "ss " + v.link
      })),
      button = {
        buttonText: `☂️ ${command} Search Disini ☂️`,
        description: `⚡ Hai ${name}, Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return conn.sendListM(m.chat, button, row, m);
  }
  if ("groupwhatsapp" === command) {
    let res = await fetch("https://violetics.pw/api/search/group-whatsapp?apikey=beta&query=" + text),
      json = await res.json();
    !0 === json.isError && m.react(eror);
    let dapet = json.result,
      row = Object.values(dapet).map((v, index) => ({
        title: index + " " + v.title,
        description: "\nLink: " + v.url,
        rowId: usedPrefix + "inspect " + v.url
      })),
      button = {
        buttonText: `☂️ ${command} Search Disini ☂️`,
        description: `⚡ Hai ${name}, Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return conn.sendListM(m.chat, button, row, m);
  }
  if ("layarkaca" === command) {
    let res = await fetch("https://violetics.pw/api/search/layarkaca?apikey=beta&query=" + text),
      json = await res.json();
    !0 === json.isError && m.react(eror);
    let dapet = json.result,
      row = Object.values(dapet).map((v, index) => ({
        title: index + " " + v.title,
        description: "\nAuthor: " + v.author + "\nLink: " + v.url + "\nThumbnail: " + v.thumbnail + "\nStars: " + Array.from(v.stars),
        rowId: usedPrefix + "ss " + v.url
      })),
      button = {
        buttonText: `☂️ ${command} Search Disini ☂️`,
        description: `⚡ Hai ${name}, Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return conn.sendListM(m.chat, button, row, m);
  }
  if ("mangatoon" === command) {
    let res = await fetch("https://violetics.pw/api/search/mangatoon?apikey=beta&query=" + text),
      json = await res.json();
    !0 === json.isError && m.react(eror);
    let dapet = json.result,
      row = Object.values(dapet).map((v, index) => ({
        title: index + " " + v.title,
        description: "\nAuthor: " + Array.from(v.type) + "\nLink: " + v.url + "\nThumbnail: " + v.thumbnail,
        rowId: usedPrefix + "ss " + v.url
      })),
      button = {
        buttonText: `☂️ ${command} Search Disini ☂️`,
        description: `⚡ Hai ${name}, Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return conn.sendListM(m.chat, button, row, m);
  }
  if ("musicfinder" === command) {
    let res = await fetch("https://violetics.pw/api/search/music-finder?apikey=beta&audio=" + text),
      json = await res.json();
    !0 === json.isError && m.react(eror);
    let dapet = json.result;
    m.reply(`Title: ${dapet.title}\nalbum: ${dapet.album}\nartists: ${dapet.artists}\nduration: ${dapet.duration}\nrelease: ${dapet.release}\ngenres: ${dapet.genres}`);
  }
};
handler.help = ["anibatch", "animeindo", "drivenime", "anikyoji", "animeplanet", "anisearch", "fanfox", "gogoanime", "kiryu", "kissmanga", "klikmanga", "komiku", "mangadex", "manganato", "myanimelist", "nimegami", "samehadaku", "amino", "googleit", "groupwhatsapp", "layarkaca", "mangatoon", "musicfinder"],
  handler.command = ["anibatch", "animeindo", "drivenime", "anikyojin", "animeplanet", "anisearch", "fanfox", "gogoanime", "kiryu", "kissmanga", "klikmanga", "komiku", "mangadex", "manganato", "myanimelist", "nimegami", "samehadaku", "amino", "googleit", "groupwhatsapp", "layarkaca", "mangatoon", "musicfinder"],
  handler.tags = ["internet"];
export default handler;
async function searchAnimebatch(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      result = [];
    return $(".animposx").each((index, element) => {
      const anime = {};
      anime.title = $(element).find(".title h2").text() || "tidak diketahui", anime.type = $(element).find(".type").text() || "tidak diketahui",
        anime.score = $(element).find(".score").text().trim().replace(/\s\s+/g, " ") || "tidak diketahui";
      const thumbnail = $(element).find(".content-thumb img").attr("src");
      anime.thumbnail = thumbnail ? thumbnail.split("?")[0] : "tidak diketahui";
      const animeLink = $(element).find("a").attr("href");
      anime.link = animeLink || "tidak diketahui", result.push(anime);
    }), result;
  } catch (error) {
    console.error("Error:", error);
  }
}
async function searchAnimeindo(query) {
  return await got("https://185.224.82.193/search/" + query + "/").then(response => response.body).then(html => {
    const $ = cheerio.load(html),
      result = [];
    return $(".menu .otable").each((index, element) => {
      const title = $(element).find(".videsc a").text().trim(),
        link = $(element).find(".videsc a").attr("href"),
        image = $(element).find(".vithumb img").attr("src"),
        labels = $(element).find(".videsc .label").toArray().map(label => $(label).text().trim()),
        description = $(element).find(".videsc .des").text().trim();
      result.push({
        title: title,
        link: link,
        image: image,
        labels: labels,
        description: description
      });
    }), result;
  });
}
async function searchDrivenime(query) {
  const url = "https://drivenime.com/?s=" + query,
    response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html),
    posts = [];
  return $(".post.excerpt, .post.excerpt.last").each((index, element) => {
    const post = {};
    post.title = $(element).find(".title a").text().trim() || "Tidak diketahui", post.url = $(element).find(".title a").attr("href") || "Tidak diketahui",
      post.image = $(element).find(".featured-thumbnail img").attr("src") || "Tidak diketahui",
      post.content = $(element).find(".post-content").text().trim() || "Tidak diketahui",
      post.genre = $(element).find(".theauthor a").map((i, el) => $(el).text()).get() || ["Tidak diketahui"],
      post.date = $(element).find(".thetime").text().trim() || "Tidak diketahui", posts.push(post);
  }), posts;
}
async function searchAnimeplanet(query) {
  const url = "https://www.anime-planet.com/anime/all?name=" + query;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      results = [];
    $("a.tooltip").each((index, element) => {
      const data = {},
        title = $(element).attr("title");
      data.title = extractSectionsFromHTML(title) || "tidak diketahui";
      const href = $(element).attr("href");
      href && href.includes("/anime/") && !href.includes("/anime/all/") ? data.href = "https://www.anime-planet.com" + href : data.href = "tidak diketahui";
      const imageSrc = $(element).find("img").attr("data-src");
      data.imageSrc = imageSrc || "tidak diketahui";
      const cardName = $(element).find(".cardName").text();
      data.cardName = cardName || "tidak diketahui", results.push(data);
    });
    return results.filter((obj, index) => index >= 2);
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
  }
}

function extractSectionsFromHTML(html) {
  const $ = cheerio.load(html),
    resultArray = [];
  return $("*").each((index, element) => {
    const value = $(element).text().trim();
    resultArray.push(value);
  }), resultArray;
}
async function searchFanfox(query) {
  try {
    const url = `https://m.fanfox.net/search?k=${query}`,
      response = await fetch(url),
      body = await response.text(),
      $ = cheerio.load(body),
      mangaList = [];
    return $("li div.post-one").each((index, element) => {
      const manga = {};
      manga.title = $(element).find(".title").text() || "tidak diketahui", manga.genre = $(element).find(".cover-info p:nth-child(2)").text() || "tidak diketahui",
        manga.status = $(element).find(".cover-info p:nth-child(3)").text() || "tidak diketahui",
        manga.rank = $(element).find(".cover-info p:nth-child(4)").text() || "tidak diketahui";
      const imgSrc = $(element).find(".cover img").attr("src");
      manga.image = imgSrc && (imgSrc.startsWith("//") ? `https:${imgSrc}` : imgSrc) || "tidak diketahui";
      const mangaUrl = $(element).find("a").attr("href");
      manga.url = mangaUrl || "tidak diketahui", mangaList.push(manga);
    }), mangaList;
  } catch (error) {
    return console.error(error), [];
  }
}
async function searchGogoanime(query) {
  const url = "https://www3.gogoanimes.fi/search.html?keyword=" + query;
  try {
    const response = await fetch(url),
      data = await response.text(),
      $ = cheerio.load(data),
      results = [];
    return $(".items li").each((index, element) => {
      const $li = $(element),
        result = {
          imgSrc: $li.find(".img img").attr("src") || "Tidak diketahui",
          title: $li.find(".name a").text().trim() || "Tidak diketahui",
          href: "https://www3.gogoanimes.fi" + $li.find(".name a").attr("href") || "Tidak diketahui",
          released: $li.find(".released").text().trim().replace("Released:", "") || "Tidak diketahui"
        };
      results.push(result);
    }), results;
  } catch (error) {
    return console.log("Terjadi kesalahan:", error), [];
  }
}
async function searchKissmanga(query) {
  const url = "https://kissmanga.org/manga_list?q=" + query + "&action=search";
  try {
    const response = await fetch(url),
      body = await response.text(),
      $ = cheerio.load(body),
      results = [];
    return $(".item_movies_in_cat").each((index, element) => {
      const titleElement = $(element).find(".item_movies_link") || "Tidak diketahui",
        title = titleElement.text().trim() || "Tidak diketahui",
        url = titleElement.attr("href") || "Tidak diketahui",
        chapterElement = $(element).find('a[href^="/chapter"]') || "Tidak diketahui",
        chapter = chapterElement.text().trim() || "Tidak diketahui",
        chapterUrl = chapterElement.attr("href") || "Tidak diketahui",
        status = $(element).find('div:contains("Completed")').text().trim() || "Tidak diketahui";
      results.push({
        title: title,
        url: url,
        chapter: chapter,
        chapterUrl: chapterUrl,
        status: status
      });
    }), results;
  } catch (error) {
    return console.log(error), [];
  }
}
async function searchKlikmanga(query) {
  const url = "https://klikmanga.id/?s=" + query + "&post_type=wp-manga";
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      dataArray = [];
    return $("div.c-tabs-item").each((index, element) => {
      const data = {
        imageUrl: $(element).find("div.row.c-tabs-item__content > div.col-4.col-12.col-md-2 > div.tab-thumb > a > img").attr("data-src") || "kosong",
        title: $(element).find("div.tab-summary > div.post-title > h3 > a").text() || "kosong",
        alternateTitles: $(element).find("div.post-content_item.mg_alternative > div.summary-content").text() || "kosong",
        authors: $(element).find("div.post-content_item.mg_author > div.summary-content > a").toArray().map(author => $(author).text()) || ["kosong"],
        illustrator: $(element).find("div.post-content_item.mg_artists > div.summary-content > a").text() || "kosong",
        genres: $(element).find("div.post-content_item.mg_genres > div.summary-content > a").toArray().map(genre => $(genre).text()) || ["kosong"],
        status: $(element).find("div.post-content_item.mg_status > div.summary-content").text() || "kosong",
        releaseYear: $(element).find("div.post-content_item.mg_release > div.summary-content.release-year > a").text() || "kosong",
        latestChapter: $(element).find("div.tab-meta > div.meta-item.latest-chap > span.chapter > a").text() || "kosong",
        url: $(element).find("div.tab-thumb > a").attr("href") || "kosong",
        releaseUrl: $(element).find("div.meta-item.post-on > span > a").attr("href") || "kosong"
      };
      dataArray.push(data);
    }), dataArray;
  } catch (error) {
    return console.error("Error:", error), null;
  }
}
async function searchKomiku(query) {
  const url = "https://data.komiku.id/cari/?post_type=manga&s=" + query;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      results = [];
    return $("div.daftar > div.bge").each((index, element) => {
      const imageSrc = $(element).find(".bgei img").attr("data-src"),
        link = $(element).find(".bgei a").attr("href"),
        title = $(element).find(".kan a h3").text().trim(),
        subtitle = $(element).find(".kan .judul2").text().trim(),
        update = $(element).find(".kan p").text().trim(),
        chapters = [];
      $(element).find(".kan .new1").each((idx, el) => {
        const chapterTitle = $(el).find("a").attr("title"),
          chapterNumber = $(el).find("span:last-child").text();
        chapters.push({
          title: chapterTitle,
          number: chapterNumber
        });
      }), results.push({
        imageSrc: imageSrc || "Tidak diketahui",
        link: link || "Tidak diketahui",
        title: title || "Tidak diketahui",
        subtitle: subtitle || "Tidak diketahui",
        update: update || "Tidak diketahui",
        chapters: chapters.length > 0 ? chapters.map(({
          title,
          number
        }, index) => `\n${index + 1}.\n${title}\n${number}\n\n`).join("") : "Tidak diketahui"
      });
    }), results;
  } catch (error) {
    return console.error(error), [];
  }
}
async function searchMangadex(query) {
  const res = await fetch(`https://api.mangadex.org/manga?title=${query}&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic&`);
  if (200 !== res.status) throw new Error(`Failed to search for manga. Status ${res.status}`);
  const {
    data
  } = await res.json();
  return data.map(({
    attributes
  }) => attributes);
}
async function searchManganato(query) {
  const url = "https://manganato.com/advanced_search?s=all&page=1&keyw=" + query;
  try {
    const response = await fetch(url),
      data = await response.text(),
      $ = cheerio.load(data);
    return $(".content-genres-item").map((index, element) => ({
      image: $(element).find(".genres-item-img img").attr("src") || "tidak diketahui",
      title: $(element).find(".genres-item-name").text().trim() || "tidak diketahui",
      chapter: $(element).find(".genres-item-chap").text().trim() || "tidak diketahui",
      viewCount: $(element).find(".genres-item-view").text().trim() || "tidak diketahui",
      date: $(element).find(".genres-item-time").text().trim() || "tidak diketahui",
      author: $(element).find(".genres-item-author").text().trim() || "tidak diketahui",
      description: $(element).find(".genres-item-description i").length > 0 ? "Updating" : "tidak diketahui",
      url: $(element).find(".genres-item-img").attr("href") || "tidak diketahui"
    })).get();
  } catch (error) {
    console.log(error);
  }
}