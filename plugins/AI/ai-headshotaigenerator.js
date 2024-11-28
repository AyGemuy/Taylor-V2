import fetch from "node-fetch";
const HeadshotAiGenerator = async (prompt) => {
  try {
    const response = await fetch("https://headshotaigenerator.com/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
        Referer:
          "https://headshotaigenerator.com/?ref=taaft&utm_source=taaft&utm_medium=referral",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Error in HeadshotAiGenerator:", error);
    return null;
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.headshotaigenerator) db.data.dbai.headshotaigenerator = {};
  const inputText = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!inputText) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Men in forest*`,
    );
  }
  m.react(wait);
  try {
    const imageBuffer = await HeadshotAiGenerator(inputText);
    const tag = `@${m.sender.split("@")[0]}`;
    const {
      key: { id: keyId },
    } = await conn.sendMessage(
      m.chat,
      {
        image: imageBuffer,
        caption: `Nih effect *HEADSHOT* nya\nRequest by: ${tag}`,
        mentions: [m.sender],
      },
      {
        quoted: m,
      },
    );
    db.data.dbai.headshotaigenerator[m.sender] = {
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
    !db.data.dbai.headshotaigenerator ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.headshotaigenerator)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.headshotaigenerator[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const imageBuffer = await HeadshotAiGenerator(m.text.trim());
      const tag = `@${m.sender.split("@")[0]}`;
      const {
        key: { id: newKeyId },
      } = await conn.sendMessage(
        m.chat,
        {
          image: imageBuffer,
          caption: `Nih effect *HEADSHOT* nya\nRequest by: ${tag}`,
          mentions: [m.sender],
        },
        {
          quoted: m,
        },
      );
      db.data.dbai.headshotaigenerator[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["headshotaigenerator"];
handler.tags = ["ai"];
handler.command = /^(headshotaigenerator)$/i;
export default handler;
