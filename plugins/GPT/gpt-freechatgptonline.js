import axios from "axios";
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
(handler.help = ["freechatgptonline"]),
  (handler.tags = ["gpt"]),
  (handler.command = /^(freechatgptonline)$/i);
export default handler;
async function generate(q) {
  try {
    const response = await fetch(
      "https://www.freechatgptonline.com/wp-json/mwai-ui/v1/chats/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": "8bbb426259",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
          Referer: "https://www.freechatgptonline.com/",
        },
        body: JSON.stringify({
          botId: "default",
          customId: null,
          session: "N/A",
          chatId: "ki934xaqsya",
          contextId: 8,
          messages: [
            {
              id: "tq5o1zcqfp",
              role: "assistant",
              content: "Hi! How can I help you?",
              who: "AI: ",
              timestamp: 1724763052081,
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
