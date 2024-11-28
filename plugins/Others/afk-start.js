const handler = async (m, { conn, text, usedPrefix, command }) => {
  db.data.database.afk = db.data.database.afk || {};
  try {
    let user = db.data.users[m.sender];
    (user.afk = +new Date()), (user.afkReason = text);
    const username = m.name || m.pushName,
      id = m.sender || m.key.remoteJid;
    db.data.database.afk[m.chat] = db.data.database.afk[m.chat]
      ? db.data.database.afk[m.chat].some((user) => user.id === id)
        ? db.data.database.afk[m.chat]
        : [
            ...db.data.database.afk[m.chat],
            {
              username: username,
              id: id,
            },
          ]
      : [
          {
            username: username,
            id: id,
          },
        ];
    const caption = `\n🚀 ${conn.getName(m.sender)} @${m.sender.split("@")[0]} Sekarang lagi AFK\n*Dengan Alasan:*\n${text ? " " + text : "Tanpa alasan"}`;
    await conn.reply(m.chat, caption, m, {
      contextInfo: {
        mentionedJid: conn.parseMention(caption),
      },
    });
  } catch (error) {
    console.error(error);
  }
};
(handler.help = ["afk [alasan]"]),
  (handler.tags = ["main"]),
  (handler.group = !0),
  (handler.command = /^afk$/i);
export default handler;
