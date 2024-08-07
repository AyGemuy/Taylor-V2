const handler = async (m, {
  conn
}) => {
  const user = db.data.users[m.sender],
    timers = clockString(3e5 - (Date.now() - user.lastngojek)),
    name = conn.getName(m.sender);
  if (Date.now() - user.lastngojek > 3e5) {
    Math.floor(10 * Math.random()), Math.floor(10 * Math.random()), Math.floor(10 * Math.random());
    const rbrb4 = 15729 * Math.floor(5 * Math.random()),
      rbrb5 = 2e4 * Math.floor(10 * Math.random()),
      hsl = `\n*—[ Hasil Ngewe ${name} ]—*\n ➕ 💹 Uang = [ ${rbrb4} ]\n ➕ ✨ Exp = [ ${rbrb5} ] \n ➕ 📛 Warn = +1\t\t \n ➕ 😍 Order Selesai = +1\n➕  📥Total Order Sebelumnya : ${user.ojekk + 1}\n`;
    user.warn++, user.money += rbrb4, user.exp += rbrb5, user.ojekk++, await conn.loadingMsg(m.chat, "🔍 Mencari pelanggan.....", hsl, ["✔️ Mendapatkan pelanggan....", "🥵 Mulai mengocok.....", "🥵Ahhhh, Sakitttt!! >////<\n💦Crotttt.....", "🥵💦💦Ahhhhhh😫"], m),
      user.lastngojek = Date.now();
  } else await conn.reply(m.chat, `Anda sudah lelah, silakan istirahat dulu sekitar\n🕔 *${timers}*`, 2e3, m);
};
handler.help = ["ngewe"], handler.tags = ["rpg"], handler.command = /^(ngewe|anu)$/i,
  handler.register = !0, handler.premium = !0;
export default handler;

function clockString(ms) {
  return [Math.floor(ms / 36e5), Math.floor(ms / 6e4) % 60, Math.floor(ms / 1e3) % 60].map(v => v.toString().padStart(2, 0)).join(":");
}