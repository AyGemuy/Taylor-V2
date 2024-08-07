const handler = async (m, {
  conn,
  text,
  usedPrefix,
  isAdmin,
  isOwner
}) => {
  if (m.isGroup && !isAdmin && !isOwner) return dfail("admin", m, conn);
  conn.vote = conn.vote ? conn.vote : {};
  let id = m.chat;
  id in conn.vote && await conn.reply(m.chat, "*Masih ada vote di chat ini!*", m);
  let caption = `${htjava} MULAI VOTE ${htjava}\n${dmenub} *${usedPrefix}upvote* - untuk setuju\n${dmenub} *${usedPrefix}devote* - untuk tidak setuju\n${dmenub} *${usedPrefix}cekvote* - untuk mengecek vote\n${dmenub} *${usedPrefix}hapusvote* - untuk menghapus vote\n${dmenuf}`;
  await conn.reply(m.chat, caption, m), conn.vote[id] = [text, [],
    []
  ];
};
handler.help = ["mulaivote [alasan]"], handler.tags = ["vote"], handler.command = /^(start|mulai|\+)vote$/i;
export default handler;