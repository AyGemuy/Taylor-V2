const handler = async (m, {
  conn
}) => {
  conn.susunkata = conn.susunkata ? conn.susunkata : {};
  let id = m.chat;
  if (!(id in conn.susunkata)) throw !1;
  let json = conn.susunkata[id][1];
  await conn.reply(m.chat, "```" + json.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```", m);
};
handler.command = /^hsus$/i, handler.limit = !0;
export default handler;