import fetch from "node-fetch";
import {
  sticker
} from "../../lib/sticker.js";
import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
import {
  webp2png
} from "../../lib/webp2mp4.js";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command,
  participants
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()),
    name = conn.getName(who),
    stiker = !1;
  if (!m.quoted) throw "reply stikernya...";
  let mime = m.quoted?.mimetype || "";
  if (!/webp/.test(mime)) throw "stiker invalid";
  let media = await m.quoted?.download(),
    out = Buffer.alloc(0);
  try {
    out = await uploadImage(media);
  } catch {
    out = await webp2png(media);
  }
  stiker = await sticker(!1, out, packname, author), stiker && await conn.sendFile(m.chat, stiker, "sticker.webp", "", m, null, {
    fileLength: fsizedoc,
    contextInfo: {
      mentions: participants.map(a => a.id),
      externalAdReply: {
        showAdAttribution: !0,
        mediaUrl: sig,
        mediaType: 2,
        description: wm,
        title: "👋 Hai, " + name + " " + ucapan,
        body: botdate,
        thumbnail: await (await fetch(pp)).arrayBuffer(),
        sourceUrl: sgc
      }
    }
  });
};
handler.help = ["stickertag (caption|reply media)", "sticktag <url>"], handler.tags = ["tag"],
  handler.command = /^(stickertag|sticktag)$/i;
export default handler;