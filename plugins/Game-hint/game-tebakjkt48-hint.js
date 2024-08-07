const handler = async (m, {
  conn
}) => {
  conn.tebakjkt48 = conn.tebakjkt48 ? conn.tebakjkt48 : {};
  let id = m.chat;
  if (!(id in conn.tebakjkt48)) throw !1;
  let json = conn.tebakjkt48[id][1];
  await conn.reply(m.chat, "```" + json.name.replace(/[AIUEOaiueo]/gi, "_") + "```", m);
};
handler.command = /^hjkt$/i, handler.limit = !0;
export default handler;