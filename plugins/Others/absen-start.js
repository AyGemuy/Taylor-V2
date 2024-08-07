const handler = async (m, {
  usedPrefix,
  text,
  conn
}) => {
  try {
    conn.absen = conn.absen || {};
    let id = m.chat;
    id in conn.absen ? await conn.sendButton(m.chat, `_*Masih ada absen di chat ini!*_\n\n*${usedPrefix}hapusabsen* - untuk menghapus absen`, author, null, [
      ["Hapus Absen", `${usedPrefix}hapusabsen`]
    ], m) : conn.absen[id] = [await conn.sendButton(m.chat, `Berhasil memulai absen!\n\n*${usedPrefix}absen* - untuk absen\n*${usedPrefix}cekabsen* - untuk mengecek absen\n*${usedPrefix}hapusabsen* - untuk menghapus data absen`, author, null, [
      ["Absen", `${usedPrefix}absen`],
      ["Cek Absen", `${usedPrefix}cekabsen`],
      ["Hapus Absen", `${usedPrefix}hapusabsen`]
    ], m), [], text];
  } catch (error) {
    console.error(error), m.reply("Terjadi kesalahan dalam memproses perintah.");
  }
};
handler.help = ["mulaiabsen [teks]"], handler.tags = ["absen"], handler.command = /^(start|mulai)absen$/i,
  handler.group = !0, handler.admin = !0;
export default handler;