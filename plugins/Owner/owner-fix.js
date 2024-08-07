const handler = async (m, {
  conn,
  text
}) => {
  let users = db.data.users;
  var total = 0;
  for (let jid in users) users[jid].limit < 0 && (users[jid].limit = 0, total += 1),
    users[jid].money < 0 && (users[jid].money = 0, total += 1), users[jid].healt < 0 && (users[jid].healt = 0, total += 1), users[jid].healt > 100 && (users[jid].healt = 100, total += 1), users[jid].stamina < 0 && (users[jid].stamina = 0, total += 1), users[jid].stamina > 100 && (users[jid].stamina = 100, total += 1),
    users[jid].exp < 0 && (users[jid].exp = 0, total += 1), users[jid].money = Math.floor(users[jid].money),
    users[jid].limit = Math.floor(users[jid].limit);
  return await conn.reply(m.chat, `*Berhasil memperbaiki ${total} error di database.*`, m);
};
handler.help = ["fix"].map(v => v + " <database>"), handler.tags = ["owner"],
  handler.command = /^(fix)$/i, handler.owner = 1;
export default handler;