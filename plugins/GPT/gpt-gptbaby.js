import cheerio from "cheerio";
import fetch from "node-fetch";
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
    let result = await gptBaby(text);
    m.reply(result);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["gptbaby"], handler.tags = ["internet", "ai", "gpt"], handler.command = /^(gptbaby)$/i;
export default handler;

function convertNewline(output) {
  return output.replace(/\\n/g, "\n");
}
async function gptBaby(your_qus) {
  const baseURL = "https://fasdsgdfsg97986agagyk656.lovebaby.today/",
    messageChain8 = [{
      role: "user",
      content: your_qus
    }];
  try {
    const response = await fetch(baseURL + "api/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "text/event-stream",
          origin: "https://fasdsgdfsg97986agagyk656.lovebaby.today/",
          Referer: baseURL
        },
        body: JSON.stringify({
          messages: messageChain8,
          stream: !0,
          model: "gpt-3.5-turbo",
          temperature: .5,
          presence_penalty: 0
        })
      }),
      inputString = await response.text(),
      regex = /"content":"([^"]*)"/g;
    let match, result = "";
    for (; match = regex.exec(inputString);) result += match[1];
    return result.replace(/\\n/g, "\n");
  } catch (error) {
    console.error(error);
  }
}