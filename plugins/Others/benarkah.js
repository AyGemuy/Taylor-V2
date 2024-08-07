const handler = async (m, {
  conn,
  text
}) => {
  const answer = pickRandom(["Iya", "Sudah pasti", "Sudah pasti bisa", "Tidak", "Tentu tidak", "Sudah pasti tidak"]),
    replyText = `\n🔮 *Pertanyaan:* ${m.text}\n💬 *Jawaban:* ${answer} ${"Iya" === answer ? "👍" : "👎"}\n`.trim();
  await conn.reply(m.chat, replyText, m, m.mentionedJid ? {
    mentions: conn.parseMention(m.text)
  } : {});
};
handler.help = ["benarkah"].map(v => v + " <text>"), handler.tags = ["kerang"],
  handler.command = /^benarkah/i, handler.owner = !1;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}