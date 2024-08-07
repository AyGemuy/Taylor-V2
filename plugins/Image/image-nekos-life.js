import axios from "axios";
import FormData from "form-data";
import fetch from "node-fetch";
import fs from "fs";
import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
const handler = async (m, {
  conn,
  groupMetadata,
  usedPrefix,
  text,
  args,
  isPrems,
  isOwner,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    urut = (await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()), conn.getName(who), flaaa.getRandom(), sgh, text.split("|")),
    template = (urut[1], urut[2], urut[3], (args[0] || "").toLowerCase());
  if (!args[0]) {
    let caption = `*Contoh Penggunaan Single*\n${usedPrefix + command} cecan\n\n*Contoh Penggunaan Multi*\n${usedPrefix + command} pinterest |wibu\n\n*List:*\n• ${usedPrefix + command} hug\n• ${usedPrefix + command} kiss\n• ${usedPrefix + command} lizard\n• ${usedPrefix + command} neko\n• ${usedPrefix + command} pat\n• ${usedPrefix + command} 8ball\n• ${usedPrefix + command} cat\n• ${usedPrefix + command} smug\n• ${usedPrefix + command} woof\n• ${usedPrefix + command} gasm\n• ${usedPrefix + command} 8ball\n• ${usedPrefix + command} goose\n• ${usedPrefix + command} cuddle\n• ${usedPrefix + command} avatar\n• ${usedPrefix + command} slap\n• ${usedPrefix + command} v3\n• ${usedPrefix + command} pat\n• ${usedPrefix + command} gecg\n• ${usedPrefix + command} feed\n• ${usedPrefix + command} fox_girl\n• ${usedPrefix + command} lizard\n• ${usedPrefix + command} neko\n• ${usedPrefix + command} hug\n• ${usedPrefix + command} meow\n• ${usedPrefix + command} kiss\n• ${usedPrefix + command} wallpaper\n• ${usedPrefix + command} tickle\n• ${usedPrefix + command} spank\n• ${usedPrefix + command} waifu\n• ${usedPrefix + command} lewd\n• ${usedPrefix + command} ngif\n`;
    await conn.sendFile(m.chat, logo, "", caption, m);
  }
  if (command) try {
    switch (template) {
      case "8ball":
      case "cat":
        let cb = await fetch(`https://nekos.life/api/v2/${args[0]}`),
          cc = await cb.json();
        await conn.sendFile(m.chat, cc.url, "", author, m);
        break;
      case "hug":
      case "kiss":
      case "lizard":
      case "neko":
      case "pat":
        let db = await fetch(`https://nekos.life/api/${args[0]}`),
          urlgif = (await db.json()).url;
        await conn.sendMessage(m.chat, {
          video: {
            url: urlgif
          },
          gifPlayback: !0,
          gifAttribution: ~~(2 * Math.random()),
          caption: author
        }, {
          quoted: m
        });
        break;
      case "smug":
      case "woof":
      case "gasm":
      case "8ball":
      case "goose":
      case "cuddle":
      case "avatar":
      case "slap":
      case "v3":
      case "pat":
      case "gecg":
      case "feed":
      case "fox_girl":
      case "lizard":
      case "neko":
      case "hug":
      case "meow":
      case "kiss":
      case "wallpaper":
      case "tickle":
      case "spank":
      case "waifu":
      case "lewd":
      case "ngif":
        let eb = await fetch(`https://nekos.life/api/v2/img/${args[0]}`),
          ec = await eb.json();
        await conn.sendFile(m.chat, ec.url, "", author, m);
    }
  } catch {
    m.react(eror);
  }
};
handler.help = ["nlife <command> <teks>"], handler.tags = ["tools"], handler.command = /^nlife$/i;
export default handler;