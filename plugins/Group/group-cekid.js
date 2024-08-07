const handler = async (m, {
  conn,
  groupMetadata
}) => {
  await conn.reply(m.chat, `${await groupMetadata.id}`, fakes);
};
handler.help = ["cekid"], handler.tags = ["group"], handler.command = /^(cekid|idgc|gcid)$/i,
  handler.group = !0;
export default handler;