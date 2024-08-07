const xpperlimit = 1,
  handler = async (m, {
    conn,
    command,
    args
  }) => {
    const user = db.data.users[m.sender];
    let count = command.replace(/^nabung/i, "");
    return count = count ? /all/i.test(count) ? Math.floor(user.money / 1) : parseInt(count) : args[0] ? parseInt(args[0]) : 1,
      count = Math.max(1, count), 0 === user.atm ? await conn.reply(m.chat, "Kamu belum memiliki ATM!", m) : user.bank > user.fullatm ? await conn.reply(m.chat, "Uang di bankmu sudah penuh!", m) : count > user.fullatm - user.bank ? await conn.reply(m.chat, "Uangnya tidak muat di bank!", m) : void(user.money >= 1 * count ? (user.money -= 1 * count, user.bank += count, await conn.reply(m.chat, `Sukses menabung sebesar ${count} Money 💹`, m)) : await conn.reply(m.chat, `[❗] Uang anda tidak mencukupi untuk menabung ${count} Money 💹`, m));
  };
handler.help = ["nabung <jumlah>"], handler.tags = ["rpg"], handler.command = /^nabung([0-9]+)|nabung|nabungall$/i,
  handler.group = !0;
export default handler;