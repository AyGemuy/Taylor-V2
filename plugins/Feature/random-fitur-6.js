import fetch from "node-fetch";
import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
import {
  sticker
} from "../../lib/sticker.js";
import fs from "fs";
import {
  Quotes,
  JalanTikusMeme
} from "dhn-api";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()), conn.getName(who),
    flaaa.getRandom();
  if ("exchange" === command) {
    if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} IDR USD 50000`;
    m.react(wait);
    let f = await fetch(`https://v6.exchangerate-api.com/v6/0dd0737285141eb9fa078319/pair/${args[0]}/${args[1]}/${args[2]}`),
      x = await f.json(),
      caption = `*Last Up:* ${x.time_last_update_utc}\n*Next Up:* ${x.time_next_update_utc}\n*Dari:* ${x.base_code}\n*Ke:* ${x.target_code}\n\n*Rate:* ${x.conversion_rate}\n*Result:* ${x.conversion_result}`;
    await conn.sendFile(m.chat, logo, "", "*[ Result ]*\n" + caption, m);
  }
  if ("ipcountry" === command) {
    if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} 8.8.8.8`;
    m.react(wait);
    let f = await fetch(`https://api.country.is/${args[0]}`),
      x = await f.json(),
      caption = `*Title:* ${x.country}\n*Ip:* ${x.ip}`;
    await conn.sendFile(m.chat, logo, "", "*[ Result ]*\n" + caption, m);
  }
  if ("emojimix3" === command) {
    if (!args[0]) throw `Ex: ${usedPrefix + command} ${decodeURI("%F0%9F%92%80")}`;
    m.react(wait);
    let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(args[0])}`);
    for (let res of anu.results) {
      let stiker = await sticker(!1, res.url, packname, author);
      await conn.sendFile(m.chat, stiker, "sticker.webp", "", m);
    }
  }
  if ("emojimix4" === command) {
    if (!args[0]) throw `Ex: ${usedPrefix + command} emot + emot`;
    m.react(wait);
    let anu = await fetchJson(`https://levanter.up.railway.app/emix?q=${encodeURIComponent(args[0])}`),
      stiker = await sticker(!1, anu.result, packname, author);
    await conn.sendFile(m.chat, stiker, "sticker.webp", "", m);
  }
  if ("calc2" === command) {
    let f = await fetch(`https://levanter.up.railway.app/calc?q=${args[0]}${args[1]}${args[2]}`);
    m.react(wait);
    let caption = `*Hasil:* ${(await f.json()).result}`;
    await conn.sendFile(m.chat, logo, "", "*[ Result ]*\n" + caption, m);
  }
  if ("gqr" === command) {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} query`;
    m.react(wait);
    let img = `https://levanter.up.railway.app/gqr?text==${text}`,
      caption = "*Hasil:*";
    await conn.sendFile(m.chat, img, "", "*[ Result ]*\n" + caption, m);
  }
  if ("jamdunia" === command) {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} query`;
    m.react(wait);
    let res = await fetch(`https://levanter.up.railway.app/time?code=${text}`),
      caption = (await res.json()).result.map((v, index) => `\n*time:* ${v.time}\n*name:* ${v.name}\n*timeZone:* ${v.timeZone}\n`).filter(v => v).join("\n\n________________________\n\n");
    await conn.sendFile(m.chat, logo, "", "*[ Result ]*\n" + caption, m);
  }
  if ("mvsearch" === command) {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} query`;
    m.react(wait);
    let f = await fetch(`https://www.omdbapi.com/?apikey=742b2d09&t=${text}&plot=full`),
      x = await f.json(),
      caption = `*Title:* ${x.Title}\n*Year:* ${x.Year}\n*Rated:* ${x.Rated}\n*Released:* ${x.Released}\n*Runtime:* ${x.Runtime}\n*Genre:* ${x.Genre}\n*Director:* ${x.Director}\n*Writer:* ${x.Writer}\n*Actors:* ${x.Actors}\n*Plot:* ${x.Plot}\n*Language:* ${x.Language}\n*Country:* ${x.Country}\n*Awards:* ${x.Awards}\n`;
    await conn.sendFile(m.chat, x.Poster, "", "*[ Result ]*\n" + caption, m);
  }
  if ("mvsearch2" === command) {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} query`;
    m.react(wait);
    let f = await fetch(`https://www.omdbapi.com/?apikey=742b2d09&t=${text}&plot=full`),
      x = await f.json(),
      caption = x.results.map((v, index) => `\n*Title:* ${v.original_title}\n*overview:* ${v.overview}\n*popularity:* ${v.popularity}\n*vote:* ${v.vote_average}\n*rilis:* ${v.release_date}\n`).filter(v => v).join("\n\n________________________\n\n");
    await conn.sendFile(m.chat, "https://image.tmdb.org/t/p/w500/" + x.poster_path, "", "*[ Result ]*\n" + caption, m);
  }
  if ("lmaker" === command) {
    if (!args[0]) return m.reply("Logo Maker List\nUsage: .lmaker master|3|Haloo\n1 - 11 : calligraphy\n1 - 2 : beast\n1 - 6 : pubg\n1 - 6 : rrr\n1 - 2 : free fire\n1 - 2 : india\n1 - 3 : avengers\n1 - 2 : pushpa\n1 - 3 : master\n1 - 7 : ipl\n1      : dhoni\n1      : vijay\n1 - 6 : kgf");
    let urut = text.split("|"),
      thm = urut[0],
      images = `https://raganork-network.vercel.app/api/logo/${thm}?style=${urut[1]}&text=${urut[2]}`,
      caption = `*⎔┉━「 ${command} 」━┉⎔*\n🤠 *Query* : ${thm}`;
    await conn.sendFile(m.chat, images, "", "*[ Result ]*\n" + caption, m);
  }
  if ("quotes" === command) {
    let x = await Quotes(),
      caption = `${x.quotes}\n\n🤠 ${x.author}`;
    if (await conn.sendFile(m.chat, logo, "", "*[ Result ]*\n" + caption, m), "islami" === args[0]) {
      let caption = `${(await (await fetch(API("lolhuman", "/quotes/islami", {}, "apikey"))).json()).result}\n\n🤠 ${author}`;
      await conn.sendFile(m.chat, logo, "", "*[ Result ]*\n" + caption, m);
    }
  }
  if ("jtmeme" === command) {
    let x = await JalanTikusMeme();
    await conn.sendFile(m.chat, x, "", "*[ Result ]*\n", m);
  }
  if ("wallhaven" === command) {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} query`;
    m.react(wait);
    let ling, input = text.split("|")[1],
      arr = ["top", "hot", "latest", "random"];
    if (input) {
      if (!arr.includes(input)) return m.reply("*Example:*\n.wallhaven |hot\n\n*Pilih type yg ada*\n" + arr.map((v, index) => "  ○ " + v).join("\n"));
      "top" === input ? ling = "https://api.andeer.top/API/wall_toplist.php" : "hot" === input ? ling = "https://api.andeer.top/API/wall_hot.php" : "latest" === input ? ling = "https://api.andeer.top/API/wall_latest.php" : "random" === input && (ling = "https://api.andeer.top/API/wall_random.php");
      let f = await fetch(ling),
        x = await f.json(),
        caption = `Copyright: ${x.text.copyright}`;
      await conn.sendFile(m.chat, x.data.pic, "", "*[ Result ]*\n" + caption, m);
    } else {
      var ure;
      try {
        ure = "https://wallhaven.cc/api/v1/search?apikey=V9TPKgxBdGOIrJcnlPzg5OdiL62913o5&q=" + text;
      } catch (e) {
        ure = "https://wallhaven.cc/api/v1/search?q=" + text;
      }
      let f = await fetch(ure),
        x = await f.json(),
        caption = x.data.map((v, index) => `\nID: ${v.id}\nViews: ${v.views}\nCategory: ${v.category}\nUpload: ${v.created_at}\n`).filter(v => v).join("\n\n________________________\n\n");
      await conn.sendFile(m.chat, x.data[0]?.path, "", "*[ Result ]*\n" + caption, m);
    }
  }
};
handler.command = handler.help = ["exchange", "ipcountry", "emojimix3", "emojimix4", "calc2", "mvsearch", "mvsearch2", "lmaker", "quotes", "jtmeme", "wallhaven", "jamdunia", "gqr"],
  handler.tags = ["tools"];
export default handler;
const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
  fetch(url, options).then(response => response.json()).then(json => {
    resolve(json);
  }).catch(err => {
    reject(err);
  });
});