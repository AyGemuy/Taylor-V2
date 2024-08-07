import fetch from "node-fetch";
import _ from "lodash";
const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  command,
  args
}) => {
  let text;
  if (args.length >= 1) {
    text = args.join(" ");
  } else {
    if (!m.quoted || !m.quoted?.text) {
      return m.reply(`Masukkan teks atau reply pesan dengan teks.\nContoh penggunaan:\n*${usedPrefix}${command} hello world*`);
    }
    text = m.quoted?.text;
  }
  try {
    m.react(wait);
    const img = await Draw(text);
    await conn.ctaButton.setBody("*[ Hasil ]*").setImage(img).setFooter('Klik "Next" untuk mencoba lagi').addReply("Next", usedPrefix + command + " " + text).run(m.chat, conn, m);
    m.react(sukses);
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
  }
};
handler.help = ["diffusion"];
handler.tags = ["misc"];
handler.command = /^(diffusion)$/i;
export default handler;
async function Draw(prompt) {
  try {
    const response = await fetch("https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5", {
      method: "POST",
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt
      })
    });
    if (!response.ok) throw new Error("Network response was not ok.");
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
}