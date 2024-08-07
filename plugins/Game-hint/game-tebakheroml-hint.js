const handler = async (m, {
  conn
}) => {
  conn.tebakheroml = conn.tebakheroml ? conn.tebakheroml : {};
  let id = m.chat;
  if (!(id in conn.tebakheroml)) throw !1;
  let json = conn.tebakheroml[id][1];
  await conn.reply(m.chat, "```" + json.title.replace(/[AIUEOaiueo]/gi, "_") + "```", m);
};
handler.command = /^hhero$/i, handler.limit = !0;
export default handler;