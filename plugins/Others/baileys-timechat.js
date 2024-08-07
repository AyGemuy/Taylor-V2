const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  if (!(args[0] && args[1] && args[2] && args[3])) throw ".setchattime 6282328303332 2022-04-30 15:30 hola";
  let obj_tanggal = `${args[1]}`,
    obj_jam = `${args[2]}`,
    date1 = +new Date(),
    date2 = +new Date(obj_tanggal + " " + obj_jam),
    poster = m.sender;
  setTimeout(async () => await conn.reply(args[0] + "@s.whatsapp.net", `*TIME CHAT BOT*\n*From:* @${poster.split("@")[0]}\n*Text Content:*\n${args[3]}\n`, m, {
    contextInfo: {
      mentionedJid: [poster]
    }
  }), date2 - date1);
};
handler.help = ["setchattime"].map(v => v + " <tanggal|jam|text>"), handler.tags = ["Baileys"],
  handler.command = /^(set(chat)?(time)?)$/i, handler.limit = !1;
export default handler;