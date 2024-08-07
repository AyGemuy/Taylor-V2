let better = {};
async function handler(m, {
  conn,
  args,
  usedPrefix,
  command
}) {
  if (better[m.sender]) return m.reply("Kamu sedang meminta bet!");
  const user = db.data.users,
    count = 1 * (args[0] && isNumber(parseInt(args[0])) ? Math.max(parseInt(args[0]), 1) : /all/i.test(args[0]) ? Math.floor(parseInt(user.money)) : 1);
  if (user.money < count) return m.reply("💹 Uang kamu tidak cukup!!");
  const hasil = formatRupiah(Number(count)),
    confirm = `${`Apakah anda yakin mau melakukan judi (Y/n)\n\n*Taruhan:* ${count} 💹\n⏰ 60s Timeout`}`,
    {
      key
    } = await conn.reply(m.chat, confirm, m, {
      mentions: [m.sender]
    });
  better[m.sender] = {
    sender: m.sender,
    message: m,
    count: count,
    hasil: hasil,
    key: key,
    pesan: conn,
    timeout: setTimeout(() => (conn.sendMessage(m.chat, {
      delete: key
    }), delete better[m.sender]), 6e4)
  };
}
handler.before = async m => {
  if (m.isBaileys || !(m.sender in better) || !m.text || m.id === better[m.sender].message.id) return;
  const {
    timeout,
    sender,
    message,
    count,
    key
  } = better[m.sender], user = db.data.users[m.sender];
  if (/(✔️|y(es)?)/gi.test(m.text.toLowerCase())) {
    const Bot = Math.ceil(91 * Math.random()),
      Kamu = Math.floor(71 * Math.random());
    let status = "Kalah";
    return Bot < Kamu ? (user.money += count, status = "Menang") : Bot > Kamu ? user.money -= count : (status = "Seri", user.money += Math.floor(count / 1.5)), m.reply(`\n| *PLAYERS* | *POINT* |\n*🤖 BOT:*      ${Bot}\n*👤 KAMU:*    ${Kamu}\n\nKamu *${status}*, kamu ${"Menang" === status ? `Mendapatkan *+${2 * count}*` : "Kalah" === status ? `Kehilangan *-${1 * count}*` : `Mendapatkan *+${Math.floor(count / 1.5)}*`} Money 💹\n        `.trim()),
      clearTimeout(timeout), delete better[m.sender], !0;
  }
  return /(✖️|n(o)?)/gi.test(m.text.toLowerCase()) ? (clearTimeout(timeout), m.reply("Rejected"), delete better[m.sender], !0) : void 0;
}, handler.help = ["judi [jumlah]"], handler.tags = ["rpg"], handler.command = /^(judi|bet)$/i;
export default handler;

function isNumber(x) {
  return !isNaN(x);
}

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number);
}