import fetch from "node-fetch";
const AVAILABLE_MODELS = [
  "llama-3-70b",
  "llama-3-405b",
  "gpt-3.5-turbo",
  "gpt-4o",
];
const extractData = (input) => {
  return input
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => {
      try {
        const json = JSON.parse(line.substring(6).trim());
        if (json.event === "stream-end") {
          return "";
        }
        if (json.event === "final-response") {
          return json.data.message || "";
        }
        return "";
      } catch {
        return "";
      }
    })
    .join("")
    .trim();
};
async function Chat(prompt, model) {
  if (!AVAILABLE_MODELS.includes(model)) {
    throw new Error("Model not available");
  }
  try {
    const response = await fetch("https://darkai.foundation/chat", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0",
      },
      body: JSON.stringify({
        query: prompt,
        model: model,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.text();
    return extractData(result);
  } catch (error) {
    console.error("Error during chat request:", error);
    throw error;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  db.data.dbai.darkai = db.data.dbai.darkai || {};
  db.data.dbai.darkai[m.sender] = db.data.dbai.darkai[m.sender] || {
    model: "gpt-4o",
  };
  if (command === "darkaimodel") {
    const modelIndex = parseInt(args[0]) - 1;
    const selectedModel = AVAILABLE_MODELS[modelIndex];
    if (!selectedModel) {
      const modelList = AVAILABLE_MODELS.map((v, i) => `*${i + 1}.* ${v}`).join(
        "\n",
      );
      return m.reply(
        `Nomor model tidak valid. Pilih nomor antara 1 dan ${AVAILABLE_MODELS.length}.\nModel yang tersedia:\n${modelList}`,
      );
    }
    db.data.dbai.darkai[m.sender].model = selectedModel;
    return m.reply(`Model diatur menjadi: *${selectedModel}*`);
  }
  if (!db.data.dbai.darkai[m.sender]?.model) {
    return m.reply(
      `Atur model terlebih dahulu dengan command *${usedPrefix}darkaimodel*.`,
    );
  }
  if (command === "darkai") {
    const text =
      args.length >= 1
        ? args.slice(0).join(" ")
        : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text) {
      return m.reply(
        `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
      );
    }
    m.react(wait);
    try {
      const model = db.data.dbai.darkai[m.sender].model;
      const output = await Chat(text, model);
      if (output) {
        const response = await conn.reply(m.chat, `${output}`, m);
        db.data.dbai.darkai[m.sender].lastMessageId = response.key.id;
      } else {
        m.reply("Tidak ada output yang dihasilkan.");
      }
    } catch (error) {
      console.error("Error during darkai:", error);
      m.reply("Terjadi kesalahan selama pemrosesan.");
    }
  }
};
handler.before = async (m, { conn }) => {
  db.data.dbai.darkai = db.data.dbai.darkai || {};
  db.data.dbai.darkai[m.sender] = db.data.dbai.darkai[m.sender] || {
    model: "gpt-4o",
  };
  if (!db.data.dbai.darkai[m.sender]?.model || m.isBaileys) return;
  const { lastMessageId, model } = db.data.dbai.darkai[m.sender];
  if (lastMessageId && m.quoted?.id === lastMessageId && m.text.trim()) {
    m.react(wait);
    try {
      const output = await Chat(m.text.trim(), model);
      if (output) {
        const response = await conn.reply(m.chat, `${output}`, m);
        db.data.dbai.darkai[m.sender].lastMessageId = response.key.id;
      }
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["darkai", "darkaimodel"];
handler.tags = ["ai"];
handler.command = /^(darkai|darkaimodel)$/i;
handler.limit = true;
export default handler;
