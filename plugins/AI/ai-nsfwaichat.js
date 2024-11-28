import fetch from "node-fetch";
async function NsfwAiChat(content) {
  try {
    const requestBody = {
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
      visitorId: "81413071-e5e7-4b76-85a9-b3325f23d3ac",
      vccid: "66173308-3ee2-b419-3a4b-c34f70527b4a",
    };
    const response = await fetch(
      "https://api.nsfwaichat.com/chat/completions/visitor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer undefined",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
          Referer:
            "https://nsfwaichat.com/visitor-chats/54a3af30-3549-48cf-b7a6-d335c606e1d8",
        },
        body: JSON.stringify(requestBody),
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    const lines = data.split("\n").filter((line) => line && line !== "[DONE]");
    if (!lines.length) return "";
    return lines
      .slice(0, -1)
      .map((line) => {
        try {
          return JSON.parse(line.slice(5))?.choices?.[0]?.delta?.content || "";
        } catch {
          return "";
        }
      })
      .join("");
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.nsfwaichat) db.data.dbai.nsfwaichat = {};
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
    const answer = await NsfwAiChat(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.nsfwaichat[m.sender] = {
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
    !db.data.dbai.nsfwaichat ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.nsfwaichat)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.nsfwaichat[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await NsfwAiChat(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.nsfwaichat[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["nsfwaichat"];
handler.tags = ["ai"];
handler.command = /^(nsfwaichat)$/i;
export default handler;
