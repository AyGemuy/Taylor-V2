const handler = async (m, {
  conn
}) => {
  if (!m.isGroup) throw "Perintah ini hanya bisa digunakan dalam grup!";
  let who;
  if (who = m.isGroup ? m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted?.sender : text : m.chat, !who) throw "Tag orang yang akan dijadikan sebagai Owner!";
  const ownerID = who.split("@")[0];
  if (owner.some(owner => owner[0] === ownerID)) throw "Orang ini sudah menjadi owner!";
  owner.push([ownerID, conn.getName(who) || "Owner", !0]);
  const caption = `Sekarang @${ownerID} telah dijadikan sebagai Owner!`;
  await conn.reply(m.chat, caption, m, {
    mentions: conn.parseMention(caption)
  });
};
handler.help = ["addowner @user"], handler.tags = ["owner"], handler.command = /^(add|tambah|\+)owner$/i,
  handler.owner = !0;
export default handler;