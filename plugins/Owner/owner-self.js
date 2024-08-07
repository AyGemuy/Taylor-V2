const handler = async (m, {
  conn,
  command
}) => {
  let isPublic = "public" === command;
  if (opts.self === isPublic) return m.reply(`Dah ${isPublic ? "Public" : "Self"} dari tadi ${m.sender.split("@")[0] === owner[1] ? "Mbak" : "Bang"} :v`);
  opts.self = isPublic, m.reply(`Berhasil ${isPublic ? "Public" : "Self"} bot!`);
};
handler.help = ["self", "public"], handler.tags = ["owner"], handler.rowner = !0,
  handler.command = /^(self|public)$/i;
export default handler;