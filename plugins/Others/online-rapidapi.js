import cheerio from "cheerio";
import axios from "axios";
import request from "request";
import got from "got";
import FormData from "form-data";
import fs from "fs";
const handler = async (m, {
  text,
  args,
  usedPrefix,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()), conn.getName(who),
    m.quoted && m.quoted;
  if (!args[0]) {
    let hasil = ["list", "search", "detail", "cartoon", "vidsnap", "aio", "stock", "sms"],
      row = Object.keys(hasil).map((v, index) => ({
        title: "Flight Scraper " + hasil[v],
        description: "\nNo. " + index,
        rowId: usedPrefix + "rapid " + hasil[v]
      })),
      button = {
        buttonText: "☂️ Scraper Disini ☂️",
        description: `⚡ Silakan pilih Scraper di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return await conn.sendListM(m.chat, button, row, m);
  }
  let urut = text.split("|"),
    one = urut[1],
    two = urut[2];
  urut[3];
  if ("list" === args[0]) {
    var arr = ["aircrafts", "airports", "airlines"];
    if (!arr.includes(one)) return m.reply("input " + arr.join(" "));
    return await list(one);
  }
  if ("search" === args[0]) {
    if (!one) return m.reply("input text ");
    return await search(one.toUpperCase());
  }
  if ("detail" === args[0]) {
    if (!one) return m.reply("input text ");
    return await detail(one.toUpperCase());
  }
  if ("cartoon" === args[0]) {
    if (!one) return m.reply("input text ");
    return await cartoon(one, two);
  }
  if ("vidsnap" === args[0]) {
    if (!one) return m.reply("input text ");
    return await vidsnap(one);
  }
  if ("aio" === args[0]) {
    if (!one) return m.reply("input text ");
    return await aio(one);
  }
  if ("stock" === args[0]) {
    if (!one) return m.reply("input text ");
    return await stock(one);
  }
  if ("sms" === args[0]) {
    if (!one) return m.reply("input text ");
    return await sms(one, two);
  }
};
handler.tags = ["rapid"], handler.help = ["rapid <args> |query"], handler.command = ["rapid"];
export default handler;
async function list(query) {
  const options = {
    method: "GET",
    url: "https://flight-radar1.p.rapidapi.com/" + query + "/list",
    headers: {
      "X-RapidAPI-Key": "35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240",
      "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com"
    }
  };
  return (await axios.request(options)).data;
}
async function search(query) {
  const options = {
    method: "GET",
    url: "https://flight-radar1.p.rapidapi.com/flights/search",
    params: {
      query: query,
      limit: "25"
    },
    headers: {
      "X-RapidAPI-Key": "35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240",
      "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com"
    }
  };
  return (await axios.request(options)).data;
}
async function detail(query) {
  const options = {
    method: "GET",
    url: "https://flight-radar1.p.rapidapi.com/flights/detail",
    params: {
      flight: query
    },
    headers: {
      "X-RapidAPI-Key": "35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240",
      "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com"
    }
  };
  return (await axios.request(options)).data;
}
async function cartoon(type, image) {
  const data = new FormData();
  data.append("image", image), data.append("type", type);
  const options = {
    method: "POST",
    url: "https://cartoon-yourself.p.rapidapi.com/facebody/api/portrait-animation/portrait-animation",
    headers: {
      "X-RapidAPI-Key": "35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240",
      "X-RapidAPI-Host": "cartoon-yourself.p.rapidapi.com",
      ...data.getHeaders()
    },
    data: data
  };
  return (await axios.request(options)).data;
}
async function vidsnap(url) {
  const options = {
    method: "GET",
    url: "https://vidsnap.p.rapidapi.com/fetch",
    params: {
      url: url
    },
    headers: {
      "X-RapidAPI-Key": "35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240",
      "X-RapidAPI-Host": "vidsnap.p.rapidapi.com"
    }
  };
  return (await axios.request(options)).data;
}
async function aio(url) {
  const options = {
    method: "GET",
    url: "https://massive-downloader.p.rapidapi.com/download_media",
    params: {
      url: url,
      cache: "true"
    },
    headers: {
      "X-RapidAPI-Key": "35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240",
      "X-RapidAPI-Host": "massive-downloader.p.rapidapi.com"
    }
  };
  return (await axios.request(options)).data;
}
async function stock(type, query) {
  const encodedParams = new URLSearchParams();
  encodedParams.append("type", type), encodedParams.append("query", query), encodedParams.append("size", "large"),
    encodedParams.append("orientation", "landscape");
  const options = {
    method: "POST",
    url: "https://stock-photos-and-videos.p.rapidapi.com/api/search",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240",
      "X-RapidAPI-Host": "stock-photos-and-videos.p.rapidapi.com"
    },
    data: encodedParams
  };
  return (await axios.request(options)).data;
}
async function sms(number, message) {
  const options = {
    method: "POST",
    url: "https://getitsms-whatsapp-apis.p.rapidapi.com/45",
    params: {
      your_number: number,
      your_message: message
    },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240",
      "X-RapidAPI-Host": "getitsms-whatsapp-apis.p.rapidapi.com"
    },
    data: '{"your_number":' + number + ',"your_message":' + number + "}"
  };
  return (await axios.request(options)).data;
}