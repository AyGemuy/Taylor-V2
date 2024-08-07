export async function before(m, {
  isAdmin,
  isBotAdmin
}) {
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup) return false;
  let chat = db.data.chats[m.chat];
  let isVirtexOn = /(PLHIPS|৭৭|๑๑|๒๒|[Đৡดผ๖⃝-⃟⃢-⃤㜸])/i.exec(m.text);
  if (chat.antiVirtex && isVirtexOn && !m.fromMe) {
    if (await this.sendMessage(m.chat, {
        delete: m.key
      }), await this.groupParticipantsUpdate(m.chat, [m.sender], "remove"), await this.reply(m.chat, "*Font Virtext detect!*" + (isBotAdmin ? "" : "\n\n_Bot bukan admin_"), m), isBotAdmin) {
      return m.reply("Pesan dihapus karena deteksi font Virtext!");
    } else {
      if (!isBotAdmin) {
        return m.reply("Bot tidak bisa menghapus pesan ini!");
      }
    }
  }
  return true;
}