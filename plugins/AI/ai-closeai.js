import fetch from "node-fetch";
import crypto from "crypto";
const API_BASE = [
  "https://api.closeai-proxy.xyz",
  "https://api.openai-proxy.live",
];
const API_KEY = "sk-zaTFbMjIUsKv23JlrhbyYdJG6A9gNOK2G713GvoZ0TBRkfI3";
const MODEL_3_5 = "gpt-3.5-turbo";
const MODEL_4 = "gpt-4";
const fetchCompletion = async (model, messages, useSecondAPI = false) => {
  const url = useSecondAPI ? API_BASE[1] : API_BASE[0];
  try {
    const response = await fetch(`${url}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: model,
        stream: true,
        temperature: 0,
        top_p: 0,
        messages: messages,
      }),
    });
    const decodedData = await response.text();
    return decodedData
      .split("\n")
      .filter((line) => "" !== line.trim())
      .map((line) => line.replace("data: ", ""))
      .slice(0, -1)
      .map((item) => JSON.parse(item))
      .map((v) => v.choices[0]?.delta.content)
      .join("");
  } catch (error) {
    throw new Error("Fetch completion failed: " + error.message);
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.closeai) db.data.dbai.closeai = {};
  const session = db.data.dbai.closeai[m.sender];
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
    const messages = [
      {
        role: "system",
        content:
          "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?",
      },
      {
        role: "user",
        content: inputText,
      },
    ];
    const result = await fetchCompletion(MODEL_3_5, messages);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, result, m);
    db.data.dbai.closeai[m.sender] = {
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
    !db.data.dbai.closeai ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.closeai)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.closeai[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const messages = [
        {
          role: "system",
          content:
            "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?",
        },
        {
          role: "user",
          content: m.text.trim(),
        },
      ];
      const result = await fetchCompletion(MODEL_3_5, messages, true);
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, result, m);
      db.data.dbai.closeai[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["closeai"];
handler.tags = ["internet", "ai", "gpt"];
handler.command = /^(closeai)$/i;
export default handler;
