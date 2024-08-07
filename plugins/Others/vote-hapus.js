const handler = async (m, {
  conn,
  usedPrefix,
  isAdmin,
  isOwner
}) => {
  if (m.isGroup && !isAdmin && !isOwner) return dfail("admin", m, conn);
  let id = m.chat;
  conn.vote = conn.vote ? conn.vote : {}, id in conn.vote || await conn.reply(m.chat, "Tidak ada voting digrup ini!", m),
    delete conn.vote[id], m.reply("Berhasil!");
};
handler.help = ["hapusvote"], handler.tags = ["vote"], handler.command = /^(delete|hapus|-)vote$/i;
export default handler;