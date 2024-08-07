const handler = async (m, {
  conn
}) => {
  conn.quizz = conn.quizz ? conn.quizz : {};
  let id = m.chat;
  if (!(id in conn.quizz)) throw !1;
  let json = conn.quizz[id][1];
  await conn.reply(m.chat, (json[0]?.hint).map((element, index) => `${index + 1}. ${element}`).join("\n"), m);
};
handler.command = /^quizzh$/i, handler.limit = !0;
export default handler;