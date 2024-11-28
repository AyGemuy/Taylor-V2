import fetch from "node-fetch";
async function AimusicLyrics(prompt) {
  const url = "https://aimusic.one/api/v3/lyrics/generator";
  const headers = {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
    Referer: "https://aimusic.one/ai-lyrics-generator",
  };
  const data = {
    description: prompt,
    style: "Auto",
    topic: "Auto",
    mood: "Auto",
    lan: "auto",
    isPublic: true,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result.lyrics;
  } catch (error) {
    console.error(error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.aimusiclyrics) db.data.dbai.aimusiclyrics = {};
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
    const answer = await AimusicLyrics(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.aimusiclyrics[m.sender] = {
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
    !db.data.dbai.aimusiclyrics ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.aimusiclyrics)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.aimusiclyrics[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await AimusicLyrics(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.aimusiclyrics[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["aimusiclyrics"];
handler.tags = ["ai"];
handler.command = /^(aimusiclyrics)$/i;
export default handler;
