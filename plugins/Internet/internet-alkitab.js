import axios from "axios";
import cheerio from "cheerio";
const handler = async (m, {
  text,
  usedPrefix,
  command
}) => {
  if (!text) throw `uhm.. teksnya mana?\n\ncontoh:\n${usedPrefix + command} kejadian`;
  let caption = (await Alkitab(text)).map(v => `${v.title}\n${v.teks}`).join("\n────────\n");
  m.reply(caption);
};
handler.help = ["alkitab"].map(v => v + " <pencarian>"), handler.tags = ["internet"],
  handler.command = /^(alkitab)$/i;
export default handler;
async function Alkitab(text) {
  let res = await axios.get(`https://alkitab.me/search?q=${encodeURIComponent(text)}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"
      }
    }),
    $ = cheerio.load(res.data),
    result = [];
  return $("div.vw").each(function(a, b) {
    let teks = $(b).find("p").text().trim(),
      link = $(b).find("a").attr("href"),
      title = $(b).find("a").text().trim();
    result.push({
      teks: teks,
      link: link,
      title: title
    });
  }), result;
}