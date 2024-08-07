import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  args,
  command
}) => {
  let text;
  if (args.length >= 1) text = args.slice(0).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw "Masukkan link yang ingin di jadikan pdf!";
    text = m.quoted?.text;
  }
  if (m.react(wait), !isValidURL(text)) return m.reply("Link tidak ada!");
  try {
    let gas = "https://api.html2pdf.app/v1/generate?url=" + text + "&apiKey=DzhGk9fhdPope6j8PmVmbxoNDDiWbsFpdeKZfMMrrxtsl3pXCRbfYOd7N4HovaJ1";
    await conn.sendFile(m.chat, gas, m.name, text, m);
  } catch (e) {
    m.react(eror);
  }
};
handler.tags = ["tools"], handler.command = handler.help = ["url2pdf"];
export default handler;

function isValidURL(message) {
  return /https?:\/\/[^\s/$.?#].[^\s]*/.test(message);
}