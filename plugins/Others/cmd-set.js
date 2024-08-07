const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (db.data.sticker = db.data.sticker || {}, !m.quoted) throw `Balas stiker dengan perintah *${usedPrefix + command}* ❗`;
  if (!m.quoted?.fileSha256) throw "SHA256 Hash Tidak Ditemukan ❗";
  if (!text) throw `Penggunaan:\n${usedPrefix + command} <teks>\n\nContoh:\n${usedPrefix + command} tes`;
  let sticker = db.data.sticker,
    hash = m.quoted?.fileSha256.toString("base64");
  if (sticker[hash] && sticker[hash].locked) throw "Kamu tidak memiliki izin untuk mengubah perintah stiker ini 🔒";
  sticker[hash] = {
    text: text,
    mentionedJid: m.mentionedJid,
    creator: m.sender,
    at: +new Date(),
    locked: !1
  }, await conn.reply(m.chat, "✅ Berhasil Menyimpan CMD! 👌", m);
};
handler.help = ["cmd"].map(v => "set" + v + " <teks>"), handler.tags = ["database", "premium"],
  handler.command = ["setcmd"], handler.premium = !0;
export default handler;