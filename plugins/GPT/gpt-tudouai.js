import fetch from "node-fetch";
import crypto from "crypto";
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
    let data = await getChatCompletion(text);
    data && m.reply(data);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["tudouai"], handler.tags = ["gpt"], handler.command = /^(tudouai)$/i;
export default handler;
async function getChatCompletion(q, assistant = "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?") {
  try {
    const authResponse = await fetch("https://tudouai.chat/api/auth/nick_login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
        Referer: "https://tudouai.chat/chat"
      },
      body: JSON.stringify({
        fingerprint: crypto.randomBytes(16).toString("hex")
      })
    });
    const authData = await authResponse.json();
    const token = authData.token;
    const chatResponse = await fetch("https://tudouai.chat/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-0125",
        messages: [{
          role: "system",
          content: assistant
        }, {
          role: "user",
          content: q
        }],
        stream: true
      })
    });
    const data = await chatResponse.text();
    return data.split("\n\n").filter(data => data.includes('data: {"id":"chatcmpl')).map(data => {
      try {
        return JSON.parse(data.match(/{.*}/)?.[0]);
      } catch (error) {
        return console.error("Error parsing JSON:", error), null;
      }
    }).filter(Boolean).map(data => data.choices[0]?.delta.content).join("");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}