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
    const dataMsg = [{
        role: "user",
        content: text
      }],
      output = await Taylor(dataMsg);
    m.reply(output);
  } catch (e) {
    m.reply("Terjadi kesalahan.");
  }
};
handler.help = ["basedgpt"], handler.tags = ["ai"], handler.command = /^(basedgpt)$/i;
export default handler;
async function Taylor(data) {
  try {
    const response = await fetch("https://www.basedgpt.chat/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: data
      })
    });
    return await response.text();
  } catch (e) {
    throw new Error("Error fetching data from AI service.");
  }
}