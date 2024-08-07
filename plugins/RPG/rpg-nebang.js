const handler = async (m, {
  conn,
  usedPrefix
}) => {
  const user = db.data.users[m.sender],
    timers = clockString(108e5 - (Date.now() - user.lastlumber)),
    penebang = conn.getName(m.sender);
  if (user.stamina < 20) return m.reply(`Stamina tidak cukup\nIsi stamina dengan *${usedPrefix}eat*`);
  if (user.lastlumber > 108e5) throw m.reply(`Masih kelelahan\nTunggu ${timers} lagi`);
  const rndm = (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
    rndm1 = rndm(1, 300),
    rndm2 = rndm(1, 3e3),
    rndm3 = rndm(1, 300),
    hsl = `\n*《 Hasil Nebang ${penebang} 》*\n\n🌳 = [ ${rndm1} ] Kayu\n💹 = [ ${rndm2} ] Money\n✉️ = [ ${rndm3} ] Exp\n\nStamina berkurang -20\n`;
  user.axedurability -= 5, user.stamina -= 20, user.money += rndm2, user.kayu += rndm1,
    user.exp += rndm3, await conn.loadingMsg(m.chat, `🔍 ${penebang} Mencari Area nebang.....`, hsl, ["🚶⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬜⬜⬜⬛⬜⬜⬜⬛⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n🌳🏘️🌳🌳  🌳 🏘️ 🌳🌳🌳", "⬛⬛⬛⬛⬛⬛🚶⬛⬛⬛\n⬛⬜⬜⬜⬛⬜⬜⬜⬛⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n🌳🏘️🌳🌳  🌳 🏘️ 🌳🌳🌳", "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬜⬜⬜⬛⬜⬜⬜⬛⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛🚶\n🌳🏘️🌳🌳  🌳 🏘️ 🌳🌳🌳", "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬜⬜⬜⬛⬜⬜⬜⬛⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n🏘️ 🏘️ 🚶"], 2e3, m),
    user.lastlumber = Date.now();
};
handler.help = ["nebang"], handler.tags = ["rpg"], handler.command = /^(nebang|menebang)$/i,
  handler.group = !0;
export default handler;

function clockString(ms) {
  return ["\n" + (isNaN(ms) ? "--" : Math.floor(ms / 864e5)), " Days ☀️\n ", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " Hours 🕐\n ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " Minute ⏰\n ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " Second ⏱️ "].map(v => v.toString().padStart(2, 0)).join("");
}