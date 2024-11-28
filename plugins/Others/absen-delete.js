const handler = async (m, { conn, usedPrefix }) => {
  try {
    let id = m.chat;
    db.data.database.absen = db.data.database.absen || {};
    if (id in db.data.database.absen) {
      delete db.data.database.absen[id];
      m.reply("Berhasil menghapus absen!");
    } else {
      await conn.reply(
        m.chat,
        `_*Tidak ada absen yang sedang berlangsung di grup ini!*_\n\n*${usedPrefix}mulaiabsen* - untuk memulai absen`,
        m,
      );
    }
  } catch (error) {
    console.error(error);
    await m.reply("Terjadi kesalahan dalam memproses perintah.");
  }
};
handler.help = ["hapusabsen"];
handler.tags = ["absen"];
handler.command = /^(delete|hapus)absen$/i;
handler.group = true;
handler.admin = true;
export default handler;
