const handler = async (m, { command, usedPrefix, text }) => {
  command.replace(/get/i, "");
  if (!text)
    throw `uhm.. teksnya mana?\n\ncontoh:\n${usedPrefix + command} test`;
  let msgs = db.data.msgs;
  if ((!text) in msgs) throw `'${text}' tidak terdaftar!`;
  delete msgs[text], m.reply(`berhasil menghapus pesan dengan nama '${text}'`);
};
(handler.help = ["msg"].map((v) => "del" + v + " <teks>")),
  (handler.tags = ["database"]),
  (handler.command =
    /^(-|del)(all|vn|msg|store|video|audio|img|stic?ker|gif)$/i);
export default handler;
