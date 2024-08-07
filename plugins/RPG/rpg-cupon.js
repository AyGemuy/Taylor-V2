const handler = async m => {
  let who;
  if (who = m.isGroup && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender, void 0 === db.data.users[who]) throw "Pengguna tidak ada didalam data base";
  m.reply(`${db.data.users[who].cupon} Your cupon\nCupon ini adalah sebuah hadiah dari owner\n\nCara menggunakan:\n/open cupon 1`);
};
handler.help = ["cupon [@user]"], handler.tags = ["xp"], handler.command = /^(cupon)$/i,
  handler.limit = !0;
export default handler;