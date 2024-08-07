import fetch from "node-fetch";
const handler = async (m, {
  conn
}) => {
  conn.trivias = conn.trivias ? conn.trivias : {};
  let id = m.chat;
  if (!(id in conn.trivias)) throw !1;
  let json = conn.trivias[id][1],
    jawaban = await Tr(json.correctAnswer);
  await conn.reply(m.chat, "```" + jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```", m);
};
handler.command = /^htri$/i, handler.limit = !0;
export default handler;
async function Tr(teks) {
  let reis = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=id&dt=t&q=" + teks);
  return (await reis.json())[0][0][0];
}