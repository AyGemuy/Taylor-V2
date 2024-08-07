const handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  let id = m.chat;
  if (conn.vote = conn.vote ? conn.vote : {}, !(id in conn.vote)) return await conn.reply(m.chat, "Tidak ada voting digrup ini!", m);
  if (conn.vote[id][1].concat(conn.vote[id][2]).includes(m.sender)) throw "Kamu sudah vote!";
  /up/i.test(command) ? conn.vote[id][1].push(m.sender) : /de/i.test(command) && conn.vote[id][2].push(m.sender);
  let [reason, upvote, devote] = conn.vote[id], caption = `*${htjava} DAFTAR VOTE ${htjava}*\n*Alasan:* ${reason}\n\n*${htjava} UPVOTE ${htjava}*\n*Total:* ${upvote.length}\n${dmenut}\n${upvote.map((v, i) => `${dmenub} ${i + 1}.  @${v.split("@")[0]}`).join("\n")}\n${dmenuf}\n\n*${htjava} DEVOTE ${htjava}*\n*Total:* ${devote.length}\n${dmenut}\n${devote.map((v, i) => `${dmenub} ${i + 1}.  @${v.split("@")[0]}`).join("\n")} \n${dmenuf}\n`.trim();
  await conn.reply(m.chat, caption, m, {
    mentions: conn.parseMention(caption)
  });
};
handler.help = ["upvote", "devote"], handler.tags = ["vote"], handler.command = /^(up|de)vote$/i;
export default handler;