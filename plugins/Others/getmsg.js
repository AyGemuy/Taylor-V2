const handler = async (m, {
  conn,
  command,
  usedPrefix,
  text,
  isROwner
}) => {
  command.replace(/get/i, "");
  if (!text) throw `uhm.. teksnya mana?${usedPrefix + command} test`;
  let msgs = db.data.msgs;
  if (!(text in msgs)) return await conn.reply(m.chat, `${text} tidak terdaftar!`, m);
  if (msgs[text].locked && !isROwner) throw m.reply("dikunci!"), 0;
  let _m = conn.serializeM(JSON.parse(JSON.stringify(msgs[text]), (_, v) => null !== v && "object" == typeof v && "type" in v && "Buffer" === v.type && "data" in v && Array.isArray(v.data) ? Buffer.from(v.data) : v));
  await _m.copyNForward(m.chat, !1);
};
handler.help = ["vn", "msg", "video", "gif", "audio", "img", "sticker"].map(v => "get" + v + " <teks>"),
  handler.tags = ["database"], handler.command = /^get(all|vn|msg|video|audio|img|stic?ker|gif)$/;
export default handler;