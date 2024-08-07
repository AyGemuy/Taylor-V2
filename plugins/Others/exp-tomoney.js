const xpperlimit = 2,
  handler = async (m, {
    conn,
    command,
    args
  }) => {
    db.data.users[m.sender];
    let count = command.replace(/^tomoney/i, "");
    count = count ? /all/i.test(count) ? Math.floor(db.data.users[m.sender].exp / 2) : parseInt(count) : args[0] ? parseInt(args[0]) : 1,
      count = Math.max(1, count), db.data.users[m.sender].exp >= 2 * count ? (db.data.users[m.sender].exp -= 2 * count, db.data.users[m.sender].money += count, await conn.reply(m.chat, `Sukses menukarkan exp sebesar ${count} Exp ✨`, m)) : await conn.reply(m.chat, `[❗] Exp anda tidak mencukupi untuk ditukar sebesar ${count} ✨`, m);
  };
handler.help = ["tomoney <jumlah>"], handler.tags = ["xp"], handler.command = /^tomoney([0-9]+)|tomoney|tomoneyall$/i;
export default handler;