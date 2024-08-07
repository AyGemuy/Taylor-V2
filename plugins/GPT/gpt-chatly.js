import axios from "axios";
const handler = async (m, {
  args
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  m.react(wait);
  const messages = encodeURIComponent(text);
  try {
    const response = await getgptchatlyResponse(messages);
    m.reply(response.chatGPTResponse);
  } catch (error) {
    console.error("Error:", error), m.react(eror);
  }
};
handler.help = ["gptchatly"], handler.tags = ["ai", "gpt"], handler.command = /^(gptchatly)$/i;
export default handler;

function generateRandomIP() {
  const octet = () => Math.floor(256 * Math.random());
  return `${octet()}.${octet()}.${octet()}.${octet()}`;
}
async function getgptchatlyResponse(content) {
  const headers = {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2004J19C Build/RP1A.200720.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.129 Mobile Safari/537.36 WhatsApp/1.2.3",
      Referer: "https://gptchatly.com/",
      "X-Forwarded-For": generateRandomIP()
    },
    requestData = {
      past_conversations: [{
        role: "system",
        content: "You are a helpful assistant."
      }, {
        role: "user",
        content: content
      }]
    };
  try {
    return (await axios.post("https://gptchatly.com/fetch-response", requestData, {
      headers: headers
    })).data;
  } catch (error) {
    throw console.error("Error:", error), error;
  }
}