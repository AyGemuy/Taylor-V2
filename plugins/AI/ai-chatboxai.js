import fetch from "node-fetch";
import crypto from "crypto";
const AiContinues = async (inputText, uid) => {
  const params = new URLSearchParams({
    q: inputText,
    uid: uid,
    model: "gpt-4",
    cai: "",
  });
  try {
    const res = await fetch(
      `https://ai-continues.onrender.com/chatbox?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return (await res.json()).answer;
  } catch (error) {
    console.error("AI response fetch failed:", error);
    throw new Error("AI response fetch failed.");
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.chatboxai) db.data.dbai.chatboxai = {};
  const session = db.data.dbai.chatboxai[m.sender];
  const uid = session ? session.uid : crypto.randomBytes(16).toString("hex");
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
    const answer = await AiContinues(inputText, uid);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.chatboxai[m.sender] = {
      uid: uid,
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
    !db.data.dbai.chatboxai ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.chatboxai)
  )
    return;
  const {
    key: { id: keyId },
    uid,
  } = db.data.dbai.chatboxai[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await AiContinues(m.text.trim(), uid);
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.chatboxai[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["chatboxai"];
handler.tags = ["ai"];
handler.command = /^(chatboxai)$/i;
export default handler;
