import fetch from "node-fetch";
async function Lenna(content) {
  const url = "https://v3.lenna.ai/app/public/api/negxZa/webhook/webchat";
  const payload = {
    senderId: "ADE3Pz",
    message: {
      temporary_id: Date.now().toString(),
      id: Date.now().toString(),
      messageable_id: 5945615,
      messageable_type: "user",
      created_at: null,
      content: [
        {
          type: "text",
          text: content,
          speech: content,
        },
      ],
    },
    events: "message",
    integrationId: "PdR7Oe",
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "X-LENNA-WEBCHAT": "noNL/5yySRsW9tugZfOM3WxTZTum59GvwUrUh3FvDec=",
        "X-LENNA-ROBOT": "vSaaWvqDtfod4USiM7agLg==",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
        Referer: "https://lenna.ai/",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return (
      result.data.bot.message.original.data.message.content[0].text ||
      data.bot.message.original.data.message.content.nlp[0].text ||
      "No response"
    );
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.lenna) db.data.dbai.lenna = {};
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
    const answer = await Lenna(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.lenna[m.sender] = {
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
  if (!db.data.dbai.lenna || m.isBaileys || !(m.sender in db.data.dbai.lenna))
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.lenna[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await Lenna(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.lenna[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["lenna"];
handler.tags = ["ai"];
handler.command = /^(lenna)$/i;
export default handler;
