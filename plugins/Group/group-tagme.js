const handler = async (m, {
  conn,
  text
}) => {
  let tag = `@${m.sender.replace(/@.+/, "")}`,
    mentionedJid = [m.sender];
  await conn.reply(m.chat, tag, m, {
    contextInfo: {
      mentionedJid: mentionedJid
    }
  });
};
handler.help = ["tagme"], handler.tags = ["group"], handler.command = /^tagme$/i,
  handler.group = !1;
export default handler;