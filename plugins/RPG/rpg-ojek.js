const handler = async (m, {
  conn
}) => {
  let _timers = 3e5 - (new Date() - db.data.users[m.sender].lastngojek),
    order = db.data.users[m.sender].ojekk,
    timers = clockString(_timers),
    name = conn.getName(m.sender),
    user = db.data.users[m.sender];
  if (user.stamina < 20) return m.reply(`Stamina anda tidak cukup\nharap isi stamina anda dengan *${usedPrefix}eat8`);
  if (user.lastngojek > 108e5) throw m.reply(`Kamu masih kelelahan\nHarap tunggu ${timers} lagi`);
  if (new Date() - db.data.users[m.sender].lastngojek > 3e5) {
    Math.floor(10 * Math.random()), Math.floor(10 * Math.random());
    let randomaku4 = `${Math.floor(5 * Math.random())}`,
      rbrb4 = (Math.floor(10 * Math.random()), 15729 * randomaku4),
      rbrb5 = 120 * `${Math.floor(10 * Math.random())}`.trim();
    var hsl = `\n*—[ Hasil Ngojek ${name} ]—*\n ➕ 💹 Uang = [ ${`${rbrb4}`} ]\n ➕ ✨ Exp = [ ${`${rbrb5}`} ] \t\t \n ➕ 😍 Order Selesai = +1\n➕  📥Total Order Sebelumnya : ${order}\n`;
    db.data.users[m.sender].money += rbrb4, db.data.users[m.sender].exp += rbrb5, db.data.users[m.sender].ojekk += 1,
      await conn.loadingMsg(m.chat, `🔍 ${name} Mencari pelanggan.....`, hsl, ["\n🚶⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬜⬜⬜⬛⬜⬜⬜⬛⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n🏘️🏘️🏘️🏘️🌳  🌳 🏘️       🛵\n✔️ Mendapatkan orderan....\n", "\n🚶🛵⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬜⬜⬜⬛⬜⬜⬜⬛⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n🏘️🏘️🏘️🏘️🌳  🌳 🏘️       \n➕ Mengantar ke tujuan....\n", "\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬜⬜⬛⬛⬜⬜⬜⬛⬛\n⬛⬛⬛⬛⬛⬛⬛🛵⬛⬛\n🏘️🏘️🏘️🏘️🌳  🌳 🏘️       \n➕ Sampai di tujuan....\n", "\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬜⬜⬛⬛⬜⬜⬜⬛⬛\n⬛⬛⬛⬛⬛⬛⬛🛵⬛⬛\n🏘️🏘️🏘️🏘️🌳  🌳 🏘️ 🚶  \n➕ 💹Menerima gaji....\n"], 2e3, m),
      user.lastngojek = 1 * new Date();
  } else await conn.reply(m.chat, `Sepertinya Anda Sudah Kecapekan Silahkan Istirahat Dulu sekitar\n🕔 *${timers}*`, m);
};
handler.help = ["ojek"], handler.tags = ["rpg"], handler.command = /^(ojek|ngojek|gojek|jadiojek)$/i,
  handler.register = !0, handler.group = !0;
export default handler;

function clockString(ms) {
  return ["\n" + (isNaN(ms) ? "--" : Math.floor(ms / 864e5)), " *Days ☀️*\n ", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Hours 🕐*\n ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Minute ⏰*\n ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Second ⏱️* "].map(v => v.toString().padStart(2, 0)).join("");
}