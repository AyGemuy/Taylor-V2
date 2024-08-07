import path from "path";
import {
  imageToWebp,
  videoToWebp,
  toAudio,
  toAudio8k,
  webp2mp4File
} from "./converter.js";
import {
  sticker as mediaToSticker
} from "./sticker.js";
import {
  webp2mp4,
  webp2png
} from "./webp2mp4.js";
import chalk from "chalk";
import fetch from "node-fetch";
import axios from "axios";
import {
  request as undiciFetch
} from "undici";
import got from "got";
import userAgent from "fake-useragent";
import os from "os";
import PhoneNumber from "awesome-phonenumber";
import fs from "fs";
import util from "util";
import _ from "lodash";
import {
  fileTypeFromBuffer
} from "file-type";
import {
  format
} from "util";
import {
  fileURLToPath
} from "url";
import translate from "@vitalets/google-translate-api";
import Jimp from "jimp";
import Helper from "./helper.js";
import {
  writeExifImg,
  writeExifVid,
  writeExifWebp
} from "./exif.js";
import {
  default as Pino
} from "pino";
import {
  default as PinoPretty
} from "pino-pretty";
import moment from "moment-timezone";
moment.locale("id");
const stream = PinoPretty({
  colorize: true,
  levelFirst: false,
  messageKey: "msg",
  timestampKey: "time",
  translateTime: "dd-mmmm-yyyy hh:MM TT",
  ignore: "pid,hostname",
  customColors: "info:bgBlueBright,error:bgRedBright,fatal:bgRedBright,warn:bgYellowBright,debug:bgGreenBright,trace:bgCyanBright",
  messageFormat: "{msg}\n⤵️\n",
  customPrettifiers: {
    payload: value => format(value, {
      depth: null,
      breakLength: 4,
      colors: true
    })
  }
});
const logger = Pino({
  level: "fatal",
  serializers: {
    err: Pino.stdSerializers?.err
  }
}, stream);
import {
  FancyText,
  FancyTextV2
} from "./fancy-text.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const {
  default: _makeWaSocket,
  makeInMemoryStore,
  makeWALegacySocket,
  generateWAMessage,
  areJidsSameUser,
  proto,
  downloadContentFromMessage,
  generateWAMessageFromContent,
  generateWAMessageContent,
  delay,
  generateForwardMessageContent,
  WAMessageStubType,
  extractMessageContent,
  jidDecode,
  toBuffer,
  prepareWAMessageMedia,
  getDevice,
  getAudioDuration,
  getAudioWaveform
} = await (await import("@whiskeysockets/baileys")).default;
export function makeWASocket(connectionOptions, options = {}) {
  let conn = (opts["legacy"] ? makeWALegacySocket : _makeWaSocket)(connectionOptions);
  let sock = Object.defineProperties(conn, {
    chats: {
      value: {
        ...options.chats || {}
      },
      writable: true
    },
    decodeJid: {
      value(jid) {
        if (!jid || typeof jid !== "string") return !nullish(jid) && jid || null;
        return jid.decodeJid();
      }
    },
    logger: {
      get() {
        return {
          info(...args) {
            logger.info(format(...args));
          },
          error(...args) {
            logger.error(format(...args));
          },
          warn(...args) {
            logger.warn(format(...args));
          },
          trace(...args) {
            logger.trace(format(...args));
          },
          debug(...args) {
            logger.debug(format(...args));
          }
        };
      },
      enumerable: true
    },
    getFile: {
      async value(PATH, saveToFile = false) {
        try {
          let res, filename;
          const isBuffer = Buffer.isBuffer(PATH);
          const isArrayBuffer = PATH instanceof ArrayBuffer;
          const data = isBuffer ? PATH : isArrayBuffer ? Buffer.from(PATH) : Helper.isReadableStream(PATH) ? await stream2buffer(PATH) : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split(",")?.[1], "base64") : /^https?:\/\//.test(PATH) && await isTextContent(PATH) ? await (res = await getDataBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : fs.readFileSync("./images/error.jpg") || Buffer.alloc(0);
          if (Buffer.byteLength(data) > 2e9) {
            throw new TypeError("Canceled process... WhatsApp 2GB File Sharing Limit exceeds");
          }
          const type = await fileTypeFromBuffer(data) || {
            mime: "application/octet-stream",
            ext: "bin"
          };
          if (data && saveToFile && !filename) {
            filename = path.join(__dirname, "../tmp/" + new Date() * 1 + "." + type.ext);
            await fs.promises.writeFile(filename, data);
          }
          return {
            res: res,
            filename: filename,
            ...type,
            data: data,
            deleteFile() {
              return filename && fs.promises.unlink(filename);
            }
          };
        } catch (error) {
          console.error("Error in 'getFile' function:", error);
          return {
            res: null,
            filename: null,
            mime: "application/octet-stream",
            ext: "bin",
            data: Buffer.alloc(0),
            deleteFile() {
              return Promise.resolve();
            }
          };
        }
      },
      enumerable: true
    },
    waitEvent: {
      value(eventName, is = () => true, maxTries = 25) {
        return new Promise((resolve, reject) => {
          let tries = 0;
          let on = (...args) => {
            if (++tries > maxTries) reject("Max tries reached");
            else if (is()) {
              conn.ev.off(eventName, on);
              resolve(...args);
            }
          };
          conn.ev.on(eventName, on);
        });
      }
    },
    sendMsg: {
      async value(jid, message = {}, options = {}) {
        return await conn.sendMessage(jid, message, {
          ...options,
          backgroundColor: "",
          ephemeralExpiration: 86400
        });
      },
      enumerable: true,
      writable: true
    },
    sendFile: {
      async value(jid, path, filename = "", caption = "", quoted, ptt = false, options = {}) {
        try {
          let text = caption;
          let {
            res,
            data: file,
            filename: pathFile,
            mime
          } = await conn.getFile(path, true);
          const fileSize = fs.statSync(pathFile).size / (1024 * 1024);
          if (fileSize >= 2e3) throw new Error("File size is too big!");
          let opt = quoted ? {
            quoted: quoted
          } : {};
          let mtype, mimetype = options.mimetype || mime;
          let buffer, bufferAudio, seconds, waveform;
          if (mime.match(/^image\/webp/i)) {
            buffer = options.asImage ? await webp2png(file) : options.asVideo ? await webp2mp4(file) || await webp2mp4File(file) : await writeExifWebp(file, options.packname && options.author ? {
              packname: options.packname,
              author: options.author
            } : options);
            file = buffer || file;
            mtype = options.asImage ? "image" : options.asVideo ? "video" : "sticker";
            mimetype = options.asImage ? "image/png" : options.asVideo ? "video/mp4" : options.mimetype || mime;
          } else if (mime.match(/^image\//i)) {
            buffer = options.asSticker && (await mediaToSticker(file) || await imageToWebp(file)) || (options.packname || options.author) && await writeExifImg(await mediaToSticker(file) || await imageToWebp(file), options);
            file = buffer || file;
            mtype = buffer ? "sticker" : mime.match(/^image\/gif/i) ? "doument" : "image";
            mimetype = buffer ? "image/webp" : options.mimetype || (mime.match(/^image\/gif/i) ? "doument" : mime);
          } else if (mime.match(/^video\//i)) {
            bufferAudio = options.as8k ? await toAudio8k(file, mime.ext) : options.asAudio ? await toAudio(file, mime.ext) : null;
            if (bufferAudio) {
              file = bufferAudio.data || file;
              pathFile = bufferAudio.filename;
              mtype = "audio";
              mimetype = options.mimetype || "audio/aac" || "audio/ogg; codecs=opus";
              ptt = false;
              seconds = Math.floor(await getAudioDuration(file)) || 45296e3;
              waveform = await getAudioWaveform(file) || [100, 0, 100, 0, 100];
            } else {
              buffer = options.asSticker && (await mediaToSticker(file) || await videoToWebp(file)) || (options.packname || options.author) && await writeExifVid(await mediaToSticker(file) || await videoToWebp(file), options);
              file = buffer || file;
              mtype = buffer ? "sticker" : "video";
              mimetype = buffer ? "image/webp" : options.mimetype || mime;
            }
          } else if (mime.match(/^audio\//i)) {
            buffer = options.as8k ? await toAudio8k(file, mime.ext) : await toAudio(file, mime.ext);
            file = buffer.data;
            pathFile = buffer.filename;
            mtype = "audio";
            ptt = false;
            mimetype = options.mimetype || "audio/aac" || "audio/ogg; codecs=opus";
            seconds = Math.floor(await getAudioDuration(buffer.data)) || 45296e3;
            waveform = await getAudioWaveform(buffer.data) || [100, 0, 100, 0, 100];
          } else {
            mtype = "document";
            mimetype = options.mimetype || mime;
          }
          mtype = options.asDocument ? "document" : options.asLocation ? "location" : options.asPtv ? "ptvMessage" : mtype;
          if (options.asPtv) {
            let {
              videoMessage
            } = await generateWAMessageContent({
              video: file
            }, {
              upload: conn.waUploadToServer
            });
            file = videoMessage;
          }
          delete options.asSticker;
          delete options.asLocation;
          delete options.asVideo;
          delete options.asDocument;
          delete options.asImage;
          delete options.asPtv;
          delete options.as8k;
          const message = {
            ...mergeContext(conn, text, options),
            caption: conn.temafont && !isNaN(parseInt(conn.temafont)) ? await generateFont(text, parseInt(conn.temafont)) : text,
            ptt: ptt,
            seconds: seconds,
            waveform: waveform,
            [mtype]: {
              url: pathFile
            },
            mimetype: ptt ? "audio/acc" : mimetype,
            fileName: filename || pathFile.split("/").pop()
          };
          let m;
          try {
            if (options.asPtv) {
              m = await conn.relayMessage(jid, {
                [mtype]: file
              }, {
                ...opt,
                ...mergeContext(conn, text, options)
              });
            } else {
              m = await conn.sendMessage(jid, message, {
                ...opt,
                ...mergeContext(conn, text, options)
              });
            }
          } catch (e) {
            console.error(e);
            m = null;
          } finally {
            if (!m) {
              m = await conn.sendMessage(jid, {
                ...message,
                [mtype]: file
              }, {
                ...opt,
                ...mergeContext(conn, text, options)
              });
            }
            file = null;
            return m;
          }
        } catch (error) {
          console.error("Error sending file:", error);
        }
      },
      enumerable: true
    },
    sendContact: {
      async value(jid, data, quoted, options) {
        if (!Array.isArray(data?.[0]) && typeof data?.[0] === "string") data = [data];
        let contacts = [];
        for (let [number, name] of data) {
          number = number.replace(/[^0-9]/g, "");
          let njid = number + "@s.whatsapp.net";
          let biz = await conn.getBusinessProfile(njid).catch(_ => null) || {};
          let vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${name.replace(/\n/g, "\\n")}
ORG:
item1.TEL;waid=${number}:${(await PhoneNumber("+" + number)).getNumber("international")}
item1.X-ABLabel:Ponsel
${biz.description ? `
item2.EMAIL;type=INTERNET:${(biz.email || "").replace(/\n/g, "\\n")}
item2.X-ABLabel:Email
PHOTO;BASE64:${(await conn.getFile(await conn.profilePictureUrl(njid))).data.toString("base64") || ""}
` : ""}
X-WA-BIZ-DESCRIPTION:${(biz.description || "").replace(/\n/g, "\\n")}
X-WA-BIZ-NAME:${name.replace(/\n/g, "\\n")}
END:VCARD
`.trim();
          contacts.push({
            vcard: vcard,
            displayName: name
          });
        }
        await conn.sendMessage(jid, {
          ...options,
          contacts: {
            ...options,
            displayName: (contacts.length >= 2 ? `${contacts.length || 0} kontak` : contacts?.[0]?.displayName) || null,
            contacts: contacts
          }
        }, {
          quoted: quoted,
          ...mergeContext(conn, text, options)
        });
      },
      enumerable: true
    },
    sendKontak: {
      async value(jid, data, quoted, options) {
        if (!Array.isArray(data?.[0]) && typeof data?.[0] === "string") data = [data];
        let contacts = [];
        for (let [number, nama, ponsel, email] of data) {
          number = number.replace(/[^0-9]/g, "");
          let njid = number + "@s.whatsapp.net";
          let name = db.data.users[njid] ? db.data.users[njid]?.name : conn.getName(njid);
          let biz = await conn.getBusinessProfile(njid).catch(_ => null) || {};
          let vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${name.replace(/\n/g, "\\n")}
ORG:
item1.TEL;waid=${number}:${PhoneNumber("+" + number).getNumber("international")}
item1.X-ABLabel:📌 ${ponsel}
item2.EMAIL;type=INTERNET:${email}
item2.X-ABLabel:✉️ Email
X-WA-BIZ-DESCRIPTION:${(biz.description || "").replace(/\n/g, "\\n")}
X-WA-BIZ-NAME:${name.replace(/\n/g, "\\n")}
END:VCARD
`.trim();
          contacts.push({
            vcard: vcard,
            displayName: name
          });
        }
        await conn.sendMessage(jid, {
          contacts: {
            ...options,
            displayName: (contacts.length >= 2 ? `${contacts.length || 0} kontak` : contacts?.[0]?.displayName) || null,
            contacts: contacts
          }
        }, {
          quoted: quoted,
          ...options,
          ephemeralExpiration: ephemeral
        });
      }
    },
    sendContactArray: {
      async value(jid, data, quoted, options) {
        if (!Array.isArray(data?.[0]) && typeof data?.[0] === "string") data = [data];
        let contacts = [];
        for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5] of data) {
          number = number.replace(/[^0-9]/g, "");
          let njid = number + "@s.whatsapp.net";
          let biz = await conn.getBusinessProfile(njid).catch(_ => null) || {};
          let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, "\\n")}
item.ORG:${isi}
item1.TEL;waid=${number}:${PhoneNumber("+" + number).getNumber("international")}
item1.X-ABLabel:${isi1}
item2.EMAIL;type=INTERNET:${isi2}
item2.X-ABLabel:📧 Email
item3.ADR:;;${isi3};;;;
item3.X-ABADR:ac
item3.X-ABLabel:📍 Region
item4.URL:${isi4}
item4.X-ABLabel:Website
item5.X-ABLabel:${isi5}
END:VCARD`.trim();
          contacts.push({
            vcard: vcard,
            displayName: name
          });
        }
        await conn.sendMessage(jid, {
          ...options,
          contacts: {
            ...options,
            displayName: (contacts.length >= 2 ? `${contacts.length || 0} kontak` : contacts?.[0]?.displayName) || null,
            contacts: contacts
          }
        }, {
          quoted: quoted,
          ...options
        });
      }
    },
    sendMedia: {
      async value(jid, path, quoted, options = {}) {
        let {
          ext,
          mime,
          data
        } = await conn.getFile(path);
        let messageType = mime.split("/")?.[0];
        let pase = messageType.replace("application", "document") || messageType;
        await conn.sendMessage(jid, {
          [`${pase}`]: data,
          mimetype: mime,
          ...mergeContext(conn, text, options)
        }, {
          quoted: quoted
        });
      }
    },
    sendListM: {
      async value(jid, button, rows, quoted, options = {}) {
        const sections = [{
          title: button.title,
          rows: [...rows]
        }];
        const listMessage = {
          text: button.description,
          footer: button.footerText,
          mentions: conn.parseMention(button.description),
          ephemeralExpiration: ephemeral,
          title: "",
          buttonText: button.buttonText,
          sections: sections
        };
        await conn.sendLists(jid, sections.title, listMessage.text, listMessage.footer, null, listMessage.buttonText, listMessage.sections, quoted, {
          ...options
        });
      }
    },
    appenTextMessage: {
      async value(_msg, text, chatUpdate) {
        let messages = await generateWAMessage(_msg.chat, {
          text: text,
          mentions: _msg.mentionedJid || [_msg.sender]
        }, {
          userJid: conn.user?.jid || conn.user?.id,
          quoted: _msg.quoted && _msg.quoted?.fakeObj
        });
        messages.key.fromMe = areJidsSameUser(_msg.sender, conn.user?.jid || conn.user?.id);
        messages.key.id = _msg.key.id;
        messages.pushName = _msg.pushName || _msg.name;
        if (_msg.isGroup) messages.participant = _msg.sender || _msg.key.remoteJid || _msg.chat;
        let msg = {
          ...chatUpdate,
          messages: [proto.WebMessageInfo.fromObject(messages)],
          type: "append"
        };
        conn.ev.emit("messages.upsert", msg);
      }
    },
    resize: {
      async value(image, width, height) {
        const imageTo = await Jimp.read(image);
        const imageOut = await imageTo.resize(width, height).getBufferAsync(Jimp.MIME_JPEG);
        return imageOut;
      }
    },
    generateProfilePicture: {
      async value(buffer) {
        const jimp_1 = await Jimp.read(buffer);
        const resz = jimp_1.getWidth() > jimp_1.getHeight() ? jimp_1.resize(550, Jimp.AUTO) : jimp_1.resize(Jimp.AUTO, 650);
        const jimp_2 = await Jimp.read(await resz.getBufferAsync(Jimp.MIME_JPEG));
        return {
          img: await resz.getBufferAsync(Jimp.MIME_JPEG)
        };
      }
    },
    sendButtonGif: {
      async value(jid, text = "", footer = "", gif, but = [], buff, options = {}) {
        let file = await conn.resize(buff, 300, 150);
        let a = [1, 2];
        let b = a[Math.floor(Math.random() * a.length)];
        conn.sendMessage(jid, {
          video: gif,
          gifPlayback: true,
          gifAttribution: b,
          caption: conn.temafont && !isNaN(parseInt(conn.temafont)) ? await generateFont(text, parseInt(conn.temafont)) : text,
          footer: footer,
          jpegThumbnail: file,
          templateButtons: but,
          ...mergeContext(conn, text, options)
        });
      }
    },
    sendPayment: {
      async value(jid, amount, currency, text = "", from, image, options) {
        let file = await conn.resize(image, 300, 150);
        let a = ["IDR", "RSD", "USD"];
        let b = a[Math.floor(Math.random() * a.length)];
        const requestPaymentMessage = {
          amount: {
            currencyCode: currency || b,
            offset: 0,
            value: amount || 9.99
          },
          expiryTimestamp: 0,
          amount1000: (amount || 9.99) * 1e3,
          currencyCodeIso4217: currency || b,
          requestFrom: from || "0@s.whatsapp.net",
          noteMessage: {
            extendedTextMessage: {
              text: conn.temafont && !isNaN(parseInt(conn.temafont)) ? await generateFont(text, parseInt(conn.temafont)) : text || "Example Payment Message"
            }
          },
          background: !!image ? file : undefined
        };
        await conn.relayMessage(jid, {
          requestPaymentMessage: requestPaymentMessage
        }, {
          ...mergeContext(conn, text, options)
        });
      }
    },
    sendReact: {
      async value(jid, Emoji = "", key) {
        await conn.sendMessage(jid, {
          react: {
            text: Emoji,
            key: key
          }
        });
      }
    },
    sendButtonCta: {
      async value(jid, messages, quoted, options) {
        messages.length > 1 ? await conn.sendCarousel(jid, messages, quoted, options) : await conn.sendNCarousel(jid, ...messages?.[0], quoted, options);
      }
    },
    sendNCarousel: {
      async value(jid, text = "", footer = "", buffer = null, buttons = [], copy = null, urls = null, list = null, quoted, options) {
        let img, video;
        if (buffer) {
          if (/^https?:\/\//i.test(buffer)) {
            try {
              const response = await fetch(buffer);
              const contentType = response.headers.get("content-type");
              if (/^image\//i.test(contentType)) {
                img = await prepareWAMessageMedia({
                  image: {
                    url: buffer
                  }
                }, {
                  upload: conn.waUploadToServer,
                  ...options
                });
              } else if (/^video\//i.test(contentType)) {
                video = await prepareWAMessageMedia({
                  video: {
                    url: buffer
                  }
                }, {
                  upload: conn.waUploadToServer,
                  ...options
                });
              } else {
                console.error("Jenis MIME tidak kompatibel:", contentType);
              }
            } catch (error) {
              console.error("Gagal mendapatkan jenis MIME:", error);
            }
          } else {
            try {
              const type = await conn.getFile(buffer);
              if (/^image\//i.test(type.mime)) {
                img = await prepareWAMessageMedia({
                  image: /^https?:\/\//i.test(buffer) ? {
                    url: buffer
                  } : type && type?.data
                }, {
                  upload: conn.waUploadToServer,
                  ...options
                });
              } else if (/^video\//i.test(type.mime)) {
                video = await prepareWAMessageMedia({
                  video: /^https?:\/\//i.test(buffer) ? {
                    url: buffer
                  } : type && type?.data
                }, {
                  upload: conn.waUploadToServer,
                  ...options
                });
              }
            } catch (error) {
              console.error("Gagal mendapatkan tipe file:", error);
            }
          }
        }
        const sources = [{
          data: buttons,
          name: "quick_reply",
          getParams: btn => ({
            display_text: btn?.[0] || "",
            id: btn?.[1] || ""
          })
        }, {
          data: copy,
          name: "cta_copy",
          getParams: cpy => ({
            display_text: cpy?.[0] || "",
            copy_code: cpy?.[1] || ""
          })
        }, {
          data: urls,
          name: "cta_url",
          getParams: url => ({
            display_text: url?.[0] || "",
            url: url?.[1] || "",
            merchant_url: url?.[1] || ""
          })
        }, {
          data: list,
          name: "single_select",
          getParams: lister => ({
            title: lister?.[0] || "",
            sections: lister?.[1] || []
          })
        }];
        const dynamicButtons = _.chain(sources).filter(source => !_.isEmpty(source.data)).flatMap(({
          data,
          name,
          getParams
        }) => _.map(data, item => ({
          name: name,
          buttonParamsJson: JSON.stringify(getParams(item))
        }))).value();
        const interactiveMessage = {
          body: {
            text: text || namebot
          },
          footer: {
            text: footer || wm
          },
          header: {
            hasMediaAttachment: img?.imageMessage || video?.videoMessage ? true : false,
            imageMessage: img?.imageMessage || null,
            videoMessage: video?.videoMessage || null
          },
          nativeFlowMessage: {
            buttons: dynamicButtons.filter(Boolean),
            messageParamsJson: JSON.stringify({
              from: "api",
              templateId: Date.now()
            })
          },
          ...mergeContext(conn, text, options)
        };
        const messageContent = proto.Message.fromObject({
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2
              },
              interactiveMessage: interactiveMessage
            }
          }
        });
        const msgs = await generateWAMessageFromContent(jid, messageContent, {
          userJid: conn.user.jid,
          quoted: quoted,
          upload: conn.waUploadToServer,
          ephemeralExpiration: ephemeral
        });
        await conn.relayMessage(jid, msgs.message, {
          messageId: msgs.key.id
        });
      }
    },
    sendCarousel: {
      async value(jid, messages, quoted, options) {
        if (messages.length > 1) {
          const cards = await Promise.all(messages.map(async ([text = "", footer = "", buffer = null, buttons = [], copy = null, urls = null, list = null]) => {
            let img, video;
            if (/^https?:\/\//i.test(buffer)) {
              try {
                const response = await fetch(buffer);
                const contentType = response.headers.get("content-type");
                if (/^image\//i.test(contentType)) {
                  img = await prepareWAMessageMedia({
                    image: {
                      url: buffer
                    }
                  }, {
                    upload: conn.waUploadToServer,
                    ...options
                  });
                } else if (/^video\//i.test(contentType)) {
                  video = await prepareWAMessageMedia({
                    video: {
                      url: buffer
                    }
                  }, {
                    upload: conn.waUploadToServer,
                    ...options
                  });
                } else {
                  console.error("Jenis MIME tidak kompatibel:", contentType);
                }
              } catch (error) {
                console.error("Gagal mendapatkan jenis MIME:", error);
              }
            } else {
              try {
                const type = await conn.getFile(buffer);
                if (/^image\//i.test(type.mime)) {
                  img = await prepareWAMessageMedia({
                    image: /^https?:\/\//i.test(buffer) ? {
                      url: buffer
                    } : type && type?.data
                  }, {
                    upload: conn.waUploadToServer,
                    ...options
                  });
                } else if (/^video\//i.test(type.mime)) {
                  video = await prepareWAMessageMedia({
                    video: /^https?:\/\//i.test(buffer) ? {
                      url: buffer
                    } : type && type?.data
                  }, {
                    upload: conn.waUploadToServer,
                    ...options
                  });
                }
              } catch (error) {
                console.error("Gagal mendapatkan tipe file:", error);
              }
            }
            const sources = [{
              data: buttons,
              name: "quick_reply",
              getParams: btn => ({
                display_text: btn?.[0] || "",
                id: btn?.[1] || ""
              })
            }, {
              data: copy,
              name: "cta_copy",
              getParams: cpy => ({
                display_text: cpy?.[0] || "",
                copy_code: cpy?.[1] || ""
              })
            }, {
              data: urls,
              name: "cta_url",
              getParams: url => ({
                display_text: url?.[0] || "",
                url: url?.[1] || "",
                merchant_url: url?.[1] || ""
              })
            }, {
              data: list,
              name: "single_select",
              getParams: lister => ({
                title: lister?.[0] || "",
                sections: lister?.[1] || []
              })
            }];
            const dynamicButtons = _.chain(sources).filter(source => !_.isEmpty(source.data)).flatMap(({
              data,
              name,
              getParams
            }) => _.map(data, item => ({
              name: name,
              buttonParamsJson: JSON.stringify(getParams(item))
            }))).value();
            return {
              body: proto.Message.InteractiveMessage.Body.fromObject({
                text: text || namebot
              }),
              footer: proto.Message.InteractiveMessage.Footer.fromObject({
                text: footer || wm
              }),
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: "Carousel Message",
                subtitle: botdate,
                hasMediaAttachment: img?.imageMessage || video?.videoMessage ? true : false,
                imageMessage: img?.imageMessage || null,
                videoMessage: video?.videoMessage || null
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: dynamicButtons.filter(Boolean),
                messageParamsJson: JSON.stringify({
                  from: "api",
                  templateId: Date.now()
                })
              }),
              ...mergeContext(conn, text, options)
            };
          }));
          const interactiveMessage = proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.fromObject({
              text: namebot
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
              text: wm
            }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
              title: author,
              subtitle: botdate,
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: cards
            }),
            ...mergeContext(conn, text, options)
          });
          const messageContent = proto.Message.fromObject({
            viewOnceMessage: {
              message: {
                messageContextInfo: {
                  deviceListMetadata: {},
                  deviceListMetadataVersion: 2
                },
                interactiveMessage: interactiveMessage
              }
            }
          });
          const msgs = await generateWAMessageFromContent(jid, messageContent, {
            userJid: conn.user.jid,
            quoted: quoted,
            upload: conn.waUploadToServer,
            ephemeralExpiration: ephemeral
          });
          await conn.relayMessage(jid, msgs.message, {
            messageId: msgs.key.id
          });
        } else {
          await conn.sendNCarousel(jid, ...messages?.[0], quoted, options);
        }
      }
    },
    sendCta: {
      async value(jid, buttons, body, footer, header, subtitle, quoted, options = {}) {
        const messageContent = proto.Message.fromObject({
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2
              },
              interactiveMessage: proto.Message.InteractiveMessage.create({
                body: proto.Message.InteractiveMessage.Body.create({
                  text: body || namebot
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: footer || wm
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                  title: header || author,
                  subtitle: subtitle || botdate,
                  hasMediaAttachment: false
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                  buttons: [...buttons],
                  messageParamsJson: JSON.stringify({
                    from: "api",
                    templateId: Date.now()
                  })
                }),
                ...mergeContext(conn, text, options)
              })
            }
          }
        });
        const msgs = await generateWAMessageFromContent(jid, messageContent, {
          userJid: conn.user.jid,
          quoted: quoted,
          upload: conn.waUploadToServer,
          ephemeralExpiration: ephemeral
        });
        await conn.relayMessage(jid, msgs.message, {
          messageId: msgs.key.id
        });
      }
    },
    ctaButton: {
      get() {
        class Button {
          constructor() {
            this._title = "";
            this._subtitle = "";
            this._body = "";
            this._footer = "";
            this._buttons = [];
            this._data = null;
            this._contextInfo = {};
            this._currentSelectionIndex = -1;
            this._currentSectionIndex = -1;
          }
          setType(type) {
            this._type = type;
            return this;
          }
          setBody(body) {
            this._body = body;
            return this;
          }
          setFooter(footer) {
            this._footer = footer;
            return this;
          }
          makeRow(header = "", title = "", description = "", id = "") {
            if (this._currentSelectionIndex === -1 || this._currentSectionIndex === -1) {
              throw new Error("You need to create a selection and a section first");
            }
            const buttonParams = JSON.parse(this._buttons[this._currentSelectionIndex].buttonParamsJson);
            buttonParams.sections[this._currentSectionIndex].rows.push({
              header: header,
              title: title,
              description: description,
              id: id
            });
            this._buttons[this._currentSelectionIndex].buttonParamsJson = JSON.stringify(buttonParams);
            return this;
          }
          makeSections(title = "") {
            if (this._currentSelectionIndex === -1) {
              throw new Error("You need to create a selection first");
            }
            const buttonParams = JSON.parse(this._buttons[this._currentSelectionIndex].buttonParamsJson);
            buttonParams.sections.push({
              title: title,
              rows: []
            });
            this._currentSectionIndex = buttonParams.sections.length - 1;
            this._buttons[this._currentSelectionIndex].buttonParamsJson = JSON.stringify(buttonParams);
            return this;
          }
          addSelection(title) {
            this._buttons.push({
              name: "single_select",
              buttonParamsJson: JSON.stringify({
                title: title,
                sections: []
              })
            });
            this._currentSelectionIndex = this._buttons.length - 1;
            this._currentSectionIndex = -1;
            return this;
          }
          addReply(display_text = "", id = "") {
            this._buttons.push({
              name: "quick_reply",
              buttonParamsJson: JSON.stringify({
                display_text: display_text,
                id: id
              })
            });
            return this;
          }
          addCopy(display_text = "", id = "") {
            this._buttons.push({
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: display_text,
                copy_code: id
              })
            });
            return this;
          }
          addUrl(display_text = "", url = "") {
            this._buttons.push({
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: display_text,
                url: url,
                merchant_url: url
              })
            });
            return this;
          }
          setVideo(path, options = {}) {
            if (!path) throw new Error("URL or buffer needed");
            this._data = Buffer.isBuffer(path) ? {
              video: path,
              ...options
            } : {
              video: {
                url: path
              },
              ...options
            };
            return this;
          }
          setImage(path, options = {}) {
            if (!path) throw new Error("URL or buffer needed");
            this._data = Buffer.isBuffer(path) ? {
              image: path,
              ...options
            } : {
              image: {
                url: path
              },
              ...options
            };
            return this;
          }
          setDocument(path, options = {}) {
            if (!path) throw new Error("URL or buffer needed");
            this._data = Buffer.isBuffer(path) ? {
              document: path,
              ...options
            } : {
              document: {
                url: path
              },
              ...options
            };
            return this;
          }
          setTitle(title) {
            this._title = title;
            return this;
          }
          setSubtitle(subtitle) {
            this._subtitle = subtitle;
            return this;
          }
          async run(jid, conn, quoted = {}) {
            const message = {
              body: proto.Message.InteractiveMessage.Body.create({
                text: this._body
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: this._footer
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                title: this._title,
                subtitle: this._subtitle,
                hasMediaAttachment: !!this._data,
                ...this._data ? await prepareWAMessageMedia(this._data, {
                  upload: conn.waUploadToServer
                }) : {}
              })
            };
            const msg = generateWAMessageFromContent(jid, {
              viewOnceMessage: {
                message: {
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    ...message,
                    contextInfo: this._contextInfo,
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                      buttons: this._buttons,
                      messageParamsJson: JSON.stringify({
                        from: "api",
                        templateId: Date.now()
                      })
                    })
                  })
                }
              }
            }, {
              quoted: quoted
            });
            await conn.relayMessage(msg.key.remoteJid, msg.message, {
              messageId: msg.key.id
            });
            return msg;
          }
        }
        const button = new Button();
        return button;
      }
    },
    sendPoll: {
      async value(jid, text = "", optiPoll, quoted) {
        if (!Array.isArray(optiPoll) && typeof optiPoll === "string") optiPoll = [optiPoll];
        if (!quoted) quoted = {};
        const pollMessage = {
          name: conn.temafont && !isNaN(parseInt(conn.temafont)) ? await generateFont(text, parseInt(conn.temafont)) : text,
          values: optiPoll.map(btn => !nullish(btn) && btn || ""),
          multiselect: false,
          selectableCount: 1
        };
        await conn.sendMessage(jid, {
          poll: pollMessage
        }, {
          quoted: quoted
        });
      }
    },
    sendList: {
      async value(jid, title, text, footer, buttonText, buffer, listSections, quoted, options) {
        if (buffer) try {
          type = await conn.getFile(buffer), buffer = type.data;
        } catch {
          buffer = buffer;
        }
        if (buffer && !Buffer.isBuffer(buffer) && (typeof buffer === "string" || Array.isArray(buffer))) options = quoted,
          quoted = listSections, listSections = buffer, buffer = null;
        if (!options) options = {};
        let m;
        try {
          m = await conn.sendLists(jid, title, text, footer, buffer, buttonText, listSections, quoted, {
            ...options
          });
        } catch (e) {
          console.error(e);
          m = null;
        } finally {
          if (!m) {
            m = await conn.sendLists(jid, title, text, footer, buffer, buttonText, listSections, quoted, {
              ...options
            });
          }
          return m;
        }
      }
    },
    sendLists: {
      async value(jid, title, text, footer, buffer, buttonText, listSections, quoted, options = {}) {
        let sections;
        if (Array.isArray(listSections?.[0]) && typeof listSections?.[0]?.[0] === "string") {
          sections = listSections.map(section => ({
            title: section?.[0],
            rows: section?.[1].map(row => ({
              title: row?.[0],
              id: row?.[1],
              description: row?.[2]
            }))
          }));
        } else {
          sections = listSections.map(section => ({
            title: section.title || "",
            rows: section.rows.map(row => ({
              title: row.title || row.id || "",
              id: row.id || row.rowId || row.title || "",
              description: row.description || ""
            }))
          }));
        }
        let m;
        try {
          m = await conn.sendButtonCta(jid, [
            [text, footer, buffer || null, [], null, null, [
              [buttonText, sections]
            ]]
          ], quoted, {
            ...mergeContext(conn, text, options)
          });
        } catch (e) {
          console.error(e);
          m = null;
        } finally {
          if (!m) {
            m = await conn.sendButtonCta(jid, [
              [text, footer, buffer || null, [], null, null, [
                [buttonText, sections]
              ]]
            ], quoted, {
              ...mergeContext(conn, text, options)
            });
          }
          return m;
        }
      }
    },
    downloadMediaMessage: {
      async value(message, fileName) {
        message = message?.msg ? message?.msg : message;
        let mimetype = (message.msg || message).mimetype || "";
        let mtype = message.type ? message.type.replace(/Message/gi, "") : mimetype.split("/")?.[0];
        const stream = await downloadContentFromMessage(message, mtype);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        if (fileName) {
          let ftype = await fileTypeFromBuffer(buffer);
          let trueFileName = fileName ? fileName + "." + ftype.ext || mimetype.split("/")?.[1] : `${Math.floor(Math.random() * 1e4)}${ftype.ext || mimetype.split("/")?.[1]}`;
          return fs.writeFileSync(trueFileName, buffer);
        } else {
          return buffer;
        }
      }
    },
    downloadAndSaveMediaMessage: {
      async value(message, filename, attachExtension = true) {
        let quoted = message.msg ? message.msg : message;
        let mime = (message.msg || message).mimetype || "";
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, "") : mime.split("/")?.[0];
        const stream = await downloadContentFromMessage(quoted, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        let type = await fileTypeFromBuffer(buffer);
        let trueFileName = attachExtension ? filename + "." + type.ext : filename;
        await fs.writeFileSync(trueFileName, buffer);
        return trueFileName;
      }
    },
    updateProfilePicture: {
      async value(jid, buffer) {
        let img;
        try {
          img = await generateProfilePicture(buffer);
        } catch {
          img = await conn.generateProfilePicture(buffer);
        }
        await conn.query({
          tag: "iq",
          attrs: {
            to: jid,
            type: "set",
            xmlns: "w:profile:picture"
          },
          content: [{
            tag: "picture",
            attrs: {
              type: "image"
            },
            content: img
          }]
        });
      }
    },
    updateProfileStatus: {
      async value(status) {
        return conn.query({
          tag: "iq",
          attrs: {
            to: "s.whatsapp.net",
            type: "set",
            xmlns: "status"
          },
          content: [{
            tag: "status",
            attrs: {},
            content: Buffer.from(status, "utf-8")
          }]
        });
      }
    },
    sendButtonDoc: {
      async value(jid, text = "", footer, buttons, buttonid, buttons2, button2id, quoted, options) {
        let button = [
          [buttons, buttonid],
          [buttons2, button2id]
        ];
        text = text + "\n\n" + readMore + "\n\n" + footer + "\n\n" + button.map(([title, command]) => ({
          title: title,
          command: command
        })).map((v, index) => {
          return `*[ ${index + 1} ] Name:* ${v.title || ""}\n➥ *CMD:* ${v.command || ""}`.trim();
        }).filter(v => v).join("\n\n");
        await conn.sendMessage(jid, {
          ...mergeContext(conn, text, options),
          text: conn.temafont && !isNaN(parseInt(conn.temafont)) ? await generateFont(text, parseInt(conn.temafont)) : text
        }, {
          quoted: quoted,
          ...options
        });
      }
    },
    send2ButtonDoc: {
      async value(jid, text = "", footer, buttons, buttonid, buttons2, button2id, quoted, options) {
        let button = [
          [buttons, buttonid],
          [buttons2, button2id]
        ];
        text = text + "\n\n" + readMore + "\n\n" + footer + "\n\n" + button.map(([title, command]) => ({
          title: title,
          command: command
        })).map((v, index) => {
          return `*[ ${index + 1} ] Name:* ${v.title || ""}\n➥ *CMD:* ${v.command || ""}`.trim();
        }).filter(v => v).join("\n\n");
        await conn.sendMessage(jid, {
          ...mergeContext(conn, text, options),
          text: conn.temafont && !isNaN(parseInt(conn.temafont)) ? await generateFont(text, parseInt(conn.temafont)) : text
        }, {
          quoted: quoted,
          ...options
        });
      }
    },
    send2ButtonImgDoc: {
      async value(jid, buffer, contentText, footerText, button1, id1, button2, id2, quoted, options) {
        let type = await conn.getFile(buffer);
        let {
          res,
          data: file
        } = type;
        if (res && res.status !== 200 || file.length <= 65536) {
          try {
            throw {
              json: JSON.parse(file.toString())
            };
          } catch (e) {
            if (e.json) throw e.json;
          }
        }
        const buttons = [{
          buttonId: id1,
          buttonText: {
            displayText: button1
          },
          type: 1
        }, {
          buttonId: id2,
          buttonText: {
            displayText: button2
          },
          type: 1
        }];
        const buttonMessage = {
          image: file,
          document: {
            url: "https://wa.me/" + nomorown
          },
          mimetype: doc,
          fileName: ucapan,
          fileLength: fsizedoc,
          pageCount: fpagedoc,
          jpegThumbnail: await conn.resize(thumbdoc, 300, 150),
          fileLength: fsizedoc,
          caption: contentText,
          footer: footerText,
          mentions: conn.parseMention(contentText + footerText),
          ...options,
          buttons: buttons,
          headerType: 4
        };
        await conn.sendMessage(jid, buttonMessage, {
          quoted: quoted,
          ephemeralExpiration: ephemeral,
          contextInfo: {
            mentionedJid: conn.parseMention(contentText + footerText)
          },
          ...options
        });
      }
    },
    send1Button: {
      async value(jid, content, footerText, button1, id1, quoted, options) {
        const buttons = [{
          buttonId: id1,
          buttonText: {
            displayText: button1
          },
          type: 1
        }];
        const buttonMessage = {
          text: content,
          footer: footerText,
          mentions: conn.parseMention(content + footerText),
          ephemeralExpiration: ephemeral,
          ...options,
          buttons: buttons,
          headerType: 1
        };
        conn.sendMessage(jid, buttonMessage, {
          quoted: quoted,
          ephemeralExpiration: ephemeral,
          contextInfo: {
            mentionedJid: conn.parseMention(content + footerText),
            forwardingScore: fsizedoc,
            isForwarded: true
          },
          ...options
        });
      }
    },
    send2Button: {
      async value(jid, content, footerText, button1, id1, button2, id2, quoted, options) {
        const buttons = [{
          buttonId: id1,
          buttonText: {
            displayText: button1
          },
          type: 1
        }, {
          buttonId: id2,
          buttonText: {
            displayText: button2
          },
          type: 1
        }];
        const buttonMessage = {
          text: content,
          footer: footerText,
          mentions: conn.parseMention(content + footerText),
          ephemeralExpiration: ephemeral,
          ...options,
          buttons: buttons,
          headerType: 1
        };
        conn.sendMessage(jid, buttonMessage, {
          quoted: quoted,
          ephemeralExpiration: ephemeral,
          contextInfo: {
            mentionedJid: conn.parseMention(content + footerText),
            forwardingScore: fsizedoc,
            isForwarded: true
          },
          ...options
        });
      }
    },
    send3Button: {
      async value(jid, content, footerText, button1, id1, button2, id2, button3, id3, quoted, options) {
        const buttons = [{
          buttonId: id1,
          buttonText: {
            displayText: button1
          },
          type: 1
        }, {
          buttonId: id2,
          buttonText: {
            displayText: button2
          },
          type: 1
        }, {
          buttonId: id3,
          buttonText: {
            displayText: button3
          },
          type: 1
        }];
        const buttonMessage = {
          text: content,
          footer: footerText,
          mentions: conn.parseMention(content + footerText),
          ephemeralExpiration: ephemeral,
          ...options,
          buttons: buttons,
          headerType: 1
        };
        conn.sendMessage(jid, buttonMessage, {
          quoted: quoted,
          ephemeralExpiration: ephemeral,
          contextInfo: {
            mentions: conn.parseMention(content + footerText),
            forwardingScore: fsizedoc,
            isForwarded: true
          },
          ...options
        });
      }
    },
    sendButtonLoc: {
      async value(jid, buffer, content, footer, button1, row1, quoted, options = {}) {
        let file = await conn.resize(buffer, 300, 150);
        let buttons = [{
          buttonId: row1,
          buttonText: {
            displayText: button1
          },
          type: 1
        }];
        let buttonMessage = {
          location: {
            jpegThumbnail: file
          },
          caption: content,
          footer: footer,
          mentions: conn.parseMention(content + footer),
          ...options,
          buttons: buttons,
          headerType: 6
        };
        await conn.sendMessage(jid, buttonMessage, {
          quoted: quoted,
          upload: conn.waUploadToServer,
          ephemeralExpiration: ephemeral,
          mentions: conn.parseMention(content + footer),
          ...options
        });
      }
    },
    send2ButtonLoc: {
      async value(jid, buffer, content, footer, button1, row1, button2, row2, quoted, options = {}) {
        let file = await conn.resize(buffer, 300, 150);
        let buttons = [{
          buttonId: row1,
          buttonText: {
            displayText: button1
          },
          type: 1
        }, {
          buttonId: row2,
          buttonText: {
            displayText: button2
          },
          type: 1
        }];
        let buttonMessage = {
          location: {
            jpegThumbnail: file
          },
          caption: content,
          footer: footer,
          mentions: conn.parseMention(content + footer),
          ...options,
          buttons: buttons,
          headerType: 6
        };
        await conn.sendMessage(jid, buttonMessage, {
          quoted: quoted,
          upload: conn.waUploadToServer,
          ephemeralExpiration: ephemeral,
          mentions: conn.parseMention(content + footer),
          ...options
        });
      }
    },
    send3ButtonLoc: {
      async value(jid, buffer, content, footer, button1, row1, button2, row2, button3, row3, quoted, options = {}) {
        let file = await conn.resize(buffer, 300, 150);
        let buttons = [{
          buttonId: row1,
          buttonText: {
            displayText: button1
          },
          type: 1
        }, {
          buttonId: row2,
          buttonText: {
            displayText: button2
          },
          type: 1
        }, {
          buttonId: row3,
          buttonText: {
            displayText: button3
          },
          type: 1
        }];
        let buttonMessage = {
          location: {
            jpegThumbnail: file
          },
          caption: content,
          footer: footer,
          mentions: conn.parseMention(content + footer),
          ...options,
          buttons: buttons,
          headerType: 6
        };
        await conn.sendMessage(jid, buttonMessage, {
          quoted: quoted,
          upload: conn.waUploadToServer,
          ephemeralExpiration: ephemeral,
          mentions: conn.parseMention(content + footer),
          ...options
        });
      }
    },
    sendButtonImg: {
      async value(jid, buffer, contentText, footerText, button1, id1, quoted, options) {
        let type = await conn.getFile(buffer);
        let {
          res,
          data: file
        } = type;
        if (res && res.status !== 200 || file.length <= 65536) {
          try {
            throw {
              json: JSON.parse(file.toString())
            };
          } catch (e) {
            if (e.json) throw e.json;
          }
        }
        const buttons = [{
          buttonId: id1,
          buttonText: {
            displayText: button1
          },
          type: 1
        }];
        const buttonMessage = {
          image: file,
          fileLength: fsizedoc,
          caption: contentText,
          footer: footerText,
          mentions: conn.parseMention(contentText + footerText),
          ...options,
          buttons: buttons,
          headerType: 4
        };
        await conn.sendMessage(jid, buttonMessage, {
          quoted: quoted,
          ephemeralExpiration: ephemeral,
          contextInfo: {
            mentionedJid: conn.parseMention(contentText + footerText)
          },
          ...options
        });
      }
    },
    send2ButtonImg: {
      async value(jid, buffer, contentText, footerText, button1, id1, button2, id2, quoted, options) {
        let type = await conn.getFile(buffer);
        let {
          res,
          data: file
        } = type;
        if (res && res.status !== 200 || file.length <= 65536) {
          try {
            throw {
              json: JSON.parse(file.toString())
            };
          } catch (e) {
            if (e.json) throw e.json;
          }
        }
        const buttons = [{
          buttonId: id1,
          buttonText: {
            displayText: button1
          },
          type: 1
        }, {
          buttonId: id2,
          buttonText: {
            displayText: button2
          },
          type: 1
        }];
        const buttonMessage = {
          image: file,
          fileLength: fsizedoc,
          caption: contentText,
          footer: footerText,
          mentions: conn.parseMention(contentText + footerText),
          ...options,
          buttons: buttons,
          headerType: 4
        };
        await conn.sendMessage(jid, buttonMessage, {
          quoted: quoted,
          ephemeralExpiration: ephemeral,
          contextInfo: {
            mentionedJid: conn.parseMention(contentText + footerText)
          },
          ...options
        });
      }
    },
    send3ButtonImg: {
      async value(jid, buffer, contentText, footerText, button1, id1, button2, id2, button3, id3, quoted, options) {
        let type = await conn.getFile(buffer);
        let {
          res,
          data: file
        } = type;
        if (res && res.status !== 200 || file.length <= 65536) {
          try {
            throw {
              json: JSON.parse(file.toString())
            };
          } catch (e) {
            if (e.json) throw e.json;
          }
        }
        const buttons = [{
          buttonId: id1,
          buttonText: {
            displayText: button1
          },
          type: 1
        }, {
          buttonId: id2,
          buttonText: {
            displayText: button2
          },
          type: 1
        }, {
          buttonId: id3,
          buttonText: {
            displayText: button3
          },
          type: 1
        }];
        const buttonMessage = {
          image: file,
          fileLength: fsizedoc,
          caption: contentText,
          footer: footerText,
          mentions: conn.parseMention(contentText + footerText),
          ...options,
          buttons: buttons,
          headerType: 4
        };
        await conn.sendMessage(jid, buttonMessage, {
          quoted: quoted,
          ephemeralExpiration: ephemeral,
          contextInfo: {
            mentionedJid: conn.parseMention(contentText + footerText)
          },
          ...options
        });
      }
    },
    sendButtonVid: {
      async value(jid, text = "", footer, buttons, buttonid, buttons2, button2id, quoted, options) {
        let button = [
          [buttons, buttonid],
          [buttons2, button2id]
        ];
        text = text + "\n\n" + readMore + "\n\n" + footer + "\n\n" + button.map(([title, command]) => ({
          title: title,
          command: command
        })).map((v, index) => {
          return `*[ ${index + 1} ] Name:* ${v.title || ""}\n➥ *CMD:* ${v.command || ""}`.trim();
        }).filter(v => v).join("\n\n");
        await conn.sendMessage(jid, {
          ...mergeContext(conn, text, options),
          text: conn.temafont && !isNaN(parseInt(conn.temafont)) ? await generateFont(text, parseInt(conn.temafont)) : text
        }, {
          quoted: quoted,
          ...options
        });
      }
    },
    send2ButtonVid: {
      async value(jid, text = "", footer, buttons, buttonid, buttons2, button2id, quoted, options) {
        let button = [
          [buttons, buttonid],
          [buttons2, button2id]
        ];
        text = text + "\n\n" + readMore + "\n\n" + footer + "\n\n" + button.map(([title, command]) => ({
          title: title,
          command: command
        })).map((v, index) => {
          return `*[ ${index + 1} ] Name:* ${v.title || ""}\n➥ *CMD:* ${v.command || ""}`.trim();
        }).filter(v => v).join("\n\n");
        await conn.sendMessage(jid, {
          ...mergeContext(conn, text, options),
          text: conn.temafont && !isNaN(parseInt(conn.temafont)) ? await generateFont(text, parseInt(conn.temafont)) : text
        }, {
          quoted: quoted,
          ...options
        });
      }
    },
    send3ButtonVid: {
      async value(jid, buffer, contentText, footerText, button1, id1, button2, id2, button3, id3, quoted, options) {
        let type = await conn.getFile(buffer);
        let {
          res,
          data: file
        } = type;
        if (res && res.status !== 200 || file.length <= 65536) {
          try {
            throw {
              json: JSON.parse(file.toString())
            };
          } catch (e) {
            if (e.json) throw e.json;
          }
        }
        let buttons = [{
          buttonId: id1,
          buttonText: {
            displayText: button1
          },
          type: 1
        }, {
          buttonId: id2,
          buttonText: {
            displayText: button2
          },
          type: 1
        }, {
          buttonId: id3,
          buttonText: {
            displayText: button3
          },
          type: 1
        }];
        const buttonMessage = {
          video: file,
          fileLength: fsizedoc,
          caption: contentText,
          footer: footerText,
          mentions: conn.parseMention(contentText + footerText),
          ...options,
          buttons: buttons,
          headerType: 4
        };
        await conn.sendMessage(jid, buttonMessage, {
          quoted: quoted,
          ephemeralExpiration: ephemeral,
          ...options
        });
      }
    },
    send3TemplateButtonImg: {
      async value(jid, buffer, content, footerText, button1, id1, button2, id2, button3, id3, quoted, options) {
        let type = await conn.getFile(buffer);
        let {
          res,
          data: file
        } = type;
        if (res && res.status !== 200 || file.length <= 65536) {
          try {
            throw {
              json: JSON.parse(file.toString())
            };
          } catch (e) {
            if (e.json) throw e.json;
          }
        }
        const buttons = [{
          index: 1,
          urlButton: {
            displayText: htjava + "ɢɪᴛʜᴜʙ",
            url: sgh
          }
        }, {
          index: 2,
          quickReplyButton: {
            displayText: button1,
            id: id1
          }
        }, {
          index: 3,
          quickReplyButton: {
            displayText: button2,
            id: id2
          }
        }, {
          index: 4,
          quickReplyButton: {
            displayText: button3,
            id: id3
          }
        }];
        const buttonMessage = {
          image: file,
          caption: content,
          footer: footerText,
          mentions: conn.parseMention(content + footerText),
          ephemeralExpiration: ephemeral,
          ...options,
          templateButtons: buttons,
          headerType: 1
        };
        conn.sendMessage(jid, buttonMessage, {
          quoted: quoted,
          ephemeralExpiration: ephemeral,
          contextInfo: {
            mentionedJid: conn.parseMention(content + footerText),
            forwardingScore: fsizedoc,
            isForwarded: true
          },
          ...options,
          ephemeralExpiration: ephemeral
        });
      }
    },
    sendTemplateButtonDoc: {
      async value(jid, buffer, content, footerText, button1, id1, quoted, options) {
        const buttons = [{
          index: 1,
          urlButton: {
            displayText: htjava + "ɢɪᴛʜᴜʙ",
            url: sgh
          }
        }, {
          index: 2,
          callButton: {
            displayText: htjava + "ᴏᴡɴᴇʀ",
            phoneNumber: nomorown
          }
        }, {
          index: 3,
          quickReplyButton: {
            displayText: button1,
            id: id1
          }
        }];
        const buttonMessage = {
          document: {
            url: "https://wa.me/" + nomorown
          },
          mimetype: doc,
          fileName: ucapan,
          fileLength: fsizedoc,
          pageCount: fpagedoc,
          jpegThumbnail: await conn.resize(thumbdoc, 300, 150),
          caption: content,
          footer: footerText,
          mentions: conn.parseMention(content + footerText),
          ...options,
          templateButtons: buttons,
          headerType: 1
        };
        conn.sendMessage(jid, buttonMessage, {
          quoted: quoted,
          ephemeralExpiration: ephemeral,
          contextInfo: {
            mentionedJid: conn.parseMention(content + footerText),
            forwardingScore: fsizedoc,
            isForwarded: true
          },
          ...options,
          ephemeralExpiration: ephemeral
        });
      }
    },
    sendTemplateButtonLoc: {
      async value(jid, buffer, contentText, footer, buttons1, row1, quoted, options) {
        let file = await conn.resize(buffer, 300, 150);
        const template = await generateWAMessageFromContent(jid, proto.Message.fromObject({
          templateMessage: {
            hydratedTemplate: {
              locationMessage: {
                jpegThumbnail: file
              },
              hydratedContentText: contentText,
              hydratedFooterText: footer,
              ...options,
              hydratedButtons: [{
                urlButton: {
                  displayText: author,
                  url: sgh
                }
              }, {
                quickReplyButton: {
                  displayText: buttons1,
                  id: row1
                }
              }]
            }
          }
        }), {
          userJid: conn.user.jid,
          quoted: quoted,
          upload: conn.waUploadToServer,
          contextInfo: {
            mentionedJid: conn.parseMention(contentText + footer)
          },
          ephemeralExpiration: ephemeral,
          ...options
        });
        await conn.relayMessage(jid, template.message, {
          messageId: template.key.id
        });
      }
    },
    sendTemplateButtonFakeImg: {
      async value(jid, buffer, content, footerText, btn1, id1, options) {
        let type = await conn.getFile(buffer);
        let {
          res,
          data: file
        } = type;
        if (res && res.status !== 200 || file.length <= 65536) {
          try {
            throw {
              json: JSON.parse(file.toString())
            };
          } catch (e) {
            if (e.json) throw e.json;
          }
        }
        const key = {
          video: file,
          jpegThumbnail: file,
          fileLength: fsizedoc,
          caption: content,
          footer: footerText,
          mentions: conn.parseMention(content + footerText),
          ...options,
          templateButtons: [{
            index: 1,
            urlButton: {
              displayText: htjava + "ɢɪᴛʜᴜʙ",
              url: sgh
            }
          }, {
            index: 2,
            callButton: {
              displayText: htjava + "ᴏᴡɴᴇʀ",
              phoneNumber: nomorown
            }
          }, {
            index: 3,
            quickReplyButton: {
              displayText: btn1,
              id: id1
            }
          }],
          ...options
        };
        conn.sendMessage(jid, key, {
          ephemeralExpiration: ephemeral,
          mentions: conn.parseMention(content + footerText),
          contextInfo: {
            forwardingScore: fsizedoc,
            isForwarded: true
          },
          ...options
        });
      }
    },
    send2TemplateButtonFakeImg: {
      async value(jid, buffer, content, footerText, btn1, id1, btn2, id2, quoted, options) {
        let type = await conn.getFile(buffer);
        let {
          res,
          data: file
        } = type;
        if (res && res.status !== 200 || file.length <= 65536) {
          try {
            throw {
              json: JSON.parse(file.toString())
            };
          } catch (e) {
            if (e.json) throw e.json;
          }
        }
        const key = {
          video: file,
          jpegThumbnail: file,
          fileLength: fsizedoc,
          caption: content,
          footer: footerText,
          mentions: conn.parseMention(content + footerText),
          ...options,
          templateButtons: [{
            index: 1,
            urlButton: {
              displayText: htjava + "ɢɪᴛʜᴜʙ",
              url: sgh
            }
          }, {
            index: 2,
            callButton: {
              displayText: htjava + "ᴏᴡɴᴇʀ",
              phoneNumber: nomorown
            }
          }, {
            index: 3,
            quickReplyButton: {
              displayText: btn1,
              id: id1
            }
          }, {
            index: 4,
            quickReplyButton: {
              displayText: btn2,
              id: id2
            }
          }]
        };
        conn.sendMessage(jid, key, {
          quoted: quoted,
          ephemeralExpiration: ephemeral,
          contextInfo: {
            mentions: conn.parseMention(content + footerText),
            forwardingScore: fsizedoc,
            isForwarded: true
          }
        });
      }
    },
    send3TemplateButtonFakeImg: {
      async value(jid, buffer, content, footerText, btn1, id1, btn2, id2, btn3, id3, quoted, options) {
        let type = await conn.getFile(buffer);
        let {
          res,
          data: file
        } = type;
        if (res && res.status !== 200 || file.length <= 65536) {
          try {
            throw {
              json: JSON.parse(file.toString())
            };
          } catch (e) {
            if (e.json) throw e.json;
          }
        }
        const key = {
          video: file,
          jpegThumbnail: file,
          fileLength: fsizedoc,
          caption: content,
          footer: footerText,
          mentions: conn.parseMention(content + footerText),
          ...options,
          templateButtons: [{
            index: 1,
            urlButton: {
              displayText: htjava + "ɢɪᴛʜᴜʙ",
              url: sgh
            }
          }, {
            index: 2,
            callButton: {
              displayText: htjava + "ᴏᴡɴᴇʀ",
              phoneNumber: nomorown
            }
          }, {
            index: 3,
            quickReplyButton: {
              displayText: btn1,
              id: id1
            }
          }, {
            index: 4,
            quickReplyButton: {
              displayText: btn2,
              id: id2
            }
          }, {
            index: 5,
            quickReplyButton: {
              displayText: btn3,
              id: id3
            }
          }]
        };
        conn.sendMessage(jid, key, {
          quoted: quoted,
          ephemeralExpiration: ephemeral,
          contextInfo: {
            forwardingScore: fsizedoc,
            isForwarded: true,
            mentions: conn.parseMention(content)
          }
        });
      }
    },
    translate: {
      async value(code, text) {
        return await translate(text, {
          from: "id",
          to: code
        });
      }
    },
    filter: {
      value(text = "") {
        let mati = ["q", "w", "r", "t", "y", "p", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
        if (/[aiueo][aiueo]([qwrtypsdfghjklzxcvbnm])?$/i.test(text)) return text.substring(text.length - 1);
        else {
          let res = Array.from(text).filter(v => mati.includes(v));
          let resu = res[res.length - 1];
          for (let huruf of mati) {
            if (text.endsWith(huruf)) {
              resu = res[res.length - 2];
            }
          }
          let misah = text.split(resu);
          return resu + misah[misah.length - 1];
        }
      }
    },
    reply: {
      async value(jid, text = "", quoted, options = {}) {
        try {
          let PATH = text;
          let res, filename;
          const isBuffer = Buffer.isBuffer(PATH);
          const isArrayBuffer = PATH instanceof ArrayBuffer;
          const data = isBuffer ? PATH : isArrayBuffer ? Buffer.from(PATH) : Helper.isReadableStream(PATH) ? await stream2buffer(PATH) : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split(",")?.[1], "base64") : /^https?:\/\//.test(PATH) && await isTextContent(PATH) ? await (res = await getDataBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : null;
          let m;
          try {
            m = await (data ? conn.sendFile(jid, data || Buffer.alloc(0), "file", "", quoted, false, options) : conn.sendMessage(jid, {
              text: text,
              ...mergeContext(conn, text, options)
            }, {
              quoted: quoted,
              ephemeralExpiration: ephemeral
            }));
          } catch (e) {
            console.error(e);
            m = null;
          } finally {
            if (!m) {
              m = await (data ? conn.sendFile(jid, data || Buffer.alloc(0), "file", "", quoted, false, options) : conn.sendMessage(jid, {
                text: text,
                ...mergeContext(conn, text, options)
              }, {
                quoted: quoted,
                ephemeralExpiration: ephemeral
              }));
            }
            return m;
          }
        } catch (error) {
          console.error("Error in 'value' function:", error);
        }
      },
      writable: true
    },
    sendButton: {
      async value(jid, text = "", footer = "", buffer, buttons, quoted, options = {}) {
        let m;
        try {
          m = await conn.sendButtonCta(jid, [
            [text, footer, buffer, buttons, null, null, null]
          ], quoted, {
            ...options
          });
        } catch (e) {
          console.error(e);
          m = null;
        } finally {
          if (!m) {
            m = await conn.sendButtonCta(jid, [
              [text, footer, buffer, buttons, null, null, null]
            ], quoted, {
              ...options
            });
          }
          return m;
        }
      },
      enumerable: true
    },
    loadingMsg: {
      async value(jid, loamsg, loamsgEdit, loadingMessages, timer = 1e3, quoted) {
        const {
          key
        } = await conn.sendMessage(jid, {
          text: loamsg
        }, {
          quoted: quoted
        });
        for (const message of loadingMessages) {
          await conn.sendMessage(jid, {
            text: message,
            edit: key
          }, {
            quoted: quoted
          });
          await new Promise(resolve => setTimeout(resolve, timer));
        }
        await conn.sendMessage(jid, {
          text: loamsgEdit,
          edit: key
        }, {
          quoted: quoted
        });
      }
    },
    sendMessageWTyping: {
      async value(msg, jid) {
        await conn.presenceSubscribe(jid);
        await delay(500);
        await conn.sendPresenceUpdate("composing", jid);
        await delay(2e3);
        await conn.sendPresenceUpdate("paused", jid);
        await conn.sendMessage(jid, msg);
      }
    },
    sendHydrated: {
      async value(jid, text = "", footer = "", b, c = "", d = "", e = "", f = "", buttons, quoted, options) {
        let button = buttons;
        return !b ? await conn.sendMessage(jid, {
          ...mergeContext(conn, text, options),
          text: conn.temafont && !isNaN(parseInt(conn.temafont)) ? await generateFont(text, parseInt(conn.temafont)) : text + "\n\n" + readMore + "\n\n" + footer + "\n\n" + b + "\n\n" + c + "\n\n" + d + "\n\n" + e + "\n\n" + f + "\n\n" + button.map(([title, command]) => ({
            title: title,
            command: command
          })).map((v, index) => {
            return `*[ ${index + 1} ] Name:* ${v.title || ""}\n➥ *CMD:* ${v.command || ""}`.trim();
          }).filter(v => v).join("\n\n")
        }, {
          quoted: quoted,
          ...options
        }) : await conn.sendFile(jid, b, footer, conn.temafont && !isNaN(parseInt(conn.temafont)) ? await generateFont(text, parseInt(conn.temafont)) : text + "\n\n" + readMore + "\n\n" + footer + "\n\n" + c + "\n\n" + d + "\n\n" + e + "\n\n" + f + "\n\n" + button.map(([title, command]) => ({
          title: title,
          command: command
        })).map((v, index) => {
          return `*[ ${index + 1} ] Name:* ${v.title || ""}\n➥ *CMD:* ${v.command || ""}`.trim();
        }).filter(v => v).join("\n\n"), quoted, false, options);
      }
    },
    sendHydrated2: {
      async value(jid, text = "", footer = "", buffer, url, urlText, url2, urlText2, buttons, quoted, options) {
        let type;
        if (buffer) try {
          type = await conn.getFile(buffer), buffer = type.data;
        } catch {
          buffer = buffer;
        }
        if (buffer && !Buffer.isBuffer(buffer) && (typeof buffer === "string" || Array.isArray(buffer))) options = quoted,
          quoted = buttons, buttons = callText, callText = call, call = urlText, urlText = url,
          url = buffer, buffer = null;
        if (!options) options = {};
        let templateButtons = [];
        if (url || urlText) {
          if (!Array.isArray(url)) url = [url];
          if (!Array.isArray(urlText)) urlText = [urlText];
          templateButtons.push(...url.map((v, i) => [v, urlText[i]]).map(([url, urlText], i) => ({
            index: templateButtons.length + i + 1,
            urlButton: {
              displayText: !nullish(urlText) && urlText || !nullish(url) && url || "",
              url: !nullish(url) && url || !nullish(urlText) && urlText || ""
            }
          })) || []);
        }
        if (url2 || urlText2) {
          if (!Array.isArray(url2)) url2 = [url2];
          if (!Array.isArray(urlText2)) urlText2 = [urlText2];
          templateButtons.push(...url2.map((v, i) => [v, urlText2[i]]).map(([url2, urlText2], i) => ({
            index: templateButtons.length + i + 1,
            urlButton: {
              displayText: !nullish(urlText2) && urlText2 || !nullish(url2) && url2 || "",
              url: !nullish(url2) && url2 || !nullish(urlText2) && urlText2 || ""
            }
          })) || []);
        }
        if (buttons.length) {
          if (!Array.isArray(buttons?.[0])) buttons = [buttons];
          templateButtons.push(...buttons.map(([text, id], index) => ({
            index: templateButtons.length + index + 1,
            quickReplyButton: {
              displayText: !nullish(text) && text || !nullish(id) && id || "",
              id: !nullish(id) && id || !nullish(text) && text || ""
            }
          })) || []);
        }
        let message = {
          ...options,
          [buffer ? "caption" : "text"]: conn.temafont && !isNaN(parseInt(conn.temafont)) ? await generateFont(text, parseInt(conn.temafont)) : text || "",
          footer: footer,
          templateButtons: templateButtons,
          ...buffer ? options.asLocation && /image/.test(type.mime) ? {
            location: {
              ...options,
              jpegThumbnail: buffer
            }
          } : {
            [/video/.test(type.mime) ? "video" : /image/.test(type.mime) ? "image" : "document"]: buffer
          } : {}
        };
        await conn.sendMessage(jid, message, {
          quoted: quoted,
          upload: conn.waUploadToServer,
          ...options
        });
      },
      enumerable: true
    },
    cMod: {
      value(jid, message, text = "", sender = conn.user.jid, options = {}) {
        if (options.mentions && !Array.isArray(options.mentions)) options.mentions = [options.mentions];
        let copy = message.toJSON();
        delete copy.message.messageContextInfo;
        delete copy.message.senderKeyDistributionMessage;
        let mtype = Object.keys(copy.message)?.[0];
        let msg = copy.message;
        let content = msg[mtype];
        if (typeof content === "string") msg[mtype] = text || content;
        else if (content.caption) content.caption = text || content.caption;
        else if (content.text) content.text = text || content.text;
        if (typeof content !== "string") {
          msg[mtype] = {
            ...content,
            ...options
          };
          msg[mtype].contextInfo = {
            ...content.contextInfo || {},
            mentionedJid: options.mentions || content.contextInfo?.mentionedJid || []
          };
        }
        if (copy.participant) sender = copy.participant = sender || copy.participant;
        else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant;
        if (copy.key.remoteJid.includes("@s.whatsapp.net")) sender = sender || copy.key.remoteJid;
        else if (copy.key.remoteJid.includes("@broadcast")) sender = sender || copy.key.remoteJid;
        copy.key.remoteJid = jid;
        copy.key.fromMe = areJidsSameUser(sender, conn.user.id) || false;
        return proto.WebMessageInfo.fromObject(copy);
      },
      enumerable: true
    },
    copyNForward: {
      async value(jid, message, forwardingScore = true, options = {}) {
        let vtype;
        if (options.readViewOnce && (message.message.viewOnceMessage || message.message.viewOnceMessageV2)?.message) {
          vtype = Object.keys((message.message.viewOnceMessage || message.message.viewOnceMessageV2)?.message)?.[0];
          delete(message.message.viewOnceMessage || message.message.viewOnceMessageV2)?.message[vtype]?.viewOnce;
          message.message = proto.Message.fromObject(JSON.parse(JSON.stringify((message.message.viewOnceMessage || message.message.viewOnceMessageV2)?.message)));
          message.message[vtype].contextInfo = (message.message.viewOnceMessage || message.message.viewOnceMessageV2)?.contextInfo;
        }
        let mtype = Object.keys(message.message)?.[0];
        let m = await generateForwardMessageContent(message, !!forwardingScore);
        let ctype = Object.keys(m)?.[0];
        if (forwardingScore && typeof forwardingScore === "number" && forwardingScore > 1) m[ctype].contextInfo.forwardingScore += forwardingScore;
        m[ctype].contextInfo = {
          ...message.message[mtype]?.contextInfo || {},
          ...m[ctype]?.contextInfo || {}
        };
        m = await generateWAMessageFromContent(jid, m, {
          ...options,
          userJid: conn.user.jid
        });
        return m?.message && m?.key?.id ? conn.relayMessage(jid, m.message, {
          messageId: m.key.id
        }) : m;
      },
      enumerable: true
    },
    fakeReply: {
      async value(jid, text = "", fakeJid = this.user.jid, fakeText = "", fakeGroupJid, options) {
        await this.reply(jid, text, {
          key: {
            fromMe: areJidsSameUser(fakeJid, conn.user.id),
            participant: fakeJid,
            ...fakeGroupJid ? {
              remoteJid: fakeGroupJid
            } : {}
          },
          message: {
            conversation: fakeText
          },
          ...mergeContext(conn, text, options)
        });
      }
    },
    downloadM: {
      async value(m, type, saveToFile) {
        let filename;
        if (!m || !(m.url || m.directPath)) return Buffer.alloc(0);
        const stream = await downloadContentFromMessage(m, type);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        if (saveToFile)({
          filename
        } = await conn.getFile(buffer, true));
        return saveToFile && fs.existsSync(filename) ? filename : buffer;
      },
      enumerable: true
    },
    parseMention: {
      value(text = "") {
        const result = typeof text === "string" && !Buffer.isBuffer(text) && !(text instanceof Object) ? [...text.matchAll(/(\d+)@?(@\d+)?/g)].map(match => match?.[2] ? `${match?.[1]}@s.whatsapp.net` : `${match?.[1]}@s.whatsapp.net`).filter(entry => /\d+@s\.whatsapp\.net/.test(entry)) : [];
        return result;
      },
      enumerable: true
    },
    getName: {
      value(jid = "", withoutContact = false) {
        jid = conn.decodeJid(jid);
        withoutContact = conn.withoutContact || withoutContact;
        let v;
        if (jid.endsWith("@g.us")) {
          v = conn.chats[jid] || store?.chats[jid] || {};
          if (!(v.name || v.subject)) {
            return conn.groupMetadata(jid).then(metadata => metadata || store?.fetchGroupMetadata(jid, conn.groupMetadata)).then(metadata => metadata || {}).then(metadata => metadata.name || metadata.subject || PhoneNumber("+" + Number(parseInt(jid))).getNumber("international"));
          }
          return v.name || v.subject || PhoneNumber("+" + Number(parseInt(jid))).getNumber("international");
        }
        if (jid.endsWith("@newsletter")) {
          v = conn.chats[jid] || store?.chats[jid] || {};
          if (!(v.name || v.subject)) {
            return conn.newsletterMetadata("jid", jid).then(metadata => metadata || {}).then(metadata => metadata.name || metadata.subject || PhoneNumber("+" + Number(parseInt(jid))).getNumber("international"));
          }
          return v.name || v.subject || PhoneNumber("+" + Number(parseInt(jid))).getNumber("international");
        }
        v = jid === "0@s.whatsapp.net" ? {
          jid: jid,
          vname: "WhatsApp"
        } : areJidsSameUser(jid, conn.user.id) ? conn.user : conn.chats[jid] || store?.chats[jid] || {};
        return withoutContact ? "" : v.name ? v.name : v.subject ? v.subject : v.vname ? v.vname : v.notify ? v.notify : v.verifiedName ? v.verifiedName : PhoneNumber("+" + Number(parseInt(jid))).getNumber("international");
      },
      enumerable: true
    },
    loadMessage: {
      value(jid, id = null) {
        if (typeof jid === "string" && !id) id = jid;
        const findMessage = (chats, id) => Object.entries(chats).filter(([_, {
          messages
        }]) => typeof messages === "object").find(([key, {
          messages
        }]) => key === jid && Object.entries(messages).find(([k, v]) => k === id || v.key?.id === id))?.[1].messages?.[id];
        const foundMessage = findMessage(conn.chats, id) || _.chain(store?.messages).values().map("array").flatten().find(({
          key
        }) => key.id === id).value();
        return foundMessage || {};
      },
      enumerable: true
    },
    sendGroupV4Invite: {
      async value(jid, participant, inviteCode, inviteExpiration, groupName = "unknown subject", caption = "Invitation to join my WhatsApp group", jpegThumbnail, options = {}) {
        let text = caption;
        const msg = proto.Message.fromObject({
          groupInviteMessage: proto.GroupInviteMessage.fromObject({
            inviteCode: inviteCode,
            inviteExpiration: parseInt(inviteExpiration) || +new Date(new Date() + 3 * 864e5),
            groupJid: jid,
            groupName: (groupName ? groupName : conn.getName(jid)) || null,
            jpegThumbnail: Buffer.isBuffer(jpegThumbnail) ? jpegThumbnail : null,
            caption: conn.temafont && !isNaN(parseInt(conn.temafont)) ? await generateFont(text, parseInt(conn.temafont)) : text
          })
        });
        const message = await generateWAMessageFromContent(participant, msg, options);
        await conn.relayMessage(participant, message.message, {
          messageId: message.key.id
        });
        return message;
      },
      enumerable: true
    },
    processMessageStubType: {
      async value(m) {
        if (!m.messageStubType) return;
        const chat = conn.decodeJid(m.key.remoteJid || m.message?.senderKeyDistributionMessage?.groupId || "");
        if (!chat || chat === "status@broadcast") return;
        const emitGroupUpdate = update => {
          conn.ev.emit("groups.update", [{
            id: chat,
            ...update
          }]);
        };
        switch (m.messageStubType) {
          case WAMessageStubType.REVOKE:
          case WAMessageStubType.GROUP_CHANGE_INVITE_LINK:
            emitGroupUpdate({
              revoke: m.messageStubParameters?.[0] || m.chat || m.sender || m.key.remoteJid
            });
            break;
          case WAMessageStubType.GROUP_CHANGE_ICON:
            emitGroupUpdate({
              icon: m.messageStubParameters?.[0] || m.chat || m.sender || m.key.remoteJid
            });
            break;
          default: {
            console.log({
              messageStubType: m.messageStubType,
              messageStubParameters: m.messageStubParameters,
              type: WAMessageStubType[m.messageStubType]
            });
            break;
          }
        }
        const isGroup = chat.endsWith("@g.us");
        if (!isGroup) return;
        let chats = conn.chats[chat];
        if (!chats) chats = conn.chats[chat] = {
          id: chat
        };
        chats.isChats = true;
        const metadata = await conn.groupMetadata(chat).catch(_ => null);
        if (!metadata) return;
        chats.subject = metadata.subject;
        chats.metadata = metadata;
      }
    },
    insertAllGroup: {
      async value() {
        const groups = Object.keys(conn.chats).filter(key => key.endsWith("@g.us")).map(key => conn.chats[key]) || {};
        for (const group in groups) conn.chats[group] = {
          ...conn.chats[group] || {},
          id: group,
          subject: groups[group]?.subject,
          isChats: true,
          metadata: groups[group]
        };
        return conn.chats;
      }
    },
    sendStimg: {
      async value(jid, path, quoted, options = {}) {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split(",")?.[1], "base64") : /^https?:\/\//.test(path) ? (await conn.getFile(path)).data : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
        let buffer;
        if (options && (options.packname || options.author)) {
          buffer = fs.readFileSync(await writeExifImg(buff, options));
        } else {
          buffer = await mediaToSticker(buff) || await imageToWebp(buff);
        }
        await conn.sendMessage(jid, {
          sticker: buffer,
          ...options || {}
        }, {
          quoted: quoted
        });
      }
    },
    sendStvid: {
      async value(jid, path, quoted, options = {}) {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split(",")?.[1], "base64") : /^https?:\/\//.test(path) ? (await conn.getFile(path)).data : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
        let buffer;
        if (options && (options.packname || options.author)) {
          buffer = fs.readFileSync(await writeExifVid(buff, options));
        } else {
          buffer = await mediaToSticker(buff) || await videoToWebp(buff);
        }
        await conn.sendMessage(jid, {
          sticker: buffer,
          ...options || {}
        }, {
          quoted: quoted
        });
      }
    },
    pushMessage: {
      async value(m) {
        if (!m) return;
        if (!Array.isArray(m)) m = [m];
        for (const message of m) {
          try {
            if (!message) continue;
            if (message.messageStubType && message.messageStubType != WAMessageStubType.CIPHERTEXT) conn.processMessageStubType(message).catch(console.error);
            const _mtype = Object.keys(message.message || {});
            const mtype = !["senderKeyDistributionMessage", "messageContextInfo"]?.includes(_mtype?.[0]) && _mtype?.[0] || _mtype.length >= 3 && _mtype?.[1] !== "messageContextInfo" && _mtype?.[1] || _mtype[_mtype.length - 1];
            const chat = conn.decodeJid(message.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || "");
            if (message.message?.[mtype]?.contextInfo?.quotedMessage) {
              let context = message.message[mtype]?.contextInfo;
              let participant = conn.decodeJid(context.participant);
              const remoteJid = conn.decodeJid(context.remoteJid || participant);
              let quoted = message.message[mtype]?.contextInfo.quotedMessage;
              if (remoteJid && remoteJid !== "status@broadcast" && quoted) {
                let qMtype = Object.keys(quoted)?.[0];
                if (qMtype === "conversation") {
                  quoted.extendedTextMessage = {
                    text: quoted[qMtype]
                  };
                  delete quoted.conversation;
                  qMtype = "extendedTextMessage";
                }
                if (!quoted[qMtype]?.contextInfo) quoted[qMtype].contextInfo = {};
                quoted[qMtype].contextInfo.mentionedJid = context.mentionedJid || quoted[qMtype]?.contextInfo.mentionedJid || [];
                const isGroup = remoteJid.endsWith("g.us");
                if (isGroup && !participant) participant = remoteJid;
                const qM = {
                  key: {
                    remoteJid: remoteJid,
                    fromMe: areJidsSameUser(remoteJid, conn.user.jid),
                    id: context.stanzaId,
                    participant: participant
                  },
                  message: JSON.parse(JSON.stringify(quoted)),
                  ...isGroup ? {
                    participant: participant
                  } : {}
                };
                let qChats = conn.chats[participant];
                if (!qChats) qChats = conn.chats[participant] = {
                  id: participant,
                  isChats: !isGroup
                };
                if (!qChats.messages) qChats.messages = {};
                if (!qChats.messages[context.stanzaId] && !qM.key.fromMe) qChats.messages[context.stanzaId] = qM;
                let qChatsMessages;
                if ((qChatsMessages = Object.entries(qChats.messages)).length > 40) qChats.messages = Object.fromEntries(qChatsMessages.slice(30, qChatsMessages.length));
              }
            }
            if (!chat || chat === "status@broadcast") continue;
            const isGroup = chat.endsWith("@g.us");
            let chats = conn.chats[chat];
            if (!chats) {
              if (isGroup) await conn.insertAllGroup().catch(console.error);
              chats = conn.chats[chat] = {
                id: chat,
                isChats: true,
                ...conn.chats[chat] || {}
              };
            }
            let metadata, sender;
            if (isGroup) {
              if (!chats.subject || !chats.metadata) {
                metadata = await conn.groupMetadata(chat).catch(_ => ({})) || {};
                if (!chats.subject) chats.subject = metadata.subject || "";
                if (!chats.metadata) chats.metadata = metadata;
              }
              sender = conn.decodeJid(message.key?.fromMe && conn.user.id || message.participant || message.key?.participant || chat || "");
              if (sender !== chat) {
                let chats = conn.chats[sender];
                if (!chats) chats = conn.chats[sender] = {
                  id: sender
                };
                if (!chats.name) chats.name = message.pushName || chats.name || "";
              }
            } else if (!chats.name) chats.name = message.pushName || chats.name || "";
            if (["senderKeyDistributionMessage", "messageContextInfo"]?.includes(mtype)) continue;
            chats.isChats = true;
            if (!chats.messages) chats.messages = {};
            const fromMe = message.key.fromMe || areJidsSameUser(sender || chat, conn.user.id);
            if (!["protocolMessage"]?.includes(mtype) && !fromMe && message.messageStubType != WAMessageStubType.CIPHERTEXT && message.message) {
              delete message.message.messageContextInfo;
              delete message.message.senderKeyDistributionMessage;
              chats.messages[message.key.id] = JSON.parse(JSON.stringify(message, null, 2));
              let chatsMessages;
              if ((chatsMessages = Object.entries(chats.messages)).length > 40) chats.messages = Object.fromEntries(chatsMessages.slice(30, chatsMessages.length));
            }
          } catch (e) {
            console.error(e);
          }
        }
      }
    },
    serializeM: {
      value(m) {
        return smsg(conn, m);
      }
    },
    ...typeof conn.chatRead !== "function" ? {
      chatRead: {
        value(messageKey) {
          return conn.readMessages([messageKey]);
        },
        enumerable: true
      }
    } : {},
    ...typeof conn.setStatus !== "function" ? {
      setStatus: {
        value(status) {
          return conn.query({
            tag: "iq",
            attrs: {
              to: S_WHATSAPP_NET,
              type: "set",
              xmlns: "status"
            },
            content: [{
              tag: "status",
              attrs: {},
              content: Buffer.from(status, "utf-8")
            }]
          });
        },
        enumerable: true
      }
    } : {}
  });
  if (sock.user?.id) sock.user.jid = sock.decodeJid(sock.user.id);
  store?.bind(sock.ev);
  return sock;
}
export function smsg(conn, m, hasParent) {
  if (!m) return m;
  let M = proto.WebMessageInfo;
  m = M.fromObject(m);
  m.conn = conn;
  let protocolMessageKey;
  if (m.message) {
    if (m.mtype === "protocolMessage" && m.msg.key) {
      protocolMessageKey = m.msg.key;
      if (protocolMessageKey === "status@broadcast") protocolMessageKey.remoteJid = m.chat;
      if (!protocolMessageKey.participant || protocolMessageKey.participant === "status_me") protocolMessageKey.participant = m.sender;
      protocolMessageKey.fromMe = conn.decodeJid(protocolMessageKey.participant) === conn.decodeJid(conn.user.id);
      if (!protocolMessageKey.fromMe && protocolMessageKey.remoteJid === conn.decodeJid(conn.user.id)) protocolMessageKey.remoteJid = m.sender;
    }
    if (m.quoted)
      if (!m.quoted?.mediaMessage) delete m.quoted?.download;
  }
  if (!m.mediaMessage) delete m.download;
  try {
    if (protocolMessageKey && m.mtype === "protocolMessage") conn.ev.emit("message.delete", protocolMessageKey);
  } catch (e) {
    console.error(e);
  }
  return m;
}
export function serialize() {
  const MediaType = ["imageMessage", "videoMessage", "audioMessage", "stickerMessage", "documentMessage"];
  return Object.defineProperties(proto.WebMessageInfo.prototype, {
    conn: {
      value: undefined,
      enumerable: false,
      writable: true
    },
    id: {
      get() {
        return this.key?.id;
      }
    },
    isBaileys: {
      get() {
        return _.some(["BAE", "B1E", "3EB0", "WA"], pfx => _.startsWith(this.id, pfx)) || _.includes([12, 16, 20, 22, 40], this.id?.length);
      }
    },
    chat: {
      get() {
        const senderKeyDistributionMessage = this.message?.senderKeyDistributionMessage?.groupId;
        return (this.key?.remoteJid || senderKeyDistributionMessage && senderKeyDistributionMessage !== "status@broadcast" || "").decodeJid();
      }
    },
    isGroup: {
      get() {
        return this.chat.endsWith("@g.us") ? true : false;
      },
      enumerable: true
    },
    sender: {
      get() {
        return this.conn?.decodeJid(this.key?.fromMe && this.conn?.user.id || this.participant || this.key.participant || this.chat || "");
      },
      enumerable: true
    },
    fromMe: {
      get() {
        return this.key?.fromMe || areJidsSameUser(this.sender, this.conn?.user.id) || false;
      }
    },
    mtype: {
      get() {
        if (!this.message) return "";
        const type = Object.keys(this.message);
        return !["senderKeyDistributionMessage", "messageContextInfo"]?.includes(type?.[0]) && type?.[0] || type.length >= 3 && type?.[1] !== "messageContextInfo" && type?.[1] || type[type.length - 1];
      },
      enumerable: true
    },
    msg: {
      get() {
        if (!this.message) return null;
        return this.message[this.mtype];
      }
    },
    mediaMessage: {
      get() {
        if (!this.message) return null;
        const Message = (this.msg?.url || this.msg?.directPath ? {
          ...this.message
        } : extractMessageContent(this.message)) || null;
        if (!Message) return null;
        const mtype = Object.keys(Message)?.[0];
        return MediaType.includes(mtype) ? Message : null;
      },
      enumerable: true
    },
    messages: {
      get() {
        return this.message ? this.message : null;
      },
      enumerable: true
    },
    mediaType: {
      get() {
        let message;
        if (!(message = this.mediaMessage)) return null;
        return Object.keys(message)?.[0];
      },
      enumerable: true
    },
    quoted: {
      get() {
        const self = this;
        const msg = self.msg;
        const contextInfo = msg?.contextInfo;
        const quoted = contextInfo?.quotedMessage;
        if (!msg || !contextInfo || !quoted) return null;
        const type = Object.keys(quoted)?.[0];
        let q = quoted[type];
        const text = typeof q === "string" ? q : q.text;
        return Object.defineProperties(JSON.parse(JSON.stringify(typeof q === "string" ? {
          text: q
        } : q)), {
          mtype: {
            get() {
              return type;
            },
            enumerable: true
          },
          mediaMessage: {
            get() {
              const Message = (q.url || q.directPath ? {
                ...quoted
              } : extractMessageContent(quoted)) || null;
              if (!Message) return null;
              const mtype = Object.keys(Message)?.[0];
              return MediaType.includes(mtype) ? Message : null;
            },
            enumerable: true
          },
          messages: {
            get() {
              return quoted ? quoted : null;
            },
            enumerable: true
          },
          mediaType: {
            get() {
              let message;
              if (!(message = this.mediaMessage)) return null;
              return Object.keys(message)?.[0];
            },
            enumerable: true
          },
          id: {
            get() {
              return contextInfo.stanzaId;
            },
            enumerable: true
          },
          chat: {
            get() {
              return contextInfo.remoteJid || self.chat;
            },
            enumerable: true
          },
          isBaileys: {
            get() {
              return _.some(["BAE", "B1E", "3EB0", "WA"], pfx => _.startsWith(this.id, pfx)) || _.includes([12, 16, 20, 22, 40], this.id?.length);
            },
            enumerable: true
          },
          sender: {
            get() {
              return (contextInfo.participant || this.chat || "").decodeJid();
            },
            enumerable: true
          },
          fromMe: {
            get() {
              return areJidsSameUser(this.sender, self.conn?.user.jid);
            },
            enumerable: true
          },
          text: {
            get() {
              return text || this.caption || this.contentText || this.selectedDisplayText || "";
            },
            enumerable: true
          },
          mentionedJid: {
            get() {
              return q.contextInfo?.mentionedJid || self.getQuotedObj()?.mentionedJid || [];
            },
            enumerable: true
          },
          name: {
            get() {
              const sender = this.sender;
              return sender ? self.conn?.getName(sender) : null;
            },
            enumerable: true
          },
          vM: {
            get() {
              return proto.WebMessageInfo.fromObject({
                key: {
                  fromMe: this.fromMe,
                  remoteJid: this.chat,
                  id: this.id
                },
                message: quoted,
                ...self.isGroup ? {
                  participant: this.sender
                } : {}
              });
            }
          },
          fakeObj: {
            get() {
              return this.vM;
            }
          },
          download: {
            value(saveToFile = false) {
              const mtype = this.mediaType;
              return self.conn?.downloadM(this.mediaMessage[mtype], mtype.replace(/message/i, ""), saveToFile);
            },
            enumerable: true,
            configurable: true
          },
          reply: {
            value(text, chatId, options) {
              return self.conn?.reply(chatId !== null && chatId !== undefined && typeof chatId !== "object" ? chatId : this.chat, text, this.vM, typeof chatId === "object" ? chatId : options);
            },
            enumerable: true
          },
          copy: {
            value() {
              const M = proto.WebMessageInfo;
              return smsg(conn, M.fromObject(M.toObject(this.vM)));
            },
            enumerable: true
          },
          forward: {
            value(jid, force = false, options) {
              return self.conn?.sendMessage(jid, {
                forward: this.vM,
                force: force,
                ...options
              }, {
                ...options
              });
            },
            enumerable: true
          },
          copyNForward: {
            value(jid, forceForward = false, options) {
              return self.conn?.copyNForward(jid, this.vM, forceForward, options);
            },
            enumerable: true
          },
          cMod: {
            value(jid, text = "", sender = this.sender, options = {}) {
              return self.conn?.cMod(jid, this.vM, text, sender, options);
            },
            enumerable: true
          },
          delete: {
            value() {
              return self.conn?.sendMessage(this.chat, {
                delete: this.vM.key
              });
            },
            enumerable: true
          },
          react: {
            value(text) {
              return self.conn?.sendMessage(this.chat, {
                react: {
                  text: text,
                  key: this.vM.key
                }
              });
            },
            enumerable: true
          },
          command: {
            get() {
              const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
              let _prefix = this.prefix ? this.prefix : prefix;
              let match = (_prefix instanceof RegExp ? [
                [_prefix.exec(text || this.caption || this.contentText || this.selectedDisplayText || ""), _prefix]
              ] : Array.isArray(_prefix) ? _prefix.map(p => {
                let re = p instanceof RegExp ? p : new RegExp(str2Regex(p));
                return [re.exec(text || this.caption || this.contentText || this.selectedDisplayText || ""), re];
              }) : typeof _prefix === "string" ? [
                [new RegExp(str2Regex(_prefix)).exec(text || this.caption || this.contentText || this.selectedDisplayText || ""), new RegExp(str2Regex(_prefix))]
              ] : [
                [
                  [], new RegExp()
                ]
              ]).find(p => p?.[1]);
              let result = (opts?.["multiprefix"] ?? true) && (match?.[0] || "")?.[0] || (opts?.["noprefix"] ?? false ? null : (match?.[0] || "")?.[0]);
              let noPrefix = !result ? text || this.caption || this.contentText || this.selectedDisplayText || "" : (text || this.caption || this.contentText || this.selectedDisplayText || "").replace(result, "");
              let args_v2 = noPrefix.trim().split(/ +/);
              let [command, ...args] = noPrefix.trim().split(" ").filter(v => v);
              return {
                command: command,
                args: args,
                args_v2: args_v2,
                noPrefix: noPrefix,
                match: match
              };
            },
            enumerable: true
          },
          device: {
            get() {
              return getDevice(this.vM.key?.id) ? getDevice(this.vM.key?.id) === "unknown" && os.platform() ? os.platform() === "android" ? "android" : ["win32", "darwin", "linux"]?.includes(os.platform()) ? "desktop" : "unknown" : getDevice(this.vM.key?.id) : "unknown";
            },
            enumerable: true
          },
          isBot: {
            get() {
              return _.some(["BAE", "B1E", "3EB0", "WA"], pfx => _.startsWith(this.vM.key.id, pfx)) || _.includes([12, 16, 20, 22, 40], this.vM.key.id?.length);
            },
            enumerable: true
          }
        });
      },
      enumerable: true
    },
    _text: {
      value: null,
      writable: true
    },
    text: {
      get() {
        const msg = this.msg;
        const text = (typeof msg === "string" ? msg : msg?.text) || msg?.caption || msg?.contentText || "";
        return typeof this._text === "string" ? this._text : "" || (typeof text === "string" ? text : text?.selectedDisplayText || text?.hydratedTemplate?.hydratedContentText || text) || "";
      },
      set(str) {
        return this._text = str;
      },
      enumerable: true
    },
    mentionedJid: {
      get() {
        return this.msg?.contextInfo?.mentionedJid?.length && this.msg.contextInfo.mentionedJid || [];
      },
      enumerable: true
    },
    name: {
      get() {
        return !nullish(this.pushName) && this.pushName || this.conn?.getName(this.sender);
      },
      enumerable: true
    },
    download: {
      value(saveToFile = false) {
        const mtype = this.mediaType;
        return this.conn?.downloadM(this.mediaMessage[mtype], mtype.replace(/message/i, ""), saveToFile);
      },
      enumerable: true,
      configurable: true
    },
    reply: {
      value(text, chatId, options) {
        return this.conn?.reply(chatId !== null && chatId !== undefined && typeof chatId !== "object" ? chatId : this.chat, text, this, typeof chatId === "object" ? chatId : options);
      }
    },
    copy: {
      value() {
        const M = proto.WebMessageInfo;
        return smsg(this.conn, M.fromObject(M.toObject(this)));
      },
      enumerable: true
    },
    forward: {
      value(jid, force = false, options = {}) {
        return this.conn?.sendMessage(jid, {
          forward: this,
          force: force,
          ...options
        }, {
          ...options
        });
      },
      enumerable: true
    },
    copyNForward: {
      value(jid, forceForward = false, options = {}) {
        return this.conn?.copyNForward(jid, this, forceForward, options);
      },
      enumerable: true
    },
    cMod: {
      value(jid, text = "", sender = this.sender, options = {}) {
        return this.conn?.cMod(jid, this, text, sender, options);
      },
      enumerable: true
    },
    getQuotedObj: {
      value() {
        if (!this.quoted.id) return null;
        const message = proto.WebMessageInfo.fromObject(this.conn?.loadMessage(this.chat, this.quoted.id) || this.conn?.loadMessage(null, this.quoted.id) || this.quoted.vM);
        return smsg(this.conn, message);
      },
      enumerable: true
    },
    getQuotedMessage: {
      get() {
        return this.getQuotedObj;
      }
    },
    delete: {
      value() {
        return this.conn?.sendMessage(this.chat, {
          delete: this.key
        });
      },
      enumerable: true
    },
    react: {
      value(text) {
        return this.conn?.sendMessage(this.chat, {
          react: {
            text: text,
            key: this.key
          }
        });
      },
      enumerable: true
    },
    device: {
      get() {
        return getDevice(this.key?.id) ? getDevice(this.key?.id) === "unknown" && os.platform() ? os.platform() === "android" ? "android" : ["win32", "darwin", "linux"]?.includes(os.platform()) ? "desktop" : "unknown" : getDevice(this.key?.id) : "unknown";
      },
      enumerable: true
    },
    isBot: {
      get() {
        return _.some(["BAE", "B1E", "3EB0", "WA"], pfx => _.startsWith(this.key.id, pfx)) || _.includes([12, 16, 20, 22, 40], this.key.id?.length);
      },
      enumerable: true
    }
  });
}
export function logic(check, inp, out) {
  if (inp.length !== out.length) throw new Error("Input and Output must have same length");
  for (let i in inp)
    if (util.isDeepStrictEqual(check, inp[i])) return out[i];
  return null;
}
export function protoType() {
  Buffer.prototype.toArrayBuffer = function toArrayBufferV2() {
    const ab = new ArrayBuffer(this.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < this.length; ++i) {
      view[i] = this[i];
    }
    return ab;
  };
  Buffer.prototype.toArrayBufferV2 = function toArrayBuffer() {
    return this.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength);
  };
  ArrayBuffer.prototype.toBuffer = function toBuffer() {
    return Buffer.from(new Uint8Array(this));
  };
  Uint8Array.prototype.getFileType = ArrayBuffer.prototype.getFileType = Buffer.prototype.getFileType = async function getFileType() {
    return await fileTypeFromBuffer(this);
  };
  String.prototype.isNumber = Number.prototype.isNumber = isNumber;
  String.prototype.capitalize = function capitalize() {
    return this.charAt(0).toUpperCase() + this.slice(1, this.length);
  };
  String.prototype.capitalizeV2 = function capitalizeV2() {
    const str = this.split(" ");
    return str.map(v => v.capitalize()).join(" ");
  };
  String.prototype.decodeJid = function decodeJid() {
    if (/:\d+@/gi.test(this)) {
      const decode = jidDecode(this) || {};
      return (decode.user && decode.server && decode.user + "@" + decode.server || this).trim();
    } else return this.trim();
  };
  Number.prototype.toTimeString = function toTimeString() {
    const seconds = Math.floor(this / 1e3 % 60);
    const minutes = Math.floor(this / (60 * 1e3) % 60);
    const hours = Math.floor(this / (60 * 60 * 1e3) % 24);
    const days = Math.floor(this / (24 * 60 * 60 * 1e3));
    return ((days ? `${days} Days ☀ ️` : "") + (hours ? `${hours} Hours 🕐 ` : "") + (minutes ? `${minutes} Minute ⏰ ` : "") + (seconds ? `${seconds} Second ⏱️ ` : "")).trim();
  };
  Number.prototype.getRandom = String.prototype.getRandom = Array.prototype.getRandom = getRandom;
}

function isNumber() {
  const int = parseInt(this);
  return typeof int === "number" && !isNaN(int);
}

function getRandom() {
  if (Array.isArray(this) || this instanceof String) {
    const shuffledList = this.slice().sort(() => Math.random() - .5);
    return shuffledList[Math.floor(Math.random() * shuffledList.length)];
  }
  return Math.floor(Math.random() * this);
}

function nullish(args) {
  return !(args !== null && args !== undefined);
}
async function generateProfilePicture(mediaUpload) {
  let bufferOrFilePath;
  if (Buffer.isBuffer(mediaUpload)) bufferOrFilePath = mediaUpload;
  else if ("url" in mediaUpload) bufferOrFilePath = mediaUpload.url.toString();
  else bufferOrFilePath = await toBuffer(mediaUpload.stream);
  const {
    read,
    MIME_JPEG,
    AUTO
  } = await Promise.resolve().then(async () => (await import("jimp")).default);
  const jimp = await read(bufferOrFilePath);
  const min = jimp.getWidth();
  const max = jimp.getHeight();
  const cropped = jimp.crop(0, 0, min, max);
  return {
    img: await cropped.quality(100).scaleToFit(720, 720, AUTO).getBufferAsync(MIME_JPEG)
  };
}
async function getDataBuffer(url, referer = null) {
  const myheaders = {
    "User-Agent": userAgent(),
    Accept: "*/*",
    "Accept-Language": "*/*",
    Referer: referer || url,
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Connection: "keep-alive"
  };
  try {
    const fetchOptions = {
      redirect: "follow",
      mode: "no-cors",
      retries: 3,
      retryDelay: 1e3,
      headers: {
        ...myheaders,
        DNT: 1,
        "Upgrade-Insecure-Request": 1
      }
    };
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.arrayBuffer() || await response.text();
    return Buffer.from(responseData);
  } catch (fetchError) {
    console.error("Fetch Error:", fetchError.message);
    try {
      const gotResponse = await got(url, {
        redirect: "follow",
        mode: "no-cors",
        retries: 3,
        retryDelay: 1e3,
        headers: {
          ...myheaders,
          DNT: 1,
          "Upgrade-Insecure-Request": 1
        }
      });
      return Buffer.from(gotResponse.body);
    } catch (gotError) {
      console.error("Got Error:", gotError.message);
      try {
        const undiciFetchOptions = {
          redirect: "follow",
          mode: "no-cors",
          retries: 3,
          retryDelay: 1e3,
          headers: {
            ...myheaders,
            DNT: 1,
            "Upgrade-Insecure-Request": 1
          }
        };
        const undiciResponse = await undiciFetch(url, undiciFetchOptions);
        if (!undiciResponse.ok) {
          throw new Error(`HTTP error! Status: ${undiciResponse.statusCode}`);
        }
        const undiciResponseBody = await undiciResponse.arrayBuffer() || await undiciResponse.text();
        return Buffer.from(undiciResponseBody);
      } catch (undiciError) {
        console.error("Undici Error:", undiciError.message);
        try {
          const axiosConfig = {
            redirect: "follow",
            mode: "no-cors",
            retries: 3,
            retryDelay: 1e3,
            headers: {
              ...myheaders,
              DNT: 1,
              "Upgrade-Insecure-Request": 1
            }
          };
          const axiosResponse = await axios.get(url, axiosConfig);
          return Buffer.from(axiosResponse.data);
        } catch (axiosError) {
          console.error("Axios Error:", axiosError.message);
          return Buffer.from([]);
        }
      }
    }
  }
}
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
const isTextContent = async url => {
  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");
    return !/^(text\/(plain|html|xml)|application\/(json|(.*\+)?xml))/.test(contentType);
  } catch (error) {
    console.error("Error fetching content:", error);
    return false;
  }
};
const generateFont = async (text, num) => {
  try {
    return await FancyTextV2(text, num);
  } catch (error) {
    console.error("Error generating font with FancyTextV2:", error);
    return await FancyText(text, num).catch(() => {
      console.error("Error generating font with FancyText:", error);
      return text;
    });
  }
};

function stream2buffer(stream) {
  return new Promise((resolve, reject) => {
    const _buf = [];
    stream.on("data", chunk => _buf.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(_buf)));
    stream.on("error", err => reject(err));
  });
}

function mergeContext(conn, text, options) {
  return _.merge({
    mentions: typeof text === "string" ? conn.parseMention(text || "@0") : [],
    contextInfo: {
      mentionedJid: typeof text === "string" ? conn.parseMention(text || "@0") : []
    }
  }, options || {}, conn.temareply?.contextInfo ? {
    contextInfo: _.merge(options?.contextInfo || {}, conn.temareply.contextInfo, {
      externalAdReply: _.merge(options?.contextInfo?.externalAdReply || {}, conn.temareply.contextInfo.externalAdReply)
    })
  } : {});
}