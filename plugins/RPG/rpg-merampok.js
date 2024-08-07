const handler = async (m, {
  conn
}) => {
  const user = db.data.users[m.sender],
    target = m.isGroup ? m.mentionedJid[0] : m.chat;
  if (!target) throw "Tag salah satu lah";
  if (void 0 === db.data.users[target]) throw "Pengguna tidak ada didalam data base";
  const timeSinceLastRob = new Date() - user.lastrob,
    timers = clockString(36e5 - timeSinceLastRob),
    robAmount = Math.floor(1e5 * Math.random());
  if (timeSinceLastRob > 36e5) {
    if (db.data.users[target].money < 1e4) throw "ᴛᴀʀɢᴇᴛ ɢᴀᴀᴅᴀ 💰ᴜᴀɴɢ ʙᴏᴅᴏʜ, ᴋɪꜱᴍɪɴ ᴅɪᴀ";
    db.data.users[target].money -= robAmount, user.money += robAmount, user.lastrob = 1 * new Date(),
      await conn.reply(m.chat, `ʙᴇʀʜᴀꜱɪʟ ᴍᴇʀᴀᴍᴘᴏᴋ ᴍᴏɴᴇʏ ᴛᴀʀɢᴇᴛ ꜱᴇʙᴇꜱᴀʀ 💰${robAmount}`, m);
  } else await conn.reply(m.chat, `Anda Sudah merampok dan berhasil sembunyi, tunggu ${timers} untuk merampok lagi`, m);
};
handler.help = ["merampok *@tag*"], handler.tags = ["rpg"], handler.command = /^merampok|rob$/,
  handler.limit = !0, handler.group = !0;
export default handler;

function clockString(ms) {
  let days = isNaN(ms) ? "--" : Math.floor(ms / 864e5),
    hours = isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24,
    minutes = isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60,
    seconds = isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60;
  return days = days < 10 ? "0" + days : days, hours = hours < 10 ? "0" + hours : hours,
    minutes = minutes < 10 ? "0" + minutes : minutes, seconds = seconds < 10 ? "0" + seconds : seconds, `${days} Days ☀️\n ${hours} Hours 🕐\n ${minutes} Minute ⏰\n ${seconds} Second ⏱️`;
}