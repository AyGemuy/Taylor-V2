export async function all(m) {
  if (!(m.isGroup && m.sender && !m.isBaileys)) return;
  const user = db.data.users[m.sender];
  if (m.chat?.endsWith("broadcast")) return false;
  try {
    if (user.premiumTime && user.premium && Date.now() >= user.premiumTime) {
      const caption = `
╭─❒ 「 *Premium Berakhir* 」
│  Masa premium Anda telah berakhir!
│  Perpanjang untuk terus menikmati 
│  fitur eksklusif.
╰───────❒`;
      await this.reply(m.chat, caption, m, {
        contextInfo: {
          mentionedJid: [m.sender],
        },
      });
      user.premiumTime = 0;
      user.premium = false;
    }
  } catch (error) {
    console.error(
      `Gagal mengelola status premium untuk pengguna ${m.sender}:`,
      error,
    );
  }
}
