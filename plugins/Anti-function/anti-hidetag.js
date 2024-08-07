export async function before(m, {
  isBotAdmin
}) {
  try {
    if (m.isBaileys && m.fromMe) return true;
    if (!m.isGroup) return false;
    let chat = db.data.chats[m.chat];
    if (chat && m.isGroup && chat.antiHidetag) {
      let mentionedJidLength = m.message?.[m.mtype]?.contextInfo?.mentionedJid?.length || m.msg?.contextInfo?.mentionedJid?.length;
      let participantsLength = this.chats[m.chat]?.participants?.length || store.chats[m.chat]?.participants?.length;
      if (!participantsLength) {
        try {
          participantsLength = (await this.groupMetadata(m.chat)).participants?.length;
        } catch (metadataError) {
          console.error(metadataError);
        }
      }
      if (mentionedJidLength === participantsLength) {
        m.reply(`@${m.sender?.split("@")[0]} Terdeteksi mengirim pesan hidetag!!`);
        if (!isAdmin && isBotAdmin) {
          await this.sendMessage(m.chat, {
            delete: m.key
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}