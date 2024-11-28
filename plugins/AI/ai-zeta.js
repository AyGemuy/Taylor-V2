import fetch from "node-fetch";
import { cleanHtml } from "../../lib/other-function.js";
async function Zeta(prompt, type = "dev") {
  const url = "https://vestia-zeta.vercel.app/api/chat";
  const headers = {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
    Referer:
      type === "dev"
        ? "https://vestia-zeta.vercel.app/about"
        : "https://vestia-zeta.vercel.app/",
  };
  const body =
    type === "dev"
      ? JSON.stringify({
          prompt: prompt,
          type: type,
        })
      : JSON.stringify({
          prompt: prompt,
        });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
      compress: true,
    });
    const data = await response.json();
    return cleanHtml(data?.message) || "No msg";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.zeta) db.data.dbai.zeta = {};
  const inputText = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!inputText) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  const type = command === "zetadev" ? "dev" : "";
  m.react(wait);
  try {
    const answer = await Zeta(inputText, type);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.zeta[m.sender] = {
      key: {
        id: keyId,
      },
      type: type,
    };
    m.react(sukses);
  } catch (error) {
    console.error("Handler error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (!db.data.dbai.zeta || m.isBaileys || !(m.sender in db.data.dbai.zeta))
    return;
  const {
    key: { id: keyId },
    type,
  } = db.data.dbai.zeta[m.sender];
  if (m.quoted?.id === keyId && type && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await Zeta(m.text.trim(), type);
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.zeta[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["zeta", "zetadev"];
handler.tags = ["ai"];
handler.command = /^(zeta|zetadev)$/i;
export default handler;
