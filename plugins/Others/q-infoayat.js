import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  if (!args[0]) throw `Contoh:\n${usedPrefix + command} 1\n\nMaka hasilnya adalah gambar halaman 1`;
  if (isNaN(args[0])) throw `contoh:\n${usedPrefix + command} 1\n\nmaka hasilnya adalah gambar halaman 1`;
  let res = "https://quran-img.ay-gemuy.repl.co/quran/" + args[0];
  await conn.sendFile(m.chat, res, "", "*Result*", m);
};
handler.help = ["surah"].map(v => v + " *surah no*"), handler.tags = ["quran"],
  handler.command = /^sura(t|h)$/i;
export default handler;