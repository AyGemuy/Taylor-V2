import fetch from "node-fetch";
async function Zaiwen(message) {
  try {
    const response = await fetch("https://aliyun.zaiwen.top/admin/chatbot", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
        Referer: "https://www.zaiwen.top/#/chat",
      },
      body: JSON.stringify({
        message: [
          {
            role: "user",
            content: message,
          },
        ],
        mode: "gpt4_o_mini",
        key: null,
      }),
    });
    return await response.text();
  } catch (error) {
    console.error("Error in chatBot:", error);
    throw error;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.zaiwen) db.data.dbai.zaiwen = {};
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
    const answer = await Zaiwen(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.zaiwen[m.sender] = {
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
  if (!db.data.dbai.zaiwen || m.isBaileys || !(m.sender in db.data.dbai.zaiwen))
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.zaiwen[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await Zaiwen(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.zaiwen[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["zaiwen"];
handler.tags = ["ai"];
handler.command = /^(zaiwen)$/i;
export default handler;
