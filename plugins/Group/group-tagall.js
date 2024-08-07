const handler = async (m, {
  conn,
  text,
  participants,
  isAdmin,
  isOwner
}) => {
  let users = participants.map(u => u.id).filter(v => v !== conn.user.jid);
  m.reply(`*Teks:*\n${text ? `${text}\n` : ""}\n⛊──⛾「 Tag All 」⛾──⛊\n` + users.map(v => "│♪ @" + v.replace(/@.+/, "")).join`\n` + "\n⛊──⛾「 Tag All 」⛾──⛊", null, {
    mentions: users
  });
};
handler.help = ["tagall"], handler.tags = ["group"], handler.command = ["tagall"],
  handler.admin = !0, handler.group = !0;
export default handler;