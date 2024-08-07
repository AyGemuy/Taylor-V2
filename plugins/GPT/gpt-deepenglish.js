import {
  fetch
} from "undici";
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
    let result = await gptDeepenglish(text);
    m.reply(result.answer);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["deepenglish"], handler.tags = ["gpt"], handler.command = /^(deepenglish)$/i;
export default handler;
async function gptDeepenglish(input) {
  const messages = [{
    role: "assistant",
    content: "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?"
  }, {
    role: "user",
    content: input
  }];
  try {
    const response = await fetch("https://deepenglish.com/wp-json/ai-chatbot/v1/chat", {
      method: "POST",
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: messages
      })
    });
    return await response.json();
  } catch (error) {
    throw console.error("An error occurred during data fetching:", error), error;
  }
}