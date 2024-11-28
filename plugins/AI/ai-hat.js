import { Hat } from "../../lib/ai/ai-hat.js";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.aihat) db.data.dbai.aihat = {};
  const session = db.data.dbai.aihat[m.sender];
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
    const result = await new Hat().main(inputText);
    if (!result) {
      return m.reply("⚠️ Tidak ada hasil.");
    }
    const { similarQuestions = [], sources = [], chatResult } = result;
    let responseMessage = `✨ *Hasil Pencarian AI-Hat* ✨\n\n`;
    responseMessage += similarQuestions.length
      ? `💡 *Pertanyaan Serupa*:\n${similarQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")}\n\n`
      : "";
    responseMessage += sources.length
      ? `📚 *Sumber Informasi*:\n${sources.map((s, i) => `${i + 1}. [${s.name}](${s.url})`).join("\n")}\n\n`
      : "";
    responseMessage += chatResult ? `💬 *Hasil*:\n${chatResult}\n` : "";
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, responseMessage, m);
    db.data.dbai.aihat[m.sender] = {
      key: {
        id: keyId,
      },
    };
    m.react(sukses);
  } catch (error) {
    console.error("Error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (!db.data.dbai.aihat || m.isBaileys || !(m.sender in db.data.dbai.aihat))
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.aihat[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const result = await new Hat().main(m.text.trim());
      if (!result) {
        m.reply("⚠️ Tidak ada hasil.");
        return;
      }
      const { similarQuestions = [], sources = [], chatResult } = result;
      let responseMessage = `✨ *Hasil Pencarian AI-Hat* ✨\n\n`;
      responseMessage += similarQuestions.length
        ? `💡 *Pertanyaan Serupa*:\n${similarQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")}\n\n`
        : "";
      responseMessage += sources.length
        ? `📚 *Sumber Informasi*:\n${sources.map((s, i) => `${i + 1}. [${s.name}](${s.url})`).join("\n")}\n\n`
        : "";
      responseMessage += chatResult ? `💬 *Hasil*:\n${chatResult}\n` : "";
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, responseMessage, m);
      db.data.dbai.aihat[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["aihat <kata kunci>"];
handler.tags = ["ai"];
handler.command = /^(aihat)$/i;
handler.limit = true;
export default handler;
