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
      const sifatKarakter = await primbon.sifat_karakter_tanggal_lahir(inputText[0], inputText[1], inputText[2], inputText[3]);
      const caption = `
=== Sifat Karakter Tanggal Lahir ===
Nama: ${sifatKarakter.message.nama}
Tanggal Lahir: ${sifatKarakter.message.tgl_lahir}
Garis Hidup: ${sifatKarakter.message.garis_hidup}
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
handler.help = ["sifatlahir"];
handler.tags = ["primbon"];
handler.command = /^sifatlahir$/i;
export default handler;