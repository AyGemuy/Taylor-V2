import fetch from "node-fetch";
const handler = async (m, {
  conn
}) => {
  conn.chessgame = conn.chessgame ? conn.chessgame : {};
  let id = m.chat;
  if (!(id in conn.chessgame)) throw !1;
  let json = conn.chessgame[id];
  await conn.reply(m.chat, (await (await fetch("https://chessxplain.thexhosting.com/api/gpt?fen=" + json?.fen)).json()).reply, m);
};
handler.command = /^chessh$/i, handler.limit = !0;
export default handler;