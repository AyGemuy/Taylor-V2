import fetch from "node-fetch";
async function Chataibot(content) {
  try {
    const response = await fetch(
      "https://chataibot.ru/api/promo-chat/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "ru",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, seperti Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
          Referer: "https://chataibot.ru/app/free-chat",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: content,
            },
          ],
        }),
        compress: true,
      },
    );
    const { answer: result } = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.chataibot) db.data.dbai.chataibot = {};
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
    const answer = await Chataibot(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.chataibot[m.sender] = {
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
    !db.data.dbai.chataibot ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.chataibot)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.chataibot[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await Chataibot(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.chataibot[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["chataibot"];
handler.tags = ["ai"];
handler.command = /^(chataibot)$/i;
export default handler;
