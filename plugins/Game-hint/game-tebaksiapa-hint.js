const handler = async (m, {
  conn
}) => {
  conn.tebaksiapa = conn.tebaksiapa ? conn.tebaksiapa : {};
  let id = m.chat;
  if (!(id in conn.tebaksiapa)) throw !1;
  let json = conn.tebaksiapa[id][1];
  await conn.reply(m.chat, "```" + json.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```", m);
};
handler.command = /^hsia$/i, handler.limit = !0;
export default handler;