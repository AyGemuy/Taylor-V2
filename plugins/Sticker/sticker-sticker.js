import fetch from "node-fetch";
import { Sticker } from "wa-sticker-formatter";
import {
  sticker,
  addExif,
  video2webp,
  video2webp30,
  video2webp45,
  video2webp60,
} from "../../lib/sticker.js";
import {
  emojiGraph,
  searchEmoji,
  emojiPedia,
} from "../../lib/scraper/scraper-search.js";
import emojiRegex from "emoji-regex";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = null;
  let img = null;
  try {
    let [packnames, ...authors] = args.join(" ").split("|");
    authors = (authors || []).join("|");
    let q = m.quoted ? m.quoted : m;
    let mime = q.mtype || "";
    const processSticker = async (_img, packnames, authors) => {
      try {
        return await addExif(
          await sticker(_img, false, packnames || packname, authors || m.name),
          packnames || packname,
          authors || m.name,
        );
      } catch (e) {
        try {
          return await _createSticker(
            _img,
            false,
            packnames || packname,
            authors || m.name,
            30,
          );
        } catch (e) {
          console.log(e);
          stiker = null;
        }
      }
    };
    switch (true) {
      case /stickerMessage|imageMessage|documentMessage|interactiveMessage|viewOnceMessageV2/g.test(
        mime,
      ):
        img = await q?.download();
        stiker = await processSticker(img, packnames, authors);
        break;
      case /videoMessage/g.test(mime):
        if ((q.msg || q).seconds > 11)
          return m.reply("⏱️ Maksimal durasi video 10 detik!");
        img = await q?.download();
        try {
          stiker = await addExif(
            await sticker(img, false, packnames || packname, authors || m.name),
            packnames || packname,
            authors || m.name,
          );
        } catch (e) {
          try {
            stiker =
              (await video2webp(img)) ||
              (await video2webp30(img)) ||
              (await video2webp45(img)) ||
              (await video2webp60(img));
          } catch (e) {
            try {
              stiker = await mp4ToWebp(img, {
                pack: packnames || packname,
                author: authors || m.name,
              });
            } catch (e) {
              console.log(e);
              stiker = null;
            }
          }
        }
        break;
      case args[0] && isUrl(args[0]):
        try {
          stiker = await addExif(
            await sticker(
              false,
              args[0],
              packnames || packname,
              authors || m.name,
            ),
            packnames || packname,
            authors || m.name,
          );
        } catch (e) {
          try {
            stiker = await _createSticker(
              false,
              args[0],
              packnames || packname,
              authors || m.name,
              30,
            );
          } catch (e) {
            console.log(e);
            stiker = null;
          }
        }
        break;
      case /extendedTextMessage/g.test(mime):
        let emj, emojiData, foundLinks;
        const text = q.text;
        const isValidUrl =
          /https?:\/\/[^\s]+?\.(jpg|jpeg|png|gif|bmp|webp|mp4|mkv|avi|mov|wmv|flv)(\?[^\s]*)?/gi;
        const firstEmoji = (text.match(emojiRegex()) || [])[0];
        if (firstEmoji) {
          try {
            emojiData = await emojiPedia(firstEmoji);
            emj = getUrlByName(emojiData, args[0] || "WhatsApp");
          } catch (e) {
            try {
              emojiData = (
                await emojiGraph(await searchEmoji(firstEmoji)[0])
              )[0]?.vendors;
              emj = getUrlByName(emojiData, args[0] || "Whatsapp");
            } catch (e) {
              console.log(e);
              stiker = null;
            }
          }
          try {
            stiker = await addExif(
              await sticker(
                false,
                emj,
                packnames || packname,
                authors || m.name,
              ),
              packnames || packname,
              authors || m.name,
            );
          } catch (e) {
            try {
              stiker = await _createSticker(
                false,
                emj,
                packnames || packname,
                authors || m.name,
                30,
              );
            } catch (e) {
              console.log(e);
              stiker = null;
            }
          }
        } else {
          if (
            ((foundLinks = text.match(/^(https?):\/\/[^\s/$.?#].[^\s]*$/i)),
            !(foundLinks && foundLinks.length > 0))
          ) {
            const thumbnailUrl =
              (await m.getQuotedObj())?.message[q.mtype]?.contextInfo
                ?.externalAdReply?.thumbnailUrl ||
              (await m.getQuotedObj())?.message[q.mtype]?.contextInfo
                ?.externalAdReply?.thumbnail;
            if (thumbnailUrl) {
              try {
                stiker = await addExif(
                  await sticker(
                    false,
                    thumbnailUrl,
                    packnames || packname,
                    authors || m.name,
                  ),
                  packnames || packname,
                  authors || m.name,
                );
              } catch (e) {
                try {
                  stiker = await _createSticker(
                    false,
                    thumbnailUrl,
                    packnames || packname,
                    authors || m.name,
                    30,
                  );
                } catch (e) {
                  console.log(e);
                  stiker = null;
                }
              }
            } else if (thumbnail) {
              try {
                stiker = await addExif(
                  await sticker(
                    thumbnail,
                    false,
                    packnames || packname,
                    authors || m.name,
                  ),
                  packnames || packname,
                  authors || m.name,
                );
              } catch (e) {
                try {
                  stiker = await _createSticker(
                    thumbnail,
                    false,
                    packnames || packname,
                    authors || m.name,
                    30,
                  );
                } catch (e) {
                  console.log(e);
                  stiker = null;
                }
              }
            } else {
              return m.reply(
                `🔍 Tidak ada emoji, link, atau thumbnail ditemukan!\nAtau\nBalas gambar/video/stiker/teks menggunakan perintah ${usedPrefix + command}`,
              );
            }
          } else {
            for (let i = 0; i < foundLinks.length; i++) {
              emj = foundLinks[i];
              try {
                stiker = await addExif(
                  await sticker(
                    false,
                    emj,
                    packnames || packname,
                    authors || m.name,
                  ),
                  packnames || packname,
                  authors || m.name,
                );
              } catch (e) {
                try {
                  stiker = await _createSticker(
                    false,
                    emj,
                    packnames || packname,
                    authors || m.name,
                    30,
                  );
                } catch (e) {
                  console.log(e);
                  stiker = null;
                }
              }
            }
          }
        }
        break;
      default:
        return m.reply(
          `🔍 Tidak ada emoji atau link ditemukan!\nAtau\nBalas gambar/video/stiker/teks menggunakan perintah ${usedPrefix + command}`,
        );
    }
  } catch (e) {
    console.log(e);
    stiker = null;
  } finally {
    if (stiker) {
      m.reply(stiker);
      m.react(sukses);
    } else {
      return m.reply(
        `🔍 Tidak ada emoji atau link ditemukan!\nAtau\nBalas gambar/video/stiker/teks menggunakan perintah ${usedPrefix + command}`,
      );
    }
  }
};
handler.help = [
  "stiker (caption|reply media)",
  "stiker <url>",
  "stikergif (caption|reply media)",
  "stikergif <url>",
];
handler.tags = ["sticker"];
handler.command = /^s(ti(c?k(er(gif)?)?|c)|gif)?$/i;
export default handler;

function getUrlByName(data, query) {
  const matchedObject = data.find((item) => item.name === query);
  return matchedObject
    ? matchedObject.image
    : data.length > 0
      ? data[Math.floor(Math.random() * data.length)].image
      : null;
}
const isUrl = (text) =>
  text.match(
    /https?:\/\/[^\s]+?\.(jpg|jpeg|png|gif|bmp|webp|mp4|mkv|avi|mov|wmv|flv)(\?[^\s]*)?/gi,
  );
async function _createSticker(img, url, packName, authorName, quality = 30) {
  try {
    return new Sticker(img || url, {
      type: "full",
      pack: packName,
      author: authorName,
      quality: quality,
    }).toBuffer();
  } catch (error) {
    console.error("Error:", error);
  }
}
async function mp4ToWebp(file, stickerMetadata) {
  try {
    stickerMetadata = stickerMetadata || {
      pack: "‎",
      author: "‎",
      crop: false,
    };
    const Format = {
      file: `data:video/mp4;base64,${file.toString("base64")}`,
      processOptions: {
        crop: stickerMetadata.crop,
        startTime: "00:00:00.0",
        endTime: "00:00:07.0",
        loop: 0,
      },
      stickerMetadata: {
        ...stickerMetadata,
      },
      sessionInfo: {
        WA_VERSION: "2.2106.5",
        PAGE_UA:
          "WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36",
        WA_AUTOMATE_VERSION: "3.6.10 UPDATE AVAILABLE: 3.6.11",
        BROWSER_VERSION: "HeadlessChrome/88.0.4324.190",
        OS: "Windows Server 2016",
        START_TS: 1614310321595,
      },
    };
    return new Sticker(file, {
      type: "full",
      pack: stickerMetadata.pack,
      author: stickerMetadata.author,
      quality: Format.stickerMetadata?.quality || 30,
    }).toBuffer();
  } catch (e) {
    console.error("Error:", e);
  }
}
