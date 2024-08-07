import fetch from "node-fetch";
import fs from "fs";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  try {
    let template = (args[0] || "").toLowerCase();
    const badWords = [...new Set(Object.values(db.data.database?.badWords)?.flat())]?.sort();
    if (!args[0] || !badWords.includes(template)) {
      let caption = `*Contoh Penggunaan*\n\n${usedPrefix + command} tai @user\n\n*List Command*\n${badWords.map(word => `• ${word}`).join("\n")}`;
      await conn.reply(m.chat, caption, m, {
        mentions: conn.parseMention(caption)
      });
      return;
    }
    if (command && badWords.includes(template)) {
      let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
        name = conn.getName(who),
        sim = Math.random() * 100,
        caption = `Tingkat ke *${args[0]}an* \nAtas nama ${args[1] || name || "*Semua Member*"} \nAdalah Sebesar *${Number(sim).toFixed(2)}%*`;
      await conn.reply(m.chat, caption, m, {
        mentions: conn.parseMention(caption)
      });
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, "Terjadi kesalahan pada sistem.", m);
  }
};
handler.help = ["cek <menu> <user>"];
handler.tags = ["tools"];
handler.command = /^cek$/i;
export default handler;