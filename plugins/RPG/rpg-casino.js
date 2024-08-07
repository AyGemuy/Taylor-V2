let buatall = 1;
const handler = async (m, {
  conn,
  args,
  usedPrefix
}) => {
  let imgr = flaaa.getRandom();
  if (conn.casino = conn.casino ? conn.casino : {}, m.chat in conn.casino) return m.reply("Masih ada yang melakukan casino disini, tunggu sampai selesai!!");
  if (conn.casino[m.chat] = !0, args.length < 1) return await conn.reply(m.chat, usedPrefix + command + " <jumlah>\n" + usedPrefix + command + " 1000", m);
  try {
    let randomaku = `${Math.floor(101 * Math.random())}`.trim(),
      randomkamu = `${Math.floor(81 * Math.random())}`.trim(),
      Aku = 1 * randomaku,
      Kamu = 1 * randomkamu,
      count = args[0];
    if (count = count ? /all/i.test(count) ? Math.floor(db.data.users[m.sender].exp / buatall) : parseInt(count) : args[0] ? parseInt(args[0]) : 1, count = Math.max(1, count), db.data.users[m.sender].exp >= 1 * count)
      if (db.data.users[m.sender].exp -= 1 * count, Aku > Kamu) {
        let caption = `                💰 *C A S I N O* 💰\n\n${htjava} *@${m.sender.split("@")[0]}* - [USER]\n┗┅⭑ ${Kamu} Point\n${htjava} *@${conn.user.jid.split("@")[0]}* - [BOT]\n┗┅⭑ ${Aku} Point\n\n❌ *LOSE* ❌\nKamu kehilangan ${count} Uang(xp)`.trim();
        await conn.sendFile(m.chat, imgr + "LOSER", "", caption, m, {
          mentions: conn.parseMention(caption)
        });
      } else if (Aku < Kamu) {
      let caption = `                💰 *C A S I N O* 💰\n\n${htjava} *@${m.sender.split("@")[0]}* - [USER]\n┗┅⭑ ${Kamu} Point\n${htjava} *@${conn.user.jid.split("@")[0]}* - [BOT]\n┗┅⭑ ${Aku} Point\n\n🎉 *WIN* 🎉\nKamu mendapatkan ${2 * count} Uang(xp)`.trim();
      await conn.sendFile(m.chat, imgr + "WINNER", "", caption, m, {
        mentions: conn.parseMention(caption)
      });
    } else {
      let caption = `                💰 *C A S I N O* 💰\n\n${htjava} *@${m.sender.split("@")[0]}* - [USER]\n┗┅⭑ ${Kamu} Point\n${htjava} *@${conn.user.jid.split("@")[0]}* - [BOT]\n┗┅⭑ ${Aku} Point\n\n🔖*DRAW* 🔖\nKamu mendapatkan ${1 * count} Uang(xp)`.trim();
      await conn.sendFile(m.chat, imgr + "DRAW", "", caption, m, {
        mentions: conn.parseMention(caption)
      });
    } else await conn.reply(m.chat, "Uang(xp) kamu tidak mencukupi untuk Casino silahkan *.claim* terlebih dahulu!".trim(), m);
  } catch (e) {
    console.log(e), m.reply("Error!!");
  } finally {
    delete conn.casino[m.chat];
  }
};
handler.help = ["casino <jumlah>"], handler.tags = ["rpg"], handler.command = /^(casino|csn)$/i;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}