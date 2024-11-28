import fetch from "node-fetch";
async function justAI(content) {
  try {
    const url = "https://gpt-playground.just-ai.com/api/completion";
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer null",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
      Referer:
        "https://gpt-playground.just-ai.com/chat/406f48b9-a2c6-4dc6-b838-6a48f222df9a",
    };
    const body = JSON.stringify({
      model: "gpt-3.5-turbo",
      temperature: 0.5,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      messages: [
        {
          role: "system",
          content: "You are a helpful AI chatbot.",
        },
        {
          role: "user",
          content: content,
        },
      ],
    });
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    const result = await response.text();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.justai) db.data.dbai.justai = {};
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
    const answer = await justAI(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.justai[m.sender] = {
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
  if (!db.data.dbai.justai || m.isBaileys || !(m.sender in db.data.dbai.justai))
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.justai[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await justAI(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.justai[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["justai"];
handler.tags = ["ai"];
handler.command = /^(justai)$/i;
export default handler;
