import fetch from "node-fetch";
async function SunoPrompt(prompt) {
  try {
    const response = await fetch("https://sunoprompt.com/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
        Referer: "https://sunoprompt.com/",
      },
      body: JSON.stringify({
        userPrefer:
          prompt ||
          "User music Preference: Indonesian song, Theme: Fantasy, Theme: Fantasy, Lyrics Language: Jawa(Javanese), Lyrics Style: Humorous, Mood: Romantic, Style/Genre: Pop",
        task: "Lyrics",
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.sunoprompt) db.data.dbai.sunoprompt = {};
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
    const answer = await SunoPrompt(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.sunoprompt[m.sender] = {
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
    !db.data.dbai.sunoprompt ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.sunoprompt)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.sunoprompt[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await SunoPrompt(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.sunoprompt[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["sunoprompt"];
handler.tags = ["ai"];
handler.command = /^(sunoprompt)$/i;
export default handler;
