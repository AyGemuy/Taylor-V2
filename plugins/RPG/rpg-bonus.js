const handler = async (m, {
  conn
}) => {
  new Date() - db.data.users[m.sender].lastclaim > 864e5 ? (await conn.reply(m.chat, "Nih Gw Kasih Modal Buat beli limit\n💰50.000 Rupiah", m), db.data.users[m.sender].money += 5e4, db.data.users[m.sender].lastclaim = 1 * new Date()) : await conn.reply(m.chat, "📮Bagi link bokep 100.000:v", m);
};
handler.help = ["bonus", "hadiah"], handler.tags = ["rpg"], handler.command = /^(bonus|hadiah)$/i,
  handler.owner = !0, handler.mods = !1, handler.premium = !1, handler.group = !1,
  handler.private = !1, handler.admin = !1, handler.botAdmin = !1, handler.fail = null,
  handler.exp = 0;
export default handler;