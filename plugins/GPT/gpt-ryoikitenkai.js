import fetch from "node-fetch";
const handler = async (m, {
  args,
  usedPrefix,
  command
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  try {
    m.react(wait);
    const answer = await ryoikitenkai(text.trim());
    if (answer) {
      m.reply(answer);
    } else {
      const answerV2 = await ryoikitenkaiV2(text.trim());
      m.reply(answerV2);
    }
  } catch (error) {
    console.error("Error:", error);
    m.react(eror);
  }
};
handler.help = ["ryoikitenkai"];
handler.tags = ["gpt"];
handler.command = ["ryoikitenkai"];
export default handler;
async function ryoikitenkaiV2(prompt) {
  try {
    const response = await fetch(`https://www.noobs-api.000.pe/dipto/gemini2?text=${encodeURIComponent(prompt)}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data?.response || null;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
async function ryoikitenkai(prompt) {
  try {
    const response = await fetch("https://ryoikitenkai.xyz/api/post/ajax", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
        Referer: "http://localhost:3000/docs"
      },
      body: JSON.stringify({
        query: prompt
      })
    });
    const responseData = await response.json();
    return responseData.data?.result || "Fallback answer not available";
  } catch (error) {
    console.error("Fallback Fetch error:", error);
    throw error;
  }
}