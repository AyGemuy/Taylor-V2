const handler = async (m, {
  conn
}) => {
  conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {};
  let id = m.chat;
  if (!(id in conn.siapakahaku)) throw !1;
  let json = conn.siapakahaku[id][1];
  await conn.reply(m.chat, "```" + json.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```", m);
};
handler.command = /^hsi$/i, handler.limit = !0;
export default handler;