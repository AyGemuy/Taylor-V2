const handler = async (m, {
  conn
}) => {
  conn.regmail = conn.regmail ? conn.regmail : {};
  let id = m.chat;
  if (!(id in conn.regmail)) throw !1;
  let json = conn.regmail[id][1];
  await conn.reply(m.chat, "```" + json.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```", m);
};
handler.command = /^hotp$/i, handler.limit = !0;
export default handler;