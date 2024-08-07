const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  conn.listAfk = conn.listAfk || {};
  try {
    const caption = `*LIST AFK for Chat:* ${conn.getName(m.chat)}\n\n${(conn.listAfk[m.chat] || []).map((v, i) => `*${i + 1}.*  - *Name:* ${v.username}\n     - *ID:* @${v.id.split("@")[0]}\n     - *Time:* ${formatDateDetails(db.data.users[v.id].afk)}\n     - *Reason:* ${db.data.users[v.id].afkReason}`).join("\n\n") || "No users in the list."}`;
    await conn.reply(m.chat, caption, m, {
      contextInfo: {
        mentionedJid: (conn.listAfk[m.chat] || []).map(v => v.id),
        externalAdReply: {
          title: "AFK List",
          body: "",
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: false,
          thumbnailUrl: "https://cdn-icons-png.flaticon.com/128/6012/6012311.png",
          sourceUrl: ""
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};
handler.help = ["listafk"], handler.tags = ["main"], handler.group = !0, handler.command = /^(listafk)$/i;
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
    year: "numeric"
  }).format(date);
}