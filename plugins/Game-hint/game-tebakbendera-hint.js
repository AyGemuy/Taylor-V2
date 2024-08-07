const handler = async (m, {
  conn
}) => {
  conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {};
  let id = m.chat;
  if (!(id in conn.tebakbendera)) throw !1;
  let json = conn.tebakbendera[id][1];
  await conn.reply(m.chat, "```" + json.name.replace(/[AIUEOaiueo]/gi, "_") + "```", m);
};
handler.command = /^hben$/i, handler.limit = !0;
export default handler;