const handler = async (m, {
  command,
  conn,
  text
}) => {
  conn.anonymous = conn.anonymous ? conn.anonymous : {};
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    room = Object.values(conn.anonymous).find(room => room.check(who));
  if (!room) throw "kamu tidak berada di anonymous chat";
  let other = room.other(who);
  var name;
  name = text || conn.getName(m.sender);
  who.split("@")[0];
  let tks = `➔ Nomor: ${m.sender.split("@")[0]}\n➔ Nama: ${name}`;
  await conn.reply(m.chat, "Menggirimkan Kontak..."), other && await conn.reply(other, "Partner mengirimkan kontak kepadamu"),
    other && await conn.sendFile(other, await conn.profilePictureUrl(m.sender, "image").catch(_ => "./thumbnail.jpg"), "", `${htki} ᴀɴᴏɴʏᴍᴏᴜs ᴄʜᴀᴛs ${htka}` + tks, m, {
      mentions: [m.sender]
    });
};
handler.help = ["sendkontak"], handler.tags = "anonymous", handler.command = /^(sendkontak)$/i,
  handler.private = !0;
export default handler;