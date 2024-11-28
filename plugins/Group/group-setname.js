const handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (!text) throw "gimme a name grup";
  await conn.groupUpdateSubject(m.chat, text),
    m.reply((text ? `${text}` : "None") + " Now is name this groups");
};
(handler.help = ["setname <teks>"]),
  (handler.tags = ["group"]),
  (handler.command = /^(setname)$/i),
  (handler.botAdmin = !0),
  (handler.group = !0),
  (handler.admin = !0);
export default handler;
