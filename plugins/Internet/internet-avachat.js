import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  if (!text) return m.reply("Input query\nExample: .avachat hello");
  m.react(wait);
  try {
    let result = await avaChat(text);
    m.reply(result);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["avachat"], handler.tags = ["internet"], handler.command = /^(avachat)$/i;
export default handler;
async function avaChat(message) {
  const payload = {
      messages: [{
        content: message,
        role: "user"
      }]
    },
    response = await fetch("https://ava-alpha-api.codelink.io/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }),
    inputString = await response.text(),
    regex = /"content":"([^"]*)"/g;
  let match, result = "";
  for (; match = regex.exec(inputString);) result += match[1];
  return result.replace(/\\n/g, "\n");
}