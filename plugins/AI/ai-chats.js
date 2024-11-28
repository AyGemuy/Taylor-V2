import fetch from "node-fetch";
import crypto from "crypto";
const AVAILABLE_MODELS = [
  "gpt-4o-mini",
  "toolbaz_v3.5_pro",
  "toolbaz_v3",
  "toolbaz_v2",
  "unfiltered_x",
  "mixtral_8x22b",
  "Qwen2-72B",
  "Llama-3-70B",
];
const generateSessionId = () => crypto.randomUUID();
const AiChats = async (
  prompt,
  type = "chat",
  model = "gpt-4o-mini",
  sessionId,
) => {
  const url = "https://ai-chats.org/chat/send2/";
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
    Referer:
      type === "image"
        ? "https://ai-chats.org/image/"
        : "https://ai-chats.org/chat/",
  };
  const body = JSON.stringify({
    type: type,
    messagesHistory: [
      {
        id: sessionId,
        from: "you",
        content: prompt,
      },
    ],
  });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    if (type === "image") {
      const data = await response.json();
      return data.data[0].url;
    } else {
      const data = await response.text();
      return data
        .split("\n")
        .filter((line) => line.trim())
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).trim())
        .join("");
    }
  } catch {
    throw new Error("Terjadi kesalahan selama pemrosesan.");
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  db.data.dbai.aichats = db.data.dbai.aichats || {};
  const userId = m.sender;
  db.data.dbai.aichats[userId] = db.data.dbai.aichats[userId] || {
    model: "gpt-4o-mini",
    sessionId: generateSessionId(),
  };
  if (command === "aichatsmodel") {
    const modelIndex = parseInt(args[0], 10) - 1;
    const selectedModel = AVAILABLE_MODELS[modelIndex];
    if (!selectedModel) {
      const modelList = AVAILABLE_MODELS.map((v, i) => `*${i + 1}.* ${v}`).join(
        "\n",
      );
      return m.reply(
        `Nomor model tidak valid. Pilih nomor antara 1 dan ${AVAILABLE_MODELS.length}.\nModel yang tersedia:\n${modelList}`,
      );
    }
    db.data.dbai.aichats[userId].model = selectedModel;
    return m.reply(`Model diatur menjadi: *${selectedModel}*`);
  }
  if (!db.data.dbai.aichats[userId]?.model) {
    return m.reply(
      `Atur model terlebih dahulu dengan command *${usedPrefix}aichatsmodel*.`,
    );
  }
  const text =
    args.length >= 1
      ? args.join(" ")
      : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  m.react(wait);
  try {
    const model = db.data.dbai.aichats[userId].model;
    const sessionId = db.data.dbai.aichats[userId].sessionId;
    if (command === "aichats") {
      const output = await AiChats(text, "chat", model, sessionId);
      if (output) {
        const response = await conn.reply(m.chat, `${output}`, m);
        db.data.dbai.aichats[userId].lastMessageId = response.key.id;
        db.data.dbai.aichats[userId].cmd = command;
      } else {
        m.reply("Tidak ada output yang dihasilkan.");
      }
    } else if (command === "aichatsimg") {
      const output = await AiChats(text, "image", model, sessionId);
      if (output) {
        const response = await conn.sendMessage(
          m.chat,
          {
            image: {
              url: output,
            },
            caption: `Gambar hasil permintaan`,
            mentions: [m.sender],
          },
          {
            quoted: m,
          },
        );
        db.data.dbai.aichats[userId].lastMessageId = response.key.id;
        db.data.dbai.aichats[userId].cmd = command;
      } else {
        m.reply("Tidak ada gambar yang dihasilkan.");
      }
    }
  } catch {
    m.reply("Terjadi kesalahan selama pemrosesan.");
  }
};
handler.before = async (m, { conn }) => {
  db.data.dbai.aichats = db.data.dbai.aichats || {};
  const userId = m.sender;
  if (!db.data.dbai.aichats[userId]?.model || m.isBaileys) return;
  const { lastMessageId, model, sessionId, cmd } = db.data.dbai.aichats[userId];
  if (lastMessageId && m.quoted?.id === lastMessageId && m.text.trim()) {
    m.react(wait);
    try {
      if (cmd === "aichats") {
        const output = await AiChats(m.text.trim(), "chat", model, sessionId);
        if (output) {
          const response = await conn.reply(m.chat, `${output}`, m);
          db.data.dbai.aichats[userId].lastMessageId = response.key.id;
        }
        m.react(sukses);
      } else if (cmd === "aichatsimg") {
        const output = await AiChats(m.text.trim(), "image", model, sessionId);
        if (output) {
          const response = await conn.sendMessage(
            m.chat,
            {
              image: {
                url: output,
              },
              caption: `Gambar hasil permintaan`,
              mentions: [m.sender],
            },
            {
              quoted: m,
            },
          );
          db.data.dbai.aichats[userId].lastMessageId = response.key.id;
        }
        m.react(sukses);
      }
    } catch (e) {
      m.react(eror);
      console.error("Handler error:", e);
    }
  }
};
handler.help = ["aichats", "aichatsimg", "aichatsmodel"];
handler.tags = ["ai"];
handler.command = /^(aichats|aichatsimg|aichatsmodel)$/i;
handler.limit = true;
export default handler;
