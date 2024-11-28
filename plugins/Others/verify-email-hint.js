const handler = async (m, { conn }) => {
  if (!db.data.dbbot.regmail) db.data.dbbot.regmail = {};
  let id = m.chat;
  if (!(id in db.data.dbbot.regmail)) throw !1;
  let json = db.data.dbbot.regmail[id][1];
  await conn.reply(
    m.chat,
    "```" + json.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```",
    m,
  );
};
(handler.command = /^hotp$/i), (handler.limit = !0);
export default handler;
