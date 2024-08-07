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
      const rejekiHoki = await primbon.rejeki_hoki_weton(inputText[0], inputText[1], inputText[2]);
      const caption = `
=== Rejeki & Hoki Berdasarkan Weton ===
Hari Lahir Anda: ${rejekiHoki.message.hari_lahir}
Rejeki: ${rejekiHoki.message.rejeki}
Catatan: ${rejekiHoki.message.catatan}
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
handler.help = ["rejekiweton"];
handler.tags = ["primbon"];
handler.command = /^rejekiweton$/i;
export default handler;