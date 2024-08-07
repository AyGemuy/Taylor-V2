const handler = async (m, {
  conn,
  command,
  usedPrefix,
  text,
  groupMetadata
}) => {
  if (!text) throw `Contoh:\n${usedPrefix + command} Yang terserah`;
  let a = groupMetadata.participants.map(v => v.id).getRandom(),
    am = ["😀", "😂", "😃", "🗿", "🤤", "😁", "😐", "🙂", "☹️"].getRandom();
  await conn.reply(m.chat, `Yang Paling *${text}* Adalah ${(a => "@" + a.split("@")[0])(a)} ${am}`, m, {
    mentions: [a]
  });
};
handler.help = ["yang"].map(v => v + " <teks>"), handler.command = ["yang"],
  handler.tags = ["fun"], handler.group = !0;
export default handler;