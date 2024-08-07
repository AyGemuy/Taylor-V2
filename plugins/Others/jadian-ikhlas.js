const handler = async (m, {
  conn
}) => "" === db.data.users[m.sender].pasangan ? await conn.reply(m.chat, "Kamu sedang tidak menembak siapapun!", m) : db.data.users[db.data.users[m.sender].pasangan].pasangan === m.sender ? await conn.reply(m.chat, `Kamu telah berpacaran dengan @${db.data.users[m.sender].pasangan.split("@")[0]}`, m, {
  contextInfo: {
    mentionedJid: [db.data.users[m.sender].pasangan]
  }
}) : (await conn.reply(m.chat, `Kamu sudah mengikhlaskan @${db.data.users[m.sender].pasangan.split("@")[0]} karena dia tidak memberikan jawaban diterima atau ditolak`, m, {
  contextInfo: {
    mentionedJid: [db.data.users[m.sender].pasangan]
  }
}), void(db.data.users[m.sender].pasangan = ""));
handler.help = ["ikhlasin"], handler.tags = ["jadian"], handler.command = /^(ikhlasin|ikhlas)$/i,
  handler.mods = !1, handler.premium = !1, handler.group = !0, handler.fail = null;
export default handler;