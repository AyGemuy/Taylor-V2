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
      const primbonHariNaas = await primbon.primbon_hari_naas(inputText[0], inputText[1], inputText[2]);
      const caption = `
=== Primbon Hari Naas ===
Hari Lahir Anda: ${primbonHariNaas.message.hari_lahir}
Tanggal Lahir: ${primbonHariNaas.message.tgl_lahir}
Hari Naas Anda: ${primbonHariNaas.message.hari_naas}

Catatan:
${primbonHariNaas.message.catatan}

Info:
${primbonHariNaas.message.info}
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
handler.help = ["harinaas"];
handler.tags = ["primbon"];
handler.command = /^harinaas$/i;
export default handler;