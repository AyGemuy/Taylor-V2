const handler = async (m, {
  conn
}) => {
  conn.tebaklogo = conn.tebaklogo ? conn.tebaklogo : {};
  let id = m.chat;
  if (!(id in conn.tebaklogo)) throw !1;
  let json = conn.tebaklogo[id][1];
  await conn.reply(m.chat, "```" + json.hasil.data.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```", m);
};
handler.command = /^hlog$/i, handler.limit = !0;
export default handler;