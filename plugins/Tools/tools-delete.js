const handler = async (m, {
  conn,
  command,
  isBotAdmin
}) => {
  if (!m.quoted) throw "Reply pesan yang ingin dihapus";
  let hapus = m.quoted?.sender ? m.message.extendedTextMessage.contextInfo.participant : m.key.participant,
    bang = m.quoted?.id ? m.message.extendedTextMessage.contextInfo.stanzaId : m.key.id;
  return isBotAdmin ? conn.sendMessage(m.chat, {
    delete: {
      remoteJid: m.chat,
      fromMe: !1,
      id: bang,
      participant: hapus
    }
  }) : isBotAdmin ? void 0 : conn.sendMessage(m.chat, {
    delete: m.quoted?.vM.key
  });
};
handler.help = ["del", "delete"], handler.tags = ["tools"], handler.command = /^d(el(ete|m)|el|fa)?$/i;
export default handler;