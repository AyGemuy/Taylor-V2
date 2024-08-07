import fetch from "node-fetch";
const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  command,
  args
}) => {
  const text = args.length >= 1 ? args.join(" ") : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  try {
    m.react(wait);
    const img = await Draw(text);
    await conn.ctaButton.setBody(`*[ Result ]*\n${text}`).setImage(img).setFooter('Klik "Next" untuk mencoba dengan teks lainnya').addReply("Next", usedPrefix + command + " " + text).run(m.chat, conn, m);
    m.react(sukses);
  } catch (e) {
    m.react(eror);
    console.error("Error:", e);
  }
};
handler.help = ["openjourney"];
handler.tags = ["misc"];
handler.command = /^(openjourney)$/i;
export default handler;
async function Draw(prompt) {
  try {
    const response = await fetch("https://api-inference.huggingface.co/models/prompthero/openjourney-v2", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer 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"
      },
      body: JSON.stringify({
        inputs: prompt
      })
    });
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
}