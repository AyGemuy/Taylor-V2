import axios from "axios";
import fetch from "node-fetch";
import fs from "fs";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  if ("nicecerpen" === command) {
    let cer = await ngecerpen(text),
      pen = `\n\t*Title:* ${cer.title}\n\t*Author:* ${cer.author}\n\t*Kategori:* ${cer.kategori}\n\t*Lolos:* ${cer.lolos}\n\t\n\t*Cerita:*\n\t${cer.cerita}\n\t`;
    await conn.sendFile(m.chat, logo, "", pen, m);
  }
  if ("nicetiktok" === command) {
    let cer = await ngetiktok(text),
      cap = `*「 T I K T O K 」*\n*📛Author:* ${cer.author}\n*📒Title:* ${cer.desc}\n\n`.trim();
    await conn.sendFile(m.chat, cer.watermark, "", cap, m);
  }
  if ("nicewiki" === command) {
    let cer = await ngewiki(text),
      listSections = [];
    return Object.values(cer).map((v, index) => {
      listSections.push([index + " " + cmenub + " " + v.judul, [
        ["Get Image", usedPrefix + "get " + v.thumb, "\n" + v.wiki + "\n *Link:* " + v.thumb]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Wiki Search 🔎 " + htka, `⚡ Silakan pilih Wiki Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ Wiki Search Disini ☂️", listSections, m);
  }
};
handler.help = ["nice"], handler.tags = ["internet"], handler.command = /^nice(cerpen|tiktok|wiki)$/i;
export default handler;
async function ngecerpen(category) {
  return new Promise((resolve, reject) => {
    let judul = category.toLowerCase().replace(/[()*]/g, "").replace(/\s/g, "-"),
      page = Math.floor(5 * Math.random());
    axios.get("http://cerpenmu.com/category/cerpen-" + judul + "/page/" + page).then(get => {
      let $ = cheerio.load(get.data),
        link = [];
      $("article.post").each(function(a, b) {
        link.push($(b).find("a").attr("href"));
      });
      let random = link[Math.floor(Math.random() * link.length)];
      axios.get(random).then(res => {
        let $$ = cheerio.load(res.data),
          hasil = {
            title: $$("#content > article > h1").text(),
            author: $$("#content > article").text().split("Cerpen Karangan: ")[1].split("Kategori: ")[0],
            kategori: $$("#content > article").text().split("Kategori: ")[1].split("\n")[0],
            lolos: $$("#content > article").text().split("Lolos moderasi pada: ")[1].split("\n")[0],
            cerita: $$("#content > article > p").text()
          };
        resolve(hasil);
      });
    });
  });
}
async function ngetiktok(query) {
  let response = await axios("https://lovetik.com/api/ajax/search", {
    method: "POST",
    data: new URLSearchParams(Object.entries({
      query: query
    }))
  });
  return {
    desc: response.data.desc,
    author: response.data.author,
    nowm: (response.data.links[0]?.a || "").replace("https", "http"),
    watermark: (response.data.links[1].a || "").replace("https", "http"),
    audio: (response.data.links[2].a || "").replace("https", "http"),
    thumbnail: response.data.cover
  };
}
async function ngewiki(query) {
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