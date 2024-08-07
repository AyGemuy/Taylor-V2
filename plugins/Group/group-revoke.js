const handler = async (m, {
  conn
}) => {
  await conn.groupRevokeInvite(m.chat);
  let gruf = m.chat;
  await conn.reply(m.sender, "https://chat.whatsapp.com/" + await conn.groupInviteCode(gruf), m);
};
handler.help = ["revoke"], handler.tags = ["group"], handler.command = /^re(voke|new)(invite|link)?$/i,
  handler.group = !0, handler.admin = !0, handler.botAdmin = !0;
export default handler;