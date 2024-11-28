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
(handler.help = ["gpt4free"]),
  (handler.tags = ["gpt"]),
  (handler.command = /^(gpt4free)$/i);
export default handler;
async function generate(q) {
  try {
    const response = await fetch(
      "https://gpt4free.io/wp-json/mwai-ui/v1/chats/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": "f067d0f1ea",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
          Referer: "https://gpt4free.io/chat/",
        },
        body: JSON.stringify({
          botId: "chatbot-qg0wit",
          customId: null,
          session: "N/A",
          chatId: "wk2iww1qr",
          contextId: 501,
          messages: [
            {
              id: "plsiyk9gdi9",
              role: "assistant",
              content: "Hi! How can I help you?",
              who: "AI: ",
              timestamp: 1724762663677,
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
