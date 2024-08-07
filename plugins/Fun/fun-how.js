const handler = async (m, {
  conn,
  command,
  text,
  usedPrefix
}) => {
  if (!text) throw `Use example ${usedPrefix}${command} i'm`;
  m.reply(`\n${command} ${text}\n${text} is ${101..getRandom()}% ${command.replace("how", "").toUpperCase()}\n`.trim(), null, m.mentionedJid ? {
    mentions: conn.parseMention(m.text)
  } : {});
};
handler.help = ["gay", "pintar", "cantik", "ganteng", "gabut", "gila", "lesbi", "stress", "bucin", "jones", "sadboy"].map(v => "how" + v + " siapa?"),
  handler.tags = ["kerang", "fun"], handler.command = /^how(gay|pintar|cantik|ganteng|gabut|gila|lesbi|stress?|bucin|jones|sadboy)/i;
export default handler;