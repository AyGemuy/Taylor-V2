const handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  if (text = function(number) {
      return number.replace(/\s/g, "").replace(/([@+-])/g, "");
    }(text), isNaN(text)) var number = text.split("@")[1];
  else if (!isNaN(text)) number = text;
  if (!text && !m.quoted) return await conn.reply(m.chat, `nomornya mana?\ncontoh: *${usedPrefix}${command} ${owner[0]}*\n@tag/reply user`, m);
  if (isNaN(number)) return await conn.reply(m.chat, "Nomor yang kamu masukkan tidak valid!", m);
  if (number.length > 15) return await conn.reply(m.chat, "Nomor yang kamu masukkan tidak valid!", m);
  try {
    if (text) var user = number + "@s.whatsapp.net";
    else if (m.quoted?.sender) user = m.quoted?.sender;
    else if (m.mentionedJid) user = number + "@s.whatsapp.net";
  } catch (e) {} finally {
    let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {},
      participants = m.isGroup ? groupMetadata.participants : [],
      number = (m.isGroup && participants.find(u => u.jid === user), user.split("@")[0]);
    delete db.data.users[user];
    let pp = await conn.profilePictureUrl(number + "@s.whatsapp.net", "image").catch(_ => "https://telegra.ph/file/24fa902ead26340f3df2c.png"),
      anu = `☑️ Berhasil menghapus *${conn.getName(number + "@s.whatsapp.net")}* dari *DATABASE*`;
    await conn.sendFile(m.chat, pp, "", anu, m, {
      mentions: [number + "@s.whatsapp.net"]
    });
  }
};
handler.help = ["deleteuser"], handler.tags = ["owner"], handler.command = /^del(ete)?user$/i,
  handler.rowner = !0;
export default handler;