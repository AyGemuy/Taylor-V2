import fetch from "node-fetch";
async function Aoyo(content) {
  try {
    const response = await fetch("https://aoyo.ai/Api/AISearch/AISearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
        Referer: `https://aoyo.ai/search/?q=${content}&t=${Date.now()}`,
      },
      body: new URLSearchParams({
        content: content,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.text();
    const extractJson = (text) => {
      const startIndex = text.indexOf("[START]");
      if (startIndex === -1) throw new Error("[START] not found");
      return JSON.parse(text.substring(startIndex + 7).trim());
    };
    return extractJson(data)?.data?.Response || "No response";
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.aoyo) db.data.dbai.aoyo = {};
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
    const answer = await Aoyo(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.aoyo[m.sender] = {
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
  if (!db.data.dbai.aoyo || m.isBaileys || !(m.sender in db.data.dbai.aoyo))
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.aoyo[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await Aoyo(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.aoyo[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["aoyo"];
handler.tags = ["ai"];
handler.command = /^(aoyo)$/i;
export default handler;
