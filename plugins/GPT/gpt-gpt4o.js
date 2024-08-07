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
    const answer = await gpt4o(text.trim());
    if (answer) {
      m.reply(answer);
    } else {
      const answerV2 = await gpt4oV2(text.trim());
      m.reply(answerV2);
    }
  } catch (error) {
    console.error("Error:", error);
    m.react(eror);
  }
};
handler.help = ["gpt4o"];
handler.tags = ["gpt"];
handler.command = ["gpt4o"];
export default handler;
async function gpt4o(prompt) {
  try {
    const response = await fetch(`https://jonellccprojectapis10.adaptable.app/api/gpt4o?context=${encodeURIComponent(prompt)}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data?.response || null;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
async function gpt4oV2(prompt) {
  try {
    const response = await fetch("https://mentalwellness-api.onrender.com/api/gpt4o", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [{
          role: "system",
          content: "kamu luffy"
        }, {
          role: "user",
          content: prompt
        }]
      })
    });
    const responseData = await response.json();
    return responseData || "Fallback answer not available";
  } catch (error) {
    console.error("Fallback Fetch error:", error);
    throw error;
  }
}