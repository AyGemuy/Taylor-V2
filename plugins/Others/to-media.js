import {
  sticker
} from "../../lib/sticker.js";
import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
import {
  webp2png
} from "../../lib/webp2mp4.js";
import fetch from "node-fetch";
import PDFDocument from "pdfkit";
import {
  Writable
} from "stream";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if ("towebp" === command) {
    let q = m.quoted ? m.quoted : m;
    if (!((q.msg || q).mimetype || "")) throw `balas gambar dengan perintah\n\n${usedPrefix + command}`;
    let img = await q?.download(),
      url = await uploadImage(img),
      res = `https://api.lolhuman.xyz/api/convert/towebp?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&img=${url}`;
    await conn.sendFile(m.chat, res, "out.webp", m, !1, {
      mimetype: "image/webp",
      thumbnail: Buffer.alloc(0)
    });
  }
  if ("towebpr" === command) {
    let q = m.quoted ? m.quoted : m;
    if (!((q.msg || q).mimetype || "")) throw `balas gambar dengan perintah\n\n${usedPrefix + command}`;
    let img = await q?.download(),
      url = await uploadImage(img),
      res = `https://api.lolhuman.xyz/api/convert/towebpwround?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&img=${url}`;
    await conn.sendFile(m.chat, res, "out.webp", m, !1, {
      mimetype: "image/webp",
      thumbnail: Buffer.alloc(0)
    });
  }
  if ("webptogif" === command) {
    let q = m.quoted ? m.quoted : m;
    if (!((q.msg || q).mimetype || "")) throw `balas gambar dengan perintah\n\n${usedPrefix + command}`;
    let img = await q?.download(),
      res = `https://api.lolhuman.xyz/api/convert/webptogif?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&img=${img}`;
    await conn.sendFile(m.chat, res, "out.gif", m, !1, {
      mimetype: "image/gif",
      thumbnail: Buffer.alloc(0)
    });
  }
  if ("webptomp4" === command) {
    let q = m.quoted ? m.quoted : m;
    if (!((q.msg || q).mimetype || "")) throw `balas gambar dengan perintah\n\n${usedPrefix + command}`;
    let img = await q?.download(),
      res = `https://api.lolhuman.xyz/api/convert/webptomp4?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&img=${img}`;
    await conn.sendFile(m.chat, res, "out.mp4", m, !1, {
      mimetype: "video/mp4",
      thumbnail: Buffer.alloc(0)
    });
  }
  if ("imgtopdf" === command) {
    let q = m.quoted ? m.quoted : m;
    if (!((q.msg || q).mimetype || "")) throw `balas gambar dengan perintah\n\n${usedPrefix + command}`;
    let img = await q?.download(),
      res = await convertImageToPDF(img);
    await conn.sendMessage(m.chat, {
      document: res,
      mimetype: "application/pdf",
      fileName: `For ${m.name}.pdf`
    }, {
      quoted: m
    });
  }
  if ("topng" === command) {
    let q = m.quoted ? m.quoted : m;
    if (!((q.msg || q).mimetype || "")) throw `balas gambar dengan perintah\n\n${usedPrefix + command}`;
    let img = await q?.download(),
      res = `https://api.lolhuman.xyz/api/convert/topng?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&img=${img}`;
    await conn.sendFile(m.chat, res, "out.png", m, !1, {
      mimetype: "image/png",
      thumbnail: Buffer.alloc(0)
    });
  }
  if ("tobase64" === command) {
    let q = m.quoted ? m.quoted : m;
    if (!((q.msg || q).mimetype || "")) throw `balas gambar dengan perintah\n\n${usedPrefix + command}`;
    let img = await q?.download(),
      res = `https://api.lolhuman.xyz/api/filetobase64?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&file=${img}`;
    await conn.sendFile(m.chat, res, "Hasil", "", m);
  }
  if ("64tofile" === command) {
    if (!text) throw `balas gambar dengan perintah\n\n${usedPrefix + command} base64`;
    let res = `https://api.lolhuman.xyz/api/base64tofile?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&base=${text}`;
    await conn.sendFile(m.chat, res, "Hasil", "", m);
  }
  if ("urltoimg" === command) {
    if (!text) throw `balas gambar dengan perintah\n\n${usedPrefix + command} url`;
    let res = `https://api.lolhuman.xyz/api/urltoimg?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${text}`;
    await conn.sendFile(m.chat, res, "out.jpeg", m, !1, {
      mimetype: "image/jpeg",
      thumbnail: Buffer.alloc(0)
    });
  }
  if ("filetourl" === command) {
    let q = m.quoted ? m.quoted : m;
    if (!((q.msg || q).mimetype || "")) throw `balas gambar dengan perintah\n\n${usedPrefix + command}`;
    let img = await q?.download(),
      res = await fetch(`https://api.lolhuman.xyz/api/filetourl?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&file=${img}`),
      rem = (await res.json()).result;
    m.reply(`*Result:* ${rem}`);
  }
  if ("emorse" === command) {
    if (!text) throw `balas gambar dengan perintah\n\n${usedPrefix + command} text`;
    let res = await fetch(`https://api.lolhuman.xyz/api/morse/encrypt?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&text=${text}`),
      rem = (await res.json()).result;
    m.reply(`*Result:* ${rem}`);
  }
  if ("dmorse" === command) {
    if (!text) throw `balas gambar dengan perintah\n\n${usedPrefix + command} kode morse`;
    let res = await fetch(`https://api.lolhuman.xyz/api/morse/decrypt?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&text=${text}`),
      rem = (await res.json()).result;
    m.reply(`*Result:* ${rem}`);
  }
  if ("emojimix3" === command) {
    if (!text) throw `perintah\n\n${usedPrefix + command} 😱 + 😳`;
    let urut = text.split`+`,
      res = `https://api.lolhuman.xyz/api/emojimix/${urut[0]}+${urut[1]}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`,
      stiker = await sticker(!1, res, packname, author);
    await conn.sendFile(m.chat, stiker, "sticker.webp", "", m);
  }
  if ("smojimg" === command) {
    !text && m.quoted && m.quoted?.text && (text = m.quoted?.text);
    let res = `https://api.lolhuman.xyz/api/smoji/${text}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`;
    await conn.sendFile(m.chat, res, "out.jpeg", m, !1, {
      mimetype: "image/jpeg",
      thumbnail: Buffer.alloc(0)
    });
  }
  if ("smojimg2" === command) {
    if (!text) throw `balas gambar dengan perintah\n\n${usedPrefix + command} emoji`;
    let res = await fetch(`https://api.lolhuman.xyz/api/smoji3/${text}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`),
      x = (await res.json()).result;
    const sections = [{
        title: "Theme",
        rows: [{
          title: "apple",
          rowId: `${usedPrefix}get ${x.emoji.apple}`
        }, {
          title: "au_by_kddi",
          rowId: `${usedPrefix}get ${x.emoji.au_by_kddi}`
        }, {
          title: "docomo",
          rowId: `${usedPrefix}get ${x.emoji.docomo}`
        }, {
          title: "emojidex",
          rowId: `${usedPrefix}get ${x.emoji.emojidex}`
        }, {
          title: "facebook",
          rowId: `${usedPrefix}get ${x.emoji.facebook}`
        }, {
          title: "google",
          rowId: `${usedPrefix}get ${x.emoji.google}`
        }, {
          title: "htc",
          rowId: `${usedPrefix}get ${x.emoji.htc}`
        }, {
          title: "joypixels",
          rowId: `${usedPrefix}get ${x.emoji.joypixels}`
        }, {
          title: "lg",
          rowId: `${usedPrefix}get ${x.emoji.lg}`
        }, {
          title: "messenger",
          rowId: `${usedPrefix}get ${x.emoji.messenger}`
        }, {
          title: "microsoft",
          rowId: `${usedPrefix}get ${x.emoji.microsoft}`
        }, {
          title: "mozilla",
          rowId: `${usedPrefix}get ${x.emoji.mozilla}`
        }, {
          title: "noto_emoji",
          rowId: `${usedPrefix}get ${x.emoji.noto_emoji}`
        }, {
          title: "openmoji",
          rowId: `${usedPrefix}get ${x.emoji.openmoji}`
        }, {
          title: "samsung",
          rowId: `${usedPrefix}get ${x.emoji.samsung}`
        }, {
          title: "skype",
          rowId: `${usedPrefix}get ${x.emoji.skype}`
        }, {
          title: "softbank",
          rowId: `${usedPrefix}get ${x.emoji.softbank}`
        }, {
          title: "sony_playstation",
          rowId: `${usedPrefix}get ${x.emoji.sony_playstation}`
        }, {
          title: "twitter",
          rowId: `${usedPrefix}get ${x.emoji.twitter}`
        }, {
          title: "whatsapp",
          rowId: `${usedPrefix}get ${x.emoji.whatsapp}`
        }]
      }],
      listMessage = {
        text: `⚡ Silakan pilih tema di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footer: wm,
        title: `⎔───「 ${command} 」───⎔`,
        buttonText: "☂️ Tema Disini ☂️",
        sections: sections
      };
    conn.sendMessage(m.chat, listMessage, fdoc);
  }
};
handler.command = handler.help = ["64tofile", "dmorse", "emojimix3", "emorse", "filetourl", "imgtopdf", "smojimg", "smojimg2", "tobase64", "topng", "towebp", "towebpr", "urltoimg", "webptogif", "webptomp4"],
  handler.tags = ["tools"];
export default handler;
async function convertImageToPDF(imageBuffer) {
  return new Promise((resolve, reject) => {
    const pdfDoc = new PDFDocument(),
      buffers = [],
      writableStream = new Writable({
        write(chunk, encoding, callback) {
          buffers.push(chunk), callback();
        }
      });
    pdfDoc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    }), pdfDoc.on("error", error => {
      reject(error);
    }), pdfDoc.image(imageBuffer), pdfDoc.end(), writableStream.on("error", error => {
      reject(error);
    }), pdfDoc.pipe(writableStream);
  });
}