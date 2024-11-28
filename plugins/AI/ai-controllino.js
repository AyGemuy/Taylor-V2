import fetch from "node-fetch";
async function startSession() {
  try {
    const url = "https://www.controllino.ai/wp-json/mwai/v1/start_session";
    const headers = {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
      Referer: "https://www.controllino.ai/",
    };
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    const nonce = data.restNonce;
    return nonce;
  } catch (error) {
    console.error("Error fetching session:", error.message);
    return null;
  }
}
async function ControllinoChat(newMessage) {
  try {
    const nonce = await startSession();
    if (!nonce) throw new Error("Failed to get nonce");
    const url = "https://www.controllino.ai/wp-json/mwai-ui/v1/chats/submit";
    const headers = {
      "Content-Type": "application/json",
      "X-WP-Nonce": nonce,
      Accept: "text/event-stream",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
      Referer: "https://www.controllino.ai/",
    };
    const body = JSON.stringify({
      botId: "chatbot-g65ss4",
      customId: null,
      session: "N/A",
      chatId: "47ul0pvsrt",
      contextId: 16400,
      messages: [],
      newMessage: newMessage,
      newFileId: null,
      stream: false,
    });
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const result = await response.json();
    return result.reply || "No msg";
  } catch (error) {
    console.error("Error:", error.message);
    return "Error occurred";
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.controllino) db.data.dbai.controllino = {};
  const inputText = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!inputText) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Buat loop dalam JavaScript*`,
    );
  }
  m.react(wait);
  try {
    const answer = await ControllinoChat(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.controllino[m.sender] = {
      key: {
        id: keyId,
      },
    };
    m.react(sukses);
  } catch (error) {
    console.error("Handler error:", error.message);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.dbai.controllino ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.controllino)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.controllino[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await ControllinoChat(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.controllino[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error.message);
      m.react(eror);
    }
  }
};
handler.help = ["controllino"];
handler.tags = ["ai"];
handler.command = /^(controllino)$/i;
export default handler;
