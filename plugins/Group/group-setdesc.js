const handler = async (m, {
  conn,
  text,
  isROwner,
  isOwner
}) => {
  if (!text) throw "where text to change desc group?";
  await conn.groupUpdateDescription(m.chat, text), m.reply("Description group now changed !");
};
handler.help = ["setdesc", "setdesk"].map(v => "<teks>" + v), handler.tags = ["group"],
  handler.command = /^set(desk)?(desc)$/i, handler.botAdmin = !0, handler.group = !0,
  handler.admin = !0;
export default handler;