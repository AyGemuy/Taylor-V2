const xpperlimit = 350,
  handler = async (m, {
    conn,
    command,
    args
  }) => {
    let count = command.replace(/^buylimit/i, "");
    if (count = count ? /all/i.test(count) ? Math.floor(db.data.users[m.sender].exp / 350) : parseInt(count) : args[0] ? parseInt(args[0]) : 1, count = Math.max(1, count), isNaN(count)) throw "hanya angka!\n\ncontoh: .buylimit5";
    db.data.users[m.sender].exp >= 350 * count ? (db.data.users[m.sender].exp -= 350 * count, db.data.users[m.sender].limit += count, await conn.reply(m.chat, `-${350 * count} XP\n+ ${count} Limit`, m)) : await conn.reply(m.chat, `XP tidak mencukupi untuk membeli ${count} limit`, m);
  };
handler.help = ["buylimit", "buylimit", "buylimitall"].map(v => v + " <total>"),
  handler.tags = ["xp"], handler.command = /^buylimit([0-9]+)|buylimit|buylimitall$/i,
  handler.owner = !1;
export default handler;