import fetch from "node-fetch";
const baseURL = "https://api.prefind.ai/api";
const headers = {
  Accept: "application/json, text/plain, */*",
  Referer: "https://www.prefind.ai/",
  "User-Agent": "Postify/1.0.0",
  "Accept-Language":
    "id-MM,id;q=0.9,ms-MM;q=0.8,ms;q=0.7,en-MM;q=0.6,en;q=0.5,es-MX;q=0.4,es;q=0.3,fil-PH;q=0.2,fil;q=0.1,id-ID;q=0.1,en-US;q=0.1",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
  "Content-Type": "application/json",
  Origin: "https://www.prefind.ai",
  Accept: "text/event-stream",
};
const extractData = (input) => {
  return input
    .split("\n")
    .filter(
      (line) => line.startsWith("data: ") && line.includes('"type":"chunk"'),
    )
    .map((line) => {
      try {
        const { chunk } = JSON.parse(line.substring(6).trim());
        return chunk?.content || "";
      } catch {
        return "";
      }
    })
    .join("")
    .trim();
};
const prefindAI = async (url, method, data = {}) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: method === "POST" ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.text();
    return JSON.parse(result);
  } catch (error) {
    console.error("❌ Error: " + error.message);
    throw error;
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  db.data.dbai.prefindchat = db.data.dbai.prefindchat || {};
  const session = db.data.dbai.prefindchat[m.sender] || {};
  const inputText = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!inputText) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  m.react("wait");
  try {
    const tokenData = await prefindAI(
      `${baseURL}/auth/device-token/create`,
      "POST",
    );
    const response = await fetch(`${baseURL}/search/v1`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        query: inputText,
        deviceToken: tokenData.sessionToken,
      }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const answer = extractData(await response.text());
    if (answer) {
      const {
        key: { id: keyId },
      } = await conn.reply(m.chat, answer.trim(), m);
      db.data.dbai.prefindchat[m.sender] = {
        key: {
          id: keyId,
        },
      };
      m.react("sukses");
    } else {
      m.react("error");
    }
  } catch (error) {
    console.error("Handler error:", error);
    m.react("error");
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.dbai.prefindchat ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.prefindchat)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.prefindchat[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react("wait");
    try {
      const tokenData = await prefindAI(
        `${baseURL}/auth/device-token/create`,
        "POST",
      );
      const response = await fetch(`${baseURL}/search/v1`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          query: m.text.trim(),
          deviceToken: tokenData.sessionToken,
        }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const answer = extractData(await response.text());
      if (answer) {
        const {
          key: { id: newKeyId },
        } = await conn.reply(m.chat, answer.trim(), m);
        db.data.dbai.prefindchat[m.sender].key.id = newKeyId;
        m.react("sukses");
      } else {
        m.react("error");
      }
    } catch (error) {
      console.error("Handler before error:", error);
      m.react("error");
    }
  }
};
handler.help = ["prefindai"];
handler.tags = ["owner"];
handler.command = /^(prefindai)$/i;
export default handler;
