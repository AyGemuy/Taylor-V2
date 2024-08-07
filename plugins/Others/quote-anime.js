import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text
}) => {
  try {
    const {
      quote,
      character,
      anime
    } = text ? await quotesByName(text) : await quotesRandom();
    await conn.reply(m.chat, `Quotes:\n${quote}\n\n~ Character:\n${character}\n~Anime:\n${anime}`, m);
  } catch (error) {
    console.error("Error in quotesanime handler:", error), await conn.reply(m.chat, "Terjadi kesalahan dalam mengeksekusi perintah.", m);
  }
};
async function quotesRandom() {
  try {
    const {
      quote,
      character,
      anime
    } = await (await fetch("https://animechan.xyz/api/random")).json();
    return {
      quote: quote,
      character: character,
      anime: anime
    };
  } catch (error) {
    return console.error("Error fetching random quote:", error), null;
  }
}
async function quotesByName(name) {
  try {
    const {
      quote,
      character,
      anime
    } = await (await fetch(`https://animechan.xyz/api/random/character?name=${name}`)).json();
    return {
      quote: quote,
      character: character,
      anime: anime
    };
  } catch (error) {
    return console.error(`Error fetching ${name}'s quote:`, error), null;
  }
}
handler.help = ["quotesanime"], handler.tags = ["anime", "quotes"], handler.command = /^(quotesanime|kataanime)$/i;
export default handler;