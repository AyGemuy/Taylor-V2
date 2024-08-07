const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  conn.user.jid == conn.user.jid ? await conn.reply(m.chat, "Perintah ini hanya untuk yang jadi bot", m) : await conn.reply(conn.user.jid, `${userbot.prefix}jadibot ${Buffer.from(JSON.stringify(conn.base64EncodedAuthInfo())).toString("base64")}`, m);
};
handler.help = ["scanbotcode"], handler.tags = ["jadibot"], handler.command = /^(scanbotcode)$/i;
export default handler;