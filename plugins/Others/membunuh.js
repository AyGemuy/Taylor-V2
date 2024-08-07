const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  let who, dapat = Math.floor(1e5 * Math.random()),
    healtu = Math.floor(100 * Math.random());
  m.sender;
  if (who = m.isGroup ? m.mentionedJid[0] : m.chat, !who) throw "ᴛᴀɢ ꜱᴀʟᴀʜ ꜱᴀᴛᴜ ʟᴀʜ";
  if (void 0 === db.data.users[who]) throw "Pengguna tidak ada didalam data base";
  let timers = clockString(36e5 - (new Date() - db.data.users[m.sender].lastbunuhi)),
    users = db.data.users;
  if (new Date() - db.data.users[m.sender].lastbunuhi > 36e5) {
    if (10 > users[who].health) throw "ᴛᴀʀɢᴇᴛ ꜱᴜᴅᴀʜ ᴛɪᴅᴀᴋ ᴍᴇᴍɪʟɪᴋɪ ʜᴇᴀʟᴛʜ💉";
    if (100 > users[who].money) throw "💠ᴛᴀʀɢᴇᴛ ᴛɪᴅᴀᴋ ᴍᴇᴍɪʟɪᴋɪ ᴀᴘᴀᴘᴜɴ :(💠";
    users[who].health -= 1 * healtu, users[who].money -= 1 * dapat, users[m.sender].money += 1 * dapat,
      db.data.users[m.sender].lastbunuhi = 1 * new Date(), m.reply(`ᴛᴀʀɢᴇᴛ ʙᴇʀʜᴀꜱɪʟ ᴅɪ ʙᴜɴᴜʜ ᴅᴀɴ ᴋᴀᴍᴜ ᴍᴇɴɢᴀᴍʙɪʟ ᴍᴏɴᴇʏ ᴛᴀʀɢᴇᴛ ꜱᴇʙᴇꜱᴀʀ\n💰${dapat} ᴍᴏɴᴇʏ\nᴅᴀʀᴀʜ ᴛᴀʀɢᴇᴛ ʙᴇʀᴋᴜʀᴀɴɢ -${healtu} ʜᴇᴀʟᴛʜ❤`);
  } else await conn.reply(m.chat, `ᴀɴᴅᴀ ꜱᴜᴅᴀʜ ᴍᴇᴍʙᴜɴᴜʜ ᴏʀᴀɴɢ ᴅᴀɴ ʙᴇʀʜᴀꜱɪʟ ꜱᴇᴍʙᴜɴʏɪ , ᴛᴜɴɢɢᴜ ⏳${timers} ᴜɴᴛᴜᴋ ᴍᴇᴍʙᴜɴᴜʜɴʏᴀ ʟᴀɢɪ`, m);
};
handler.help = ["membunuh *@tag*"], handler.tags = ["rpg"], handler.command = /^membunuh$/,
  handler.limit = !0, handler.group = !0;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
  return ["\n" + (isNaN(ms) ? "--" : Math.floor(ms / 864e5)), " *Days ☀️*\n ", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Hours 🕐*\n ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Minute ⏰*\n ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Second ⏱️* "].map(v => v.toString().padStart(2, 0)).join("");
}