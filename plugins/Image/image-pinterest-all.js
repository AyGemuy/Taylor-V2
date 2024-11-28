import * as cheerio from "cheerio";
import fetch from "node-fetch";
import { lookup } from "mime-types";
import { URL_REGEX } from "@whiskeysockets/baileys";
import { PinterestDownloader } from "../../lib/download/pinterest.js";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    m.react(wait);
    if (!text.endsWith("SMH")) text = text.replace("SMH", "");
    if (!text) throw "Input Query / Pinterest Url";
    const results = await pinterest(text);
    const slides = [];
    for (let i = 0; i < 5; i++) {
      try {
        const { images_url } = results[i];
        const title = `Result From: ${text.capitalize()}`;
        const footer = await shortUrl(images_url);
        const header = `Image ${i + 1}`;
        slides.push([
          title,
          footer,
          header,
          images_url,
          [["Source", images_url, "cta_url"]],
        ]);
      } catch (e) {
        console.error(`Error processing result ${i}: ${e}`);
      }
    }
    await conn.sendSlide(
      m.chat,
      `Pinterest Results`,
      `Downloaded from ${text}`,
      slides,
      m,
    );
    m.react(sukses);
  } catch (e) {
    console.error(`Error handling message: ${e}`);
    m.react(eror);
  }
};
(handler.help = handler.alias = ["pinterest"]),
  (handler.tags = ["image"]),
  (handler.command = /^(pin|pinterest)$/i);
export default handler;
async function pinterest(query) {
  try {
    if (query.match(URL_REGEX)) {
      const res = await fetch(
        "https://www.expertsphp.com/facebook-video-downloader.php",
        {
          method: "post",
          body: new URLSearchParams(
            Object.entries({
              url: query,
            }),
          ),
        },
      );
      const data = cheerio
        .load(await res.text())(
          'table[class="table table-condensed table-striped table-bordered"]',
        )
        .find("a")
        .attr("href");
      if (!data) throw "Can't download post :/";
      return [data];
    } else {
      const pinterest = new PinterestDownloader();
      const data = await pinterest.searchPinterest(query);
      if (!data.length) throw `Query "${query}" not found :/`;
      return data.slice(0, 5);
    }
  } catch (e) {
    console.error(`Error searching Pinterest: ${e}`);
  }
}
async function shortUrl(url) {
  try {
    return await (
      await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
    ).text();
  } catch (e) {
    console.error(`Error shortening URL: ${e}`);
  }
}
