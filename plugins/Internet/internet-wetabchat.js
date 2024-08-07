import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  if (!text) return m.reply("Input query\nExample: .wetabchat hello");
  m.react(wait);
  try {
    let inputText = await wetabChat(text),
      regex = /{"data":"([^{}]+)}/g,
      outputs = inputText.match(regex).map(item => JSON.parse(item)?.data),
      result = outputs?.join("");
    m.reply(result);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["wetabchat"], handler.tags = ["internet"], handler.command = /^(wetabchat)$/i;
export default handler;
async function getHaoKey() {
  try {
    const url = `https://yeyu1024.xyz/chat/haohula.json?r=${Math.random()}`,
      response = await fetch(url);
    let array = (await response.json()).haohula.token;
    return array[Math.floor(Math.random() * array.length)];
  } catch (error) {
    return console.error("Terjadi kesalahan:", error), null;
  }
}
async function wetabChat(query) {
  try {
    const ops = {
        prompt: query
      },
      response = await fetch("https://wetabchat.haohuola.com/api/chat/conversation", {
        method: "POST",
        headers: {
          "I-App": "hitab",
          "I-Branch": "zh",
          "I-Lang": "id-ID",
          "I-Platform": "chrome",
          "I-Version": "1.0.43",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${await getHaoKey()}`,
          Referer: "https://wetabchat.haohuola.com/api/chat/conversation",
          origin: "chrome-extension://aikflfpejipbpjdlfabpgclhblkpaafo",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36"
        },
        body: JSON.stringify(ops)
      });
    return await response.text();
  } catch (error) {
    return console.error("Terjadi kesalahan:", error), null;
  }
}