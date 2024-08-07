const handler = async (m, {
  conn
}) => {
  conn.tebakkalimat = conn.tebakkalimat ? conn.tebakkalimat : {};
  let id = m.chat;
  if (!(id in conn.tebakkalimat)) throw !1;
  let json = conn.tebakkalimat[id][1];
  await conn.reply(m.chat, "```" + json.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```", m);
};
handler.command = /^hkal$/i, handler.limit = !0;
export default handler;