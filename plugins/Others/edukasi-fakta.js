import fetch from "node-fetch";
import {
  translate
} from "@vitalets/google-translate-api";
const handler = async (m, {}) => {
  try {
    let fact = await getFact();
    if (!fact) return m.reply("Failed to fetch fact");
    let translatedFact = await translateToIndonesian(fact),
      headerFact = "*[ RANDOM FACT ]*\n\n- ";
    m.reply(headerFact + translatedFact);
  } catch (e) {
    console.error("Error in handler:", e), m.reply("Terjadi kesalahan saat mengambil fakta.");
  }
};
handler.help = ["fakta"], handler.tags = ["edukasi"], handler.command = /^(fakta|faktaunik)$/i;
export default handler;
const api_key = ["j2McNJfQjYCcUz06O1CpC9vqDweRlqEaQDoXMj8w", "P9nis6bPQQRNLyrFK/yPaw==VJczzEp4moLZHGrk", "XFyJSx4tBYXJ0Pmvahr98A==DHpgfdRNRxLJQP9v"].getRandom();
async function getFact() {
  try {
    const response = await fetch("https://api.api-ninjas.com/v1/facts", {
      method: "GET",
      headers: {
        "X-Api-Key": api_key,
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data[0]?.fact || "Nothing";
  } catch (error) {
    return console.error("Error in getFact:", error), null;
  }
}
async function translateToIndonesian(text) {
  try {
    return (await translate(text, {
      to: "id"
    })).text || text;
  } catch (error) {
    return console.error("Error in translateToIndonesian:", error), text;
  }
}