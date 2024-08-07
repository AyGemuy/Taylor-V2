import fetch from "node-fetch";
export async function before(m) {
  const {
    gptvoice
  } = db.data.chats[m.chat] || {};
  if (m.isBaileys || !gptvoice || !m.text) return !1;
  const text = m.text.replace(/[^\x00-\x7F]/g, "").trim();
  if (!text) return !1;
  const url = `https://api.yanzbotz.my.id/api/ai/gptvoice?query=${encodeURIComponent(text)}`;
  try {
    if (url) return await this.sendMessage(m.chat, {
      audio: {
        url: url
      },
      fileName: "response.mp3",
      mimetype: "audio/mpeg",
      ptt: !0
    }, {
      quoted: m
    }), "gptvoice stop" === text.trim().toUpperCase() && (gptvoice = !1, await conn.reply(m.chat, "*gptvoice stop success*", m)), !0;
  } catch (e) {
    console.error(e);
  }
  return await conn.reply(m.chat, "*gptvoice error*", m), !0;
}