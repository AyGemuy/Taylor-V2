const handler = async (m, {
  text,
  command,
  usedPrefix
}) => {
  if (!text) throw `uhm.. teksnya mana?\n\nexample:\n${usedPrefix + command} tes`;
  let msgs = db.data.msgs;
  if (!(text in msgs)) return await conn.reply(m.chat, `'${text}' tidak terdaftar!`, m);
  msgs[text].locked = !/^un/i.test(command), m.reply("berhasil dikunci!");
};
handler.rowner = !0, handler.help = ["un", ""].map(v => v + "lockmsg <teks>"),
  handler.tags = ["database"], handler.command = /^(un)?lock(vn|msg|video|audio|img|stic?ker|gif)$/i;
export default handler;