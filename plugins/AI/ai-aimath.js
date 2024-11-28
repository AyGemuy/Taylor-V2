import fetch from "node-fetch";
async function AiMath(prompt) {
  const url = "https://aimathgpt.forit.ai/api/ai";
  const headers = {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
    Referer: "https://aimathgpt.forit.ai/#pricing",
    "Accept-Encoding": "gzip, deflate",
  };
  const data = {
    messages: [
      {
        role: "system",
        content:
          "You are an expert math tutor. For each question, provide: 1) A clear, step-by-step problem-solving approach. 2) A concise explanation of the underlying concepts. 3) One follow-up question to deepen understanding. 4) A helpful tip or common pitfall to watch out for. Keep your responses clear and concise.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3",
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    return (await response.json())?.result?.response;
  } catch (error) {
    console.error(error);
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.aimath) db.data.dbai.aimath = {};
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
    const answer = await AiMath(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.aimath[m.sender] = {
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
  if (!db.data.dbai.aimath || m.isBaileys || !(m.sender in db.data.dbai.aimath))
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.aimath[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await AiMath(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.aimath[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["aimath"];
handler.tags = ["ai"];
handler.command = /^(aimath)$/i;
export default handler;
