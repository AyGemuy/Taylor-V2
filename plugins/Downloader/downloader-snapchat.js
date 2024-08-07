import cheerio from "cheerio";
import fetch from "node-fetch";
import {
  generateWAMessageFromContent
} from "@whiskeysockets/baileys";
const handler = async (m, {
  conn,
  text,
  args,
  usedPrefix,
  command
}) => {
  if (!text) return m.reply("Input link snapchat\nExample: https://t.snapchat.com/2SeUKN21");
  try {
    let res = await getSnapchatVideo(text),
      snap_caption = `*💌 Name:* ${res.name}\n*🗂️ Extension:* ${res.encodingFormat}\n*⏰ Extension:* ${res.duration}\n*📊 Description:* ${res.description}\n*📨 Uploaded:* ${res.uploadDate}\n\n*👤 Creator name:* ${res.creator.alternateName}\n*🔗 Creator url:* ${res.creator.url}\n`,
      snap_thumb = res.thumbnailUrl,
      snap_thumb_s = await (await conn.getFile(snap_thumb)).data,
      msg = await generateWAMessageFromContent(m.chat, {
        extendedTextMessage: {
          text: snap_caption,
          jpegThumbnail: snap_thumb_s,
          contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
              body: "D O W N L O A D E R",
              containsAutoReply: !0,
              mediaType: 1,
              mediaUrl: res.contentUrl,
              renderLargerThumbnail: !0,
              showAdAttribution: !0,
              sourceId: "WudySoft",
              sourceType: "PDF",
              previewType: "PDF",
              sourceUrl: res.contentUrl,
              thumbnail: snap_thumb_s,
              thumbnailUrl: snap_thumb,
              title: "S N A P C H A T"
            }
          }
        }
      }, {
        quoted: m
      });
    await conn.relayMessage(m.chat, msg.message, {}), await conn.sendFile(m.chat, res.contentUrl, res.name, "", m, null, {
      mimetype: res.encodingFormat,
      asDocument: !0
    });
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["cocofun"].map(v => v + " <url>"), handler.tags = ["downloader"],
  handler.command = /^snap(chat|dl)$/i;
export default handler;
async function getSnapchatVideo(url) {
  const response = await fetch(url),
    html = await response.text(),
    scriptContent = cheerio.load(html)('script[type="application/ld+json"]').html();
  return scriptContent ? JSON.parse(scriptContent) : null;
}