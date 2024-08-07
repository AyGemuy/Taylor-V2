import cheerio from "cheerio";
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
    let result = await wxGpt(text);
    m.reply(result);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["wxgpt"], handler.tags = ["internet", "ai", "gpt"], handler.command = /^(wxgpt)$/i;
export default handler;
async function wxGpt(you_qus) {
  let baseURL = "https://free-api.cveoy.top/";
  try {
    const response = await fetch(baseURL + "v3/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        origin: "https://ai1.chagpt.fun",
        Referer: baseURL
      },
      body: JSON.stringify({
        prompt: you_qus
      })
    });
    return await response.text();
  } catch (error) {
    console.error(error);
  }
}