import {
  generateWAMessageContent
} from "@whiskeysockets/baileys";
const handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  let q = m.quoted ? m.quoted : m,
    mime = (m.quoted ? m.quoted : m.msg).mimetype || "";
  if (!/webp|image|video|gif|viewOnce/g.test(mime)) return m.reply(`Reply Media dengan perintah\n\n${usedPrefix + command}`);
  let media = await q?.download();
  m.react(wait);
  try {
    let msg = await generateWAMessageContent({
      video: media
    }, {
      upload: conn.waUploadToServer
    });
    await conn.relayMessage(m.chat, {
      ptvMessage: msg.videoMessage
    }, {
      quoted: m
    });
  } catch (e) {
    try {
      let dataVideo = {
        ptvMessage: m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage
      };
      await conn.relayMessage(m.chat, dataVideo, {});
    } catch (e) {
      m.react(eror);
    }
  }
};
handler.help = ["toptv (reply)"], handler.tags = ["tools"], handler.command = /^(toptv)/i;
export default handler;