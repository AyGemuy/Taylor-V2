import fetch from "node-fetch";
async function SkyByte(prompt) {
  const url = "https://chat1.lnf2.skybyte.me/api/chat-process";
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
    Referer: "https://chat1.lnf2.skybyte.me/#/chat/1002",
  };
  const body = JSON.stringify({
    prompt: prompt,
    options: {},
    systemMessage:
      "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.",
    temperature: 0.8,
    top_p: 1,
  });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    return (await response.text())
      .trim()
      .split("\n")
      .map((msg) => JSON.parse(msg)?.detail.choices[0]?.delta?.content)
      .join("");
  } catch (error) {
    console.error("Error in chatProcess:", error);
    throw error;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.skybyte) db.data.dbai.skybyte = {};
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
    const answer = await SkyByte(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.skybyte[m.sender] = {
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
    !db.data.dbai.skybyte ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.skybyte)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.skybyte[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await SkyByte(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.skybyte[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["skybyte"];
handler.tags = ["ai"];
handler.command = /^(skybyte)$/i;
export default handler;
