const handler = async (m, {
  conn,
  command
}) => {
  let user = db.data.users[m.sender],
    imgr = flaaa.getRandom();
  const caption = `\n${htki} *H U T A N G  U S E R* ${htka}\n${dmenub} 📛 *Name:* ${user.registered ? user.name : conn.getName(m.sender)}\n${dmenub} 💹 *Money:* ${user.money} 💲\n${dmenuf}\n`.trim();
  await conn.sendFile(m.chat, imgr + command, "", caption, m);
};
handler.help = ["hutang"], handler.tags = ["rpg"], handler.command = /^(hutang)$/i,
  handler.register = !1;
export default handler;