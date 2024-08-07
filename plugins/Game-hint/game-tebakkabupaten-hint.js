const handler = async (m, {
  conn
}) => {
  conn.tebakkabupaten = conn.tebakkabupaten ? conn.tebakkabupaten : {};
  let id = m.chat;
  if (!(id in conn.tebakkabupaten)) throw !1;
  let json = conn.tebakkabupaten[id][1];
  await conn.reply(m.chat, "```" + json.title.replace(/[AIUEOaiueo]/gi, "_") + "```", m);
};
handler.command = /^hkab$/i, handler.limit = !0;
export default handler;