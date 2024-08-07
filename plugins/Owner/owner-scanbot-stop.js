const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  conn.user.jid == conn.user.jid ? await conn.reply(m.chat, "Kamu tidak jadi bot!?", m) : (await conn.reply(m.chat, "Goodbye bot :')", m), conn.close());
};
handler.help = ["scanbotstop"], handler.tags = ["jadibot"], handler.command = /^(scanbotstop)$/i;
export default handler;