import fetch from "node-fetch";
import crypto from "crypto";
import { RushChat } from "../../lib/ai/rushchat.js";
const generateSessionId = () => crypto.randomUUID();
const handler = async (m, { conn, args, usedPrefix, command }) => {
  db.data.dbai.rushchat = db.data.dbai.rushchat || {};
  const userId = m.sender;
  db.data.dbai.rushchat[userId] = db.data.dbai.rushchat[userId] || {
    sessionId: generateSessionId(),
  };
  const rushChatInstance = new RushChat();
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
    const sessionId = db.data.dbai.rushchat[userId].sessionId;
    if (command === "rushchat") {
      const output = await rushChatInstance.chat(text, sessionId);
      if (output) {
        const response = await conn.reply(m.chat, `${output}`, m);
        db.data.dbai.rushchat[userId].lastMessageId = response.key.id;
        db.data.dbai.rushchat[userId].cmd = command;
      } else {
        m.reply("Tidak ada output yang dihasilkan.");
      }
    } else if (command === "rushchatimg") {
      const output = await rushChatInstance.image(text, sessionId);
      if (output) {
        const response = await conn.sendMessage(
          m.chat,
          {
            image: {
              url: output.msg.imgUrl,
            },
            caption: `Gambar hasil permintaan`,
            mentions: [m.sender],
          },
          {
            quoted: m,
          },
        );
        db.data.dbai.rushchat[userId].lastMessageId = response.key.id;
        db.data.dbai.rushchat[userId].cmd = command;
      } else {
        m.reply("Tidak ada gambar yang dihasilkan.");
      }
    }
  } catch {
    m.reply("Terjadi kesalahan selama pemrosesan.");
  }
};
handler.before = async (m, { conn }) => {
  db.data.dbai.rushchat = db.data.dbai.rushchat || {};
  const userId = m.sender;
  if (!db.data.dbai.rushchat[userId]?.sessionId || m.isBaileys) return;
  const rushChatInstance = new RushChat();
  const { lastMessageId, sessionId, cmd } = db.data.dbai.rushchat[userId];
  if (lastMessageId && m.quoted?.id === lastMessageId && m.text.trim()) {
    m.react(wait);
    try {
      if (cmd === "rushchat") {
        const output = await rushChatInstance.chat(m.text.trim(), sessionId);
        if (output) {
          const response = await conn.reply(m.chat, `${output}`, m);
          db.data.dbai.rushchat[userId].lastMessageId = response.key.id;
        }
        m.react(sukses);
      } else if (cmd === "rushchatimg") {
        const output = await rushChatInstance.image(m.text.trim(), sessionId);
        if (output) {
          const response = await conn.sendMessage(
            m.chat,
            {
              image: {
                url: output.msg.imgUrl,
              },
              caption: `Gambar hasil permintaan`,
              mentions: [m.sender],
            },
            {
              quoted: m,
            },
          );
          db.data.dbai.rushchat[userId].lastMessageId = response.key.id;
        }
        m.react(sukses);
      }
    } catch (error) {
      m.react(eror);
      console.error("Handler " + command + " error:", error);
    }
  }
};
handler.help = ["rushchat", "rushchatimg"];
handler.tags = ["ai"];
handler.command = /^(rushchat|rushchatimg)$/i;
handler.limit = true;
export default handler;
