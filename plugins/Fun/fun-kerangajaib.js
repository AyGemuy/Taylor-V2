const handler = async (m, {
  args,
  command,
  usedPrefix
}) => {
  if (!(args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null)) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  m.reply(`"${[ "Mungkin suatu hari", "Tidak juga", "Tidak keduanya", "Kurasa tidak", "Ya", "Coba tanya lagi", "Tidak ada" ].getRandom()}."`);
};
handler.help = ["kerang", "kerangajaib"].map(v => v + " <teks>"), handler.tags = ["kerang", "fun"],
  handler.command = /^(kulit)?kerang(ajaib)?$/i;
export default handler;