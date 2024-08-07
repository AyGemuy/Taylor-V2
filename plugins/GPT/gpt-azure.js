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
    m.reply(res.choices[0]?.message.content);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["azuregpt"], handler.tags = ["internet", "ai", "gpt"], handler.command = /^(azuregpt)$/i;
export default handler;
async function chatWithGPT(input) {
  const messages = [{
      role: "system",
      content: "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?"
    }, {
      role: "user",
      content: input
    }],
    response = await fetch("https://oai-4.openai.azure.com/openai/deployments/complete-4/chat/completions?api-version=2023-07-01-preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": "2e6532692d764b48b5454f0f4abf8c81"
      },
      body: JSON.stringify({
        messages: messages
      })
    });
  return await response.json();
}