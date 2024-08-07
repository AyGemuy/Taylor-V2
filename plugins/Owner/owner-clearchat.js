const handler = async (m, {
  conn
}) => {
  try {
    const chatIdsToDeleteGroup = Object.values(conn.chats).filter(item => /@g\.us$/.test(item.id)).map(item => item.id),
      deletedGroupCount = chatIdsToDeleteGroup.length;
    for (const id of chatIdsToDeleteGroup) await conn.chatModify({
      delete: !0,
      lastMessages: [{
        key: m.key,
        messageTimestamp: m.messageTimestamp
      }]
    }, id);
    const chatIdsToDeletePrivate = Object.values(conn.chats).filter(item => /@s.whatsapp\.net$/.test(item.id)).map(item => item.id),
      deletedPrivateCount = chatIdsToDeletePrivate.length;
    for (const id of chatIdsToDeletePrivate) await conn.chatModify({
      delete: !0,
      lastMessages: [{
        key: m.key,
        messageTimestamp: m.messageTimestamp
      }]
    }, id);
    const combinedResult = `🗑️ *Deleted Group Chats:* ${deletedGroupCount}\n🗑️ *Deleted Private Chats:* ${deletedPrivateCount}`;
    await conn.reply(m.chat, combinedResult, m);
  } catch (error) {
    console.error(error), await conn.reply(m.chat, "Terjadi kesalahan dalam menghapus grup.", m);
  }
};
handler.help = ["clearchat"], handler.tags = ["owner"], handler.owner = !1,
  handler.command = /^(clearcha?t)$/i;
export default handler;