import fetch from "node-fetch";
const handler = async (m, { args, usedPrefix, command }) => {
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
  try {
    m.react(wait);
    const answer = await ryoikitenkai(text);
    if (answer) {
      m.reply(answer);
    } else {
      const answerV2 = await ryoikitenkaiV2(text);
      if (answerV2) {
        m.reply(answerV2);
      } else {
        const answerV3 = await ryoikitenkaiV3(text);
        m.reply(answerV3);
      }
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
async function ryoikitenkai(prompt) {
  try {
    const response = await fetch(
      `https://smfahim.onrender.com/chatfun?question=${encodeURIComponent(prompt)}`,
    );
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data?.gptfun;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
async function ryoikitenkaiV3(prompt) {
  try {
    const response = await fetch(
      `https://www.noobs-api.000.pe/dipto/gemini2?text=${encodeURIComponent(prompt)}`,
    );
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data?.response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
async function ryoikitenkai2(prompt) {
  try {
    const response = await fetch(
      `https://api.fumifumi.xyz/api/gpt4?query=${encodeURIComponent(prompt)}`,
    );
    const responseData = await response.json();
    return responseData.data?.response;
  } catch (error) {
    console.error("Fallback Fetch error:", error);
    throw error;
  }
}
