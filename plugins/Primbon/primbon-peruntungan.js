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
    if (inputText.length === 5 && inputText.every(input => input.trim() !== "")) {
      const ramalanPeruntungan = await primbon.ramalan_peruntungan(inputText[0], inputText[1], inputText[2], inputText[3], inputText[4]);
      const caption = `
=== Ramalan Peruntungan ===
Nama: ${ramalanPeruntungan.message.nama}
Tanggal Lahir: ${ramalanPeruntungan.message.tgl_lahir}
Peruntungan Tahun: ${ramalanPeruntungan.message.peruntungan_tahun}
Hasil Ramalan:
${ramalanPeruntungan.message.result}

Catatan:
${ramalanPeruntungan.message.catatan}
`;
      m.reply(caption);
    } else {
      console.error("Mohon pastikan semua input teks diisi. Total 5 input diperlukan.");
      m.reply("Mohon pastikan semua input teks diisi. Total 5 input diperlukan.");
    }
  } catch (error) {
    console.error("Error occurred during conversion:", error);
    m.reply("Terjadi kesalahan!");
  }
};
handler.help = ["peruntungan"];
handler.tags = ["primbon"];
handler.command = /^peruntungan$/i;
export default handler;