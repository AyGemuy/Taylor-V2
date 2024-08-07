const handler = async (m, {
  conn,
  text,
  args,
  command
}) => {
  if (!args[0]) throw `Gunakan contoh .${command} halo`;
  const answer = pickRandom(["Ya", "Mungkin iya", "Mungkin", "Mungkin tidak", "Tidak", "Tidak mungkin"]),
    replyText = `\n🔮 *Pertanyaan:* ${args.join(" ")}\n💬 *Jawaban:* ${answer} ${"Ya" === answer ? "👍" : "👎"}\n`.trim();
  await conn.reply(m.chat, replyText, m, m.mentionedJid ? {
    mentions: conn.parseMention(m.text)
  } : {});
};
handler.help = ["apakah"].map(v => v + " <teks>"), handler.tags = ["kerang", "fun"],
  handler.command = /^apakah$/i;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}