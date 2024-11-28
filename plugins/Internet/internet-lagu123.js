import { generateWAMessageFromContent } from "@whiskeysockets/baileys";
import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, args, usedPrefix, text, command }) => {
  let lister = ["search"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature))
    return m.reply(
      "*Example:*\n.lagu123 search|vpn\n\n*Pilih type yg ada*\n" +
        lister.map((v, index) => "  ○ " + v).join("\n"),
    );
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs)
        return m.reply("Input query link\nExample: .lagu123 search|vpn");
      m.react(wait);
      try {
        let res = await searchLagu123(inputs),
          teks = res
            .map(
              (item, index) =>
                `🔍 *[ RESULT ${index + 1} ]*\n\n🖼️ *imageSrc:* ${item.imageSrc}\n📰 *title:* ${item.title}\n🌐 *url:* ${item.url}\n▶️ *playUrl:* ${item.playUrl}\n🔊 *audioUrl:* ${item.audioUrl}\n🎥 *videoUrl:* ${item.videoUrl}\n⬇️ *downloadUrl:* ${item.downloadUrl}\n`,
            )
            .filter((v) => v)
            .join("\n\n________________________\n\n"),
          ytthumb = await (await conn.getFile(res[0]?.detailThumb)).data,
          msg = await generateWAMessageFromContent(
            m.chat,
            {
              extendedTextMessage: {
                text: teks,
                jpegThumbnail: ytthumb,
                contextInfo: {
                  mentionedJid: [m.sender],
                },
              },
            },
            {
              quoted: m,
            },
          );
        await conn.relayMessage(m.chat, msg.message, {});
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
(handler.help = ["lagu123"]),
  (handler.tags = ["internet"]),
  (handler.command = /^(lagu123)$/i);
export default handler;

function replaceSymbolsAndSpaces(text) {
  return text.replace(/[^\w\s]/g, "").replace(/\s+/g, "-");
}
async function searchLagu123(query) {
  const url = `https://${replaceSymbolsAndSpaces(query)}.downloadlagu123.biz/`,
    response = await fetch(
      Object.entries(APIs).find(([key]) => key.includes("proxy"))?.[1] + url,
    ),
    html = await response.text(),
    $ = cheerio.load(html),
    resultList = [];
  return (
    $(".clearfix.search-content").each((index, element) => {
      const item = {
        position: $(element).find('[itemprop="position"]').attr("content"),
        imageSrc: $(element).find('[itemprop="image"]').attr("src"),
        title: $(element).find('[itemprop="name"]').text(),
        url: $(element).find('[itemprop="url"]').attr("href"),
        playUrl:
          "https://youtube.com/watch?v=" +
          $(element)
            .find('[onclick^="playAudio"]')
            .attr("onclick")
            .match(/'([^']+)'/)[1],
        audioUrl:
          "https://ytmp3.mobi/button-api/#" +
          $(element)
            .find('[onclick^="playAudio"]')
            .attr("onclick")
            .match(/'([^']+)'/)[1] +
          "|mp3",
        videoUrl:
          "https://ytmp3.mobi/button-api/#" +
          $(element)
            .find('[onclick^="playAudio"]')
            .attr("onclick")
            .match(/'([^']+)'/)[1] +
          "|mp4|e74c3c|ffffff",
        downloadUrl: $(element).find('a[title^="Download Lagu"]').attr("href"),
      };
      resultList.push(item);
    }),
    resultList
  );
}
