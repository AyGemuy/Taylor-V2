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
      const ramalanSuamiIstri = await primbon.suami_istri(inputText[0], inputText[1], inputText[2], inputText[3], inputText[4], inputText[5], inputText[6], inputText[7]);
      const caption = `
=== Ramalan Suami Istri ===
Suami: ${ramalanSuamiIstri.message.suami.nama}
Tgl. Lahir Suami: ${ramalanSuamiIstri.message.suami.tgl_lahir}
Istri: ${ramalanSuamiIstri.message.istri.nama}
Tgl. Lahir Istri: ${ramalanSuamiIstri.message.istri.tgl_lahir}
Hasil Ramalan: ${ramalanSuamiIstri.message.result}
Catatan: ${ramalanSuamiIstri.message.catatan}
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
handler.help = ["suamiistri"];
handler.tags = ["primbon"];
handler.command = /^suamiistri$/i;
export default handler;