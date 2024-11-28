const handler = async (m, { conn, args }) => {
  try {
    let who = m.isGroup
      ? m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.quoted && m.quoted.sender
      : null;
    if (!who) {
      return m.reply(
        "⚠️ *Error:* Mohon tag atau sebutkan seseorang yang ingin di-unban.",
      );
    }
    let user = db.data.users[who];
    if (!user) {
      return m.reply(
        "⚠️ *Error:* Pengguna tidak terdaftar dalam DATABASE. Mohon periksa kembali.",
      );
    }
    if (!user.banned) {
      return m.reply("🚫 *Error:* Pengguna ini tidak dibanned.");
    }
    let txt = args.slice(1).join(" ").trim();
    if (!txt) {
      return m.reply(
        "⚠️ *Error:* Mohon sebutkan alasan atau keterangan untuk unban.",
      );
    }
    user.banned = false;
    user.BannedReason = "";
    m.reply("✅ *Berhasil!* Pengguna telah di-unban.\n\n*Alasan:* " + txt);
    let ownerContacts = owner
      .map((v, i) => `*Owner ${i + 1}:* wa.me/${v}`)
      .join("\n");
    let modContacts = mods
      .map((v, i) => `*Moderator ${i + 1}:* wa.me/${v}`)
      .join("\n");
    m.reply(
      `*Kamu telah di-unban oleh OWNER atau MODERATOR!!*\n\n*HUBUNGI*\n${ownerContacts}\n\n${modContacts}`,
      who,
    );
  } catch (error) {
    m.reply("❌ *Terjadi kesalahan:* " + error.message);
  }
};
handler.help = ["unban"];
handler.tags = ["owner"];
handler.command = /^unban(user)?$/i;
handler.owner = true;
export default handler;
