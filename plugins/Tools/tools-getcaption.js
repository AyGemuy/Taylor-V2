const handler = async (m, {
  conn
}) => {
  let caption = null;
  if (!m.quoted) throw "Reply a message!";
  caption = /template/.test(m.quoted?.mtype) ? m.quoted?.mediaMessage[Object.keys(m.quoted?.mediaMessage)[0]].caption : /product/.test(m.quoted?.mtype) ? m.quoted?.product.title + "\n" + m.quoted?.product.description : /order/.test(m.quoted?.mtype) ? m.quoted?.message : m.quoted?.text,
    m.reply(caption, m.chat, {
      mentions: conn.parseMention(caption)
    });
};
handler.help = ["getcaption"], handler.tags = ["tools"], handler.command = /^(getcaption)$/i;
export default handler;