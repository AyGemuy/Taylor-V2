import { generateWAMessageFromContent } from "@whiskeysockets/baileys";
import moment from "moment-timezone";
const handler = async (m, { conn, groupMetadata, usedPrefix: _p, command }) => {
  m.react(wait);
  [
    "aku-ngakak",
    "anjay",
    "ara-ara2",
    "ara-ara-cowok",
    "ara-ara",
    "arigatou",
    "assalamualaikum",
    "asu",
    "ayank",
    "bacot",
    "bahagia-aku",
    "baka",
    "bansos",
    "beat-box2",
    "beat-box",
    "biasalah",
    "bidadari",
    "bot",
    "buka-pintu",
    "canda-anjing",
    "cepetan",
    "china",
    "cuekin-terus",
    "daisuki-dayo",
    "daisuki",
    "dengan-mu",
    "Donasiku",
    "gaboleh-gitu",
    "gak-lucu",
    "gamau",
    "gay",
    "gelay",
    "gitar",
    "gomenasai",
    "hai-bot",
    "hampa",
    "hayo",
    "hp-iphone",
    "ih-wibu",
    "i-like-you",
    "india",
    "karna-lo-wibu",
    "kiss",
    "kontol",
    "ku-coba",
    "maju-wibu",
    "makasih",
    "mastah",
    "menuasli",
    "menuku",
    "menu",
    "MenuYuki",
    "nande-nande",
    "nani",
    "ngadi-ngadi",
    "nikah",
    "nuina",
    "onichan",
    "ownerku",
    "owner-sange",
    "pak-sapardi",
    "pale",
    "pantek",
    "pasi-pasi",
    "punten",
    "sayang",
    "siapa-sih",
    "sudah-biasa",
    "summertime",
    "tanya-bapak-lu",
    "to-the-bone",
    "wajib",
    "waku",
    "woi",
    "yamete",
    "yowaimo",
    "yoyowaimo",
  ].getRandom();
  const caption = `${m.name || ""} - @${m.sender.split("@")[0]} ${ucapan}\n*\`🌟 Selamat datang di dashboard bot pertama kami\`*!\n\n> ────────────────\n- 1. Kami harap Anda menikmati pengalaman pertama berinteraksi dengan chatbot kami yang ramah dan intuitif. ${readMore}\n\n- 2. Kami telah menyertakan berbagai fitur untuk membantu Anda mengelola dan meningkatkan kinerja bot Anda.\n\n- 3. Semoga Anda menikmati menggunakan dashboard chatbot kami dan mendapatkan manfaat dari fitur-fitur yang kami tawarkan.\n> ────────────────\n\n\n         *\`[ LIST MENU ]\`*\n- ${_p}menulist\n- ${_p}allmenu\n`;
  db.data.dbbot.temamenu = db.data.dbbot.temamenu || {
    id: 0,
  };
  const { id } = db.data.dbbot.temamenu;
  switch (id) {
    case 0:
      await conn.sendButtonCta(
        m.chat,
        [
          [
            caption,
            wm,
            logo,
            [["Menu List", _p + "menulist"]],
            null,
            [["Official Group", sgc]],
            null,
            m,
          ],
        ],
        {
          contextInfo: {
            mentionedJid: [m.sender],
          },
        },
      );
      break;
    case 1:
      await conn.reply(m.chat, caption, m, {
        contextInfo: {
          mentionedJid: [m.sender],
        },
      });
      break;
    case 2:
      await conn.reply(m.chat, caption, m, {
        contextInfo: {
          mentionedJid: [m.sender],
          thumbnail: await conn.resize([logo, imagebot].getRandom(), 300, 150),
        },
      });
      break;
    case 3:
      await conn.reply(m.chat, caption, m, {
        contextInfo: {
          mentionedJid: [m.sender],
          body: bottime,
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: true,
          thumbnailUrl: [logo, imagebot].getRandom(),
          sourceUrl: "",
        },
      });
      break;
    case 4:
    case 5:
    case 6:
      await conn.sendFile(
        m.chat,
        Buffer.alloc(0),
        "D A S H B O A R D",
        caption,
        fakes,
        false,
        {
          mimetype: [dpptx, ddocx, dxlsx, dpdf, drtf].getRandom(),
          fileLength: fsizedoc,
          pageCount: fpagedoc,
          jpegThumbnail: await conn.resize(
            [thumbdoc, thumb].getRandom(),
            300,
            150,
          ),
          contextInfo: {
            mentionedJid: [m.sender],
            body: id === 6 ? bottime : undefined,
            mediaType: id === 6 ? 1 : undefined,
            previewType: id === 6 ? 0 : undefined,
            renderLargerThumbnail: id === 6 ? true : undefined,
            thumbnailUrl: id === 6 ? [logo, imagebot].getRandom() : undefined,
            sourceUrl: "",
          },
        },
      );
      break;
    case 7:
      await conn.relayMessage(
        m.chat,
        {
          requestPaymentMessage: {
            currencyCodeIso4217: "INR",
            amount1000: fsizedoc,
            requestFrom: "0@s.whatsapp.net",
            noteMessage: {
              extendedTextMessage: {
                text: caption,
                contextInfo: {
                  mentionedJid: [m.sender],
                },
              },
            },
          },
        },
        {},
      );
      break;
    case 8:
      await conn.sendMessage(
        m.chat,
        {
          video: {
            url: giflogo,
          },
          caption: caption,
          gifPlayback: true,
          gifAttribution: Math.floor(Math.random() * 2) + 1,
        },
        {
          quoted: m,
        },
      );
      break;
    case 9:
    case 10:
      {
        const btn = conn.ctaButton
          .setBody(caption)
          .setFooter(author)
          .setDocument(Buffer.alloc(0), {
            mimetype: [dpptx, ddocx, dxlsx, dpdf, drtf].getRandom(),
            fileName: ucapan + m.name,
            fileLength: fsizedoc,
            pageCount: fpagedoc,
            ...(id === 9 && {
              jpegThumbnail: await conn.resize(thumbdoc, 300, 150),
            }),
          })
          .addReply("Menu List", _p + "menulist")
          .addUrl("Official Group", sgc)
          .contextInfo({
            ...[adReply.contextInfo, adReplyS.contextInfo].getRandom(),
            mentionedJid: [m.sender],
          });
        await btn.run(m.chat, conn, m);
      }
      break;
    case 11:
      {
        const btn = conn.ctaButton
          .setBody(caption)
          .setFooter(author)
          .addReply("Menu List", _p + "menulist")
          .addUrl("Official Group", sgc)
          .contextInfo({
            ...[adReply.contextInfo, adReplyS.contextInfo].getRandom(),
            mentionedJid: [m.sender],
          });
        await btn.run(m.chat, conn, m);
      }
      break;
    case 12:
      {
        const btn = conn.ctaButton
          .setBody(caption)
          .setFooter(author)
          .addReply("Menu List", _p + "menulist")
          .addUrl("Official Group", sgc)
          .contextInfo({
            ...[adReply.contextInfo, adReplyS.contextInfo].getRandom(),
            mentionedJid: [m.sender],
          });
        await btn.run(m.chat, conn, m);
      }
      break;
    default:
      db.data.dbbot.temamenu.id = 0;
  }
  m.react(sukses);
};
(handler.help = ["menu", "?"]),
  (handler.tags = ["main"]),
  (handler.exp = 3),
  (handler.register = true),
  (handler.command = /^(menu|\?)$/i);
export default handler;
const more = String.fromCharCode(8206),
  readMore = more.repeat(4001);
