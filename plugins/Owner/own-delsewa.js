import { clockString } from "../../lib/other-function.js";
let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let who = m.isGroup ? (args[1] ? args[1] : m.chat) : args[1];
    if (!db.data.chats[who]) {
      return await m.reply("❌ Data grup tidak ditemukan.");
    }
    if (!db.data.chats[who].expired) {
      return await m.reply(
        "⚠️ Tidak ada hari kadaluarsa yang tersimpan untuk grup ini.",
      );
    }
    const expiredTime = clockString(db.data.chats[who].expired);
    await m.reply(`🕒 Hari kadaluarsa sebelumnya: ${expiredTime}`);
    delete db.data.chats[who].expired;
    await m.reply("✅ Berhasil menghapus hari kadaluarsa untuk grup ini.");
  } catch (error) {
    console.error(error);
    await m.reply("⚠️ Terjadi kesalahan, silakan coba lagi.");
  }
};
handler.help = ["delsewa"];
handler.tags = ["owner"];
handler.command = /^(delexpired|delsewa)$/i;
handler.rowner = true;
handler.group = true;
export default handler;
