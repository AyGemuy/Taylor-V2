import cheerio from "cheerio";
import fetch from "node-fetch";
const API_BASE = ["https://api.closeai-proxy.xyz", "https://api.openai-proxy.live"],
  API_KEY = "sk-zaTFbMjIUsKv23JlrhbyYdJG6A9gNOK2G713GvoZ0TBRkfI3",
  MODEL_3_5 = "gpt-3.5-turbo",
  MODEL_4 = "gpt-4",
  handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
  }) => {
    const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
    m.react(wait);
    try {
      const messages = [{
          role: "system",
          content: "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?"
        }, {
          role: "user",
          content: text
        }],
        result = await fetchCompletion(MODEL_3_5, messages);
      m.reply(result);
    } catch (e) {
      try {
        const messages = [{
            role: "system",
            content: "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?"
          }, {
            role: "user",
            content: text
          }],
          result = await fetchCompletion(MODEL_3_5, messages, !0);
        m.reply(result);
      } catch (error) {
        m.reply(error);
      }
    }
  };
handler.help = ["closeai"], handler.tags = ["internet", "ai", "gpt"], handler.command = /^(closeai)$/i;
export default handler;
async function fetchCompletion(model, messages, useSecondAPI = !1) {
  let url = useSecondAPI ? API_BASE[1] : API_BASE[0];
  try {
    const response = await fetch(`${url}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        stream: !0,
        temperature: 0,
        top_p: 0,
        messages: messages
      })
    });
    return (await response.text()).split("\n").filter(line => "" !== line.trim()).map(line => line.replace("data: ", "")).slice(0, -1).map(item => JSON.parse(item)).map(v => v.choices[0]?.delta.content).join("");
  } catch (error) {
    throw error;
  }
}