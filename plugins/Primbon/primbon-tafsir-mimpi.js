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
    const inputText = text.trim();
    if (inputText !== "") {
      const tafsir = await primbon.tafsir_mimpi(inputText);
      const caption = `
Mimpi: ${tafsir.message.mimpi}
Arti: ${tafsir.message.arti}
Solusi: ${tafsir.message.solusi}
`;
      m.reply(caption);
    } else {
      console.error("Mohon pastikan Anda telah mengisi mimpi Anda.");
      m.reply("Mohon pastikan Anda telah mengisi mimpi Anda.");
    }
  } catch (error) {
    console.error("Error occurred during conversion:", error);
    m.reply("Terjadi kesalahan!");
  }
};
handler.help = ["tafsirmimpi"];
handler.tags = ["primbon"];
handler.command = /^(tafsir)?mimpi$/i;
export default handler;