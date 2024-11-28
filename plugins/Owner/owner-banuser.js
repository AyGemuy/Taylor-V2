const handler = async (m, { conn, args }) => {
  try {
    let who = m.isGroup
      ? m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.quoted && m.quoted.sender
      : null;
    if (!who) {
      return m.reply(
        "⚠️ *Error:* Mohon tag atau sebutkan seseorang yang ingin dibanned.",
      );
    }
    let user = db.data.users[who];
    if (!user) {
      return m.reply(
        "⚠️ *Error:* Pengguna tidak terdaftar dalam DATABASE. Mohon periksa kembali.",
      );
    }
    if (user.banned) {
      return m.reply("🚫 *Error:* Pengguna ini sudah dibanned sebelumnya.");
    }
    let txt = args.slice(1).join(" ").trim();
    if (!txt) {
      return m.reply(
        "⚠️ *Error:* Mohon sebutkan alasan atau keterangan untuk banned.",
      );
    }
    user.banned = true;
    user.BannedReason = txt;
    m.reply("✅ *Berhasil!* Pengguna telah dibanned.\n\n*Alasan:* " + txt);
    let ownerContacts = owner
      .map((v, i) => `*Owner ${i + 1}:* wa.me/${v}`)
      .join("\n");
    let modContacts = mods
      .map((v, i) => `*Moderator ${i + 1}:* wa.me/${v}`)
      .join("\n");
    m.reply(
      `*Kamu telah dibanned oleh OWNER atau MODERATOR!!*\n\n*HUBUNGI*\n${ownerContacts}\n\n${modContacts}`,
      who,
    );
  } catch (error) {
    m.reply("❌ *Terjadi kesalahan:* " + error.message);
  }
};
handler.help = ["ban"];
handler.tags = ["owner"];
handler.command = /^ban(user)?$/i;
handler.owner = true;
export default handler;
