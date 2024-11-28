import fetch from "node-fetch";
import { translate } from "@vitalets/google-translate-api";
const handler = async (m, {}) => {
  try {
    const { setup, delivery } = await getJoke();
    const joke = `${setup}\n\n${delivery}`;
    const translatedJoke = await translateToIndonesian(joke);
    m.reply(`*[ RANDOM JOKES 🤣 ]*\n\n- ${translatedJoke}`);
  } catch (e) {
    console.error("Error in handler:", e);
    m.reply("Terjadi kesalahan saat mengambil jokes. 😞");
  }
};
handler.help = ["jokes"];
handler.tags = ["edukasi"];
handler.command = /^(jokes|jokesunik)$/i;
export default handler;
async function getJoke() {
  try {
    const res = await fetch(
      "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun?blacklistFlags=nsfw,religious,racist,sexist,explicit",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return res.ok ? (await res.json()) || {} : null;
  } catch (error) {
    console.error("Error in getJoke:", error);
    return null;
  }
}
async function translateToIndonesian(text) {
  try {
    const res = await translate(text, {
      to: "id",
    });
    return res.text || text;
  } catch (error) {
    console.error("Error in translateToIndonesian:", error);
    return text;
  }
}
