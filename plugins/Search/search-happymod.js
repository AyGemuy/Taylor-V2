import {
  shappymod
} from "../../lib/scraper/scrape.js";
import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "mirror"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.happymod search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .happymod search|vpn");
      m.react(wait);
      try {
        let teks = (await shappymod(inputs)).data.map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📢 *Judul:* ${item.judul}\n🌐 *Link:* ${item.link}\n🖼️ *Thumb:* ${item.thumb}\n🔖 *Rating:* ${item.rating}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("mirror" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .happymod mirror|link");
      m.react(wait);
      try {
        let teks = (await mirrorHappymod(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📢 *title:* ${item.title}\n🌐 *url:* ${item.link}\n🔖 *source:* ${item.source}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["happymod"], handler.tags = ["internet"], handler.command = /^(happymod)$/i;
export default handler;
async function mirrorHappymod(url) {
  try {
    const response = await fetch(url + (url.endsWith("download.html") ? "" : "download.html")),
      html = await response.text(),
      $ = cheerio.load(html);
    return $(".cbox.mirror ul a").map((index, element) => ({
      link: $(element).attr("href"),
      title: $(element).find("h3").text(),
      source: $(element).find("h4").text()
    })).get();
  } catch (error) {
    console.error("Error:", error);
  }
}