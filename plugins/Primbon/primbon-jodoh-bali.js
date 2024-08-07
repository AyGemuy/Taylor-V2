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
    if (inputText.length === 8 && inputText.every(input => input.trim() !== "")) {
      const jodohBali = await primbon.ramalan_jodoh_bali(inputText[0], inputText[1], inputText[2], inputText[3], inputText[4], inputText[5], inputText[6], inputText[7]);
      const caption = `
=== Ramalan Jodoh Bali ===
Nama Anda: ${jodohBali.message.nama_anda.nama}
Hari Lahir Anda: ${jodohBali.message.nama_anda.tgl_lahir}
Nama Pasangan: ${jodohBali.message.nama_pasangan.nama}
Hari Lahir Pasangan: ${jodohBali.message.nama_pasangan.tgl_lahir}
Hasil Ramalan: ${jodohBali.message.result}
Catatan: ${jodohBali.message.catatan}
`;
      m.reply(caption);
    } else {
      console.error("Mohon pastikan semua input teks diisi. Total 8 input diperlukan.");
      m.reply("Mohon pastikan semua input teks diisi. Total 8 input diperlukan.");
    }
  } catch (error) {
    console.error("Error occurred during conversion:", error);
    m.reply("Terjadi kesalahan!");
  }
};
handler.help = ["jodohbali"];
handler.tags = ["primbon"];
handler.command = /^jodohbali$/i;
export default handler;