import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
import {
  webp2png
} from "../../lib/webp2mp4.js";
import {
  Sticker,
  StickerTypes
} from "wa-sticker-formatter";
import {
  sticker
} from "../../lib/sticker.js";
import axios from "axios";
const handler = async (m, {
  conn,
  args,
  text,
  usedPrefix,
  command
}) => {
  let q = m.quoted || m,
    mime = q.mimetype || "";
  if (/video/g.test(mime) && q.seconds > 11) return m.reply("Maksimal 10 detik!");
  if (!/webp|image|video|gif|viewOnce/g.test(mime)) return m.reply(`Reply Media dengan perintah\n\n${usedPrefix + command} input text`);
  m.react(wait);
  let img = await q?.download(),
    who = m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender),
    name = conn.getName(who),
    pp = await conn.profilePictureUrl(m.sender, "image").catch(() => logo),
    reply = m.quoted ? {
      name: conn.getName(m.quoted?.sender),
      text: m.quoted?.caption || "",
      id: m.chat?.split("@")[0]
    } : null;
  if (!(text = text || m.quoted?.caption || "")) throw "Input teks atau reply teks yang ingin dijadikan quote!";
  let theme = "quotlyimg" === command ? "terang" : "quotlyimgv2" === command ? "gelap" : "random",
    urls = /webp/g.test(mime) ? await QuotlyImg(await webp2png(img), name, pp, text, theme, reply) : /image/g.test(mime) ? await QuotlyImg(await uploadImage(img), name, pp, text, theme, reply) : await QuotlyImg(await uploadFile(img), name, pp, text, theme, reply),
    out = await createSticker(urls, packname, name, 60);
  if (!out) throw new Error("Error generating sticker");
  m.reply(out);
};
handler.help = ["quotlyimg", "quotlyimgv2", "quotlyimgv3"], handler.tags = ["sticker"],
  handler.command = /^(quotlyimg|quotlyimgv2|quotlyimgv3)$/i;
export default handler;
async function QuotlyImg(url, name, pp, text, theme, reply) {
  const obj = {
    type: "quote",
    format: "png",
    backgroundColor: "terang" === theme ? "#ffffff" : "gelap" === theme ? "#1b1429" : `#${[ ...Array(3) ].map(() => Math.floor(200 * Math.random()).toString(16).padStart(2, "0")).join("")}`,
    width: 512,
    height: 768,
    scale: 2,
    messages: [{
      entities: [],
      media: {
        url: `https://wsrv.nl/?url=${url}&output=png`
      },
      avatar: !0,
      from: {
        id: 1,
        name: name,
        photo: {
          url: pp
        }
      },
      text: text,
      replyMessage: reply || {}
    }]
  };
  try {
    const response = await axios.post("https://quote.btch.bz/generate", obj, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return Buffer.from(response.data?.result?.image, "base64");
  } catch (e) {
    const fallbackResponse = await axios.post("https://quotly.netorare.codes/generate", obj, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return Buffer.from(fallbackResponse.data?.result?.image, "base64");
  }
}
async function createSticker(url, packName, authorName, quality) {
  const stickerMetadata = {
    type: StickerTypes.FULL,
    pack: packName,
    author: authorName,
    quality: quality
  };
  return new Sticker(url, stickerMetadata).toBuffer();
}