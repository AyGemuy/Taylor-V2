const handler = async (m, {
  conn
}) => {
  conn.tekateki = conn.tekateki ? conn.tekateki : {};
  let id = m.chat;
  if (!(id in conn.tekateki)) throw !1;
  let json = conn.tekateki[id][1];
  await conn.reply(m.chat, "```" + json.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```", m);
};
handler.command = /^htek$/i, handler.limit = !0;
export default handler;