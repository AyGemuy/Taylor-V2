const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  m.react(wait);
  try {
    await conn.sendFile(m.chat, "https://sms-bomb.vercel.app/api/aipic.php?prompt=" + encodeURIComponent(text), "", `*\`Image for:\`*\n- ${text}`, m, !1, {
      mentions: [m.sender]
    });
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["aipic"], handler.tags = ["ai"], handler.command = /^(aipic)$/i;
export default handler;