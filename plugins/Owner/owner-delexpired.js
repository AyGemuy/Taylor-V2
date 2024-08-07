const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let who;
  who = m.isGroup ? args[1] ? args[1] : m.chat : args[1], new Date(), db.data.chats[who].expired,
    db.data.chats[who].expired = !1;
  await conn.reply(m.chat, "Berhasil menghapus hari kadaluarsa untuk Grup ini", m);
};
handler.help = ["delexpired"], handler.tags = ["owner"], handler.command = /^(delexpired|delsewa)$/i,
  handler.rowner = !0, handler.group = !0;
export default handler;

function msToDate(ms) {
  return [isNaN(ms) ? "--" : Math.floor(ms / 864e5), " *Days ☀️*\n ", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Hours 🕐*\n ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Minute ⏰*\n ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Second ⏱️* "].map(v => v.toString().padStart(2, 0)).join("");
}