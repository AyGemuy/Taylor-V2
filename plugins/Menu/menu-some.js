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
    btn = (await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()), conn.getName(who), flaaa.getRandom(), [{
      urlButton: {
        displayText: "Source Code",
        url: sgh
      }
    }, {
      callButton: {
        displayText: "Number Phone Owner",
        phoneNumber: nomorown
      }
    }, {
      quickReplyButton: {
        displayText: "To Sticker",
        id: ".s"
      }
    }]),
    urut = text.split("|"),
    one = urut[1],
    two = urut[2],
    template = (urut[3],
      (args[0] || "").toLowerCase());
  if (!args[0] || !one) {
    let caption = `*Contoh Penggunaan Single*\n${usedPrefix + command} cecan\n\n*Contoh Penggunaan Multi*\n${usedPrefix + command} pinterest |wibu\n\n*List:*\n• ${usedPrefix + command} animal\n• ${usedPrefix + command} animu\n• ${usedPrefix + command} binary\n• ${usedPrefix + command} token\n• ${usedPrefix + command} base64\n• ${usedPrefix + command} facts\n• ${usedPrefix + command} img\n• ${usedPrefix + command} joke\n• ${usedPrefix + command} dict\n• ${usedPrefix + command} lyrics\n• ${usedPrefix + command} filter\n`;
    await conn.sendFile(m.chat, logo, "", caption, m);
  }
  try {
    if (command) switch (template) {
      case "animal":
        let cb = await fetch(`https://some-random-api.com/animal/${one}`),
          cc = await cb.json();
        return conn.sendButtonImg(m.chat, cc.image, cc.fact, "Nih.jpg", "To Sticker", ".s", fakes, adReply);
      case "animu":
        let db = await fetch(`https://some-random-api.com/animu/${one}`),
          dc = await db.json();
        return conn.sendButtonGif(m.chat, "Nihh", wm, {
          url: dc.link
        }, btn, knimg);
      case "binary":
        let eb = await fetch(`https://some-random-api.com/others/binary?text=${one}`),
          ec = await eb.json();
        return m.reply(ec.binary);
      case "token":
        let fb = await fetch("https://some-random-api.com/others/bottoken"),
          fc = await fb.json();
        return m.reply(fc.token);
      case "base64":
        let gb = await fetch(`https://some-random-api.com/others/base64?${one}=${two}`),
          gc = await gb.json();
        return m.reply(gc.base64);
      case "facts":
        let hb = await fetch(`https://some-random-api.com/facts/${one}`),
          hc = await hb.json();
        return m.reply(hc.fact);
      case "img":
        let ib = await fetch(`https://some-random-api.com/img/${one}`),
          ic = await ib.json();
        return conn.sendButtonImg(m.chat, ic.link, wm, "Nih.jpg", "To Sticker", ".s", fakes, adReply);
      case "joke":
        let jb = await fetch("https://some-random-api.com/others/joke"),
          jc = await jb.json();
        return m.reply(jc.joke);
      case "dict":
        let dct = await fetch(`https://some-random-api.com/others/dictionary?word=${one}`),
          dic = await dct.json();
        return m.reply(dic.definition);
      case "lyrics":
        let kb = await fetch(`https://some-random-api.com/others/lyrics?title=${one}`),
          kc = await kb.json(),
          kd = `${kc.title}\n        ${kc.author}\n        ${kc.lyrics}\n        `;
        return conn.sendButtonImg(m.chat, kc.thumbnail.genius, kd, kc.link.genius, "To Sticker", ".s", fakes, adReply);
      case "filter":
        let a_ = m.quoted ? m.quoted : m,
          b_ = (a_.msg || a_).mimetype || "";
        if (!b_) throw "No media found";
        let d_, c_ = await a_.download(),
          e_ = new Sticker(c_, {
            pack: packname,
            author: author,
            type: StickerTypes.FULL
          });
        try {
          /webp/g.test(b_) ? d_ = await webp2png(c_) : /image/g.test(b_) ? d_ = await uploadImage(c_) : (/video/g.test(b_) || /viewOnce/g.test(b_)) && (d_ = await uploadFile(c_)), "string" != typeof d_ ? d_ = await uploadImage(c_) : /gif/g.test(b_) && (d_ = e_);
        } catch (e) {
          m.react(eror);
        }
        let fil = `https://some-random-api.com/canvas/filter/${one}?avatar=${d_}`;
        return conn.sendButtonImg(m.chat, fil, wm, "Nih.jpg", "Sticker", ".s", fakes, adReply);
      case "misc":
        let a__ = m.quoted ? m.quoted : m,
          b__ = (a__.msg || a__).mimetype || "";
        if (!b__) throw "No media found";
        let d__, c__ = await a__.download(),
          e__ = new Sticker(c__, {
            pack: packname,
            author: author,
            type: StickerTypes.FULL
          });
        try {
          /webp/g.test(b__) ? d__ = await webp2png(c__) : /image/g.test(b__) ? d__ = await uploadImage(c__) : (/video/g.test(b__) || /viewOnce/g.test(b__)) && (d__ = await uploadFile(c__)), "string" != typeof d__ ? d__ = await uploadImage(c__) : /gif/g.test(b__) && (d__ = e__);
        } catch (e) {
          m.react(eror);
        }
        let mis = `https://some-random-api.com/canvas/misc/${one}?avatar=${d__}`;
        return conn.sendButtonImg(m.chat, mis, wm, "Nih.jpg", "Sticker", ".s", fakes, adReply);
      case "overlay":
        let a___ = m.quoted ? m.quoted : m,
          b___ = (a___.msg || a___).mimetype || "";
        if (!b___) throw "No media found";
        let d___, c___ = await a___.download(),
          e___ = new Sticker(c___, {
            pack: packname,
            author: author,
            type: StickerTypes.FULL
          });
        try {
          /webp/g.test(b___) ? d___ = await webp2png(c___) : /image/g.test(b___) ? d___ = await uploadImage(c___) : (/video/g.test(b___) || /viewOnce/g.test(b___)) && (d___ = await uploadFile(c___)), "string" != typeof d___ ? d___ = await uploadImage(c___) : /gif/g.test(b___) && (d___ = e___);
        } catch (e) {
          m.react(eror);
        }
        let ove = `https://some-random-api.com/canvas/overlay/${one}?avatar=${d___}`;
        return conn.sendButtonImg(m.chat, ove, wm, "Nih.jpg", "Sticker", ".s", fakes, adReply);
    }
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["some <command> <teks>"], handler.tags = ["tools"], handler.command = /^some$/i;
export default handler;