const handler = async (m, {
  conn
}) => {
  conn.tebakchara = conn.tebakchara ? conn.tebakchara : {};
  let id = m.chat;
  if (!(id in conn.tebakchara)) throw !1;
  let json = conn.tebakchara[id][1];
  await conn.reply(m.chat, "```" + json.name.replace(/[AIUEOaiueo]/gi, "_") + "```", m);
};
handler.command = /^hcha$/i, handler.limit = !0;
export default handler;