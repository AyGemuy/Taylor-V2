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
      const wetonJawa = await primbon.weton_jawa(inputText[0], inputText[1], inputText[2]);
      const caption = `
=== Weton Jawa ===
Tanggal: ${wetonJawa.message.tanggal}
Jumlah Neptu: ${wetonJawa.message.jumlah_neptu}
Watak Hari (Kamarokam): ${wetonJawa.message.watak_hari}
Naga Hari: ${wetonJawa.message.naga_hari}
Jam Baik (Saptawara & Pancawara): ${wetonJawa.message.jam_baik}
Watak Kelahiran: ${wetonJawa.message.watak_kelahiran}
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
handler.help = ["wetonjawa"];
handler.tags = ["primbon"];
handler.command = /^wetonjawa$/i;
export default handler;