const handler = async (m, {
  conn,
  command,
  usedPrefix,
  text
}) => {
  if (db.data.users[m.sender].catatan = db.data.users[m.sender].catatan || [], "all" === text) throw db.data.users[m.sender].catatan = [], "Berhasil menghapus *semua* catatan!";
  if (0 === db.data.users[m.sender].catatan.length) return m.reply("Kamu belum punya catatan!");
  let catatan = db.data.users[m.sender].catatan,
    numd = 0,
    numo = 0,
    listSections = [];
  if (Object.values(catatan).map((v, index) => {
      listSections.push(["Num. " + ++index, [
        ["Delete " + v.title, usedPrefix + "hapusnote " + ++numd, v.isi],
        ["Open " + v.title, usedPrefix + "lihatnote " + ++numo, v.isi]
      ]]);
    }), 0 === text.length) return conn.sendList(m.chat, htki + " 🗒️ List Notes " + htka, "⚡ Silakan pilih Notes yang anda mau.", author, "[ 🔍 Lihat ]", listSections, m);
  let split = text.split("|");
  if (0 === catatan.length) return m.reply("Kamu belum memiliki catatan!");
  let n = Number(split[0]) - 1;
  if (void 0 === catatan[n]) return m.reply("Catatan tidak ditemukan!");
  let tmp = [];
  for (let ct in catatan) ct != n && tmp.push(catatan[ct]);
  db.data.users[m.sender].catatan = tmp, await conn.reply(m.chat, "Berhasil menghapus catatan!", m, !1, {
    contextInfo: {
      mentionedJid: conn.parseMention(text)
    }
  });
};
handler.help = ["hapusnote"], handler.tags = ["tools"], handler.command = /^(hapus(catatan|note)|del(catatan|note))$/i;
export default handler;