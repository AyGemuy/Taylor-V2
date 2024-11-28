import fetch from "node-fetch";
async function FluxAiImage(prompt) {
  const taskUrl = "https://fluxaiimagegenerator.com/api/task";
  const statusUrl = (taskId) =>
    `https://fluxaiimagegenerator.com/api/task?taskId=${taskId}`;
  try {
    const createResponse = await fetch(taskUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
        Referer: "https://fluxaiimagegenerator.com/",
      },
      body: JSON.stringify({
        prompt: prompt,
        aspectRatio: "1024x1024",
        outputFormat: "png",
        outputQuality: 100,
        isPublic: true,
      }),
    });
    if (!createResponse.ok) {
      throw new Error(`HTTP error! Status: ${createResponse.status}`);
    }
    const createData = await createResponse.json();
    const taskId = createData.data?.taskId;
    if (!taskId) {
      throw new Error("Failed to create task.");
    }
    const timeout = 6e4;
    const startTime = Date.now();
    let imageUrl = null;
    while (Date.now() - startTime < timeout) {
      await new Promise((resolve) => setTimeout(resolve, 1e4));
      try {
        const statusResponse = await fetch(statusUrl(taskId), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
            Referer: "https://fluxaiimagegenerator.com/",
          },
        });
        if (!statusResponse.ok) {
          throw new Error(`HTTP error! Status: ${statusResponse.status}`);
        }
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
  m.react(wait);
  try {
    const imageUrl = await FluxAiImage(text);
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
handler.help = ["fluxaiimage"];
handler.tags = ["ai"];
handler.command = /^(fluxaiimage)$/i;
export default handler;
