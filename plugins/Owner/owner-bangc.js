const handler = async (m, { conn, usedPrefix, args, command }) => {
  const groups = Object.values(conn.chats).filter((v) =>
    v.id.endsWith("@g.us"),
  );
  if (args.length === 0 || !["on", "off"].includes(args[0].toLowerCase())) {
    const buttons = conn.ctaButton
      .setBody(
        "Pilih aksi untuk mengaktifkan atau menonaktifkan pembatasan di grup.",
      )
      .setFooter("Klik salah satu tombol di bawah.")
      .addSelection("Pilih Aksi")
      .makeSections("Aksi", "Pilih Aksi");
    buttons.makeRow(
      "",
      "🔓 On",
      "Aktifkan Pembatasan",
      `${usedPrefix}${command} on`,
    );
    buttons.makeRow(
      "",
      "🔒 Off",
      "Nonaktifkan Pembatasan",
      `${usedPrefix}${command} off`,
    );
    return buttons.run(m.chat, conn, m);
  }
  const action = args[0].toLowerCase();
  if (
    args.length < 2 ||
    isNaN(args[1]) ||
    args[1] < 1 ||
    args[1] > groups.length
  ) {
    const list = groups.map((g, i) => `✨ *${i + 1}. ${g.subject}*`).join("\n");
    const buttons = conn.ctaButton
      .setBody(
        `🎉 *Daftar Grup yang Tersedia:*\n\n${list}\n\n💡 *Pilih grup dari tombol di bawah untuk ${action === "on" ? "mengaktifkan" : "menonaktifkan"} pembatasan.*`,
      )
      .setFooter(`Pilih grup dari daftar di bawah.`)
      .addSelection("Pilih Grup")
      .makeSections("Daftar Grup", "Pilih Grup");
    groups.forEach((g, i) =>
      buttons.makeRow(
        "",
        `👥 ${g.subject}`,
        `Lihat Grup ${g.subject}`,
        `${usedPrefix}${command} ${action} ${i + 1}`,
      ),
    );
    return buttons.run(m.chat, conn, m);
  }
  const groupIndex = parseInt(args[1], 10);
  const status = action === "on";
  const group = groups[groupIndex - 1];
  if (!group) {
    return m.reply(
      "🚫 Grup tidak ditemukan. Silakan pilih nomor grup yang valid.",
    );
  }
  const currentStatus = db.data.chats[group.id]?.isBanned;
  if (currentStatus === status) {
    return m.reply(
      `📜 Pembatasan sudah ${status ? "aktif" : "nonaktif"} di grup *${group.subject}*. Tidak ada perubahan yang dilakukan.`,
    );
  }
  db.data.chats[group.id] = {
    ...db.data.chats[group.id],
    isBanned: status,
  };
  return m.reply(
    `✅ Berhasil ${status ? "mengaktifkan" : "menonaktifkan"} pembatasan untuk grup *${group.subject}*.`,
  );
};
handler.help = ["gcblock"].map((v) => v + " <on|off> <nomor grup>");
handler.tags = ["owner"];
handler.command = /^(gcblock|bangc)$/i;
handler.owner = true;
export default handler;
