import fetch from "node-fetch";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.pinoygpt) db.data.dbai.pinoygpt = {};
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
    const answer = await PinoyGpt(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, answer, m);
    db.data.dbai.pinoygpt[m.sender] = {
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
  const session = db.data.dbai.pinoygpt?.[m.sender];
  if (
    !session ||
    m.isBaileys ||
    m.quoted?.id !== session.key.id ||
    !m.text.trim()
  )
    return;
  m.react(wait);
  try {
    const answer = await PinoyGpt(m.text.trim());
    const {
      key: { id: newKeyId },
    } = await conn.reply(m.chat, answer, m);
    db.data.dbai.pinoygpt[m.sender].key.id = newKeyId;
    m.react(sukses);
  } catch (error) {
    console.error("Handler before error:", error);
    m.react(eror);
  }
};
handler.help = ["pinoygpt"];
handler.tags = ["gpt"];
handler.command = /^(pinoygpt)$/i;
export default handler;
async function PinoyGpt(prompt) {
  try {
    const response1 = await fetch(
      "https://www.pinoygpt.com/wp-json/mwai/v1/start_session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
          Referer: "https://www.pinoygpt.com/#google_vignette",
        },
      },
    );
    const data1 = await response1.json();
    if (!data1.success) throw new Error("Failed to start session");
    const chatData = {
      botId: "default",
      customId: "e369e9665e1e4fa3fd0cdc970f31cf12",
      session: "N/A",
      chatId: "qrdd22c3t5c",
      contextId: 12,
      messages: [
        {
          id: "2a4z9ylw16j",
          role: "assistant",
          content: "Hi! How can I help you?",
          who: "AI: ",
          timestamp: Date.now(),
        },
      ],
      newMessage: prompt,
      newFileId: null,
      stream: true,
    };
    const response2 = await fetch(
      "https://www.pinoygpt.com/wp-json/mwai-ui/v1/chats/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": data1.restNonce,
          Accept: "text/event-stream",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
          Referer: "https://www.pinoygpt.com/#google_vignette",
        },
        body: JSON.stringify(chatData),
      },
    );
    const responseData2 = await response2.text();
    const lines = responseData2.trim().split("\n");
    const endIndex = lines.findIndex(
      (line) => line.indexOf('"type":"end"') !== -1,
    );
    return JSON.parse(
      endIndex !== -1 ? JSON.parse(lines[endIndex].slice(6)).data : null,
    ).reply;
  } catch (error) {
    console.error("PinoyGpt error:", error);
    throw new Error("Failed to get response from PinoyGpt");
  }
}
