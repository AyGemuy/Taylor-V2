import {
  aksaraToLatin,
  latinToAksara
} from "@bochilteam/scraper";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let text;
  if (args.length >= 1) text = args.slice(0).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw "Input teks atau reply teks yang ingin dijadikan aksara atau latin!";
    text = m.quoted?.text;
  }
  try {
    m.react(wait);
    const outputText = await convertText(text);
    m.reply(outputText);
  } catch (error) {
    console.error("Error occurred during conversion:", error), m.reply("Terjadi kesalahan saat melakukan konversi!");
  }
};
handler.help = ["aksara"], handler.tags = ["tools"], handler.command = /^(aksara)$/i;
export default handler;
async function convertText(inputText) {
  try {
    return /^[a-zA-Z0-9\s]+$/.test(inputText) ? await latinToAksara(inputText) : await aksaraToLatin(inputText);
  } catch (error) {
    return console.error("Error occurred during conversion:", error), "";
  }
}