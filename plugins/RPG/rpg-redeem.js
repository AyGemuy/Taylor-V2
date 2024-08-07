const cooldown = 864e5,
  handler = async (m, {
    conn,
    args,
    usedPrefix
  }) => {
    let user = db.data.users[m.sender],
      timers = clockString(864e5 - (new Date() - user.lastcode));
    return 0 === args.length ? await conn.reply(m.chat, "Harap masukan code transaksi anda..!!", m) : "085213" === args[0] || "443321" === args[0] || "662522" === args[0] || "322929" === args[0] || "562622" === args[0] || "432282" === args[0] || "002819" === args[0] || "715611" === args[0] || "882910" === args[0] || "882010" === args[0] || "937100" === args[0] || "736390" === args[0] || "762837" === args[0] || "028393" === args[0] || "625529" === args[0] || "727638" === args[0] || "992719" === args[0] || "092739" === args[0] || "727269" === args[0] || "629461" === args[0] || "239210" === args[0] ? user.lastcode < 864e5 ? (await conn.reply(m.chat, "*SELAMAT!*\n\nKamu telah mendapatkan\n+25000 XP✨\n+250000 Money💵\n+25000 Bank🏦\n+25 Limit🌌", m), user.exp += 25e3, user.limit += 25, user.atm += 65e5, user.money += 25e7, void(user.lastcode = 1 * new Date())) : m.reply(`Hei Anda sudah mengambill code gift, Code gift anda sudah kadaluarsa..\nTunggu besok iya kak..\n${timers}`.trim()) : m.reply(htki + " KODE SALAH " + htka);
  };
handler.help = ["redeem"], handler.tags = ["rpg"], handler.command = /^(redemcode|coderedem|redeem)$/i,
  handler.cooldown = 864e5;
export default handler;

function clockString(ms) {
  return [isNaN(ms) ? "--" : Math.floor(ms / 864e5), " *Days ☀️*\n ", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Hours 🕐*\n ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Minute ⏰*\n ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Second ⏱️* "].map(v => v.toString().padStart(2, 0)).join("");
}