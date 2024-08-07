const handler = async (m, {
  conn
}) => {
  var ayg = db.data.users[m.sender],
    beb = db.data.users[db.data.users[m.sender].pasangan];
  if ("" === ayg.pasangan) return await conn.reply(m.chat, "Anda tidak memiliki pasangan.", m);
  void 0 === beb && (await conn.reply(m.chat, `Berhasil putus hubungan dengan @${db.data.users[m.sender].pasangan.split("@")[0]}`, m, {
    contextInfo: {
      mentionedJid: [db.data.users[m.sender].pasangan]
    }
  }), ayg.pasangan = ""), m.sender === beb.pasangan ? (await conn.reply(m.chat, `Berhasil putus hubungan dengan @${db.data.users[m.sender].pasangan.split("@")[0]}`, m, {
    contextInfo: {
      mentionedJid: [db.data.users[m.sender].pasangan]
    }
  }), ayg.pasangan = "", beb.pasangan = "") : await conn.reply(m.chat, "Anda tidak memiliki pasangan.", m);
};
handler.help = ["putus"], handler.tags = ["jadian"], handler.command = /^(putus)$/i,
  handler.group = !0, handler.fail = null;
export default handler;