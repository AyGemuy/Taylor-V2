import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let text;
  if (!m.quoted || !m.quoted?.text) return m.reply("Reply code yang mau di transform.\n*Example:*\n" + usedPrefix + command + " py js");
  text = m.quoted?.text, m.react(wait);
  try {
    let res = await TranslateCode(text);
    m.reply(res.join("\n"));
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["transcode"], handler.tags = ["internet"], handler.command = /^(transcode)$/i;
export default handler;
async function TranslateCode(code, fromlang, tolang) {
  try {
    const response = await fetch(`https://api.yanzbotz.my.id/api/ai/codetranslator?code=${code}&fromlang=${fromlang}&tolang=${tolang}`);
    if (!response.ok) throw new Error("Network response was not OK");
    return (await response.json()).result;
  } catch (error) {
    throw console.error("Error:", error), error;
  }
}