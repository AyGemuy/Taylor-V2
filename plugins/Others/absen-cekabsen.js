const handler = async (m, {
  conn,
  usedPrefix
}) => {
  let id = m.chat;
  conn.absen = conn.absen ? conn.absen : {}, id in conn.absen || await conn.sendButton(m.chat, `_*Tidak ada absen berlangsung digrup ini!*_\n\n*${usedPrefix}mulaiabsen* - untuk memulai absen`, author, null, [
    ["Mulai Absen", `${usedPrefix}mulaiabsen`]
  ], m);
  let date = new Date().toLocaleDateString("id", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }),
    absen = conn.absen[id][1],
    list = absen.map((v, i) => `${dmenub} ${i + 1}.  @${v.split("@")[0]}`).join("\n"),
    caption = `*${htjava} TANGGAL ${htjava}*\n${date}\n${conn.absen[id][2]}\n\n*${htjava} SUDAH ABSEN ${htjava}*\n*Total:* ${absen.length}\n\n${dmenut}\n${list}\n${dmenuf}\n`;
  await conn.sendButton(m.chat, caption, author, null, [
    ["Absen", `${usedPrefix}absen`]
  ], m, {
    mentions: conn.parseMention(caption)
  });
};
handler.help = ["cekabsen"], handler.tags = ["absen"], handler.command = /^cekabsen$/i,
  handler.group = !0;
export default handler;