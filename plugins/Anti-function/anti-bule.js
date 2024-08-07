export async function before(m, {
  isAdmin,
  isOwner
}) {
  try {
    if (m.isBaileys && m.fromMe) return true;
    if (!m.isGroup) return false;
    const name = await this.getName(m.sender);
    const user = db.data.users[m.sender];
    if (!isAdmin && db.data.chats[m.chat]?.antibule) {
      const allowedPrefixes = ["62", "60"];
      const senderPrefix = m.sender?.substring(0, 2);
      if (!allowedPrefixes.includes(senderPrefix)) {
        if (!isOwner) user.banned = true;
        await this.reply(m.chat, `🚫 Maaf ${name} @${m.sender?.split("@")[0]}, Anda tidak diizinkan mengakses layanan ini dari negara Anda (${senderPrefix}).`, m, {
          mentions: [this.parseMention(m.sender)]
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
}