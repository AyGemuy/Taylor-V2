import moment from "moment-timezone";
moment.locale("id");
const imgSource = ["https://api.btstu.cn/sjbz/api.php?lx=1920x1080", "https://minimalistic-wallpaper.demolab.com/?random", "https://www.loremflickr.com/1920/1080", "https://www.picsum.photos/1920/1080", "https://www.placebear.com/1920/1080", "https://www.placebeard.it/1920/1080"];
export async function all(m) {
  try {
    const sayHai = `📍 ${sapa()} ${m?.name || await this.getName(m?.sender)} ${pagi()}`,
      RandomizerThumb = Randomizer([...imgSource, thumb, thumbdoc, imagebot]);
    global.THUMB = RandomizerThumb, global.botdate = `${htjava} Tanggal: ${moment.tz("Asia/Makassar").format("DD/MM/YYYY")}`,
      global.bottime = `Waktu: ${moment.tz("Asia/Makassar").format("HH:mm:ss")}`, global.titlebot = `${htjava} Waktu Server: ${moment.tz("Asia/Makassar").format("HH:mm:ss")}\nTanggal Server: ${moment.tz("Asia/Makassar").format("DD/MM/YYYY")}`,
      global.adReplyS = {
        fileLength: sizeDoc(),
        seconds: sizeDoc(),
        contextInfo: {
          mentionedJid: [m?.sender],
          isForwarded: !0,
          forwardingScore: 127,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363204654888455@newsletter",
            newsletterName: wm,
            serverMessageId: -1
          },
          businessMessageForwardInfo: {
            businessOwnerJid: bussJid()
          },
          externalAdReply: {
            title: sayHai,
            body: author,
            mediaType: 1,
            previewType: 0,
            renderLargerThumbnail: !1,
            thumbnailUrl: THUMB,
            sourceUrl: sgh
          }
        }
      }, global.adReply = {
        fileLength: sizeDoc(),
        seconds: sizeDoc(),
        contextInfo: {
          mentionedJid: [m?.sender],
          isForwarded: !0,
          forwardingScore: 127,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363204654888455@newsletter",
            newsletterName: wm,
            serverMessageId: -1
          },
          businessMessageForwardInfo: {
            businessOwnerJid: bussJid()
          },
          externalAdReply: {
            title: sayHai,
            body: author,
            mediaType: 1,
            previewType: 0,
            renderLargerThumbnail: !0,
            thumbnailUrl: THUMB,
            sourceUrl: sgh
          }
        }
      }, global.fakeig = {
        fileLength: sizeDoc(),
        seconds: sizeDoc(),
        contextInfo: {
          mentionedJid: [m?.sender],
          isForwarded: !0,
          forwardingScore: 127,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363204654888455@newsletter",
            newsletterName: wm,
            serverMessageId: -1
          },
          businessMessageForwardInfo: {
            businessOwnerJid: bussJid()
          },
          externalAdReply: {
            title: sayHai,
            body: author,
            mediaUrl: sig,
            mediaType: 2,
            previewType: 0,
            renderLargerThumbnail: !0,
            thumbnailUrl: THUMB,
            sourceUrl: sig
          }
        }
      }, global.fakefb = {
        fileLength: sizeDoc(),
        seconds: sizeDoc(),
        contextInfo: {
          mentionedJid: [m?.sender],
          isForwarded: !0,
          forwardingScore: 127,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363204654888455@newsletter",
            newsletterName: wm,
            serverMessageId: -1
          },
          businessMessageForwardInfo: {
            businessOwnerJid: bussJid()
          },
          externalAdReply: {
            title: sayHai,
            body: author,
            mediaUrl: sfb,
            mediaType: 2,
            previewType: 0,
            renderLargerThumbnail: !0,
            thumbnailUrl: THUMB,
            sourceUrl: sfb
          }
        }
      }, global.faketik = {
        fileLength: sizeDoc(),
        seconds: sizeDoc(),
        contextInfo: {
          mentionedJid: [m?.sender],
          isForwarded: !0,
          forwardingScore: 127,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363204654888455@newsletter",
            newsletterName: wm,
            serverMessageId: -1
          },
          businessMessageForwardInfo: {
            businessOwnerJid: bussJid()
          },
          externalAdReply: {
            title: sayHai,
            body: author,
            mediaUrl: snh,
            mediaType: 2,
            previewType: 0,
            renderLargerThumbnail: !0,
            thumbnailUrl: THUMB,
            sourceUrl: snh
          }
        }
      }, global.fakeyt = {
        fileLength: sizeDoc(),
        seconds: sizeDoc(),
        contextInfo: {
          mentionedJid: [m?.sender],
          isForwarded: !0,
          forwardingScore: 127,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363204654888455@newsletter",
            newsletterName: wm,
            serverMessageId: -1
          },
          businessMessageForwardInfo: {
            businessOwnerJid: bussJid()
          },
          externalAdReply: {
            title: sayHai,
            body: author,
            mediaUrl: syt,
            mediaType: 2,
            previewType: 0,
            renderLargerThumbnail: !0,
            thumbnailUrl: THUMB,
            sourceUrl: syt
          }
        }
      };
    const Org = Randomizer(["0", "628561122343", "6288906250517", "6282195322106", "6281119568305", "6281282722861", "6282112790446"]),
      UserNum = Randomizer([`${Org}@s.whatsapp.net`, `${Org}@c.us`]),
      UserJid = Randomizer(["status@broadcast", "120363047752200594@g.us"]),
      fpayment = {
        key: {
          participant: UserNum,
          remoteJid: UserJid
        },
        message: {
          requestPaymentMessage: {
            currencyCodeIso4217: "USD",
            amount1000: sizeDoc(),
            requestFrom: UserNum,
            noteMessage: {
              extendedTextMessage: {
                text: sayHai
              }
            },
            expiryTimestamp: sizeDoc(),
            amount: {
              value: sizeDoc(),
              offset: sizeDoc(),
              currencyCode: "USD"
            }
          }
        }
      },
      fpoll = {
        key: {
          participant: UserNum,
          remoteJid: UserJid
        },
        message: {
          pollCreationMessage: {
            name: sayHai
          }
        }
      },
      fchan = {
        key: {
          participant: UserNum,
          remoteJid: UserJid
        },
        message: {
          newsletterAdminInviteMessage: {
            newsletterJid: "120363204654888455@newsletter",
            newsletterName: author,
            caption: sayHai
          }
        }
      },
      ftroli = {
        key: {
          participant: UserNum,
          remoteJid: UserJid
        },
        message: {
          orderMessage: {
            itemCount: sizeDoc(),
            status: 1,
            surface: 1,
            message: bottime,
            orderTitle: sayHai,
            sellerJid: UserNum
          }
        }
      },
      fkontak = {
        key: {
          participant: UserNum,
          remoteJid: UserJid
        },
        message: {
          contactMessage: {
            displayName: sayHai,
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${sayHai},;;;\nFN:${sayHai},\nitem1.TEL;waid=${nomorown.split("@")[0]}:${nomorown.split("@")[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`,
            jpegThumbnail: Buffer.alloc(0),
            thumbnail: THUMB,
            sendEphemeral: !0
          }
        }
      },
      fvn = {
        key: {
          participant: UserNum,
          remoteJid: UserJid
        },
        message: {
          audioMessage: {
            mimetype: "audio/ogg; codecs=opus",
            seconds: sizeDoc(),
            ptt: !0
          }
        }
      },
      fvid = {
        key: {
          participant: UserNum,
          remoteJid: UserJid
        },
        message: {
          videoMessage: {
            title: sayHai,
            h: sayHai,
            seconds: sizeDoc(),
            caption: sayHai,
            jpegThumbnail: Buffer.alloc(0)
          }
        }
      },
      ftextt = {
        key: {
          participant: UserNum,
          remoteJid: UserJid
        },
        message: {
          extendedTextMessage: {
            text: sayHai,
            title: bottime,
            jpegThumbnail: Buffer.alloc(0)
          }
        }
      },
      fliveLoc = {
        key: {
          participant: UserNum,
          remoteJid: UserJid
        },
        message: {
          liveLocationMessage: {
            caption: sayHai,
            h: bottime,
            jpegThumbnail: Buffer.alloc(0)
          }
        }
      },
      ftoko = {
        key: {
          participant: UserNum,
          remoteJid: UserJid
        },
        message: {
          productMessage: {
            product: {
              productImage: {
                mimetype: "image/jpeg",
                jpegThumbnail: Buffer.alloc(0)
              },
              title: sayHai,
              description: bottime,
              currencyCode: "USD",
              priceAmount1000: sizeDoc(),
              retailerId: "Ghost",
              productImageCount: 1
            },
            businessOwnerJid: UserNum
          }
        }
      },
      fdocs = {
        key: {
          participant: UserNum,
          remoteJid: UserJid
        },
        message: {
          documentMessage: {
            title: sayHai,
            jpegThumbnail: Buffer.alloc(0)
          }
        }
      },
      AllKey = Randomizer([fdocs, {
        key: {
          participant: UserNum,
          remoteJid: UserJid
        },
        message: {
          videoMessage: {
            title: sayHai,
            h: sayHai,
            seconds: sizeDoc(),
            gifPlayback: !0,
            caption: bottime,
            jpegThumbnail: Buffer.alloc(0)
          }
        }
      }, fkontak, fliveLoc, fpayment, fpoll, fchan, ftextt, ftoko, ftroli, fvid, fvn]);
    global.fakes = AllKey;
  } catch (error) {
    console.error("Error:", error);
  }
}

function Randomizer(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function sapa() {
  return Randomizer(["Halo", "Hi", "Hai", "Yo", "Konnichiwa", "Salam", "Namaste", "Annyeonghaseyo", "Assalamualaikum", "Bonjour", "Olá", "Marhaba", "Selamat datang", "Good morning", "Konbanwa", "Sugeng enjing", "Halo teman", "Hello there", "Konnichiwa minna", "Salam sejahtera"]);
}

function sizeDoc() {
  return Math.pow(10, 15);
}

function pagi() {
  const waktunya = moment.tz("Asia/Makassar").format("HH");
  return waktunya >= 24 ? "Selamat Begadang 🗿" : waktunya >= 18 ? "Selamat malam 🌙" : waktunya >= 15 ? "Selamat sore 🌅" : waktunya > 10 ? "Selamat siang ☀️" : waktunya >= 4 ? "Selamat pagi 🌄" : "Selamat pagi 🗿";
}

function bussJid() {
  const Org = Randomizer([nomorown, "0", "628561122343", "6288906250517", "6282195322106", "6281119568305", "6281282722861", "6282112790446"]);
  return Randomizer([`${Org}@s.whatsapp.net`]);
}