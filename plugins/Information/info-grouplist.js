import _ from "lodash";
const handler = async (m, { conn, usedPrefix, args }) => {
  const groups = _.values(conn.chats).filter((v) => v.id.endsWith("@g.us"));
  if (_.isEmpty(args)) {
    const list = _.map(groups, (g, i) => `✨ *${i + 1}. ${g.subject}*`).join(
      "\n",
    );
    const buttons = conn.ctaButton
      .setBody(
        `🎉 *Daftar Grup yang Tersedia:*\n\n${list}\n\n💡 *Pilih grup dari tombol di bawah untuk melihat detail.*`,
      )
      .setFooter("Klik untuk memilih grup.")
      .addSelection("Pilih Grup")
      .makeSections("Daftar Grup", "Pilih Grup");
    _.forEach(groups, (g, i) =>
      buttons.makeRow(
        "",
        `👥 ${g.subject}`,
        `Lihat Grup ${g.subject}`,
        `${usedPrefix}groups ${i + 1}`,
      ),
    );
    return buttons.run(m.chat, conn, m);
  } else if (/^\d+$/.test(args[0])) {
    const group = groups[args[0] - 1];
    if (!group) return m.reply("❌ *Grup tidak ditemukan.*", m);
    const info =
      `📊 *Informasi Grup ${args[0]}*\n\n` +
      `🆔 *ID:* ${group.id}\n` +
      `📛 *Nama:* ${group.subject}\n` +
      `👑 *Pemilik:* @${group.owner.replace(/(\d+)@.+/, "$1")}\n` +
      `⏰ *Dibuat:* ${formatTime(group.creation)}\n` +
      `📝 *Deskripsi:* ${group.desc || "Tidak ada"}\n` +
      `👥 *Partisipan:* ${group.participants.length}\n` +
      `🔑 *Superadmin:* ${_.size(_.filter(group.participants, (p) => p.admin === "superadmin"))}\n` +
      `🔧 *Admin:* ${_.size(_.filter(group.participants, (p) => p.admin === "admin"))}\n`;
    return m.reply(info, null, {
      contextInfo: {
        mentionedJid: _.map(group.participants, "id"),
      },
    });
  } else {
    return m.reply(
      `❗ *Format salah.*\nGunakan "${usedPrefix}groups" untuk melihat daftar atau "${usedPrefix}groups [nomor]" untuk info grup.`,
      m,
    );
  }
};
handler.menu = ["groups", "grouplist"];
handler.tags = ["group"];
handler.command = /^(gro?ups?list)|(listgro?ups?)|(listgc)$/i;
export default handler;
const formatTime = (ts) => new Date(ts * 1e3).toLocaleString();
