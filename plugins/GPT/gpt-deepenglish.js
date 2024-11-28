import fetch from "node-fetch";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.deepenglish) db.data.dbai.deepenglish = {};
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
    const answer = await gptDeepenglish(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.deepenglish[m.sender] = {
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
    !db.data.dbai.deepenglish ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.deepenglish)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.deepenglish[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await gptDeepenglish(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.deepenglish[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["deepenglish"];
handler.tags = ["owner"];
handler.command = /^(deepenglish)$/i;
export default handler;
async function gptDeepenglish(input) {
  const messages = [
    {
      role: "assistant",
      content:
        "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?",
    },
    {
      role: "user",
      content: input,
    },
  ];
  try {
    const response = await fetch(
      "https://deepenglish.com/wp-json/ai-chatbot/v1/chat",
      {
        method: "POST",
        headers: {
          Accept: "text/event-stream",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages,
        }),
      },
    );
    return (await response.json()).answer;
  } catch (error) {
    throw (
      (console.error("An error occurred during data fetching:", error), error)
    );
  }
}
