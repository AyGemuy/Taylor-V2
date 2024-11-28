import fetch from "node-fetch";
async function RefinePrompt(prompt) {
  const url =
    "https://imagine-anything-backend-container.ll7be3d1enog6.eu-west-2.cs.amazonlightsail.com/api/refine-prompt/";
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
    Referer:
      "https://www.imagineanything.ai/generate-images?ref=taaft&utm_source=taaft&utm_medium=referral",
    "Accept-Encoding": "gzip, deflate",
  };
  const data = {
    prompt: prompt,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    const { refined_prompt } = await response.json();
    return refined_prompt;
  } catch (error) {
    console.error(error);
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.refineprompt) db.data.dbai.refineprompt = {};
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
    const answer = await RefinePrompt(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.refineprompt[m.sender] = {
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
    !db.data.dbai.refineprompt ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.refineprompt)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.refineprompt[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await RefinePrompt(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.refineprompt[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["refineprompt"];
handler.tags = ["ai"];
handler.command = /^(refineprompt)$/i;
export default handler;
