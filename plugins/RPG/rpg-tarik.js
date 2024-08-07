const xpperlimit = 1,
  handler = async (m, {
    conn,
    command,
    args
  }) => {
    const user = db.data.users[m.sender];
    let count = command.replace(/^tarik/i, "");
    if (count = count ? /all/i.test(count) ? Math.floor(user.bank / 1) : parseInt(count) : args[0] ? parseInt(args[0]) : 1, count = Math.max(1, count), 0 === user.atm) return await conn.reply(m.chat, "Kamu belum memiliki ATM!", m);
    user.bank >= 1 * count ? (user.bank -= 1 * count, user.money += count, await conn.reply(m.chat, `Sukses menarik sebesar ${count} Money 💹`, m)) : await conn.reply(m.chat, `[❗] Uang di bank Anda tidak mencukupi untuk ditarik sebesar ${count} money 💹`, m);
  };
handler.help = ["tarik <jumlah>"], handler.tags = ["rpg"], handler.command = /^tarik([0-9]+)|tarik|tarikall$/i;
export default handler;