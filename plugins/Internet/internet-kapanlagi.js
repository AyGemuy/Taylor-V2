import {
  generateWAMessageFromContent
} from "@whiskeysockets/baileys";
import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "url"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.kapanlagi search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .kapanlagi search|vpn");
      m.react(wait);
      try {
        let res = await scrapeLyrics(inputs),
          captvid = `*Title:*\n${res.title}\n\n*Lirik:*\n${res.song}\n\n*Url:*\n${res.url}\n`,
          ytthumb = await (await conn.getFile(res.thumbnail)).data,
          msg = await generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
              text: captvid,
              jpegThumbnail: ytthumb,
              contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                  body: "L I R I K",
                  containsAutoReply: !0,
                  mediaType: 1,
                  mediaUrl: res.url,
                  renderLargerThumbnail: !0,
                  showAdAttribution: !0,
                  sourceId: "WudySoft",
                  sourceType: "PDF",
                  previewType: "PDF",
                  sourceUrl: res.url,
                  thumbnail: ytthumb,
                  thumbnailUrl: res.thumbnail,
                  title: htki + " K A P A N L A G I " + htka
                }
              }
            }
          }, {
            quoted: m
          });
        await conn.relayMessage(m.chat, msg.message, {});
      } catch (e) {
        m.react(eror);
      }
    }
    if ("url" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .kapanlagi app|link");
      try {
        let res = await scrapeUrl(inputs),
          captvid = `*Title:*\n${res[1].headline}\n\n*Lirik:*\n${res[1].description}\n\n*Url:*\n${res[1].url}\n`,
          ytthumb = await (await conn.getFile(res[1].image.url)).data,
          msg = await generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
              text: captvid,
              jpegThumbnail: ytthumb,
              contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                  body: "L I R I K",
                  containsAutoReply: !0,
                  mediaType: 1,
                  mediaUrl: res[1].url,
                  renderLargerThumbnail: !0,
                  showAdAttribution: !0,
                  sourceId: "WudySoft",
                  sourceType: "PDF",
                  previewType: "PDF",
                  sourceUrl: res[1].url,
                  thumbnail: ytthumb,
                  thumbnailUrl: res[1].image.url,
                  title: htki + " K A P A N L A G I " + htka
                }
              }
            }
          }, {
            quoted: m
          });
        await conn.relayMessage(m.chat, msg.message, {});
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["kapanlagi"], handler.tags = ["internet"], handler.command = /^(kapanlagi)$/i;
export default handler;
async function scrapeLyrics(title) {
  const response = await fetch(`https://lirik.kapanlagi.com/lagu/${title.charAt(0).toLowerCase()}_id`),
    html = await response.text(),
    $ = cheerio.load(html),
    links = $(".div-horizontal2-list a").map((i, el) => $(el).attr("href")).get();
  let mostSimilarLyric, highestMatchCount = 0;
  for (const link of links) {
    const response = await fetch(link),
      html = await response.text(),
      $ = cheerio.load(html),
      song = $("span.lirik_line").map((index, element) => $(element).html().replace(/<\/?[^>]+(>|$)/g, "").trim()).get().join("\n"),
      lyricTitle = $(".head-lirik h5").text().trim().replace(/<\/?[^>]+(>|$)/g, ""),
      thumbnailUrl = $("img.lirik-headline-image").attr("src"),
      linkHref = $("link[rel='canonical']").attr("href"),
      titleWords = title.toLowerCase().split(/\W+/),
      lyricTitleWords = lyricTitle.toLowerCase().split(/\W+/);
    let matchCount = 0;
    for (const word of titleWords) lyricTitleWords.includes(word) && matchCount++;
    matchCount > highestMatchCount && (highestMatchCount = matchCount, mostSimilarLyric = {
      title: lyricTitle,
      song: song,
      thumbnail: thumbnailUrl,
      url: linkHref
    });
  }
  return mostSimilarLyric;
}
async function scrapeUrl(url) {
  const response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html);
  let teksJson;
  $("script[type='application/ld+json']").each((index, element) => {
    const teksElement = $(element).html();
    if (teksElement.trim().startsWith("[") && teksElement.trim().endsWith("]")) return teksJson = teksElement.trim(), !1;
  });
  return JSON.parse(teksJson).map(obj => {
    const newObj = {};
    for (const key in obj) newObj[key.replace("@", "")] = obj[key];
    return newObj;
  });
}