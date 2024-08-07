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
    let res = await FreeGPT4(text);
    m.reply(res);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["freegpt4"], handler.tags = ["gpt"], handler.command = /^(freegpt4)$/i;
export default handler;
async function FreeGPT4(your_qus) {
  try {
    const response = await fetch("https://api.freegpt4.ddns.net/?text=" + encodeURIComponent(your_qus));
    return await response.text() || null;
  } catch (e) {
    return e || null;
  }
}