export async function before(m, {
  isAdmin,
  isBotAdmin,
  isOwner
}) {
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup) return false;
  if (m.isBaileys || m.mtype !== "stickerMessage" || !db.data.chats[m.chat]?.antiSticker) return;
  const user = db.data.users[m.sender];
  user.warn += 1;
  if (!isOwner) user.banned = true;
  m.reply("⚠️ *Stiker Terdeteksi!* ⚠️\nKamu telah mengirimkan stiker yang tidak diizinkan.");
  if (!isAdmin && isBotAdmin) {
    await this.sendMessage(m.chat, {
      delete: m.key
    });
    m.reply("❌ *Stiker terdeteksi dan dihapus.*");
  } else if (!isAdmin && !isBotAdmin) {
    m.reply("❌ *Kamu tidak diizinkan mengirim stiker.*");
  }
}