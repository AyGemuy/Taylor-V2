const handler = async (m, {
  usedPrefix,
  command,
  text
}) => {
  try {
    let who;
    who = m.isGroup ? m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted?.sender : !!text && text.replace(/[^0-9]/g, "") + "@s.whatsapp.net" : text ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net" : m.chat;
    let user = db.data.users[who];
    if (!who) return m.reply(`tag or mention someone!\n\nexample:\n${usedPrefix + command} @${m.sender.split("@")[0]}`);
    user.premium = !1, user.premiumTime = 0, prems = Object.keys(db.data.users).filter(key => db.data.users[key].premium),
      m.reply(`✔️ successfully removed *${user.name}* from premium user`);
  } catch (error) {
    console.error(error), m.reply("An error occurred while removing the premium user.");
  }
};
handler.help = ["delprem [@user]"], handler.tags = ["owner"], handler.command = /^(-|del)p(rem)?$/i,
  handler.group = !0, handler.rowner = !0;
export default handler;