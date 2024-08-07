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
      const kecocokanNama = await primbon.kecocokan_nama(inputText[0], inputText[1], inputText[2], inputText[3]);
      const caption = `
=== Kecocokan Nama ===
Nama: ${kecocokanNama.message.nama}
Tanggal Lahir: ${kecocokanNama.message.tgl_lahir}
Life Path Number: ${kecocokanNama.message.life_path}
Destiny Number: ${kecocokanNama.message.destiny}
Heart's Desire Number: ${kecocokanNama.message.destiny_desire}
Personality Number: ${kecocokanNama.message.personality}
Persentase Kecocokan: ${kecocokanNama.message.persentase_kecocokan}
Catatan: ${kecocokanNama.message.catatan}
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
handler.help = ["cocoknama"];
handler.tags = ["primbon"];
handler.command = /^cocoknama$/i;
export default handler;