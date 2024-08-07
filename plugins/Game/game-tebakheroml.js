import cheerio from "cheerio";
import fetch from "node-fetch";
import {
  parseStringPromise
} from "xml2js";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  conn.tebakheroml = conn.tebakheroml ? conn.tebakheroml : {};
  let id = m.chat;
  let imgr = flaaa.getRandom();
  if (id in conn.tebakheroml) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.tebakheroml[id][0]), !1;
  let karakter = ["Aamon", "Assassin", "Jungler", "Akai", "Tank", "Aldous", "Fighter", "Alice", "Alpha", "Alucard", "Angela", "Support", "Roamer", "Argus", "EXP Laner", "Arlott", "Atlas", "Aulus", "Aurora", "Mage", "Badang", "Balmond", "Bane", "Barats", "Baxia", "Beatrix", "Marksman", "Gold Laner", "Belerick", "Benedetta", "Brody", "Bruno", "Carmilla", "Caecilion", "Mid Laner", "Chou", "Figter", "Cici", "Claude", "Clint", "Cyclops", "Diggie", "Dyrroth", "Edith", "Esmeralda", "Estes", "Eudora", "Fanny", "Faramis", "Floryn", "Franco", "Fredrinn", "Freya", "Gatotkaca", "Gloo", "Gord", "Granger", "Grock", "Guinevere", "Gusion", "Hanabi", "Hanzo", "Harith", "Harley", "Hayabusa", "Helcurt", "Hilda", "Hylos", "Irithel", "Ixia", "Jawhead", "Johnson", "Joy", "Asassin", "Julian", "Kadita", "Kagura", "Kaja", "Karina", "Karrie", "Khaleed", "Khufra", "Kimmy", "Lancelot", "Layla", "Leomord", "Lesley", "Ling", "Lolita", "Lunox", "Luo Yi", "Lylia", "Martis", "Masha", "Mathilda", "Melissa", "Minotaur", "Minsitthar", "Miya", "Moskov", "Nana", "Natalia", "Natan", "Novaria", "Odette", "Paquito", "Pharsa", "Phoveus", "Popol and Kupa", "Rafaela", "Roger", "Ruby", "Saber", "Selena", "Silvanna", "Sun", "Terizla", "Thamuz", "Tigreal", "Uranus", "Vale", "Valentina", "Valir", "Vexana", "Wanwan", "Xavier", "Yin", "Yu Zhong", "Yve", "Zhask", "Zilong"];
  let res = (await MLSound("en", karakter.getRandom().toLowerCase())).getRandom() || (await MLSound("id", karakter.getRandom().toLowerCase())).getRandom();
  let json = {
      url: res,
      title: res.split("/")[4] || res.split("/")[7]?.split(".")[0]
    },
    caption = `*${command.toUpperCase()}*\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik *${usedPrefix}hhero* untuk bantuan\nBonus: ${poin} XP\n*Balas pesan ini untuk menjawab!*`.trim();
  conn.tebakheroml[id] = [await conn.sendFile(m.chat, imgr + command, "", caption, m), json, poin, setTimeout(async () => {
    conn.tebakheroml[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.title}*`, conn.tebakheroml[id][0]),
      delete conn.tebakheroml[id];
  }, timeout)], await conn.sendMessage(id, {
    audio: {
      url: json.url
    },
    seconds: fsizedoc,
    ptt: !0,
    mimetype: "audio/mpeg",
    fileName: "vn.mp3",
    waveform: [100, 0, 100, 0, 100, 0, 100]
  }, {
    quoted: conn.tebakheroml[id][0]
  });
};
handler.help = ["tebakheroml"], handler.tags = ["game"], handler.command = /^tebakheroml/i;
export default handler;
const buttons = [
    ["Hint", "/hhero"],
    ["Nyerah", "menyerah"]
  ],
  baseUrl = "https://id.m.wikipedia.org";
async function MLSound(tema, query) {
  try {
    const url = tema === "id" ? `https://mobile-legends.fandom.com/wiki/${query}/Audio/id` : tema === "en" ? `https://mobilelegendsbuild.com/sitemap.xml` : null;
    if (!url) throw new Error("Tema tidak valid");
    let res = await fetch(url);
    let data = await res.text();
    if (tema === "en") {
      const result = await parseStringPromise(data);
      const targetUrl = result.urlset.url.filter(url => url.loc[0].includes("sound/" + query)).map(url => url.loc[0])[0];
      if (!targetUrl) return [];
      res = await fetch(targetUrl);
      data = await res.text();
    }
    const $ = cheerio.load(data);
    return $("audio").map((i, el) => $(el).attr("src")).get();
  } catch (error) {
    console.error(error);
    return [];
  }
}