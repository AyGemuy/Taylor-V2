const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  if (db.data.chats[m.chat].expired < 1) throw "Group Ini Tidak DiSet Expired !";
  let who;
  who = m.isGroup ? args[1] ? args[1] : m.chat : args[1];
  args[0];
  var now = 1 * new Date();
  let caption = `*${htki} ᴇxᴘɪʀᴇᴅ ${htka}*\n${msToDate(db.data.chats[who].expired - now)}`;
  conn.sendButton(m.chat, caption, m);
};
handler.help = ["cekexpired"], handler.tags = ["group"], handler.command = /^((cek)?expired)$/i,
  handler.group = !0;
export default handler;

function msToDate(ms) {
  return [isNaN(ms) ? "--" : Math.floor(ms / 864e5), " *Days ☀️*\n ", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Hours 🕐*\n ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Minute ⏰*\n ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Second ⏱️* "].map(v => v.toString().padStart(2, 0)).join("");
}