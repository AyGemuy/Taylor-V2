import {
  generateWAMessageFromContent
} from "@whiskeysockets/baileys";
import moment from "moment-timezone";
const handler = async (m, {
  conn,
  groupMetadata,
  usedPrefix: _p,
  command
}) => {
  m.react(wait);
  ["aku-ngakak", "anjay", "ara-ara2", "ara-ara-cowok", "ara-ara", "arigatou", "assalamualaikum", "asu", "ayank", "bacot", "bahagia-aku", "baka", "bansos", "beat-box2", "beat-box", "biasalah", "bidadari", "bot", "buka-pintu", "canda-anjing", "cepetan", "china", "cuekin-terus", "daisuki-dayo", "daisuki", "dengan-mu", "Donasiku", "gaboleh-gitu", "gak-lucu", "gamau", "gay", "gelay", "gitar", "gomenasai", "hai-bot", "hampa", "hayo", "hp-iphone", "ih-wibu", "i-like-you", "india", "karna-lo-wibu", "kiss", "kontol", "ku-coba", "maju-wibu", "makasih", "mastah", "menuasli", "menuku", "menu", "MenuYuki", "nande-nande", "nani", "ngadi-ngadi", "nikah", "nuina", "onichan", "ownerku", "owner-sange", "pak-sapardi", "pale", "pantek", "pasi-pasi", "punten", "sayang", "siapa-sih", "sudah-biasa", "summertime", "tanya-bapak-lu", "to-the-bone", "wajib", "waku", "woi", "yamete", "yowaimo", "yoyowaimo"].getRandom();
  const caption = `${m.name || ""} - @${m.sender.split("@")[0]} ${ucapan()}\n*\`🌟 Selamat datang di dashboard bot pertama kami\`*!\n\n> ────────────────\n- 1. Kami harap Anda menikmati pengalaman pertama berinteraksi dengan chatbot kami yang ramah dan intuitif. ${readMore}\n\n- 2. Kami telah menyertakan berbagai fitur untuk membantu Anda mengelola dan meningkatkan kinerja bot Anda.\n\n- 3. Semoga Anda menikmati menggunakan dashboard chatbot kami dan mendapatkan manfaat dari fitur-fitur yang kami tawarkan.\n> ────────────────\n\n\n         *\`[ LIST MENU ]\`*\n- ${_p}menulist\n- ${_p}allmenu\n`;
  conn.temamenu = conn.temamenu ? conn.temamenu : {
    id: 0
  };
  if (conn.temamenu.id === 0) {
    await conn.sendButtonCta(m.chat, [
      [caption, wm, logo, [
        ["Menu List", _p + "menulist"]
      ], null, [
        ["Official Group", sgc]
      ], null]
    ], m, {
      contextInfo: {
        mentionedJid: [m.sender]
      }
    });
  }
  if (conn.temamenu.id === 1) {
    await conn.reply(m.chat, caption, m, {
      contextInfo: {
        mentionedJid: [m.sender]
      }
    });
  } else if (conn.temamenu.id === 2) {
    await conn.reply(m.chat, caption, m, {
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: ucapan() + " " + m.name,
          thumbnail: await conn.resize([logo, imagebot].getRandom(), 300, 150)
        }
      }
    });
  } else if (conn.temamenu.id === 3) {
    await conn.reply(m.chat, caption, m, {
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: ucapan() + " " + m.name,
          body: bottime,
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: true,
          thumbnailUrl: [logo, imagebot].getRandom(),
          sourceUrl: ""
        }
      }
    });
  } else if (conn.temamenu.id === 4) {
    await conn.sendFile(m.chat, Buffer.alloc(0), "D A S H B O A R D", caption, fakes, false, {
      mimetype: [dpptx, ddocx, dxlsx, dpdf, drtf].getRandom(),
      fileLength: fsizedoc,
      pageCount: fpagedoc,
      jpegThumbnail: await conn.resize([thumbdoc, thumb].getRandom(), 300, 150),
      contextInfo: {
        mentionedJid: [m.sender]
      }
    });
  } else if (conn.temamenu.id === 5) {
    await conn.sendFile(m.chat, Buffer.alloc(0), "D A S H B O A R D", caption, fakes, false, {
      mimetype: [dpptx, ddocx, dxlsx, dpdf, drtf].getRandom(),
      fileLength: fsizedoc,
      pageCount: fpagedoc,
      jpegThumbnail: await conn.resize([thumbdoc, thumb].getRandom(), 300, 150),
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: ucapan() + " " + m.name,
          thumbnail: await conn.resize([logo, imagebot].getRandom(), 300, 150)
        }
      }
    });
  } else if (conn.temamenu.id === 6) {
    await conn.sendFile(m.chat, Buffer.alloc(0), "D A S H B O A R D", caption, fakes, false, {
      mimetype: [dpptx, ddocx, dxlsx, dpdf, drtf].getRandom(),
      fileLength: fsizedoc,
      pageCount: fpagedoc,
      jpegThumbnail: await conn.resize([thumbdoc, thumb].getRandom(), 300, 150),
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: ucapan() + " " + m.name,
          body: bottime,
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: true,
          thumbnailUrl: [logo, imagebot].getRandom(),
          sourceUrl: ""
        }
      }
    });
  } else if (conn.temamenu.id === 7) {
    await conn.relayMessage(m.chat, {
      requestPaymentMessage: {
        currencyCodeIso4217: "INR",
        amount1000: fsizedoc,
        requestFrom: "0@s.whatsapp.net",
        noteMessage: {
          extendedTextMessage: {
            text: caption,
            contextInfo: {
              mentionedJid: [m.sender],
              externalAdReply: {
                showAdAttribution: true
              }
            }
          }
        }
      }
    }, {});
  } else if (conn.temamenu.id === 8) {
    await conn.sendMessage(m.chat, {
      video: {
        url: giflogo
      },
      caption: caption,
      gifPlayback: true,
      gifAttribution: Math.floor(Math.random() * 2) + 1
    }, {
      quoted: m
    });
  } else if (conn.temamenu.id === null || conn.temamenu.id > 8) {
    conn.temamenu.id = 0;
  }
  m.react(sukses);
};
handler.help = ["menu", "?"], handler.tags = ["main"], handler.exp = 3, handler.register = true,
  handler.command = /^(menu|\?)$/i;
export default handler;
const more = String.fromCharCode(8206),
  readMore = more.repeat(4001);

function ucapan() {
  let waktunya = moment.tz("Asia/Makassar").format("HH");
  return waktunya >= 24 ? "Selamat Begadang 🗿" : waktunya >= 18 ? "Selamat malam 🌙" : waktunya >= 15 ? "Selamat sore 🌅" : waktunya > 10 ? "Selamat siang ☀️" : waktunya >= 4 ? "Selamat pagi 🌄" : "Selamat Pagi 🗿";
}