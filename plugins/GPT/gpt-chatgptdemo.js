import fetch from "node-fetch";
import crypto from "crypto";
import cheerio from "cheerio";
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
    const userId = await getUserId(),
      chatId = await createNewChat(userId),
      output = await sendChatRequest(chatId, text);
    m.reply(output);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["chatgptdemo"], handler.tags = ["gpt"], handler.command = /^(chatgptdemo)$/i;
export default handler;
const url_api_new_chat = "https://chat.chatgptdemo.net/new_chat",
  url_api_stream = "https://chat.chatgptdemo.net/chat_api_stream";
async function getUserId() {
  const html = await (await fetch("https://chat.chatgptdemo.net")).text();
  return cheerio.load(html)("#USERID").text().trim();
}
async function createNewChat(userId) {
  const {
    id_
  } = await (await fetch(url_api_new_chat, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: userId
    })
  })).json();
  return id_;
}

function formatTimestamp(timestamp) {
  const date = new Date(1 * timestamp),
    [month, day, year, hours, minutes, seconds, ampm] = [date.getMonth() + 1, date.getDate(), date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getHours() >= 12 ? "PM" : "AM"];
  return `${month}/${day}/${year}, ${hours % 12 || 12}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${ampm}`;
}
async function sendChatRequest(chatId, question) {
  const response = await fetch(url_api_stream, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question: question,
      chat_id: chatId,
      timestamp: formatTimestamp(new Date())
    })
  });
  return (await response.text()).split("\n\n").filter(data => data.includes('data: {"id":"chatcmpl')).map(data => {
    try {
      return JSON.parse(data.match(/{.*}/)?.[0]);
    } catch (error) {
      return console.error("Error parsing JSON:", error), null;
    }
  }).filter(Boolean).map(data => data.choices[0]?.delta.content).join("");
}