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
    let data = await generateImage(text);
    if (data && data.imgs.length > 0)
      for (let i = 0; i < data.imgs.length; i++) await conn.sendFile(m.chat, data.imgs[i], "", `Image *(${i + 1}/${data.imgs.length})*`, m, !1, {
        mentions: [m.sender]
      });
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["gptphoto"], handler.tags = ["gpt"], handler.command = /^(gptphoto)$/i;
export default handler;
async function generateImage(captionInput) {
  const data = {
    captionInput: captionInput,
    captionModel: "default"
  };
  try {
    const response = await fetch("https://chat-gpt.photos/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    throw console.error("Error:", error), error;
  }
}