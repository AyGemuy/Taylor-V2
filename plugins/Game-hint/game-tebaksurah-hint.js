const handler = async (m, {
  conn
}) => {
  conn.tebaksurah = conn.tebaksurah ? conn.tebaksurah : {};
  let id = m.chat;
  if (!(id in conn.tebaksurah)) throw !1;
  let json = conn.tebaksurah[id][1];
  await conn.reply(m.chat, "```" + json.surah.englishName.replace(/[AIUEOaiueo]/gi, "_") + "```", m);
};
handler.command = /^hsur$/i, handler.limit = !0;
export default handler;