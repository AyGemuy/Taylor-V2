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
    let res = await chatWithGPT(text);
    m.reply(res.answer);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["docsbot"], handler.tags = ["gpt"], handler.command = /^(docsbot)$/i;
export default handler;
async function chatWithGPT(messages) {
  try {
    const response = await fetch("https://api.docsbot.ai/teams/AQlopPkXnxW7eKsGqeSe/bots/lnPRMgAXQgaYl0JG0uXj/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: messages,
        full_source: !0,
        format: "text",
        history: []
      })
    });
    return await response.json();
  } catch (error) {
    throw console.error("Error fetching data:", error), error;
  }
}