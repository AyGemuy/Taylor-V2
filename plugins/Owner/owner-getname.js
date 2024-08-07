const handler = async (m, {
  conn,
  command
}) => {
  try {
    let who;
    who = m.isGroup ? m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted?.sender : m.quoted?.sender ? m.quoted?.sender : m.sender;
    let name = conn.getName(who);
    m.reply(name);
  } catch {
    try {
      let who = m.quoted ? m.quoted?.sender : m.sender,
        name = conn.getName(who);
      m.reply(name);
    } catch {
      throw "sorry gk bisa coba yang lain⍨";
    }
  }
};
handler.help = ["getname <@tag/reply>"], handler.tags = ["owner"], handler.command = /^(get)?name?a?$/i,
  handler.owner = !0;
export default handler;