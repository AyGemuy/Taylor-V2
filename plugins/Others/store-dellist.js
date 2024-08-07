const handler = async (m, {
  text,
  usedPrefix,
  command
}) => {
  if (!text) return m.reply("Gunakan *" + usedPrefix + "liststore* untuk melihat daftar pesan yg tersimpan.");
  let msgs = db.data.msgs;
  return text in msgs ? (delete msgs[text], m.reply("[💬] berhasil menghapus pesan di daftar List dengan nama >\n" + text)) : m.reply("[ " + text + " ] tidak terdaftar di daftar pesan.");
};
handler.help = ["store"].map(v => "del" + v + " <teks>"), handler.tags = ["database"],
  handler.command = ["delstore"], handler.group = !0, handler.admin = !0;
export default handler;