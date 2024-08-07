import axios from "axios";
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
    let result = await generate(text);
    m.reply(result);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["gpt4free"], handler.tags = ["gpt"], handler.command = /^(gpt4free)$/i;
export default handler;
async function generate(q) {
  try {
    const nonceValue = JSON.parse(cheerio.load(await (await axios.get("https://gpt4free.io/chat")).data)(".mwai-chatbot-container").attr("data-system")).restNonce,
      {
        data
      } = await axios("https://gpt4free.io/wp-json/mwai-ui/v1/chats/submit", {
        method: "post",
        data: {
          botId: "default",
          newMessage: q,
          stream: !1
        },
        headers: {
          "X-WP-Nonce": nonceValue,
          "Content-Type": "application/json"
        }
      });
    return data.reply;
  } catch (err) {
    return console.log(err.response.data), err.response.data.message;
  }
}