import cheerio from "cheerio";
import fetch from "node-fetch";
import {
  lookup
} from "mime-types";
import {
  URL_REGEX
} from "@whiskeysockets/baileys";
import {
  PinterestDownloader
} from "../../lib/download/pinterest.js";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!(text = text.endsWith("SMH") ? text.replace("SMH", "") : text)) throw "Input Query / Pinterest Url";
  let res = await pinterest(text),
    mime = await lookup(res);
  text.match(URL_REGEX) ? await conn.sendMessage(m.chat, {
    [mime.split("/")[0]]: {
      url: res
    },
    caption: `Succes Download: ${await shortUrl(res)}`
  }, {
    quoted: m
  }) : await conn.sendFile(m.chat, res, "", `Result From: ${text.capitalize()}\n${await shortUrl(res)}`, m);
};
handler.help = handler.alias = ["pint"], handler.tags = ["downloader"], handler.command = /^(pint)$/i;
export default handler;
async function pinterest(query) {
  if (query.match(URL_REGEX)) {
    let res = await fetch("https://www.expertsphp.com/facebook-video-downloader.php", {
        method: "post",
        body: new URLSearchParams(Object.entries({
          url: query
        }))
      }),
      data = cheerio.load(await res.text())('table[class="table table-condensed table-striped table-bordered"]').find("a").attr("href");
    if (!data) throw "Can't download post :/";
    return data;
  } {
    let pinterest = new PinterestDownloader(),
      data = await pinterest.searchPinterest(query);
    if (!data.length) throw `Query "${query}" not found :/`;
    return data[~~(Math.random() * data.length)].images_url;
  }
}
async function shortUrl(url) {
  return await (await fetch(`https://tinyurl.com/api-create.php?url=${url}`)).text();
}