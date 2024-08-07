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
    const result = await AIUSS(text);
    m.reply(result);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["aiuss"], handler.tags = ["internet"], handler.command = /^(aiuss)$/i;
export default handler;
async function AIUSS(you_qus) {
  const response = await fetch("https://ai.usesless.com/api/chat-process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://ai.usesless.com/chat/1002",
        origin: "https://ai.usesless.com",
        accept: "application/json, text/plain, */*"
      },
      body: JSON.stringify({
        openaiKey: "",
        prompt: you_qus,
        options: {
          systemMessage: "You are Realtime AI. Follow the user's instructions carefully.",
          completionParams: {
            presence_penalty: .8,
            temperature: 1
          }
        }
      })
    }),
    outs = (await response.text()).split("\n").pop();
  return JSON.parse(outs).text;
}