import fetch from "node-fetch";
async function AcloudAi(options) {
  try {
    const payload = {
      model: "gemini-pro",
      messages: options?.messages,
      temperature: options?.temperature || 0.9,
      top_p: options?.top_p || 0.7,
      top_k: options?.top_k || 40,
    };
    if (!payload.messages) throw new Error("Missing messages input payload!");
    if (!Array.isArray(payload.messages))
      throw new Error("invalid array in messages input payload!");
    if (isNaN(payload.top_p))
      throw new Error("Invalid number in top_p payload!");
    if (isNaN(payload.top_k))
      throw new Error("Invalid number in top_k payload!");
    const response = await fetch("https://api.acloudapp.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "sk-9jL26pavtzAHk9mdF0A5AeAfFcE1480b9b06737d9eC62c1e",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!data.choices[0]?.message?.content)
      throw new Error("failed to get response message!");
    return {
      success: true,
      answer: data.choices[0]?.message.content,
    };
  } catch (e) {
    return {
      success: false,
      errors: [e.message],
    };
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.acloud) db.data.dbai.acloud = {};
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
    const answer = await AcloudAi({
      messages: [
        {
          role: "user",
          content: inputText,
        },
      ],
    });
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer.answer}`, m);
    db.data.dbai.acloud[m.sender] = {
      key: {
        id: keyId,
      },
    };
    m.react(sukses);
  } catch (error) {
    console.error("Handler " + command + " error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (!db.data.dbai.acloud || m.isBaileys || !(m.sender in db.data.dbai.acloud))
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.acloud[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await AcloudAi({
        messages: [
          {
            role: "user",
            content: m.text.trim(),
          },
        ],
      });
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer.answer}`, m);
      db.data.dbai.acloud[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["acloudai"];
handler.tags = ["ai"];
handler.command = /^(acloudai)$/i;
export default handler;
