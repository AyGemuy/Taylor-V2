const handler = async (m, {
  conn,
  text
}) => {
  if (!text) throw "Masukan Text Untuk Bio Baru Bot";
  try {
    await conn.updateProfileStatus(text).catch(_ => _), await conn.reply(m.chat, "Sukses Mengganti Bio Bot", m);
  } catch {
    throw "Yah Error.. :>";
  }
};
handler.help = ["setbotbio"], handler.tags = ["owner"], handler.command = /^setb(io(bot)?|otbio)$/i,
  handler.owner = !0;
export default handler;