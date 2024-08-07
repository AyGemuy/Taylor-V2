const handler = async (m, {
  conn
}) => {
  conn.tebaklirik = conn.tebaklirik ? conn.tebaklirik : {};
  let id = m.chat;
  if (!(id in conn.tebaklirik)) throw !1;
  let json = conn.tebaklirik[id][1];
  await conn.reply(m.chat, "```" + json.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```", m);
};
handler.command = /^hlir$/i, handler.limit = !0;
export default handler;