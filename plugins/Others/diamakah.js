const handler = async (m, {
  conn,
  command,
  text
}) => {
  await conn.reply(m.chat, `\n*Pertanyaan:* ${command} ${text}\n*Jawaban:* ${pickRandom([ "di neraka", "di surga", "di mars", "di tengah laut", "di dada :v", "di hatimu >///<" ])}\n`.trim(), m, m.mentionedJid ? {
    contextInfo: {
      mentionedJid: m.mentionedJid
    }
  } : {});
};
handler.help = ["dimanakah <pertanyaan>"], handler.tags = ["kerang"], handler.command = /^dimanakah$/i,
  handler.owner = !1;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}