import fetch from "node-fetch";
async function Chatify(content) {
  try {
    const url = "https://chatify-ai.vercel.app/api/chat";
    const headers = {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
      Referer: "https://chatify-ai.vercel.app/",
    };
    const body = JSON.stringify({
      messages: [
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
    const str = await response.text();
    const hasil = JSON.parse(
      '["' +
        str
          .split("\n")
          .map((s) => s.slice(3, -1))
          .join('","') +
        '"]',
    ).join("");
    return hasil;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.chatify) db.data.dbai.chatify = {};
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
    const answer = await Chatify(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.chatify[m.sender] = {
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
    !db.data.dbai.chatify ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.chatify)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.chatify[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await Chatify(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.chatify[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["chatify"];
handler.tags = ["ai"];
handler.command = /^(chatify)$/i;
export default handler;
