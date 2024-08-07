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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.cafelagu search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .cafelagu search|vpn");
      m.react(wait);
      try {
        let res = await searchCafelagu(inputs),
          teks = res.map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📚 *Title:* ${item.title}\n🎵 *Artist:* ${item.artist}\n🔗 *DownloadLink:* ${item.downloadLink}\n🖼️ *DetailThumb:* ${item.detailThumb}\n`).filter(v => v).join("\n\n________________________\n\n"),
          ytthumb = await (await conn.getFile(res[0]?.detailThumb)).data,
          msg = await generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
              text: teks,
              jpegThumbnail: ytthumb,
              contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                  body: "L I R I K",
                  containsAutoReply: !0,
                  mediaType: 1,
                  mediaUrl: res[0]?.downloadLink,
                  renderLargerThumbnail: !0,
                  showAdAttribution: !0,
                  sourceId: "WudySoft",
                  sourceType: "PDF",
                  previewType: "PDF",
                  sourceUrl: res[0]?.downloadLink,
                  thumbnail: ytthumb,
                  thumbnailUrl: res[0]?.detailThumb,
                  title: htki + " C A F E L A G U " + htka
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
      if (!inputs) return m.reply("Input query link\nExample: .cafelagu app|link");
      try {
        let item = await getCafelagu(inputs),
          captvid = `📚 *Title:* ${item.title}\n🎵 *Artist:* ${item.artist}\n🔗 *DownloadLink:* ${item.downloadLink}\n🖼️ *DetailThumb:* ${item.detailThumb}\n⏱️ *Duration:* ${item.duration}\n🔊 *AudioSrc:* ${item.audioSrc}\n🎧 *AudioType:* ${item.audioType}\n📝 *Description:* ${item.description}\n💾 *DownloadLinks:* ${item.downloadLinks.map(link => encodeURI(link)).join("\n• ")}\n⚡ *FastDownloadLink:* ${item.fastDownloadLink}\n`,
          ytthumb = await (await conn.getFile(item.detailThumb)).data,
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
                  mediaUrl: item.downloadLink,
                  renderLargerThumbnail: !0,
                  showAdAttribution: !0,
                  sourceId: "WudySoft",
                  sourceType: "PDF",
                  previewType: "PDF",
                  sourceUrl: item.downloadLink,
                  thumbnail: ytthumb,
                  thumbnailUrl: item.detailThumb,
                  title: htki + " C A F E L A G U " + htka
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
handler.help = ["cafelagu"], handler.tags = ["internet"], handler.command = /^(cafelagu)$/i;
export default handler;
async function searchCafelagu(query) {
  const url = "https://mp3.cafelagu.me";
  try {
    const response = await fetch(url + "/download/" + query),
      html = await response.text(),
      $ = cheerio.load(html);
    return $("#main div.menu").map((index, element) => {
      const $element = $(element),
        detailThumb = url + $element.find(".detail-thumb img").attr("src"),
        detailInfo = $element.find(".detail-info");
      return {
        title: detailInfo.find(".ab").text().trim(),
        artist: detailInfo.find(".sg").text().trim(),
        downloadLink: url + detailInfo.find("a.download").attr("href"),
        detailThumb: detailThumb
      };
    }).get();
  } catch (error) {
    throw error;
  }
}
async function getCafelagu(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      downloadLink = "https://mp3.cafelagu.me" + $(".download-button").attr("href"),
      downloadData = await getDownloadLinks(downloadLink);
    return {
      title: $("h1").text().trim(),
      artist: $(".bh-info .f12").text().trim(),
      downloadLink: downloadLink,
      detailThumb: $(".bh-thumb img").attr("src"),
      playCount: $(".bh-info .play-count").text().trim(),
      duration: $(".bh-info b").text().trim().split(":")[1].trim(),
      audioSrc: $(".bh-audio audio source").attr("src"),
      audioType: $(".bh-audio audio source").attr("type"),
      description: $(".info b").text().trim(),
      downloadLinks: downloadData.downloadLinks,
      fastDownloadLink: downloadData.fastDownloadLink
    };
  } catch (error) {
    console.error(error);
  }
}
async function getDownloadLinks(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      downloadLinks = [];
    $("iframe.download-iklan1").each((index, element) => {
      const src = $(element).attr("src");
      downloadLinks.push(src);
    });
    const fastDownloadLink = $("a.button-watch").attr("onclick").match(/'(.*?)'/)[1];
    return {
      downloadLinks: downloadLinks,
      fastDownloadLink: fastDownloadLink
    };
  } catch (error) {
    console.error(error);
  }
}