import {
  fetch
} from "undici";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let theme_autogpt = "a0bd44db-eb3b-412f-8924-b31c58244a64",
    theme_langflow = "b7f52734-297c-41dc-8737-edbd13196394";
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  m.react(wait);
  try {
    const chatType = text.split("|")[0];
    if ("1" !== chatType && "2" !== chatType) throw "Invalid input format. Use 1|text or 2|text.";
    {
      const output = await createChat(text, "1" === chatType ? theme_autogpt : theme_langflow, []);
      m.reply(output.answer.text);
    }
  } catch (e) {
    throw "Invalid input format. Use 1|text or 2|text.";
  }
};
handler.help = ["mendable"], handler.tags = ["gpt"], handler.command = /^(mendable)$/i;
export default handler;
async function createConversation(api_key) {
  const data = {
    api_key: api_key
  };
  try {
    const r = await fetch("https://api.mendable.ai/v0/newConversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }),
      {
        conversation_id
      } = await r.json();
    return conversation_id;
  } catch (error) {
    throw new Error(`Failed to create conversation: ${error.message}`);
  }
}
async function createChat(question, api_key, history = []) {
  try {
    const data = {
        anon_key: api_key,
        question: question,
        history: history,
        shouldStream: !1,
        conversation_id: await createConversation(api_key)
      },
      url = "https://api.mendable.ai/v0/mendableChat",
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to create chat: ${error.message}`);
  }
}