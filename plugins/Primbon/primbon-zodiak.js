const {
  Primbon
} = await import("../../lib/scraped-primbon.js");
const primbon = new Primbon();
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let text;
  if (args.length >= 1) {
    text = args.slice(0).join(" ");
  } else if (m.quoted && m.quoted?.text) {
    text = m.quoted?.text;
  } else return m.reply("Masukkan pesan!");
  m.react(wait);
  try {
    const zodiakInfo = await primbon.zodiak(text);
    const caption = `
=== Informasi Zodiak ===
Zodiak: ${zodiakInfo.message.zodiak}
Tanggal Lahir: ${zodiakInfo.message.tanggal_lahir}
Sifat: ${zodiakInfo.message.sifat}
Ramalan: ${zodiakInfo.message.ramalan}
Kecocokan: ${zodiakInfo.message.kecocokan}
Peruntungan: ${zodiakInfo.message.peruntungan}
Karir: ${zodiakInfo.message.karir}
Kesehatan: ${zodiakInfo.message.kesehatan}
Asmara: ${zodiakInfo.message.asmara}
Keuangan: ${zodiakInfo.message.keuangan}
Angka Keberuntungan: ${zodiakInfo.message.angka_keberuntungan}
`;
    m.reply(caption);
  } catch (e) {
    console.error("Error occurred during conversion:", error);
    m.reply("Terjadi kesalahan!");
  }
};
handler.help = ["zodiak"];
handler.tags = ["primbon"];
handler.command = /^zodiak$/i;
export default handler;