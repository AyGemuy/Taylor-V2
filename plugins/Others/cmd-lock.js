const handler = async (m, {
  conn,
  command
}) => {
  if (!m.quoted) throw "Harap reply pesan!";
  if (!m.quoted?.fileSha256) throw "SHA256 Hash Tidak Ditemukan";
  let sticker = db.data.sticker,
    hash = m.quoted?.fileSha256.toString("hex");
  if (!(hash in sticker)) throw "Hash tidak ditemukan dalam database";
  if ("lockcmd" === command) sticker[hash].locked = !0, await conn.reply(m.chat, "Perintah stiker berhasil dikunci! 🔒", m);
  else {
    if ("unlockcmd" !== command) throw `Perintah tidak valid. Gunakan *${command}cmd* untuk mengunci atau membuka kunci perintah.`;
    sticker[hash].locked = !1, await conn.reply(m.chat, "Perintah stiker berhasil dibuka kunci! 🔓", m);
  }
};
handler.help = ["lockcmd", "unlockcmd"], handler.tags = ["database"], handler.command = /^(un)?lockcmd$/i,
  handler.premium = !0;
export default handler;