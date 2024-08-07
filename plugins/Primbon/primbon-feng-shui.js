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
      const perhitunganFengShui = await primbon.perhitungan_feng_shui(inputText[0], inputText[1], inputText[2]);
      const caption = `
=== Perhitungan Feng Shui ===
Nama: ${perhitunganFengShui.message.nama}
Tahun Lahir: ${perhitunganFengShui.message.tahun_lahir}
Jenis Kelamin: ${perhitunganFengShui.message.jenis_kelamin}
Angka Kua: ${perhitunganFengShui.message.angka_kua}
Kelompok: ${perhitunganFengShui.message.kelompok}
Karakter: ${perhitunganFengShui.message.karakter}
Sektor/Arah Baik: ${perhitunganFengShui.message.sektor_baik}
Sektor/Arah Buruk: ${perhitunganFengShui.message.sektor_buruk}
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
handler.help = ["fengshui"];
handler.tags = ["primbon"];
handler.command = /^fengshui$/i;
export default handler;