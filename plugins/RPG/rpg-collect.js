const handler = async (m, {
  conn
}) => {
  let user = db.data.users[m.sender],
    lastClaim = user.lastclaim || 0,
    timers = clockString(432e5 - (new Date() - lastClaim));
  new Date() - lastClaim > 432e5 ? (await conn.reply(m.chat, "You have claimed and received *1000* 💵money and *1* 🥤potion", m), user.money += 1e3, user.potion += 1, user.lastclaim = new Date()) : await conn.reply(m.chat, `Please wait ${timers} again to claim again`, m);
};
handler.help = ["collect"], handler.tags = ["rpg"], handler.command = /^(collect)$/i,
  handler.fail = null;
export default handler;

function clockString(ms) {
  if (isNaN(ms)) return "--";
  let d = Math.floor(ms / 864e5),
    h = Math.floor(ms / 36e5) % 24,
    m = Math.floor(ms / 6e4) % 60,
    s = Math.floor(ms / 1e3) % 60;
  return `\n${d.toString().padStart(2, 0)} *Days ☀️*\n ${h.toString().padStart(2, 0)} *Hours 🕐*\n ${m.toString().padStart(2, 0)} *Minute ⏰*\n ${s.toString().padStart(2, 0)} *Second ⏱️* `;
}