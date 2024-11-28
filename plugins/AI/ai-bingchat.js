import fetch from "node-fetch";
import { BingChat } from "../../lib/ai/bing-chat.js";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text =
    args.length >= 1
      ? args.join(" ")
      : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text)
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  m.react(wait);
  try {
    const data = await Bubblegum(text);
    m.reply(data.text);
  } catch (error) {
    console.error(`Error in Bubblegum: ${error.message}`);
    try {
      const data = await widipeBing(text);
      m.reply(data.result);
    } catch (error) {
      console.error(`Error in BingChat: ${error.message}`);
      try {
        const bing = new BingChat();
        const data = await bing.sendMessage(text);
        m.reply(data.text);
      } catch (error) {
        console.error(`Error in widipeBing: ${error.message}`);
        m.react(eror);
      }
    }
  }
};
handler.help = ["bingchat *[query]*"];
handler.tags = ["ai"];
handler.command = /^(bingchat)$/i;
export default handler;
async function widipeBing(query) {
  try {
    const response = await fetch(
      `https://widipe.com/bingai?text=${encodeURIComponent(query)}`,
      {
        method: "get",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      },
    );
    return await response.json();
  } catch (error) {
    console.error(`Error in widipeBing: ${error.message}`);
    throw error;
  }
}
async function Bubblegum(prompt, style = "Creative", invoice = 0) {
  try {
    const sign = await (
      await fetch("https://effulgent-bubblegum-e2f5df.netlify.app/api/create")
    ).json();
    const response = await fetch(
      "https://effulgent-bubblegum-e2f5df.netlify.app/api/sydney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: sign?.conversationId,
          encryptedconversationsignature: sign?.encryptedconversationsignature,
          clientId: sign?.clientId,
          invocationId: invoice,
          conversationStyle: style,
          prompt: prompt,
        }),
      },
    );
    const jsonString = await response.text();
    const responses =
      jsonString
        .split("")
        .map((s) => {
          try {
            return JSON.parse(s);
          } catch {
            return null;
          }
        })
        .filter((v) => v?.item) || [];
    const json = responses[0];
    return (
      json?.item.messages
        .filter((e) => e.messageType === "Chat")
        .reverse()[0] ||
      json?.item.messages
        .filter(
          (e) =>
            e.author === "bot" &&
            e.adaptiveCards[0]?.body[0]?.type === "TextBlock",
        )
        .reverse()[0]
    );
  } catch (error) {
    console.error("Error in BingChat:", error);
    throw error;
  }
}
