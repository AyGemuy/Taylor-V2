const handler = async (m, {
  conn,
  usedPrefix,
  args
}) => {
  const groups = Object.keys(conn.chats).filter(key => key.endsWith("@g.us")).map(key => conn.chats[key]);
  if (0 === args.length) {
    const list = groups.map((group, index) => `*${index + 1}.* ${group.subject}`).join("\n");
    await conn.reply(m.chat, `📋 *Daftar Nama Grup dengan Urutan:*\n\n${list}`, m);
  } else if (1 === args.length && /^\d+$/.test(args[0])) {
    const index = parseInt(args[0]) - 1;
    if (index >= 0 && index < groups.length) {
      const group = groups[index],
        superAdminCount = group.participants.filter(p => "superadmin" === p.admin).length,
        adminCount = group.participants.filter(p => "admin" === p.admin).length,
        adminList = group.participants.filter(p => "admin" === p.admin).map(a => `- ${a.id.replace(/(\d+)@.+/, "@$1")}`).join("\n"),
        superAdminList = group.participants.filter(p => "superadmin" === p.admin).map(a => `- ${a.id.replace(/(\d+)@.+/, "@$1")}`).join("\n"),
        info = `📊 *Informasi Grup Urutan ke-${index + 1}*\n\n*ID:* ${group.id}\n*Subject:* ${group.subject}\n*Pemilik Subject:* ${group.subjectOwner}\n*Waktu Subjek Diubah:* ${formatTime(group.subjectTime)}\n*Waktu Dibuat:* ${formatTime(group.creation)}\n*Pemilik Grup:* ${group.owner.replace(/(\d+)@.+/, "@$1")}\n*Deskripsi:* ${group.desc}\n*ID Deskripsi:* ${group.descId}\n*Batasan:* ${group.restrict ? "Ya" : "Tidak"}\n*Pengumuman:* ${group.announce ? "Ya" : "Tidak"}\n*Total Partisipan:* ${group.participants.length}\n*Jumlah Superadmin:* ${superAdminCount}\n*Daftar Superadmin:*\n${superAdminList}\n*Jumlah Admin:* ${adminCount}\n*Daftar Admin:*\n${adminList}\n*Durasi Pesan Sementara:* ${formatDuration(group.ephemeralDuration)}`;
      m.reply(info, null, {
        contextInfo: {
          mentionedJid: group.participants.map(v => v.id)
        }
      });
    } else await conn.reply(m.chat, "❌ Grup dengan urutan tersebut tidak ditemukan.", m);
  } else await conn.reply(m.chat, `❗ Format perintah salah. Gunakan "${usedPrefix}groups" untuk daftar grup atau "${usedPrefix}groups [nomor_urutan]" untuk informasi grup tertentu.`, m);
};
handler.menu = ["groups", "grouplist"], handler.tags = ["group"], handler.command = /^(gro?ups?list)|(listgro?ups?)|(listgc)$/i;
export default handler;

function formatTime(timestamp) {
  const date = new Date(1e3 * timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600),
    minutes = Math.floor(seconds % 3600 / 60),
    formatted = [];
  return hours > 0 && formatted.push(`${hours} jam`), minutes > 0 && formatted.push(`${minutes} menit`),
    formatted.join(" ");
}