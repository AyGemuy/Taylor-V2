import {
  WAMessageStubType
} from "@whiskeysockets/baileys";
import _ from "lodash";
export async function before(m) {
  try {
    if (!(m && !m.isBaileys && m.messageStubType && m.sender && m.isGroup)) return false;
    const edtr = m.sender?.endsWith("s.whatsapp.net") ? `🧙‍♂️ @${_.trim(m.sender.split("@")[0])} 🧙‍♂️` : m.messageStubParameters?.[0]?.endsWith("s.whatsapp.net") ? `🧙‍♂️ @${_.trim(m.messageStubParameters[0].split("@")[0])} 🧙‍♂️` : `🧙‍♂️ Seseorang 🧙‍♂️`;
    const messages = {
      119: "membuat grup 🏡",
      120: "gagal membuat grup 🏡",
      121: "grup memantul 🏓",
      123: "pengaturan ephermal tidak diterapkan 🕓",
      132: "*mereset* link grup! ♻️",
      133: "tautan undangan grup terkunci 🚫",
      134: "menghubungkan ke grup utama dengan tautan 🚧",
      135: "menghubungkan ke grup saudara dengan tautan 🚧",
      136: "menghubungkan ke grup anak dengan tautan 🚧",
      137: "menghubungkan ke grup utama komunitas dengan tautan 🚧",
      138: "menghubungkan ke grup saudara dengan tautan 🚧",
      139: "menghubungkan ke grup anak dengan tautan 🚧",
      140: "anggota bergabung ke grup 🤝",
      141: "bergabung ke grup melalui tautan 🌐",
      142: "membuat grup komunitas 🛋️",
      143: "mengatur pesan ephermal tetap di obrolan 📜",
      144: "permintaan persetujuan bergabung di grup 🤝",
      145: "mode persetujuan bergabung diatur dalam grup 🤝",
      147: "anggota komunitas dipromosikan jabatannya 📈",
      148: "anggota komunitas diturunkan jabatannya 📉",
      149: "grup utama dihapus dari komunitas 🗑️",
      150: "persetujuan keanggotaan ke grup utama dengan tautan 🚧",
      151: "anggota bergabung ke grup dan grup utama 🤝",
      156: "melakukan polling di grup 📊",
      157: "membuat obrolan berpakaian 🎭",
      158: "mengubah subjek grup utama komunitas 📜",
      159: "undangan otomatis ditambahkan ke grup 📩",
      161: "telah bergabung melalui undangan otomatis 🚀",
      163: "undangan ke grup komunitas dengan tautan kaya 🌟",
      164: "undangan otomatis ditambahkan ke grup komunitas dengan tautan kaya 🌟",
      167: "menghubungkan ke grup utama komunitas dengan tautan kaya 🌟",
      168: "anggota komunitas ditambahkan ke grup dengan tautan kaya 🌟",
      171: "mode penambahan anggota diatur dalam grup 🛡️",
      172: "permintaan persetujuan bergabung non-admin di grup 🤝",
      173: "mengubah deskripsi grup komunitas 📝",
      176: "izin anggota ditambahkan ke grup komunitas 📜",
      181: "memulai panggilan grup yang terhubung 📞",
      1: "*mereset* link grup! ♻️",
      20: "membuat grup 🏡",
      21: "mengubah subjek grup 📜",
      22: "telah mengubah ikon grup 🖼️",
      23: "mengubah tautan undangan grup 🌐",
      24: `mengubah deskripsi grup\n\n${m.messageStubParameters[0] || ""}`,
      25: `mengatur agar *${"on" === m.messageStubParameters[0] ? "hanya admin" : "semua peserta"}* yang dapat mengedit info grup 🔧`,
      26: `*${"on" === m.messageStubParameters[0] ? "Menutup" : "Membuka"}* grup!\nSekarang ${"on" === m.messageStubParameters[0] ? "hanya admin yang" : "semua peserta"} dapat mengirim pesan 🔒`,
      27: "anggota bergabung ke grup 🤝",
      28: "anggota dikeluarkan dari grup 📩",
      29: `menjadikan @${_.trim((m.messageStubParameters[0] || m.sender).split("@")[0])} sebagai admin 👨‍💼`,
      30: `memberhentikan @${_.trim((m.messageStubParameters[0] || m.sender).split("@")[0])} dari admin 👨‍💼🚪`,
      31: "mengundang anggota ke grup 📩",
      32: "anggota keluar dari grup 🚪",
      33: "mengganti nomor pribadi 📱",
      37: "pemberitahuan umum 📢",
      40: "panggilan suara terlewat 📞",
      41: "panggilan video terlewat 📞",
      42: "mengubah nomor pribadi 📱",
      43: "grup dihapus 🗑️",
      44: "pesan pemberitahuan grup memantul 🏓",
      45: "memulai panggilan video/audio di grup 📞",
      46: "panggilan video grup terlewat 📞",
      69: "mengubah pengaturan pesan sering berpindah 🔄",
      70: "undangan dikirim ke grup 📩",
      71: "meminta bergabung ke grup 🚪",
      72: `mengubah durasi pesan sementara menjadi *@${m.messageStubParameters[0] || ""}* ⏱️`,
      74: "mengirim media sekali tampil 📷",
      21: `mengubah subjek grup menjadi:\n📜 *${m.messageStubParameters[0] || ""}*`
    };
    if (!Object.prototype.hasOwnProperty.call(messages, m.messageStubType)) return;
    const resultString = _.startCase(_.toLower(WAMessageStubType[m.messageStubType].replace(/_/g, " ")));
    await this.reply(m.chat, `${edtr} ${messages[m.messageStubType]}`, fakes, {
      contextInfo: {
        mentionedJid: m.messageStubParameters[0] ? [m.sender, m.messageStubParameters[0]] : [m.sender],
        externalAdReply: {
          title: resultString,
          body: "",
          sourceUrl: "",
          mediaType: 1,
          thumbnailUrl: "https://cdn-icons-png.flaticon.com/128/6542/6542976.png"
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}
export const disabled = false;