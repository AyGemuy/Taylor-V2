import {
  areJidsSameUser
} from "@whiskeysockets/baileys";
const handler = async (m, {
  conn,
  participants
}) => {
  let user = m.quoted?.sender || m.mentionedJid && m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id)) || m.mentionedJid[0];
  await conn.groupParticipantsUpdate(m.chat, [user], "demote"), m.reply("Succes");
};
handler.help = ["demote @tag"], handler.tags = ["group"], handler.command = /^(demote)$/i,
  handler.admin = !0, handler.group = !0, handler.botAdmin = !0;
export default handler;