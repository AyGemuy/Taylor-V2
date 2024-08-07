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
    const inputText = text.split("|");
    if (inputText.length === 3 && inputText.every(input => input.trim() !== "")) {
      const rahasiaNagaHari = await primbon.rahasia_naga_hari(inputText[0], inputText[1], inputText[2]);
      const caption = `
=== Rahasia Naga Hari ===
Hari Lahir Anda: ${rahasiaNagaHari.message.hari_lahir}
Tanggal Lahir: ${rahasiaNagaHari.message.tgl_lahir}
Arah Naga Hari: ${rahasiaNagaHari.message.arah_naga_hari}

Catatan:
${rahasiaNagaHari.message.catatan}
`;
      m.reply(caption);
    } else {
      console.error("Mohon pastikan semua input teks diisi. Total 3 input diperlukan.");
      m.reply("Mohon pastikan semua input teks diisi. Total 3 input diperlukan.");
    }
  } catch (error) {
    console.error("Error occurred during conversion:", error);
    m.reply("Terjadi kesalahan!");
  }
};
handler.help = ["nagahari"];
handler.tags = ["primbon"];
handler.command = /^nagahari$/i;
export default handler;