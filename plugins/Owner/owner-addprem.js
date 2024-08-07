const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  try {
    let who;
    who = m.isGroup ? m.mentionedJid[0] ? m.mentionedJid[0] : !!m.quoted && m.quoted?.sender : m.chat;
    let user = db.data.users[who];
    if (!who) throw "tag or mention someone!";
    let txt = text.replace("@" + who.split("@")[0], "").trim();
    if (!txt) throw "where the number of days?";
    if (isNaN(txt)) return m.reply(`only number!\n\nexample:\n${usedPrefix + command} @${m.sender.split("@")[0]} 7`);
    var jumlahHari = 864e5 * txt,
      now = Date.now();
    now < user.premiumTime ? user.premiumTime += jumlahHari : user.premiumTime = now + jumlahHari,
      user.premium = !0, prems = Object.keys(db.data.users).filter(key => db.data.users[key].premium),
      m.reply(`✔️ Success\n📛 *Name:* ${user.name}\n📆 *Days:* ${txt} days\n📉 *Countdown:* ${msToTime(user.premiumTime - now)}`);
  } catch (error) {
    m.reply(`An error occurred: ${error}`);
  }
};

function msToTime(ms) {
  return [isNaN(ms) ? "--" : Math.floor(ms / 864e5), " *Days ☀️*\n ", isNaN(ms) ? "--" : Math.floor(ms % 864e5 / 36e5), " *Hours 🕐*\n ", isNaN(ms) ? "--" : Math.floor(ms % 36e5 / 6e4), " *Minute ⏰*\n ", isNaN(ms) ? "--" : Math.floor(ms % 6e4 / 1e3), " *Second ⏱️* "].map(v => v.toString().padStart(2, "0")).join("");
}
handler.help = ["addprem [@user] <days>"], handler.tags = ["owner"], handler.command = /^(add|tambah|\+)p(rem)?$/i,
  handler.group = !0, handler.rowner = !0;
export default handler;