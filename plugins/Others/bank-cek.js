const handler = async (m, {
  conn,
  command
}) => {
  let user = db.data.users[m.sender],
    imgr = flaaa.getRandom();
  const caption = `\n${htki} *B A N K  U S E R* ${htka}\n${dmenub} 📛 *Name:* ${user.registered ? user.name : conn.getName(m.sender)}\n${dmenub} 💳 *Atm:* ${user.atm > 0 ? "Level " + user.atm : "✖️"}\n${dmenub} 🏛️ *Bank:* ${user.bank} 💲 / ${user.fullatm} 💲\n${dmenub} 💹 *Money:* ${user.money} 💲\n${dmenub} 🤖 *Robo:* ${user.robo > 0 ? "Level " + user.robo : "✖️"}\n${dmenub} 🌟 *Status:* ${user.premiumTime > 0 ? "Premium" : "Free"}\n${dmenub} 📑 *Registered:* ${user.registered ? "Yes" : "No"}\n${dmenuf}\n`.trim();
  await conn.sendFile(m.chat, imgr + command, "", caption, m);
};
handler.help = ["bank"], handler.tags = ["rpg"], handler.command = /^(bank(cek)?|cekbank)$/i,
  handler.register = !1;
export default handler;