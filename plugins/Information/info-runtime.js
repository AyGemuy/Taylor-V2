const handler = async (m, {
  conn
}) => {
  try {
    let who = m.mentionedJid && m.mentionedJid[0] || (m.fromMe ? conn.user.jid : m.sender),
      message = `*⏳ Runtime Overview ⏳*\n────────────────────\n${clockString(await new Promise(resolve => setTimeout(resolve, 0)) || 1e3 * process.uptime())}\n────────────────────`;
    const thumbnail = await conn.getFile("https://cdn-icons-png.flaticon.com/128/10984/10984804.png");
    await conn.sendMessage(m.chat, {
      text: message,
      contextInfo: {
        externalAdReply: {
          title: "🤖 Bot Runtime",
          thumbnail: thumbnail.data
        },
        mentionedJid: [who]
      }
    }, {
      quoted: m
    });
  } catch (error) {
    console.error(error);
  }
};
handler.help = ["runtime"], handler.tags = ["info"], handler.command = /^r(untime?|t)$/i;
export default handler;

function clockString(ms) {
  try {
    let [d, h, m, s] = isNaN(ms) ? ["--", "--", "--", "--"] : [Math.floor(ms / 864e5), Math.floor(ms / 36e5) % 24, Math.floor(ms / 6e4) % 60, Math.floor(ms / 1e3) % 60];
    return `☀️ *${d}* Days\n🕐 *${h}* Hours\n⏰ *${m}* Minutes\n⏱️ *${s}* Seconds`;
  } catch (error) {
    return console.error(error), "Error in clockString function";
  }
}