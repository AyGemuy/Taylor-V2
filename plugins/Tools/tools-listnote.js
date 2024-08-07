const handler = async (m, {
  conn,
  command,
  usedPrefix,
  text
}) => {
  if (db.data.users[m.sender].catatan = db.data.users[m.sender].catatan || [], 0 === db.data.users[m.sender].catatan.length) return m.reply("Kamu belum punya catatan!");
  let catatan = db.data.users[m.sender].catatan;
  if (0 === catatan.length) return m.reply("Kamu belum memiliki catatan!");
  let numd = 0,
    numo = 0,
    listSections = [];
  return Object.values(catatan).map((v, index) => {
    listSections.push(["Num. " + ++index, [
      ["Delete " + v.title, usedPrefix + "hapusnote " + ++numd, v.isi],
      ["Open " + v.title, usedPrefix + "lihatnote " + ++numo, v.isi]
    ]]);
  }), 0 === text.length ? conn.sendList(m.chat, htki + " 🗒️ List Notes " + htka, "⚡ Silakan pilih Notes yang anda mau.", author, "[ 🔍 Lihat ]", listSections, m) : void 0;
};
handler.help = ["listnote"], handler.tags = ["tools"], handler.command = /^(daftar(catatan|note)|list(catatan|note))$/i;
export default handler;