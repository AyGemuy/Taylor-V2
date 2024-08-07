const handler = async (m, {
  conn,
  args,
  command
}) => {
  let chat = Object.keys(conn.chats).filter(v => v.endsWith("g.us"));
  if (command.endsWith("all") || command.endsWith("semua")) {
    for (let id of chat) await conn.groupLeave(id), await delay(2e3);
    m.reply("Berhasil!");
  } else if (args[0] || args.length > 5) {
    if (!chat.find(bot => bot === args[0])) throw "id salah/bot tidak ada digrup itu";
    await conn.groupLeave(args[0]), m.reply("Berhasil!");
  } else {
    if (!m.isGroup) return dfail("group", m, conn);
    await conn.groupLeave(m.chat);
  }
};
handler.help = ["gc", "gcall", "group"].map(v => "leave" + v), handler.tags = ["group"],
  handler.command = /^leaveg(c|ro?up)(all|semua)?$/i, handler.rowner = !0;
export default handler;
const delay = time => new Promise(res => setTimeout(res, time));