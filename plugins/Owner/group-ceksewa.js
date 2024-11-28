import { clockString } from "../../lib/other-function.js";
let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    const chatData = db.data.chats[m.chat];
    if (!chatData || chatData.expired < 1) {
      return m.reply("Group ini tidak di-set sewa!");
    }
    let who = m.isGroup ? (args[1] ? args[1] : m.chat) : args[1];
    if (!db.data.chats[who] || db.data.chats[who].expired < 1) {
      return m.reply(
        "Data sewa grup tidak ditemukan atau sudah tidak berlaku.",
      );
    }
    const jumlahHari = 864e5 * (args[0] || 0);
    const now = Date.now();
    const remainingTime = db.data.chats[who].expired - now;
    if (remainingTime < 0) {
      return m.reply("Sewa telah berakhir.");
    }
    await m.reply(
      `Sewa akan berakhir dalam ${clockString(remainingTime)} lagi.`,
    );
  } catch (error) {
    console.error(error);
    await m.reply("Terjadi kesalahan, silakan coba lagi.");
  }
};
handler.help = ["ceksewa"];
handler.tags = ["group"];
handler.command = /^(cek(sewa)?)$/i;
handler.group = true;
export default handler;
