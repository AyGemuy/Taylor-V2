const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i;
export async function before(m, {
  isAdmin,
  isBotAdmin
}) {
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup) return false;
  const chat = db.data.chats[m.chat];
  const isGroupLink = linkRegex.test(m.text || m.description);
  const kickMessage = isAdmin ? "❌ *Tautan Terdeteksi*\nAnda admin grup tidak bisa dikeluarkan dari grup." : "❌ *Tautan Terdeteksi*\nAnda akan dikeluarkan dari grup.";
  if (chat.antiLink && isGroupLink) {
    await this.reply(m.chat, kickMessage, null, {
      mentions: [m.sender]
    });
    if (!isBotAdmin) {
      await this.reply(m.chat, "Bot bukan *Admin*, tidak bisa menghapus pesan atau mengeluarkan anggota.", null, {
        mentions: [m.sender]
      });
      return true;
    }
    await this.sendMessage(m.chat, {
      delete: m.key
    });
    if (!isAdmin && isBotAdmin) {
      await this.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      await this.reply(m.chat, kickMessage, null, {
        mentions: [m.sender]
      });
      await this.sendMessage(m.chat, {
        delete: m.key
      });
    }
    return true;
  }
  return true;
}