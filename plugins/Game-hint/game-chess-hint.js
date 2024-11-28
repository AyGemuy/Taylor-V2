import fetch from "node-fetch";
const handler = async (m, { conn }) => {
  db.data.game.chessgame = db.data.game.chessgame ? db.data.game.chessgame : {};
  let id = m.chat;
  if (!(id in db.data.game.chessgame)) throw !1;
  let json = JSON.parse(db.data.game.chessgame[id]);
  await conn.reply(
    m.chat,
    (
      await (
        await fetch(
          "https://chessxplain.thexhosting.com/api/gpt?fen=" + json?.fen,
        )
      ).json()
    ).reply,
    m,
  );
};
(handler.command = /^chessh$/i), (handler.limit = !0);
export default handler;
