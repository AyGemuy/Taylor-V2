import fetch from "node-fetch";
const IdeaGenerator = async (prompt) => {
  try {
    const response = await fetch("https://www.ideagenerator.ai/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
        Referer:
          "https://www.ideagenerator.ai/?ref=taaft&utm_source=taaft&utm_medium=referral",
      },
      body: JSON.stringify({
        ideasFor: prompt,
        gpt4Enabled: false,
      }),
    });
    const responseText = await response.text();
    return responseText
      .split('{"ideasContent":"')
      .slice(1)
      .map((part) => {
        try {
          return JSON.parse(`{"ideasContent":"${part.slice(0, -2)}"}`)
            .ideasContent;
        } catch {
          return "";
        }
      })
      .join("");
  } catch (error) {
    console.error("Error in IdeaGenerator:", error);
    return "";
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.ideagenerator) db.data.dbai.ideagenerator = {};
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
    const answer = await IdeaGenerator(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.ideagenerator[m.sender] = {
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
    !db.data.dbai.ideagenerator ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.ideagenerator)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.ideagenerator[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await IdeaGenerator(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.ideagenerator[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["ideagenerator"];
handler.tags = ["ai"];
handler.command = /^(ideagenerator)$/i;
export default handler;
