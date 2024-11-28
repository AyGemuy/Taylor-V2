import fetch from "node-fetch";
async function AiImage(prompt, key = "RANDOM") {
  try {
    const createResponse = await fetch(
      "https://aiimagegenerator.io/api/model/predict-peach",
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          platform: "PC",
          product: "AI_IMAGE_GENERATOR",
          locale: "en-US",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
          Referer: "https://aiimagegenerator.io/",
        },
        body: JSON.stringify({
          prompt: prompt,
          negativePrompt: "",
          key: key,
          width: 512,
          height: 768,
          quantity: 1,
          size: "512x768",
        }),
      },
    );
    if (!createResponse.ok) {
      throw new Error(`HTTP error! Status: ${createResponse.status}`);
    }
    const createData = await createResponse.json();
    const taskId = createData.data;
    if (!taskId) {
      throw new Error("Failed to create task.");
    }
    const timeout = 6e4;
    const startTime = Date.now();
    let imageUrl = null;
    while (Date.now() - startTime < timeout) {
      await new Promise((resolve) => setTimeout(resolve, 1e4));
      try {
        const statusResponse = await fetch(
          `https://aiimagegenerator.io/api/model/status/${taskId}`,
        );
        const statusData = await statusResponse.json();
        if (statusData.data?.url) {
          imageUrl = statusData.data.url;
          break;
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (imageUrl) {
      return imageUrl;
    } else {
      throw new Error("Failed to generate image within the timeout period.");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
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
    const imageUrl = await AiImage(text, key);
    const caption = `✨ *\`AI Image Generated\`* ✨\n\n📝 *Prompt:* ${text}`;
    await conn.sendMessage(
      m.chat,
      {
        image: {
          url: imageUrl,
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
handler.help = ["aiimage"];
handler.tags = ["ai"];
handler.command = /^(aiimage)$/i;
export default handler;
