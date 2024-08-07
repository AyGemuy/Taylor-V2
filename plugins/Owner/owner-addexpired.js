const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  if (!args[0] || isNaN(args[0])) throw `Masukan angka mewakili jumlah hari!\n\ncontoh:\n${usedPrefix + command} 30`;
  let who;
  who = m.isGroup ? args[1] ? args[1] : m.chat : args[1];
  var jumlahHari = 864e5 * args[0],
    now = 1 * new Date();
  now < db.data.chats[who].expired ? db.data.chats[who].expired += jumlahHari : db.data.chats[who].expired = now + jumlahHari;
  let caption = `Berhasil menetapkan hari kedaluarsa untuk ${conn.getName(who)} selama ${args[0]} hari.\n\nHitung Mundur : ${msToDate(db.data.chats[who].expired - now)}`;
  await conn.reply(m.chat, caption, m);
};
handler.help = ["expired <hari>"], handler.tags = ["owner"], handler.command = /^(expired)$/i,
  handler.owner = !0;
export default handler;

function msToDate(ms) {
  return [isNaN(ms) ? "--" : Math.floor(ms / 864e5), " *Days ☀️*\n ", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Hours 🕐*\n ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Minute ⏰*\n ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Second ⏱️* "].map(v => v.toString().padStart(2, 0)).join("");
}