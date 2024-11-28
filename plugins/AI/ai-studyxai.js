import fetch from "node-fetch";
import fakeUserAgent from "fake-useragent";
const userAgent = fakeUserAgent();
const studyxai = async (prompt) => {
  try {
    const response1 = await fetch(
      "https://studyxai.vercel.app/api/getShortId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": userAgent,
          Referer: "https://studyxai.vercel.app/",
        },
        body: JSON.stringify({
          questionContent: `<p>${prompt}</p>`,
          modelType: 11,
          type: 0,
          sourceType: 3,
        }),
      },
    );
    if (!response1.ok)
      throw new Error(`First request failed with status: ${response1.status}`);
    const { shortId } = await response1.json();
    const response2 = await fetch(
      "https://studyxai.vercel.app/api/getQuestion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": userAgent,
          Referer: "https://studyxai.vercel.app/",
        },
        body: JSON.stringify({
          promptInput: prompt,
          questionId: shortId,
          regenerate: true,
          sessionId: "905940875518747900",
          userId: "28457280088360236",
          modelType: 11,
          event: "pushQuestion",
          eventId: "s1725008715064",
          eventType: 2,
          paramsS2: shortId,
          paramsS3: 1,
          paramsS4: "",
          paramsType: 11,
          askType: "",
          eventSourceType: "web_account_homework",
          eventSourceDetail: `https://studyx.ai/webapp/homework/${shortId}`,
        }),
      },
    );
    if (!response2.ok)
      throw new Error(`Second request failed with status: ${response2.status}`);
    const { data } = await response2.json();
    return data[0].answerText || "Error";
  } catch (error) {
    console.error("Error:", error);
    return {
      error: error.message,
    };
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.studyxai) db.data.dbai.studyxai = {};
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
    const answer = await studyxai(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.studyxai[m.sender] = {
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
    !db.data.dbai.studyxai ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.studyxai)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.studyxai[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await studyxai(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.studyxai[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["studyxai"];
handler.tags = ["ai"];
handler.command = /^(studyxai)$/i;
export default handler;
