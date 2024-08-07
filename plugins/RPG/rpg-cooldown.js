const handler = async (m, {
  conn
}) => {
  let {
    lasthourly,
    lastberburu,
    lastbansos,
    lastadventure,
    lastfishing,
    lastwar,
    lastduel,
    lastmining,
    lastdungeon,
    lastclaim,
    lastweekly,
    lastmonthly
  } = db.data.users[m.sender], warn = db.data.users[m.sender].warn, bann = db.data.users[m.sender].banned, str = `\n*—「 🕖 Cooldown 」—*\n*Last Berburu :* ${lastberburu > 0 ? "❌" : "✅"}\n*Last Memancing :* ${lastfishing > 0 ? "❌" : "✅"}\n*Last Adventure :* ${lastadventure > 0 ? "❌" : "✅"}\n*Last Duel :* ${lastduel > 0 ? "❌" : "✅"}\n*Last War :* ${lastwar > 0 ? "❌" : "✅"}\n*Last Dungeon :* ${lastdungeon > 0 ? "❌" : "✅"}\n*Last Mining :* ${lastmining > 0 ? "❌" : "✅"}\n*Last Bansos :* ${lastbansos > 0 ? "❌" : "✅"}\n*Last Hourly :* ${lasthourly > 0 ? "❌" : "✅"}\n*Last Claim :* ${lastclaim > 0 ? "❌" : "✅"}\n*Last Weekly :* ${lastweekly > 0 ? "❌" : "✅"}\n*Last Monthly :* ${lastmonthly > 0 ? "❌" : "✅"}\n\n${readMore}\n⚠️ *Warn:* ${warn}\n⛔ *Banned:* ${bann}\n`.trim();
  await conn.reply(m.chat, str, m);
};
handler.help = ["cd", "cooldown"], handler.tags = ["rpg"], handler.command = /^(cd|cooldown)$/i,
  handler.register = !1;
export default handler;
const more = String.fromCharCode(8206),
  readMore = more.repeat(4201);