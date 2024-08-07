const handler = async (m, {
  conn,
  text,
  isROwner,
  isOwner
}) => {
  if (!text) throw "Teksnya mana?";
  isROwner || isOwner ? conn.welcome = text : db.data.chats.sWelcome = text, m.reply("Welcome berhasil diatur\n@user (Mention)\n@subject (Judul Grup)");
};
handler.help = ["setwelcome <teks>"], handler.tags = ["group"], handler.command = /^setwelcome$/i,
  handler.group = !0, handler.admin = !0;
export default handler;