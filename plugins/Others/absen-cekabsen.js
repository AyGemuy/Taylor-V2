const handler = async (m, { conn, usedPrefix }) => {
  try {
    let id = m.chat;
    let absenData = db.data.database.absen || (db.data.database.absen = {});
    if (!(id in absenData)) {
      return await conn.sendButton(
        m.chat,
        `_*Tidak ada absen berlangsung di grup ini!*_\n\n*${usedPrefix}mulaiabsen* - untuk memulai absen`,
        author,
        null,
        [["Mulai Absen", `${usedPrefix}mulaiabsen`]],
        m,
      );
    }
    let date = new Date().toLocaleDateString("id", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    let absen = absenData[id][1];
    let list = absen
      .map((v, i) => `${dmenub} ${i + 1}.  @${v.split("@")[0]}`)
      .join("\n");
    let caption = `*${htjava} TANGGAL ${htjava}*\n${date}\n${absenData[id][2]}\n\n*${htjava} SUDAH ABSEN ${htjava}*\n*Total:* ${absen.length}\n\n${dmenut}\n${list}\n${dmenuf}\n`;
    await conn.sendButton(
      m.chat,
      caption,
      author,
      null,
      [["Absen", `${usedPrefix}absen`]],
      m,
      {
        mentions: conn.parseMention(caption),
      },
    );
  } catch (error) {
    console.error(error);
    await conn.sendButton(
      m.chat,
      `_*Terjadi kesalahan saat memproses absen.*_`,
      author,
      null,
      [["Coba Lagi", `${usedPrefix}cekabsen`]],
      m,
    );
  }
};
handler.help = ["cekabsen"];
handler.tags = ["absen"];
handler.command = /^cekabsen$/i;
handler.group = true;
export default handler;
