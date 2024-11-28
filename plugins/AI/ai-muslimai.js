import fetch from "node-fetch";
async function MuslimAI(query) {
  try {
    const responseSearch = await fetch("https://www.muslimai.io/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
        Referer: "https://www.muslimai.io/",
      },
      body: JSON.stringify({ query: query }),
    });

    const ayatData = responseSearch.ok ? await responseSearch.json() : null;
    const content = ayatData?.[0]?.content;

    if (!content) {
      console.error("Tidak ada data ayat yang ditemukan.");
      return;
    }

    const prompt = `Use the following passages to answer the query in Indonesian, ensuring clarity and understanding, as a world-class expert in the Quran. Do not mention that you were provided any passages in your answer: ${query}\n\n${content}`;

    const responseAnswer = await fetch("https://www.muslimai.io/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
        Referer: "https://www.muslimai.io/",
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    const jawaban = responseAnswer.ok ? await responseAnswer.text() : null;
    return jawaban;
  } catch (error) {
    console.error(error);
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.muslimai) db.data.dbai.muslimai = {};
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
    const answer = await MuslimAI(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.muslimai[m.sender] = {
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
    !db.data.dbai.muslimai ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.muslimai)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.muslimai[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await MuslimAI(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.muslimai[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["muslimai"];
handler.tags = ["ai"];
handler.command = /^(muslimai)$/i;
export default handler;
