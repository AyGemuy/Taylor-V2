const handler = async (m, {
  conn,
  usedPrefix
}) => {
  let id = m.chat;
  if (conn.absen = conn.absen ? conn.absen : {}, !(id in conn.absen)) return await conn.sendButton(m.chat, "Tidak ada absen berlangsung!", author, null, [
    ["Mulai Absen", `${usedPrefix}mulaiabsen`]
  ], m), !1;
  let absen = conn.absen[id][1];
  if (absen.includes(m.sender)) throw "Kamu sudah absen!";
  absen.push(m.sender);
  let date = new Date().toLocaleDateString("id", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }),
    list = absen.map((v, i) => `${dmenub} ${i + 1}.  @${v.split("@")[0]}`).join("\n"),
    caption = `*${htjava} TANGGAL ${htjava}*\n${date}\n${conn.absen[id][2]}\n\n*${htjava} DAFTAR ABSEN ${htjava}*\n*Total:* ${absen.length}\n\n${dmenut}\n${list}\n${dmenuf}\n`;
  await conn.sendButton(m.chat, caption, author, null, [
    ["Absen", `${usedPrefix}absen`]
  ], m, {
    mentions: conn.parseMention(caption)
  });
};
handler.help = ["absen"], handler.tags = ["absen"], handler.command = /^(absen|hadir)$/i;
export default handler;