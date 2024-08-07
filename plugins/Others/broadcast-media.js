import {
  addExif
} from "../../lib/sticker.js";
import fetch from "node-fetch";
const commandList = ["bcvn", "bcvid", "bcimg", "bcstick", "bctxt", "bctxt2"],
  mimeAudio = "audio/mpeg",
  mimeVideo = "video/mp4",
  mimeImage = "image/jpeg",
  mimeSticker = "image/webp",
  generateDoc = (teks, externalAdReply) => ({
    mimetype: mimeAudio,
    fileLength: fsizedoc,
    seconds: fsizedoc,
    ptt: !0,
    waveform: [100, 0, 100, 0, 100, 0, 100],
    contextInfo: {
      externalAdReply: externalAdReply
    }
  }),
  handler = async (m, {
    conn,
    command,
    args
  }) => {
    let teks;
    args.length >= 1 ? teks = args.slice(0).join(" ") : m.quoted && m.quoted?.text && (teks = m.quoted?.text);
    const readMore = String.fromCharCode(8206).repeat(1),
      imgvn = await (await conn.getFile(flaaa.getRandom() + "Broadcast " + command.slice(2))).data,
      externalAdReply = {
        body: "Pesan: " + teks,
        containsAutoReply: !0,
        mediaType: 1,
        mediaUrl: sig,
        renderLargerThumbnail: !0,
        sourceUrl: null,
        thumbnail: imgvn,
        thumbnailUrl: flaaa.getRandom() + "Broadcast " + command.slice(2),
        title: `${htki} BROADCAST ${htka} 📢`
      };
    if (!commandList.includes(command)) throw "❌ Perintah tidak valid!";
    const doc = generateDoc(0, externalAdReply);
    let groups = Object.entries(conn.chats).filter(([_, chat]) => chat.isChats).map(v => v[0]).filter(item => item.endsWith("@g.us"));
    for (let id of groups)
      if ("bcvn" === command) {
        const audioValue = m.quoted && "audioMessage" === m.quoted?.mtype ? m.quoted?.download() : await generateVoice("id-ID", "id-ID-ArdiNeural", teks);
        audioValue && (doc.audio = audioValue, doc.mimetype = mimeAudio, await conn.sendMessage(id, doc, {
          quoted: null
        }));
      } else if ("bcvid" === command) {
      const videoValue = m.quoted && "videoMessage" === m.quoted?.mtype ? m.quoted?.download() : {
        url: giflogo
      };
      videoValue && (doc.video = videoValue, doc.mimetype = mimeVideo, doc.caption = teks, await conn.sendMessage(id, doc, {
        quoted: null
      }));
    } else if ("bcimg" === command) {
      const imageValue = m.quoted && "imageMessage" === m.quoted?.mtype ? m.quoted?.download() : {
        url: logo
      };
      imageValue && (doc.image = imageValue, doc.mimetype = mimeImage, doc.caption = teks, await conn.sendMessage(id, doc, {
        quoted: null
      }));
    } else if ("bcstick" === command) {
      const stickerValue = m.quoted && "stickerMessage" === m.quoted?.mtype ? await m.quoted?.download() : await (await conn.getFile(flaaa.getRandom() + "Broadcast " + command.slice(2))).data;
      if (stickerValue) {
        await (await conn.getFile(flaaa.getRandom() + "Broadcast " + command.slice(2))).data;
        const stiker = await addExif(stickerValue, packname, m.name);
        await conn.sendFile(id, stiker, "sticker.webp", "", null, null, {
          fileLength: fsizedoc,
          mimetype: mimeSticker,
          contextInfo: {
            externalAdReply: externalAdReply
          }
        });
      }
    } else if ("bctxt" === command) {
      const textValue = m.quoted && "extendedTextMessage" === m.quoted?.mtype ? m.quoted?.text : teks;
      textValue && (doc.text = readMore, doc.contextInfo.externalAdReply.body = textValue, doc.contextInfo.externalAdReply.thumbnailUrl = flaaa.getRandom() + textValue, await conn.sendMessage(id, doc, {
        quoted: null
      }));
    } else if ("bctxt2" === command) {
      const textValue2 = m.quoted && "extendedTextMessage" === m.quoted?.mtype ? m.quoted?.text : teks;
      textValue2 && (doc.text = textValue2, doc.contextInfo.externalAdReply.body = author, await conn.sendMessage(id, doc, {
        quoted: null
      }));
    }
  };
handler.help = commandList, handler.tags = ["main"], handler.command = new RegExp(`^(${commandList.join("|")})$`, "i");
export default handler;
async function generateVoice(Locale = "id-ID", Voice = "id-ID-ArdiNeural", Query) {
  const formData = new FormData();
  formData.append("locale", Locale), formData.append("content", `<voice name="${Voice}">${Query}</voice>`),
    formData.append("ip", "46.161.194.33");
  const response = await fetch("https://app.micmonster.com/restapi/create", {
    method: "POST",
    body: formData
  });
  return Buffer.from(("data:audio/mpeg;base64," + await response.text()).split(",")[1], "base64");
}