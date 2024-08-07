const handler = async (m, {
  conn
}) => {
  conn.tebaktebakan = conn.tebaktebakan ? conn.tebaktebakan : {};
  let id = m.chat;
  if (!(id in conn.tebaktebakan)) throw !1;
  let json = conn.tebaktebakan[id][1];
  await conn.reply(m.chat, "```" + json.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```", m);
};
handler.command = /^hteb$/i, handler.limit = !0;
export default handler;