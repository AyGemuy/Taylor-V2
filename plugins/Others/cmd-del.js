const handler = async (m, {
  conn,
  text
}) => {
  let hash = text;
  if (m.quoted && m.quoted?.fileSha256 && (hash = m.quoted?.fileSha256.toString("hex")), !hash) return void await conn.reply(m.chat, "❌ Mohon maaf, hash tidak ditemukan.", m);
  let sticker = db.data.sticker;
  if (sticker[hash] && sticker[hash].locked) await conn.reply(m.chat, "🔒 Kamu tidak memiliki izin untuk menghapus perintah stiker ini.", m);
  else {
    delete sticker[hash];
    let str = "✅ Perintah stiker berhasil dihapus!";
    await conn.reply(m.chat, str, m);
  }
};
handler.help = ["delcmd <teks>"], handler.tags = ["database", "premium"], handler.command = /^delcmd$/i,
  handler.premium = !0;
export default handler;