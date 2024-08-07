const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  if (!text) throw "input text";
  try {
    m.react(wait), await conn.sendFile(m.chat, "https://api.yanzbotz.my.id/api/text2img/neima?prompt=" + text, text, "*[ Result ]*\n" + text, m);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["neima"], handler.tags = ["internet"], handler.command = /^neima$/i;
export default handler;