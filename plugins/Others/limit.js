const handler = async (m, {
  conn,
  text,
  args,
  usedPrefix,
  command
}) => {
  if ("reset" === args[0]) {
    let list = Object.entries(db.data.users),
      lim = args && args[0] && isNumber(args[0]) ? parseInt(args[0]) : 1e3;
    lim = Math.max(1, lim), list.map(([user, data], i) => Number(data.limit = lim)),
      await conn.reply(m.chat, `*Berhasil direset ${lim} / user*`, fakes, adReply);
  }
  let who;
  who = m.isGroup && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  let ke1 = db.data.users[who].limit,
    ke2 = db.data.users[who].exp,
    ke3 = db.data.users[who].money,
    caption = `\n${dmenut} *B A N K  U S E R*\n${dmenub} 📛 *Limit:* ${ke1}\n${dmenub} 💳 *Exp:* ${ke2}\n${dmenub} 🏛️ *Money:* ${ke3}\n${dmenuf}\n`;
  await conn.reply(m.chat, caption, fakes, adReply);
};
handler.help = ["limit [@user]"], handler.tags = ["xp"], handler.command = /^(limit)$/i;
export default handler;

function isNumber(x = 0) {
  return x = parseInt(x), !isNaN(x) && "number" == typeof x;
}