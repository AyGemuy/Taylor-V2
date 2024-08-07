const handler = async (m, {
  conn,
  text,
  command,
  usedPrefix
}) => {
  if (!m.quoted) throw "balas pesannya!";
  try {
    let q = await conn.serializeM(await (await conn.serializeM(await m.getQuotedObj())).getQuotedObj());
    if (!q) throw "pesan yang anda reply tidak mengandung reply!";
    await q.copyNForward(m.chat, !0);
  } catch (e) {
    throw "pesan yang anda reply tidak mengandung reply!";
  }
};
handler.help = ["q"], handler.tags = ["tools"], handler.command = /^q$/i;
export default handler;