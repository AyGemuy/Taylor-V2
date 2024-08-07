const handler = async (m, {
  conn,
  usedPrefix
}) => {
  let id = m.chat;
  if (conn.vote = conn.vote ? conn.vote : {}, !(id in conn.vote)) return await conn.reply(m.chat, "Tidak ada voting digrup ini!", m);
  let [reason, upvote, devote] = conn.vote[id], caption = `*${htjava} DAFTAR VOTE ${htjava}*\n*Alasan:* ${reason}\n\n*${htjava} UPVOTE ${htjava}*\n*Total:* ${upvote.length}\n${dmenut}\n${upvote.map((v, i) => `${dmenub} ${i + 1}.  @${v.split("@")[0]}`).join("\n")}\n${dmenuf}\n\n*${htjava} DEVOTE ${htjava}*\n*Total:* ${devote.length}\n${dmenut}\n${devote.map((v, i) => `${dmenub} ${i + 1}.  @${v.split("@")[0]}`).join("\n")}\n${dmenuf}\n`.trim();
  await conn.reply(m.chat, caption, m, {
    mentions: conn.parseMention(caption)
  });
};
handler.help = ["cekvote"], handler.tags = ["vote"], handler.command = /^cekvote$/i;
export default handler;