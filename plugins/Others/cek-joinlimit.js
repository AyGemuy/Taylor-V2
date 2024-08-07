const handler = async m => {
  let who;
  if (who = m.isGroup && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender, void 0 === db.data.users[who]) throw "Pengguna tidak ada didalam data base";
  m.reply(`${db.data.users[who].joinlimit} Join Limit Left=͟͟͞͞🏀`);
};
handler.help = ["joinlimit [@user]"], handler.tags = ["xp"], handler.command = /^(joinlimit)$/i;
export default handler;