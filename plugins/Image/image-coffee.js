import fetch from "node-fetch";
const handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
  m.react(wait);
  try {
    if (command === "coffee") {
      const coffeeUrl = "https://coffee.alexflipnote.dev/random";
      m.react(wait);
      await conn.ctaButton
        .setBody(
          "☕ *Random Coffee* ☕\n\nMenikmati secangkir kopi acak untuk hari ini!",
        )
        .setFooter('Klik "Next" untuk mendapatkan kopi lainnya')
        .setImage(coffeeUrl)
        .addReply("Next", usedPrefix + command)
        .run(m.chat, conn, m);
    } else if (command === "anipic") {
      await conn.sendMessage(
        m.chat,
        {
          image: {
            url: `https://smfahim.onrender.com/anipic`,
          },
          caption: `*\`Image anipic\`*`,
        },
        {
          quoted: m,
        },
      );
    }
  } catch (error) {
    console.error(error);
    m.react(eror);
  }
};
handler.help = ["coffee", "anipic"];
handler.tags = ["image"];
handler.command = /^(coffee|anipic)$/i;
export default handler;
