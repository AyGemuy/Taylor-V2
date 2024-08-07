const xpperlimit = 1,
  handler = async (m, {
    conn,
    command,
    args
  }) => {
    let user = db.data.users[m.sender],
      count = command.replace(/^tarik/i, "");
    if (count = count ? /all/i.test(count) ? Math.floor(db.data.users[m.sender].bank / 1) : parseInt(count) : args[0] ? parseInt(args[0]) : 1, count = Math.max(1, count), 0 === user.atm) return m.reply("kamu belum mempuyai atm !");
    db.data.users[m.sender].bank >= 1 * count ? (db.data.users[m.sender].bank -= 1 * count, db.data.users[m.sender].money += count, await conn.reply(m.chat, `Sukses menarik sebesar ${count} Money 💹`, m)) : await conn.reply(m.chat, `[❗] Uang dibank anda tidak mencukupi untuk ditarik sebesar ${count} money 💹`, m);
  };
handler.help = ["tarik"].map(v => v + " <jumlah>"), handler.tags = ["rpg"],
  handler.command = /^tarik([0-9]+)|tarik|tarikall$/i;
export default handler;