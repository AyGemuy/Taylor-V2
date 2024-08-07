import fetch from "node-fetch";
import {
  sticker
} from "../../lib/sticker.js";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  command
}) => {
  let [text1, text2, text3] = text.split("|");
  if (!text) {
    let example = command.match(/^(meme[27]|meme[36])$/) ? "sam|sung" : "samsung";
    throw `Contoh penggunaan ${usedPrefix}${command} ${example}`;
  }
  let params = {
      apikey: Object.entries(APIKeys).find(([key]) => key.includes("lolhuman"))?.[1]
    },
    url = "meme1" === command || "meme4" === command || "meme5" === command ? `https://api.lolhuman.xyz/api/${command}?${new URLSearchParams({
...params,
text: text
})}` : "meme9" === command ? `https://api.lolhuman.xyz/api/creator/kannagen?${new URLSearchParams({
...params,
text: text
})}` : "meme10" === command ? `https://api.lolhuman.xyz/api/creator/ohno?${new URLSearchParams({
...params,
text: text
})}` : "meme11" === command ? `https://api.lolhuman.xyz/api/creator/changemymind?${new URLSearchParams({
...params,
text: text
})}` : "meme2" === command || "meme7" === command || "meme8" === command ? `https://api.lolhuman.xyz/api/${command}?${new URLSearchParams({
...params,
text1: text1,
text2: text2
})}` : `https://api.lolhuman.xyz/api/${command}?${new URLSearchParams({
...params,
text1: text1,
text2: text2,
text3: text3
})}`,
    caption = `Nihh banh ${command} nya`;
  await conn.sendFile(m.chat, url, "", caption, m);
  try {
    let stiker = await sticker(null, API(url), packname, author);
    if (!stiker) throw stiker.toString();
    await conn.sendFile(m.chat, stiker, "sticker.webp", "", m);
  } catch (e) {
    throw console.error(e), e.toString();
  }
};
handler.help = ["meme 1-11"], handler.command = /^meme(1[01]|1|[2-9])$/i, handler.tags = ["maker"];
export default handler;