const handler = async (m, {
  conn
}) => {
  conn.tebakemoji = conn.tebakemoji ? conn.tebakemoji : {};
  let id = m.chat;
  if (!(id in conn.tebakemoji)) throw !1;
  let json = conn.tebakemoji[id][1];
  await conn.reply(m.chat, "```" + json.unicodeName.replace(/[AIUEOaiueo]/gi, "_") + "```", m);
};
handler.command = /^hemo$/i, handler.limit = !0;
export default handler;