import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && (m.quoted?.text || m.quoted?.caption || m.quoted?.description) || null;
  if (!text) return m.reply(`Masukkan teks atau balas pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  try {
    const messages = [{
        role: "assistant",
        content: "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?"
      }, {
        role: "user",
        content: text
      }],
      output = await cairo(messages);
    m.reply(output);
  } catch (e) {
    m.reply("Terjadi kesalahan.");
  }
};
handler.help = ["cairo"], handler.tags = ["ai"], handler.command = /^(cairo)$/i;
export default handler;
async function cairo(messages) {
  try {
    const response = await fetch("https://cairo-chatbot.vercel.app/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: messages,
        previewToken: null
      })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.text();
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}