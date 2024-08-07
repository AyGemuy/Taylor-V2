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
    let data = await ContractGPT(text);
    data && m.reply(data);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["contractgpt"], handler.tags = ["gpt"], handler.command = /^(contractgpt)$/i;
export default handler;
async function ContractGPT(content) {
  try {
    const response = await fetch("https://smart-contract-gpt.vercel.app/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [{
          role: "user",
          content: content
        }]
      })
    });
    return await response.text();
  } catch (error) {
    return console.error("Error:", error), null;
  }
}