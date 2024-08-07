const handler = async (m, {
  participants
}) => {
  db.data.chats[m.chat].isBanned = !0, m.reply("Done!");
};
handler.help = ["banchat"], handler.tags = ["owner"], handler.command = /^banchat$/i,
  handler.owner = !0;
export default handler;