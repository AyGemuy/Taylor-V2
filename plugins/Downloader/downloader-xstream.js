const {
  generatePlayUrl,
  regexPattern
} = await import("../../lib/download/doodstream.js");
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const msg = `Input link atau reply link!\n\n*Contoh:*\n${usedPrefix + command} link`;
  let text;
  if (args.length >= 1) {
    text = args.slice(0).join(" ");
  } else if (m.quoted && m.quoted?.text) {
    text = m.quoted?.text;
  } else return m.reply(msg);
  const inputText = text.trim();
  if (!inputText) return m.reply(msg);
  const match = inputText.match(regexPattern);
  if (!match) return m.reply("Input tidak sesuai dengan regex pattern.");
  try {
    const playUrl = await generatePlayUrl(inputText);
    return m.reply("- *Stream:*\n" + playUrl);
  } catch (error) {
    console.error(error);
    return m.reply("Terjadi kesalahan saat mengunduh video. Silakan coba lagi nanti.");
  }
};
handler.help = ["xstream"];
handler.tags = ["downloader"];
handler.command = /^(xstream)$/i;
export default handler;