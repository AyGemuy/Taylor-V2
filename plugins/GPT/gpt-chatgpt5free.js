import axios from "axios";
import * as cheerio from "cheerio";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text =
    args.length >= 1
      ? args.slice(0).join(" ")
      : (m.quoted && m.quoted?.text) ||
        m.quoted?.caption ||
        m.quoted?.description ||
        null;
  if (!text)
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  m.react(wait);
  try {
    let result = await generate(text);
    m.reply(result);
  } catch (e) {
    m.react(eror);
  }
};
(handler.help = ["chatgpt5free"]),
  (handler.tags = ["gpt"]),
  (handler.command = /^(chatgpt5free)$/i);
export default handler;
async function generate(q) {
  try {
    const response = await fetch(
      "https://chatgpt5free.com/wp-json/mwai-ui/v1/chats/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": "f91ade04ce",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
          Referer: "https://chatgpt5free.com/chatgpt-5-free/",
        },
        body: JSON.stringify({
          botId: "default",
          customId: null,
          session: "66cdc5bbd8a9e",
          chatId: "smgxgtcau5",
          contextId: 937,
          messages: [
            {
              id: "tszuc1yldf",
              role: "assistant",
              content: "Hi! How can I help you?",
              who: "AI: ",
              timestamp: Date.now(),
            },
          ],
          newMessage: q,
          newFileId: null,
          stream: false,
        }),
        compress: true,
      },
    );
    const { reply } = await response.json();
    return reply || "N/A";
  } catch (err) {
    return console.log(err.response.data), err.response.data.message;
  }
}
