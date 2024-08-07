import axios from "axios";
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
    m.reply(result.reply);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["chatgptxonline"], handler.tags = ["gpt"], handler.command = /^(chatgptxonline)$/i;
export default handler;
async function generate(q) {
  try {
    const {
      data
    } = await axios("https://chatgptxonline.com/wp-json/mwai-ui/v1/chats/submit", {
      method: "post",
      data: {
        botId: "default",
        newMessage: q,
        stream: !1
      },
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json"
      }
    });
    return data;
  } catch (err) {
    return console.log(err.response.data), err.response.data.message;
  }
}