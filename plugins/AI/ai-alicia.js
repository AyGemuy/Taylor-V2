import axios from "axios";
export async function before(m) {
  const {
    alicia
  } = db.data.chats[m.chat] || {};
  if (m.isBaileys || !alicia || !m.text) return !1;
  const text = m.text.replace(/[^\x00-\x7F]/g, "").trim();
  if (!text) return !1;
  const url = `https://api.azz.biz.id/api/alicia?q=${encodeURIComponent(text)}&user=${m.name}&key=global`;
  try {
    const res = await Alicia(text);
    if (res) return await conn.reply(m.chat, ` * alicia says: * \n${res || ""}`, m), "ALICIA STOP" === text.trim().toUpperCase() && (alicia = !1, await conn.reply(m.chat, " * alicia stop success * ", m)), !0;
  } catch {}
  return await conn.reply(m.chat, " * alicia error * ", m), !0;
}
async function Alicia(q) {
  try {
    const response = await axios.get("https://yw85opafq6.execute-api.us-east-1.amazonaws.com/default/boss_mode_15aug", {
      params: {
        text: `Generate humanized chatgpt text in Indonesian, you are an AI assistant named Alicia programmed with Alicia 3 version for the following text: ${q}`,
        country: "Asia",
        user_id: "k2r4gMUJfN"
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}