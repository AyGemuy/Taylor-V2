import axios from "axios";
const handler = async (m, {
  args,
  usedPrefix,
  command
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  m.react(wait);
  const messages = encodeURIComponent(text);
  try {
    const response = await getgptzw7Response(messages);
    m.reply(decodeURIComponent(response.data.html));
  } catch (error) {
    console.error("Error:", error), m.react(eror);
  }
};
handler.help = ["gptzw7"], handler.tags = ["ai", "gpt"], handler.command = /^(gptzw7)$/i;
export default handler;

function generateRandomIP() {
  const octet = () => Math.floor(256 * Math.random());
  return `${octet()}.${octet()}.${octet()}.${octet()}`;
}
async function getgptzw7Response(content) {
  const data = {
    id: "3.5",
    web: "1",
    key: "",
    role: "",
    title: [{
      role: "user",
      content: content
    }, {
      role: "assistant",
      content: "You are a helpful assistant."
    }],
    text: content,
    stream: "0"
  };
  try {
    return (await axios.post("http://5awm.gpt.zw7.lol/chat.php", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2004J19C Build/RP1A.200720.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.129 Mobile Safari/537.36 WhatsApp/1.2.3",
        Referer: "http://5awm.gpt.zw7.lol/",
        "X-Forwarded-For": generateRandomIP()
      }
    })).data;
  } catch (error) {
    throw console.error("Error:", error), error;
  }
}