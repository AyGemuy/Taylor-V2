const handler = async m => {
  db.data.chats[m.chat].isBanned = !1, m.reply("Done!");
};
handler.help = ["unbanchat"], handler.tags = ["owner"], handler.command = /^unbanchat$/i,
  handler.owner = !0;
export default handler;