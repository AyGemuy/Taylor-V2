import cheerio from "cheerio";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import {
  convertZipToPdf
} from "../../lib/tools/pdfConverter.js";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["tips", "search", "episode", "link", "down", "convert", "pdf"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.west search|manga\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("tips" === feature) {
      let cap = "*[ WESTMANGA TIPS ]*\n\n1. Cari manga memakai perintah *.west search|query* ubah query sesuka kalian.\n2. Mengambil episode memakai perintah *.west episode|query* ubah query dari hasil link sebelumnya.\nContoh link: https://westmanga.info/manga/a-nyakuza-manga/\n3. Mengambil link download memakai perintah *.west link|query* ubah query dari hasil link sebelumnya.\nContoh link: https://westmanga.info/a-nyakuza-manga-chapter-00-bahasa-indonesia/\n4. Mendownload data memakai perintah *.west down|query* ubah query dari hasil link sebelumnya.\nContoh link: https://downloader.4youscan.xyz/?id=296931\n5. Melakukan pengunduhan lalu mengkonversi memakai perintah *.west convert* kemudian tunggu beberapa waktu dan ketik *.west pdf* untuk mengambil file PDF manga nya.";
      m.react(wait);
      try {
        m.reply(cap);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("link" === feature) {
      if (inputs.includes("https://westmanga.info/manga/")) return m.reply("input link dari westmanga?");
      m.react(wait);
      try {
        let res = await DownWest(inputs),
          cap = "*Link:*\n" + res + "\n\nKetik *.west down*|" + res + " untuk menyimpan file nya";
        m.reply(cap);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("down" === feature) {
      let cap = "Input link untuk di download zip?\nKetik *.west convert* untuk mengkonversi file nya\ndan *.west pdf* untuk mengambil hasil konversi";
      if (!inputs) return m.reply(cap);
      m.react(wait);
      try {
        await downloadImages(inputs);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("pdf" === feature) {
      m.react(wait);
      try {
        if (!fs.readFileSync("./images/res.pdf")) return m.reply("Convert dulu dengan perintah *.west convert*");
        await conn.sendFile(m.chat, fs.readFileSync("./images/res.pdf"), "Westmanga nya kak!", "", m, !1, {
          asDocument: !0
        }), m.reply("*Note:*\n Jika pdf tidak bisa terbuka berarti proses konversi belum selesai atau eror");
      } catch (e) {
        m.react(eror);
      }
    }
    if ("convert" === feature) {
      let cap = "\nKetik *.west pdf* untuk mengambil hasil konversi";
      m.reply(wait + cap);
      const zipFile = "./images/res.zip";
      try {
        const pdfName = "./images/res.pdf";
        await convertZipToPdf(zipFile, pdfName);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("search" === feature) {
      if (!inputs) return m.reply("input link dari westmanga?");
      m.react(wait);
      try {
        let list = (await SearchWest(inputs)).map((item, index) => `*${htki} 📺 West Search 🔎 ${htka}*\n\n*Title:* ${item.titles}\n*Url:* ${item.value}\n`).join("\n");
        m.reply(list);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("episode" === feature) {
      if (!inputs.includes("https://westmanga.info/manga/")) return m.reply("input link dari https://westmanga.info/manga?");
      m.react(wait);
      try {
        let list = (await SearchWest2(inputs)).map((item, index) => `*${htki} 📺 West Search 🔎 ${htka}*\n\n*Title:* ${item.titles}\n*Url:* ${item.value}\n`).join("\n");
        m.reply(list);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["west"], handler.tags = ["internet"], handler.command = /^(west(manga)?)$/i;
export default handler;
async function DownWest(url) {
  const result = [];
  return await fetch(url).then(response => response.text()).then(data => {
    const $ = cheerio.load(data);
    return $("span.dlx.r").each((index, element) => {
      const link = $(element).find("a").attr("href");
      let pairs = url.substring(url.indexOf("/") + 1).split("/");
      result.push({
        title: pairs[2],
        value: link
      });
    }), result[0]?.value;
  });
}
async function downloadImages(input) {
  try {
    const Blobs = await fetch(input).then(res => res.blob()),
      arrayBuffer = await Blobs.arrayBuffer(),
      zipBuffer = Buffer.from(arrayBuffer);
    await fs.promises.writeFile(path.join("./images", "res.zip"), zipBuffer), console.log("Download complete");
  } catch (err) {
    console.error("Download failed:", err);
  }
}
async function SearchWest(url) {
  const result = [];
  return await fetch("https://westmanga.info/?s=" + url).then(response => response.text()).then(data => {
    const $ = cheerio.load(data);
    return $("div.bsx").each((index, element) => {
      const link = $(element).find("a").attr("href"),
        titles = $(element).find("a").attr("title");
      result.push({
        titles: titles,
        value: link
      });
    }), result;
  });
}
async function SearchWest2(url) {
  const result = [];
  return await fetch(url).then(response => response.text()).then(data => {
    const $ = cheerio.load(data);
    return $("div.eph-num").each((index, element) => {
      const cap = $(element).find("span").text(),
        link = $(element).find("a").attr("href");
      result.push({
        titles: cap,
        value: link
      });
    }), result;
  });
}