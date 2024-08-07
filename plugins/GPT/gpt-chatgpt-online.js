import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  try {
    m.react(wait);
    let res = await getFormattedRideInfo(text);
    m.reply(res.choices[0]?.message.content);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["chatgptonline"], handler.tags = ["internet", "ai", "gpt"],
  handler.command = /^chatgptonline$/i;
export default handler;
async function getFormattedRideInfo(message) {
  const headers = {
      Authorization: "Bearer fk186009-gCYVPTkf6aMycD4o2ZM9fRsDwp52ONdz|ck43-632713d",
      "Content-Type": "application/json"
    },
    payload = {
      messages: [{
        content: message,
        role: "user"
      }],
      model: "gpt-3.5-turbo"
    };
  try {
    const response = await fetch("https://openai.api2d.net/v1/chat/completions", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (error) {
    return;
  }
}