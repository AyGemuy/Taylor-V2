import fetch from "node-fetch";
const AVAILABLE_MODELS = [
  "morphic",
  "llama-3.1-sonar-large-128k-online",
  "llama-3.1-sonar-small-128k-online",
  "llama-3.1-sonar-large-128k-chat",
  "llama-3.1-sonar-small-128k-chat",
  "llama-3.1-8b-instruct",
  "llama-3.1-70b-instruct",
  "GPT-3.5",
  "GPT-4o",
  "gemini",
  "google-search",
  "duckduckgo-search",
];
const extractData = (input) => {
  try {
    return input.message || "";
  } catch {
    return "";
  }
};
async function Chat(prompt, model) {
  if (!AVAILABLE_MODELS.includes(model)) {
    throw new Error("Model not available");
  }
  try {
    const url = "https://yanzgpt.my.id/chat";
    const payload = {
      query: prompt,
      model: model,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
        Referer: "https://yanzgpt.my.id/chat",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return extractData(result);
  } catch (error) {
    console.error("Error during chat request:", error);
    throw error;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  db.data.dbai.yanzgpt = db.data.dbai.yanzgpt || {};
  db.data.dbai.yanzgpt[m.sender] = db.data.dbai.yanzgpt[m.sender] || {
    model: "GPT-3.5",
  };
  if (command === "yanzgptmodel") {
    const modelIndex = parseInt(args[0]) - 1;
    const selectedModel = AVAILABLE_MODELS[modelIndex];
    if (!selectedModel) {
      const modelList = AVAILABLE_MODELS.map((v, i) => `*${i + 1}.* ${v}`).join(
        "\n",
      );
      return m.reply(
        `Invalid model number. Please choose a number between 1 and ${AVAILABLE_MODELS.length}.\nAvailable models:\n${modelList}`,
      );
    }
    db.data.dbai.yanzgpt[m.sender].model = selectedModel;
    return m.reply(`Model set to: *${selectedModel}*`);
  }
  if (!db.data.dbai.yanzgpt[m.sender]?.model) {
    return m.reply(
      `Set a model first using the command *${usedPrefix}yanzgptmodel*.`,
    );
  }
  if (command === "yanzgpt") {
    const text =
      args.length >= 1
        ? args.join(" ")
        : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text) {
      return m.reply(
        `Please provide some text or reply to a message with the text you want to process.\nUsage example:\n*${usedPrefix}${command} Hello, how are you?*`,
      );
    }
    m.react(wait);
    try {
      const model = db.data.dbai.yanzgpt[m.sender].model;
      const output = await Chat(text, model);
      if (output) {
        const response = await conn.reply(m.chat, `${output}`, m);
        db.data.dbai.yanzgpt[m.sender].lastMessageId = response.key.id;
      } else {
        m.reply("No output generated.");
      }
    } catch (error) {
      console.error("Error during yanzgpt:", error);
      m.reply("An error occurred during processing.");
    }
  }
};
handler.before = async (m, { conn }) => {
  db.data.dbai.yanzgpt = db.data.dbai.yanzgpt || {};
  db.data.dbai.yanzgpt[m.sender] = db.data.dbai.yanzgpt[m.sender] || {
    model: "GPT-3.5",
  };
  if (!db.data.dbai.yanzgpt[m.sender]?.model || m.isBaileys) return;
  const { lastMessageId, model } = db.data.dbai.yanzgpt[m.sender];
  if (lastMessageId && m.quoted?.id === lastMessageId && m.text.trim()) {
    m.react(wait);
    try {
      const output = await Chat(m.text.trim(), model);
      if (output) {
        const response = await conn.reply(m.chat, `${output}`, m);
        db.data.dbai.yanzgpt[m.sender].lastMessageId = response.key.id;
      }
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["yanzgpt", "yanzgptmodel"];
handler.tags = ["ai"];
handler.command = /^(yanzgpt|yanzgptmodel)$/i;
handler.limit = true;
export default handler;
