const handler = async (m, {
  conn
}) => {
  let _timers = 3e5 - (new Date() - db.data.users[m.sender].lastroket),
    order = db.data.users[m.sender].roket,
    timers = clockString(_timers),
    name = conn.getName(m.sender),
    user = db.data.users[m.sender];
  if (user.stamina < 20) return m.reply(`Stamina anda tidak cukup\nharap isi stamina anda dengan *${usedPrefix}eat8`);
  if (user.lastroket > 108e5) throw m.reply(`Kamu masih kelelahan\nHarap tunggu ${timers} lagi`);
  if (new Date() - db.data.users[m.sender].lastroket > 3e5) {
    Math.floor(10 * Math.random()), Math.floor(10 * Math.random());
    let ngerok4 = `${Math.floor(5 * Math.random())}`,
      ngrk4 = (Math.floor(10 * Math.random()), 15729 * ngerok4),
      ngrk5 = 120 * `${Math.floor(10 * Math.random())}`.trim();
    var hsl = `\n*—[ Hasil Ngroket ${name} ]—*\n ➕ 💹 Uang = [ ${`${ngrk4}`} ]\n ➕ ✨ Exp = [ ${`${ngrk5}`} ] \t\t \n ➕ 😍 Mendarat Selesai = +1\n ➕  📥Total Mendarat Sebelumnya : ${order}\n`;
    db.data.users[m.sender].money += ngrk4, db.data.users[m.sender].exp += ngrk5, db.data.users[m.sender].roket += 1,
      await conn.loadingMsg(m.chat, `🔍 ${name} Mencari Lokasi.....`, hsl, ["🌕\n\n\n▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒\n▒▒▄▄▄▒▒▒█▒▒▒▒▄▒▒▒▒▒▒▒▒\n▒█▀█▀█▒█▀█▒▒█▀█▒▄███▄▒\n░█▀█▀█░█▀██░█▀█░█▄█▄█░\n░█▀█▀█░█▀████▀█░█▄█▄█░\n████████▀█████████████\n🚀\n\n👨‍🚀 Memulai penerbangan....\n", "🌕\n\n\n🚀\n▒▒▄▄▄▒▒▒█▒▒▒▒▄▒▒▒▒▒▒▒▒\n▒█▀█▀█▒█▀█▒▒█▀█▒▄███▄▒\n░█▀█▀█░█▀██░█▀█░█▄█▄█░\n░█▀█▀█░█▀████▀█░█▄█▄█░\n████████▀█████████████\n\n➕ Dalam penerbangan....\n", "🌕🚀\n\n\n▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒\n▒▒▄▄▄▒▒▒█▒▒▒▒▄▒▒▒▒▒▒▒▒\n▒█▀█▀█▒█▀█▒▒█▀█▒▄███▄▒\n░█▀█▀█░█▀██░█▀█░█▄█▄█░\n░█▀█▀█░█▀████▀█░█▄█▄█░\n████████▀█████████████\n\n➕ Sampai di tujuan....\n", "🌕🚀\n\n➕ Sukses Mendarat.... 👨‍🚀"], 2e3, m),
      user.lastroket = 1 * new Date();
  } else await conn.reply(m.chat, `Sepertinya Anda Sudah Kecapekan Silahkan Istirahat Dulu sekitar\n🕔 *${timers}*`, m);
};
handler.help = ["roket"], handler.tags = ["rpg"], handler.command = /^(roket|ngroket|groket|jadiroket)$/i,
  handler.register = !0, handler.group = !0;
export default handler;

function clockString(ms) {
  return ["\n" + (isNaN(ms) ? "--" : Math.floor(ms / 864e5)), " *Days ☀️*\n ", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Hours 🕐*\n ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Minute ⏰*\n ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Second ⏱️* "].map(v => v.toString().padStart(2, 0)).join("");
}