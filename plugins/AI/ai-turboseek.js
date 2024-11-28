import fetch from "node-fetch";
async function Turboseek(content) {
  try {
    const sourcesResponse = await fetch(
      "https://www.turboseek.io/api/getSources",
      {
        method: "POST",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
          Referer: "https://www.turboseek.io/",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: content,
        }),
      },
    );
    const sources = await sourcesResponse.json();
    const similarQuestionsResponse = await fetch(
      "https://www.turboseek.io/api/getSimilarQuestions",
      {
        method: "POST",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
          Referer: "https://www.turboseek.io/",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: content,
        }),
      },
    );
    const similarQuestions = await similarQuestionsResponse.json();
    const answerResponse = await fetch(
      "https://www.turboseek.io/api/getAnswer",
      {
        method: "POST",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
          Referer: "https://www.turboseek.io/",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: content,
          sources: sources,
        }),
      },
    );
    const data = await answerResponse.text();
    const parsedChunks = data.split("\n").map((line) => {
      try {
        return JSON.parse(line.slice(6)).text;
      } catch (e) {
        return "";
      }
    });
    const combinedAnswer = parsedChunks.join("").trim();
    const formattedSources = sources
      .map((source) => `- [${source.name}](${source.url})`)
      .join("\n");
    const formattedSimilarQuestions = similarQuestions
      .map((question) => `- ${question}`)
      .join("\n");
    const combinedOutput = `
      *Answer:*
      ${combinedAnswer}
      
      *Similar Questions:*
      ${formattedSimilarQuestions}
      
      *Sources:*
      ${formattedSources}
    `;
    return combinedOutput.trim();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.turboseek) db.data.dbai.turboseek = {};
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
    const answer = await Turboseek(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.turboseek[m.sender] = {
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
    !db.data.dbai.turboseek ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.turboseek)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.turboseek[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await Turboseek(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.turboseek[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["turboseek"];
handler.tags = ["ai"];
handler.command = /^(turboseek)$/i;
export default handler;
