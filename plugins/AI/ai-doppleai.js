import fetch from "node-fetch";
async function DoppleAi(prompt) {
  const url = "https://beta.dopple.ai/api/messages/send";
  const headers = {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
    Referer: "https://beta.dopple.ai/messages",
  };
  const body = JSON.stringify({
    streamMode: "none",
    chatId: "632cef078c294913b5b4653869eca845",
    folder: "",
    images: false,
    username: "mn0uvp2fhv",
    persona_name: "",
    id: "46db0561-cb3e-43d9-8f50-40b3e3c84713",
    userQuery: prompt,
  });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error:", error);
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.doppleai) db.data.dbai.doppleai = {};
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
    const answer = await DoppleAi(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.doppleai[m.sender] = {
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
  if (
    !db.data.dbai.doppleai ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.doppleai)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.doppleai[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await DoppleAi(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.doppleai[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["doppleai"];
handler.tags = ["ai"];
handler.command = /^(doppleai)$/i;
export default handler;
