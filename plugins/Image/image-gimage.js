import fetch from "node-fetch";
import {
  googleImage
} from "@bochilteam/scraper";
import cheerio from "cheerio";
const handler = async (m, {
  text,
  usedPrefix,
  command
}) => {
  const lister = ["v1", "v2", "v3"];
  let [inputs, feature] = text.split("|");
  const msg = `Masukkan input yang valid\n\n*Contoh:*\n${usedPrefix + command} link|v2\n\n*Pilih versi yang ada:*\n${lister.map(v => `  ○ ${v.toUpperCase()}`).join("\n")}`;
  let res;
  if (feature = feature || "v1", !lister.includes(feature.toLowerCase())) return m.reply(msg);
  try {
    switch (feature) {
      case "v1":
        if (!inputs) return m.reply("Input query link\nExample: .image jokowi|v2");
        m.react(wait), res = await googleImage(inputs);
        break;
      case "v2":
        if (!inputs) return m.reply("Input query link\nExample: .image jokowi|v2");
        m.react(wait), res = await GoogleImage(inputs);
        break;
      case "v3":
        res = await (await fetch(`https://api.lolhuman.xyz/api/gimage2?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${inputs}`, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9,id;q=0.8"
          }
        })).json();
    }
    const teks = `🔍 *[ RESULT ${feature}]*`;
    await conn.sendFile(m.chat, res.getRandom() || logo, "", teks, m);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["image"], handler.tags = ["internet"], handler.command = /^(g?image)$/i;
export default handler;
async function GoogleImage(query) {
  const response = await fetch(`https://www.google.com/search?q=${query}&tbm=isch`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9,id;q=0.8"
      }
    }),
    data = await response.text(),
    matches = cheerio.load(data).html().matchAll(/\[1,\[0,"(?<id>[\d\w\-_]+)",\["https?:\/\/(?:[^"]+)",\d+,\d+\]\s?,\["(?<url>https?:\/\/(?:[^"]+))",\d+,\d+\]/gm);
  return [...matches].map(({
    groups
  }) => {
    return url = groups?.url, decodeURIComponent(JSON.parse(`"${url}"`));
    var url;
  }).filter(v => /.*\.jpe?g|png$/gi.test(v));
}