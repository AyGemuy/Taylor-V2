const handler = async (m, {
  conn,
  usedPrefix,
  DevMode
}) => {
  try {
    let user = db.data.users[m.sender],
      lastMining = user.lastmining || 0,
      timers = clockString(18e4 - (new Date() - lastMining));
    if (user.healt <= 79) return await conn.reply(m.chat, "Minimum 80 health to do chopping", m);
    if (new Date() - lastMining < 18e4) return await conn.reply(m.chat, `Please wait ${timers} again`, m);
    let {
      armor,
      rubah,
      kuda,
      kucing
    } = user, health = Math.floor(101 * Math.random()), __health = health > 60 ? health - (kucing > 0 ? [0, 5, 10, 15, 21, 30][kucing] : 0) - (armor > 0 ? [0, 5, 10, 15, 21, 30][armor] : 0) : health, kayu = (0 === kucing && 0 === armor && Math.floor(11 * Math.random()), Math.floor(2 * Math.random()), Math.floor(3 * Math.random()), Math.floor(2 * Math.random()), pickRandom([1, 0, 0, 1]), pickRandom([1, 0, 0, 0]), Math.floor(300 * Math.random()), Math.floor(150 * Math.random())), batu = Math.floor(100 * Math.random()), iron = Math.floor(100 * Math.random()), exp = Math.floor(500 * Math.random()), uang = Math.floor(500 * Math.random());
    await conn.reply(m.chat, "↓Chopping:", m);
    let str = `\n❤️ While you chopping, you got:\n🗡️wood: ${kayu}\n🔩Iron: ${iron}\n💵Gold: ${uang}\n⚜️Xp: ${exp}\nand you got Additional gifts\n💎diamond: ${diamond}\n`.trim();
    await conn.reply(m.chat, str, m), user.kayu += kayu, user.diamond += diamond, user.batu += batu,
      user.iron += iron, user.exp += exp, user.money += uang, user.lastmining = new Date();
  } catch (e) {
    if (console.log(e), await conn.reply(m.chat, "Error", m), DevMode) {
      let file = require.resolve(__filename);
      for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, `${file} error\nNo: *${m.sender.split("@")[0]}*\nCommand: *${m.text}*\n\n*${e}*`, m);
    }
  }
};
handler.help = ["chop", "chopig"], handler.tags = ["rpg"], handler.command = /^(chop|choping)$/i;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
  if (isNaN(ms)) return "--";
  let d = Math.floor(ms / 864e5),
    h = Math.floor(ms / 36e5) % 24,
    m = Math.floor(ms / 6e4) % 60,
    s = Math.floor(ms / 1e3) % 60;
  return `\n${d.toString().padStart(2, 0)} *Days ☀️*\n ${h.toString().padStart(2, 0)} *Hours 🕐*\n ${m.toString().padStart(2, 0)} *Minute ⏰*\n ${s.toString().padStart(2, 0)} *Second ⏱️* `;
}