import {
  sticker
} from "../../lib/sticker.js";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()),
    name = conn.getName(who),
    stiker = await sticker(null, API(`${pickRandom(stikerhuuu)}`), packname, author);
  if (stiker) return await conn.sendFile(m.chat, stiker, "sticker.webp", "", m, null, {
    fileLength: fsizedoc,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: !0,
        mediaUrl: sig,
        mediaType: 2,
        description: wm,
        title: "👋 Hai, " + name + " " + ucapan,
        body: botdate,
        thumbnail: (await conn.getFile(pp)).data,
        sourceUrl: sgc
      }
    }
  });
  throw stiker.toString();
};
handler.customPrefix = /^(huuu)$/i, handler.command = new RegExp();
export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
let stikerhuuu = ["https://telegra.ph/file/fa2bbea0f7de2575cf027.png", "https://telegra.ph/file/4a2db7bc9f3f9ecfc007d.png", "https://telegra.ph/file/5f6079714851d9927697e.png", "https://telegra.ph/file/d5100b4ce95a0012e88c1.png", "https://telegra.ph/file/2ade25087c89f86587853.png", "https://telegra.ph/file/eb2b5e5fff569896c1639.png", "https://telegra.ph/file/bd8a0e7ea01218531798b.png", "https://telegra.ph/file/300610838ffa0e6576eb9.png", "https://telegra.ph/file/954afe562e58c144620ae.png", "https://telegra.ph/file/72026dcc46e4cb4b6f9ae.png", "https://telegra.ph/file/aa9f1bea869e362e6f56e.png", "https://telegra.ph/file/09bbff0da316ba21b4f8e.png", "https://telegra.ph/file/2e0637d57e3cc1abcb4a0.png", "https://telegra.ph/file/d771ae015b5486859d03f.png", "https://telegra.ph/file/9c7606f571c05b4d0c941.png", "https://telegra.ph/file/84fd937257bcd614d6c9e.png", "https://telegra.ph/file/b8ba6989c00c50df049d0.png", "https://telegra.ph/file/2f618fffab6ff7bea32ab.png", "https://telegra.ph/file/dfbf483c209a31f01b4e5.png"];