import fetch from "node-fetch";
const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  command,
  args
}) => {
  try {
    const coffeeUrl = "https://coffee.alexflipnote.dev/random";
    m.react(wait);
    await conn.ctaButton.setBody("☕ *Random Coffee* ☕\n\nMenikmati secangkir kopi acak untuk hari ini!").setFooter('Klik "Next" untuk mendapatkan kopi lainnya').setImage(coffeeUrl).addReply("Next", usedPrefix + command).run(m.chat, conn, m);
  } catch (e) {
    m.react(eror);
    console.error(e);
  }
};
handler.help = ["coffee"];
handler.tags = ["search"];
handler.command = /^(coffee)$/i;
export default handler;