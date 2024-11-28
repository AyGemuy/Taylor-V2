import fetch from "node-fetch";
async function Ai4Chat(prompt) {
  const url = new URL(
    "https://yw85opafq6.execute-api.us-east-1.amazonaws.com/default/boss_mode_15aug",
  );
  url.search = new URLSearchParams({
    text: prompt,
    country: "Asia",
    user_id: "IWgCVHgf4N",
  }).toString();
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
        Referer: "https://www.ai4chat.co/pages/riddle-generator",
      },
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return JSON.parse(await response.text());
  } catch (error) {
    console.error(error);
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.ai4chat) db.data.dbai.ai4chat = {};
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
    const answer = await Ai4Chat(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.ai4chat[m.sender] = {
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
    !db.data.dbai.ai4chat ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.ai4chat)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.ai4chat[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await Ai4Chat(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.ai4chat[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["ai4chat"];
handler.tags = ["ai"];
handler.command = /^(ai4chat)$/i;
export default handler;
