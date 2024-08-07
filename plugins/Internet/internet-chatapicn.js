import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  m.react(wait);
  try {
    const inputText = await ChatGpt(text);
    m.reply(inputText.text);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["chatapicn"], handler.tags = ["internet"], handler.command = /^(chatapicn)$/i;
export default handler;
async function ChatGpt(query) {
  const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://2chat.c3r.ink/",
        accept: "application/json, text/plain, */*"
      },
      body: JSON.stringify({
        prompt: query,
        options: {},
        regenerate: !1,
        roomId: 1002,
        uuid: Date.now(),
        systemMessage: "You are Realtime AI. Follow the user's instructions carefully.",
        top_p: 1,
        temperature: .8
      })
    },
    response = await fetch("https://chatapicn.a3r.fun/api/chat-process", requestData),
    data = await response.text();
  return JSON.parse(data.split("\n").pop());
}