const handler = async (m, {
  conn,
  args,
  usedPrefix
}) => {
  if (!args[0] || !m.mentionedJid[0]) return await conn.reply(m.chat, usedPrefix + "casino <jumlah> @lawan\n " + usedPrefix + `casino 1000 @${m.sender.split("@")[0]}`, m, {
    mentions: [m.sender]
  });
  if (conn.casino = conn.casino ? conn.casino : {}, m.chat in conn.casino) return m.reply("Masih ada yang melakukan casino disini, tunggu sampai selesai!!");
  if (!db.data.users[m.mentionedJid[0]]) return m.reply("Lawan tidak terdaftar didatabase bot atau format kamu salah. " + usedPrefix + "casino <jumlah> @lawan");
  let count = args[0];
  if (count = count ? /all/i.test(count) ? Math.floor(db.data.users[m.sender].money / 1) : parseInt(count) : args[0] ? parseInt(args[0]) : 1, count = Math.max(1, count), db.data.users[m.sender].money >= 1 * count && db.data.users[m.mentionedJid[0]].money >= 1 * count) {
    conn.casino[m.chat] = {
      player_1: m.sender,
      player_2: m.mentionedJid[0],
      count: count
    };
    let caption = ` _*CASINO - DUEL*_ \n       \n@${m.sender.split("@")[0]} \n     _*MENANTANG*_\n@${m.mentionedJid[0]?.split("@")[0]} \n\nUntuk Bermain Casino Dengan Taruhan ${count}\n\nKetik Tombol Di Bawah Untuk Terima Atau Totak\nAtau Ketik Terima/Tolak`;
    await conn.reply(m.chat, caption + "\n\nterima\ntolak", m, {
      mentions: [m.sender, m.mentionedJid[0]]
    });
  } else {
    if (db.data.users[m.sender].money <= count) return m.reply("Money kamu tidak mencukupi untuk Casino silahkan *.claim* terlebih dahulu!");
    if (db.data.users[m.mentionedJid[0]].money <= count) return m.reply("Money lawan kamu tidak mencukupi untuk Casino silahkan suruh lawan kamu *.claim* terlebih dahulu!");
  }
};
handler.help = ["casino <jumlah> @lawan"], handler.group = !0, handler.tags = ["rpg"],
  handler.command = /^((casino|csn)pvp|duel)$/i;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}