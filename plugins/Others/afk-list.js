const handler = async (m, { conn, text, usedPrefix, command }) => {
  db.data.database.afk = db.data.database.afk || {};
  try {
    const caption = `*LIST AFK for Chat:* ${conn.getName(m.chat)}\n\n${(db.data.database.afk[m.chat] || []).map((v, i) => `*${i + 1}.*  - *Name:* ${v.username}\n     - *ID:* @${v.id.split("@")[0]}\n     - *Time:* ${formatDateDetails(db.data.users[v.id].afk)}\n     - *Reason:* ${db.data.users[v.id].afkReason}`).join("\n\n") || "No users in the list."}`;
    await conn.reply(m.chat, caption, m, {
      contextInfo: {
        mentionedJid: (db.data.database.afk[m.chat] || []).map((v) => v.id),
      },
    });
  } catch (error) {
    console.error(error);
  }
};
(handler.help = ["listafk"]),
  (handler.tags = ["main"]),
  (handler.group = true),
  (handler.command = /^(listafk)$/i);
export default handler;

function formatDateDetails(date) {
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    hour12: !0,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
