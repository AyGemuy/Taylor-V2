import fetch from "node-fetch";
const AiArtGenerator = async (
  prompt,
  style = "3D Model",
  model = "sdxl-lightning",
) => {
  try {
    const response = await fetch(
      "https://www.ai-art-generator.net/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user": "",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
          Referer: "https://www.ai-art-generator.net/playground",
        },
        body: JSON.stringify({
          prompt: prompt,
          style: style,
          model: model,
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    const jsonData = JSON.parse(data);
    return jsonData.images;
  } catch (error) {
    console.error("Error in AiArtGenerator:", error);
    return null;
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.aiartgenerator) db.data.dbai.aiartgenerator = {};
  const inputText = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!inputText) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} --model=sdxl --style=3D portrait of a female sorcerer*`,
    );
  }
  const model = inputText.match(/--model=(\w+)/)
    ? inputText.match(/--model=(\w+)/)[1]
    : "sdxl-lightning";
  const style = inputText.match(/--style=(\w+)/)
    ? inputText.match(/--style=(\w+)/)[1]
    : "3D Model";
  const prompt = inputText
    .replace(/--model=\w+/, "")
    .replace(/--style=\w+/, "")
    .trim();
  m.react(wait);
  try {
    const images = await AiArtGenerator(prompt, style, model);
    const tag = `@${m.sender.split("@")[0]}`;
    for (const imageBase64 of images) {
      const base64Data = imageBase64.split(",")[1];
      const buffer = Buffer.from(base64Data, "base64");
      await conn.sendMessage(
        m.chat,
        {
          image: buffer,
          caption: `Hasil seni untuk prompt: "${prompt}"\nGaya: *${style}*\nModel: *${model}*\nRequest by: ${tag}`,
          mentions: [m.sender],
        },
        {
          quoted: m,
        },
      );
    }
    m.react(sukses);
  } catch (error) {
    console.error("Handler error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.dbai.aiartgenerator ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.aiartgenerator)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.aiartgenerator[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const model = m.text.match(/--model=(\w+)/)
        ? m.text.match(/--model=(\w+)/)[1]
        : "sdxl-lightning";
      const style = m.text.match(/--style=(\w+)/)
        ? m.text.match(/--style=(\w+)/)[1]
        : "3D Model";
      const prompt = m.text
        .replace(/--model=\w+/, "")
        .replace(/--style=\w+/, "")
        .trim();
      const images = await AiArtGenerator(prompt, style, model);
      const tag = `@${m.sender.split("@")[0]}`;
      for (const imageBase64 of images) {
        const base64Data = imageBase64.split(",")[1];
        const buffer = Buffer.from(base64Data, "base64");
        await conn.sendMessage(
          m.chat,
          {
            image: buffer,
            caption: `Hasil seni untuk prompt: "${prompt}"\nGaya: *${style}*\nModel: *${model}*\nRequest by: ${tag}`,
            mentions: [m.sender],
          },
          {
            quoted: m,
          },
        );
      }
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["aiartgenerator"];
handler.tags = ["ai"];
handler.command = /^(aiartgenerator)$/i;
export default handler;
