const handler = async (m, {
  conn,
  usedPrefix,
  command,
  args: [event],
  text
}) => {
  if (!event) return await conn.reply(m.chat, `contoh:\n${usedPrefix + command} welcome @user\n${usedPrefix + command} bye @user\n${usedPrefix + command} promote @user\n${usedPrefix + command} demote @user`.trim(), m);
  let mentions = text.replace(event, "").trimStart(),
    who = mentions ? conn.parseMention(mentions) : [],
    part = who.length ? who : [m.sender],
    act = !1;
  switch (m.reply(`*${htjava} Simulating ${event}...*`), event.toLowerCase()) {
    case "add":
    case "invite":
    case "welcome":
      act = "add";
      break;
    case "bye":
    case "kick":
    case "leave":
    case "remove":
      act = "remove";
      break;
    case "promote":
      act = "promote";
      break;
    case "demote":
      act = "demote";
      break;
    default:
      m.react(eror);
  }
  return act ? conn.participantsUpdate({
    id: m.chat,
    participants: part,
    action: act
  }) : void 0;
};
handler.help = ["simulate <event> [@mention]"], handler.tags = ["owner"], handler.command = /^simulate$/i;
export default handler;