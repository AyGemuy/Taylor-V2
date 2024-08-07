const handler = async (m, {
  conn
}) => {
  conn.tebakgame = conn.tebakgame ? conn.tebakgame : {};
  let id = m.chat;
  if (!(id in conn.tebakgame)) throw !1;
  let json = conn.tebakgame[id][1];
  await conn.reply(m.chat, "```" + json.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```", m);
};
handler.command = /^hgame$/i, handler.limit = !0;
export default handler;