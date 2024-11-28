import fetch from "node-fetch";
async function PerchanceAI(prompt, key) {
  try {
    const response = await fetch(
      "https://perchanceai.cc/api/model/predict/v1",
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          platform: "PC",
          product: "PERCHANCE_AI",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
          Referer: "https://perchanceai.cc/",
        },
        body: JSON.stringify({
          prompt: prompt || "Men in the forest",
          negativePrompt: "",
          key: key || "Professional-Photo",
          size: "768x512",
        }),
        compress: true,
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  let text = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text)
    return m.reply(
      `Please provide text or reply to a message containing text to process.\nUsage example:\n*${usedPrefix}${command} Men*`,
    );
  let key = "RANDOM";
  const keyMatch = text.match(/--key=(\w+)$/);
  if (keyMatch) {
    key = keyMatch[1];
    text = text.replace(/ --key=\w+$/, "");
  }
  m.react(wait);
  try {
    const imageUrl = await PerchanceAI(text, key);
    const caption = `✨ *\`AI Image Generated\`* ✨\n\n📝 *Prompt:* ${imageUrl.data.prompt || text}`;
    await conn.sendMessage(
      m.chat,
      {
        image: {
          url: imageUrl.data.url,
        },
        caption: caption,
      },
      {
        quoted: m,
      },
    );
    m.react(sukses);
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["perchanceai"];
handler.tags = ["ai"];
handler.command = /^(perchanceai)$/i;
export default handler;
