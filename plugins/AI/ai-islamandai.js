import fetch from "node-fetch";
async function IslamAndAIChat(message) {
  try {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: atob(
        "QmVhcmVyIHNrLU9VOEM4ZFl1eVZUUWRuVG9qVnRtV3lleU5rUUlNd1drRnpsajc3a3JZcVQzQmxia0ZKazZycW54U0lqa0lUT1VpLWxCTG9DejhseHpQT203cmZzZFFHMTZ2OUVB",
      ),
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
      Referer: "https://islamandai.com/chat",
      Origin: "https://islamandai.com",
      "x-forwarded-for": new Array(4)
        .fill(0)
        .map(() => Math.floor(Math.random() * 256))
        .join("."),
    };
    const body = JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `The following is a conversation with an Islam-focused AI assistant. This assistant is strictly dedicated to matters concerning Islam, including Quranic verses, Hadiths, and events related to Islamic History. It should provide detailed and accurate responses, citing Quranic verses and Hadiths in Arabic, formatted in quotes and on separate lines for clarity.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.3,
      max_tokens: 1024,
    });
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    const data = await response.json();
    return data.choices[0]?.message.content || "No msg";
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.islamandai) db.data.dbai.islamandai = {};
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
    const answer = await IslamAndAIChat(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.islamandai[m.sender] = {
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
    !db.data.dbai.islamandai ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.islamandai)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.islamandai[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await IslamAndAIChat(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.islamandai[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["islamandai"];
handler.tags = ["ai"];
handler.command = /^(islamandai)$/i;
export default handler;
