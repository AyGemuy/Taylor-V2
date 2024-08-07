import fs from "fs";
import fetch from "node-fetch";
import moment from "moment-timezone";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    tqto = (await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()), conn.getName(who), `*${htki} BIG THANKS TO ${htka}*\n\n*whiskeysockets:*\nhttps://github.com/whiskeysockets\n\n*Nurutomo:*\nhttps://github.com/Nurutomo\n\n*Istikmal:* \nhttps://github.com/BochilGaming\n\n*Ariffb:*\nhttps://github.com/Ariffb25\n\n*Ilman:*\nhttps://github.com/ilmanhdyt\n\n*Amirul:*\nhttps://github.com/amiruldev20\n\n*Rasel:*\nhttps://github.com/raselcomel\n\n*Fatur:*\nhttps://github.com/Ftwrr\n\n*Rominaru:*\nhttps://github.com/Rominaru\n\n*Kannachann:*\nhttps://github.com/Kannachann\n\n*The.sad.boy01:*\nhttps://github.com/kangsad01\n\n*Ameliascrf:*\nhttps://github.com/Ameliascrf\n\n*Fokus ID:*\nhttps://github.com/Fokusdotid\n\n*AmmarBN:*\nhttps://github.com/AmmarrBN\n`);
  await conn.reply(m.chat, tqto, m);
};
handler.help = ["tqto"], handler.tags = ["main", "info"], handler.command = /^(credits|credit|thanks|thanksto|tqto)$/i;
export default handler;