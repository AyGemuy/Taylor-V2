import axios from "axios";
import {
  sticker
} from "../../lib/sticker.js";
import wibusoft from "wibusoft";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  let who = m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender),
    name = conn.getName(who),
    reply = m.quoted ? {
      name: conn.getName(m.quoted?.sender),
      text: m.quoted?.text || "",
      id: m.chat?.split("@")[0]
    } : null;
  if (!(text = text || m.quoted?.text)) throw "Input teks atau reply teks yang ingin dijadikan quote!";
  m.react(wait);
  let pp = await conn.profilePictureUrl(m.sender, "image").catch(() => logo),
    theme = "quotly" === command ? "terang" : "quotlyv2" === command ? "gelap" : "random",
    result = await Quotly(name, pp, text, theme, reply);
  try {
    let out = await wibusoft.tools.makeSticker(result, {
      author: packname,
      pack: name,
      keepScale: !0
    });
    m.reply(out);
  } catch (e) {
    let stick = await sticker(result, !1, name, packname);
    await conn.sendFile(m.chat, stick, "Quotly.webp", "", m);
  }
};
handler.help = ["quotly", "quotlyv2", "quotlyv3"], handler.tags = ["sticker"],
  handler.command = /^(quotly|quotlyv2|quotlyv3)$/i;
export default handler;
async function Quotly(name, photoUrl, text, theme, reply) {
  const obj = {
    type: "quote",
    format: "png",
    backgroundColor: "terang" === theme ? "#ffffff" : "gelap" === theme ? "#1b1429" : `#${[ ...Array(3) ].map(() => Math.floor(200 * Math.random()).toString(16).padStart(2, "0")).join("")}`,
    width: 512,
    height: 768,
    scale: 2,
    messages: [{
      entities: [],
      avatar: !0,
      from: {
        id: 1,
        name: name,
        photo: {
          url: photoUrl
        }
      },
      text: text,
      ...reply ? {
        replyMessage: reply
      } : {}
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
    console.error("Quotly Error:", e);
    try {
      const fallbackResponse = await axios.post("https://quotly.netorare.codes/generate", obj, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      return Buffer.from(fallbackResponse.data?.result?.image, "base64");
    } catch (e) {
      throw console.error("Quotly Error (Backup):", e), new Error("Error generating quote image");
    }
  }
}