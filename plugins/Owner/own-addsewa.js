import { clockString } from "../../lib/other-function.js";
const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i;
let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  const teks = text.split(" ");
  try {
    if (!teks[0] || isNaN(teks[0])) {
      return m.reply(
        `Masukkan Angka Mewakili Jumlah Hari !\n*Misal : ${usedPrefix + command} 1 https://chat.whatsapp.com/Dw1R6DW8JoUCTLZQLEhq7A*`,
      );
    }
    const [_, code] = teks[1] ? teks[1].match(linkRegex) : [];
    const jumlahHari = 864e5 * teks[0];
    const now = Date.now();
    if (!m.isGroup) {
      if (!code) {
        return m.reply("Link invalid");
      }
      await conn.groupAcceptInvite(code);
      const who = teks[1] ? m.chat : m.chat;
      if (!db.data.chats[who])
        db.data.chats[who] = {
          expired: now,
          isBanned: false,
        };
      if (now < db.data.chats[who].expired) {
        db.data.chats[who].expired += jumlahHari;
      } else {
        db.data.chats[who].expired = now + jumlahHari;
      }
      db.data.chats[who].isBanned = false;
      await m.reply(
        `Berhasil Menetapkan Hari Kadaluarsa Untuk Grup Ini Selama ${teks[0]} Hari.\n\nHitung Mundur : ${clockString(db.data.chats[who].expired - now)}`,
      );
      await m.reply("halo gaes");
    } else {
      if (!db.data.chats[m.chat])
        db.data.chats[m.chat] = {
          expired: now,
          isBanned: false,
        };
      if (now < db.data.chats[m.chat].expired) {
        db.data.chats[m.chat].expired += jumlahHari;
      } else {
        db.data.chats[m.chat].expired = now + jumlahHari;
      }
      db.data.chats[m.chat].isBanned = false;
      await m.reply(
        `Berhasil Menetapkan Hari Kadaluarsa Untuk Grup Ini Selama ${teks[0]} Hari.\n\nHitung Mundur : ${clockString(db.data.chats[m.chat].expired - now)}`,
      );
    }
  } catch (error) {
    console.error(error);
    await m.reply("Terjadi kesalahan, silakan coba lagi.");
  }
};
handler.help = ["addsewa"];
handler.tags = ["owner"];
handler.command = /^(addsewa)$/i;
handler.rowner = true;
handler.group = false;
export default handler;
