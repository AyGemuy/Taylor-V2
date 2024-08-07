import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["tv", "anime", "movie"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.fancaps search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("tv" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .fancaps search|vpn");
      m.react(wait);
      try {
        let teks = (await searchFancaps(inputs)).tv.map((item, index) => {
          let formattedLinks = item.images.map((link, index) => `${index + 1}. ${link}`).join("\n");
          return `🔍 *[ RESULT ${index + 1} ]*\n\n🔗 *Url:* ${item.link}\n📰 *Title:* ${item.title}\n🖼️ *Image:* \n${formattedLinks}\n`;
        }).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("anime" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .fancaps search|vpn");
      m.react(wait);
      try {
        let teks = (await searchFancaps(inputs)).anime.map((item, index) => {
          let formattedLinks = item.images.map((link, index) => `${index + 1}. ${link}`).join("\n");
          return `🔍 *[ RESULT ${index + 1} ]*\n\n🔗 *Url:* ${item.link}\n📰 *Title:* ${item.title}\n🖼️ *Image:* \n${formattedLinks}\n`;
        }).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("movie" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .fancaps search|vpn");
      m.react(wait);
      try {
        let teks = (await searchFancaps(inputs)).movie.map((item, index) => {
          let formattedLinks = item.images.map((link, index) => `${index + 1}. ${link}`).join("\n");
          return `🔍 *[ RESULT ${index + 1} ]*\n\n🔗 *Url:* ${item.link}\n📰 *Title:* ${item.title}\n🖼️ *Image:* \n${formattedLinks}\n`;
        }).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["fancaps"], handler.tags = ["internet"], handler.command = /^(fancaps)$/i;
export default handler;
async function searchFancaps(query) {
  const url = `https://fancaps.net/search.php?q=${encodeURIComponent(query)}&MoviesCB=Movies&TVCB=TV&animeCB=Anime&submit=Kirim`,
    response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html),
    data = {
      tv: [],
      anime: [],
      movie: []
    },
    categories = {
      tv: "TV Results",
      anime: "Anime Results",
      movie: "Movie Results"
    };
  return Object.keys(categories).forEach(category => {
    $(`h2:contains("${categories[category]}")`).next("table").find("tr").each((_, element) => {
      const titleElement = $(element).find("h4 a"),
        title = titleElement.text(),
        link = "https://fancaps.net" + titleElement.attr("href"),
        images = $(element).find(".col-xs-4 img").map((_, img) => $(img).attr("src")).get();
      data[category].push({
        title: title,
        link: link,
        images: images
      });
    });
  }), data;
}