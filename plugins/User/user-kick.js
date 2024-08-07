import fs from "fs";
const handler = async (m, {
  conn,
  args
}) => {
  let ownerGroup = m.chat?.split("@")[0] + "@s.whatsapp.net",
    users = (m.quoted ? [m.quoted?.sender] : m.mentionedJid).filter(u => !(u === ownerGroup || u.includes(conn.user.jid))),
    wayy = "*Kick*";
  for (let i of users) wayy += ` @${i.split("@")[0]}`;
  await conn.reply(m.chat, wayy, m, {
    contextInfo: {
      mentionedJid: users
    }
  });
  for (let user of users) user.endsWith("@s.whatsapp.net") && await conn.groupParticipantsUpdate(m.chat, [user], "remove");
};
handler.help = ["kick"].map(v => v + " @user"), handler.tags = ["group"], handler.command = /^(ukick|\u-)$/i,
  handler.owner = !0, handler.group = !0, handler.botAdmin = !0;
export default handler;