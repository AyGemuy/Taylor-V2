import fetch from "node-fetch";
async function JuliusAI(messageContent) {
  try {
    const response = await fetch("https://api.julius.ai/api/chat/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer null",
        "conversation-id": "eec65c93-6c85-495a-85b6-3ddd5bd113b6",
        "is-demo": "temp_96b13736-6f40-4f2a-bc84-1a08f0ee81af",
        "Is-Native": "false",
        "visitor-id": "pVxGJSS6O0wHWRK0ijuD",
        "request-id": "1724760658602.2QLQPe",
        "orient-split": "true",
        "use-dict": "true",
        "interactive-charts": "true",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
        Referer:
          "https://julius.ai/ai-chatbot?id=eec65c93-6c85-495a-85b6-3ddd5bd113b6",
      },
      body: JSON.stringify({
        message: {
          content: messageContent,
        },
        provider: "default",
        chat_mode: "auto",
        client_version: "20240130",
        theme: "light",
        new_images: null,
        new_attachments: null,
        dataframe_format: "json",
        selectedModels: ["GPT-4o"],
      }),
      compress: true,
    });
    const rawResponse = await response.text();
    const responses = rawResponse
      .trim()
      .split("\n")
      .filter((line) => {
        try {
          const json = JSON.parse(line);
          return json.content && json.content.trim();
        } catch {
          return false;
        }
      })
      .map((line) => JSON.parse(line).content)
      .join("");
    return responses.trim();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.julius) db.data.dbai.julius = {};
  const inputText = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!inputText) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  const userId = m.sender;
  if (!db.data.dbai.julius[userId]) {
    db.data.dbai.julius[userId] = {
      conversation_id: "eec65c93-6c85-495a-85b6-3ddd5bd113b6",
    };
  }
  m.react(wait);
  try {
    const output = await JuliusAI(inputText);
    const snippets = [...output.matchAll(/```([^`]+)```/g)].map((match) =>
      match[1].trim(),
    );
    let result;
    if (snippets.length) {
      const ctaButton = conn.ctaButton.setBody(output);
      let index = 1;
      for (const snippet of snippets) {
        ctaButton.addCopy(`Snippet ${index++}`, snippet);
      }
      result = await ctaButton.run(m.chat, conn, m);
    } else {
      result = await conn.reply(m.chat, output, m);
    }
    const {
      key: { id: keyId },
    } = result;
    db.data.dbai.julius[userId].key = {
      id: keyId,
    };
    m.react(sukses);
  } catch (error) {
    console.error("Handler error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (!db.data.dbai.julius || m.isBaileys || !(m.sender in db.data.dbai.julius))
    return;
  const userId = m.sender;
  const { conversation_id, key } = db.data.dbai.julius[userId];
  if (m.quoted?.id === key?.id && m.text.trim()) {
    m.react(wait);
    try {
      const output = await JuliusAI(m.text.trim());
      const snippets = [...output.matchAll(/```([^`]+)```/g)].map((match) =>
        match[1].trim(),
      );
      let result;
      if (snippets.length) {
        const ctaButton = conn.ctaButton.setBody(output);
        let index = 1;
        for (const snippet of snippets) {
          ctaButton.addCopy(`Snippet ${index++}`, snippet);
        }
        result = await ctaButton.run(m.chat, conn, m);
      } else {
        result = await conn.reply(m.chat, output, m);
      }
      const {
        key: { id: newKeyId },
      } = result;
      db.data.dbai.julius[userId].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["julius"];
handler.tags = ["ai"];
handler.command = /^(julius)$/i;
export default handler;
