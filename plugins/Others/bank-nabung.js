const xpperlimit = 1,
  handler = async (m, {
    conn,
    command,
    args
  }) => {
    let user = db.data.users[m.sender],
      count = command.replace(/^nabung/i, "");
    return count = count ? /all/i.test(count) ? Math.floor(db.data.users[m.sender].money / 1) : parseInt(count) : args[0] ? parseInt(args[0]) : 1,
      count = Math.max(1, count), 0 === user.atm ? m.reply("kamu belum mempuyai atm !") : user.bank > user.fullatm ? m.reply("Uang dibankmu sudah penuh!") : count > user.fullatm - user.bank ? m.reply("Uangnya ga muat dibank") : void(db.data.users[m.sender].money >= 1 * count ? (db.data.users[m.sender].money -= 1 * count, db.data.users[m.sender].bank += count, await conn.reply(m.chat, `Sukses menabung sebesar ${count} Money 💹`, m)) : await conn.reply(m.chat, `[❗] Uang anda tidak mencukupi untuk menabung ${count} money 💹`, m));
  };
handler.help = ["nabung"].map(v => v + " <jumlah>"), handler.tags = ["rpg"],
  handler.command = /^nabung([0-9]+)|nabung|nabungall$/i;
export default handler;