const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  try {
    if (!text) return void await conn.reply(m.chat, `Kamu belum memberikan pesan laporan. Gunakan perintah ini:\n\nContoh:\n${usedPrefix + command} Selamat siang owner, saya menemukan error seperti berikut <copy/tag pesan errornya>`, m);
    if (text.length < 10) return void await conn.reply(m.chat, "Laporan terlalu pendek, minimal 10 karakter!", m);
    if (text.length > 1e3) return void await conn.reply(m.chat, "Laporan terlalu panjang, maksimal 1000 karakter!", m);
    let teks = `*${command.toUpperCase()}!*\n\nDari: *@${m.sender.split("@")[0]}*\n\nPesan: ${text}\n`;
    await conn.reply(nomorown + "@s.whatsapp.net", m.quoted ? teks + m.quoted?.text : teks, null, {
      contextInfo: {
        mentionedJid: [m.sender]
      }
    }) && await conn.reply(m.chat, "_Pesan terkirim ke pemilik bot. Jika laporan hanya main-main, tidak akan ditanggapi._", m);
  } catch (error) {
    console.error(error), await conn.reply(m.chat, "Terjadi kesalahan dalam mengirim laporan. Mohon coba lagi nanti.", m);
  }
};
handler.help = ["report"].map(v => v + " <teks>"), handler.tags = ["info"],
  handler.command = /^(reports|masalah|report?|lapor|bug[gs]|bug)$/i, handler.limit = 10;
export default handler;