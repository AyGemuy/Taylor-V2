import fetch from "node-fetch";
import crypto from "crypto";
const generateUid = () => crypto.randomUUID();
async function Leingpt(content, conversationId) {
  try {
    const response = await fetch(
      "https://leingpt.ru/backend-api/v2/conversation",
      {
        method: "POST",
        headers: {
          Accept: "text/event-stream",
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
          Referer: "https://leingpt.ru/chat/",
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          action: "_ask",
          model: "gemini-1.5-pro-exp-0801",
          jailbreak: "Обычный",
          tonegpt: "Balanced",
          streamgen: false,
          web_search: false,
          rolej: "default",
          meta: {
            id: parseInt(conversationId),
            content: {
              conversation: [],
              content_type: "text",
              parts: [
                {
                  content: content,
                  role: "user",
                },
              ],
            },
          },
        }),
        compress: true,
      },
    );
    const data = await response.text();
    return data || "No answer received.";
  } catch (error) {
    console.error("Error:", error);
    return "Terjadi kesalahan saat memproses permintaan.";
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.leingpt) db.data.dbai.leingpt = {};
  const inputText = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!inputText) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  const userId = m.sender;
  if (!db.data.dbai.leingpt[userId]) {
    db.data.dbai.leingpt[userId] = {
      conversation_id: generateUid(),
    };
  }
  const { conversation_id } = db.data.dbai.leingpt[userId];
  m.react(wait);
  try {
    const answer = await Leingpt(inputText, conversation_id);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, answer, m);
    db.data.dbai.leingpt[userId].key = {
      id: keyId,
    };
    m.react(sukses);
  } catch (error) {
    console.error("Handler error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.dbai.leingpt ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.leingpt)
  )
    return;
  const userId = m.sender;
  const { conversation_id, key } = db.data.dbai.leingpt[userId];
  if (m.quoted?.id === key?.id && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await Leingpt(m.text.trim(), conversation_id);
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, answer, m);
      db.data.dbai.leingpt[userId].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["leingpt"];
handler.tags = ["ai"];
handler.command = /^(leingpt)$/i;
export default handler;
