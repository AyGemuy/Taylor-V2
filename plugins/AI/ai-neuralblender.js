import fetch from "node-fetch";
const NeuralBlender = async (prompt) => {
  const url =
    "https://nb3corsproxyfunction2.azurewebsites.net/api/corsproxy/render";
  const blends = ["mnemosyne", "nb3"];
  const randomBlend = blends[Math.floor(Math.random() * blends.length)];
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
      Referer: "https://neuralblender.com/create-art",
    },
    body: JSON.stringify({
      prompt: prompt,
      blend: randomBlend,
      num_inference_steps: randomBlend === "nb3" ? 4 : 25,
      guidance_scale: randomBlend === "nb3" ? 3.5 : 7.5,
    }),
  };
  try {
    const response = await fetch(url, options);
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Error fetching from neuralblender:", error);
    throw error;
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  let text = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text)
    return m.reply(
      `Silakan berikan teks atau balas pesan yang berisi teks untuk diproses.\nContoh penggunaan:\n*${usedPrefix}${command} Men*`,
    );
  m.react(wait);
  try {
    const imageBuffer = await NeuralBlender(text);
    const caption = `✨ *\`AI Image Generated\`* ✨\n\n📝 *Prompt:* ${text}`;
    await conn.sendMessage(
      m.chat,
      {
        image: imageBuffer,
        caption: caption,
      },
      {
        quoted: m,
      },
    );
    m.react(sukses);
  } catch (error) {
    console.error(error);
    m.react(eror);
  }
};
handler.help = ["neuralblender"];
handler.tags = ["ai"];
handler.command = /^(neuralblender)$/i;
export default handler;
