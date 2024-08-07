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
    if (inputText.length === 4 && inputText.every(input => input.trim() !== "")) {
      const potensiKeberuntungan = await primbon.potensi_keberuntungan(inputText[0], inputText[1], inputText[2], inputText[3]);
      const caption = `
=== Potensi Keberuntungan ===
Nama: ${potensiKeberuntungan.message.nama}
Tanggal Lahir: ${potensiKeberuntungan.message.tgl_lahir}
Potensi Keberuntungan: ${potensiKeberuntungan.message.result}
`;
      m.reply(caption);
    } else {
      console.error("Mohon pastikan semua input teks diisi. Total 4 input diperlukan.");
      m.reply("Mohon pastikan semua input teks diisi. Total 4 input diperlukan.");
    }
  } catch (error) {
    console.error("Error occurred during conversion:", error);
    m.reply("Terjadi kesalahan!");
  }
};
handler.help = ["keberuntungan"];
handler.tags = ["primbon"];
handler.command = /^keberuntungan$/i;
export default handler;