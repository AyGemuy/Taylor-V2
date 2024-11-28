const handler = async (m, { usedPrefix, text, conn }) => {
  try {
    db.data.database.absen = db.data.database.absen || {};
    let id = m.chat;
    if (id in db.data.database.absen) {
      await conn.sendButton(
        m.chat,
        `_*Masih ada absen yang sedang berlangsung di chat ini!*_\n\n*${usedPrefix}hapusabsen* - untuk menghapus absen`,
        author,
        null,
        [["Hapus Absen", `${usedPrefix}hapusabsen`]],
        m,
      );
    } else {
      db.data.database.absen[id] = [
        await conn.sendButton(
          m.chat,
          `Berhasil memulai absen!\n\n*${usedPrefix}absen* - untuk absen\n*${usedPrefix}cekabsen* - untuk mengecek absen\n*${usedPrefix}hapusabsen* - untuk menghapus data absen`,
          author,
          null,
          [
            ["Absen", `${usedPrefix}absen`],
            ["Cek Absen", `${usedPrefix}cekabsen`],
            ["Hapus Absen", `${usedPrefix}hapusabsen`],
          ],
          m,
        ),
        [],
        text || "",
      ];
    }
  } catch (error) {
    console.error(error);
    await m.reply("Terjadi kesalahan dalam memproses perintah.");
  }
};
handler.help = ["mulaiabsen [teks]"];
handler.tags = ["absen"];
handler.command = /^(start|mulai)absen$/i;
handler.group = true;
handler.admin = true;
export default handler;
