import fetch from "node-fetch";
async function BypassGpt(prompt) {
  const url = "https://finechatserver.erweima.ai/api/v1/projectGpts/chat";
  const headers = {
    "Content-Type": "application/json",
    uniqueId: `${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    "User-Agent": "Mozilla/5.0",
    Referer: "https://bypassgpt.co",
    "Accept-Encoding": "gzip, deflate",
  };
  const data = {
    prompt: prompt,
    attachments: [],
    source: "bypassgpt.co",
    sessionId: `${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    const responseBody = await response.text();
    const lines = responseBody.split("\n").slice(0, -1);
    const messages = lines.map((line) => {
      try {
        const jsonData = JSON.parse(line);
        return jsonData.data.message;
      } catch (error) {
        return "";
      }
    });
    const message = messages.join("");
    return message;
  } catch (error) {
    console.error(error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.bypassgpt) db.data.dbai.bypassgpt = {};
  const inputText = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!inputText) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  m.react(wait);
  try {
    const answer = await BypassGpt(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.bypassgpt[m.sender] = {
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
    !db.data.dbai.bypassgpt ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.bypassgpt)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.bypassgpt[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await BypassGpt(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.bypassgpt[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["bypassgpt"];
handler.tags = ["ai"];
handler.command = /^(bypassgpt)$/i;
export default handler;
