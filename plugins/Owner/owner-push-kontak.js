const handler = async (m, {
  conn,
  groupMetadata,
  usedPrefix,
  text,
  command
}) => {
  if (!text && !m.quoted) return m.reply("Input text\nReply pesan");
  let get = await groupMetadata.participants.filter(v => v.id.endsWith(".net")).map(v => v.id),
    count = get.length,
    sentCount = 0;
  m.react(wait);
  for (let i = 0; i < get.length; i++) setTimeout(function() {
    text ? conn.sendMessage(get[i], {
      text: text
    }) : m.quoted ? conn.copyNForward(get[i], m.getQuotedObj(), !1) : text && m.quoted && conn.sendMessage(get[i], {
      text: text + "\n" + m.quoted?.text
    }), count--, sentCount++, 0 === count && m.reply(`Berhasil Push Kontak:\nJumlah Pesan Terkirim: *${sentCount}*`);
  }, 1e3 * i);
};
handler.command = handler.help = ["pushkontak"], handler.tags = ["tools"], handler.owner = !0,
  handler.group = !0;
export default handler;