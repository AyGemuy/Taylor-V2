import fetch from "node-fetch";
async function AnshariChat(message) {
  try {
    const url = "https://api.ansari.chat/api/v1/complete";
    const headers = {
      "Content-Type": "application/json",
      "User-Agent": "Postify/1.0.0",
      Referer: "https://ansari.chat/",
      Origin: "https://ansari.chat",
      "x-forwarded-for": new Array(4)
        .fill(0)
        .map(() => Math.floor(Math.random() * 256))
        .join("."),
    };
    const body = JSON.stringify({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.ansarichat) db.data.dbai.ansarichat = {};
  const inputText = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!inputText) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Jelaskan tentang Islam*`,
    );
  }
  m.react(wait);
  try {
    const answer = await AnshariChat(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.ansarichat[m.sender] = {
      key: {
        id: keyId,
      },
    };
    m.react(sukses);
  } catch (error) {
    console.error("Handler error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.dbai.ansarichat ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.ansarichat)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.ansarichat[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await AnshariChat(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.ansarichat[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["ansarichat"];
handler.tags = ["ai"];
handler.command = /^(ansarichat)$/i;
export default handler;
