import _ from "lodash";
import { getUrlFromDirectPath } from "@whiskeysockets/baileys";
const handler = async (m, { conn, usedPrefix, args }) => {
  const channels = _.values(conn.chats).filter((c) =>
    c.jid.endsWith("@newsletter"),
  );
  if (_.isEmpty(args)) {
    const list = _.map(channels, (ch, i) => `*${i + 1}.* ${ch.name}`).join(
      "\n",
    );
    const buttons = conn.ctaButton
      .setBody(
        `📋 *Daftar Nama Channel:*\n\n${list}\n\n💡 *Klik tombol di bawah untuk memilih channel.*`,
      )
      .setFooter("Pilih channel untuk detail.")
      .addSelection("Pilih Channel")
      .makeSections("Daftar Channel", "Pilih Channel");
    _.forEach(channels, (ch, i) =>
      buttons.makeRow(
        "",
        ch.name,
        `Lihat Detail ${ch.name}`,
        `${usedPrefix}chs ${i + 1}`,
      ),
    );
    return buttons.run(m.chat, conn, m);
  } else if (/^\d+$/.test(args[0])) {
    const index = parseInt(args[0], 10) - 1;
    if (index >= 0 && index < channels.length) {
      const ch = channels[index];
      const infoCh = await conn.newsletterMetadata("jid", ch.id);
      const info =
        `📊 *Informasi Channel ${index + 1}*\n\n` +
        `📛 *Nama:* ${infoCh.thread_metadata?.name.text || "Tidak tersedia"}\n` +
        `🆔 *ID:* ${infoCh.id}\n` +
        `📝 *Deskripsi:* ${infoCh.thread_metadata?.description.text || "Tidak tersedia"}\n` +
        `📅 *Dibuat:* ${formatTime(infoCh.thread_metadata?.creation_time)}\n` +
        `👥 *Pengikut:* ${infoCh.thread_metadata?.subscribers_count || "Tidak tersedia"} orang\n` +
        `✔️ *Verifikasi:* ${infoCh.thread_metadata?.verification === "UNVERIFIED" ? "Tidak" : "Ya"}\n` +
        `🔄 *React:* ${infoCh.thread_metadata?.settings.reaction_codes.value === "ALL" ? "Semua orang" : "Hanya admin"}\n\n` +
        `🔗 *Link:* [https://whatsapp.com/channel/${infoCh.thread_metadata?.invite}](https://whatsapp.com/channel/${infoCh.thread_metadata?.invite})`;
      const img =
        getUrlFromDirectPath(infoCh.thread_metadata?.preview.direct_path) ||
        logo;
      return conn.sendFile(m.chat, img, "", info, m);
    } else {
      return m.reply("❌ *Channel tidak ditemukan.*", m);
    }
  } else {
    return m.reply(
      `❗ *Format perintah salah.*\nGunakan "${usedPrefix}chs" untuk daftar channel atau "${usedPrefix}chs [nomor]" untuk info channel.`,
      m,
    );
  }
};
handler.menu = ["chlist"];
handler.tags = ["group"];
handler.command = /^(chlist)$/i;
export default handler;
const formatTime = (timestamp) => new Date(timestamp * 1e3).toLocaleString();
