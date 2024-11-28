import fetch from "node-fetch";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text =
    args.length >= 1
      ? args.slice(0).join(" ")
      : (m.quoted && m.quoted?.text) ||
        m.quoted?.caption ||
        m.quoted?.description ||
        null;
  if (!text)
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  m.react(wait);
  try {
    const res = await ChatGpt(text);
    m.reply(res);
  } catch (e) {
    m.react(eror);
  }
};
(handler.help = ["alexgpt"]),
  (handler.tags = ["gpt"]),
  (handler.command = /^(alexgpt)$/i);
export default handler;
async function ChatGpt(query, type) {
  try {
    const response = await fetch(
      `https://alexapis.onrender.com/api/gpt?ask=${query}&id=1`,
    );
    if (!response.ok) throw new Error("Network response was not OK");
    return (await response.json())?.response;
  } catch (error) {
    throw (console.error("Error:", error), error);
  }
}
