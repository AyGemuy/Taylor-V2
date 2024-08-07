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
  }
  let input = text;
  if (m.quoted) {
    input = m.quoted?.sender;
  } else if (text) {
    input = text;
  }
  if (input) {
    input = input.trim();
    if (input.includes("@")) {
      input = input.split("@")[0];
    }
  } else {
    return m.reply("Masukkan nomor: contoh " + usedPrefix + command + " " + m.sender.split("@")[0]);
  }
  if (!/^\d+$/.test(input)) {
    return m.reply("Input harus berupa angka.");
  }
  m.react(wait);
  try {
    const hoki = await primbon.nomer_hoki(input);
    const caption = `
Nomer HP: ${hoki.message.nomer_hp}
Angka Shuzi: ${hoki.message.angka_shuzi}

Energi Positif:
- Kekayaan: ${hoki.message.energi_positif.kekayaan}
- Kesehatan: ${hoki.message.energi_positif.kesehatan}
- Cinta: ${hoki.message.energi_positif.cinta}
- Kestabilan: ${hoki.message.energi_positif.kestabilan}
- Persentase: ${hoki.message.energi_positif.persentase}

Energi Negatif:
- Perselisihan: ${hoki.message.energi_negatif.perselisihan}
- Kehilangan: ${hoki.message.energi_negatif.kehilangan}
- Malapetaka: ${hoki.message.energi_negatif.malapetaka}
- Kehancuran: ${hoki.message.energi_negatif.kehancuran}
- Persentase: ${hoki.message.energi_negatif.persentase}

Catatan: ${hoki.message.catatan}
`;
    m.reply(caption);
  } catch (e) {
    console.error("Error occurred during conversion:", error);
    m.reply("Terjadi kesalahan!");
  }
};
handler.help = ["nomorhoki"];
handler.tags = ["primbon"];
handler.command = /^(no(mor)?hoki|hoki)$/i;
export default handler;