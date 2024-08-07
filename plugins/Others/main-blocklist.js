const handler = async (m, {
  conn
}) => {
  await conn.fetchBlocklist().then(async data => {
    let txt = `*≡ List*\n\n*Total :* ${data.length}\n\n┌─⊷\n`;
    for (let i of data) txt += `▢ @${i.split("@")[0]}\n`;
    return txt += "└───────────", await conn.reply(m.chat, txt, m, {
      mentions: conn.parseMention(txt)
    });
  }).catch(err => {
    throw console.log(err), "no numbers blocked";
  });
};
handler.help = ["blocklist"], handler.tags = ["main"], handler.command = ["blocklist", "listblock"];
export default handler;