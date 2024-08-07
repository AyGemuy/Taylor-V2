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
    let res = await mariTalk(text);
    m.reply(res.answer);
  } catch (e) {
    console.error(e), m.react(eror);
  }
};
handler.help = ["maritalk"], handler.tags = ["ai"], handler.command = /^(maritalk)$/i;
export default handler;
async function mariTalk(q) {
  try {
    const response = await fetch("https://chat.maritaca.ai/api/chat/inference", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "key 100967333014773694334$301a2d09eb5a949372342c6ce125335b346740cecd46dbe12fc2fa326cf315f3"
      },
      body: JSON.stringify({
        messages: [{
          role: "assistant",
          content: "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?"
        }, {
          role: "user",
          content: q
        }]
      })
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    throw console.error("Error fetching data:", error.message), error;
  }
}