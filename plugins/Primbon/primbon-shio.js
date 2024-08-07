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
    const shioInfo = await primbon.shio(text);
    const caption = `
=== Informasi Shio ===
${shioInfo.message}
`;
    m.reply(caption);
  } catch (e) {
    console.error("Error occurred during conversion:", error);
    m.reply("Terjadi kesalahan!");
  }
};
handler.help = ["shio"];
handler.tags = ["primbon"];
handler.command = /^shio$/i;
export default handler;