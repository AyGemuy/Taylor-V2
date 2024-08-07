import PDFDocument from "pdfkit";
import request from "request";
import fs from "fs";
import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  command,
  usedPrefix,
  args,
  text
}) => {
  if ("ehsearch" === command) {
    if (!text) return m.reply("Cari apa?\n *" + usedPrefix + command + "* sakura");
    m.react(wait);
    let list = (await EhSearch(text)).map((item, index) => `*${htki} 📺 H E N T A I 🔎 ${htka}*\n\n*Title:* ${item.title}\n*Url:* ${item.url}\n`).join("\n");
    m.reply(list), m.reply("Untuk mengambil data, ketik *" + usedPrefix + command + "* url diatas");
  }
  if ("ehgmdata" === command) {
    if (!text) return m.reply("Cari apa?\n *" + usedPrefix + command + "* url");
    m.react(wait);
    let list = (await EhGmdata(text)).map((item, index) => `*${htki} 📺 H E N T A I 🔎 ${htka}*\n\n*Title:* ${item.title}\n*Thumb:* ${item.thumb}\n*GID:* ${item.gid}\n*Token:* ${item.token}\n*Key:* ${item.archiver_key}\n`).join("\n");
    m.reply(list), m.reply("Untuk mengambil link torrent, ketik *" + usedPrefix + command + "* GID TOKEN");
  }
  if ("ehtorrent" === command) {
    if (!args[0] || !args[1]) return m.reply("Cari apa?\n .ehsearch sakura");
    m.react(wait);
    let list = (await EhGallery(args[0], args[1])).map((item, index) => `*${htki} 📺 H E N T A I 🔎 ${htka}*\n\n*Title:* ${item.title}\n*Url:* ${item.url}\n`).join("\n");
    m.reply(list), m.reply("Download uttorrent di playstore, dan input url diatas");
  }
};
handler.help = ["ehsearch <input>"], handler.tags = ["nsfw"], handler.command = /^eh(torrent|gmdata|search)$/i;
export default handler;
async function generatePDF(ObjArr) {
  const data = ObjArr;

  function addImageToPDF(doc, url) {
    return new Promise((resolve, reject) => {
      request.get(url).on("error", err => {
        reject(err);
      }).on("response", response => {
        200 !== response.statusCode ? reject(new Error(`Failed to download image: ${response.statusMessage}`)) : resolve();
      }).pipe(doc.image(url));
    });
  }
  const doc = new PDFDocument();
  for (const item of data) doc.addPage(), await addImageToPDF(doc, item.image);
  doc.pipe(fs.createWriteStream("./images/images.pdf")), doc.end();
}
async function EhSearch(input, page = "") {
  const res = await fetch("https://e-hentai.org/?page=" + page + "&f_search=" + input),
    html = await res.text(),
    $ = cheerio.load(html),
    results = [];
  return $("a").each((i, link) => {
    const title = $(link).text(),
      url = $(link).attr("href");
    url.includes("/g/") && results.push({
      title: title,
      url: url
    });
  }), results;
}
async function EhGmdata(input) {
  const pram = input.replace(/^.*hentai.org/, "https://e-hentai.org").split("/"),
    response = await fetch("https://e-hentai.org/api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        method: "gdata",
        gidlist: [
          [1 * pram[4], pram[5]]
        ],
        namespace: 1
      })
    });
  return (await response.json()).gmetadata;
}
async function EhGallery(id, token) {
  const res = await fetch("https://e-hentai.org/gallerytorrents.php?gid=" + id + "&t=" + token),
    html = await res.text(),
    $ = cheerio.load(html),
    results = [];
  return $("td > a").each((i, link) => {
    const title = $(link).text(),
      url = $(link).attr("href");
    url.endsWith(".torrent") && results.push({
      title: title,
      url: url
    });
  }), results;
}