import fetch from "node-fetch";
const modelNames = [
  "Cristiano Ronaldo",
  "Lionel Messi",
  "Ataturk",
  "Albert Einstein",
  "Aristotle",
  "Carl Sagan",
  "Isaac Asimov",
  "Confucius",
  "Frida Kahlo",
  "G.G. Marquez",
  "Ernest Miller Hemingway",
  "Lucius Annaeus Seneca",
  "Steve Jobs",
  "Nikola Tesla",
  "Socrates",
  "Thomas Edison",
  "Rosalind Franklin",
  "Gary Vaynerchuk",
  "Amelia Earhart",
  "Elon Musk",
  "Marcus Aurelius",
  "Ludwig van Beethoven",
  "Jane Goodall",
  "Rumi",
];
async function AskThee(prompt, index = null) {
  const name = index >= 0 && index < modelNames.length ? modelNames[index] : 1;
  const url = "https://askthee.vercel.app/api/generate";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
      Referer:
        "https://askthee.vercel.app/?ref=taaft&utm_source=taaft&utm_medium=referral",
    },
    body: JSON.stringify({
      name: name,
      question: prompt,
    }),
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.askthee) db.data.dbai.askthee = {};
  const modelIndexMatch = args.join(" ").match(/--model=(\d+)$/);
  const modelIndex = modelIndexMatch ? parseInt(modelIndexMatch[1], 10) : null;
  const inputText = args.length
    ? args.join(" ").trim()
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  const textToProcess =
    modelIndex !== null
      ? inputText.replace(/--model=\d+$/, "").trim()
      : inputText;
  if (!textToProcess) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  m.react(wait);
  try {
    const answer = await AskThee(textToProcess, modelIndex);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.askthee[m.sender] = {
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
    !db.data.dbai.askthee ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.askthee)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.askthee[m.sender];
  const modelIndexMatch = m.text.match(/--model=(\d+)$/);
  const modelIndex = modelIndexMatch ? parseInt(modelIndexMatch[1], 10) : null;
  const textToProcess =
    modelIndex !== null ? m.text.replace(/--model=\d+$/, "").trim() : m.text;
  if (m.quoted?.id === keyId && textToProcess) {
    m.react(wait);
    try {
      const answer = await AskThee(textToProcess, modelIndex);
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.askthee[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["askthee"];
handler.tags = ["ai"];
handler.command = /^(askthee)$/i;
export default handler;
