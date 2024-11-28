const handler = async (m, { conn, usedPrefix }) => {
  try {
    let id = m.chat;
    db.data.database.absen = db.data.database.absen || {};
    if (!(id in db.data.database.absen)) {
      await conn.sendButton(
        m.chat,
        "Tidak ada absen yang sedang berlangsung!",
        author,
        null,
        [["Mulai Absen", `${usedPrefix}mulaiabsen`]],
        m,
      );
      return;
    }
    let absen = db.data.database.absen[id][1];
    if (absen.includes(m.sender)) {
      await m.reply("Kamu sudah absen!");
      return;
    }
    absen.push(m.sender);
    let date = new Date().toLocaleDateString("id", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    let list = absen
      .map((v, i) => `${dmenub} ${i + 1}.  @${v.split("@")[0]}`)
      .join("\n");
    let caption = `*${htjava} TANGGAL ${htjava}*\n${date}\n${db.data.database.absen[id][2]}\n\n*${htjava} DAFTAR ABSEN ${htjava}*\n*Total:* ${absen.length}\n\n${dmenut}\n${list}\n${dmenuf}\n`;
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
    await m.reply("Terjadi kesalahan dalam memproses perintah.");
  }
};
handler.help = ["absen"];
handler.tags = ["absen"];
handler.command = /^(absen|hadir)$/i;
export default handler;
