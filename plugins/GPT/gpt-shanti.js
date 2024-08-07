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
    const res = await ChatGpt(text, "gptshanti" === command ? "gpt" : "replicate");
    "gptshanti" === command && m.reply(res), "imgshanti" === command && await conn.sendFile(m.chat, res, "", wm, m);
  } catch (e) {
    return m.react(eror);
  }
};
handler.help = ["gptshanti", "imgshanti"], handler.tags = ["ai", "gpt"], handler.command = /^(gptshanti|imgshanti)$/i;
export default handler;
async function ChatGpt(query, type) {
  try {
    const response = await fetch(`https://shanti.quest/${type}?prompt=${query}`);
    if (!response.ok) throw new Error("Network response was not OK");
    return await response.text();
  } catch (error) {
    throw console.error("Error:", error), error;
  }
}