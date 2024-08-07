import axios from "axios";
import FormData from "form-data";
import fetch from "node-fetch";
import fs from "fs";
import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
import {
  webp2png
} from "../../lib/webp2mp4.js";
import {
  Sticker,
  StickerTypes
} from "wa-sticker-formatter";
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
    urut = (await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()), conn.getName(who), flaaa.getRandom(), text.split("|")),
    one = urut[1],
    template = (urut[2], urut[3], (args[0] || "").toLowerCase());
  if (!args[0] || !one) {
    let caption = `*Contoh Penggunaan Single*\n${usedPrefix + command} cecan\n\n*Contoh Penggunaan Multi*\n${usedPrefix + command} pinterest |wibu\n\n*List:*\n• ${usedPrefix + command} dare\n• ${usedPrefix + command} truth\n• ${usedPrefix + command} quote\n• ${usedPrefix + command} fiersa\n• ${usedPrefix + command} senja\n• ${usedPrefix + command} kpop\n• ${usedPrefix + command} random\n`;
    await conn.sendFile(m.chat, logo, "", caption, m);
  }
  try {
    if (command) switch (template) {
      case "dare":
        let ab = await fetch("https://raw.githubusercontent.com/arivpn/dbase/master/kata-kata/dare.json"),
          ac = await ab.json();
        m.reply(ac.getRandom);
        break;
      case "truth":
        let ab1 = await fetch("https://raw.githubusercontent.com/arivpn/dbase/master/kata-kata/truth.json"),
          ac1 = await ab1.json();
        m.reply(ac1.getRandom());
        break;
      case "quote":
        let ab2 = await fetch("https://raw.githubusercontent.com/arivpn/dbase/master/kata-kata/quote.json"),
          ac2 = await ab2.json(),
          ad2 = ac2[Math.floor(Math.random() * ac2.length)];
        m.reply('"' + ad2.quotes + '"\n\n*' + ad2.author + "*");
        break;
      case "fiersa":
        let ab3 = await fetch("https://raw.githubusercontent.com/arivpn/dbase/master/kata-kata/fiersa-besari.txt"),
          ad3 = (await ab3.text()).split("\n");
        m.reply(ad3.getRandom());
        break;
      case "senja":
        let ab4 = await fetch("https://raw.githubusercontent.com/arivpn/dbase/master/kata-kata/senja.txt"),
          ad4 = (await ab4.text()).split("\n");
        m.reply(ad4.getRandom());
        break;
      case "kpop":
        let ab5 = await fetch("https://raw.githubusercontent.com/arivpn/dbase/master/kpop/" + one + ".txt"),
          ad5 = (await ab5.text()).split("\n");
        await conn.sendFile(m.chat, ad5.getRandom(), "", "Nih.jpg", m);
        break;
      case "random":
        let ab6 = await fetch("https://raw.githubusercontent.com/arivpn/dbase/master/random/" + one + ".txt"),
          ad6 = (await ab6.text()).split("\n");
        await conn.sendFile(m.chat, ad6.getRandom(), "", "Nih.jpg", m);
    }
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["ariv <command> <teks>"], handler.tags = ["tools"], handler.command = /^ariv$/i;
export default handler;