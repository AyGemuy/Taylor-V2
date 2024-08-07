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
      const ramalanNasib = await primbon.ramalan_nasib(inputText[0], inputText[1], inputText[2]);
      const caption = `
=== Ramalan Nasib (Metode Pitagoras) ===
Analisa: ${ramalanNasib.message.analisa}
Angka Akar: ${ramalanNasib.message.angka_akar}
Sifat: Anda Adalah Orang yang ${ramalanNasib.message.sifat}
Elemen: Dalam numerologi Pitagoras ${ramalanNasib.message.elemen}
Angka Keberuntungan: Angka Kombinasi ${ramalanNasib.message.angka_keberuntungan}
Catatan: ${ramalanNasib.message.catatan}
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
handler.help = ["ramalnasib"];
handler.tags = ["primbon"];
handler.command = /^ramal(an)?nasib$/i;
export default handler;