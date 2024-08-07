import fetch from "node-fetch";
import {
  generateWAMessageFromContent
} from "@whiskeysockets/baileys";
const handler = async (m, {
  conn,
  text
}) => {
  if (!text) throw "✳️ What do you want me to search for on YouTube?";
  if (/^https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9_-]+$/.test(text)) {
    let res = (await (await fetch("https://backendace.1010diy.com/web/free-mp3-finder/detail?url=" + text)).json()).data,
      teks = res.audios.map((item, index) => `*[ AUDIO ${index + 1} ]*\n*Format:* ${item.ext}\n*Size:* ${item.fileSize}\n*Url:* ${item.url.replace("/download?url=", "")}\n*Note:* ${item.formatNote}\n*HD:* ${item.hd ? "Ya" : "Tidak"}\n*Pro:* ${item.pro ? "Ya" : "Tidak"}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n"),
      teks2 = res.videos.map((item, index) => `*[ VIDEO ${index + 1} ]*\n*Format:* ${item.ext}\n*Size:* ${item.fileSize}\n*Url:* ${item.url.replace("/download?url=", "")}\n*Note:* ${item.formatNote}\n*HD:* ${item.hd ? "Ya" : "Tidak"}\n*Pro:* ${item.pro ? "Ya" : "Tidak"}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
    m.reply(teks + "\n\n" + teks2);
  } else {
    let res = (await (await fetch("https://backendace.1010diy.com/web/free-mp3-finder/query?q=" + text + "&type=youtube&pageToken=")).json()).data,
      teks = res.items.map((item, index) => `*[ RESULT ${index + 1} ]*\n\n*Title:* ${item.title}\n*Url:* ${item.url}\n*Duration:* ${item.duration}\n*View:* ${item.viewCount}\n\n*Description:* ${item.description}\n*Published:* ${item.publishedAt}\n`).filter(v => v).join("\n\n________________________\n\n"),
      ytthumb = await (await conn.getFile(res.items[0]?.thumbnail)).data,
      msg = await generateWAMessageFromContent(m.chat, {
        extendedTextMessage: {
          text: teks,
          jpegThumbnail: ytthumb,
          contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
              body: "S E A R C H",
              containsAutoReply: !0,
              mediaType: 1,
              mediaUrl: res.items[0]?.url,
              renderLargerThumbnail: !0,
              showAdAttribution: !0,
              sourceId: "WudySoft",
              sourceType: "PDF",
              previewType: "PDF",
              sourceUrl: res.items[0]?.url,
              thumbnail: ytthumb,
              thumbnailUrl: res.items[0]?.thumbnail,
              title: htki + " Y O U T U B E " + htka
            }
          }
        }
      }, {
        quoted: m
      });
    await conn.relayMessage(m.chat, msg.message, {});
  }
};
handler.help = ["", "search"].map(v => "ace" + v + " <pencarian>"), handler.tags = ["tools"],
  handler.command = /^(ace|acesearch)$/i;
export default handler;
async function shortUrl(url) {
  let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`);
  return await res.text();
}