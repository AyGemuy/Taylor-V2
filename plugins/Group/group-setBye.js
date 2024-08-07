const handler = async (m, {
  conn,
  text,
  isROwner,
  isOwner
}) => {
  if (!text) throw "Teksnya mana?";
  isROwner || isOwner ? conn.bye = text : db.data.chats.sBye = text, m.reply("Bye berhasil diatur\n@user (Mention)");
};
handler.help = ["setbye <teks>"], handler.tags = ["group"], handler.command = /^setbye$/i,
  handler.group = !0, handler.admin = !0;
export default handler;