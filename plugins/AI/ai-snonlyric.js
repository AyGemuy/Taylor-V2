import fetch from "node-fetch";
async function SnonLyric(
  value = {
    value: "Compose lyrics about the changing seasons",
    themeValue: "Random",
    langValue: "en",
    styleValue: "Random",
    moodValue: "Random",
  },
) {
  try {
    const url = "https://www.snonlyric.com/api/lyric";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Origin: "https://www.snonlyric.com",
        Referer: "https://www.snonlyric.com/en",
        "User-Agent": "Postify/1.0.0",
      },
      body: JSON.stringify(value),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.snonlyric) db.data.dbai.snonlyric = {};
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
    const answer = await SnonLyric(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.snonlyric[m.sender] = {
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
    !db.data.dbai.snonlyric ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.snonlyric)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.snonlyric[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await SnonLyric(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.snonlyric[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["snonlyric"];
handler.tags = ["ai"];
handler.command = /^(snonlyric)$/i;
export default handler;
