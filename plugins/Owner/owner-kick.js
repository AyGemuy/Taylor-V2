import {
  areJidsSameUser
} from "@whiskeysockets/baileys";
const handler = async (m, {
  conn,
  participants
}) => {
  let users = m.quoted ? [m.quoted?.sender] : m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id)),
    kickedUser = [];
  for (let user of users)
    if (user.endsWith("@s.whatsapp.net") && !(participants.find(v => areJidsSameUser(v.id, user)) || {
        admin: !0
      }).admin) {
      const res = await conn.groupParticipantsUpdate(m.chat, [user], "remove");
      kickedUser.concat(res), await delay(1e3);
    }
  m.reply(`*Succes kick* ${kickedUser.map(v => "@" + v.split("@")[0])}`, null, {
    mentions: kickedUser
  });
};
handler.help = ["kick", "-"].map(v => "o" + v + " @user"), handler.tags = ["owner"],
  handler.command = /^(okick|o-)$/i, handler.owner = !0, handler.group = !0, handler.botAdmin = !0;
export default handler;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));