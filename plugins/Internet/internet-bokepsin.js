import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "stream"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.bokepsin search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .bokepsin search|vpn");
      m.react(wait);
      try {
        let teks = (await searchBokepsin(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📚 title: ${item.title}\n🔗 link: ${item.videoUrl}\n📅 date: ${item.views}\n📖 story: ${item.duration}\n  `).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("stream" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .bokepsin search|group");
      m.react(wait);
      try {
        let cap = `🔍 *[ RESULT ]*\n\n🔗 link: ${await streamBokepsin(inputs)}\n`;
        m.reply(cap);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["bokepsin"], handler.tags = ["internet"], handler.command = /^(bokepsin)$/i;
export default handler;
async function searchBokepsin(q) {
  const url = "https://bokepsin.website/search/" + q,
    response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html);
  return $(".video-block").map((index, element) => ({
    title: $(element).find(".title").text(),
    imageUrl: $(element).find(".video-img").attr("data-src"),
    videoUrl: $(element).find(".thumb").attr("href"),
    views: $(element).find(".views-number").text().trim(),
    duration: $(element).find(".duration").text().trim()
  })).get();
}
async function streamBokepsin(url) {
  const response = await fetch(url),
    html = await response.text(),
    embedUrl = cheerio.load(html)('meta[itemprop="embedURL"]').attr("content");
  return embedUrl.startsWith("//") ? `https:${embedUrl}` : embedUrl;
}